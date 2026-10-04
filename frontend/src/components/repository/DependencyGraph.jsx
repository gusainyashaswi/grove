import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    useReactFlow,
    Handle,
    Position,
    MarkerType,
    Background,
    BackgroundVariant,
    MiniMap
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "@dagrejs/dagre";
import { useRepository } from "../../context/RepositoryContext";
import { Plus, Minus, Maximize2, RotateCcw, Map as MapIcon, Settings2, Search, FileCode2, Code2, FileJson, Layout, FileText, Braces, Sparkles, Hash } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

const NODE_WIDTH = 260;
const NODE_HEIGHT = 90;

const getIconForExt = (ext) => {
    switch (ext) {
        case '.jsx': case '.tsx': return Layout;
        case '.js': case '.ts': return Braces;
        case '.css': case '.scss': return Hash;
        case '.json': return FileJson;
        case '.md': return FileText;
        default: return FileCode2;
    }
};

const getCategoryForExt = (ext) => {
    switch (ext) {
        case '.jsx': case '.tsx': return 'Component';
        case '.js': case '.ts': return 'Module';
        case '.css': case '.scss': return 'Stylesheet';
        case '.json': return 'Config';
        default: return 'File';
    }
};

/* ── Custom File Node Component ───────────────────────────── */
function FileNode({ data, selected }) {
    const { label, ext, path, depsCount, dependentsCount, isConnected, isDimmed, isHovered, direction } = data;
    const Icon = getIconForExt(ext);
    const category = getCategoryForExt(ext);

    let containerClass = "bg-[#ffffff] border border-[var(--line-soft)] shadow-sm";
    if (selected) {
        containerClass = "bg-[#f8fafc] border-[var(--accent)] shadow-[0_0_0_2px_rgba(59,111,237,0.15)]";
    } else if (isHovered) {
        containerClass = "bg-[#f8fafc] border-[var(--accent)]/50 shadow-md";
    } else if (isConnected) {
        containerClass = "bg-[#ffffff] border-[var(--accent)]/40 shadow-sm";
    } else if (isDimmed) {
        containerClass = "bg-[#f1f5f9]/50 border-[var(--line-soft)] opacity-40 grayscale";
    }

    return (
        <div
            className={`relative w-[260px] rounded-xl p-3 transition-all duration-300 ${containerClass}`}
            onMouseEnter={data.onMouseEnter}
            onMouseLeave={data.onMouseLeave}
        >
            <Handle
                type="target"
                position={direction === "TB" ? Position.Top : Position.Left}
                className="!opacity-0 !w-1 !h-1"
            />
            
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 transition-colors ${selected || isHovered || isConnected ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon size={16} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className={`font-mono text-[12.5px] font-semibold truncate leading-tight ${selected ? 'text-[var(--accent)]' : 'text-slate-800'}`} title={label}>
                            {label}
                        </h3>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5" title={path}>
                        {path}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--line-soft)]">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">
                            {category}
                        </span>
                        <div className="flex items-center gap-2.5 text-[10px] text-slate-400 font-medium font-mono">
                            <span title="Imports">{depsCount} ↓</span>
                            <span title="Imported by">{dependentsCount} ↑</span>
                        </div>
                    </div>
                </div>
            </div>

            <Handle
                type="source"
                position={direction === "TB" ? Position.Bottom : Position.Right}
                className="!opacity-0 !w-1 !h-1"
            />
        </div>
    );
}

const nodeTypes = {
    fileNode: FileNode
};

/* ── Auto Layout Helper using Dagre ───────────────────────── */
function getLayoutedElements(nodes, edges, direction = "TB") {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({
        rankdir: direction,
        nodesep: 40,
        ranksep: 90,
        marginx: 40,
        marginy: 40
    });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id) || { x: 0, y: 0 };
        return {
            ...node,
            position: {
                x: (nodeWithPosition.x || 0) - NODE_WIDTH / 2,
                y: (nodeWithPosition.y || 0) - NODE_HEIGHT / 2
            },
            targetPosition: direction === 'TB' ? Position.Top : Position.Left,
            sourcePosition: direction === 'TB' ? Position.Bottom : Position.Right,
        };
    });

    return { layoutedNodes, layoutedEdges: edges };
}

/* ── Main Graph Canvas Inner Component ────────────────────── */
function DependencyGraphInner() {
    const { selectedFile, setSelectedFile, repository, setSourcePreviewOpen } = useRepository() || {};
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [hoverNodeId, setHoverNodeId] = useState(null);
    
    // Controls State
    const [direction, setDirection] = useState("TB");
    const [showMinimap, setShowMinimap] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    const { fitView, zoomIn, zoomOut } = useReactFlow();

    // 1. Build or normalize raw nodes & edges from repository
    const rawData = useMemo(() => {
        const depGraph = repository?.dependencyGraph;
        let rawNodes = [];
        let rawEdges = [];

        if (Array.isArray(depGraph?.nodes) && depGraph.nodes.length > 0) {
            rawNodes = depGraph.nodes.map((n) => {
                const label = n.label || n.id.split("/").pop();
                const lastDot = label.lastIndexOf(".");
                const ext = lastDot > 0 ? label.slice(lastDot) : "";
                return {
                    id: n.id,
                    label,
                    ext,
                    path: n.id
                };
            });

            if (Array.isArray(depGraph?.edges)) {
                rawEdges = depGraph.edges.map((e, idx) => ({
                    id: e.id || `edge-${idx}`,
                    source: e.source,
                    target: e.target
                }));
            }
        } else if (Array.isArray(repository?.files) && repository.files.length > 0) {
            // Fallback: derive graph from repository.files
            rawNodes = repository.files.map((file) => {
                const label = file.name || file.path.split("/").pop();
                const lastDot = label.lastIndexOf(".");
                const ext = lastDot > 0 ? label.slice(lastDot) : (file.extension || "");
                return {
                    id: file.path,
                    label,
                    ext,
                    path: file.path
                };
            });

            const fileMap = new Map();
            repository.files.forEach((f) => {
                fileMap.set(f.path, f.path);
                fileMap.set(f.name, f.path);
                const baseName = f.name?.replace(/\.[^/.]+$/, "");
                if (baseName) fileMap.set(baseName, f.path);
            });

            repository.files.forEach((file) => {
                const deps = file.dependencies || [];
                deps.forEach((dep, idx) => {
                    const resolvedTarget = fileMap.get(dep) || fileMap.get(dep.split("/").pop());
                    if (resolvedTarget && resolvedTarget !== file.path) {
                        rawEdges.push({
                            id: `${file.path}->${resolvedTarget}-${idx}`,
                            source: file.path,
                            target: resolvedTarget
                        });
                    }
                });
            });
        }

        const validEdges = [];
        const seen = new Set();
        const nodeMap = new Set(rawNodes.map(n => n.id));

        rawEdges.forEach((e) => {
            if (nodeMap.has(e.source) && nodeMap.has(e.target) && e.source !== e.target) {
                const key = `${e.source}->${e.target}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    validEdges.push({ id: e.id || key, source: e.source, target: e.target });
                }
            }
        });

        // Compute deps count
        const depsCountMap = new Map();
        const dependentsCountMap = new Map();
        validEdges.forEach(e => {
            depsCountMap.set(e.source, (depsCountMap.get(e.source) || 0) + 1);
            dependentsCountMap.set(e.target, (dependentsCountMap.get(e.target) || 0) + 1);
        });

        const finalNodes = rawNodes.map(n => ({
            ...n,
            depsCount: depsCountMap.get(n.id) || 0,
            dependentsCount: dependentsCountMap.get(n.id) || 0
        }));

        let displayNodes = finalNodes;
        let displayEdges = validEdges;
        let isTrimmed = false;

        const MAX_GRAPH_NODES = 120;
        if (finalNodes.length > MAX_GRAPH_NODES) {
            isTrimmed = true;
            const entryPath = repository?.entryPoint?.path;
            const sortedByConnections = [...finalNodes].sort((a, b) => {
                const connA = (a.depsCount || 0) + (a.dependentsCount || 0);
                const connB = (b.depsCount || 0) + (b.dependentsCount || 0);
                return connB - connA;
            });

            const topNodeIds = new Set();
            if (entryPath) topNodeIds.add(entryPath);
            if (selectedFile?.path) topNodeIds.add(selectedFile.path);

            for (const n of sortedByConnections) {
                topNodeIds.add(n.id);
                if (topNodeIds.size >= MAX_GRAPH_NODES) break;
            }

            displayNodes = finalNodes.filter(n => topNodeIds.has(n.id));
            displayEdges = validEdges.filter(e => topNodeIds.has(e.source) && topNodeIds.has(e.target));
        }

        return { nodes: displayNodes, edges: displayEdges, totalNodes: finalNodes.length, isTrimmed };
    }, [repository, selectedFile?.path]);

    // Search Logic
    const searchMatchNodeId = useMemo(() => {
        if (!searchQuery.trim()) return null;
        const lower = searchQuery.toLowerCase();
        const match = rawData.nodes.find(n => n.label.toLowerCase().includes(lower) || n.path.toLowerCase().includes(lower));
        return match ? match.id : null;
    }, [searchQuery, rawData.nodes]);

    useEffect(() => {
        if (searchMatchNodeId) {
            setSelectedNodeId(searchMatchNodeId);
        }
    }, [searchMatchNodeId]);

    // Sync selected file from context
    useEffect(() => {
        if (selectedFile?.path && selectedFile.path !== selectedNodeId) {
            setSelectedNodeId(selectedFile.path);
        }
    }, [selectedFile]);

    // 3. Compute connection sets when a node is selected or hovered
    const { connectedNodeIds, connectedEdgeIds } = useMemo(() => {
        const activeNodeId = hoverNodeId || selectedNodeId;
        
        if (!activeNodeId) {
            return {
                connectedNodeIds: new Set(),
                connectedEdgeIds: new Set()
            };
        }

        const connNodes = new Set([activeNodeId]);
        const connEdges = new Set();

        rawData.edges.forEach((edge) => {
            if (edge.source === activeNodeId) {
                connNodes.add(edge.target);
                connEdges.add(edge.id);
            } else if (edge.target === activeNodeId) {
                connNodes.add(edge.source);
                connEdges.add(edge.id);
            }
        });

        return {
            connectedNodeIds: connNodes,
            connectedEdgeIds: connEdges
        };
    }, [selectedNodeId, hoverNodeId, rawData.edges]);

    // 4. Compute layout and React Flow nodes/edges
    const { layoutedNodes, layoutedEdges } = useMemo(() => {
        const hasActiveFocus = !!hoverNodeId || !!selectedNodeId;

        const flowNodes = rawData.nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoverNodeId === node.id;
            const isConnected = connectedNodeIds.has(node.id) && !isSelected && !isHovered;
            const isDimmed = hasActiveFocus && !connectedNodeIds.has(node.id);

            return {
                id: node.id,
                type: "fileNode",
                data: {
                    label: node.label,
                    ext: node.ext,
                    path: node.path,
                    depsCount: node.depsCount,
                    dependentsCount: node.dependentsCount,
                    isConnected,
                    isDimmed,
                    isHovered,
                    direction,
                    onMouseEnter: () => setHoverNodeId(node.id),
                    onMouseLeave: () => setHoverNodeId(null)
                },
                selected: isSelected,
                position: { x: 0, y: 0 }
            };
        });

        const flowEdges = rawData.edges.map((edge) => {
            const isConnected = connectedEdgeIds.has(edge.id);
            const isDimmed = hasActiveFocus && !isConnected;

            return {
                id: edge.id,
                source: edge.source,
                target: edge.target,
                type: "smoothstep",
                animated: isConnected,
                style: {
                    stroke: isConnected
                        ? "#3b6fed"
                        : isDimmed
                        ? "rgba(15, 22, 38, 0.04)"
                        : "rgba(15, 22, 38, 0.15)",
                    strokeWidth: isConnected ? 2 : 1.2,
                    opacity: isDimmed ? 0.2 : 1,
                    transition: "all 0.3s ease"
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: isConnected ? 16 : 12,
                    height: isConnected ? 16 : 12,
                    color: isConnected
                        ? "#3b6fed"
                        : isDimmed
                        ? "rgba(15, 22, 38, 0.05)"
                        : "rgba(15, 22, 38, 0.2)"
                }
            };
        });

        return getLayoutedElements(flowNodes, flowEdges, direction);
    }, [rawData, selectedNodeId, hoverNodeId, connectedNodeIds, connectedEdgeIds, direction]);

    // Fit view on initial render or layout change
    useEffect(() => {
        const timer = setTimeout(() => {
            fitView({ duration: 600, padding: 0.15 });
        }, 50);
        return () => clearTimeout(timer);
    }, [fitView, layoutedNodes?.length, direction]);

    // Focus on selection
    useEffect(() => {
        if (selectedNodeId && layoutedNodes) {
            const node = layoutedNodes.find(n => n.id === selectedNodeId);
            if (node) {
                // Not strictly fitting view to single node, but we could center it if desired.
                // React Flow provides setCenter, but fitView is safer if we want to see surroundings.
            }
        }
    }, [selectedNodeId, layoutedNodes]);

    // Handlers
    const handleNodeClick = useCallback((_event, node) => {
        setSelectedNodeId(node.id);
        if (repository?.files && setSelectedFile) {
            const found = repository.files.find(f => f.path === node.id || f.name === node.id || f.path.endsWith('/' + node.id));
            if (found) setSelectedFile(found);
        }
    }, [repository, setSelectedFile]);

    const handleNodeDoubleClick = useCallback((_event, node) => {
        setSelectedNodeId(node.id);
        if (repository?.files && setSelectedFile) {
            const found = repository.files.find(f => f.path === node.id || f.name === node.id || f.path.endsWith('/' + node.id));
            if (found) {
                setSelectedFile(found);
                setSourcePreviewOpen?.(true);
            }
        }
    }, [repository, setSelectedFile, setSourcePreviewOpen]);

    const handlePaneClick = useCallback(() => {
        setSelectedNodeId(null);
    }, []);

    // Meta stats
    const totalComponents = rawData.nodes.filter(n => getCategoryForExt(n.ext) === 'Component').length;
    const totalModules = rawData.nodes.filter(n => getCategoryForExt(n.ext) === 'Module').length;

    return (
        <div className="flex flex-col gap-4 w-full h-[620px] sm:h-[680px] xl:h-[720px] min-h-[540px] relative group">
            {/* Minimal Repository Top Bar */}
            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-4 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md shadow-sm border border-[var(--line)] rounded-full px-4 py-2 flex items-center gap-3 pointer-events-auto">
                    <span className="font-semibold text-[13px] text-slate-800 tracking-tight">
                        {repository?.name || "Repository"}
                    </span>
                    <span className="w-px h-3 bg-slate-200" />
                    <span className="text-[11px] font-medium text-slate-500">
                        {rawData.isTrimmed ? `${rawData.nodes.length} files shown (of ${rawData.totalNodes})` : `${rawData.nodes.length} files`} · {rawData.edges.length} dependencies · {totalComponents} components
                    </span>
                </div>

                <div className="bg-white/95 backdrop-blur-md shadow-sm border border-[var(--line)] rounded-full px-3 py-1.5 flex items-center gap-2 pointer-events-auto w-64 transition-all">
                    <Search size={14} className="text-slate-400 shrink-0" />
                    <input 
                        type="text" 
                        placeholder="Search files..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-[12px] font-medium text-slate-700 w-full placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Floating Controls Panel */}
            <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2">
                <div className="bg-white/95 backdrop-blur-md shadow-lg border border-[var(--line)] rounded-xl p-1 flex flex-col gap-1">
                    <button onClick={() => zoomIn({ duration: 300 })} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer" title="Zoom in">
                        <Plus size={16} />
                    </button>
                    <button onClick={() => zoomOut({ duration: 300 })} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer" title="Zoom out">
                        <Minus size={16} />
                    </button>
                    <button onClick={() => fitView({ duration: 600, padding: 0.15 })} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer" title="Fit view">
                        <Maximize2 size={16} />
                    </button>
                    <div className="h-px bg-slate-100 mx-2 my-1" />
                    <button onClick={() => setDirection(d => d === "TB" ? "LR" : "TB")} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer" title="Toggle Layout Direction (Top-Bottom / Left-Right)">
                        <Settings2 size={16} />
                    </button>
                    <button onClick={() => setShowMinimap(!showMinimap)} className={`p-2 rounded-lg transition-colors cursor-pointer ${showMinimap ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'hover:bg-slate-100 text-slate-600'}`} title="Toggle Minimap">
                        <MapIcon size={16} />
                    </button>
                    <button onClick={() => {
                        setSelectedNodeId(null);
                        setSearchQuery("");
                        fitView({ duration: 600, padding: 0.15 });
                    }} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer" title="Reset Layout">
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            {/* Interactive Graph Canvas */}
            <div className="w-full h-full bg-[#f8fafc] rounded-3xl border border-[var(--line)] shadow-inner overflow-hidden relative">
                <ReactFlow
                    nodes={layoutedNodes}
                    edges={layoutedEdges}
                    nodeTypes={nodeTypes}
                    onNodeClick={handleNodeClick}
                    onNodeDoubleClick={handleNodeDoubleClick}
                    onPaneClick={handlePaneClick}
                    fitView
                    minZoom={0.1}
                    maxZoom={2.5}
                    defaultEdgeOptions={{ type: "smoothstep" }}
                    proOptions={{ hideAttribution: true }}
                    nodesDraggable={true}
                    nodesConnectable={false}
                    elementsSelectable={true}
                >
                    <Background
                        variant={BackgroundVariant.Dots}
                        gap={24}
                        size={1.5}
                        color="rgba(148, 163, 184, 0.2)" // slate-400 with opacity
                    />
                    {showMinimap && (
                        <MiniMap 
                            nodeColor={(node) => {
                                return node.id === selectedNodeId ? '#3b6fed' : '#cbd5e1';
                            }}
                            nodeStrokeWidth={3}
                            zoomable
                            pannable
                            className="!bg-white/80 !backdrop-blur-md !border-none !shadow-xl !rounded-xl !bottom-6 !right-6"
                        />
                    )}
                </ReactFlow>
            </div>
        </div>
    );
}

/* ── Exported Component Wrapped in ReactFlowProvider ──────── */
export default function DependencyGraph() {
    return (
        <ReactFlowProvider>
            <DependencyGraphInner />
        </ReactFlowProvider>
    );
}
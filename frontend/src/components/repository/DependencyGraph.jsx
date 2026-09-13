import { useState, useMemo, useCallback, useEffect } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    useReactFlow,
    Handle,
    Position,
    MarkerType,
    Background,
    BackgroundVariant
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "@dagrejs/dagre";
import { useRepository } from "../../context/RepositoryContext";
import { Plus, Minus, Maximize2, FileCode2, ExternalLink, ArrowRight, RotateCcw } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

const NODE_WIDTH = 220;
const NODE_HEIGHT = 54;

/* ── Custom File Node Component ───────────────────────────── */
function FileNode({ data, selected }) {
    const { label, ext, isConnected, isDimmed, onOpen } = data;

    let borderClass = "border-[var(--line)]";
    let shadowClass = "shadow-[0_4px_16px_rgba(15,22,38,0.06)]";
    let ringClass = "";

    if (selected) {
        borderClass = "border-[var(--accent)]";
        shadowClass = "shadow-[0_0_0_3px_rgba(59,111,237,0.25),0_10px_28px_rgba(59,111,237,0.22)]";
        ringClass = "ring-2 ring-[var(--accent)]/40";
    } else if (isConnected) {
        borderClass = "border-[var(--accent)]/70";
        shadowClass = "shadow-[0_0_0_2px_rgba(59,111,237,0.15),0_6px_20px_rgba(59,111,237,0.14)]";
    }

    return (
        <div
            className={`
                relative bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2.5
                flex items-center justify-between gap-2.5 min-w-[190px] max-w-[240px]
                cursor-pointer select-none transition-all duration-200 border
                ${borderClass} ${shadowClass} ${ringClass}
                ${isDimmed ? "opacity-25 filter grayscale contrast-75" : "opacity-100 hover:-translate-y-0.5"}
            `}
        >
            <Handle
                type="target"
                position={Position.Left}
                style={{ opacity: 0, width: 1, height: 1, border: "none" }}
            />

            <div className="flex items-center gap-2 min-w-0 flex-1">
                <FileCode2
                    size={15}
                    className={selected || isConnected ? "text-[var(--accent)]" : "text-[var(--muted)]"}
                />
                <span className="font-mono text-[11.5px] font-medium text-[var(--ink)] truncate" title={label}>
                    {label}
                </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
                {ext && (
                    <span className="font-mono text-[9.5px] text-[var(--muted)] bg-black/[0.04] px-1.5 py-0.5 rounded border border-black/[0.06]">
                        {ext}
                    </span>
                )}
                {selected && onOpen && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpen();
                        }}
                        title="Open in Code Explorer"
                        className="p-1 rounded bg-[var(--accent-soft)] hover:bg-[var(--accent)] text-[var(--accent)] hover:text-white transition-colors cursor-pointer"
                    >
                        <ExternalLink size={12} />
                    </button>
                )}
            </div>

            <Handle
                type="source"
                position={Position.Right}
                style={{ opacity: 0, width: 1, height: 1, border: "none" }}
            />
        </div>
    );
}

const nodeTypes = {
    fileNode: FileNode
};

/* ── Floating Zoom / Pan Controls ─────────────────────────── */
function GraphControls() {
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    return (
        <div className="graph-controls" style={{ zIndex: 10 }}>
            <button
                type="button"
                onClick={() => zoomIn({ duration: 300 })}
                title="Zoom in"
                aria-label="Zoom in"
            >
                <Plus size={14} />
            </button>
            <button
                type="button"
                onClick={() => zoomOut({ duration: 300 })}
                title="Zoom out"
                aria-label="Zoom out"
            >
                <Minus size={14} />
            </button>
            <button
                type="button"
                onClick={() => fitView({ duration: 400, padding: 0.25 })}
                title="Fit view"
                aria-label="Fit view"
            >
                <Maximize2 size={14} />
            </button>
        </div>
    );
}

/* ── Auto Layout Helper using Dagre ───────────────────────── */
function getLayoutedElements(nodes, edges) {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({
        rankdir: "LR",
        nodesep: 40,
        ranksep: 80,
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
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition ? nodeWithPosition.x - NODE_WIDTH / 2 : 0,
                y: nodeWithPosition ? nodeWithPosition.y - NODE_HEIGHT / 2 : 0
            }
        };
    });

    return { nodes: layoutedNodes, edges };
}

/* ── Main Graph Canvas Inner Component ────────────────────── */
function DependencyGraphInner() {
    const { selectedFile, setSelectedFile, repository, setActiveTab } = useRepository() || {};
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const { fitView } = useReactFlow();

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
            // Fallback: derive graph from repository.files if dependencyGraph is not populated
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

        // Resolve edges where target may be a label/filename rather than full path
        const nodeMap = new Map();
        rawNodes.forEach((n) => {
            nodeMap.set(n.id, n.id);
            nodeMap.set(n.label, n.id);
            const base = n.label.replace(/\.[^/.]+$/, "");
            if (base) nodeMap.set(base, n.id);
        });

        const validEdges = [];
        const seen = new Set();

        rawEdges.forEach((e) => {
            const src = nodeMap.get(e.source) || e.source;
            const tgt = nodeMap.get(e.target) || e.target;
            if (src && tgt && src !== tgt && nodeMap.has(src) && nodeMap.has(tgt)) {
                const key = `${src}->${tgt}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    validEdges.push({
                        id: e.id || key,
                        source: src,
                        target: tgt
                    });
                }
            }
        });

        return { nodes: rawNodes, edges: validEdges };
    }, [repository]);

    // 2. Open file in Code Explorer
    const openInExplorer = useCallback(
        (targetFileOrId) => {
            if (!repository?.files) return;
            const targetId = typeof targetFileOrId === "string" ? targetFileOrId : targetFileOrId?.id;
            const foundFile = repository.files.find(
                (f) =>
                    f.path === targetId ||
                    f.name === targetId ||
                    f.path.endsWith("/" + targetId) ||
                    (targetId && targetId.endsWith(f.path))
            );
            if (foundFile) {
                if (setSelectedFile) setSelectedFile(foundFile);
                if (setActiveTab) setActiveTab("explorer");
            } else if (setActiveTab) {
                setActiveTab("explorer");
            }
        },
        [repository, setSelectedFile, setActiveTab]
    );

    // Sync selected file from context if user navigates in with a file preselected
    useEffect(() => {
        if (selectedFile?.path && !selectedNodeId) {
            setSelectedNodeId(selectedFile.path);
        }
    }, [selectedFile]);

    // 3. Compute connection sets when a node is selected
    const { connectedNodeIds, connectedEdgeIds, selectedStats } = useMemo(() => {
        if (!selectedNodeId) {
            return {
                connectedNodeIds: new Set(),
                connectedEdgeIds: new Set(),
                selectedStats: { deps: 0, dependents: 0 }
            };
        }

        const connNodes = new Set([selectedNodeId]);
        const connEdges = new Set();
        let deps = 0;
        let dependents = 0;

        rawData.edges.forEach((edge) => {
            if (edge.source === selectedNodeId) {
                connNodes.add(edge.target);
                connEdges.add(edge.id);
                deps += 1;
            } else if (edge.target === selectedNodeId) {
                connNodes.add(edge.source);
                connEdges.add(edge.id);
                dependents += 1;
            }
        });

        return {
            connectedNodeIds: connNodes,
            connectedEdgeIds: connEdges,
            selectedStats: { deps, dependents }
        };
    }, [selectedNodeId, rawData.edges]);

    // 4. Compute layout and React Flow nodes/edges
    const { layoutedNodes, layoutedEdges } = useMemo(() => {
        const flowNodes = rawData.nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isConnected = connectedNodeIds.has(node.id) && !isSelected;
            const isDimmed = !!selectedNodeId && !connectedNodeIds.has(node.id);

            return {
                id: node.id,
                type: "fileNode",
                data: {
                    label: node.label,
                    ext: node.ext,
                    path: node.path,
                    isConnected,
                    isDimmed,
                    onOpen: () => openInExplorer(node.id)
                },
                selected: isSelected,
                position: { x: 0, y: 0 }
            };
        });

        const flowEdges = rawData.edges.map((edge) => {
            const isConnected = connectedEdgeIds.has(edge.id);
            const isDimmed = !!selectedNodeId && !isConnected;

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
                        ? "rgba(15, 22, 38, 0.05)"
                        : "rgba(59, 111, 237, 0.32)",
                    strokeWidth: isConnected ? 2.2 : 1.2,
                    opacity: isDimmed ? 0.12 : 1,
                    transition: "all 0.25s ease"
                },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: isConnected ? 14 : 10,
                    height: isConnected ? 14 : 10,
                    color: isConnected
                        ? "#3b6fed"
                        : isDimmed
                        ? "rgba(15, 22, 38, 0.1)"
                        : "rgba(59, 111, 237, 0.45)"
                }
            };
        });

        return getLayoutedElements(flowNodes, flowEdges);
    }, [rawData, selectedNodeId, connectedNodeIds, connectedEdgeIds, openInExplorer]);

    // Fit view on initial render or repo change
    useEffect(() => {
        const timer = setTimeout(() => {
            fitView({ duration: 400, padding: 0.25 });
        }, 80);
        return () => clearTimeout(timer);
    }, [fitView, rawData]);

    // Handlers
    const handleNodeClick = useCallback(
        (_event, node) => {
            setSelectedNodeId(node.id);
            if (repository?.files && setSelectedFile) {
                const found = repository.files.find(
                    (f) =>
                        f.path === node.id ||
                        f.name === node.id ||
                        f.path.endsWith("/" + node.id) ||
                        node.id.endsWith(f.path)
                );
                if (found) setSelectedFile(found);
            }
        },
        [repository, setSelectedFile]
    );

    const handleNodeDoubleClick = useCallback(
        (_event, node) => {
            openInExplorer(node.id);
        },
        [openInExplorer]
    );

    const handlePaneClick = useCallback(() => {
        setSelectedNodeId(null);
    }, []);

    const selectedNodeInfo = useMemo(() => {
        if (!selectedNodeId) return null;
        return rawData.nodes.find((n) => n.id === selectedNodeId);
    }, [selectedNodeId, rawData.nodes]);

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Page Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="eyebrow font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold mb-1">
                        // dependency flow
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--ink)] tracking-tight">
                        Module topology
                    </h1>
                </div>
                <div className="page-header-meta flex items-center gap-2.5">
                    <span className="chip">
                        {rawData.nodes.length} {rawData.nodes.length === 1 ? "node" : "nodes"} ·{" "}
                        {rawData.edges.length} {rawData.edges.length === 1 ? "edge" : "edges"}
                    </span>
                    {selectedNodeId && (
                        <button
                            type="button"
                            onClick={() => setSelectedNodeId(null)}
                            className="chip text-[var(--accent)] hover:text-[var(--ink)] flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="Reset graph selection"
                        >
                            <RotateCcw size={11} />
                            <span>Reset</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Interactive Graph Canvas */}
            <GlassCard className="!p-0 overflow-hidden relative">
                <div className="graph-canvas w-full h-[580px] sm:h-[640px] relative">
                    <GraphControls />

                    <ReactFlow
                        nodes={layoutedNodes}
                        edges={layoutedEdges}
                        nodeTypes={nodeTypes}
                        onNodeClick={handleNodeClick}
                        onNodeDoubleClick={handleNodeDoubleClick}
                        onPaneClick={handlePaneClick}
                        fitView
                        minZoom={0.2}
                        maxZoom={2.2}
                        defaultEdgeOptions={{ type: "smoothstep" }}
                        proOptions={{ hideAttribution: true }}
                    >
                        <Background
                            variant={BackgroundVariant.Dots}
                            gap={24}
                            size={1.2}
                            color="rgba(15, 22, 38, 0.08)"
                        />
                    </ReactFlow>

                    {/* Bottom Floating Status & Action Bar */}
                    {selectedNodeInfo ? (
                        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-10">
                            <div className="bg-white/95 backdrop-blur-xl border border-[var(--accent-line)] shadow-[0_12px_36px_rgba(15,22,38,0.14)] rounded-full px-4 py-2 flex items-center justify-between sm:justify-start gap-4 text-xs">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="size-2 rounded-full bg-[var(--accent)] animate-pulse shrink-0" />
                                    <span className="font-mono font-semibold text-[var(--ink)] truncate max-w-[160px] sm:max-w-[260px]">
                                        {selectedNodeInfo.label}
                                    </span>
                                    <span className="text-[var(--muted)] text-[11px] hidden md:inline">
                                        ({selectedStats.deps} {selectedStats.deps === 1 ? "dependency" : "dependencies"},{" "}
                                        {selectedStats.dependents} {selectedStats.dependents === 1 ? "dependent" : "dependents"})
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => openInExplorer(selectedNodeInfo.id)}
                                    className="btn btn-primary !py-1 !px-3 !text-xs !h-auto flex items-center gap-1.5 cursor-pointer font-medium shrink-0"
                                >
                                    <span>Open in Explorer</span>
                                    <ArrowRight size={13} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden sm:block">
                            <div className="bg-white/85 backdrop-blur-md border border-[var(--line)] shadow-sm rounded-full px-3.5 py-1.5 text-[11px] text-[var(--muted)] font-medium">
                                Click a node to trace dependencies · Double-click to open in Code Explorer
                            </div>
                        </div>
                    )}
                </div>
            </GlassCard>
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
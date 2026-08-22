import { useMemo } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { layoutGraph } from "../../utils/layoutGraph";
import { useRepository } from "../../context/RepositoryContext";
import { GitFork, Maximize2, Sparkles, Layers } from "lucide-react";
import Badge from "../common/Badge";

function DependencyGraph() {
    const { repository, selectedFile, setSelectedFile } = useRepository();

    if (!repository || !repository.dependencyGraph) {
        return null;
    }

    const { nodes: rawNodes, edges: rawEdges } = repository.dependencyGraph;

    const formattedNodes = useMemo(() => {
        return (rawNodes || []).map((node, index) => {
            const isSelected = selectedFile && selectedFile.path === node.id;
            const file = repository.files?.find((f) => f.path === node.id);

            return {
                id: node.id,
                position: { x: 100, y: index * 120 },
                data: {
                    label: (
                        <div className="flex flex-col gap-1 py-1 px-1 min-w-[140px] text-left">
                            <div className="flex items-center justify-between gap-2">
                                <span className="font-mono font-bold text-xs text-white truncate max-w-[120px]">
                                    {node.label}
                                </span>
                                {file?.extension && (
                                    <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-white/10 text-slate-300">
                                        {file.extension}
                                    </span>
                                )}
                            </div>
                            {file?.lineCount && (
                                <span className="font-mono text-[10px] text-slate-400">
                                    {file.lineCount} lines
                                </span>
                            )}
                        </div>
                    ),
                },
                type: "default",
                style: {
                    background: isSelected
                        ? "linear-gradient(135deg, rgba(0, 245, 155, 0.2) 0%, rgba(18, 24, 36, 0.95) 100%)"
                        : "rgba(18, 24, 36, 0.9)",
                    border: isSelected
                        ? "2px solid #00f59b"
                        : "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "14px",
                    boxShadow: isSelected
                        ? "0 0 25px rgba(0, 245, 155, 0.5), inset 0 0 10px rgba(0, 245, 155, 0.2)"
                        : "0 4px 20px rgba(0, 0, 0, 0.4)",
                    color: "#f8fafc",
                    padding: "8px 12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                },
            };
        });
    }, [rawNodes, selectedFile, repository.files]);

    const formattedEdges = useMemo(() => {
        return (rawEdges || []).map((edge) => ({
            ...edge,
            animated: true,
            style: {
                stroke: "rgba(56, 189, 248, 0.6)",
                strokeWidth: 2,
            },
        }));
    }, [rawEdges]);

    const layoutedNodes = useMemo(() => {
        return layoutGraph(formattedNodes, formattedEdges);
    }, [formattedNodes, formattedEdges]);

    function handleNodeClick(event, node) {
        const file = repository.files?.find((f) => f.path === node.id);
        if (file) {
            setSelectedFile(file);
        }
    }

    return (
        <div className="flex flex-col gap-4 p-6 rounded-3xl glass-card border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-sky-500/20 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                        <GitFork size={18} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-display font-extrabold text-xl text-white tracking-tight">
                            Dependency Flow Canvas
                        </h2>
                        <span className="text-xs text-slate-400 font-mono">
                            Interactive visual topology of imports, exports, and internal module relationships
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Badge variant="cyan" className="font-mono text-xs">
                        {rawNodes?.length || 0} Nodes · {rawEdges?.length || 0} Edges
                    </Badge>
                </div>
            </div>

            {/* Canvas */}
            <div className="w-full h-[540px] rounded-2xl overflow-hidden bg-[#070a0f] border border-white/[0.08] relative shadow-inner">
                <ReactFlow
                    nodes={layoutedNodes}
                    edges={formattedEdges}
                    fitView
                    onNodeClick={handleNodeClick}
                    attributionPosition="bottom-right"
                >
                    <Background color="#1e293b" gap={20} size={1} />
                    <Controls className="bg-[#121824] border border-white/10 rounded-xl overflow-hidden fill-white" />
                </ReactFlow>

                {/* Floating Canvas Hint */}
                <div className="absolute bottom-4 left-4 pointer-events-none px-3 py-1.5 rounded-full bg-slate-950/80 border border-white/10 backdrop-blur-md text-[10px] font-mono text-slate-400">
                    💡 Click any node to open in VS Code code inspector
                </div>
            </div>
        </div>
    );
}

export default DependencyGraph;
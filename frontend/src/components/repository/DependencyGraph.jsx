import { useState } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { Plus, Minus, Maximize2 } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

const SAMPLE_NODES = [
    { id: "index.js", label: "index.js", ext: ".js", left: 70, top: 105 },
    { id: "ReactFiberBeginWork.js", label: "ReactFiberBeginWork.js", ext: ".js", left: 230, top: 75 },
    { id: "ReactFiberHooks.js", label: "ReactFiberHooks.js", ext: ".js", left: 230, top: 205 },
    { id: "ReactFiberWorkLoop.js", label: "ReactFiberWorkLoop.js", ext: ".js", left: 410, top: 135 },
    { id: "ReactDOMRoot.js", label: "ReactDOMRoot.js", ext: ".js", left: 590, top: 135 },
];

const SAMPLE_EDGES = [
    { x1: 150, y1: 120, x2: 290, y2: 90 },
    { x1: 150, y1: 120, x2: 290, y2: 220 },
    { x1: 290, y1: 90, x2: 470, y2: 150 },
    { x1: 290, y1: 220, x2: 470, y2: 150 },
    { x1: 470, y1: 150, x2: 650, y2: 150 },
];

function DependencyGraph() {
    const { selectedFile, setSelectedFile, repository } = useRepository() || {};
    const [selectedNodeId, setSelectedNodeId] = useState(
        selectedFile?.name || "ReactFiberBeginWork.js"
    );

    const handleNodeClick = (node) => {
        setSelectedNodeId(node.id);
        if (repository?.files) {
            const foundFile = repository.files.find(
                (f) => f.name === node.id || f.path.endsWith("/" + node.id)
            );
            if (foundFile && setSelectedFile) {
                setSelectedFile(foundFile);
            }
        }
    };

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
                <div className="page-header-meta">
                    <span className="chip">128 nodes · 341 edges</span>
                </div>
            </div>

            {/* Large GlassCard Canvas */}
            <GlassCard className="!p-0 overflow-hidden">
                <div className="graph-canvas w-full relative">
                    {/* Floating Controls (Top-Right) */}
                    <div className="graph-controls">
                        <button title="Zoom in" aria-label="Zoom in">
                            <Plus size={14} />
                        </button>
                        <button title="Zoom out" aria-label="Zoom out">
                            <Minus size={14} />
                        </button>
                        <button title="Fit view" aria-label="Fit view">
                            <Maximize2 size={14} />
                        </button>
                    </div>

                    {/* SVG Connector Lines */}
                    <svg
                        className="w-full h-full absolute inset-0 pointer-events-none"
                        style={{ position: "absolute", inset: 0 }}
                    >
                        <defs>
                            <marker
                                id="arrow"
                                markerWidth="8"
                                markerHeight="8"
                                refX="6"
                                refY="3"
                                orient="auto"
                            >
                                <path d="M0,0 L6,3 L0,6 z" fill="rgba(59,111,237,0.5)" />
                            </marker>
                        </defs>
                        {SAMPLE_EDGES.map((edge, idx) => (
                            <line
                                key={idx}
                                x1={edge.x1}
                                y1={edge.y1}
                                x2={edge.x2}
                                y2={edge.y2}
                                stroke="rgba(59,111,237,0.35)"
                                strokeWidth="1.4"
                                markerEnd="url(#arrow)"
                            />
                        ))}
                    </svg>

                    {/* Interactive Sample Nodes */}
                    {SAMPLE_NODES.map((node) => {
                        const isSelected = selectedNodeId === node.id || selectedFile?.name === node.id;
                        return (
                            <div
                                key={node.id}
                                onClick={() => handleNodeClick(node)}
                                className={`node ${isSelected ? "selected" : ""}`}
                                style={{ left: `${node.left}px`, top: `${node.top}px` }}
                            >
                                <span>{node.label}</span>
                                <span className="ext">{node.ext}</span>
                            </div>
                        );
                    })}
                </div>
            </GlassCard>
        </div>
    );
}

export default DependencyGraph;
import { useState } from "react";
import { GitFork, ZoomIn, ZoomOut, Maximize2, Layers } from "lucide-react";

export default function DependencyGraphPreview() {
    const [selectedNode, setSelectedNode] = useState("App.jsx");
    const [zoom, setZoom] = useState(1);

    const NODES = [
        { id: "main.jsx", name: "main.jsx", x: 80, y: 150, lines: 32, type: "entry", deps: ["App.jsx"] },
        { id: "App.jsx", name: "App.jsx", x: 260, y: 150, lines: 142, type: "root", deps: ["Router.jsx", "Dashboard.jsx", "Auth.jsx"] },
        { id: "Router.jsx", name: "Router.jsx", x: 440, y: 60, lines: 75, type: "routing", deps: ["Dashboard.jsx", "Auth.jsx"] },
        { id: "Auth.jsx", name: "Auth.jsx", x: 440, y: 150, lines: 110, type: "auth", deps: ["api.js"] },
        { id: "Dashboard.jsx", name: "Dashboard.jsx", x: 440, y: 240, lines: 198, type: "ui", deps: ["api.js"] },
        { id: "api.js", name: "api.js", x: 620, y: 150, lines: 88, type: "service", deps: ["database.js"] },
        { id: "database.js", name: "database.js", x: 790, y: 150, lines: 54, type: "data", deps: [] },
    ];

    const EDGES = [
        { from: "main.jsx", to: "App.jsx" },
        { from: "App.jsx", to: "Router.jsx" },
        { from: "App.jsx", to: "Auth.jsx" },
        { from: "App.jsx", to: "Dashboard.jsx" },
        { from: "Router.jsx", to: "Dashboard.jsx" },
        { from: "Auth.jsx", to: "api.js" },
        { from: "Dashboard.jsx", to: "api.js" },
        { from: "api.js", to: "database.js" },
    ];

    const activeNodeData = NODES.find((n) => n.id === selectedNode) || NODES[1];

    const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 1.4));
    const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.7));
    const handleReset = () => setZoom(1);

    return (
        <section
            id="dependency-graph"
            className="py-24 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full relative"
        >
            {/* Ambient Lighting */}
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col items-start gap-4 mb-14">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    // TOPOLOGY MAPPING
                </span>
                <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-2xl">
                    See the architecture, <br />
                    <span className="text-white/80">not just the files.</span>
                </h2>
                <p className="text-base sm:text-lg text-white/60 font-normal max-w-xl">
                    Navigate relationships instead of opening files one by one.
                </p>
            </div>

            {/* --- GRAPH CONTAINER --- */}
            <div className="w-full rounded-3xl bg-[#090d12]/90 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col relative">
                {/* Graph Top Header Bar */}
                <div className="px-6 py-4 bg-white/[0.02] border-b border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400">
                            <GitFork size={16} />
                        </div>
                        <span className="font-mono text-xs font-semibold text-white">
                            Interactive Dependency Flow Canvas
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Zoom Controls */}
                        <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-xl p-1">
                            <button
                                onClick={handleZoomIn}
                                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                                title="Zoom in"
                                aria-label="Zoom in"
                            >
                                <ZoomIn size={14} />
                            </button>
                            <button
                                onClick={handleZoomOut}
                                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                                title="Zoom out"
                                aria-label="Zoom out"
                            >
                                <ZoomOut size={14} />
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-2 py-1 text-[11px] font-mono text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                                title="Fit view"
                            >
                                Fit
                            </button>
                        </div>
                    </div>
                </div>

                {/* Canvas Area */}
                <div className="w-full min-h-[460px] bg-[#050709] relative overflow-hidden flex items-center justify-center p-6 bg-tech-grid">
                    {/* SVG Interactive Canvas Layer */}
                    <div
                        className="w-full max-w-[900px] h-[340px] relative transition-transform duration-200"
                        style={{ transform: `scale(${zoom})` }}
                    >
                        {/* Render SVG Edges */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 340">
                            <defs>
                                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                                </linearGradient>
                            </defs>

                            {EDGES.map((edge, idx) => {
                                const fromNode = NODES.find((n) => n.id === edge.from);
                                const toNode = NODES.find((n) => n.id === edge.to);
                                if (!fromNode || !toNode) return null;

                                const isConnected = selectedNode === edge.from || selectedNode === edge.to;

                                return (
                                    <path
                                        key={idx}
                                        d={`M ${fromNode.x + 60} ${fromNode.y + 25} C ${fromNode.x + 130} ${fromNode.y + 25}, ${toNode.x - 70} ${toNode.y + 25}, ${toNode.x} ${toNode.y + 25}`}
                                        stroke={isConnected ? "url(#edgeGrad)" : "rgba(255,255,255,0.12)"}
                                        strokeWidth={isConnected ? 2.5 : 1.2}
                                        fill="none"
                                        className={isConnected ? "animate-edge-flow" : ""}
                                    />
                                );
                            })}
                        </svg>

                        {/* Render Nodes */}
                        {NODES.map((node) => {
                            const isSelected = selectedNode === node.id;
                            const isConnected =
                                isSelected ||
                                EDGES.some(
                                    (e) =>
                                        (e.from === selectedNode && e.to === node.id) ||
                                        (e.to === selectedNode && e.from === node.id)
                                );

                            return (
                                <button
                                    key={node.id}
                                    onClick={() => setSelectedNode(node.id)}
                                    style={{ left: `${node.x}px`, top: `${node.y}px` }}
                                    className={`
                                        absolute -translate-y-1/2 p-3 rounded-2xl font-mono text-xs transition-all duration-200 cursor-pointer text-left
                                        ${isSelected
                                            ? "bg-cyan-950/90 border-2 border-cyan-400 text-white shadow-[0_0_25px_rgba(34,211,238,0.5)] scale-110 z-20"
                                            : isConnected
                                            ? "bg-[#0d1217] border border-cyan-400/40 text-white/90 hover:border-cyan-400 z-10"
                                            : "bg-[#0a0e13]/80 border border-white/10 text-white/60 hover:text-white hover:border-white/30 z-0"
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-1.5 font-bold">
                                        <span className={`size-2 rounded-full ${isSelected ? "bg-cyan-400 animate-pulse" : "bg-white/30"}`} />
                                        <span>{node.name}</span>
                                    </div>
                                    <div className="text-[10px] text-white/40 mt-1">
                                        {node.lines} lines · {node.deps.length} deps
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Bottom-Right Metric Badge */}
                    <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md font-mono text-[11px] text-white/60 flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">27 NODES</span>
                        <span className="text-white/20">·</span>
                        <span className="text-emerald-400 font-bold">42 EDGES</span>
                    </div>

                    {/* Bottom-Left Node Inspector Pill */}
                    <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md font-mono text-[11px] text-white/70">
                        <span className="text-white font-bold">{activeNodeData.name}:</span>
                        <span className="text-white/50">{activeNodeData.lines} lines</span>
                        <span className="text-white/20">|</span>
                        <span className="text-cyan-300">
                            Imports: {activeNodeData.deps.join(", ") || "None"}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

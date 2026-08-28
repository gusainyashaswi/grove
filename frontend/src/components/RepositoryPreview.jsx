import { useState } from "react";

export default function RepositoryPreview() {
    const [selectedFile, setSelectedFile] = useState("App.jsx");

    const FILE_DETAILS = {
        "App.jsx": { lines: 142, deps: ["Navbar.jsx", "api.js"], type: "jsx" },
        "Navbar.jsx": { lines: 64, deps: ["Dashboard.jsx"], type: "jsx" },
        "Dashboard.jsx": { lines: 198, deps: [], type: "jsx" },
        "api.js": { lines: 88, deps: ["Dashboard.jsx"], type: "js" },
        "main.jsx": { lines: 32, deps: ["App.jsx"], type: "jsx" },
        "package.json": { lines: 45, deps: [], type: "json" },
        "README.md": { lines: 120, deps: [], type: "md" },
    };

    return (
        <div className="relative w-full max-w-[620px] rounded-3xl bg-white/[0.025] border border-white/10 backdrop-blur-xl shadow-2xl p-5 sm:p-6 flex flex-col justify-between gap-5 overflow-hidden transition-all">
            {/* Ambient Inner Corner Glows */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* --- TOP: MINI REPOSITORY HEADER --- */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] relative z-10">
                <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">
                        GROVE / REPOSITORY MAP
                    </span>
                    <span className="font-mono text-xs font-semibold text-white/90">
                        github.com/example/project
                    </span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] font-bold text-emerald-300">ANALYZED</span>
                </div>
            </div>

            {/* --- CENTER: SPLIT TREE & GRAPH VISUALIZATION --- */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 relative z-10 my-auto items-stretch">
                {/* Left Side: Mini File Tree (5 cols) */}
                <div className="sm:col-span-5 flex flex-col p-3 rounded-2xl bg-black/40 border border-white/[0.06] font-mono text-[11px] leading-relaxed text-white/70 overflow-hidden">
                    <div className="text-[10px] uppercase font-bold text-white/30 tracking-wider mb-2 flex items-center justify-between">
                        <span>Explorer</span>
                        <span className="text-[9px] text-cyan-400/80">AST parsed</span>
                    </div>

                    <div className="flex flex-col gap-0.5 select-none">
                        <div className="text-white/40 font-bold">project/</div>
                        <div className="pl-2.5 text-white/50">├── src/</div>
                        <div className="pl-5 text-white/50">├── components/</div>
                        <button
                            onClick={() => setSelectedFile("Navbar.jsx")}
                            className={`pl-8 text-left py-0.5 rounded transition-all cursor-pointer truncate ${
                                selectedFile === "Navbar.jsx"
                                    ? "bg-cyan-500/20 text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-7"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            ├── Navbar.jsx
                        </button>
                        <button
                            onClick={() => setSelectedFile("Dashboard.jsx")}
                            className={`pl-8 text-left py-0.5 rounded transition-all cursor-pointer truncate ${
                                selectedFile === "Dashboard.jsx"
                                    ? "bg-cyan-500/20 text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-7"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            └── Dashboard.jsx
                        </button>
                        <div className="pl-5 text-white/50">├── services/</div>
                        <button
                            onClick={() => setSelectedFile("api.js")}
                            className={`pl-8 text-left py-0.5 rounded transition-all cursor-pointer truncate ${
                                selectedFile === "api.js"
                                    ? "bg-cyan-500/20 text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-7"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            └── api.js
                        </button>
                        <button
                            onClick={() => setSelectedFile("App.jsx")}
                            className={`pl-5 text-left py-0.5 rounded transition-all cursor-pointer truncate ${
                                selectedFile === "App.jsx"
                                    ? "bg-cyan-500/20 text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-4"
                                    : "text-white/80 hover:text-white"
                            }`}
                        >
                            ├── App.jsx
                        </button>
                        <button
                            onClick={() => setSelectedFile("main.jsx")}
                            className={`pl-5 text-left py-0.5 rounded transition-all cursor-pointer truncate ${
                                selectedFile === "main.jsx"
                                    ? "bg-cyan-500/20 text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-4"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            └── main.jsx
                        </button>
                        <div className="pl-2.5 text-white/40">├── package.json</div>
                        <div className="pl-2.5 text-white/40">└── README.md</div>
                    </div>
                </div>

                {/* Right Side: Mini Interactive Dependency Graph (7 cols) */}
                <div className="sm:col-span-7 relative flex flex-col justify-center items-center p-3 rounded-2xl bg-black/40 border border-white/[0.06] min-h-[220px]">
                    {/* SVG Connector Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 280 200">
                        {/* Edge from App.jsx (top-center) to Navbar.jsx (mid-left) */}
                        <path
                            d="M 140 45 L 75 100"
                            stroke={selectedFile === "App.jsx" || selectedFile === "Navbar.jsx" ? "#22d3ee" : "rgba(255,255,255,0.15)"}
                            strokeWidth={selectedFile === "App.jsx" || selectedFile === "Navbar.jsx" ? "2" : "1.2"}
                            fill="none"
                            className={selectedFile === "App.jsx" ? "animate-edge-flow" : ""}
                        />
                        {/* Edge from App.jsx (top-center) to api.js (mid-right) */}
                        <path
                            d="M 140 45 L 205 100"
                            stroke={selectedFile === "App.jsx" || selectedFile === "api.js" ? "#22d3ee" : "rgba(255,255,255,0.15)"}
                            strokeWidth={selectedFile === "App.jsx" || selectedFile === "api.js" ? "2" : "1.2"}
                            fill="none"
                            className={selectedFile === "App.jsx" ? "animate-edge-flow" : ""}
                        />
                        {/* Edge from Navbar.jsx to Dashboard.jsx */}
                        <path
                            d="M 75 125 L 140 165"
                            stroke={selectedFile === "Navbar.jsx" || selectedFile === "Dashboard.jsx" ? "#22d3ee" : "rgba(255,255,255,0.15)"}
                            strokeWidth={selectedFile === "Navbar.jsx" || selectedFile === "Dashboard.jsx" ? "2" : "1.2"}
                            fill="none"
                        />
                        {/* Edge from api.js to Dashboard.jsx */}
                        <path
                            d="M 205 125 L 140 165"
                            stroke={selectedFile === "api.js" || selectedFile === "Dashboard.jsx" ? "#22d3ee" : "rgba(255,255,255,0.15)"}
                            strokeWidth={selectedFile === "api.js" || selectedFile === "Dashboard.jsx" ? "2" : "1.2"}
                            fill="none"
                        />
                    </svg>

                    {/* Node 1: App.jsx (Top) */}
                    <div className="w-full flex justify-center mb-5">
                        <button
                            onClick={() => setSelectedFile("App.jsx")}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-mono transition-all cursor-pointer shadow-lg ${
                                selectedFile === "App.jsx"
                                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105"
                                    : "bg-white/[0.04] border border-white/10 text-white/80 hover:border-white/30"
                            }`}
                        >
                            <div className="font-bold flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-cyan-400" />
                                App.jsx
                            </div>
                            <div className="text-[8.5px] text-white/40">142 lines</div>
                        </button>
                    </div>

                    {/* Nodes Level 2: Navbar.jsx & api.js */}
                    <div className="w-full flex justify-between px-2 mb-5">
                        <button
                            onClick={() => setSelectedFile("Navbar.jsx")}
                            className={`px-2.5 py-1.5 rounded-xl text-[10px] font-mono transition-all cursor-pointer shadow-lg ${
                                selectedFile === "Navbar.jsx"
                                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105"
                                    : "bg-white/[0.04] border border-white/10 text-white/80 hover:border-white/30"
                            }`}
                        >
                            <div className="font-bold">Navbar.jsx</div>
                            <div className="text-[8.5px] text-white/40">64 lines</div>
                        </button>

                        <button
                            onClick={() => setSelectedFile("api.js")}
                            className={`px-2.5 py-1.5 rounded-xl text-[10px] font-mono transition-all cursor-pointer shadow-lg ${
                                selectedFile === "api.js"
                                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105"
                                    : "bg-white/[0.04] border border-white/10 text-white/80 hover:border-white/30"
                            }`}
                        >
                            <div className="font-bold">api.js</div>
                            <div className="text-[8.5px] text-white/40">88 lines</div>
                        </button>
                    </div>

                    {/* Node Level 3: Dashboard.jsx (Bottom) */}
                    <div className="w-full flex justify-center">
                        <button
                            onClick={() => setSelectedFile("Dashboard.jsx")}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-mono transition-all cursor-pointer shadow-lg ${
                                selectedFile === "Dashboard.jsx"
                                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105"
                                    : "bg-white/[0.04] border border-white/10 text-white/80 hover:border-white/30"
                            }`}
                        >
                            <div className="font-bold flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-emerald-400" />
                                Dashboard.jsx
                            </div>
                            <div className="text-[8.5px] text-white/40">198 lines</div>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- BOTTOM: LIVE METRICS BAR --- */}
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/60 overflow-x-auto gap-2 select-none relative z-10">
                <span className="whitespace-nowrap">
                    <strong className="text-white font-bold">42</strong> Files
                </span>
                <span className="text-white/20">|</span>
                <span className="whitespace-nowrap">
                    <strong className="text-white font-bold">8</strong> Folders
                </span>
                <span className="text-white/20">|</span>
                <span className="whitespace-nowrap">
                    <strong className="text-cyan-300 font-bold">6.8k</strong> Lines
                </span>
                <span className="text-white/20">|</span>
                <span className="whitespace-nowrap">
                    <strong className="text-emerald-300 font-bold">3.2</strong> Avg Deps
                </span>
                <span className="text-white/20">|</span>
                <span className="text-cyan-400 font-semibold whitespace-nowrap">React + Express</span>
            </div>
        </div>
    );
}

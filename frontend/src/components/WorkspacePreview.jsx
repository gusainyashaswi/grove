import { useState } from "react";
import { Copy, Check, FileCode, Layers, GitFork, Sparkles, Folder, ChevronRight, Terminal } from "lucide-react";

export default function WorkspacePreview() {
    const [activeFile, setActiveFile] = useState("App.jsx");
    const [copied, setCopied] = useState(false);

    const MOCK_FILES = {
        "App.jsx": {
            name: "App.jsx",
            lines: 142,
            type: "REACT COMPONENT",
            code: `01 import React from "react";
02 import Router from "./router";
03 import Dashboard from "./Dashboard";
04
05 export default function App() {
06   return (
07     <Router>
08       <Dashboard />
09     </Router>
10   );
11 }`,
            imports: ["Router.jsx", "Dashboard.jsx"],
            importedBy: ["main.jsx"],
            explanation: "Application root responsible for mounting the primary layout, initializing client-side routing, and injecting context state.",
        },
        "main.jsx": {
            name: "main.jsx",
            lines: 32,
            type: "ENTRY POINT",
            code: `01 import React from "react";
02 import ReactDOM from "react-dom/client";
03 import App from "./App";
04 import "./styles/global.css";
05
06 ReactDOM.createRoot(
07   document.getElementById("root")
08 ).render(<App />);`,
            imports: ["App.jsx", "global.css"],
            importedBy: [],
            explanation: "Client entry point file that mounts the root React virtual DOM tree into the document body with global CSS styles.",
        },
        "Dashboard.jsx": {
            name: "Dashboard.jsx",
            lines: 198,
            type: "REACT COMPONENT",
            code: `01 import { useState, useEffect } from "react";
02 import { fetchStats } from "../services/api";
03 import StatsWidget from "./StatsWidget";
04
05 export default function Dashboard() {
06   const [data, setData] = useState(null);
07   useEffect(() => { fetchStats().then(setData); }, []);
08   return <StatsWidget data={data} />;
09 }`,
            imports: ["api.js", "StatsWidget.jsx"],
            importedBy: ["App.jsx"],
            explanation: "Core repository metrics overview dashboard coordinating telemetry stats and visual graph displays.",
        },
        "api.js": {
            name: "api.js",
            lines: 88,
            type: "SERVICE LAYER",
            code: `01 import axios from "axios";
02
03 const client = axios.create({
04   baseURL: "/api/v1",
05   timeout: 10000,
06 });
07
08 export const fetchStats = () => client.get("/stats");`,
            imports: ["axios"],
            importedBy: ["Dashboard.jsx"],
            explanation: "HTTP client abstraction for repository analysis endpoints with configurable timeout and response transformers.",
        },
    };

    const current = MOCK_FILES[activeFile];

    const handleCopy = () => {
        navigator.clipboard.writeText(current.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            id="workspace-preview"
            className="py-24 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full relative"
        >
            {/* Header */}
            <div className="flex flex-col items-start gap-4 mb-14">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    // WORKSPACE INTERFACE
                </span>
                <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-2xl">
                    A dedicated studio for <br />
                    <span className="text-white/80">codebase comprehension.</span>
                </h2>
                <p className="text-base sm:text-lg text-white/60 font-normal max-w-xl">
                    Browse source code with AST dependency overlays, file-level AI explication, and reverse import lookups in real-time.
                </p>
            </div>

            {/* --- WORKSPACE PREVIEW GLASS CONTAINER --- */}
            <div className="w-full rounded-3xl bg-[#090d12]/90 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col">
                {/* Top Window Chrome */}
                <div className="px-5 py-3.5 bg-white/[0.02] border-b border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="size-2.5 rounded-full bg-rose-500/60" />
                        <span className="size-2.5 rounded-full bg-amber-500/60" />
                        <span className="size-2.5 rounded-full bg-emerald-500/60" />
                        <span className="ml-3 font-mono text-xs text-white/40">
                            Grove / workspace — {current.name}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-cyan-400/80 bg-cyan-950/40 border border-cyan-400/20 px-2.5 py-0.5 rounded-full">
                            AST Inspector
                        </span>
                    </div>
                </div>

                {/* 3-Column Layout: Left (Explorer), Center (Editor), Right (Inspector) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
                    {/* --- COLUMN 1: FILE EXPLORER (3 cols) --- */}
                    <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/[0.08] p-4 bg-white/[0.01] flex flex-col gap-2 text-xs font-mono">
                        <span className="text-[10px] uppercase font-bold text-white/30 tracking-wider mb-2">
                            PROJECT FILES
                        </span>

                        <div className="flex flex-col gap-1 text-white/70 select-none">
                            <div className="flex items-center gap-1.5 text-white/40 font-bold">
                                <Folder size={13} className="text-white/40" />
                                <span>src/</span>
                            </div>

                            <div className="pl-4 flex flex-col gap-1">
                                <div className="text-white/40">├── components/</div>
                                <div className="text-white/40">├── controllers/</div>
                                <div className="text-white/40">├── services/</div>

                                {Object.keys(MOCK_FILES).map((fileKey) => (
                                    <button
                                        key={fileKey}
                                        onClick={() => setActiveFile(fileKey)}
                                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                                            activeFile === fileKey
                                                ? "bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                                                : "hover:bg-white/[0.04] text-white/70 hover:text-white"
                                        }`}
                                    >
                                        <FileCode size={13} className={activeFile === fileKey ? "text-cyan-400" : "text-white/40"} />
                                        <span>{fileKey}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- COLUMN 2: CODE PREVIEW (6 cols) --- */}
                    <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col bg-[#050709]">
                        {/* Editor Tab Bar */}
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                            <div className="flex items-center gap-2 font-mono text-xs text-white/90">
                                <span className="size-1.5 rounded-full bg-cyan-400" />
                                <span>{current.name}</span>
                                <span className="text-white/30">({current.lines} lines)</span>
                            </div>

                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-white/50 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                                title="Copy code"
                            >
                                {copied ? (
                                    <>
                                        <Check size={12} className="text-emerald-400" />
                                        <span className="text-emerald-400">Copied</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={12} />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Code Lines */}
                        <div className="p-4 sm:p-6 overflow-x-auto flex-1 font-mono text-xs sm:text-[13px] leading-relaxed text-white/80 select-text">
                            <pre className="m-0 text-slate-200">
                                <code>{current.code}</code>
                            </pre>
                        </div>
                    </div>

                    {/* --- COLUMN 3: INSPECTOR & AI EXPLANATION (3 cols) --- */}
                    <div className="lg:col-span-3 p-5 flex flex-col justify-between gap-5 bg-white/[0.015] text-xs font-mono">
                        <div className="flex flex-col gap-4">
                            {/* File Name & Metric */}
                            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                                <span className="font-bold text-white uppercase">{current.name}</span>
                                <span className="text-cyan-400 text-[10px] font-semibold bg-cyan-950/40 border border-cyan-400/20 px-2 py-0.5 rounded">
                                    {current.lines} LINES
                                </span>
                            </div>

                            {/* Imports */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1">
                                    <GitFork size={11} className="text-cyan-400" />
                                    IMPORTS ({current.imports.length})
                                </span>
                                <div className="flex flex-wrap gap-1">
                                    {current.imports.length > 0 ? (
                                        current.imports.map((imp) => (
                                            <span
                                                key={imp}
                                                className="text-[11px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded"
                                            >
                                                → {imp}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-white/30 text-[11px] italic">No local imports</span>
                                    )}
                                </div>
                            </div>

                            {/* Imported By */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1">
                                    <Layers size={11} className="text-purple-400" />
                                    IMPORTED BY ({current.importedBy.length})
                                </span>
                                <div className="flex flex-wrap gap-1">
                                    {current.importedBy.length > 0 ? (
                                        current.importedBy.map((dep) => (
                                            <span
                                                key={dep}
                                                className="text-[11px] text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded"
                                            >
                                                → {dep}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-white/30 text-[11px] italic">Root entry / standalone</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* AI Explanation */}
                        <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20 flex flex-col gap-2 mt-auto">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles size={12} />
                                AI EXPLANATION
                            </span>
                            <p className="text-[11px] leading-relaxed text-white/70 font-sans">
                                {current.explanation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

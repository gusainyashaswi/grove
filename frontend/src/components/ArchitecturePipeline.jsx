import { useState } from "react";
import { GitBranch, GitPullRequest, Code2, Database, GitFork, Filter, Sparkles, ArrowRight } from "lucide-react";

export default function ArchitecturePipeline() {
    const [activeStage, setActiveStage] = useState(2); // default on Babel AST

    const STAGES = [
        {
            id: 0,
            icon: GitBranch,
            title: "GitHub Repository",
            tag: "PUBLIC REPO",
            description: "Clones public Git repositories via HTTPS with shallow commit depth for rapid parsing.",
        },
        {
            id: 1,
            icon: GitPullRequest,
            title: "Repository Clone",
            tag: "SHALLOW CLONE",
            description: "Extracts local file trees and sanitizes ignored directories (node_modules, dist, .git).",
        },
        {
            id: 2,
            icon: Code2,
            title: "Babel AST Parsing",
            tag: "@BABEL/PARSER",
            description: "Parses JS, JSX, TS, and TSX files into Abstract Syntax Trees to extract exact import/export specifiers.",
        },
        {
            id: 3,
            icon: Database,
            title: "Structural Index",
            tag: "JSON KNOWLEDGE",
            description: "Aggregates folder distributions, entry point candidates, line counts, and health signals into compact metadata.",
        },
        {
            id: 4,
            icon: GitFork,
            title: "Dependency Graph",
            tag: "DAGRE / FLOW",
            description: "Builds a Directed Acyclic Graph (DAG) with auto-layout nodes and directional dependency edges.",
        },
        {
            id: 5,
            icon: Filter,
            title: "Relevance Selection",
            tag: "4-FILE RANK",
            description: "Deterministically matches user query tokens to score and select up to 4 exact source files for Q&A.",
        },
        {
            id: 6,
            icon: Sparkles,
            title: "Gemini Intelligence",
            tag: "GEMINI 2.5 FLASH",
            description: "Synthesizes architectural summaries, file explanations, and source-grounded answers with strict isolation.",
        },
    ];

    return (
        <section
            id="architecture"
            className="py-24 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full relative"
        >
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-cyan-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col items-start gap-4 mb-16 relative z-10">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    // PIPELINE ARCHITECTURE
                </span>
                <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-2xl">
                    From repository URL <br />
                    <span className="text-white/80">to architectural understanding.</span>
                </h2>
                <p className="text-base sm:text-lg text-white/60 font-normal max-w-xl">
                    A deterministic pipeline converting raw GitHub repositories into isolated knowledge graphs and AI context.
                </p>
            </div>

            {/* Horizontal Pipeline Stages (Desktop / Tablet) & Vertical on Mobile */}
            <div className="w-full relative z-10 flex flex-col gap-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 relative">
                    {STAGES.map((stage, idx) => {
                        const Icon = stage.icon;
                        const isActive = activeStage === stage.id;

                        return (
                            <button
                                key={stage.title}
                                onClick={() => setActiveStage(stage.id)}
                                className={`
                                    relative p-4 rounded-2xl text-left flex flex-col justify-between gap-4 transition-all duration-200 cursor-pointer
                                    ${isActive
                                        ? "bg-white/[0.07] border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] scale-[1.02]"
                                        : "bg-white/[0.025] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20"
                                    }
                                `}
                            >
                                <div className="flex items-center justify-between">
                                    <div className={`flex size-9 items-center justify-center rounded-xl transition-colors ${
                                        isActive
                                            ? "bg-cyan-400/20 text-cyan-300"
                                            : "bg-white/5 text-white/60"
                                    }`}>
                                        <Icon size={16} />
                                    </div>
                                    <span className="font-mono text-[9px] text-white/30 font-bold">
                                        0{idx + 1}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="font-heading font-semibold text-xs sm:text-sm text-white leading-snug">
                                        {stage.title}
                                    </span>
                                    <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400/80 font-medium">
                                        {stage.tag}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Active Stage Inspector Callout */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shrink-0">
                            {(() => {
                                const CurrentIcon = STAGES[activeStage].icon;
                                return <CurrentIcon size={22} />;
                            })()}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <h3 className="font-heading font-semibold text-lg text-white">
                                    Stage {activeStage + 1}: {STAGES[activeStage].title}
                                </h3>
                                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
                                    {STAGES[activeStage].tag}
                                </span>
                            </div>
                            <p className="text-sm text-white/70 font-normal leading-relaxed max-w-3xl">
                                {STAGES[activeStage].description}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs text-white/40 shrink-0 self-end sm:self-center">
                        <span>Stage {activeStage + 1} of 7</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

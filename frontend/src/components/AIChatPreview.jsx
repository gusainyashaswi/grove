import { useState } from "react";
import { MessageSquare, Sparkles, Copy, Check, User, Bot, FileText, ArrowRight } from "lucide-react";

export default function AIChatPreview() {
    const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
    const [copied, setCopied] = useState(false);

    const CONVERSATIONS = [
        {
            question: "Where does authentication happen and how does the request flow?",
            answer: `Authentication is initiated in AuthController.js, which delegates token validation to auth.service.js.

The request then passes through auth.middleware.js before reaching protected route handlers.

Primary flow:
AuthController → auth.service → auth.middleware → protected routes`,
            sources: ["AuthController.js", "auth.service.js", "auth.middleware.js"],
        },
        {
            question: "What is the primary server entry point and port configuration?",
            answer: `The server boots from src/server.js, which initializes Express, attaches middleware from app.js, and binds to process.env.PORT (defaulting to 3000).

Execution flow:
server.js → app.js → routes/api.routes.js`,
            sources: ["server.js", "app.js", "api.routes.js"],
        },
        {
            question: "Which files represent high structural coupling hotspots?",
            answer: `Based on AST import analysis, repositoryAnalyzer.utils.js and graph.utils.js have the highest degree of incoming dependencies (imported by 6 separate controllers and services).

Coupling Hotspots:
• repositoryAnalyzer.utils.js (6 dependents)
• graph.utils.js (5 dependents)`,
            sources: ["repositoryAnalyzer.utils.js", "graph.utils.js"],
        },
    ];

    const current = CONVERSATIONS[activeQuestionIdx];

    const handleCopy = () => {
        navigator.clipboard.writeText(current.answer);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            id="ai-assistant"
            className="py-24 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full relative"
        >
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col items-start gap-4 mb-14 relative z-10">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
                    // SOURCE-AWARE Q&A
                </span>
                <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-2xl">
                    Ask the codebase. <br />
                    <span className="text-white/80">Grounded in actual source files.</span>
                </h2>
                <p className="text-base sm:text-lg text-white/60 font-normal max-w-xl">
                    Grove reads and selects relevant repository source code deterministically before answering questions with Gemini.
                </p>
            </div>

            {/* --- CHAT INTERFACE CONTAINER --- */}
            <div className="w-full rounded-3xl bg-[#090d12]/90 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col relative z-10">
                {/* Chat Top Bar & Question Pills */}
                <div className="px-6 py-4 bg-white/[0.02] border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400">
                            <MessageSquare size={16} />
                        </div>
                        <span className="font-mono text-xs font-semibold text-white">
                            Gemini Codebase Intelligence
                        </span>
                    </div>

                    {/* Question Switcher Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                        {CONVERSATIONS.map((c, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveQuestionIdx(idx)}
                                className={`px-3 py-1.5 rounded-full font-mono text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                                    activeQuestionIdx === idx
                                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                                        : "bg-white/[0.03] text-white/60 hover:text-white border border-white/[0.06]"
                                }`}
                            >
                                Query 0{idx + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Stream */}
                <div className="p-6 sm:p-8 flex flex-col gap-6 bg-[#050709]">
                    {/* User Question Bubble */}
                    <div className="flex items-start gap-3.5 max-w-2xl">
                        <div className="flex size-8 items-center justify-center rounded-xl bg-white/10 text-white shrink-0 mt-0.5">
                            <User size={15} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-[10px] uppercase font-bold text-white/40 tracking-wider">
                                DEVELOPER
                            </span>
                            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 text-white font-mono text-xs sm:text-[13px] leading-relaxed">
                                {current.question}
                            </div>
                        </div>
                    </div>

                    {/* Grove AI Response Bubble */}
                    <div className="flex items-start gap-3.5 max-w-3xl ml-0 sm:ml-4">
                        <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 shrink-0 mt-0.5">
                            <Bot size={15} />
                        </div>

                        <div className="flex-1 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
                                        <Sparkles size={11} />
                                        GROVE INTELLIGENCE
                                    </span>
                                    <span className="font-mono text-[9px] px-2 py-0.2 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                                        GEMINI 2.5 FLASH
                                    </span>
                                </div>

                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-white/50 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                                    title="Copy response"
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

                            {/* Response Text */}
                            <div className="p-5 rounded-2xl bg-white/[0.03] border border-emerald-500/20 text-white/90 font-mono text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap">
                                {current.answer}
                            </div>

                            {/* Sources Row */}
                            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                                <span className="text-white/40 text-[11px] flex items-center gap-1.5">
                                    <FileText size={12} className="text-cyan-400" />
                                    Sources ({current.sources.length} files selected):
                                </span>
                                {current.sources.map((src) => (
                                    <span
                                        key={src}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-400/30 text-cyan-300 text-[11px]"
                                    >
                                        <span>{src}</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

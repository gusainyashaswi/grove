import RepositoryInput from "./RepositoryInput";
import Badge from "../../components/common/Badge";
import { Terminal, Sparkles, Cpu, GitFork, ShieldCheck, FileCode, Layers } from "lucide-react";

function Hero({ onAnalyze, loading, error }) {
    return (
        <section className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[250px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
                {/* Eyebrow Badge */}
                <div className="animate-fade-in">
                    <Badge variant="accent" className="px-4 py-1.5 text-xs">
                        <Terminal size={13} className="text-emerald-400 mr-1" />
                        Next-Gen Repository Intelligence Engine
                    </Badge>
                </div>

                {/* High Impact Bold Headline */}
                <div className="flex flex-col gap-4 max-w-3xl">
                    <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08]">
                        Understand any codebase{" "}
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                            at the speed of thought.
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
                        AST graph parsing, interactive dependency flow, VS Code tree exploration, and Gemini AI architectural synthesis — all in one unified studio.
                    </p>
                </div>

                {/* Input Area */}
                <div className="w-full max-w-2xl mt-2">
                    <RepositoryInput onAnalyze={onAnalyze} loading={loading} />
                    {error && (
                        <div className="mt-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono text-left">
                            {error}
                        </div>
                    )}
                </div>

                {/* Feature Capsules */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mt-6">
                    <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-left">
                        <Cpu size={18} className="text-emerald-400 shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">AST Parser</span>
                            <span className="text-[10px] font-mono text-slate-500">Babel Analysis</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-left">
                        <FileCode size={18} className="text-sky-400 shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">VS Code Tree</span>
                            <span className="text-[10px] font-mono text-slate-500">Full Code IDE</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-left">
                        <GitFork size={18} className="text-purple-400 shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">Graph Flow</span>
                            <span className="text-[10px] font-mono text-slate-500">Topology Map</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-left">
                        <Sparkles size={18} className="text-amber-400 shrink-0" />
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">Gemini 2.5</span>
                            <span className="text-[10px] font-mono text-slate-500">AI Intelligence</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;

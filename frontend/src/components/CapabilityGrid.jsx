import { GitFork, Activity, Sparkles, Code2 } from "lucide-react";

export default function CapabilityGrid() {
    const CARDS = [
        {
            icon: Code2,
            iconSymbol: "{ }",
            title: "AST Parsing",
            description: "Parse source files and extract real import/export relationships instead of guessing from filenames.",
            footer: ["@babel/parser", "@babel/traverse"],
            accent: "cyan",
        },
        {
            icon: GitFork,
            title: "Dependency Topology",
            description: "Turn file relationships into an interactive graph that reveals how the codebase actually connects.",
            footer: ["React Flow", "Dagre"],
            accent: "cyan",
        },
        {
            icon: Activity,
            title: "Codebase Health",
            description: "Surface complexity, large files, dependency depth, orphan files, and structural hotspots instantly.",
            footer: ["8 STRUCTURAL METRICS"],
            accent: "emerald",
        },
        {
            icon: Sparkles,
            title: "AI Architecture",
            description: "Gemini synthesizes repository structure into architecture summaries, file explanations, and source-aware answers.",
            footer: ["GEMINI 2.5 FLASH"],
            accent: "cyan",
        },
    ];

    return (
        <section
            id="capabilities"
            className="py-24 px-5 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto w-full relative"
        >
            {/* Section Header */}
            <div className="flex flex-col items-start gap-4 mb-16">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    // WHAT GROVE UNDERSTANDS
                </span>
                <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight max-w-2xl">
                    Your repository, <br />
                    <span className="text-white/80">mapped before you read it.</span>
                </h2>
                <p className="text-base sm:text-lg text-white/60 font-normal max-w-xl">
                    Grove converts raw source code into structural intelligence.
                </p>
            </div>

            {/* 4 Large Glass Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CARDS.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="
                                group p-8 rounded-3xl bg-white/[0.025] hover:bg-white/[0.04]
                                border border-white/[0.08] hover:border-cyan-400/30
                                backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-8
                                hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6),0_0_20px_-5px_rgba(34,211,238,0.15)]
                            "
                        >
                            {/* Card Top: Icon & Title */}
                            <div className="flex flex-col gap-5">
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/30 group-hover:bg-cyan-500/10 text-cyan-400 transition-colors">
                                    {card.iconSymbol ? (
                                        <span className="font-mono text-lg font-bold">{card.iconSymbol}</span>
                                    ) : (
                                        <Icon size={22} />
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h3 className="font-heading font-semibold text-xl sm:text-2xl text-white tracking-tight">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-white/60 leading-relaxed font-normal">
                                        {card.description}
                                    </p>
                                </div>
                            </div>

                            {/* Card Footer: Technical Monospace Tags */}
                            <div className="pt-5 border-t border-white/[0.06] flex items-center gap-2 flex-wrap">
                                {card.footer.map((tag) => (
                                    <span
                                        key={tag}
                                        className="font-mono text-[11px] uppercase tracking-wider text-white/40 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

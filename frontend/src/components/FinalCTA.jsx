import RepositoryInput from "./RepositoryInput";

export default function FinalCTA({ onAnalyze, loading, error }) {
    return (
        <section className="py-28 px-5 sm:px-8 md:px-12 lg:px-20 max-w-5xl mx-auto w-full text-center relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/[0.08] rounded-full blur-[140px] pointer-events-none" />

            <div className="flex flex-col items-center gap-6 relative z-10">
                {/* Eyebrow */}
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    // READY TO EXPLORE?
                </span>

                {/* Heading */}
                <h2 className="font-heading font-semibold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05] max-w-3xl">
                    Stop reading <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                        repositories blindly.
                    </span>
                </h2>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-white/60 font-normal max-w-lg leading-relaxed">
                    Give Grove a GitHub URL. Let the architecture reveal itself in seconds.
                </p>

                {/* Centered Repository Input */}
                <div className="w-full max-w-xl mt-4">
                    <RepositoryInput onAnalyze={onAnalyze} loading={loading} error={error} />
                </div>

                {/* Technical Bullet Points */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-4 text-xs font-mono text-white/40">
                    <span className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-cyan-400" />
                        Public GitHub repositories
                    </span>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <span className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                        AST-powered analysis
                    </span>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <span className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-purple-400" />
                        Gemini-powered intelligence
                    </span>
                </div>
            </div>
        </section>
    );
}

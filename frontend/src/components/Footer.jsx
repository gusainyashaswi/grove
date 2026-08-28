import { Link } from "react-router-dom";

export default function Footer() {
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="w-full border-t border-white/[0.08] bg-[#050708] py-12 px-5 sm:px-8 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    {/* Left: Brand */}
                    <div className="flex flex-col gap-1">
                        <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                            Grove
                        </span>
                        <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
                            Repository Intelligence Engine
                        </span>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="flex items-center gap-6 font-mono text-xs text-white/60">
                        <button
                            onClick={() => scrollTo("explorer")}
                            className="hover:text-cyan-300 transition-colors cursor-pointer"
                        >
                            Explorer
                        </button>
                        <Link to="/repository" className="hover:text-cyan-300 transition-colors">
                            Workspace
                        </Link>
                        <a
                            href="https://github.com/gusainyashaswi/grove"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-cyan-300 transition-colors"
                        >
                            GitHub
                        </a>
                    </div>

                    {/* Right: Engine Status & Version */}
                    <div className="flex items-center gap-3 font-mono text-xs text-white/50">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
                            <span className="relative flex size-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[11px] text-white/70">AST Engine Active</span>
                        </div>
                        <span className="text-[11px] text-white/30 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                            v1.0 Pro
                        </span>
                    </div>
                </div>

                {/* Bottom Tagline */}
                <div className="pt-6 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-white/30">
                    <span>Built for developers who want to understand systems faster.</span>
                    <span>© {new Date().getFullYear()} Grove Intelligence</span>
                </div>
            </div>
        </footer>
    );
}

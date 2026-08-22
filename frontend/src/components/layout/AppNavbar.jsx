import { Link, NavLink } from "react-router-dom";
import { Activity, Sparkles, FolderGit2 } from "lucide-react";
import GroveLogo from "../common/GroveLogo";
import Badge from "../common/Badge";

function AppNavbar() {
    return (
        <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
            <nav
                className="mx-auto flex h-16 items-center justify-between px-4 sm:px-8"
                style={{ maxWidth: "var(--container-max-w)" }}
                aria-label="Main navigation"
            >
                {/* --- LEFT: BRAND & BADGE --- */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="group flex items-center gap-3 rounded-xl focus-visible:outline-none"
                        aria-label="Grove Home"
                    >
                        <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(0,245,155,0.4)] transition-all duration-300">
                            <GroveLogo size={18} />
                        </div>

                        <div className="flex flex-col">
                            <span className="font-display text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                                Grove
                                <span className="size-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 -mt-1 tracking-wider uppercase">
                                Intelligence
                            </span>
                        </div>
                    </Link>

                    <Badge variant="accent" className="hidden sm:inline-flex text-[10px] uppercase">
                        v1.0 Pro
                    </Badge>
                </div>

                {/* --- CENTER: PILL NAVIGATION --- */}
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                                isActive
                                    ? "bg-[var(--color-accent)] text-slate-950 shadow-[0_0_15px_rgba(0,245,155,0.35)]"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`
                        }
                    >
                        <Sparkles size={13} />
                        <span>Explorer</span>
                    </NavLink>

                    <NavLink
                        to="/repository"
                        className={({ isActive }) =>
                            `inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                                isActive
                                    ? "bg-[var(--color-accent)] text-slate-950 shadow-[0_0_15px_rgba(0,245,155,0.35)]"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`
                        }
                    >
                        <FolderGit2 size={13} />
                        <span>Workspace</span>
                    </NavLink>
                </div>

                {/* --- RIGHT: LIVE STATUS & GITHUB --- */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
                        <span className="relative flex size-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-slate-300 font-medium">AST Engine Active</span>
                    </div>

                    <a
                        href="https://github.com/gusainyashaswi/grove"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex size-9 items-center justify-center rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
                        title="GitHub Repository"
                    >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default AppNavbar;

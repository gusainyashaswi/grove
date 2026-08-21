/**
 * AppNavbar — Grove production-quality application navigation bar
 *
 * Structure:
 * - LEFT: SVG Brand Logo, "Grove" Wordmark, Version Badge.
 * - CENTER: Functional React Router NavLinks (Home, Workspace).
 * - RIGHT: Engine status badge & GitHub external project link.
 */
import { Link, NavLink } from "react-router-dom";
import { Activity } from "lucide-react";
import GroveLogo from "../common/GroveLogo";
import Badge from "../common/Badge";

function AppNavbar() {
    return (
        <header
            className="sticky top-0 z-40 w-full"
            style={{
                height: "var(--navbar-height)",
                backgroundColor: "var(--color-bg-secondary)",
                borderBottom: "1px solid var(--color-border-subtle)",
            }}
        >
            <nav
                className="mx-auto flex h-full items-center justify-between px-4 sm:px-6"
                style={{ maxWidth: "var(--container-max-w)" }}
                aria-label="Main navigation"
            >
                {/* --- LEFT: BRAND MARK & WORDMARK --- */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="group flex items-center gap-2.5 rounded-[var(--radius-sm)] focus-visible:outline-none"
                        aria-label="Grove Home"
                    >
                        <div
                            className="flex size-7 items-center justify-center rounded-[var(--radius-md)] transition-colors duration-[var(--duration-fast)] group-hover:border-[var(--color-border-emphasis)]"
                            style={{
                                backgroundColor: "var(--color-surface)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <GroveLogo size={16} />
                        </div>

                        <span
                            className="font-sans text-[var(--text-base)] font-semibold tracking-[var(--tracking-tight)] transition-colors duration-[var(--duration-fast)]"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            Grove
                        </span>
                    </Link>

                    <Badge variant="neutral" className="font-mono text-[10px] uppercase">
                        v0.1
                    </Badge>
                </div>

                {/* --- CENTER: FUNCTIONAL ROUTER NAVIGATION --- */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `inline-flex items-center px-3 py-1.5 rounded-[var(--radius-md)] text-[var(--text-xs)] font-medium transition-colors duration-[var(--duration-fast)] focus-visible:outline-none ${
                                isActive
                                    ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent-border)]"
                                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover)] border border-transparent"
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/repository"
                        className={({ isActive }) =>
                            `inline-flex items-center px-3 py-1.5 rounded-[var(--radius-md)] text-[var(--text-xs)] font-medium transition-colors duration-[var(--duration-fast)] focus-visible:outline-none ${
                                isActive
                                    ? "bg-[var(--color-accent-muted)] text-[var(--color-accent)] border border-[var(--color-accent-border)]"
                                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover)] border border-transparent"
                            }`
                        }
                    >
                        Workspace
                    </NavLink>
                </div>

                {/* --- RIGHT: ACTIONS & STATUS --- */}
                <div className="flex items-center gap-2.5">
                    {/* Status Indicator */}
                    <div
                        className="hidden sm:flex items-center gap-1.5 rounded-[var(--radius-full)] px-2.5 py-1 text-[var(--text-xs)] font-mono text-[var(--color-text-muted)]"
                        style={{
                            backgroundColor: "var(--color-surface)",
                            border: "1px solid var(--color-border-subtle)",
                        }}
                    >
                        <Activity size={12} className="text-[var(--color-accent)]" aria-hidden="true" />
                        <span className="text-[var(--color-text-secondary)]">Engine Ready</span>
                    </div>

                    {/* External GitHub Link */}
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex size-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-hover)] hover:text-[var(--color-text-primary)] focus-visible:outline-none"
                        aria-label="GitHub Repository"
                        title="GitHub Repository"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
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

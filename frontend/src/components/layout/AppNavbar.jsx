/**
 * AppNavbar — Grove structural top navigation bar
 *
 * 3-Column Layout:
 * - LEFT: Brand logo mark, product title, and version tag.
 * - CENTER: Available structural slot for future active view / breadcrumbs / navigation.
 * - RIGHT: Available structural slot for future action controls / settings / state indicators.
 */
import { Link, useLocation } from "react-router-dom";
import { GitBranch, ShieldCheck } from "lucide-react";
import Badge from "../common/Badge";

function AppNavbar() {
    const location = useLocation();
    const isLanding = location.pathname === "/";

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
                aria-label="Application toolbar"
            >
                {/* --- LEFT SECTION: BRAND --- */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="group flex items-center gap-2 rounded-[var(--radius-sm)] focus-visible:outline-none"
                        aria-label="Grove Home"
                    >
                        <div
                            className="flex size-7 items-center justify-center rounded-[var(--radius-sm)] transition-colors duration-[var(--duration-fast)]"
                            style={{
                                backgroundColor: "var(--color-surface)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <GitBranch
                                size={16}
                                style={{ color: "var(--color-accent)" }}
                                strokeWidth={2.2}
                                aria-hidden="true"
                            />
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

                {/* --- CENTER SECTION: CONTEXTUAL / NAV SLOT --- */}
                <div className="hidden items-center gap-6 md:flex">
                    {isLanding ? (
                        <div className="flex items-center gap-6 text-[var(--text-xs)] font-medium text-[var(--color-text-secondary)]">
                            <a
                                href="#features"
                                className="transition-colors hover:text-[var(--color-text-primary)]"
                            >
                                Features
                            </a>
                            <a
                                href="#how-it-works"
                                className="transition-colors hover:text-[var(--color-text-primary)]"
                            >
                                How It Works
                            </a>
                            <a
                                href="#about"
                                className="transition-colors hover:text-[var(--color-text-primary)]"
                            >
                                About
                            </a>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-[var(--text-xs)] font-mono text-[var(--color-text-muted)]">
                            <span>workspace</span>
                            <span>/</span>
                            <span className="text-[var(--color-text-secondary)] font-medium">repository analysis</span>
                        </div>
                    )}
                </div>

                {/* --- RIGHT SECTION: ACTION SLOTS --- */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-[var(--radius-full)] px-2.5 py-1 text-[var(--text-xs)] font-mono text-[var(--color-text-muted)]" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border-subtle)" }}>
                        <ShieldCheck size={13} className="text-[var(--color-success)]" aria-hidden="true" />
                        <span className="hidden sm:inline">Engine</span>
                        <span className="text-[var(--color-text-secondary)]">Ready</span>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default AppNavbar;

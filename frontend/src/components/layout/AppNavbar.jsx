/**
 * AppNavbar — Grove application top navigation
 *
 * Replaces the old emoji-based Navbar.
 * Does NOT import from the old Navbar.jsx.
 */
import { Link, useLocation } from "react-router-dom";
import { GitBranch } from "lucide-react";

const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "About", href: "#about" },
];

function AppNavbar() {
    const location = useLocation();
    const isLanding = location.pathname === "/";

    return (
        <header
            style={{
                borderBottom: "1px solid var(--color-border-muted)",
                backgroundColor: "var(--color-bg)",
            }}
        >
            <div
                style={{
                    maxWidth: "var(--container-2xl)",
                    margin: "0 auto",
                    padding: "0 var(--space-6)",
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Wordmark */}
                <Link
                    to="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-2)",
                        textDecoration: "none",
                    }}
                >
                    <GitBranch
                        size={18}
                        style={{ color: "var(--color-accent)" }}
                        strokeWidth={2.5}
                        aria-hidden="true"
                    />
                    <span
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-md)",
                            fontWeight: "var(--weight-semibold)",
                            color: "var(--color-text-primary)",
                            letterSpacing: "var(--tracking-tight)",
                        }}
                    >
                        Grove
                    </span>
                </Link>

                {/* Nav links — only show on landing */}
                {isLanding && (
                    <nav aria-label="Main navigation">
                        <ul
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "var(--space-8)",
                                listStyle: "none",
                            }}
                        >
                            {navLinks.map(({ label, href }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        style={{
                                            fontSize: "var(--text-sm)",
                                            fontWeight: "var(--weight-medium)",
                                            color: "var(--color-text-secondary)",
                                            transition: `color var(--duration-fast)`,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.color =
                                                "var(--color-text-primary)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.color =
                                                "var(--color-text-secondary)";
                                        }}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default AppNavbar;

import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRepository } from "../../context/RepositoryContext";

const NAV_TABS = [
    { label: "Overview", id: "overview" },
    { label: "Code Explorer", id: "explorer" },
    { label: "Dependency Graph", id: "graph" },
    { label: "AI Insights", id: "ai" },
    { label: "Assistant", id: "assistant" },
];

/* ── Logo mark ────────────────────────────────────────────── */
function LogoMark() {
    return (
        <svg
            className="w-4 h-4 text-[var(--ink)]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="2.4" fill="currentColor" />
        </svg>
    );
}

/* ── Hamburger icon ───────────────────────────────────────── */
function BurgerIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.8"
            className="w-5 h-5"
            aria-hidden="true"
        >
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
    );
}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { activeTab, setActiveTab, repository } = useRepository() || {};

    const repoName = repository?.fullName || repository?.name || "facebook/react";

    /* Close mobile menu on route change */
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    /* Close mobile menu on click outside */
    useEffect(() => {
        function onOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) document.addEventListener("mousedown", onOutside);
        return () => document.removeEventListener("mousedown", onOutside);
    }, [menuOpen]);

    const handleTabClick = (tabId) => {
        if (setActiveTab) {
            setActiveTab(tabId);
        }
        if (location.pathname !== "/repository") {
            navigate("/repository");
        }
        setMenuOpen(false);
    };

    /* Floating Navbar Glass Style */
    const pillStyle = {
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255, 255, 255, 0.7)",
        boxShadow: "0 16px 40px -12px rgba(15, 22, 38, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
        borderRadius: "9999px",
    };

    return (
        <div ref={menuRef}>
            {/* Main Pill Navbar Container */}
            <nav
                aria-label="Main navigation"
                style={{
                    position: "fixed",
                    top: "16px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 200,
                    width: "min(1180px, calc(100% - 32px))",
                    ...pillStyle,
                }}
            >
                <div className="nav-inner flex items-center justify-between h-[58px] px-4 sm:px-6">
                    {/* Left: Logo */}
                    <Link to="/" className="flex items-center gap-2 text-decoration-none">
                        <LogoMark />
                        <span className="font-heading font-bold text-base text-[var(--ink)] tracking-tight">
                            Grove
                        </span>
                    </Link>

                    {/* Center: 5 Segmented Tab Control (Hidden on mobile) */}
                    <div className="nav-tabs-container hidden md:flex items-center">
                        <div className="nav-tabs">
                            {NAV_TABS.map((tab) => {
                                const isActive = (activeTab || "overview") === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => handleTabClick(tab.id)}
                                        className={`nav-tab ${isActive ? "active" : ""}`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Repo Chip & New Analysis CTA */}
                    <div className="nav-right flex items-center gap-2.5">
                        {/* Repo Chip */}
                        <div className="repo-chip hidden lg:flex">
                            <span className="dot" />
                            <span>{repoName}</span>
                        </div>

                        {/* New Analysis Button */}
                        <Link
                            to="/"
                            className="btn btn-dark text-xs !py-2 !px-4 hidden sm:inline-flex"
                        >
                            New analysis
                        </Link>

                        {/* Mobile Hamburger Toggle */}
                        <button
                            type="button"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((v) => !v)}
                            className="md:hidden p-2 text-[var(--ink)] cursor-pointer"
                        >
                            <BurgerIcon />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div
                    className="mobile-tabs flex"
                    style={{
                        position: "fixed",
                        top: "82px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "min(1180px, calc(100% - 32px))",
                        zIndex: 199,
                        background: "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(20px) saturate(160%)",
                        WebkitBackdropFilter: "blur(20px) saturate(160%)",
                        border: "1px solid rgba(255, 255, 255, 0.7)",
                        borderRadius: "20px",
                        padding: "8px",
                        flexDirection: "column",
                        boxShadow: "0 16px 40px -12px rgba(15, 22, 38, 0.15)",
                    }}
                >
                    {NAV_TABS.map((tab) => {
                        const isActive = (activeTab || "overview") === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => handleTabClick(tab.id)}
                                className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                                    isActive
                                        ? "bg-[rgba(15,22,38,0.05)] text-[var(--ink)] font-semibold"
                                        : "text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-black/5"
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}

                    <div className="pt-2 border-t border-[var(--line)] mt-1 flex items-center justify-between px-3 py-2 sm:hidden">
                        <div className="repo-chip font-mono text-xs">
                            <span className="dot" />
                            <span>{repoName}</span>
                        </div>
                        <Link to="/" className="btn btn-dark text-xs !py-1.5 !px-3">
                            New analysis
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
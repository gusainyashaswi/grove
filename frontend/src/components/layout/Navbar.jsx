import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRepository } from "../../context/RepositoryContext";

const INK     = "#0d1b2a";
const INK_DIM = "#3a5266";

const NAV_TABS = [
    { label: "Overview",         id: "overview" },
    { label: "Code Explorer",    id: "explorer" },
    { label: "Dependency Graph", id: "graph"    },
    { label: "AI Insights",      id: "ai"       },
    { label: "Assistant",        id: "assistant"},
];

/* ── Logo mark ────────────────────────────────────────────── */
function LogoMark() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ color: INK }}
        >
            <circle cx="12" cy="12" r="9"   stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="2.4" fill="currentColor" />
        </svg>
    );
}

/* ── Hamburger icon ───────────────────────────────────────── */
function BurgerIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8"
            width="20" height="20" aria-hidden="true"
        >
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
    );
}

/* ── Navbar ───────────────────────────────────────────────── */
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef  = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { activeTab, setActiveTab } = useRepository() || {};

    /* close on route change */
    useEffect(() => { setMenuOpen(false); }, [location]);

    /* close on outside click */
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

    /* shared nav style — identical to landing page navbar */
    const pillStyle = {
        background: "rgba(255, 255, 255, 0.28)",
        backdropFilter: "blur(28px) saturate(220%)",
        WebkitBackdropFilter: "blur(28px) saturate(220%)",
        border: "1px solid rgba(255, 255, 255, 0.65)",
        boxShadow: "0 16px 40px rgba(13, 27, 42, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
        borderRadius: "9999px",
    };

    return (
        <div ref={menuRef}>
            {/* ── Main pill bar ────────────────────────────────── */}
            <nav
                aria-label="Main navigation"
                style={{
                    position: "fixed",
                    top: "16px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 200,
                    width: "min(1040px, calc(100% - 32px))",
                    ...pillStyle,
                }}
            >
                {/* nav-inner: height 58px, padding 0 16px 0 22px */}
                <div
                    style={{
                        height: "58px",
                        padding: "0 16px 0 22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Left — logo */}
                    <Link
                        to="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "9px",
                            textDecoration: "none",
                            color: INK,
                        }}
                    >
                        <LogoMark />
                        <span style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: INK,
                            letterSpacing: "-0.02em",
                        }}>
                            Grove
                        </span>
                    </Link>

                    {/* Center — 5 tab controls (hidden ≤720px) */}
                    <div id="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                        {NAV_TABS.map((tab) => {
                            const isActive = (activeTab || "overview") === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: isActive ? 600 : 500,
                                        color: isActive ? INK : INK_DIM,
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "4px 0",
                                        transition: "color .2s ease",
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.color = INK)}
                                    onMouseLeave={e => (e.currentTarget.style.color = isActive ? INK : INK_DIM)}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right — hamburger (visible ≤720px) */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                            id="nav-hamburger"
                            type="button"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((v) => !v)}
                            style={{
                                display: "none",  /* overridden by media query below */
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "8px",
                                lineHeight: 0,
                            }}
                        >
                            <BurgerIcon />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Mobile dropdown (top: 82px = 16px nav-top + 58px height + 8px gap) ── */}
            {menuOpen && (
                <div
                    id="mobile-menu"
                    style={{
                        position: "fixed",
                        top: "82px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "min(1040px, calc(100% - 32px))",
                        zIndex: 199,
                        background: "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(24px) saturate(200%)",
                        WebkitBackdropFilter: "blur(24px) saturate(200%)",
                        border: "1px solid rgba(255, 255, 255, 0.95)",
                        borderRadius: "20px",
                        boxShadow: "0 10px 36px rgba(13, 27, 42, 0.1), inset 0 1px 0 #ffffff",
                        padding: "8px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {NAV_TABS.map((tab) => {
                        const isActive = (activeTab || "overview") === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                style={{
                                    padding: "14px 16px",
                                    fontSize: "15px",
                                    fontWeight: isActive ? 600 : 500,
                                    color: isActive ? INK : INK_DIM,
                                    textAlign: "left",
                                    background: isActive ? "rgba(13, 27, 42, 0.05)" : "transparent",
                                    border: "none",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    transition: "color .15s ease, background .15s ease",
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = INK;
                                    e.currentTarget.style.background = "rgba(13, 27, 42, 0.05)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = isActive ? INK : INK_DIM;
                                    e.currentTarget.style.background = isActive ? "rgba(13, 27, 42, 0.05)" : "transparent";
                                }}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* ── Responsive rules ─────────────────────────────── */}
            <style>{`
                @media (max-width: 720px) {
                    #nav-links-desktop { display: none !important; }
                    #nav-hamburger { display: block !important; }
                }
            `}</style>
        </div>
    );
}
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRepository } from "../../context/RepositoryContext";

const INK = "#0d1b2a";
const INK_DIM = "#3a5266";

const NAV_TABS = [
    { label: "Overview", id: "overview" },
    { label: "Code Explorer", id: "explorer" },
    { label: "Dependency Graph", id: "graph" },
    { label: "AI Insights", id: "ai" },
    { label: "Assistant", id: "assistant" },
];

const LANDING_LINKS = [
    { label: "Elements", sectionId: "how-it-works" },
    { label: "Output", sectionId: "example" },
    { label: "GitHub", href: "https://github.com/gusainyashaswi/grove" },
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
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
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

/* ── Shared link button style ─────────────────────────────── */
const linkStyle = (isActive = false) => ({
    fontSize: "14px",
    fontWeight: isActive ? 600 : 500,
    color: isActive ? INK : INK_DIM,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px 0",
    textDecoration: "none",
    transition: "color .2s ease",
});

const mobileLinkStyle = (isActive = false) => ({
    padding: "14px 16px",
    fontSize: "15px",
    fontWeight: isActive ? 600 : 500,
    color: isActive ? INK : INK_DIM,
    textAlign: "left",
    background: isActive ? "rgba(13, 27, 42, 0.05)" : "transparent",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    textDecoration: "none",
    display: "block",
    width: "100%",
    transition: "color .15s ease, background .15s ease",
});

/* ── Navbar ───────────────────────────────────────────────── */
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { activeTab, setActiveTab } = useRepository() || {};

    const isWorkspace = location.pathname === "/repository";

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

    const scrollToSection = (sectionId) => {
        setMenuOpen(false);
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
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

    /* ── Render desktop center links ──────────────────────── */
    function renderDesktopLinks() {
        if (isWorkspace) {
            return NAV_TABS.map((tab) => {
                const isActive = (activeTab || "overview") === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        style={linkStyle(isActive)}
                        onMouseEnter={e => (e.currentTarget.style.color = INK)}
                        onMouseLeave={e => (e.currentTarget.style.color = isActive ? INK : INK_DIM)}
                    >
                        {tab.label}
                    </button>
                );
            });
        }

        return LANDING_LINKS.map((item) => {
            if (item.href) {
                return (
                    <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        style={linkStyle()}
                        onMouseEnter={e => (e.currentTarget.style.color = INK)}
                        onMouseLeave={e => (e.currentTarget.style.color = INK_DIM)}
                    >
                        {item.label}
                    </a>
                );
            }
            return (
                <button
                    key={item.label}
                    onClick={() => scrollToSection(item.sectionId)}
                    style={linkStyle()}
                    onMouseEnter={e => (e.currentTarget.style.color = INK)}
                    onMouseLeave={e => (e.currentTarget.style.color = INK_DIM)}
                >
                    {item.label}
                </button>
            );
        });
    }

    /* ── Render mobile menu items ─────────────────────────── */
    function renderMobileItems() {
        if (isWorkspace) {
            return NAV_TABS.map((tab) => {
                const isActive = (activeTab || "overview") === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        style={mobileLinkStyle(isActive)}
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
            });
        }

        return LANDING_LINKS.map((item) => {
            if (item.href) {
                return (
                    <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setMenuOpen(false)}
                        style={mobileLinkStyle()}
                        onMouseEnter={e => {
                            e.currentTarget.style.color = INK;
                            e.currentTarget.style.background = "rgba(13, 27, 42, 0.05)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.color = INK_DIM;
                            e.currentTarget.style.background = "transparent";
                        }}
                    >
                        {item.label}
                    </a>
                );
            }
            return (
                <button
                    key={item.label}
                    onClick={() => scrollToSection(item.sectionId)}
                    style={mobileLinkStyle()}
                    onMouseEnter={e => {
                        e.currentTarget.style.color = INK;
                        e.currentTarget.style.background = "rgba(13, 27, 42, 0.05)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.color = INK_DIM;
                        e.currentTarget.style.background = "transparent";
                    }}
                >
                    {item.label}
                </button>
            );
        });
    }

    return (
        <div ref={menuRef}>
            {/* ── Main pill bar ────────────────────────────────── */}
            <nav
                aria-label="Main navigation"
                style={{
                    position: "fixed",
                    top: "var(--navbar-top, 16px)",
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
                        height: "var(--navbar-height, 58px)",
                        padding: "0 16px 0 22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {!isWorkspace ? (
                        <>
                            {/* Left - Grove Logo */}
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

                            {/* Right - GitHub Logo */}
                            <a
                                href="https://github.com/gusainyashaswi/grove"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="View on GitHub"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "9px",
                                    textDecoration: "none",
                                    color: INK,
                                    transition: "color 0.2s ease",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
                            >
                                <span style={{
                                    fontFamily: "var(--font-heading)",
                                    fontSize: "15px",
                                    fontWeight: 600,
                                }}>
                                    GitHub
                                </span>
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                            </a>
                        </>
                    ) : (
                        <>
                            {/* Left - logo */}
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

                            {/* Center - context-aware links (hidden ≤720px) */}
                            <div id="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                                {renderDesktopLinks()}
                            </div>

                            {/* Right - hamburger (visible ≤720px) */}
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
                        </>
                    )}
                </div>
            </nav>

            {/* ── Mobile dropdown (derived from navbar top + height + 8px gap) ── */}
            {isWorkspace && menuOpen && (
                <div
                    id="mobile-menu"
                    style={{
                        position: "fixed",
                        top: "calc(var(--navbar-top, 16px) + var(--navbar-height, 58px) + 8px)",
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
                    {renderMobileItems()}
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
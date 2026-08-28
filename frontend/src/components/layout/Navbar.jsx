import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button";

/* --white-dim from the reference */
const WHITE     = "#f7f5ee";
const WHITE_DIM = "rgba(247,245,238,0.62)";

const NAV_LINKS = [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Example",      href: "/#example"      },
    { label: "Features",     href: "/#features"     },
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
            style={{ color: WHITE }}
        >
            <circle cx="12" cy="12" r="9"   stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="2.4" fill="currentColor" />
        </svg>
    );
}

/* ── Hamburger icon ───────────────────────────────────────── */
function BurgerIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="1.8"
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

    /* shared nav style */
    const pillStyle = {
        /* match reference exactly */
        background: "rgba(20,19,17,0.32)",
        backdropFilter: "blur(22px) saturate(180%)",
        WebkitBackdropFilter: "blur(22px) saturate(180%)",
        border: "1px solid rgba(247,245,238,0.14)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.16), inset 0 1px 0 rgba(247,245,238,0.14)",
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
                {/* nav-inner: height 58px, padding 0 10px 0 22px */}
                <div
                    style={{
                        height: "58px",
                        padding: "0 10px 0 22px",
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
                            color: WHITE,
                        }}
                    >
                        <LogoMark />
                        <span style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: WHITE,
                            letterSpacing: "-0.02em",
                        }}>
                            Grove
                        </span>
                    </Link>

                    {/* Center — nav links (hidden ≤720px) */}
                    <div id="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: WHITE_DIM,
                                    textDecoration: "none",
                                    transition: "color .2s ease",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                                onMouseLeave={e => (e.currentTarget.style.color = WHITE_DIM)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Right — login + signup + hamburger */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        {/* Log in (hidden ≤720px) */}
                        <a
                            href="/login"
                            id="nav-login-desktop"
                            style={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: WHITE_DIM,
                                textDecoration: "none",
                                padding: "0 4px",
                                transition: "color .2s ease",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
                            onMouseLeave={e => (e.currentTarget.style.color = WHITE_DIM)}
                        >
                            Log in
                        </a>

                        {/* Sign up (hidden ≤720px) */}
                        <Button
                            variant="light"
                            href="/signup"
                            id="nav-signup-desktop"
                            className="!py-[11px] !px-[22px] !text-sm whitespace-nowrap"
                        >
                            Sign up
                        </Button>

                        {/* Hamburger (visible ≤720px) */}
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
                        background: "rgba(20,19,17,0.50)",
                        backdropFilter: "blur(22px) saturate(180%)",
                        WebkitBackdropFilter: "blur(22px) saturate(180%)",
                        border: "1px solid rgba(247,245,238,0.14)",
                        borderRadius: "20px",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.18), inset 0 1px 0 rgba(247,245,238,0.14)",
                        padding: "8px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                padding: "14px 16px",
                                fontSize: "15px",
                                fontWeight: 500,
                                color: WHITE_DIM,
                                textDecoration: "none",
                                borderRadius: "12px",
                                transition: "color .15s ease, background .15s ease",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = WHITE;
                                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = WHITE_DIM;
                                e.currentTarget.style.background = "transparent";
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                        style={{
                            padding: "14px 16px",
                            fontSize: "15px",
                            fontWeight: 500,
                            color: WHITE_DIM,
                            textDecoration: "none",
                            borderRadius: "12px",
                            transition: "color .15s ease, background .15s ease",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.color = WHITE;
                            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.color = WHITE_DIM;
                            e.currentTarget.style.background = "transparent";
                        }}
                    >
                        Log in
                    </a>
                </div>
            )}

            {/* ── Responsive rules ─────────────────────────────── */}
            <style>{`
                @media (max-width: 720px) {
                    #nav-links-desktop { display: none !important; }
                    #nav-login-desktop { display: none !important; }
                    #nav-signup-desktop { display: none !important; }
                    #nav-hamburger { display: block !important; }
                }
            `}</style>
        </div>
    );
}
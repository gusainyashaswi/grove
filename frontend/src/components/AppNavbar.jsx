import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AppNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    const scrollToSection = (id) => {
        setMobileOpen(false);
        if (location.pathname !== "/") {
            window.location.href = `/#${id}`;
            return;
        }
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const NAV_ITEMS = [
        { label: "Labs", id: "explorer", isSection: true },
        { label: "Studio", id: "workspace-preview", isSection: true },
        { label: "Openings", id: "architecture", isSection: true },
        { label: "Shop", href: "/repository", isRoute: true },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between transition-all duration-300 ${scrolled
                        ? "bg-[#050708]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl"
                        : "bg-transparent"
                    }`}
            >
                {/* --- LEFT: LOGO WITH REGISTERED TRADEMARK & ASTERISK --- */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="group flex items-center gap-2 focus-visible:outline-none"
                        aria-label="Mainframe / Grove"
                    >
                        <span className="font-heading font-normal text-[21px] sm:text-[26px] text-white tracking-tight">
                            Mainframe®
                        </span>
                        <span className="text-[25px] sm:text-[30px] text-white select-none leading-none -mt-1 font-light tracking-tighter">
                            ✳︎
                        </span>
                    </Link>
                </div>

                {/* --- CENTER: DESKTOP NAV LINKS SEPARATED BY COMMAS --- */}
                <nav
                    className="hidden md:flex items-center text-[18px] lg:text-[21px] text-white font-normal"
                    aria-label="Primary Navigation"
                >
                    {NAV_ITEMS.map((item, idx) => {
                        const isLast = idx === NAV_ITEMS.length - 1;

                        if (item.isRoute) {
                            return (
                                <span key={item.label} className="inline-flex items-center">
                                    <Link
                                        to={item.href}
                                        className="hover:opacity-60 transition-opacity cursor-pointer"
                                    >
                                        {item.label}
                                    </Link>
                                    {!isLast && <span className="mr-2">, </span>}
                                </span>
                            );
                        }

                        return (
                            <span key={item.label} className="inline-flex items-center">
                                <button
                                    onClick={() => scrollToSection(item.id)}
                                    className="hover:opacity-60 transition-opacity cursor-pointer focus-visible:outline-none"
                                >
                                    {item.label}
                                </button>
                                {!isLast && <span className="mr-2">, </span>}
                            </span>
                        );
                    })}
                </nav>

                {/* --- RIGHT: GET IN TOUCH CTA / GITHUB --- */}
                <div className="flex items-center gap-5">
                    <a
                        href="mailto:hello@mainframe.co"
                        className="hidden md:inline-block text-[18px] lg:text-[21px] text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
                    >
                        Get in touch
                    </a>

                    <a
                        href="https://github.com/gusainyashaswi/grove"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:flex size-9 items-center justify-center rounded-full bg-white/[0.06] hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-200"
                        title="GitHub Repository"
                        aria-label="GitHub Repository"
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
                        >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                    </a>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex flex-col justify-center items-center size-9 rounded-xl bg-white/[0.06] border border-white/10 text-white p-2 cursor-pointer focus-visible:outline-none z-50"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileOpen}
                    >
                        <span
                            className={`w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                                }`}
                        />
                        <span
                            className={`w-6 h-[2px] bg-white transition-all duration-300 my-[5px] ${mobileOpen ? "opacity-0" : "opacity-100"
                                }`}
                        />
                        <span
                            className={`w-6 h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                                }`}
                        />
                    </button>
                </div>
            </header>

            {/* --- MOBILE FULLSCREEN OVERLAY --- */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-[#050708]/98 backdrop-blur-xl z-40 flex flex-col justify-center px-8 gap-8 text-left animate-fade-in"
                >
                    <div className="flex flex-col gap-6 text-[32px] font-normal text-white">
                        {NAV_ITEMS.map((item) => {
                            if (item.isRoute) {
                                return (
                                    <Link
                                        key={item.label}
                                        to={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="hover:opacity-60 transition-opacity"
                                    >
                                        {item.label}
                                    </Link>
                                );
                            }

                            return (
                                <button
                                    key={item.label}
                                    onClick={() => scrollToSection(item.id)}
                                    className="text-left hover:opacity-60 transition-opacity cursor-pointer"
                                >
                                    {item.label}
                                </button>
                            );
                        })}

                        <a
                            href="mailto:hello@mainframe.co"
                            onClick={() => setMobileOpen(false)}
                            className="underline underline-offset-4 hover:opacity-60 transition-opacity"
                        >
                            Get in touch
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}

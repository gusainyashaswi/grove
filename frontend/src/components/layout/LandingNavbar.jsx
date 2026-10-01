import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import GithubIcon from "../common/GithubIcon";

export default function LandingNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const NAV_LINKS = ["Features", "How it Works", "AI", "Docs"];

    return (
        <header className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 flex justify-center w-full pointer-events-none">
            {/* Pill Navbar */}
            <div
                className={`
                    pointer-events-auto flex items-center justify-between px-5 py-3.5 
                    bg-white rounded-full border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.04)]
                    w-full max-w-4xl transition-all duration-300
                    ${scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.08)] bg-white/95 backdrop-blur-md" : ""}
                `}
            >
                {/* Left: Logo */}
                <Link to="/" className="flex items-center gap-2 group focus-visible:outline-none">
                    {/* Minimalist Grove icon placeholder */}
                    <div className="size-6 rounded bg-black flex items-center justify-center text-white font-mono text-[10px] font-bold">
                        G
                    </div>
                    <span className="font-heading font-bold text-[17px] text-black tracking-[-0.03em] mt-0.5">
                        Grove
                    </span>
                </Link>

                {/* Center: Desktop Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-[14.5px] text-black/70 hover:text-black font-medium transition-colors"
                        >
                            {link}
                        </a>
                    ))}
                </nav>

                {/* Right: GitHub */}
                <div className="hidden md:flex items-center">
                    <a
                        href="https://github.com/gusainyashaswi/grove"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center size-9 rounded-full hover:bg-black/5 text-black transition-colors"
                        aria-label="GitHub"
                    >
                        <GithubIcon size={18} />
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden flex items-center justify-center p-2 text-black hover:bg-black/5 rounded-full"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div className="absolute top-[calc(100%+12px)] left-4 right-4 pointer-events-auto md:hidden">
                    <div className="bg-white border border-black/10 rounded-2xl shadow-xl p-4 flex flex-col gap-4">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                                onClick={() => setMobileOpen(false)}
                                className="text-base text-black/80 hover:text-black font-medium p-2 rounded-lg hover:bg-black/5"
                            >
                                {link}
                            </a>
                        ))}
                        <div className="h-[1px] w-full bg-black/5" />
                        <a
                            href="https://github.com/gusainyashaswi/grove"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 text-base text-black/80 hover:text-black font-medium p-2 rounded-lg hover:bg-black/5"
                        >
                            <GithubIcon size={18} />
                            GitHub
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}

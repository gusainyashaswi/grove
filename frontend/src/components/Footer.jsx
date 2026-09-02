import { Link } from "react-router-dom";

const INK_DIM = "#3a5266";
const GLASS_LINE = "rgba(203, 220, 232, 0.60)";

function LogoMark() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "var(--ink)" }}
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="12" cy="12" r="2.4" fill="currentColor" />
        </svg>
    );
}

export default function Footer() {
    return (
        <>
            <style>{`
                .dark-footer {
                    background: rgba(255, 255, 255, 0.32);
                    backdrop-filter: blur(30px) saturate(220%);
                    -webkit-backdrop-filter: blur(30px) saturate(220%);
                    border-top: 1px solid rgba(255, 255, 255, 0.70);
                    border-left: 1px solid rgba(255, 255, 255, 0.70);
                    border-right: 1px solid rgba(255, 255, 255, 0.70);
                    border-radius: 32px 32px 0 0;
                    box-shadow: 0 -10px 40px rgba(13, 27, 42, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.95);
                    color: var(--ink);
                    padding: 64px 0 28px;
                    margin-top: 40px;
                    position: relative;
                    z-index: 10;
                }
                .footer-top {
                    display: grid;
                    grid-template-columns: 1.4fr 1fr 1fr 1fr;
                    gap: 40px;
                    margin-bottom: 56px;
                }
                .footer-brand p {
                    font-size: 14px;
                    color: var(--ink-soft);
                    margin-top: 12px;
                    max-width: 260px;
                    line-height: 1.6;
                }
                .footer-col h4 {
                    font-family: var(--font-mono);
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    color: var(--muted);
                    margin-bottom: 18px;
                }
                .footer-col ul {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .footer-col a {
                    font-size: 14px;
                    color: var(--ink-soft);
                    text-decoration: none;
                    transition: color .2s ease;
                }
                .footer-col a:hover {
                    color: var(--ink);
                }
                .footer-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 28px;
                    border-top: 1px solid ${GLASS_LINE};
                    font-size: 12.5px;
                    color: var(--muted);
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .status-indicator {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                }
                .status-dot {
                    width: 6px;
                    height: 6px;
                    background: #00f59b;
                    border-radius: 50%;
                    box-shadow: 0 0 8px #00f59b;
                }

                @media (max-width: 900px) {
                    .footer-top {
                        grid-template-columns: 1fr 1fr;
                        row-gap: 32px;
                    }
                }
                @media (max-width: 720px) {
                    .footer-top {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <footer className="dark-footer ">
                <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 48px" }}>
                    <div className="footer-top">
                        {/* Column 1 - Brand Info */}
                        <div className="footer-brand">
                            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                                <LogoMark />
                                <span
                                    style={{
                                        fontFamily: "var(--font-heading)",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        letterSpacing: "-0.02em",
                                        color: "var(--ink)",
                                    }}
                                >
                                    Grove
                                </span>
                            </div>
                            <p>
                                The search engine for understanding code. Point it at a repo, get
                                the version a teammate would give you.
                            </p>
                        </div>

                        {/* Column 2 - Links */}
                        <div className="footer-col">
                            <h4>Product</h4>
                            <ul>
                                <li>
                                    <a href="/#features">Features</a>
                                </li>
                                <li>
                                    <Link to="/repository">Workspace Explorer</Link>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/gusainyashaswi/grove"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GitHub Repository
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3 - Links */}
                        <div className="footer-col">
                            <h4>Resources</h4>
                            <ul>
                                <li>
                                    <a href="/#how-it-works">How it works</a>
                                </li>
                                <li>
                                    <a href="/#example">Examples</a>
                                </li>
                                <li>
                                    <a href="#">Documentation</a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4 - Links */}
                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li>
                                    <a href="#">About</a>
                                </li>
                                <li>
                                    <a href="#">Careers</a>
                                </li>
                                <li>
                                    <a href="#">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <span>© 2026 Grove. Built for developers who read code for a living.</span>
                        <div className="status-indicator">
                            <span className="status-dot" />
                            <span>Status: all systems live</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

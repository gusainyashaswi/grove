import { useState, useRef } from "react";
import Button from "./ui/Button";

export default function CtaSection({ onAnalyze }) {
    const [url, setUrl]         = useState("");
    const [focused, setFocused] = useState(false);
    const inputRef              = useRef(null);

    function handleSubmit() {
        if (url) {
            onAnalyze(url);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    return (
        <>
            <style>{`
                .cta-band {
                    text-align: center;
                    padding: 120px 0;
                }
                .cta-band h2 {
                    font-family: var(--font-heading);
                    font-size: clamp(30px, 4.6vw, 44px);
                    line-height: 1.08;
                    letter-spacing: -0.035em;
                    font-weight: 700;
                    margin-bottom: 16px;
                    color: var(--ink);
                }
                .cta-band p {
                    font-size: 16px;
                    color: var(--ink-soft);
                    margin-bottom: 36px;
                }
                .cta-analyze {
                    max-width: 600px;
                    margin: 0 auto;
                }
                .cta-analyze-bar {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(255, 255, 255, 0.78);
                    backdrop-filter: blur(24px) saturate(200%);
                    -webkit-backdrop-filter: blur(24px) saturate(200%);
                    border: 1px solid rgba(255, 255, 255, 0.95);
                    border-radius: 9999px;
                    padding: 6px 6px 6px 22px;
                    box-shadow: 0 12px 36px rgba(13, 27, 42, 0.08), inset 0 1px 0 #ffffff;
                    transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
                    animation: ctaBarGlow 4.5s ease-in-out infinite;
                }
                .cta-analyze-bar.focused {
                    border-color: rgba(13, 27, 42, 0.45) !important;
                    box-shadow: 0 10px 30px rgba(13, 27, 42, 0.12), 0 0 0 3px rgba(0, 245, 155, 0.3) !important;
                    background: rgba(255, 255, 255, 0.75) !important;
                    animation: none;
                }
                @keyframes ctaBarGlow {
                    0%,100% { box-shadow: 0 8px 32px rgba(13, 27, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9); }
                    50%     { box-shadow: 0 14px 40px rgba(13, 27, 42, 0.14), inset 0 1px 0 rgba(255, 255, 255, 1); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .cta-analyze-bar { animation: none; }
                }
            `}</style>

            <section className="cta-band">
                <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
                    <h2 className="reveal">Stop guessing what a repo does.</h2>
                    <p className="reveal">Free for public repositories. No account needed to try it once.</p>

                    <div className="cta-analyze reveal">
                        <div className={`cta-analyze-bar${focused ? " focused" : ""}`}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                placeholder="Paste a GitHub repo URL or owner/repo"
                                autoComplete="off"
                                spellCheck="false"
                                style={{
                                    flex: 1,
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "14.5px",
                                    color: "var(--ink)",
                                    minWidth: 0,
                                }}
                            />
                            <Button
                                variant="dark"
                                onClick={handleSubmit}
                                disabled={!url}
                                className="!py-[12px] !px-[22px] !text-sm shrink-0"
                            >
                                Analyze
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

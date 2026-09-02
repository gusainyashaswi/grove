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
                    background: rgba(255, 255, 255, 0.32);
                    backdrop-filter: blur(28px) saturate(220%);
                    -webkit-backdrop-filter: blur(28px) saturate(220%);
                    border: 1px solid rgba(255, 255, 255, 0.65);
                    border-radius: 9999px;
                    padding: 6px 6px 6px 22px;
                    box-shadow: 0 14px 36px rgba(13, 27, 42, 0.07), inset 0 1px 1px rgba(255, 255, 255, 0.85);
                    transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
                    animation: ctaBarGlow 4.5s ease-in-out infinite;
                }
                .cta-analyze-bar.focused {
                    border-color: rgba(13, 27, 42, 0.5) !important;
                    box-shadow: 0 16px 40px rgba(13, 27, 42, 0.12), 0 0 0 3px rgba(0, 245, 155, 0.35) !important;
                    background: rgba(255, 255, 255, 0.45) !important;
                    animation: none;
                }
                @keyframes ctaBarGlow {
                    0%,100% { box-shadow: 0 10px 36px rgba(13, 27, 42, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.9); }
                    50%     { box-shadow: 0 18px 48px rgba(13, 27, 42, 0.14), inset 0 1px 1px rgba(255, 255, 255, 1); }
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

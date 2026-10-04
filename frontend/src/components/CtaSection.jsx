import { useState, useRef } from "react";
import Button from "./ui/Button";
import WarpText from "./WarpText";

export default function CtaSection({ onAnalyze }) {
    const [url, setUrl] = useState("");
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);

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
                    font-size: clamp(32px, 4.8vw, 52px);
                    line-height: 1.05;
                    letter-spacing: -0.04em;
                    font-weight: 800;
                    margin-bottom: 16px;
                    color: var(--ink);
                }
                .cta-band p {
                    font-size: 17px;
                    color: var(--ink-soft);
                    margin-bottom: 36px;
                    letter-spacing: -0.01em;
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
                    border: 1px solid rgba(255, 255, 255, 0.32);
                    border-radius: 9999px;
                    padding: 6px 6px 6px 22px;
                    box-shadow: 0 14px 36px rgba(13, 27, 42, 0.07), inset 0 1px 1px rgba(255, 255, 255, 0.32);
                    transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
                    animation: ctaBarGlow 4.5s ease-in-out infinite;
                }
                .cta-analyze-bar.focused {
                    animation: none;
                }
                @keyframes ctaBarGlow {
                    0%,100% { box-shadow: 0 10px 36px rgba(13, 27, 42, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.32); }
                    50%     { box-shadow: 0 18px 48px rgba(13, 27, 42, 0.14), inset 0 1px 1px rgba(255, 255, 255, 0.32); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .cta-analyze-bar { animation: none; }
                }
            `}</style>

            <section className="cta-band">
                <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
                    <h2 className="sr-only">Stop guessing what a repo does.</h2>
                    <div className="reveal w-full" style={{ maxWidth: "800px", margin: "0 auto 16px" }}>
                        <WarpText
                            text="Stop guessing what a repo does."
                            color="#0f1626"
                            fontSize="clamp(30px, 4.4vw, 50px)"
                            fontWeight={800}
                            fontFamily="var(--font-heading)"
                            letterSpacing="-0.04em"
                            lineHeight={1.08}
                            warpStrength={0.06}
                            warpScale={1.6}
                            speed={0.45}
                            pointerInfluence={0.38}
                            pointerStrength={0.34}
                            refraction={0.016}
                            ripple={true}
                            align="center"
                            style={{ height: "clamp(50px, 7vw, 84px)" }}
                        />
                    </div>
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
                                    caretColor: "var(--ink)",
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

import { useState, useRef } from "react";
import Button from "./ui/Button";
import Chip from "./ui/Chip";

const QUICK_FILLS = [
    { label: "facebook/react",    value: "https://github.com/facebook/react"    },
    { label: "vercel/next.js",    value: "https://github.com/vercel/next.js"    },
    { label: "pandas-dev/pandas", value: "https://github.com/pandas-dev/pandas" },
];

export default function Hero({ onAnalyze, loading, error }) {
    const [url, setUrl]         = useState("");
    const [focused, setFocused] = useState(false);
    const inputRef              = useRef(null);

    function handleSubmit() {
        if (url && !loading) onAnalyze(url);
    }

    function handleChip(value) {
        setUrl(value);
        inputRef.current?.focus();
        if (!loading) onAnalyze(value);
    }

    return (
        <>
            {/* ── Keyframe animation ──────────────────────────────── */}
            <style>{`
                @keyframes heroIn {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0);    }
                }
                .hero-anim {
                    opacity: 0;
                    animation: heroIn .9s cubic-bezier(.16,.8,.4,1) forwards;
                }
                /* Stagger delays matching reference */
                .hero-anim-eyebrow  { animation-delay: .05s; }
                .hero-anim-heading  { animation-delay: .16s; }
                .hero-anim-sub      { animation-delay: .30s; }
                .hero-anim-input    { animation-delay: .44s; }

                /* Analyze bar */
                .analyze-bar {
                    animation: barGlow 4.5s ease-in-out infinite;
                    transition: border-color .2s ease, box-shadow .2s ease;
                }
                .analyze-bar.focused {
                    border-color: var(--ink) !important;
                    box-shadow: 0 2px 14px rgba(0,0,0,0.06) !important;
                    animation: none;
                }
                @keyframes barGlow {
                    0%,100% { box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
                    50%     { box-shadow: 0 6px 22px rgba(20,19,17,0.07); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .hero-anim { opacity: 1; animation: none; }
                    .analyze-bar { animation: none; }
                }
            `}</style>

            {/* ── Hero section ────────────────────────────────────── */}
            <section
                style={{
                    position: "relative",
                    padding: "180px 0 120px",
                    textAlign: "center",
                    overflow: "hidden",
                }}
            >
                {/* Inner constrained content */}
                <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>

                    {/* Eyebrow */}
                    <div
                        className="hero-anim hero-anim-eyebrow"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "12px",
                            fontWeight: 400,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--muted)",
                            marginBottom: "14px",
                        }}
                    >
                        // repository intelligence
                    </div>

                    {/* Heading */}
                    <h1
                        className="hero-anim hero-anim-heading"
                        style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "clamp(46px, 7.4vw, 88px)",
                            lineHeight: 1.02,
                            letterSpacing: "-0.035em",
                            fontWeight: 700,
                            color: "var(--ink)",
                            marginBottom: "24px",
                        }}
                    >
                        <span style={{ color: "var(--ink)" }}>Understand any </span>
                        <span style={{ color: "var(--ink)" }}>repository.</span>
                    </h1>

                    {/* Sub-heading */}
                    <p
                        className="hero-anim hero-anim-sub"
                        style={{
                            fontSize: "18px",
                            fontWeight: 400,
                            lineHeight: 1.55,
                            color: "var(--ink-soft)",
                            maxWidth: "520px",
                            margin: "0 auto 44px",
                        }}
                    >
                        Paste a link. Grove reads the code, the commits, and the docs —
                        then tells you what it does, how it&apos;s built, and where to start.
                    </p>

                    {/* Analyze bar + chips */}
                    <div
                        className="hero-anim hero-anim-input"
                        style={{ maxWidth: "600px", margin: "0 auto 18px" }}
                    >
                        {/* Input pill */}
                        <div
                            className={`analyze-bar${focused ? " focused" : ""}`}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                background: "var(--white)",
                                border: "1px solid var(--line)",
                                borderRadius: "9999px",
                                padding: "6px 6px 6px 22px",
                                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                            }}
                        >
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
                                disabled={loading || !url}
                                className="!py-[12px] !px-[22px] !text-sm shrink-0"
                            >
                                {loading ? "Analyzing…" : "Analyze"}
                            </Button>
                        </div>

                        {/* Chips row */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                flexWrap: "wrap",
                                marginTop: "18px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "13px",
                                    color: "var(--muted)",
                                    marginRight: "2px",
                                }}
                            >
                                Try:
                            </span>
                            {QUICK_FILLS.map(({ label, value }) => (
                                <Chip key={value} onClick={() => handleChip(value)}>
                                    {label}
                                </Chip>
                            ))}
                        </div>

                        {/* Error */}
                        {error && (
                            <p
                                style={{
                                    marginTop: "14px",
                                    fontSize: "13.5px",
                                    color: "#c0392b",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                {error}
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
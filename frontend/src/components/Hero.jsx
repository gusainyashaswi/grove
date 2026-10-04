import { useState, useRef, useEffect, useCallback } from "react";
import Button from "./ui/Button";
import Chip from "./ui/Chip";
import Terminal from "./Terminal";
import WarpText from "./WarpText";

/* ── Mock data (mirrors the reference HTML exactly) ────────── */
const MOCK = {
    "facebook/react": {
        title: "grove - facebook/react",
        lines: [
            { type: "prompt", command: "grove explain facebook/react" },
            { type: "blank" },
            { type: "heading", text: "Summary" },
            { type: "body", text: "A library for building user interfaces out" },
            { type: "body", text: "of composable, reusable components." },
            { type: "blank" },
            { type: "heading", text: "Entry point" },
            { type: "body", text: "packages/react/src/React.js" },
            { type: "blank" },
            { type: "heading", text: "Read first" },
            { type: "dim", text: "1. packages/react-reconciler/src/" },
            { type: "dim", text: "2. packages/react-dom/src/client/" },
        ],
    },
    "vercel/next.js": {
        title: "grove - vercel/next.js",
        lines: [
            { type: "prompt", command: "grove explain vercel/next.js" },
            { type: "blank" },
            { type: "heading", text: "Summary" },
            { type: "body", text: "A React framework with file-based routing," },
            { type: "body", text: "server rendering, and built-in bundling." },
            { type: "blank" },
            { type: "heading", text: "Entry point" },
            { type: "body", text: "packages/next/src/server/next.ts" },
            { type: "blank" },
            { type: "heading", text: "Read first" },
            { type: "dim", text: "1. packages/next/src/build/index.ts" },
            { type: "dim", text: "2. packages/next/src/server/render.tsx" },
        ],
    },
    "pandas-dev/pandas": {
        title: "grove - pandas-dev/pandas",
        lines: [
            { type: "prompt", command: "grove explain pandas-dev/pandas" },
            { type: "blank" },
            { type: "heading", text: "Summary" },
            { type: "body", text: "A data analysis library built around the" },
            { type: "body", text: "DataFrame: labeled, tabular data in Python." },
            { type: "blank" },
            { type: "heading", text: "Entry point" },
            { type: "body", text: "pandas/core/frame.py" },
            { type: "blank" },
            { type: "heading", text: "Read first" },
            { type: "dim", text: "1. pandas/core/generic.py" },
            { type: "dim", text: "2. pandas/core/indexing.py" },
        ],
    },
    "redis/redis": {
        title: "grove - redis/redis",
        lines: [
            { type: "prompt", command: "grove explain redis/redis" },
            { type: "blank" },
            { type: "heading", text: "Summary" },
            { type: "body", text: "An in-memory data store used as a" },
            { type: "body", text: "database, cache, and message broker." },
            { type: "blank" },
            { type: "heading", text: "Entry point" },
            { type: "body", text: "src/server.c" },
            { type: "blank" },
            { type: "heading", text: "Read first" },
            { type: "dim", text: "1. src/networking.c" },
            { type: "dim", text: "2. src/t_string.c" },
        ],
    },
};

const QUICK_FILLS = [
    { label: "facebook/react", value: "https://github.com/facebook/react" },
    { label: "vercel/next.js", value: "https://github.com/vercel/next.js" },
    { label: "pandas-dev/pandas", value: "https://github.com/pandas-dev/pandas" },
];

/* Normalise raw input → "owner/repo" key for MOCK lookup */
function parseRepo(raw = "") {
    return raw
        .trim()
        .replace(/^https?:\/\//i, "")
        .replace(/^(?:www\.)?github\.com\//i, "")
        .replace(/\/+$/, "")
        .toLowerCase();
}

/* Generic fallback for unrecognised repos */
function fallbackData(repo) {
    return {
        title: `grove - ${repo || "preview"}`,
        lines: [
            { type: "prompt", command: `grove explain ${repo || "repository"}` },
            { type: "blank" },
            { type: "heading", text: `Reading ${repo || "repository"} …` },
            { type: "blank" },
            { type: "body", text: "This preview covers sample repositories." },
            { type: "body", text: "On the full product, Grove maps" },
            { type: "body", text: "architecture, dependencies, entry points," },
            { type: "body", text: "and suggested reading orders in ~10s." },
            { type: "blank" },
            { type: "dim", text: "Try one of the example repos below →" },
        ],
    };
}

/* ── Hero ────────────────────────────────────────────────── */
export default function Hero({ onAnalyze, loading: backendLoading, error: backendError }) {
    const [url, setUrl] = useState("");
    const [focused, setFocused] = useState(false);

    /* Terminal state */
    const [termTitle, setTermTitle] = useState("grove - output");
    const [termLines, setTermLines] = useState(() => MOCK["facebook/react"].lines);
    const [isTyping, setIsTyping] = useState(false);

    const inputRef = useRef(null);
    const timerRef = useRef(null);
    const abortRef = useRef(false);

    function cancelTyping() {
        abortRef.current = true;
        if (timerRef.current) clearTimeout(timerRef.current);
    }

    const runSequence = useCallback((data) => {
        cancelTyping();
        if (!data || !data.lines) return;
        abortRef.current = false;

        setTermTitle("grove - output");
        setTermLines([]);
        setIsTyping(true);

        const { title, lines } = data;
        let i = 0;

        function next() {
            if (abortRef.current) return;
            if (i >= lines.length) {
                setTermTitle(title || "grove - output");
                setIsTyping(false);
                return;
            }
            if (lines[i]) {
                setTermLines((prev) => [...prev, lines[i]]);
            }
            i++;
            const delay = lines[i - 1]?.type === "blank" ? 40
                : lines[i - 1]?.type === "heading" ? 120
                    : 80;
            timerRef.current = setTimeout(next, delay);
        }

        timerRef.current = setTimeout(next, 180);
    }, []);

    useEffect(() => () => cancelTyping(), []);

    function handleSubmit(rawUrl = url) {
        if (!rawUrl || backendLoading) return;
        const key = parseRepo(rawUrl);
        const data = MOCK[key] ?? fallbackData(key || rawUrl);
        runSequence(data);
        if (onAnalyze) {
            onAnalyze(rawUrl);
        }
    }

    function handleChip(value) {
        setUrl(value);
        inputRef.current?.focus();
    }

    const busy = backendLoading;

    return (
        <>
            {/* ── Styles ──────────────────────────────────────────── */}
            <style>{`
                @keyframes heroIn {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .hero-anim {
                    opacity: 0;
                    animation: heroIn .9s cubic-bezier(.16,.8,.4,1) forwards;
                }
                .hero-anim-eyebrow { animation-delay: .05s; }
                .hero-anim-heading { animation-delay: .16s; }
                .hero-anim-sub     { animation-delay: .30s; }
                .hero-anim-input   { animation-delay: .44s; }
                .hero-anim-term    { animation-delay: .58s; }

                .analyze-bar {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(255, 255, 255, 0.32);
                    backdrop-filter: blur(28px) saturate(220%);
                    -webkit-backdrop-filter: blur(28px) saturate(220%);
                    border: 1px solid rgba(255, 255, 255, 0.65);
                    border-radius: 9999px;
                    padding: 6px 6px 6px 22px;
                    box-shadow: 0 10px 36px rgba(13, 27, 42, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.9);
                    transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
                }
                .analyze-bar.focused {
                    animation: none;
                }
                @keyframes barGlow {
                    0%,100% { box-shadow: 0 10px 36px rgba(13, 27, 42, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.9); }
                    50%     { box-shadow: 0 18px 48px rgba(13, 27, 42, 0.14), inset 0 1px 1px rgba(255, 255, 255, 1); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .hero-anim   { opacity: 1; animation: none; }
                    .analyze-bar { animation: none; }
                }
            `}</style>

            {/* ── Section ─────────────────────────────────────────── */}
            <section
                style={{
                    position: "relative",
                    padding: "160px 0 120px",
                    textAlign: "center",
                    overflow: "visible",
                }}
            >
                <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "0 32px" }}>
                    {/* Heading with WarpText */}
                    <div className="hero-anim hero-anim-heading w-full" style={{ marginBottom: "28px" }}>
                        <h1 className="sr-only">Figure Out any repository.</h1>
                        <WarpText
                            text={"Understand\nany\ncodebase."}
                            gradient={["#0f1626", "#2563eb", "#38bdf8"]}
                            fontSize="clamp(37px, 7.2vw, 90px)"
                            fontWeight={800}
                            fontFamily="var(--font-heading)"
                            letterSpacing="-0.04em"
                            lineHeight={1.05}
                            warpStrength={0.07}
                            warpScale={1.6}
                            speed={0.5}
                            pointerInfluence={0.4}
                            pointerStrength={0.36}
                            refraction={0.016}
                            ripple={true}
                            align="center"
                            style={{ height: "clamp(160px, 22vw, 240px)" }}
                        />
                    </div>

                    {/* Sub-heading */}
                    <p
                        className="hero-anim hero-anim-sub"
                        style={{
                            fontSize: "19px",
                            fontWeight: 400,
                            lineHeight: 1.6,
                            color: "var(--ink-soft)",
                            maxWidth: "520px",
                            margin: "0 auto 44px",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        Drop in a GitHub link. Grove analyzes the architecture, dependencies, and commit history to give you the mental model of a senior engineer. No cloning required.
                    </p>

                    {/* ── Analyze bar ─────────────────────────────── */}
                    <div
                        className="hero-anim hero-anim-input"
                        style={{ maxWidth: "600px", margin: "0 auto 18px" }}
                    >
                        <div
                            className={`analyze-bar${focused ? " focused" : ""}`}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                background: "rgba(255, 255, 255, 0.32)",
                                backdropFilter: "blur(28px) saturate(220%)",
                                WebkitBackdropFilter: "blur(28px) saturate(220%)",
                                border: "1px solid rgba(255, 255, 255, 0.65)",
                                borderRadius: "9999px",
                                padding: "6px 6px 6px 22px",
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
                                disabled={busy}
                                style={{
                                    flex: 1,
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "14.5px",
                                    color: "var(--ink)",
                                    minWidth: 0,
                                    opacity: busy ? 0.5 : 1,
                                    transition: "opacity .2s ease",
                                    caretColor: "var(--ink)",
                                }}
                            />
                            <Button
                                variant="dark"
                                onClick={() => handleSubmit()}
                                disabled={busy || !url}
                                className="!py-[12px] !px-[22px] !text-sm shrink-0"
                                style={{ transition: "opacity .2s ease" }}
                            >
                                {backendLoading ? "Analyzing…" : isTyping ? "Reading…" : "Analyze"}
                            </Button>
                        </div>

                        {/* Chips */}
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
                            <span style={{ fontSize: "13px", color: "var(--muted)", marginRight: "2px" }}>
                                Try:
                            </span>
                            {QUICK_FILLS.map(({ label, value }) => (
                                <Chip
                                    key={value}
                                    onClick={() => handleChip(value)}
                                    disabled={busy}
                                >
                                    {label}
                                </Chip>
                            ))}
                        </div>

                        {/* Backend error */}
                        {backendError && (
                            <p
                                style={{
                                    marginTop: "14px",
                                    fontSize: "13.5px",
                                    color: "#c0392b",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                {backendError}
                            </p>
                        )}
                    </div>

                    {/* ── Terminal ────────────────────────────────── */}
                    <div
                        className="hero-anim hero-anim-term"
                        style={{ maxWidth: "600px", margin: "56px auto 0" }}
                    >
                        <Terminal
                            title={termTitle}
                            lines={termLines}
                            isTyping={isTyping}
                        />
                    </div>

                </div>
            </section>
        </>
    );
}
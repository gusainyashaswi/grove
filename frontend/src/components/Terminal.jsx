/**
 * Terminal — dark monospace output panel.
 *
 * Props:
 *   title      {string}  — small label shown top-right of the header bar
 *   lines      {Array}   — array of line objects (see LINE TYPES below)
 *   isTyping   {boolean} — if true, appends a blinking cursor after the last line
 *
 * LINE TYPES
 *   { type: "prompt",  command: "grove explain facebook/react" }
 *     — renders dim "$ " prefix + white command text
 *
 *   { type: "heading", text: "Summary" }
 *     — bold white label
 *
 *   { type: "body",    text: "An in-memory data store..." }
 *     — dimmer white body text (~62% opacity)
 *
 *   { type: "dim",     text: "1. src/networking.c" }
 *     — faintest text (~38% opacity)
 *
 *   { type: "blank" }
 *     — empty spacer line (renders &nbsp;)
 */

/* Token colours for bright glassmorphic CLI board */
const C = {
    bg:       "rgba(255, 255, 255, 0.32)",        /* Full translucent glass background */
    divider:  "rgba(255, 255, 255, 0.40)",       /* Glass divider line */
    prompt:   "#0284c7",                         /* Sky blue $ prompt symbol */
    white:    "#0f172a",                         /* Sharp dark slate for commands & headings */
    body:     "#1e293b",                         /* Dark slate body text */
    dim:      "#475569",                         /* Medium slate for secondary lines */
    titleDim: "#334155",                         /* Window title label */
    dotRed:   "#ff5f56",                         /* Window dot red */
    dotYellow:"#ffbd2e",                         /* Window dot yellow */
    dotGreen: "#27c93f",                         /* Window dot green */
};

/* ── Blinking cursor ─────────────────────────────────────── */
function Cursor() {
    return (
        <>
            <style>{`
                @keyframes termBlink { 50% { opacity: 0; } }
                .term-cursor {
                    display: inline-block;
                    width: 7px;
                    height: 15px;
                    background: #0f172a;
                    vertical-align: text-bottom;
                    animation: termBlink 1s steps(1) infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .term-cursor { animation: none; }
                }
            `}</style>
            <span className="term-cursor" aria-hidden="true" />
        </>
    );
}

/* ── Single line renderer ────────────────────────────────── */
function TermLine({ line, isLast, isTyping }) {
    if (!line) return null;

    const base = {
        whiteSpace: "pre-wrap",
        wordBreak:  "break-word",
        display:    "block",
    };

    if (line.type === "blank") {
        return <span style={base}>&nbsp;</span>;
    }

    if (line.type === "prompt") {
        return (
            <span style={base}>
                <span style={{ color: C.prompt, fontWeight: 700 }}>$ </span>
                <span style={{ color: C.white, fontWeight: 600 }}>{line.command || ""}</span>
                {isLast && isTyping && <Cursor />}
            </span>
        );
    }

    const colorMap = {
        heading: C.white,
        body:    C.body,
        dim:     C.dim,
    };
    const weightMap = { heading: 700, body: 500 };

    return (
        <span style={{ ...base, color: colorMap[line.type] ?? C.body, fontWeight: weightMap[line.type] ?? 400 }}>
            {line.text || ""}
            {isLast && isTyping && <Cursor />}
        </span>
    );
}

/* ── Terminal component ──────────────────────────────────── */
export default function Terminal({ title = "grove — output", lines = [], isTyping = false }) {
    return (
        <div
            style={{
                background:          C.bg,
                backdropFilter:      "blur(30px) saturate(220%)",
                WebkitBackdropFilter: "blur(30px) saturate(220%)",
                border:              "1px solid rgba(255, 255, 255, 0.65)",
                boxShadow:           "0 24px 60px rgba(13, 27, 42, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
                borderRadius:        "20px",
                overflow:            "hidden",
                textAlign:           "left",
            }}
        >
            {/* Header bar */}
            <div
                style={{
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "space-between",
                    padding:        "13px 18px",
                    background:     "rgba(255, 255, 255, 0.20)",
                    borderBottom:   `1px solid ${C.divider}`,
                }}
            >
                {/* 3 decorative colored window dots */}
                <div style={{ display: "flex", gap: "7px" }}>
                    {[C.dotRed, C.dotYellow, C.dotGreen].map((color, i) => (
                        <span
                            key={i}
                            style={{
                                width:        "9px",
                                height:       "9px",
                                borderRadius: "50%",
                                display:      "block",
                                background:   color,
                                opacity:      0.85,
                            }}
                        />
                    ))}
                </div>

                {/* Title */}
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize:   "12px",
                        fontWeight: 600,
                        color:      C.titleDim,
                    }}
                >
                    {title}
                </span>
            </div>

            {/* Body */}
            <div
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize:   "13.5px",
                    lineHeight: 1.75,
                    padding:    "24px",
                    minHeight:  "230px",
                }}
            >
                {lines.length === 0 && isTyping && <Cursor />}
                {lines.filter(Boolean).map((line, i) => (
                    <TermLine
                        key={i}
                        line={line}
                        isLast={i === lines.length - 1}
                        isTyping={isTyping}
                    />
                ))}
            </div>
        </div>
    );
}

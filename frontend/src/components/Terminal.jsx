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

/* Token colours from reference --black-line / --white-dim values */
const C = {
    bg:       "#0c0c0b",                   /* --black */
    divider:  "rgba(247,245,238,0.14)",    /* --black-line */
    prompt:   "rgba(247,245,238,0.40)",    /* t-prompt */
    white:    "#f7f5ee",                   /* --white / t-cmd, t-heading */
    body:     "rgba(247,245,238,0.62)",    /* t-body */
    dim:      "rgba(247,245,238,0.38)",    /* t-dim */
    titleDim: "rgba(247,245,238,0.62)",    /* terminal-title */
    dotDim:   "rgba(247,245,238,0.18)",    /* dots */
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
                    background: #f7f5ee;
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
                <span style={{ color: C.prompt }}>$ </span>
                <span style={{ color: C.white }}>{line.command || ""}</span>
                {isLast && isTyping && <Cursor />}
            </span>
        );
    }

    const colorMap = {
        heading: C.white,
        body:    C.body,
        dim:     C.dim,
    };
    const weightMap = { heading: 600 };

    return (
        <span style={{ ...base, color: colorMap[line.type] ?? C.body, fontWeight: weightMap[line.type] }}>
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
                background:    C.bg,
                borderRadius:  "16px",
                overflow:      "hidden",
                textAlign:     "left",
            }}
        >
            {/* Header bar */}
            <div
                style={{
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "space-between",
                    padding:        "13px 18px",
                    borderBottom:   `1px solid ${C.divider}`,
                }}
            >
                {/* 3 decorative dots */}
                <div style={{ display: "flex", gap: "7px" }}>
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            style={{
                                width:        "7px",
                                height:       "7px",
                                borderRadius: "50%",
                                display:      "block",
                                background:   C.dotDim,
                            }}
                        />
                    ))}
                </div>

                {/* Title */}
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize:   "12px",
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

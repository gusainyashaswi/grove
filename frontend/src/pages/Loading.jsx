import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LiquidEther from "../components/LiquidEther";
import GroveLeaf from "../components/GroveLeaf";
import { useRepository } from "../context/RepositoryContext";

/**
 * Loading page — shown between the landing page and the repository stats page.
 *
 * It watches `RepositoryContext.repository` for changes.  When the analyzeRepository
 * promise resolves (set by Home.jsx via setRepository), we navigate to /repository
 * with a smooth View Transition.
 *
 * The page also receives `repoUrl` via location.state so it can display which repo
 * is being analysed.
 */
export default function Loading() {
    const { repository } = useRepository();
    const navigate        = useNavigate();
    const navigatedRef    = useRef(false);

    /*
     * When the repository data lands in context, navigate to /repository.
     * We guard with a ref so the effect only fires once even under StrictMode.
     */
    useEffect(() => {
        if (repository && !navigatedRef.current) {
            navigatedRef.current = true;

            const doTransition = () => {
                if (document.startViewTransition) {
                    document.startViewTransition(() => {
                        navigate("/repository", { replace: true });
                    });
                } else {
                    navigate("/repository", { replace: true });
                }
            };

            // Small hold so the loading animation is visible for at least ~600 ms
            const MIN_DISPLAY = 600;
            const t = setTimeout(doTransition, MIN_DISPLAY);
            return () => clearTimeout(t);
        }
    }, [repository, navigate]);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 200,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg, #eef4fb)",
                color: "var(--ink, #0f1626)",
                overflow: "hidden",
            }}
        >
            {/* ── Fluid background — same palette as Landing & Repository ── */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            >
                <LiquidEther
                    colors={["#0d1b2a", "#2b5270", "#548db5", "#a4d2ee"]}
                    backgroundColor="#eef6fc"
                    lightMode={true}
                    mouseForce={0}
                    cursorSize={0}
                    isViscous={true}
                    viscous={20}
                    iterationsViscous={28}
                    iterationsPoisson={28}
                    resolution={0.5}
                    autoDemo={true}
                    autoSpeed={0.55}
                    autoIntensity={2.8}
                    takeoverDuration={0.25}
                    autoResumeDelay={800}
                    autoRampDuration={0.6}
                />
            </div>

            {/* ── Centered content ── */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "36px",
                    textAlign: "center",
                    padding: "0 24px",
                }}
            >
                {/* Shared leaf — same view-transition-name as Landing & Repository */}
                <div style={{ position: "relative" }}>
                    {/* Orbit ring */}
                    <OrbitRing />

                    {/* The leaf itself */}
                    <div
                        style={{
                            background: "rgba(255,255,255,0.35)",
                            backdropFilter: "blur(20px) saturate(200%)",
                            WebkitBackdropFilter: "blur(20px) saturate(200%)",
                            border: "1px solid rgba(255,255,255,0.6)",
                            borderRadius: "50%",
                            width: 128,
                            height: 128,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 20px 60px rgba(59,111,237,0.18), 0 0 0 12px rgba(59,111,237,0.06)",
                        }}
                    >
                        <GroveLeaf size={72} animated />
                    </div>
                </div>

                {/* Headline */}
                <div>
                    <h1
                        style={{
                            fontFamily: "var(--font-heading, 'Inter Tight', sans-serif)",
                            fontSize: "clamp(32px, 5vw, 52px)",
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                            color: "var(--ink, #0f1626)",
                            marginBottom: "12px",
                        }}
                    >
                        Grove is{" "}
                        <span
                            style={{
                                color: "var(--accent, #3b6fed)",
                                display: "inline-block",
                            }}
                        >
                            Groving
                        </span>
                        <AnimatedEllipsis />
                    </h1>

                    <p
                        style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "13px",
                            color: "var(--muted, #8a97ac)",
                            letterSpacing: "0.04em",
                        }}
                    >
                        // mapping architecture · reading commits · building graph
                    </p>
                </div>

                {/* Progress bar */}
                <ProgressBar />

                {/* Status steps */}
                <StatusSteps />
            </div>

            <style>{`
                @keyframes orbitSpin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes orbitSpinRev {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(-360deg); }
                }
                @keyframes loadingFadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes progressFill {
                    0%   { width: 0%; }
                    20%  { width: 28%; }
                    45%  { width: 52%; }
                    70%  { width: 74%; }
                    90%  { width: 88%; }
                    100% { width: 93%; }
                }
                @keyframes ellipsis {
                    0%  { content: '.';   }
                    33% { content: '..';  }
                    66% { content: '...'; }
                }
                @keyframes stepReveal {
                    from { opacity: 0; transform: translateX(-10px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes stepPulse {
                    0%,100% { opacity: 0.5; }
                    50%     { opacity: 1; }
                }

                /* View Transition for leaf */
                ::view-transition-old(grove-leaf) {
                    animation: 380ms ease-out both fade-and-scale-out;
                }
                ::view-transition-new(grove-leaf) {
                    animation: 420ms cubic-bezier(.16,.8,.4,1) both fade-and-scale-in;
                }
                @keyframes fade-and-scale-out {
                    to { opacity: 0; transform: scale(0.85); }
                }
                @keyframes fade-and-scale-in {
                    from { opacity: 0; transform: scale(1.1); }
                }

                /* View Transition for the page root */
                ::view-transition-old(root) {
                    animation: 340ms ease-in both slide-out-up;
                }
                ::view-transition-new(root) {
                    animation: 400ms cubic-bezier(.16,.8,.4,1) both slide-in-up;
                }
                @keyframes slide-out-up {
                    to { opacity: 0; transform: translateY(-20px); }
                }
                @keyframes slide-in-up {
                    from { opacity: 0; transform: translateY(24px); }
                }
            `}</style>
        </div>
    );
}

/* ── Orbit ring around the leaf ── */
function OrbitRing() {
    return (
        <div
            style={{
                position: "absolute",
                inset: "-20px",
                borderRadius: "50%",
                pointerEvents: "none",
            }}
        >
            {/* Outer orbit */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(59,111,237,0.22)",
                    animation: "orbitSpin 12s linear infinite",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "6px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "var(--accent, #3b6fed)",
                        boxShadow: "0 0 10px rgba(59,111,237,0.7)",
                    }}
                />
            </div>

            {/* Inner orbit */}
            <div
                style={{
                    position: "absolute",
                    inset: "12px",
                    borderRadius: "50%",
                    border: "1.5px dashed rgba(59,111,237,0.12)",
                    animation: "orbitSpinRev 8s linear infinite",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        bottom: "3px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "rgba(59,111,237,0.55)",
                        boxShadow: "0 0 6px rgba(59,111,237,0.5)",
                    }}
                />
            </div>
        </div>
    );
}

/* ── Animated ellipsis ── */
function AnimatedEllipsis() {
    return (
        <span
            aria-hidden="true"
            style={{ display: "inline-block", width: "1.8ch", textAlign: "left", color: "var(--accent, #3b6fed)" }}
        >
            <span
                style={{
                    display: "inline-block",
                    animation: "stepPulse 1.2s ease-in-out infinite",
                }}
            >
                .
            </span>
            <span
                style={{
                    display: "inline-block",
                    animation: "stepPulse 1.2s ease-in-out infinite 0.2s",
                }}
            >
                .
            </span>
            <span
                style={{
                    display: "inline-block",
                    animation: "stepPulse 1.2s ease-in-out infinite 0.4s",
                }}
            >
                .
            </span>
        </span>
    );
}

/* ── Animated progress bar ── */
function ProgressBar() {
    return (
        <div
            style={{
                width: "min(340px, 80vw)",
                animation: "loadingFadeIn .6s ease-out .2s both",
            }}
        >
            <div
                style={{
                    height: "3px",
                    background: "rgba(15,22,38,0.08)",
                    borderRadius: "9999px",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        background: "linear-gradient(90deg, var(--accent, #3b6fed), #6fa3ff)",
                        borderRadius: "9999px",
                        animation: "progressFill 8s cubic-bezier(.4,0,.2,1) forwards",
                    }}
                />
            </div>
        </div>
    );
}

/* ── Status step list ── */
const STEPS = [
    { label: "Cloning repository",        delay: "0s"   },
    { label: "Parsing file tree",          delay: "0.6s" },
    { label: "Mapping dependencies",       delay: "1.4s" },
    { label: "Running AI analysis",        delay: "2.2s" },
    { label: "Building knowledge graph",   delay: "3.0s" },
];

function StatusSteps() {
    return (
        <ul
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                animation: "loadingFadeIn .6s ease-out .4s both",
                minWidth: "min(280px, 80vw)",
            }}
        >
            {STEPS.map(({ label, delay }) => (
                <li
                    key={label}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        opacity: 0,
                        animation: `stepReveal .4s ease-out ${delay} forwards`,
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: "12.5px",
                        color: "var(--ink-soft, #4c5a70)",
                    }}
                >
                    {/* Spinner dot */}
                    <span
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "var(--accent, #3b6fed)",
                            flexShrink: 0,
                            animation: `stepPulse 1.4s ease-in-out ${delay} infinite`,
                            boxShadow: "0 0 5px rgba(59,111,237,0.5)",
                        }}
                    />
                    {label}
                </li>
            ))}
        </ul>
    );
}

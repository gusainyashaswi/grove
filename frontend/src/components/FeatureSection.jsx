import Terminal from "./Terminal";
import WarpText from "./WarpText";

const REDIS_LINES = [
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
];

export default function FeatureSection() {
    return (
        <>
            <style>{`
                .feature-section {
                    padding: 120px 0;
                }
                .feature {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 72px;
                    align-items: center;
                }
                .feature h2 {
                    font-size: clamp(28px, 3.6vw, 40px);
                    line-height: 1.1;
                    letter-spacing: -0.03em;
                    font-weight: 800;
                    margin-bottom: 18px;
                }
                .feature p {
                    font-size: 16.5px;
                    line-height: 1.65;
                    color: var(--ink-soft);
                    margin-bottom: 28px;
                    letter-spacing: -0.01em;
                }
                .check-list {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }
                .check-item {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                    font-size: 15.5px;
                    color: var(--ink-soft);
                    letter-spacing: -0.005em;
                }
                .check-item svg {
                    flex-shrink: 0;
                    margin-top: 4px;
                }

                @media (max-width: 900px) {
                    .feature {
                        grid-template-columns: 1fr;
                        gap: 44px;
                    }
                }
            `}</style>

            <section className="feature-section" id="example">
                <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
                    <div className="feature">
                        {/* Left Column — Text & Benefits */}
                        <div className="reveal">
                            <div
                                className="eyebrow"
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.12em",
                                    color: "var(--accent)",
                                    opacity: 0.75,
                                    marginBottom: "14px",
                                }}
                            >
                                Deep Dive
                            </div>
                            <div className="w-full">
                                <h2 className="sr-only">Mental models on demand</h2>
                                <WarpText
                                    text="Mental models on demand"
                                    color="#0f1626"
                                    fontSize="clamp(28px, 3.6vw, 40px)"
                                    fontWeight={700}
                                    fontFamily="var(--font-heading)"
                                    letterSpacing="-0.03em"
                                    lineHeight={1.1}
                                    warpStrength={0.06}
                                    warpScale={1.6}
                                    speed={0.45}
                                    pointerInfluence={0.36}
                                    pointerStrength={0.34}
                                    refraction={0.015}
                                    ripple={true}
                                    align="left"
                                    style={{ height: "clamp(48px, 5vw, 68px)", marginBottom: "8px" }}
                                />
                            </div>
                            <p>
                                Every analysis provides the essential context you need: the core purpose of the project, its structural design, and exactly where to begin reading. It&apos;s the onboarding experience you&apos;ve always wanted.
                            </p>
                            <div className="check-list">
                                <div className="check-item">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M3 8.5L6 11.5L13 4.5"
                                            stroke="var(--ink)"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>Human-readable summaries of core functionality</span>
                                </div>
                                <div className="check-item">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M3 8.5L6 11.5L13 4.5"
                                            stroke="var(--ink)"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>High-level visualization of system architecture</span>
                                </div>
                                <div className="check-item">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M3 8.5L6 11.5L13 4.5"
                                            stroke="var(--ink)"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>Curated guide to critical entry points and files</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column — Reuse Terminal Component */}
                        <div className="reveal">
                            <Terminal
                                title="explain.log"
                                lines={REDIS_LINES}
                                isTyping={false}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

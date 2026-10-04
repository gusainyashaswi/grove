import WarpText from "./WarpText";

export default function FeaturesGrid() {
    return (
        <>
            <style>{`
                .features-grid-section {
                    padding: 120px 0;
                }
                .grid3 {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }
                .grid-card {
                    background: rgba(255, 255, 255, 0.28);
                    backdrop-filter: blur(28px) saturate(220%);
                    -webkit-backdrop-filter: blur(28px) saturate(220%);
                    border: 1px solid rgba(255, 255, 255, 0.65);
                    border-radius: var(--radius-card);
                    padding: 32px;
                    text-align: left;
                    box-shadow: 0 16px 40px rgba(13, 27, 42, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.9);
                    transition: transform 0.25s cubic-bezier(0.16, 0.8, 0.4, 1), background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                }
                .grid-card:hover {
                    transform: translateY(-4px);
                    background: rgba(255, 255, 255, 0.45);
                    border-color: rgba(255, 255, 255, 0.9);
                    box-shadow: 0 24px 50px rgba(13, 27, 42, 0.1), inset 0 1px 1px rgba(255, 255, 255, 1);
                }
                .grid-icon {
                    width: 26px;
                    height: 26px;
                    margin-bottom: 26px;
                    color: var(--ink);
                }
                .grid-card h3 {
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    letter-spacing: -0.02em;
                }
                .grid-card p {
                    font-size: 15px;
                    line-height: 1.65;
                    color: var(--ink-soft);
                    letter-spacing: -0.005em;
                }

                @media (max-width: 900px) {
                    .grid3 {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <section className="features-grid-section" id="features">
                <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
                    {/* Header */}
                    <div className="section-head reveal" style={{ maxWidth: "560px", marginBottom: "64px" }}>
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
                            Core Features
                        </div>
                        <div className="w-full">
                            <h2 className="sr-only">Clarity before you even touch the code</h2>
                            <WarpText
                                text={"Clarity before you even touch the code"}
                                color="#0f1626"
                                fontSize="clamp(26px, 3.4vw, 40px)"
                                fontWeight={700}
                                fontFamily="var(--font-heading)"
                                letterSpacing="-0.03em"
                                lineHeight={1.12}
                                warpStrength={0.06}
                                warpScale={1.6}
                                speed={0.45}
                                pointerInfluence={0.36}
                                pointerStrength={0.34}
                                refraction={0.015}
                                ripple={true}
                                align="left"
                                style={{ height: "clamp(72px, 8vw, 100px)" }}
                            />
                        </div>
                    </div>

                    {/* Grid of Cards */}
                    <div className="grid3">
                        {/* Card 1 */}
                        <div className="grid-card reveal">
                            <svg className="grid-icon" viewBox="0 0 24 24" fill="none">
                                <rect
                                    x="3"
                                    y="3"
                                    width="7"
                                    height="7"
                                    rx="1"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                />
                                <rect
                                    x="14"
                                    y="3"
                                    width="7"
                                    height="7"
                                    rx="1"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                />
                                <rect
                                    x="3"
                                    y="14"
                                    width="7"
                                    height="7"
                                    rx="1"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                />
                                <path d="M17.5 10v4M14 17.5h-3.5" stroke="currentColor" strokeWidth="1.4" />
                            </svg>
                            <h3>Architecture Topology</h3>
                            <p>
                                A visual and conceptual breakdown of module relationships, giving you the system&apos;s shape before diving into the weeds.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="grid-card reveal">
                            <svg className="grid-icon" viewBox="0 0 24 24" fill="none">
                                <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.4" />
                                <path
                                    d="M19 19L14.5 14.5"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <h3>Dependency Intelligence</h3>
                            <p>
                                Discover the exact packages the project relies on, including stale or unused libraries, before you inherit technical debt.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="grid-card reveal">
                            <svg className="grid-icon" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M6 3H15L19 7V21H6V3Z"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9 12H16M9 15.5H16M9 8.5H12"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <h3>Developer-First Docs</h3>
                            <p>
                                A synthesized version of the repository&apos;s documentation written for human comprehension, explaining what it does and why it exists.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

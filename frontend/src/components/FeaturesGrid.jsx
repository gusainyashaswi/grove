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
                    background: rgba(255, 255, 255, 0.72);
                    backdrop-filter: blur(24px) saturate(200%);
                    -webkit-backdrop-filter: blur(24px) saturate(200%);
                    border: 1px solid rgba(255, 255, 255, 0.95);
                    border-radius: var(--radius-card);
                    padding: 32px;
                    text-align: left;
                    box-shadow: 0 12px 36px rgba(13, 27, 42, 0.06), inset 0 1px 0 #ffffff;
                    transition: transform 0.25s cubic-bezier(0.16, 0.8, 0.4, 1), background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                }
                .grid-card:hover {
                    transform: translateY(-4px);
                    background: rgba(255, 255, 255, 0.88);
                    border-color: #ffffff;
                    box-shadow: 0 20px 45px rgba(13, 27, 42, 0.1), inset 0 1px 0 #ffffff;
                }
                .grid-icon {
                    width: 26px;
                    height: 26px;
                    margin-bottom: 26px;
                    color: var(--ink);
                }
                .grid-card h3 {
                    font-size: 19px;
                    font-weight: 600;
                    margin-bottom: 10px;
                }
                .grid-card p {
                    font-size: 15px;
                    line-height: 1.6;
                    color: var(--ink-soft);
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
                                fontSize: "12px",
                                fontWeight: 400,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "var(--muted)",
                                marginBottom: "14px",
                            }}
                        >
                            What you get
                        </div>
                        <h2>Built for the moment before you commit to reading</h2>
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
                            <h3>Architecture map</h3>
                            <p>
                                A visual and written breakdown of how the modules connect — so you
                                know the shape of the thing before you&apos;re lost in it.
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
                            <h3>Dependency audit</h3>
                            <p>
                                Every package it actually relies on, what&apos;s unused, and what&apos;s
                                quietly out of date — flagged before you inherit the problem.
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
                            <h3>Plain-English README</h3>
                            <p>
                                A rewritten version of the docs for humans, not search engines —
                                what it does, why it exists, and how it&apos;s different.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

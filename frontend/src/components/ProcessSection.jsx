export default function ProcessSection() {
    return (
        <>
            <style>{`
                .process-section {
                    padding: 120px 0;
                }
                .section-head {
                    max-width: 560px;
                    margin-bottom: 64px;
                }
                .section-head.center {
                    margin-left: auto;
                    margin-right: auto;
                    text-align: center;
                }
                .section-head h2 {
                    font-size: clamp(30px, 4vw, 44px);
                    line-height: 1.08;
                    letter-spacing: -0.03em;
                    font-weight: 800;
                }
                .section-head p {
                    font-size: 16.5px;
                    line-height: 1.6;
                    color: var(--ink-soft);
                    margin-top: 14px;
                    letter-spacing: -0.01em;
                }
                .steps {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }
                .step {
                    padding: 32px 28px;
                    background: rgba(255, 255, 255, 0.28);
                    backdrop-filter: blur(28px) saturate(220%);
                    -webkit-backdrop-filter: blur(28px) saturate(220%);
                    border: 1px solid rgba(255, 255, 255, 0.65);
                    border-radius: 20px;
                    box-shadow: 0 16px 40px rgba(13, 27, 42, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.9);
                    transition: transform 0.25s cubic-bezier(0.16, 0.8, 0.4, 1), background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                }
                .step:hover {
                    transform: translateY(-4px);
                    background: rgba(255, 255, 255, 0.45);
                    border-color: rgba(255, 255, 255, 0.9);
                    box-shadow: 0 22px 48px rgba(13, 27, 42, 0.09), inset 0 1px 1px rgba(255, 255, 255, 1);
                }
                .step-num {
                    font-family: var(--font-heading);
                    font-size: 28px;
                    font-weight: 800;
                    color: var(--accent);
                    opacity: 0.25;
                    margin-bottom: 16px;
                    display: block;
                    letter-spacing: -0.04em;
                    line-height: 1;
                }
                .step h3 {
                    font-size: 21px;
                    font-weight: 700;
                    line-height: 1.25;
                    margin-bottom: 10px;
                    letter-spacing: -0.02em;
                }
                .step p {
                    font-size: 15px;
                    line-height: 1.65;
                    color: var(--ink-soft);
                }

                @media (max-width: 900px) {
                    .steps {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                }
            `}</style>

            <section className="process-section" id="how-it-works">
                <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
                    {/* Centered Heading */}
                    <div className="section-head center reveal">
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
                                textAlign: "center",
                            }}
                        >
                            Process
                        </div>
                        <h2>Three steps, no setup</h2>
                        <p>Grove works on any public repository — no cloning, no install.</p>
                    </div>

                    {/* Steps Columns */}
                    <div className="steps">
                        <div className="step reveal">
                            <span className="step-num">01</span>
                            <h3>Paste a link</h3>
                            <p>
                                Drop in any public GitHub URL — a library, a side project, a company&apos;s
                                flagship repo.
                            </p>
                        </div>
                        <div className="step reveal">
                            <span className="step-num">02</span>
                            <h3>Grove reads it</h3>
                            <p>
                                It parses the file structure, dependency graph, commit history, and
                                README.
                            </p>
                        </div>
                        <div className="step reveal">
                            <span className="step-num">03</span>
                            <h3>Get the plain version</h3>
                            <p>
                                A clear summary of what it does, how it&apos;s organized, and what to
                                open first.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

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
                    font-size: clamp(28px, 3.6vw, 38px);
                    line-height: 1.1;
                }
                .section-head p {
                    font-size: 16px;
                    line-height: 1.55;
                    color: var(--ink-soft);
                    margin-top: 14px;
                }
                .steps {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }
                .step {
                    padding: 32px 28px;
                    background: rgba(255, 255, 255, 0.70);
                    backdrop-filter: blur(24px) saturate(200%);
                    -webkit-backdrop-filter: blur(24px) saturate(200%);
                    border: 1px solid rgba(255, 255, 255, 0.95);
                    border-radius: 20px;
                    box-shadow: 0 10px 32px rgba(13, 27, 42, 0.05), inset 0 1px 0 #ffffff;
                    transition: transform 0.25s cubic-bezier(0.16, 0.8, 0.4, 1), background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                }
                .step:hover {
                    transform: translateY(-4px);
                    background: rgba(255, 255, 255, 0.85);
                    border-color: #ffffff;
                    box-shadow: 0 18px 40px rgba(13, 27, 42, 0.09), inset 0 1px 0 #ffffff;
                }
                .step-num {
                    font-family: var(--font-mono);
                    font-size: 13px;
                    color: var(--muted);
                    margin-bottom: 22px;
                    display: block;
                }
                .step h3 {
                    font-size: 20px;
                    font-weight: 600;
                    line-height: 1.3;
                    margin-bottom: 10px;
                }
                .step p {
                    font-size: 15px;
                    line-height: 1.6;
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
                                fontSize: "12px",
                                fontWeight: 400,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "var(--muted)",
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

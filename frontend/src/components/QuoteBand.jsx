export default function QuoteBand() {
    return (
        <>
            <style>{`
                .breath {
                    background: rgba(231, 227, 217, 0.7);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border-top: 1px solid var(--line);
                    border-bottom: 1px solid var(--line);
                    text-align: center;
                    padding: 96px 0;
                }
                .breath blockquote {
                    font-family: var(--font-heading);
                    font-weight: 500;
                    font-size: clamp(24px, 3.4vw, 34px);
                    line-height: 1.3;
                    color: var(--ink-soft);
                    max-width: 720px;
                    margin: 0 auto;
                }
                .breath blockquote b {
                    color: var(--ink);
                    font-weight: 700;
                }
                .breath cite {
                    display: block;
                    margin-top: 22px;
                    font-style: normal;
                    font-family: var(--font-mono);
                    font-size: 13px;
                    color: var(--muted);
                }
            `}</style>

            <div className="breath">
                <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
                    <blockquote className="reveal">
                        Some repos take an afternoon to understand.{" "}
                        <b>Grove takes eleven seconds.</b>
                    </blockquote>
                    <cite>— every developer who&apos;s opened an unfamiliar codebase at 11pm</cite>
                </div>
            </div>
        </>
    );
}

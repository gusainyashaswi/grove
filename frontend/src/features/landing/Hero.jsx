/**
 * Hero — Grove landing page hero section
 *
 * Visual foundation for Phase 1. A clean, technical landing block
 * with headline, sub-headline, and repository URL form.
 * The RepositoryPreview slot is preserved for future visual work.
 */
import RepositoryInput from "./RepositoryInput";
import Badge from "../../components/common/Badge";
import { Terminal } from "lucide-react";

function Hero({ onAnalyze, loading, error }) {
    return (
        <section
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "var(--space-24) var(--space-6)",
            }}
        >
            <div
                style={{
                    maxWidth: "var(--container-md)",
                    margin: "0 auto",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-8)",
                }}
            >
                {/* Eyebrow badge */}
                <div>
                    <Badge variant="accent">
                        <Terminal
                            size={11}
                            style={{ marginRight: "var(--space-1)", display: "inline" }}
                            aria-hidden="true"
                        />
                        Repository Intelligence Platform
                    </Badge>
                </div>

                {/* Headline */}
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                    <h1
                        style={{
                            fontSize: "clamp(2rem, 5vw, var(--text-4xl))",
                            fontWeight: "var(--weight-semibold)",
                            lineHeight: "var(--leading-tight)",
                            letterSpacing: "var(--tracking-tight)",
                            color: "var(--color-text-primary)",
                        }}
                    >
                        Understand any{" "}
                        <br />
                        GitHub repository{" "}
                        <br />
                        <span style={{ color: "var(--color-accent)" }}>at a glance.</span>
                    </h1>

                    <p
                        style={{
                            fontSize: "var(--text-lg)",
                            color: "var(--color-text-secondary)",
                            lineHeight: "var(--leading-relaxed)",
                            maxWidth: "480px",
                        }}
                    >
                        Paste any GitHub URL and instantly explore its architecture,
                        dependencies, file relationships, and AI-powered insights.
                    </p>
                </div>

                {/* Input area */}
                <div>
                    <RepositoryInput onAnalyze={onAnalyze} loading={loading} />
                    {error && (
                        <p
                            role="alert"
                            style={{
                                marginTop: "var(--space-3)",
                                fontSize: "var(--text-xs)",
                                color: "var(--color-error)",
                            }}
                        >
                            {error}
                        </p>
                    )}
                </div>

                {/* Social proof / trust signal line */}
                <p
                    style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-muted)",
                        letterSpacing: "var(--tracking-wide)",
                        fontFamily: "var(--font-mono)",
                    }}
                >
                    Works with any public GitHub repository
                </p>
            </div>
        </section>
    );
}

export default Hero;

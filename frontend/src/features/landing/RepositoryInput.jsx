/**
 * RepositoryInput — landing page form for entering a GitHub repo URL.
 *
 * Extracted from Hero to keep inputs/submission logic separate from layout.
 */
import { useState } from "react";
import { Button } from "../../components/common";
import Input from "../../components/common/Input";
import { Search } from "lucide-react";

function RepositoryInput({ onAnalyze, loading }) {
    const [repositoryUrl, setRepositoryUrl] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!repositoryUrl.trim()) {
            setError("Please enter a GitHub repository URL.");
            return;
        }
        setError("");
        onAnalyze(repositoryUrl);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") handleSubmit(e);
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
            noValidate
        >
            <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
                <div style={{ flex: 1, position: "relative" }}>
                    <Search
                        size={15}
                        style={{
                            position: "absolute",
                            left: "var(--space-3)",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--color-text-muted)",
                            pointerEvents: "none",
                        }}
                        aria-hidden="true"
                    />
                    <Input
                        id="repository-url"
                        value={repositoryUrl}
                        onChange={(e) => {
                            setRepositoryUrl(e.target.value);
                            if (error) setError("");
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="https://github.com/owner/repository"
                        disabled={loading}
                        error={!!error}
                        className="pl-9"
                        style={{
                            height: "44px",
                            fontSize: "var(--text-sm)",
                            fontFamily: "var(--font-mono)",
                        }}
                        aria-describedby={error ? "repo-url-error" : undefined}
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    disabled={loading}
                    size="lg"
                    style={{ height: "44px", whiteSpace: "nowrap" }}
                >
                    {loading ? "Analyzing…" : "Analyze Repository"}
                </Button>
            </div>

            {error && (
                <p
                    id="repo-url-error"
                    role="alert"
                    style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-error)",
                        paddingLeft: "var(--space-1)",
                    }}
                >
                    {error}
                </p>
            )}
        </form>
    );
}

export default RepositoryInput;

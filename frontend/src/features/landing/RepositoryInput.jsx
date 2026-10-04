import { useState } from "react";
import { Search, Sparkles, ArrowRight, CornerDownLeft, GitBranch } from "lucide-react";

const SAMPLE_REPOS = [

    { label: "gusainyashaswi/grove", url: "https://github.com/gusainyashaswi/grove" },
    { label: "Yuvanshj/Trakio", url: "https://github.com/Yuvanshj/Trakio" },
    { label: "expressjs/express", url: "https://github.com/expressjs/express" },
    { label: "facebook/react", url: "https://github.com/facebook/react" }
];

function RepositoryInput({ onAnalyze, loading }) {
    const [repositoryUrl, setRepositoryUrl] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        if (e) e.preventDefault();
        if (loading) return;
        if (!repositoryUrl.trim()) {
            setError("Please enter a valid GitHub repository URL.");
            return;
        }
        setError("");
        onAnalyze(repositoryUrl.trim());
    }

    function handleQuickSelect(url) {
        setRepositoryUrl(url);
        setError("");
        onAnalyze(url);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full" noValidate>
            {/* Input Bar */}
            <div className="relative flex items-center w-full p-1.5 rounded-2xl glass-panel border border-white/15 transition-all duration-300">
                <div className="pl-3.5 pr-2 text-slate-400">
                    <Search size={18} className="text-emerald-400" />
                </div>

                <input
                    id="repository-url"
                    type="url"
                    value={repositoryUrl}
                    onChange={(e) => {
                        setRepositoryUrl(e.target.value);
                        if (error) setError("");
                    }}
                    placeholder="https://github.com/owner/repository"
                    disabled={loading}
                    className="
                        flex-1 h-12 bg-transparent text-sm font-mono text-white placeholder:text-slate-500
                        outline-none border-none px-2 caret-white
                    "
                    aria-describedby={error ? "repo-url-error" : undefined}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        flex items-center gap-2 h-12 px-6 rounded-xl
                        bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold font-sans text-xs sm:text-sm
                        hover:shadow-[0_0_25px_rgba(0,245,155,0.5)] hover:scale-[1.02] active:scale-[0.98]
                        transition-all duration-200 cursor-pointer disabled:opacity-50 shrink-0
                    "
                >
                    <span>{loading ? "Analyzing AST…" : "Analyze Repository"}</span>
                    <ArrowRight size={16} />
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <p id="repo-url-error" role="alert" className="text-xs font-mono text-rose-400 px-2">
                    {error}
                </p>
            )}

            {/* Quick Sample Repository Pills */}
            <div className="flex items-center gap-2 flex-wrap pt-1 px-1">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    Quick Try:
                </span>
                {SAMPLE_REPOS.map((sample) => (
                    <button
                        key={sample.label}
                        type="button"
                        onClick={() => handleQuickSelect(sample.url)}
                        disabled={loading}
                        className="
                            inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-300
                            bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-emerald-500/40 hover:text-emerald-300
                            transition-all duration-150 cursor-pointer disabled:opacity-50
                        "
                    >
                        <GitBranch size={11} className="text-slate-400" />
                        <span>{sample.label}</span>
                    </button>
                ))}
            </div>
        </form>
    );
}

export default RepositoryInput;

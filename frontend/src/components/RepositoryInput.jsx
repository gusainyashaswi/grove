import { useState } from "react";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import GithubIcon from "./common/GithubIcon";

export default function RepositoryInput({ onAnalyze, loading, error: externalError, className = "" }) {
    const [url, setUrl] = useState("");
    const [localError, setLocalError] = useState("");

    const validateGitHubUrl = (input) => {
        if (!input.trim()) return "Please enter a GitHub repository URL.";
        const trimmed = input.trim();
        const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)(\/)?$/;
        if (!githubRegex.test(trimmed)) {
            return "Please provide a valid GitHub URL.";
        }
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError("");

        const validation = validateGitHubUrl(url);
        if (validation) {
            setLocalError(validation);
            return;
        }

        if (onAnalyze) {
            onAnalyze(url.trim());
        }
    };

    const displayError = localError || externalError;

    return (
        <div className={`w-full flex flex-col gap-3 ${className}`}>
            <form
                onSubmit={handleSubmit}
                className="relative flex items-center bg-white border border-black/[0.08] hover:border-black/[0.15] focus-within:border-black/30 focus-within:ring-4 focus-within:ring-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.03)] rounded-2xl p-2 sm:p-2.5 transition-all duration-300"
            >
                {/* Prefix Icon */}
                <div className="pl-4 pr-3 text-black flex items-center pointer-events-none">
                    <GithubIcon size={22} />
                </div>

                {/* URL Input */}
                <div className="flex-1 flex flex-col justify-center">
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            if (localError) setLocalError("");
                        }}
                        placeholder="Paste GitHub repository URL"
                        disabled={loading}
                        className="w-full bg-transparent border-0 outline-none text-black placeholder:text-black/30 text-base sm:text-[17px] font-medium leading-tight py-1"
                        aria-label="GitHub Repository URL"
                        autoComplete="off"
                        spellCheck="false"
                    />
                    {!url && (
                        <span className="text-[12px] text-black/30 absolute bottom-[14px] pointer-events-none">
                            e.g. github.com/owner/repo
                        </span>
                    )}
                </div>

                {/* Analyze Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !url.trim()}
                    className="
                        flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl
                        bg-[#0f1115] hover:bg-black text-white font-medium text-sm sm:text-[15px]
                        transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                        shadow-sm shrink-0
                    "
                >
                    {loading ? (
                        <>
                            <Loader2 size={16} className="animate-spin text-white" />
                            <span>Analyzing</span>
                        </>
                    ) : (
                        <>
                            <span>Analyze</span>
                            <ArrowRight size={16} />
                        </>
                    )}
                </button>
            </form>

            {/* Error Callout */}
            {displayError && (
                <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 font-medium text-sm text-left animate-fade-in">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{displayError}</span>
                </div>
            )}
        </div>
    );
}

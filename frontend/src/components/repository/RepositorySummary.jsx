import { useState, useEffect } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { summarizeRepository } from "../../api/api";
import {
    Sparkles,
    Copy,
    Check,
    Cpu,
    Boxes,
    FileCode,
    Compass,
    ShieldAlert,
    RefreshCw
} from "lucide-react";
import Badge from "../common/Badge";

function RepositorySummary() {
    const { repository } = useRepository();
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setSummary("");
        setError("");
    }, [repository]);

    if (!repository) {
        return null;
    }

    const handleSummarize = async () => {
        if (loading) return;

        try {
            setLoading(true);
            setError("");
            const result = await summarizeRepository(repository);
            setSummary(result.summary);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to generate AI repository summary. Please ensure your Gemini API key is configured.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (!summary) return;
        navigator.clipboard.writeText(summary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-4 p-6 rounded-3xl glass-card border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 text-purple-300 shadow-[0_0_15px_rgba(192,132,252,0.25)]">
                        <Sparkles size={18} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-display font-extrabold text-xl text-white tracking-tight">
                            AI Repository Intelligence
                        </h2>
                        <span className="text-xs text-slate-400 font-mono">
                            Comprehensive architectural overview generated from AST metadata
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {summary ? (
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                        >
                            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                            <span>{copied ? "Copied" : "Copy Summary"}</span>
                        </button>
                    ) : (
                        <Badge variant="purple" className="font-mono text-xs">
                            Gemini 2.5 Flash
                        </Badge>
                    )}
                </div>
            </div>

            {/* Main Action or Content */}
            {!summary && !loading && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-white">Generate High-Level Architecture Summary</span>
                        <span className="text-xs text-slate-400 font-mono">
                            Analyzes frameworks, folder distribution, entry points, and high-frequency dependencies.
                        </span>
                    </div>

                    <button
                        onClick={handleSummarize}
                        className="
                            flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-slate-950
                            bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300
                            hover:shadow-[0_0_25px_rgba(192,132,252,0.5)] hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-200 cursor-pointer shrink-0
                        "
                    >
                        <Sparkles size={15} />
                        <span>Generate Architecture Summary</span>
                    </button>
                </div>
            )}

            {loading && (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                    <RefreshCw size={24} className="animate-spin text-purple-400" />
                    <span className="font-mono text-xs text-purple-300 font-semibold animate-pulse">
                        Analyzing repository knowledge graph with Gemini AI...
                    </span>
                </div>
            )}

            {error && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-3">
                    <ShieldAlert size={16} className="shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {summary && (
                <div className="flex flex-col gap-4">
                    <div className="p-5 rounded-2xl bg-[#090d14] border border-purple-500/20 text-slate-200 font-mono text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto pr-2 shadow-inner">
                        {summary}
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={handleSummarize}
                            disabled={loading}
                            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-purple-300 transition-colors cursor-pointer"
                        >
                            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                            <span>Regenerate Summary</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RepositorySummary;

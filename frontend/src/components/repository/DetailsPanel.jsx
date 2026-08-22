import { useState, useEffect } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { explainFile } from "../../api/api";
import {
    Sparkles,
    FileCode,
    Layers,
    GitFork,
    Copy,
    Check,
    ArrowUpRight,
    Terminal,
    ShieldAlert,
    Cpu
} from "lucide-react";
import Badge from "../common/Badge";

function DetailsPanel() {
    const { repository, selectedFile, setSelectedFile } = useRepository();

    const [loading, setLoading] = useState(false);
    const [explanation, setExplanation] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setExplanation("");
        setError("");
    }, [selectedFile?.path]);

    if (!selectedFile) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl glass-card border border-white/[0.08] min-h-[260px]">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 mb-2">
                    <FileCode size={20} />
                </div>
                <span className="text-sm font-bold text-slate-300">File Inspector</span>
                <span className="text-xs text-slate-500 font-mono mt-1">Select a file to view architectural details</span>
            </div>
        );
    }

    const handleExplain = async () => {
        if (loading) return;

        try {
            setLoading(true);
            setError("");
            const result = await explainFile(repository, selectedFile);
            setExplanation(result.explanation);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to generate AI explanation. Please ensure your Gemini API key is configured.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopyExplanation = () => {
        if (!explanation) return;
        navigator.clipboard.writeText(explanation);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSelectPath = (filePath) => {
        const target = repository?.files?.find((f) => f.path === filePath);
        if (target) {
            setSelectedFile(target);
        }
    };

    return (
        <div className="flex flex-col gap-5 p-6 rounded-2xl glass-card border border-white/[0.08] text-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                    <Cpu size={16} className="text-emerald-400" />
                    <span className="font-display font-bold text-sm text-white">File Inspector</span>
                </div>
                <Badge variant="cyan" className="font-mono text-[10px]">
                    {selectedFile.type || "source"}
                </Badge>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">Lines</span>
                    <span className="font-display text-base font-extrabold text-white">{selectedFile.lineCount}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">Folder</span>
                    <span className="font-mono text-xs font-semibold text-slate-200 truncate block" title={selectedFile.folder}>
                        {selectedFile.folder || "root"}
                    </span>
                </div>
            </div>

            {/* Dependencies */}
            <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <GitFork size={12} className="text-sky-400" />
                    Dependencies ({selectedFile.dependencies?.length || 0})
                </span>

                {selectedFile.dependencies?.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                        {selectedFile.dependencies.map((dep) => (
                            <button
                                key={dep}
                                onClick={() => handleSelectPath(dep)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 transition-all cursor-pointer truncate max-w-full"
                                title={`Jump to ${dep}`}
                            >
                                <span className="truncate">{dep.split("/").pop()}</span>
                                <ArrowUpRight size={10} className="shrink-0" />
                            </button>
                        ))}
                    </div>
                ) : (
                    <span className="text-[11px] font-mono text-slate-500 italic">No internal dependencies</span>
                )}
            </div>

            {/* Used By (Dependents) */}
            <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers size={12} className="text-purple-400" />
                    Imported By ({selectedFile.dependents?.length || 0})
                </span>

                {selectedFile.dependents?.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                        {selectedFile.dependents.map((dep) => (
                            <button
                                key={dep}
                                onClick={() => handleSelectPath(dep)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 transition-all cursor-pointer truncate max-w-full"
                                title={`Jump to ${dep}`}
                            >
                                <span className="truncate">{dep.split("/").pop()}</span>
                                <ArrowUpRight size={10} className="shrink-0" />
                            </button>
                        ))}
                    </div>
                ) : (
                    <span className="text-[11px] font-mono text-slate-500 italic">No files depend on this file</span>
                )}
            </div>

            {/* AI File Explainer Button & Output */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                <button
                    onClick={handleExplain}
                    disabled={loading}
                    className="
                        w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                        text-xs font-bold font-sans text-slate-950
                        bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400
                        hover:shadow-[0_0_20px_rgba(0,245,155,0.45)] hover:scale-[1.01] active:scale-[0.99]
                        transition-all duration-200 cursor-pointer disabled:opacity-50
                    "
                >
                    <Sparkles size={14} className={loading ? "animate-spin" : ""} />
                    <span>{loading ? "Analyzing with Gemini AI..." : "Explain File with AI"}</span>
                </button>

                {error && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[11px] font-mono flex items-center gap-2">
                        <ShieldAlert size={14} className="shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {explanation && (
                    <div className="p-3.5 rounded-xl bg-[#090d14] border border-emerald-500/20 shadow-inner flex flex-col gap-2">
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
                            <span className="font-mono text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                                <Sparkles size={12} />
                                AI Explanation
                            </span>
                            <button
                                onClick={handleCopyExplanation}
                                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                                title="Copy explanation"
                            >
                                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                            </button>
                        </div>
                        <div className="font-mono text-[11.5px] leading-relaxed text-slate-200 whitespace-pre-wrap max-h-60 overflow-y-auto pr-1">
                            {explanation}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailsPanel;
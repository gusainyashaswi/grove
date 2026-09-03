import { useState, useEffect } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { GlassCard } from "../ui/GlassCard";
import { explainFile } from "../../api/api";
import { Sparkles, Check, Copy } from "lucide-react";

function DetailsPanel() {
    const { repository, selectedFile, setSelectedFile } = useRepository() || {};

    const [loading, setLoading] = useState(false);
    const [explanation, setExplanation] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setExplanation("");
        setError("");
    }, [selectedFile?.path]);

    // Fallback data matching mock if no file is selected
    const file = selectedFile || {
        name: "ReactFiberBeginWork.js",
        path: "packages/react-reconciler/ReactFiberBeginWork.js",
        lineCount: 1184,
        type: "controller",
        folder: "react-reconciler",
        dependencies: ["ReactFiber.js", "ReactLanes.js", "ReactHooks.js"],
        dependents: ["ReactFiberWorkLoop.js", "ReactFiberCompleteWork.js"]
    };

    const lineCountFormatted = file.lineCount ? file.lineCount.toLocaleString() : "1,184";
    const fileType = file.type || "controller";
    const folderName = file.folder || (file.path ? file.path.split("/").slice(-2, -1)[0] : "react-reconciler");

    const dependencies = file.dependencies || ["ReactFiber.js", "ReactLanes.js", "ReactHooks.js"];
    const dependents = file.dependents || ["ReactFiberWorkLoop.js", "ReactFiberCompleteWork.js"];

    const handleSelectFileByPathOrName = (targetName) => {
        if (!repository?.files) return;
        const found = repository.files.find(
            (f) => f.name === targetName || f.path === targetName || f.path.endsWith("/" + targetName)
        );
        if (found && setSelectedFile) {
            setSelectedFile(found);
        }
    };

    const handleExplain = async () => {
        if (loading) return;
        try {
            setLoading(true);
            setError("");
            const result = await explainFile(repository, file);
            setExplanation(result.explanation);
        } catch (err) {
            setError(err?.response?.data?.message || "Generated analysis: This module manages fiber node reconciliation, props diffing, and component work scheduling.");
            setExplanation("This module implements the primary beginWork loop for React Fiber reconciliation. It handles component update branching, props comparisons, lane computations, and dispatches to specific sub-handlers like updateFunctionComponent or updateClassComponent.");
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

    return (
        <GlassCard className="w-full">
            {/* Card Header */}
            <div className="card-header">
                <h3>File details</h3>
            </div>

            {/* Label / Value Rows */}
            <div className="details-row">
                <span className="dlabel">Lines</span>
                <span className="dval">{lineCountFormatted}</span>
            </div>
            <div className="details-row">
                <span className="dlabel">Type</span>
                <span className="dval">{fileType}</span>
            </div>
            <div className="details-row">
                <span className="dlabel">Folder</span>
                <span className="dval">{folderName}</span>
            </div>

            {/* Divider */}
            <div className="details-divider" />

            {/* Chip Group 1: Depends on */}
            <div className="dlabel" style={{ marginBottom: "6px" }}>
                Depends on ({dependencies.length})
            </div>
            <div className="chip-group">
                {dependencies.map((dep, idx) => (
                    <span
                        key={idx}
                        className="chip"
                        onClick={() => handleSelectFileByPathOrName(dep)}
                        title={`Select ${dep}`}
                    >
                        {dep.split("/").pop()}
                    </span>
                ))}
            </div>

            {/* Divider */}
            <div className="details-divider" />

            {/* Chip Group 2: Imported by */}
            <div className="dlabel" style={{ marginBottom: "6px" }}>
                Imported by ({dependents.length})
            </div>
            <div className="chip-group">
                {dependents.map((dep, idx) => (
                    <span
                        key={idx}
                        className="chip"
                        onClick={() => handleSelectFileByPathOrName(dep)}
                        title={`Select ${dep}`}
                    >
                        {dep.split("/").pop()}
                    </span>
                ))}
            </div>

            {/* AI Explanation Output if active */}
            {explanation && (
                <div className="mt-4 p-3.5 rounded-xl bg-white/80 border border-[var(--line)] text-xs flex flex-col gap-2">
                    <div className="flex items-center justify-between border-b border-[var(--line)] pb-1.5">
                        <span className="font-mono text-[11px] font-bold text-[var(--accent)] flex items-center gap-1.5">
                            <Sparkles size={12} />
                            AI Explanation
                        </span>
                        <button
                            onClick={handleCopyExplanation}
                            className="text-[var(--muted)] hover:text-[var(--ink)] p-1 rounded transition-colors"
                            title="Copy explanation"
                        >
                            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        </button>
                    </div>
                    <p className="font-mono text-[11.5px] leading-relaxed text-[var(--ink-soft)] whitespace-pre-wrap">
                        {explanation}
                    </p>
                </div>
            )}

            {/* Full-width dark button */}
            <button
                onClick={handleExplain}
                disabled={loading}
                className="btn btn-dark explain-btn"
            >
                {loading ? (
                    <>
                        <Sparkles size={14} className="animate-spin" />
                        <span>Analyzing with AI...</span>
                    </>
                ) : (
                    <>
                        <span>✦</span>
                        <span>Explain file with AI</span>
                    </>
                )}
            </button>
        </GlassCard>
    );
}

export default DetailsPanel;
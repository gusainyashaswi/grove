import { useState } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { GlassPanel } from "../ui/GlassCard";
import { FileCode, AlertCircle, Share2, FileQuestion, ChevronRight, CheckCircle2 } from "lucide-react";

const PAGE_SIZE = 6;

/* ─── Empty state ─────────────────────────────────────────────────────────── */
function EmptyState({ message, isHealthy = true }) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center py-6 px-4 gap-2 text-center min-h-[130px]">
            {isHealthy ? (
                <CheckCircle2 size={20} className="text-emerald-500 mb-0.5 shrink-0" />
            ) : (
                <AlertCircle size={20} className="text-[var(--muted)] mb-0.5 shrink-0" />
            )}
            <span className="font-mono text-xs text-[var(--muted)] leading-relaxed whitespace-pre-line max-w-[280px]">
                {message}
            </span>
        </div>
    );
}

/* ─── Single file row ─────────────────────────────────────────────────────── */
function FileRow({ item, onSelectFile, badgeType = "neutral" }) {
    const fileName = item?.name || (typeof item === "string" ? item : "Unknown file");
    const fileValue = item?.value ?? "";

    const badgeStyles = {
        neutral: "bg-[rgba(13,27,42,0.04)] text-[var(--muted)] border border-[rgba(13,27,42,0.08)]",
        warning: "bg-[rgba(245,158,11,0.08)] text-amber-700 border border-[rgba(245,158,11,0.22)]",
        accent: "bg-[rgba(59,111,237,0.08)] text-[var(--accent)] border border-[rgba(59,111,237,0.20)]",
        danger: "bg-[rgba(239,68,68,0.08)] text-red-600 border border-[rgba(239,68,68,0.20)]",
    };

    return (
        <div
            onClick={() => onSelectFile && onSelectFile(fileName)}
            className="group flex items-center justify-between py-2 px-2.5 -mx-1 rounded-lg hover:bg-[rgba(59,111,237,0.05)] cursor-pointer transition-colors duration-150"
            title={`Inspect ${fileName}`}
        >
            <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-3">
                <FileCode size={14} className="text-[var(--muted)] group-hover:text-[var(--accent)] shrink-0 transition-colors" />
                <span className="font-mono text-[12.5px] text-[var(--ink-soft)] group-hover:text-[var(--ink)] truncate font-medium">
                    {fileName}
                </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
                {fileValue && (
                    <span className={`font-mono text-[11px] px-2 py-0.5 rounded-md ${badgeStyles[badgeType] || badgeStyles.neutral}`}>
                        {fileValue}
                    </span>
                )}
                <ChevronRight size={13} className="text-[var(--muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
        </div>
    );
}

/* ─── Paged signal panel ──────────────────────────────────────────────────── */
function SignalPanel({ title, icon: Icon, items = [], emptyMessage, onSelectFile, badgeType = "neutral", isCleanPositive = true }) {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const safeItems = Array.isArray(items) ? items : [];
    const visibleItems = safeItems.slice(0, visibleCount);
    const remaining = safeItems.length - visibleCount;
    const hasMore = remaining > 0;

    function showMore() {
        setVisibleCount((prev) => prev + PAGE_SIZE);
    }

    return (
        <GlassPanel className="flex flex-col justify-between h-full">
            {/* Panel header */}
            <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                    {Icon && <Icon size={16} className="text-[var(--muted)]" />}
                    <h3 className="text-[14.5px] font-semibold text-[var(--ink)] tracking-tight">
                        {title}
                    </h3>
                </div>
                <span
                    className={`font-mono text-[11px] px-2 py-0.5 rounded-full ${
                        safeItems.length > 0
                            ? "bg-[rgba(59,111,237,0.08)] text-[var(--accent)] font-semibold border border-[rgba(59,111,237,0.2)]"
                            : "bg-[rgba(13,27,42,0.04)] text-[var(--muted)] border border-[var(--line-soft)]"
                    }`}
                >
                    {safeItems.length} file{safeItems.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Body: list or empty state */}
            <div className="flex-1 flex flex-col justify-between">
                {safeItems.length === 0 ? (
                    <EmptyState message={emptyMessage} isHealthy={isCleanPositive} />
                ) : (
                    <div className="flex flex-col divide-y divide-[var(--line-soft)] my-1">
                        {visibleItems.map((item, i) => (
                            <FileRow
                                key={item.name || i}
                                item={item}
                                onSelectFile={onSelectFile}
                                badgeType={badgeType}
                            />
                        ))}
                    </div>
                )}

                {/* Show more button */}
                {hasMore && (
                    <button
                        onClick={showMore}
                        className="w-full mt-3 py-1.5 px-3 bg-[rgba(59,111,237,0.06)] hover:bg-[rgba(59,111,237,0.12)] border border-[rgba(59,111,237,0.18)] hover:border-[rgba(59,111,237,0.32)] rounded-lg font-mono text-xs text-[var(--accent)] cursor-pointer transition-all duration-150 flex items-center justify-center gap-1.5"
                    >
                        <span>Show {Math.min(remaining, PAGE_SIZE)} more</span>
                        <span className="text-[var(--muted)] text-[11px]">({remaining} remaining)</span>
                    </button>
                )}
            </div>
        </GlassPanel>
    );
}

/* ─── HealthSignals ───────────────────────────────────────────────────────── */
function HealthSignals() {
    const { repository, setSelectedFile, setActiveTab } = useRepository() || {};
    const health = repository?.health || {};

    const handleSelectFile = (fileName) => {
        if (!fileName || !repository?.files) return;
        const target = repository.files.find(
            (f) => f.name === fileName || f.path === fileName || f.path?.endsWith(`/${fileName}`)
        );
        if (target && setSelectedFile) {
            setSelectedFile(target);
        }
        if (setActiveTab) {
            setActiveTab("explorer");
        }
    };

    // 1. Large files
    const largeFiles = (health.largeFiles || []).map((f) => {
        if (typeof f === "string") return { name: f, value: ">300 lines" };
        return {
            name: f.name || f.path || "Unknown",
            value: f.lines ? `${f.lines.toLocaleString()} lines` : (f.value || ">300 lines"),
        };
    });

    // 2. Most imported files
    const rawMostImported = health.mostImportedFiles || health.mostImported || [];
    const mostImported = rawMostImported.map((f) => {
        if (typeof f === "string") return { name: f, value: "imported" };
        return {
            name: f.name || f.path || "Unknown",
            value: f.imports !== undefined ? `${f.imports} import${f.imports === 1 ? "" : "s"}` : (f.value || "imported"),
        };
    });

    // 3. Unused files (0 dependents)
    const unusedFiles = (health.unusedFiles || []).map((f) => {
        if (typeof f === "string") return { name: f, value: "0 dependents" };
        return {
            name: f.name || f.path || "Unknown",
            value: f.value || "0 dependents",
        };
    });

    // 4. Orphan files (0 deps & 0 dependents)
    const orphanFiles = (health.orphanFiles || []).map((f) => {
        if (typeof f === "string") return { name: f, value: "isolated" };
        return {
            name: f.name || f.path || "Unknown",
            value: f.value || "isolated",
        };
    });

    return (
        <section aria-label="Health signals" className="w-full">
            {/* Block header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <h2 className="text-lg sm:text-xl font-bold font-display tracking-tight text-[var(--ink)]">
                        Health signals
                    </h2>
                    <span className="badge badge-neutral text-[11px]">
                        Quality metrics
                    </span>
                </div>
            </div>

            {/* 2×2 grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                <SignalPanel
                    title="Large files (>300 lines)"
                    icon={FileCode}
                    items={largeFiles}
                    badgeType="warning"
                    isCleanPositive={false}
                    emptyMessage={"No files exceed 300 lines.\nYour codebase is well-structured."}
                    onSelectFile={handleSelectFile}
                />
                <SignalPanel
                    title="Most imported files"
                    icon={Share2}
                    items={mostImported}
                    badgeType="accent"
                    isCleanPositive={false}
                    emptyMessage={"Import data unavailable.\nRun a full analysis to populate this."}
                    onSelectFile={handleSelectFile}
                />
                <SignalPanel
                    title="Unused files"
                    icon={FileQuestion}
                    items={unusedFiles}
                    badgeType="neutral"
                    isCleanPositive={true}
                    emptyMessage={"No unused files detected.\nEvery file is referenced somewhere."}
                    onSelectFile={handleSelectFile}
                />
                <SignalPanel
                    title="Orphan files"
                    icon={AlertCircle}
                    items={orphanFiles}
                    badgeType="danger"
                    isCleanPositive={true}
                    emptyMessage={"No orphan files found.\nAll files are connected to the dependency graph."}
                    onSelectFile={handleSelectFile}
                />
            </div>
        </section>
    );
}

export default HealthSignals;


import { useState } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { GlassPanel } from "../ui/GlassCard";

const PAGE_SIZE = 10;

/* ─── Empty state ─────────────────────────────────────────────────────────── */
function EmptyState({ message }) {
    return (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "var(--muted)", opacity: 0.5 }}
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0" />
                <path d="M9 15l6-6M15 15L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
            </svg>
            <span
                style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "var(--muted)",
                    textAlign: "center",
                    lineHeight: 1.6,
                }}
            >
                {message}
            </span>
        </div>
    );
}

/* ─── Single file row ─────────────────────────────────────────────────────── */
function FileRow({ item }) {
    return (
        <div className="flex items-center justify-between py-2 border-t border-[var(--line-soft)] first:border-t-0 text-[13.5px]">
            <span className="font-mono text-[12.5px] text-[var(--ink-soft)] truncate max-w-[240px]">
                {item.name}
            </span>
            <span className="font-mono text-xs text-[var(--muted)] shrink-0 ml-2">
                {item.value}
            </span>
        </div>
    );
}

/* ─── Paged signal panel ──────────────────────────────────────────────────── */
function SignalPanel({ title, items, emptyMessage }) {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const visibleItems = items.slice(0, visibleCount);
    const remaining   = items.length - visibleCount;
    const hasMore     = remaining > 0;

    function showMore() {
        setVisibleCount((prev) => prev + PAGE_SIZE);
    }

    return (
        <GlassPanel>
            {/* Panel header */}
            <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[var(--line)]">
                <h3 className="text-[14.5px] font-semibold text-[var(--ink)]">
                    {title}
                </h3>
                {items.length > 0 && (
                    <span
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "var(--muted)",
                        }}
                    >
                        {items.length} file{items.length !== 1 ? "s" : ""}
                    </span>
                )}
            </div>

            {/* Rows or empty state */}
            {items.length === 0 ? (
                <EmptyState message={emptyMessage} />
            ) : (
                <>
                    <div className="flex flex-col">
                        {visibleItems.map((item, i) => (
                            <FileRow key={i} item={item} />
                        ))}
                    </div>

                    {/* Show more */}
                    {hasMore && (
                        <button
                            onClick={showMore}
                            style={{
                                width: "100%",
                                marginTop: "12px",
                                padding: "7px 0",
                                background: "rgba(59, 111, 237, 0.06)",
                                border: "1px solid rgba(59, 111, 237, 0.18)",
                                borderRadius: "8px",
                                fontFamily: "var(--font-mono)",
                                fontSize: "12px",
                                color: "var(--accent)",
                                cursor: "pointer",
                                transition: "background 0.18s ease, border-color 0.18s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(59, 111, 237, 0.12)";
                                e.currentTarget.style.borderColor = "rgba(59, 111, 237, 0.32)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(59, 111, 237, 0.06)";
                                e.currentTarget.style.borderColor = "rgba(59, 111, 237, 0.18)";
                            }}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Show {Math.min(remaining, PAGE_SIZE)} more
                            <span style={{ color: "var(--muted)", fontSize: "11px" }}>
                                ({remaining} remaining)
                            </span>
                        </button>
                    )}
                </>
            )}
        </GlassPanel>
    );
}

/* ─── HealthSignals ───────────────────────────────────────────────────────── */
function HealthSignals() {
    const { repository } = useRepository() || {};
    const health = repository?.health || {};

    const largeFiles   = health.largeFiles   || [];
    const mostImported = health.mostImported  || [];
    const unusedFiles  = health.unusedFiles   || [];
    const orphanFiles  = health.orphanFiles   || [];

    return (
        <section aria-label="Health signals" className="w-full">
            {/* Block header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold font-display tracking-tight text-[var(--ink)]">
                    Health signals
                </h2>
                <button className="text-xs font-mono text-[var(--muted)] hover:text-[var(--ink-soft)] cursor-pointer transition-colors">
                    Full breakdown →
                </button>
            </div>

            {/* 2×2 grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SignalPanel
                    title="Large files (>300 lines)"
                    items={largeFiles}
                    emptyMessage={"No files exceed 300 lines.\nYour codebase is well-structured."}
                />
                <SignalPanel
                    title="Most imported files"
                    items={mostImported}
                    emptyMessage={"Import data unavailable.\nRun a full analysis to populate this."}
                />
                <SignalPanel
                    title="Unused files"
                    items={unusedFiles}
                    emptyMessage={"No unused files detected.\nEvery file is referenced somewhere."}
                />
                <SignalPanel
                    title="Orphan files"
                    items={orphanFiles}
                    emptyMessage={"No orphan files found.\nAll files are connected to the dependency graph."}
                />
            </div>
        </section>
    );
}

export default HealthSignals;

import { useRepository } from "../../context/RepositoryContext";
import { GlassPanel } from "../ui/GlassCard";

function HealthSignals() {
    const { repository } = useRepository() || {};
    const health = repository?.health || {};

    const largeFiles = health.largeFiles || [
        { name: "ReactFiberBeginWork.js", value: "1,184 ln" },
        { name: "ReactFiberCompleteWork.js", value: "902 ln" },
        { name: "ReactDOMComponent.js", value: "714 ln" },
    ];

    const mostImported = health.mostImported || [
        { name: "react/index.js", value: "128 refs" },
        { name: "shared/ReactSharedInternals.js", value: "96 refs" },
        { name: "react-dom/client.js", value: "74 refs" },
    ];

    const unusedFiles = health.unusedFiles || [
        { name: "react-dom/index.js", value: "entry" },
        { name: "test-utils/index.js", value: "entry" },
    ];

    const orphanFiles = health.orphanFiles || [
        { name: "scripts/rollup/build.js", value: "0 / 0" },
    ];

    return (
        <section aria-label="Health signals" className="w-full">
            {/* Block Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold font-display tracking-tight text-[var(--ink)]">
                    Health signals
                </h2>
                <button className="text-xs font-mono text-[var(--muted)] hover:text-[var(--ink-soft)] cursor-pointer transition-colors">
                    Full breakdown →
                </button>
            </div>

            {/* 2x2 Grid of GlassPanels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Panel 1: Large files (>300 lines) */}
                <GlassPanel>
                    <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[var(--line)]">
                        <h3 className="text-[14.5px] font-semibold text-[var(--ink)]">
                            Large files (&gt;300 lines)
                        </h3>
                    </div>
                    <div className="flex flex-col">
                        {largeFiles.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between py-2 border-t border-[var(--line-soft)] first:border-t-0 text-[13.5px]"
                            >
                                <span className="font-mono text-[12.5px] text-[var(--ink-soft)] truncate max-w-[240px]">
                                    {item.name}
                                </span>
                                <span className="font-mono text-xs text-[var(--muted)] shrink-0 ml-2">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </GlassPanel>

                {/* Panel 2: Most imported files */}
                <GlassPanel>
                    <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[var(--line)]">
                        <h3 className="text-[14.5px] font-semibold text-[var(--ink)]">
                            Most imported files
                        </h3>
                    </div>
                    <div className="flex flex-col">
                        {mostImported.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between py-2 border-t border-[var(--line-soft)] first:border-t-0 text-[13.5px]"
                            >
                                <span className="font-mono text-[12.5px] text-[var(--ink-soft)] truncate max-w-[240px]">
                                    {item.name}
                                </span>
                                <span className="font-mono text-xs text-[var(--muted)] shrink-0 ml-2">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </GlassPanel>

                {/* Panel 3: Unused files */}
                <GlassPanel>
                    <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[var(--line)]">
                        <h3 className="text-[14.5px] font-semibold text-[var(--ink)]">
                            Unused files
                        </h3>
                    </div>
                    <div className="flex flex-col">
                        {unusedFiles.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between py-2 border-t border-[var(--line-soft)] first:border-t-0 text-[13.5px]"
                            >
                                <span className="font-mono text-[12.5px] text-[var(--ink-soft)] truncate max-w-[240px]">
                                    {item.name}
                                </span>
                                <span className="font-mono text-xs text-[var(--muted)] shrink-0 ml-2">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </GlassPanel>

                {/* Panel 4: Orphan files */}
                <GlassPanel>
                    <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[var(--line)]">
                        <h3 className="text-[14.5px] font-semibold text-[var(--ink)]">
                            Orphan files
                        </h3>
                    </div>
                    <div className="flex flex-col">
                        {orphanFiles.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between py-2 border-t border-[var(--line-soft)] first:border-t-0 text-[13.5px]"
                            >
                                <span className="font-mono text-[12.5px] text-[var(--ink-soft)] truncate max-w-[240px]">
                                    {item.name}
                                </span>
                                <span className="font-mono text-xs text-[var(--muted)] shrink-0 ml-2">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </GlassPanel>
            </div>
        </section>
    );
}

export default HealthSignals;

import { useRepository } from "../../context/RepositoryContext";
import { GlassCard } from "../ui/GlassCard";
import { Folder } from "lucide-react";

const DEFAULT_FOLDERS = [
    { label: "components", pct: 38 },
    { label: "hooks", pct: 14 },
    { label: "utils", pct: 21 },
    { label: "services", pct: 9 },
    { label: "config", pct: 6 },
];

function FolderDistribution() {
    const { repository } = useRepository() || {};

    let folders = DEFAULT_FOLDERS;

    if (repository?.structure?.folders) {
        const rawFolders = repository.structure.folders;
        const total = Object.values(rawFolders).reduce((a, b) => a + b, 0);

        if (total > 0) {
            folders = Object.entries(rawFolders).map(([label, count]) => {
                const pct = typeof count === "number" && count <= 100 && total === 100
                    ? count
                    : Math.round((count / total) * 100);
                return { label, pct };
            });
        }
    }

    return (
        <section aria-label="Folder distribution" className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold font-display tracking-tight text-[var(--ink)]">
                    Folder distribution
                </h2>
            </div>

            {/* Symmetrical GlassCard */}
            <GlassCard className="flex flex-col p-5 sm:p-6">
                <div className="flex flex-col divide-y divide-[var(--line-soft)]">
                    {folders.map((item) => (
                        <div
                            key={item.label}
                            className="grid grid-cols-[130px_1fr_48px] sm:grid-cols-[160px_1fr_52px] items-center gap-4 py-2.5"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <Folder size={14} className="text-[var(--accent)] shrink-0 opacity-80" />
                                <span className="font-mono text-[12.5px] text-[var(--ink-soft)] font-medium truncate" title={item.label}>
                                    {item.label}
                                </span>
                            </div>
                            <div className="h-2 w-full bg-[rgba(15,22,38,0.06)] rounded-full overflow-hidden p-[1px]">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[#60a5fa] transition-all duration-500 ease-out"
                                    style={{ width: `${Math.max(item.pct, 3)}%` }}
                                />
                            </div>
                            <span className="font-mono text-[12px] font-semibold text-[var(--ink-soft)] text-right">
                                {item.pct}%
                            </span>
                        </div>
                    ))}
                </div>
            </GlassCard>
        </section>
    );
}

export default FolderDistribution;


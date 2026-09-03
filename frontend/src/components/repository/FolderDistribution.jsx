import { useRepository } from "../../context/RepositoryContext";
import { GlassCard } from "../ui/GlassCard";

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
                <h2 className="text-lg font-bold font-display tracking-tight text-[var(--ink)]">
                    Folder distribution
                </h2>
            </div>

            {/* GlassCard with horizontal progress bars */}
            <GlassCard className="flex flex-col gap-3">
                {folders.map((item) => (
                    <div
                        key={item.label}
                        className="grid grid-cols-[120px_1fr_46px] items-center gap-3"
                    >
                        <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink-soft)] truncate">
                            {item.label}
                        </span>
                        <div className="h-1.5 w-full bg-[rgba(15,22,38,0.07)] rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full bg-[var(--accent)] transition-all duration-500 ease-out"
                                style={{ width: `${Math.max(item.pct, 2)}%` }}
                            />
                        </div>
                        <span className="font-mono text-[11.5px] text-[var(--muted)] text-right">
                            {item.pct}%
                        </span>
                    </div>
                ))}
            </GlassCard>
        </section>
    );
}

export default FolderDistribution;

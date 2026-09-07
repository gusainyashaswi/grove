import { useRepository } from "../../context/RepositoryContext";
import { GlassCard } from "../ui/GlassCard";
import { FileText, Folder, AlignLeft, Clock, ArrowUpRight } from "lucide-react";

function StatsBar() {
    const { repository, setSelectedFile, setActiveTab } = useRepository() || {};

    const fileCount = repository?.files?.length ?? repository?.statistics?.totalFiles ?? 1842;
    const folderCount = repository?.statistics?.totalFolders ?? 214;
    const totalLines = repository?.statistics?.totalLines ?? 96400;
    const avgLinesPerFile = repository?.statistics?.averageLinesPerFile ?? 52;

    const avgDeps = repository?.statistics?.averageDependencies ?? 4.2;
    const maxDeps = repository?.statistics?.maximumDependencies ?? 27;
    const maxDepFileName = repository?.statistics?.maxDepFile?.name ?? "ReactFiberWorkLoop.js";

    const largestFileName = repository?.statistics?.largestFile?.name ?? "ReactFiberBeginWork.js";
    const largestFileLines = repository?.statistics?.largestFile?.lines ?? 1184;

    const formattedLines = totalLines >= 1000
        ? `${(totalLines / 1000).toFixed(1)}k`
        : totalLines.toLocaleString();

    const topStats = [
        {
            label: "Total files",
            value: typeof fileCount === "number" ? fileCount.toLocaleString() : fileCount,
            icon: FileText,
        },
        {
            label: "Total folders",
            value: typeof folderCount === "number" ? folderCount.toLocaleString() : folderCount,
            icon: Folder,
        },
        {
            label: "Lines of code",
            value: formattedLines,
            icon: AlignLeft,
        },
        {
            label: "Avg lines / file",
            value: avgLinesPerFile,
            icon: Clock,
        },
    ];

    const handleOpenLargest = () => {
        if (repository?.files && setSelectedFile) {
            const target = repository.files.find(f => f.name === largestFileName || f.path?.includes(largestFileName));
            if (target) {
                setSelectedFile(target);
            }
        }
        if (setActiveTab) {
            setActiveTab("explorer");
        }
    };

    return (
        <section aria-label="Repository statistics" className="w-full flex flex-col gap-4">
            {/* 4-Column Primary Stat Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {topStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <GlassCard key={stat.label} className="stat-card flex flex-col justify-between">
                            <div className="icon-box mb-4">
                                <Icon size={17} />
                            </div>
                            <div>
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>

            {/* 3-Column Secondary Stat Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Avg dependencies / file */}
                <GlassCard className="stat-card flex flex-col justify-between">
                    <div className="stat-value">{avgDeps}</div>
                    <div className="stat-label">Avg dependencies / file</div>
                </GlassCard>

                {/* Max dependencies */}
                <GlassCard className="stat-card flex flex-col justify-between">
                    <div>
                        <div className="stat-value">{maxDeps}</div>
                        <div className="stat-label">Max dependencies</div>
                    </div>
                    <div className="stat-sub font-mono text-[11.5px] text-[var(--ink-soft)] mt-2.5 truncate">
                        {maxDepFileName}
                    </div>
                </GlassCard>

                {/* Largest file */}
                <GlassCard className="stat-card flex flex-col justify-between">
                    <div>
                        <div className="stat-value">{typeof largestFileLines === "number" ? largestFileLines.toLocaleString() : largestFileLines} lines</div>
                        <div className="stat-label">Largest file</div>
                    </div>
                    <div className="stat-sub flex items-center justify-between gap-2 mt-2.5">
                        <span className="font-mono text-[11.5px] text-[var(--ink-soft)] truncate">
                            {largestFileName}
                        </span>
                        <button
                            onClick={handleOpenLargest}
                            className="chip text-[12.5px] py-1 px-3 cursor-pointer shrink-0"
                        >
                            <span>Open</span>
                            <ArrowUpRight size={12} />
                        </button>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}

export default StatsBar;
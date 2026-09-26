import { useRepository } from "../../context/RepositoryContext";
import { GlassCard } from "../ui/GlassCard";
import { FileText, Folder, AlignLeft, Clock, ArrowUpRight, Network } from "lucide-react";

function StatsBar() {
    const { repository, setSelectedFile, setActiveTab } = useRepository() || {};

    const fileCount = repository?.files?.length ?? repository?.statistics?.totalFiles ?? 1842;
    const folderCount = repository?.statistics?.totalFolders ?? 214;
    const totalLines = repository?.statistics?.totalLines ?? 96400;
    const avgLinesPerFile = repository?.statistics?.averageLinesPerFile ?? 52;

    const avgDeps = repository?.statistics?.averageDependencies ?? 4.2;
    const maxDeps = repository?.statistics?.maximumDependencies ?? 27;
    const maxDepFileRaw = repository?.statistics?.maxDepFile;
    const maxDepFileName = typeof maxDepFileRaw === "string" ? maxDepFileRaw : (maxDepFileRaw?.name ?? "ReactFiberWorkLoop.js");

    const largestFileRaw = repository?.statistics?.largestFile;
    const largestFileName = typeof largestFileRaw === "string" ? largestFileRaw : (largestFileRaw?.name ?? "ReactFiberBeginWork.js");
    const largestFileLines = typeof largestFileRaw === "object" && largestFileRaw?.lines ? largestFileRaw.lines : (repository?.statistics?.largestFileLines ?? 1184);

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
            value: typeof avgLinesPerFile === "number" ? Math.round(avgLinesPerFile) : avgLinesPerFile,
            icon: Clock,
        },
    ];

    const handleOpenFile = (targetFileName) => {
        if (repository?.files && setSelectedFile) {
            const target = repository.files.find(f => f.name === targetFileName || f.path?.endsWith(targetFileName));
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                {topStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <GlassCard key={stat.label} className="stat-card flex flex-col justify-between">
                            <Icon size={20} className="text-[var(--accent)] mb-3 shrink-0" />
                            <div>
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        </GlassCard>
                    );
                })}
            </div>

            {/* 3-Column Secondary Stat Grid — Symmetrically Balanced */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                {/* 1. Avg dependencies / file */}
                <GlassCard className="stat-card flex flex-col justify-between">
                    <div>
                        <div className="stat-value">
                            {typeof avgDeps === "number" ? avgDeps.toFixed(1) : avgDeps}
                        </div>
                        <div className="stat-label">Avg dependencies / file</div>
                    </div>
                    <div className="stat-sub flex items-center justify-between gap-2">
                        <span className="font-mono text-[11.5px] text-[var(--ink-soft)] truncate flex items-center gap-1.5">
                            <Network size={12} className="text-[var(--muted)]" />
                            Graph connectivity
                        </span>
                        <span className="font-mono text-[11.5px] text-[var(--muted)]">
                            density
                        </span>
                    </div>
                </GlassCard>

                {/* 2. Max dependencies */}
                <GlassCard className="stat-card flex flex-col justify-between">
                    <div>
                        <div className="stat-value">{maxDeps}</div>
                        <div className="stat-label">Max dependencies</div>
                    </div>
                    <div className="stat-sub flex items-center justify-between gap-2">
                        <span className="font-mono text-[11.5px] text-[var(--ink-soft)] truncate" title={maxDepFileName}>
                            {maxDepFileName}
                        </span>
                        <button
                            onClick={() => handleOpenFile(maxDepFileName)}
                            className="chip text-[11.5px] py-0.5 px-2.5 cursor-pointer shrink-0"
                            title="Inspect in explorer"
                        >
                            <span>Open</span>
                            <ArrowUpRight size={11} />
                        </button>
                    </div>
                </GlassCard>

                {/* 3. Largest file */}
                <GlassCard className="stat-card flex flex-col justify-between">
                    <div>
                        <div className="stat-value">
                            {typeof largestFileLines === "number" ? largestFileLines.toLocaleString() : largestFileLines} lines
                        </div>
                        <div className="stat-label">Largest file</div>
                    </div>
                    <div className="stat-sub flex items-center justify-between gap-2">
                        <span className="font-mono text-[11.5px] text-[var(--ink-soft)] truncate" title={largestFileName}>
                            {largestFileName}
                        </span>
                        <button
                            onClick={() => handleOpenFile(largestFileName)}
                            className="chip text-[11.5px] py-0.5 px-2.5 cursor-pointer shrink-0"
                            title="Inspect in explorer"
                        >
                            <span>Open</span>
                            <ArrowUpRight size={11} />
                        </button>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}

export default StatsBar;
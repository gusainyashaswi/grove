import { Fragment } from "react";
import { useRepository } from "../../context/RepositoryContext";
import StatCard from "./StatCard";
import { FileCode, FolderGit2, AlignLeft, GitFork, Activity } from "lucide-react";

function StatsBar() {
    const { repository } = useRepository();

    if (!repository || !repository.files) {
        return null;
    }

    const fileCount = repository.files.length;
    const folderCount = repository.statistics?.totalFolders ?? 0;
    const totalLines = repository.statistics?.totalLines ?? 0;
    const avgDeps = repository.statistics?.averageDependencies ?? 0;

    const stats = [
        {
            label: "Source Files",
            value: fileCount.toLocaleString(),
            icon: FileCode,
            color: "cyan",
            badge: "Parsed"
        },
        {
            label: "Total Folders",
            value: folderCount.toLocaleString(),
            icon: FolderGit2,
            color: "purple",
        },
        {
            label: "Lines of Code",
            value: totalLines.toLocaleString(),
            icon: AlignLeft,
            color: "emerald",
            badge: `${repository.statistics?.averageLinesPerFile ?? 0}/file`
        },
        {
            label: "Avg Dependencies",
            value: avgDeps.toString(),
            icon: GitFork,
            color: "amber",
            badge: `Max ${repository.statistics?.maximumDependencies ?? 0}`
        },
    ];

    return (
        <section aria-label="Repository statistics" className="w-full">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3 rounded-2xl glass-card border border-white/10 shadow-xl">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/10 transition-all duration-200"
                    >
                        <StatCard
                            label={stat.label}
                            value={stat.value}
                            icon={stat.icon}
                            color={stat.color}
                            badge={stat.badge}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default StatsBar;
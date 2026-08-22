import { useRepository } from "../../context/RepositoryContext";
import {
    Activity,
    FileCode,
    GitFork,
    AlignLeft,
    AlertTriangle,
    ShieldCheck,
    ArrowUpRight,
    Flame
} from "lucide-react";
import Badge from "../common/Badge";

function RepositoryStatistics() {
    const { repository, setSelectedFile } = useRepository();

    if (!repository?.statistics) {
        return null;
    }

    const { statistics, health } = repository;

    const handleSelectLargest = () => {
        if (!statistics.largestFile?.path) return;
        const target = repository.files?.find((f) => f.path === statistics.largestFile.path);
        if (target) {
            setSelectedFile(target);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-6 rounded-3xl glass-card border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(0,245,155,0.25)]">
                        <Activity size={18} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-display font-extrabold text-xl text-white tracking-tight">
                            Repository Health & Metrics
                        </h2>
                        <span className="text-xs text-slate-400 font-mono">
                            Complexity metrics, coupling depth, and codebase vitality signals
                        </span>
                    </div>
                </div>

                <Badge variant="accent" className="font-mono text-xs">
                    <ShieldCheck size={12} className="inline mr-1" />
                    Healthy Codebase
                </Badge>
            </div>

            {/* Main Metrics Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-[#090d14] border border-white/[0.06] flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Total Files
                    </span>
                    <span className="font-display text-2xl font-black text-white tabular-nums">
                        {statistics.totalFiles}
                    </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#090d14] border border-white/[0.06] flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Total Folders
                    </span>
                    <span className="font-display text-2xl font-black text-purple-400 tabular-nums">
                        {statistics.totalFolders}
                    </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#090d14] border border-white/[0.06] flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Total Lines
                    </span>
                    <span className="font-display text-2xl font-black text-sky-400 tabular-nums">
                        {statistics.totalLines.toLocaleString()}
                    </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#090d14] border border-white/[0.06] flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Avg Lines / File
                    </span>
                    <span className="font-display text-2xl font-black text-emerald-400 tabular-nums">
                        {statistics.averageLinesPerFile}
                    </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#090d14] border border-white/[0.06] flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Avg Dependencies
                    </span>
                    <span className="font-display text-2xl font-black text-amber-400 tabular-nums">
                        {statistics.averageDependencies}
                    </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#090d14] border border-white/[0.06] flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Max Dependencies
                    </span>
                    <span className="font-display text-2xl font-black text-rose-400 tabular-nums">
                        {statistics.maximumDependencies}
                    </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#090d14] border border-white/[0.06] flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Large Files (&gt;300L)
                    </span>
                    <span className="font-display text-2xl font-black text-amber-300 tabular-nums">
                        {health?.largeFiles?.length || 0}
                    </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#090d14] border border-white/[0.06] flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        Unused Files
                    </span>
                    <span className="font-display text-2xl font-black text-slate-300 tabular-nums">
                        {health?.unusedFiles?.length || 0}
                    </span>
                </div>
            </div>

            {/* Largest File Spotlight */}
            {statistics.largestFile && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                            <Flame size={20} />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                                    Largest Code File
                                </span>
                                <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.2 rounded-full">
                                    {statistics.largestFile.lines} lines
                                </span>
                            </div>
                            <span className="font-display text-lg font-bold text-white truncate">
                                {statistics.largestFile.name}
                            </span>
                            <span className="font-mono text-xs text-slate-400 truncate" title={statistics.largestFile.path}>
                                {statistics.largestFile.path}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleSelectLargest}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-semibold transition-all cursor-pointer shrink-0"
                    >
                        <span>Open in Editor</span>
                        <ArrowUpRight size={13} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default RepositoryStatistics;
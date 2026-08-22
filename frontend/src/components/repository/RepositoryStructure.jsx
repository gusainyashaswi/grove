import { useRepository } from "../../context/RepositoryContext";
import { Code2, Compass, FolderGit2, ArrowRight } from "lucide-react";
import Badge from "../common/Badge";

function RepositoryStructure() {
    const { repository, setSelectedFile } = useRepository();

    if (!repository || !repository.structure) {
        return null;
    }

    const { framework, folders } = repository.structure;
    const totalFolderFiles = Object.values(folders || {}).reduce((a, b) => a + b, 0);

    const handleSelectEntryPoint = () => {
        if (!repository.entryPoint?.path) return;
        const target = repository.files?.find((f) => f.path === repository.entryPoint.path);
        if (target) {
            setSelectedFile(target);
        }
    };

    return (
        <div className="flex flex-col gap-5 p-6 rounded-3xl glass-card border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-500/30 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                        <FolderGit2 size={18} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="font-display font-extrabold text-xl text-white tracking-tight">
                            Repository Architecture
                        </h2>
                        <span className="text-xs text-slate-400 font-mono">
                            Detected framework, entry point, and structural folder hierarchy
                        </span>
                    </div>
                </div>

                <Badge variant="cyan" className="font-mono text-xs">
                    {framework}
                </Badge>
            </div>

            {/* Entry Point & Framework Spotlight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Entry Point */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                            <Compass size={13} className="text-emerald-400" />
                            Detected Entry Point
                        </span>
                        <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>

                    {repository.entryPoint ? (
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex flex-col min-w-0">
                                <span className="font-display text-lg font-bold text-white truncate">
                                    {repository.entryPoint.name}
                                </span>
                                <span className="font-mono text-xs text-slate-400 truncate" title={repository.entryPoint.path}>
                                    {repository.entryPoint.path}
                                </span>
                            </div>

                            <button
                                onClick={handleSelectEntryPoint}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition-all cursor-pointer shrink-0"
                            >
                                <span>Inspect</span>
                                <ArrowRight size={12} />
                            </button>
                        </div>
                    ) : (
                        <span className="font-mono text-xs text-slate-500 italic">No entry point file detected</span>
                    )}
                </div>

                {/* Primary Framework */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between gap-3">
                    <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <Code2 size={13} className="text-sky-400" />
                        Stack Engine
                    </span>

                    <div className="flex items-baseline gap-3">
                        <span className="font-display text-2xl font-black text-white">
                            {framework}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                            AST Verified
                        </span>
                    </div>
                </div>
            </div>

            {/* Folder Distribution */}
            <div className="flex flex-col gap-3 pt-2">
                <span className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <FolderGit2 size={14} className="text-amber-400" />
                    Folder Distribution & Module Breakdown
                </span>

                {folders && Object.keys(folders).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {Object.entries(folders).map(([folder, count]) => {
                            const percent = totalFolderFiles > 0 ? Math.round((count / totalFolderFiles) * 100) : 0;

                            return (
                                <div
                                    key={folder}
                                    className="p-3.5 rounded-2xl bg-[#090d14] border border-white/[0.06] flex flex-col gap-2 hover:border-white/20 transition-all"
                                >
                                    <div className="flex items-center justify-between text-xs font-mono">
                                        <span className="font-bold text-slate-200">{folder}</span>
                                        <span className="text-slate-400 font-semibold">{count} files ({percent}%)</span>
                                    </div>

                                    {/* Mini Progress bar */}
                                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400"
                                            style={{ width: `${Math.max(percent, 8)}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <span className="font-mono text-xs text-slate-500 italic">No standard modular subdirectories detected</span>
                )}
            </div>
        </div>
    );
}

export default RepositoryStructure;
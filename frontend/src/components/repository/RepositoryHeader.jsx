import { useRepository } from "../../context/RepositoryContext";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    ExternalLink,
    CheckCircle2,
    GitBranch,
    Layers,
    Code2,
    Sparkles,
    FolderGit2,
    Cpu,
    Boxes
} from "lucide-react";
import Badge from "../common/Badge";

function RepositoryHeader({ activeTab = "studio", onTabChange }) {
    const { repository } = useRepository();

    if (!repository) return null;

    const name = repository.name ?? repository.entryPoint?.name ?? "Repository";
    const owner = repository.owner ?? null;
    const url = repository.url ?? null;
    const fullName = repository.fullName ?? (owner ? `${owner}/${name}` : name);
    const framework = repository.structure?.framework ?? "Unknown";
    const fileCount = repository.files?.length ?? 0;
    const folderCount = repository.statistics?.totalFolders ?? 0;
    const totalLines = repository.statistics?.totalLines ?? 0;

    return (
        <header className="w-full rounded-3xl glass-card border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-96 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* --- TOP BAR: BACK LINK & STATUS BADGE --- */}
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] relative z-10">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all duration-200"
                    aria-label="Back to home"
                >
                    <ArrowLeft size={13} aria-hidden="true" />
                    <span>Back to Explorer</span>
                </Link>

                <div className="flex items-center gap-2">
                    <Badge variant="success" className="font-mono text-xs">
                        <CheckCircle2 size={12} className="shrink-0" aria-hidden="true" />
                        Analysis Live
                    </Badge>
                </div>
            </div>

            {/* --- MAIN HEADER CONTENT: TITLE + METRICS --- */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-6 relative z-10">
                {/* Left: Repo Identity */}
                <div className="flex flex-col gap-2 min-w-0">
                    {owner && (
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-emerald-400/90 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                {owner}
                            </span>
                            <span className="text-slate-500 text-xs">/</span>
                        </div>
                    )}

                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                            {name}
                        </h1>

                        {url && (
                            <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Open ${fullName} on GitHub`}
                                className="inline-flex size-9 items-center justify-center rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
                                title="Open in GitHub"
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>

                    {/* Quick Specs Pill Row */}
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-300 bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full">
                            <Code2 size={13} className="text-sky-400" />
                            {framework}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-300 bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full">
                            <GitBranch size={13} className="text-purple-400" />
                            main
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-300 bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full">
                            <Boxes size={13} className="text-amber-400" />
                            {fileCount} files · {folderCount} folders
                        </span>
                    </div>
                </div>

                {/* Right: Quick Stat Badges */}
                <div className="flex items-center gap-3 overflow-x-auto pb-1 lg:pb-0">
                    <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] min-w-[110px] text-center">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            Total Lines
                        </span>
                        <span className="font-display text-xl font-black text-white tabular-nums">
                            {totalLines.toLocaleString()}
                        </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] min-w-[110px] text-center">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            Avg / File
                        </span>
                        <span className="font-display text-xl font-black text-emerald-400 tabular-nums">
                            {repository.statistics?.averageLinesPerFile ?? 0}
                        </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] min-w-[110px] text-center">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            Max Dep
                        </span>
                        <span className="font-display text-xl font-black text-sky-400 tabular-nums">
                            {repository.statistics?.maximumDependencies ?? 0}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default RepositoryHeader;
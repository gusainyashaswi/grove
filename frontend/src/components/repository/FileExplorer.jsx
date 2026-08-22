import { useState } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { buildFileTree } from "../../utils/buildFileTree";
import FileTree from "./FileTree";
import { Search, X, RotateCcw } from "lucide-react";

function FileExplorer() {
    const [search, setSearch] = useState("");
    const { repository, selectedFile } = useRepository();

    if (!repository || !repository.files) {
        return null;
    }

    const totalCount = repository.files.length;
    const filteredFiles = repository.files.filter((file) =>
        file.name.toLowerCase().includes(search.toLowerCase()) ||
        file.path.toLowerCase().includes(search.toLowerCase())
    );

    const tree = buildFileTree(filteredFiles);

    return (
        <div className="flex flex-col h-full min-h-0">
            {/* Header */}
            <div className="flex items-center justify-between px-2 py-3 border-b border-white/[0.08] mb-3">
                <div className="flex items-center gap-2.5">
                    <span className="font-mono font-extrabold tracking-widest text-xs text-slate-300 uppercase">
                        FOLDERS
                    </span>
                    <span className="font-mono text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        {filteredFiles.length}
                    </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-500">
                    <button
                        onClick={() => setSearch("")}
                        className="p-1.5 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                        title="Reset filter"
                    >
                        <RotateCcw size={13} />
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="relative flex items-center mb-3 px-1">
                <Search
                    size={14}
                    className="absolute left-3.5 text-slate-500 pointer-events-none shrink-0"
                    aria-hidden="true"
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Filter files..."
                    className="
                        w-full h-9 pl-9 pr-8
                        font-mono text-xs text-slate-100 placeholder:text-slate-500
                        bg-white/[0.04] border border-white/[0.08] rounded-xl
                        outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] focus:shadow-[0_0_12px_rgba(0,245,155,0.2)]
                        transition-all duration-150
                    "
                    aria-label="Filter files"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-3.5 text-slate-500 hover:text-slate-200 p-0.5 cursor-pointer"
                        aria-label="Clear search"
                    >
                        <X size={13} />
                    </button>
                )}
            </div>

            {/* Tree */}
            <div className="flex-1 overflow-y-auto min-h-0 pr-1 -mr-1 py-1 px-1">
                {filteredFiles.length > 0 ? (
                    <FileTree tree={tree} />
                ) : (
                    <div className="py-10 text-center text-slate-500 font-mono text-xs">
                        No matching files
                    </div>
                )}
            </div>

            {/* Selected File Footer */}
            {selectedFile && (
                <div className="pt-3 mt-auto border-t border-white/[0.08] text-xs font-mono text-slate-400 truncate flex items-center gap-2.5 px-2">
                    <span className="size-2 rounded-full bg-[var(--color-accent)] shrink-0 animate-pulse" />
                    <span className="truncate text-slate-300 font-medium" title={selectedFile.path}>
                        {selectedFile.path}
                    </span>
                </div>
            )}
        </div>
    );
}

export default FileExplorer;
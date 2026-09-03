import { useState } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { buildFileTree } from "../../utils/buildFileTree";
import FileTree from "./FileTree";
import { GlassCard } from "../ui/GlassCard";
import { Search, X } from "lucide-react";

function FileExplorer() {
    const [search, setSearch] = useState("");
    const { repository } = useRepository() || {};

    if (!repository || !repository.files) {
        return (
            <GlassCard className="!p-4 w-full">
                <div className="text-xs font-mono text-[var(--muted)] text-center py-6">
                    No repository files loaded
                </div>
            </GlassCard>
        );
    }

    const filteredFiles = repository.files.filter((file) =>
        file.name.toLowerCase().includes(search.toLowerCase()) ||
        file.path.toLowerCase().includes(search.toLowerCase())
    );

    const tree = buildFileTree(filteredFiles);

    return (
        <GlassCard className="!p-4 w-full">
            {/* Explorer Search Input (Pill, icon on left) */}
            <div className="explorer-search flex items-center gap-2 border border-[var(--line)] rounded-full px-3.5 py-2 mb-3 bg-white/60">
                <Search size={14} className="text-[var(--muted)] shrink-0" aria-hidden="true" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search files…"
                    className="w-full text-xs font-body text-[var(--ink)] placeholder:text-[var(--muted)] bg-transparent outline-none border-none"
                    aria-label="Search files"
                />
                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="text-[var(--muted)] hover:text-[var(--ink)] p-0.5 cursor-pointer"
                        aria-label="Clear search"
                    >
                        <X size={13} />
                    </button>
                )}
            </div>

            {/* Tree Container */}
            <div className="tree overflow-y-auto max-h-[560px] pr-1">
                {filteredFiles.length > 0 ? (
                    <FileTree tree={tree} />
                ) : (
                    <div className="py-8 text-center text-[var(--muted)] font-mono text-xs">
                        No matching files
                    </div>
                )}
            </div>
        </GlassCard>
    );
}

export default FileExplorer;
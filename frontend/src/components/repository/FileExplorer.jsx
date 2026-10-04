import { useState, useMemo, useEffect } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { buildFileTree } from "../../utils/buildFileTree";
import FileTree from "./FileTree";
import { GlassCard } from "../ui/GlassCard";
import { Search, X, ChevronsDownUp } from "lucide-react";

/**
 * Recursively collects all folder paths in a tree.
 */
function getAllFolderPaths(tree, parentPath = "") {
    const paths = new Set();
    if (!tree) return paths;
    for (const [name, node] of Object.entries(tree)) {
        if (node.type === "folder") {
            const currentPath = parentPath ? `${parentPath}/${name}` : name;
            paths.add(currentPath);
            if (node.children) {
                const sub = getAllFolderPaths(node.children, currentPath);
                sub.forEach((p) => paths.add(p));
            }
        }
    }
    return paths;
}

function FileExplorer() {
    const [search, setSearch] = useState("");
    const { repository } = useRepository() || {};

    const filteredFiles = useMemo(() => {
        if (!repository?.files) return [];
        return repository.files.filter(
            (file) =>
                file.name.toLowerCase().includes(search.toLowerCase()) ||
                file.path.toLowerCase().includes(search.toLowerCase())
        );
    }, [repository?.files, search]);

    const tree = useMemo(() => buildFileTree(filteredFiles), [filteredFiles]);

    // Full tree of all repository files (used to determine parent keys and reset state)
    const fullTree = useMemo(() => {
        return repository?.files ? buildFileTree(repository.files) : {};
    }, [repository?.files]);

    const allFolderPaths = useMemo(() => getAllFolderPaths(fullTree), [fullTree]);

    const initialExpandedPaths = useMemo(() => {
        if (allFolderPaths.size <= 25) return allFolderPaths;
        const topLevel = new Set();
        const entryFolder = repository?.entryPoint?.path
            ? repository.entryPoint.path.substring(0, repository.entryPoint.path.lastIndexOf("/"))
            : "";

        for (const p of allFolderPaths) {
            if (!p.includes("/")) {
                topLevel.add(p);
            }
            if (entryFolder && (p === entryFolder || entryFolder.startsWith(p + "/"))) {
                topLevel.add(p);
            }
        }
        return topLevel;
    }, [allFolderPaths, repository?.entryPoint?.path]);

    // Track which folder paths are expanded
    const [expandedPaths, setExpandedPaths] = useState(() => initialExpandedPaths);

    // Reset expanded paths whenever the active repository changes
    useEffect(() => {
        setExpandedPaths(initialExpandedPaths);
    }, [initialExpandedPaths]);

    // When searching, expand all matching folders so files are immediately visible
    const effectiveExpandedPaths = useMemo(() => {
        if (search.trim()) {
            return getAllFolderPaths(tree);
        }
        return expandedPaths;
    }, [search, tree, expandedPaths]);

    const toggleFolder = (path) => {
        setExpandedPaths((prev) => {
            const next = new Set(prev);
            if (next.has(path)) {
                next.delete(path);
            } else {
                next.add(path);
            }
            return next;
        });
    };

    /**
     * Collapses every open folder back to its top-level parent in one click.
     * If all subfolders are already collapsed, a subsequent click collapses top-level parents as well.
     */
    const handleCollapseAll = () => {
        const topLevelFolderKeys = Object.keys(fullTree).filter(
            (k) => fullTree[k]?.type === "folder"
        );

        // Check if any nested subfolder (contains a path separator "/") is open
        const hasOpenSubfolders = Array.from(expandedPaths).some((p) => p.includes("/"));

        if (hasOpenSubfolders) {
            // Keep top-level parents open, collapse all open subfolders back to them
            setExpandedPaths(new Set(topLevelFolderKeys));
        } else if (expandedPaths.size > 0) {
            // If already collapsed to top-level, collapse the top-level parent(s) too
            setExpandedPaths(new Set());
        } else {
            // If completely collapsed, re-expand back to top-level parents
            setExpandedPaths(new Set(topLevelFolderKeys));
        }
    };

    if (!repository || !repository.files) {
        return (
            <GlassCard className="!p-4 w-full">
                <div className="text-xs font-mono text-[var(--muted)] text-center py-6">
                    No repository files loaded
                </div>
            </GlassCard>
        );
    }

    return (
        <GlassCard className="!p-4 w-full">
            {/* Top Toolbar: Search Input + Collapse All Icon Button */}
            <div className="flex items-center gap-2 mb-3">
                <div className="explorer-search flex-1 min-w-0 flex items-center gap-2 border border-[var(--line)] rounded-full px-3.5 py-2 bg-white/60 focus-within:bg-white focus-within:border-[var(--line-strong)] transition-all">
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
                            type="button"
                            onClick={() => setSearch("")}
                            className="text-[var(--muted)] hover:text-[var(--ink)] p-0.5 cursor-pointer"
                            aria-label="Clear search"
                        >
                            <X size={13} />
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleCollapseAll}
                    title="Collapse all folders"
                    aria-label="Collapse all folders"
                    className="shrink-0 h-[34px] w-[34px] rounded-full border border-[var(--line)] bg-white/60 hover:bg-white text-[var(--muted)] hover:text-[var(--ink)] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:border-[var(--line-strong)] active:scale-95"
                >
                    <ChevronsDownUp size={14} />
                </button>
            </div>

            {/* Tree Container */}
            <div className="tree overflow-y-auto max-h-[560px] pr-1">
                {filteredFiles.length > 0 ? (
                    <FileTree
                        tree={tree}
                        expandedPaths={effectiveExpandedPaths}
                        toggleFolder={toggleFolder}
                    />
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
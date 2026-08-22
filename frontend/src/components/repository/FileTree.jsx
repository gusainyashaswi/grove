import { useState } from "react";
import { useRepository } from "../../context/RepositoryContext";
import {
    ChevronRight,
    ChevronDown,
    Folder,
    FolderOpen,
    FileCode,
    FileText,
    FileJson,
    Lock,
    GitBranch,
    File,
    Code2,
    Hash
} from "lucide-react";

/**
 * Returns customized VS Code icon and badge for files.
 */
function renderVSCodeFileBadge(fileName, extension) {
    const ext = extension?.toLowerCase() || "";
    const name = fileName?.toLowerCase() || "";

    if (name === "package.json") {
        return (
            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded shrink-0">
                &#123;&nbsp;&#125;
            </span>
        );
    }

    if (name === ".gitignore") {
        return (
            <span className="font-mono text-xs font-bold text-rose-400 bg-rose-400/10 px-1.5 py-0.5 rounded shrink-0">
                <GitBranch size={13} className="inline -mt-0.5" />
            </span>
        );
    }

    if (name.includes("readme")) {
        return (
            <span className="font-mono text-xs font-bold text-sky-400 bg-sky-400/10 px-1.5 py-0.5 rounded shrink-0">
                &lt;&gt;
            </span>
        );
    }

    if (name.includes("lock")) {
        return (
            <span className="font-mono text-xs font-bold text-slate-400 bg-slate-400/10 px-1.5 py-0.5 rounded shrink-0">
                <Lock size={12} className="inline -mt-0.5" />
            </span>
        );
    }

    if (ext === ".css" || ext === ".scss" || ext === ".less") {
        return (
            <span className="font-mono text-xs font-bold text-pink-400 bg-pink-400/10 px-1.5 py-0.5 rounded shrink-0">
                /*
            </span>
        );
    }

    if (ext === ".jsx" || ext === ".tsx") {
        return (
            <span className="font-mono text-xs font-bold text-sky-400 bg-sky-400/10 px-1.5 py-0.5 rounded shrink-0">
                /*
            </span>
        );
    }

    if (ext === ".js" || ext === ".ts" || ext === ".mjs" || ext === ".cjs") {
        return (
            <span className="font-mono text-xs font-bold text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded shrink-0">
                /*
            </span>
        );
    }

    if (ext === ".json") {
        return (
            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded shrink-0">
                &#123;&nbsp;&#125;
            </span>
        );
    }

    return (
        <span className="font-mono text-xs font-medium text-slate-400 bg-white/5 px-1.5 py-0.5 rounded shrink-0">
            <File size={12} className="inline -mt-0.5" />
        </span>
    );
}

function FolderItem({ name, children, depth = 0 }) {
    const [isOpen, setIsOpen] = useState(true);
    const ChevronIcon = isOpen ? ChevronDown : ChevronRight;
    const FolderIcon = isOpen ? FolderOpen : Folder;

    const isSrc = name.toLowerCase() === "src";
    const isComponents = name.toLowerCase() === "components";
    const isPublic = name.toLowerCase() === "public" || name.toLowerCase() === "assets";

    const folderColor = isSrc
        ? "text-sky-400"
        : isComponents
        ? "text-emerald-400"
        : isPublic
        ? "text-amber-400"
        : "text-amber-300/80";

    return (
        <div className="flex flex-col select-none">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="
                    group flex items-center gap-2 w-full py-2 px-2 rounded-lg
                    text-[13px] font-mono text-slate-300 hover:text-white hover:bg-white/[0.06]
                    transition-all duration-150 text-left cursor-pointer
                "
                aria-expanded={isOpen}
            >
                <ChevronIcon
                    size={14}
                    className="text-slate-500 group-hover:text-slate-300 shrink-0 transition-transform"
                    aria-hidden="true"
                />
                <FolderIcon
                    size={15}
                    className={`${folderColor} shrink-0 transition-colors`}
                    aria-hidden="true"
                />
                <span className="truncate font-semibold tracking-tight">{name}</span>
            </button>

            {isOpen && (
                <div className="pl-4 ml-3 border-l border-white/[0.08] flex flex-col gap-0.5 mt-0.5">
                    <FileTree tree={children} depth={depth + 1} />
                </div>
            )}
        </div>
    );
}

function FileTree({ tree, depth = 0 }) {
    const { selectedFile, setSelectedFile } = useRepository();

    return (
        <ul className="flex flex-col gap-0.5 list-none p-0 m-0">
            {Object.entries(tree).map(([name, node]) => (
                <li key={name}>
                    {node.type === "folder" ? (
                        <FolderItem name={name} children={node.children} depth={depth} />
                    ) : (
                        (() => {
                            const isSelected = selectedFile?.path === node.data.path;
                            const badge = renderVSCodeFileBadge(name, node.data.extension);

                            return (
                                <button
                                    onClick={() => setSelectedFile(node.data)}
                                    className={`
                                        group flex items-center justify-between gap-2.5 w-full py-2 px-2.5 rounded-lg
                                        text-[13px] font-mono text-left transition-all duration-150
                                        select-none truncate cursor-pointer
                                        ${isSelected
                                            ? "bg-[#182338] text-white shadow-sm border-l-2 border-[var(--color-accent)]"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                                        }
                                    `}
                                    aria-current={isSelected ? "location" : undefined}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0 truncate">
                                        {badge}
                                        <span
                                            className={`truncate tracking-tight ${
                                                isSelected
                                                    ? "font-bold text-white border-b border-rose-500 pb-0.5"
                                                    : "font-normal group-hover:text-white"
                                            }`}
                                            title={name}
                                        >
                                            {name}
                                        </span>
                                    </div>

                                    {isSelected && (
                                        <span className="size-1.5 rounded-full bg-[var(--color-accent)] shrink-0 shadow-[0_0_8px_rgba(0,245,155,0.8)]" />
                                    )}
                                </button>
                            );
                        })()
                    )}
                </li>
            ))}
        </ul>
    );
}

export default FileTree;
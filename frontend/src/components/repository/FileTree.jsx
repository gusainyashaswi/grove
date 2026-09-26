import { useState } from "react";
import { useRepository } from "../../context/RepositoryContext";
import {
    ChevronRight,
    ChevronDown,
    Folder,
    FolderOpen,
    FileCode,
} from "lucide-react";

function FolderItem({
    name,
    children,
    depth = 0,
    path = "",
    expandedPaths,
    toggleFolder,
}) {
    const [localIsOpen, setLocalIsOpen] = useState(true);

    const isControlled = expandedPaths !== undefined && toggleFolder !== undefined;
    const isOpen = isControlled ? expandedPaths.has(path) : localIsOpen;

    const ChevronIcon = isOpen ? ChevronDown : ChevronRight;
    const FolderIcon = isOpen ? FolderOpen : Folder;

    const childCount = children ? Object.keys(children).length : 0;
    const indentClass = depth === 1 ? "pl-5" : depth >= 2 ? "pl-8" : "";

    const handleToggle = () => {
        if (isControlled) {
            toggleFolder(path);
        } else {
            setLocalIsOpen(!localIsOpen);
        }
    };

    return (
        <div className="flex flex-col select-none">
            <button
                type="button"
                onClick={handleToggle}
                className={`
                    tree-row flex items-center gap-2 w-full py-1.5 px-2.5 rounded-[9px]
                    text-[13.5px] font-body text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[rgba(15,22,38,0.05)]
                    transition-all duration-150 text-left cursor-pointer ${indentClass}
                `}
                aria-expanded={isOpen}
            >
                <ChevronIcon size={14} className="text-[var(--muted)] shrink-0" aria-hidden="true" />
                <FolderIcon size={14} className="text-[var(--accent)] shrink-0 opacity-80" aria-hidden="true" />
                <span className="truncate font-medium">{name}</span>
                {childCount > 0 && (
                    <span className="tree-count ml-auto font-mono text-[10.5px] text-[var(--muted)]">
                        {childCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="flex flex-col gap-0.5 mt-0.5">
                    <FileTree
                        tree={children}
                        depth={depth + 1}
                        parentPath={path}
                        expandedPaths={expandedPaths}
                        toggleFolder={toggleFolder}
                    />
                </div>
            )}
        </div>
    );
}

function FileTree({
    tree,
    depth = 0,
    parentPath = "",
    expandedPaths,
    toggleFolder,
}) {
    const { selectedFile, setSelectedFile } = useRepository() || {};
    const indentClass = depth === 1 ? "pl-5" : depth >= 2 ? "pl-9" : "";

    return (
        <ul className="flex flex-col gap-0.5 list-none p-0 m-0">
            {Object.entries(tree).map(([name, node]) => {
                const currentPath = parentPath ? `${parentPath}/${name}` : name;

                return (
                    <li key={name}>
                        {node.type === "folder" ? (
                            <FolderItem
                                name={name}
                                children={node.children}
                                depth={depth}
                                path={currentPath}
                                expandedPaths={expandedPaths}
                                toggleFolder={toggleFolder}
                            />
                        ) : (
                            (() => {
                                const isSelected =
                                    selectedFile?.path === node.data.path || selectedFile?.name === name;

                                return (
                                    <button
                                        type="button"
                                        onClick={() => setSelectedFile && setSelectedFile(node.data)}
                                        className={`
                                            tree-row flex items-center gap-2 w-full py-1.5 px-2.5 rounded-[9px]
                                            text-[13.5px] font-mono text-left transition-all duration-150
                                            select-none truncate cursor-pointer ${indentClass}
                                            ${isSelected
                                                ? "active bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border border-[var(--accent-line)] shadow-[inset_0_0_0_1px_var(--accent-line)]"
                                                : "text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[rgba(15,22,38,0.05)]"
                                            }
                                        `}
                                        aria-current={isSelected ? "location" : undefined}
                                    >
                                        <FileCode size={14} className="shrink-0 opacity-70" />
                                        <span className="truncate" title={name}>
                                            {name}
                                        </span>
                                    </button>
                                );
                            })()
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

export default FileTree;
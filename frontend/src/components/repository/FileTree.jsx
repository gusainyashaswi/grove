import { useState } from "react";
import { useRepository } from "../../context/RepositoryContext";
import {
    ChevronRight,
    ChevronDown,
    Folder,
    FolderOpen,
    File,
    FileCode,
    FileJson,
    FileText,
    FileImage,
} from "lucide-react";

/**
 * Returns a Lucide icon component for a given file extension.
 */
function getFileIcon(extension) {
    switch (extension) {
        case ".jsx":
        case ".tsx":
        case ".vue":
            return FileCode;
        case ".js":
        case ".ts":
        case ".mjs":
        case ".cjs":
            return FileCode;
        case ".json":
            return FileJson;
        case ".md":
        case ".mdx":
            return FileText;
        case ".svg":
        case ".png":
        case ".jpg":
        case ".jpeg":
        case ".gif":
        case ".webp":
            return FileImage;
        default:
            return File;
    }
}

function FolderItem({ name, children }) {
    const [isOpen, setIsOpen] = useState(true);
    const ChevronIcon = isOpen ? ChevronDown : ChevronRight;
    const FolderIcon = isOpen ? FolderOpen : Folder;

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-1)",
                    width: "100%",
                    padding: "3px var(--space-1)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-text-secondary)",
                    fontSize: "var(--text-xs)",
                    fontFamily: "var(--font-mono)",
                    textAlign: "left",
                    borderRadius: "var(--radius-sm)",
                    transition: `color var(--duration-fast)`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text-primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-secondary)"; }}
            >
                <ChevronIcon size={12} style={{ shrink: 0, opacity: 0.6 }} aria-hidden="true" />
                <FolderIcon size={13} style={{ color: "var(--color-warning)", flexShrink: 0 }} aria-hidden="true" />
                <span>{name}</span>
            </button>

            {isOpen && (
                <FileTree tree={children} />
            )}
        </>
    );
}

function FileTree({ tree }) {
    const { selectedFile, setSelectedFile } = useRepository();

    return (
        <ul
            style={{
                listStyle: "none",
                paddingLeft: "var(--space-3)",
                margin: 0,
            }}
        >
            {Object.entries(tree).map(([name, node]) => (
                <li key={name}>
                    {node.type === "folder" ? (
                        <FolderItem name={name} children={node.children} />
                    ) : (
                        (() => {
                            const FileIcon = getFileIcon(node.data.extension);
                            const isSelected = selectedFile?.path === node.data.path;

                            return (
                                <button
                                    onClick={() => setSelectedFile(node.data)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "var(--space-1)",
                                        width: "100%",
                                        padding: "3px var(--space-1)",
                                        background: isSelected
                                            ? "var(--color-accent-subtle)"
                                            : "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: isSelected
                                            ? "var(--color-accent)"
                                            : "var(--color-text-secondary)",
                                        fontSize: "var(--text-xs)",
                                        fontFamily: "var(--font-mono)",
                                        textAlign: "left",
                                        borderRadius: "var(--radius-sm)",
                                        transition: `background-color var(--duration-fast), color var(--duration-fast)`,
                                        fontWeight: isSelected ? "var(--weight-medium)" : "var(--weight-regular)",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = "var(--color-elevated)";
                                            e.currentTarget.style.color = "var(--color-text-primary)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSelected) {
                                            e.currentTarget.style.backgroundColor = "none";
                                            e.currentTarget.style.color = "var(--color-text-secondary)";
                                        }
                                    }}
                                >
                                    <FileIcon
                                        size={13}
                                        style={{ color: "var(--color-text-muted)", flexShrink: 0 }}
                                        aria-hidden="true"
                                    />
                                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {name}
                                    </span>
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
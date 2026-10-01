import { TreeView } from "../arc/tree-view/TreeView";
import { useRepository } from "../../context/RepositoryContext";

function toTreeNodes(tree, parentPath = "") {
    return Object.entries(tree || {}).map(([name, node]) => {
        const id = parentPath ? `${parentPath}/${name}` : name;

        return {
            id,
            label: name,
            ...(node.type === "folder" ? { children: toTreeNodes(node.children, id) } : {}),
        };
    });
}

function FileTree({ tree, expandedPaths, toggleFolder }) {
    const { repository, setSelectedFile } = useRepository() || {};
    const nodes = toTreeNodes(tree);
    const filesByPath = new Map((repository?.files || []).map((file) => [file.path, file]));
    const expandedIds = expandedPaths ? [...expandedPaths] : undefined;

    const handleExpandedChange = (nextIds) => {
        if (!expandedPaths || !toggleFolder) return;

        const nextPaths = new Set(nextIds);
        for (const path of expandedPaths) {
            if (!nextPaths.has(path)) toggleFolder(path);
        }
        for (const path of nextPaths) {
            if (!expandedPaths.has(path)) toggleFolder(path);
        }
    };

    const handleSelect = (node) => {
        const file = filesByPath.get(node.id);
        if (file) setSelectedFile?.(file);
    };

    return (
        <TreeView
            nodes={nodes}
            expandedIds={expandedIds}
            onExpandedChange={handleExpandedChange}
            onSelect={handleSelect}
            aria-label="Repository files"
        />
    );
}

export default FileTree;
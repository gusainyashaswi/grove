import { useState } from "react";
import { useRepository } from "../../context/RepositoryContext";

function FileTree({ tree }) {

    const {selectedFile, setSelectedFile,} = useRepository();
    const [isOpen, setIsOpen] = useState(true);

    function getFileIcon(extension) {
    switch (extension) {
        case ".jsx":
            return "⚛️";

        case ".js":
            return "📜";

        case ".css":
            return "🎨";

        case ".json":
            return "🗂️";

        case ".md":
            return "📝";

        default:
            return "📄";
    }
}

    return (
        <ul className="ml-4">
            {Object.entries(tree).map(([name, node]) => (
                <li key={name}>
                    {node.type === "folder" ? (
                        <>
                            <button
                                className="font-semibold"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? "▼" : "▶"} 📁 {name}
                            </button>

                            {isOpen && (
                                <FileTree tree={node.children} />
                            )}
                        </>
                    ) : (
                        <button
                            className={`block w-full text-left px-2 py-1 rounded ${
                                selectedFile?.path === node.data.path
                                    ? "bg-blue-100 text-blue-700 font-semibold"
                                    : "hover:bg-gray-100"
                            }`}
                            onClick={() => setSelectedFile(node.data)}
                        >
                            {getFileIcon(node.data.extension)} {name}
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default FileTree;
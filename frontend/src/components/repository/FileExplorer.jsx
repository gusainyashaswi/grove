import { useRepository } from "../../context/RepositoryContext";
import { buildFileTree } from "../../utils/buildFileTree";
import FileTree from "./FileTree";
import { useState } from "react";

function FileExplorer() {

    const [search, setSearch] = useState("");

    const {
        repository,
        selectedFile,
    } = useRepository();

    const filteredFiles = repository.files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase()));

    const tree = buildFileTree(filteredFiles);

    return (
        <div>
            <h2>Files</h2>

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search files..."
                className="w-full border rounded p-2 mb-3"
            />

            {filteredFiles.length > 0 ? (
                <FileTree tree={tree} />
            ) : (
                <p className="text-gray-500">No matching files found.</p>
            )}


            {selectedFile && (
        <p>
            Selected: {selectedFile.path}
        </p>
        )}
        
        </div>
    );
}

export default FileExplorer;
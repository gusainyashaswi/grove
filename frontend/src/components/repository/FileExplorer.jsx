import { useRepository } from "../../context/RepositoryContext";
import { buildFileTree } from "../../utils/buildFileTree";
import FileTree from "./FileTree";

function FileExplorer() {
    const {
        repository,
        selectedFile,
    } = useRepository();

    const tree = buildFileTree(repository.files);

    return (
        <div>
            <h2>Files</h2>

            <FileTree tree={tree} />


            {selectedFile && (
        <p>
            Selected: {selectedFile.path}
        </p>
        )}
        
        </div>
    );
}

export default FileExplorer;
import { useRepository } from "../../context/RepositoryContext";

function FileExplorer() {
    const {
        repository,
        selectedFile,
        setSelectedFile,
    } = useRepository();

    return (
        <div>
            <h2>Files</h2>

            {repository.files.map((file) => (
                <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                >
                    {file.path}
                </button>            
            ))}

            {selectedFile && (
        <p>
            Selected: {selectedFile.path}
        </p>
        )}
        
        </div>
    );
}

export default FileExplorer;
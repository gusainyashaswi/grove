import { useRepository } from "../../context/RepositoryContext";

function DetailsPanel() {
    const { selectedFile } = useRepository();

    if (!selectedFile) {
        return (
            <div>
                <h2>File Details</h2>
                <p>Select a file to inspect.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>File Details</h2>

            <p>
                <strong>Path:</strong> {selectedFile.path}
            </p>
        </div>
    );
}

export default DetailsPanel;
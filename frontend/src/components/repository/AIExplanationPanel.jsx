import { useRepository } from "../../context/RepositoryContext";

function AIExplanationPanel() {

    const { selectedFile } = useRepository();

    if (!selectedFile) {
        return (
            <div>
                Select a file.
            </div>
        );
    }

    return (
        <div>

            <h2>AI Explanation</h2>

            <p>{selectedFile.name}</p>

        </div>
    );
}

export default AIExplanationPanel;
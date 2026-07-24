import { useRepository } from "../../context/RepositoryContext";

function CodePreview() {
    const { selectedFile } = useRepository();

    if (!selectedFile) {
        return (
            <div className="border rounded-lg p-4">
                Select a file.
            </div>
        );
    }

    return (
        <div className="border rounded-lg p-4">
            <h2 className="font-bold mb-4">
                Code Preview
            </h2>

            <pre className="overflow-auto text-sm">
                <code>
                    {selectedFile.content}
                </code>
            </pre>
        </div>
    );
}

export default CodePreview;
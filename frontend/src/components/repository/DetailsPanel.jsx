import { useRepository } from "../../context/RepositoryContext";
import { explainFile } from "../../api/api";
import { useState } from "react";


function DetailsPanel() {

    const { repository, selectedFile } = useRepository();

    const [loading, setLoading] = useState(false);
    const [explanation, setExplanation] = useState("");

    if (!selectedFile) {
        return (
            <div>
                <h2>File Details</h2>
                <p>Select a file to inspect.</p>
            </div>
        );
    }

    const handleExplain = async () => {
        console.log("Button clicked");
        try {

            setLoading(true);
            console.log("Repository:", repository);

        console.log("Selected File:", selectedFile);
        console.log("Calling API...");

            const result = await explainFile(repository,selectedFile);

            console.log("API Response:", result);

            setExplanation(result.explanation);

            console.log("Explanation set");

        } catch (error) {

            console.error("Error:", error);

            if (error.response) {

            console.log("Status:", error.response.status);

            console.log("Response:", error.response.data);

        }

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="space-y-3">

    <div>

        <p className="font-semibold">Name</p>

        <p>{selectedFile.name}</p>

    </div>

    <div>

        <p className="font-semibold">Path</p>

        <p>{selectedFile.path}</p>

    </div>

    <div>

        <p className="font-semibold">Folder</p>

        <p>{selectedFile.folder}</p>

    </div>

    <div>

        <p className="font-semibold">Extension</p>

        <p>{selectedFile.extension}</p>

    </div>

    <div>

        <p className="font-semibold">Lines</p>

        <p>{selectedFile.lineCount}</p>

    </div>

    <div>

        <p className="font-semibold">Type</p>

        <p>{selectedFile.type}</p>

    </div>

    <div>

        <p className="font-semibold">Imports</p>

        <p>{selectedFile.imports.length}</p>

    </div>

    <div>
    <p className="font-semibold">Dependencies</p>

    {selectedFile.dependencies.length > 0 ? (
        <ul className="list-disc ml-5 mt-1">
            {selectedFile.dependencies.map((dependency) => (
                <li key={dependency}>
                    {dependency.split("/").pop()}
                </li>
            ))}
        </ul>
    ) : (
        <p>No internal dependencies</p>
    )}
    </div>

    <div>
    <p className="font-semibold">Used By</p>

    {selectedFile.dependents.length > 0 ? (
        <ul className="list-disc ml-5 mt-1">
            {selectedFile.dependents.map((dependent) => (
                <li key={dependent}>
                    {dependent.split("/").pop()}
                </li>
            ))}
        </ul>
    ) : (
        <p>Not used by any internal file</p>
    )}
    </div>

    <button onClick={handleExplain} disabled={loading}>
        {loading ? "Generating..." : "Explain with AI"}
    </button>
    {loading && (
            <p className="text-blue-600">Generating explanation...</p>
        )}

        {explanation && (
            <div className="mt-4">
                <h3 className="font-semibold">AI Explanation</h3>

                <div className="whitespace-pre-wrap mt-2">
                    {explanation}
                </div>
            </div>
        )}

    

    

</div>
    );
}

export default DetailsPanel;
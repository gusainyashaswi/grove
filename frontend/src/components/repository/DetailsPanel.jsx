import { useState, useEffect } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { explainFile } from "../../api/api";

function DetailsPanel() {
    const { repository, selectedFile } = useRepository();

    const [loading, setLoading] = useState(false);
    const [explanation, setExplanation] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setExplanation("");
        setError("");
    }, [selectedFile?.path]);

    if (!selectedFile) {
        return (
            <div className="border rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">File Details</h2>
                <p className="text-sm text-gray-500">Select a file to inspect.</p>
            </div>
        );
    }

    const handleExplain = async () => {
        if (loading) {
            return;
        }

        try {
            setLoading(true);
            setError("");
            const result = await explainFile(repository, selectedFile);
            setExplanation(result.explanation);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to generate explanation. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border rounded-lg p-4 space-y-3">
            <h2 className="text-lg font-semibold mb-2">File Details</h2>

            <div>
                <p className="font-semibold text-sm">Name</p>
                <p className="text-sm">{selectedFile.name}</p>
            </div>

            <div>
                <p className="font-semibold text-sm">Path</p>
                <p className="text-sm text-gray-600 break-all">{selectedFile.path}</p>
            </div>

            <div>
                <p className="font-semibold text-sm">Folder</p>
                <p className="text-sm">{selectedFile.folder}</p>
            </div>

            <div>
                <p className="font-semibold text-sm">Extension</p>
                <p className="text-sm">{selectedFile.extension}</p>
            </div>

            <div>
                <p className="font-semibold text-sm">Lines</p>
                <p className="text-sm">{selectedFile.lineCount}</p>
            </div>

            <div>
                <p className="font-semibold text-sm">Type</p>
                <p className="text-sm">{selectedFile.type}</p>
            </div>

            <div>
                <p className="font-semibold text-sm">Imports</p>
                <p className="text-sm">{selectedFile.imports?.length || 0}</p>
            </div>

            <div>
                <p className="font-semibold text-sm">Dependencies</p>
                {selectedFile.dependencies?.length > 0 ? (
                    <ul className="list-disc ml-5 mt-1 text-sm">
                        {selectedFile.dependencies.map((dependency) => (
                            <li key={dependency}>
                                {dependency.split("/").pop()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">No internal dependencies</p>
                )}
            </div>

            <div>
                <p className="font-semibold text-sm">Used By</p>
                {selectedFile.dependents?.length > 0 ? (
                    <ul className="list-disc ml-5 mt-1 text-sm">
                        {selectedFile.dependents.map((dependent) => (
                            <li key={dependent}>
                                {dependent.split("/").pop()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">Not used by any internal file</p>
                )}
            </div>

            <div className="pt-2 border-t">
                <button
                    onClick={handleExplain}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
                >
                    {loading ? "Generating Explanation..." : "Explain File with AI"}
                </button>

                {loading && (
                    <p className="text-sm text-blue-600 mt-2">Generating explanation...</p>
                )}

                {error && (
                    <p className="text-sm text-red-600 mt-2">{error}</p>
                )}

                {explanation && (
                    <div className="mt-4 border-t pt-3">
                        <h3 className="font-semibold text-sm mb-1">AI Explanation</h3>
                        <div className="text-sm whitespace-pre-wrap mt-2">{explanation}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailsPanel;
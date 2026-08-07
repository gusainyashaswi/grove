import { useState, useEffect } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { summarizeRepository } from "../../api/api";

function RepositorySummary() {
    const { repository } = useRepository();
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setSummary("");
        setError("");
    }, [repository]);

    if (!repository) {
        return null;
    }

    const handleSummarize = async () => {
        if (loading) {
            return;
        }

        try {
            setLoading(true);
            setError("");
            const result = await summarizeRepository(repository);
            setSummary(result.summary);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to generate repository summary.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3">AI Repository Summary</h2>

            <button
                onClick={handleSummarize}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
            >
                {loading ? "Generating Summary..." : "Generate Summary"}
            </button>

            {loading && (
                <p className="text-sm text-blue-600 mt-3">Analyzing repository knowledge...</p>
            )}

            {error && (
                <p className="text-sm text-red-600 mt-3">{error}</p>
            )}

            {summary && (
                <div className="mt-4 border-t pt-3">
                    <div className="text-sm whitespace-pre-wrap">{summary}</div>
                </div>
            )}
        </div>
    );
}

export default RepositorySummary;

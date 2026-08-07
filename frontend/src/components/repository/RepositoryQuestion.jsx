import { useState, useEffect } from "react";
import { useRepository } from "../../context/RepositoryContext";
import { askRepositoryQuestion } from "../../api/api";

function RepositoryQuestion() {
    const { repository } = useRepository();
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setQuestion("");
        setAnswer("");
        setError("");
    }, [repository]);

    if (!repository) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question.trim() || loading) {
            return;
        }

        try {
            setLoading(true);
            setError("");
            setAnswer("");

            const result = await askRepositoryQuestion(repository, question.trim());
            setAnswer(result.answer);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch answer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3">Repository Q&A</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <input
                        type="text"
                        className="w-full border rounded p-2 text-sm"
                        placeholder="Ask a question about this repository..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
                    disabled={loading || !question.trim()}
                >
                    {loading ? "Asking AI..." : "Ask Question"}
                </button>
            </form>

            {loading && (
                <p className="text-sm text-blue-600 mt-3">Analyzing repository knowledge...</p>
            )}

            {error && (
                <p className="text-sm text-red-600 mt-3">{error}</p>
            )}

            {answer && (
                <div className="mt-4 border-t pt-3">
                    <h3 className="font-semibold text-sm mb-1">Answer:</h3>
                    <div className="text-sm whitespace-pre-wrap">{answer}</div>
                </div>
            )}
        </div>
    );
}

export default RepositoryQuestion;

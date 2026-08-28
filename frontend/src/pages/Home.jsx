import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepository } from "../context/RepositoryContext";
import { analyzeRepository } from "../services/repository.service";

export default function Home() {
    const { setRepository } = useRepository();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [url, setUrl] = useState("");

    async function handleAnalyze() {
        if (!url || loading) return;
        setLoading(true);
        setError("");

        try {
            const repositoryData = await analyzeRepository(url);
            let parsedOwner = repositoryData.owner;
            let parsedName = repositoryData.name;
            try {
                const parts = new URL(url).pathname.split("/").filter(Boolean);
                if (parts[0]) parsedOwner = parsedOwner || parts[0];
                if (parts[1]) parsedName = parsedName || parts[1].replace(/\.git$/, "");
            } catch {
                // fallback
            }

            setRepository({
                ...repositoryData,
                url,
                owner: parsedOwner,
                name: parsedName,
            });
            navigate("/repository");
        } catch (err) {
            console.error("Repository analysis error:", err);
            if (err.code === "ERR_NETWORK" || !err.response) {
                setError(
                    "Cannot connect to backend server. Please ensure the backend is running on http://localhost:3000."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    "Failed to analyze repository. Please check the GitHub URL and try again."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-50 text-gray-900">
            {/* Simple Navbar */}
            <nav className="w-full p-4 border-b bg-white flex items-center">
                <h1 className="text-xl font-bold">Grove</h1>
            </nav>

            {/* Main Content: Input and Button */}
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="flex gap-2 w-full max-w-xl">
                    <input
                        type="text"
                        placeholder="Enter repository link (e.g., https://github.com/owner/repo)"
                        className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                    />
                    <button
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        onClick={handleAnalyze}
                        disabled={loading || !url}
                    >
                        {loading ? "Loading..." : "Analyze"}
                    </button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </main>
        </div>
    );
}
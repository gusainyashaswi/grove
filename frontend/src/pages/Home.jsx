import Hero from "../features/landing/Hero";
import { analyzeRepository } from "../services/repository.service";
import { useNavigate } from "react-router-dom";
import { useRepository } from "../context/RepositoryContext";
import { useState } from "react";

function Home() {
    const { setRepository } = useRepository();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleAnalyze(url) {
        if (loading) return;
        setLoading(true);
        setError("");

        try {
            const repositoryData = await analyzeRepository(url);
            // Parse owner and repo name from URL if missing from backend response root
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
            console.error(err);
            setError(
                err.response?.data?.message ||
                "Failed to analyze repository. Please check the URL and try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return <Hero onAnalyze={handleAnalyze} loading={loading} error={error} />;
}

export default Home;
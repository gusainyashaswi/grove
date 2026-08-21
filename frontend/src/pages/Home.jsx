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
        setLoading(true);
        setError("");

        try {
            const repositoryData = await analyzeRepository(url);
            setRepository(repositoryData);
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
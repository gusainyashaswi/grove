import Navbar from "../components/layout/Navbar";
import Hero from "../components/Hero";
import { useState } from "react";
import { analyzeRepository } from "../services/repository.service";
import { useNavigate } from "react-router-dom";



function Home() {

    const navigate = useNavigate();

    const [repositoryUrl, setRepositoryUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleAnalyze() {

        if (!repositoryUrl.trim()) {
            setError("Please enter a GitHub repository URL.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const repositoryData = await analyzeRepository(repositoryUrl);

            console.log(repositoryData);

            navigate("/repository");
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to analyze repository."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <Hero repositoryUrl={repositoryUrl} setRepositoryUrl={setRepositoryUrl} loading={loading} error={error}
            onAnalyze={handleAnalyze}/>
        </>
    );
}

export default Home;
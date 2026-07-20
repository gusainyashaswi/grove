import Navbar from "../components/layout/Navbar";
import Hero from "../components/Hero";
import { useState } from "react";



function Home() {

    const [repositoryUrl, setRepositoryUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleAnalyze() {

}

    return (
        <>
            <Navbar />
            <Hero repositoryUrl={repositoryUrl} setRepositoryUrl={setRepositoryUrl} loading={loading} error={error}/>
        </>
    );
}

export default Home;
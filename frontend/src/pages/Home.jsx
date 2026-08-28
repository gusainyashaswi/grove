import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRepository } from "../context/RepositoryContext";
import { analyzeRepository } from "../services/repository.service";
import Hero from "../components/Hero";
import ProcessSection from "../components/ProcessSection";
import FeatureSection from "../components/FeatureSection";

export default function Home() {
    const { setRepository } = useRepository();
    const navigate           = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error,   setError  ] = useState("");

    // Reveal scroll trigger matching reference script
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
            return;
        }

        if ("IntersectionObserver" in window) {
            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting) {
                            e.target.classList.add("in-view");
                            io.unobserve(e.target);
                        }
                    });
                },
                { threshold: 0.15 }
            );
            document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
            return () => io.disconnect();
        } else {
            document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
        }
    }, []);

    async function handleAnalyze(url) {
        if (!url || loading) return;
        setLoading(true);
        setError("");

        try {
            const repositoryData = await analyzeRepository(url);
            let parsedOwner = repositoryData.owner;
            let parsedName  = repositoryData.name;

            try {
                const parts = new URL(url).pathname.split("/").filter(Boolean);
                if (parts[0]) parsedOwner = parsedOwner || parts[0];
                if (parts[1]) parsedName  = parsedName  || parts[1].replace(/\.git$/, "");
            } catch {
                // fallback — url may not be a valid URL (e.g. owner/repo shorthand)
            }

            setRepository({ ...repositoryData, url, owner: parsedOwner, name: parsedName });
            navigate("/repository");
        } catch (err) {
            console.error("Repository analysis error:", err);
            if (err.code === "ERR_NETWORK" || !err.response) {
                setError(
                    "Cannot connect to backend. Please ensure the server is running on http://localhost:3000."
                );
            } else {
                setError(
                    err.response?.data?.message ||
                    "Failed to analyze repository. Please check the URL and try again."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100dvh",
                background: "var(--bg)",
                color: "var(--ink)",
            }}
        >
            <Hero onAnalyze={handleAnalyze} loading={loading} error={error} />

            {/* Divider */}
            <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
                <div style={{ height: "1px", background: "var(--line)" }} />
            </div>

            <ProcessSection />

            <FeatureSection />
        </div>
    );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepository } from "../context/RepositoryContext";
import { analyzeRepository } from "../services/repository.service";
import { useReveal } from "../hooks/useReveal";

import Hero          from "../components/Hero";
import ProcessSection from "../components/ProcessSection";
import FeatureSection from "../components/FeatureSection";
import QuoteBand      from "../components/QuoteBand";
import FeaturesGrid   from "../components/FeaturesGrid";
import CtaSection     from "../components/CtaSection";
import Footer         from "../components/Footer";

export default function Home() {
    const { setRepository } = useRepository();
    const navigate           = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error,   setError  ] = useState("");

    /*
     * Fire the reveal scan once on mount.
     * All .reveal elements rendered synchronously (every section below)
     * will be picked up by this single observer.
     */
    useReveal();

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
                overflowX: "hidden",
            }}
        >
            {/* ── Hero ── */}
            <Hero onAnalyze={handleAnalyze} loading={loading} error={error} />

            {/* ── Section divider ── */}
            <Divider />

            {/* ── How it works ── */}
            <ProcessSection />

            {/* ── Feature: two-column with Terminal ── */}
            <FeatureSection />

            {/* ── Quote band ── */}
            <QuoteBand />

            {/* ── Features grid ── */}
            <FeaturesGrid />

            {/* ── Divider before CTA ── */}
            <Divider />

            {/* ── CTA ── */}
            <CtaSection onAnalyze={handleAnalyze} />

            {/* ── Footer ── */}
            <Footer />
        </div>
    );
}

/** Full-width 1px horizontal rule using --line color */
function Divider() {
    return (
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 48px" }}>
            <div style={{ height: "1px", background: "var(--line)" }} />
        </div>
    );
}
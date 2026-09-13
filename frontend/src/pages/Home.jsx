import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepository } from "../context/RepositoryContext";
import { analyzeRepository } from "../services/repository.service";
import { useReveal } from "../hooks/useReveal";

import LiquidEther    from "../components/LiquidEther";
import Hero           from "../components/Hero";
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

    function normalizeRepoUrl(raw) {
        if (!raw) return "";
        let trimmed = raw.trim();
        if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
            if (trimmed.startsWith("github.com/")) {
                trimmed = "https://" + trimmed;
            } else if (/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(trimmed)) {
                trimmed = "https://github.com/" + trimmed;
            }
        }
        return trimmed;
    }

    async function handleAnalyze(rawUrl) {
        const url = normalizeRepoUrl(rawUrl);
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
                const apiUrl = import.meta.env.VITE_API_URL;
                setError(
                    apiUrl
                        ? `Cannot reach the backend at ${apiUrl}. Please ensure the server is running.`
                        : "Backend API URL is not configured. Set the VITE_API_URL environment variable and rebuild."
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
                position: "relative",
                width: "100%",
                minHeight: "100dvh",
                background: "var(--bg)",
                color: "var(--ink)",
                overflowX: "hidden",
            }}
        >
            {/* ── Fixed Full-Page LiquidEther Fluid Background ── */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                    overflow: "hidden",
                }}
            >
                <LiquidEther
                    colors={["#0d1b2a", "#2b5270", "#548db5", "#a4d2ee"]}
                    backgroundColor="#eef6fc"
                    lightMode={true}
                    mouseForce={20}
                    cursorSize={110}
                    isViscous={true}
                    viscous={25}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    autoDemo={true}
                    autoSpeed={0.4}
                    autoIntensity={2.0}
                    takeoverDuration={0.3}
                    autoResumeDelay={1200}
                    autoRampDuration={0.8}
                />
            </div>

            {/* ── Page Content Layer ── */}
            <div style={{ position: "relative", zIndex: 1 }}>
                {/* Hero */}
                <Hero onAnalyze={handleAnalyze} loading={loading} error={error} />

                {/* Section divider */}
                <Divider />

                {/* How it works */}
                <ProcessSection />

                {/* Feature: two-column with Terminal */}
                <FeatureSection />

                {/* Quote band */}
                <QuoteBand />

                {/* Features grid */}
                <FeaturesGrid />

                {/* Divider before CTA */}
                <Divider />

                {/* CTA */}
                <CtaSection onAnalyze={handleAnalyze} />

                {/* Footer */}
                <Footer />
            </div>
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
import { useEffect, useState } from "react";
import LiquidEther from "../components/LiquidEther";
import RepositoryHeader from "../components/repository/RepositoryHeader";
import StatsBar from "../components/repository/StatsBar";
import HealthSignals from "../components/repository/HealthSignals";
import FolderDistribution from "../components/repository/FolderDistribution";
import AiArchitectureCard from "../components/repository/AiArchitectureCard";
import FileExplorer from "../components/repository/FileExplorer";
import CodePreview from "../components/repository/CodePreview";
import DetailsPanel from "../components/repository/DetailsPanel";
import DependencyGraph from "../components/repository/DependencyGraph";
import AiInsights from "../components/repository/AiInsights";
import Assistant from "../components/repository/Assistant";
import MainContent from "../components/repository/MainContent";
import RepositoryFooter from "../components/repository/RepositoryFooter";
import { useRepository } from "../context/RepositoryContext";
import { Navigate } from "react-router-dom";


/* ─── ExplorerLayout — mobile tab switcher + desktop 3-col grid ───────── */

const EXPLORER_TABS = [
    { id: "files", label: "Files" },
    { id: "code",  label: "Code"  },
    { id: "details", label: "Details" },
];

function ExplorerLayout() {
    const [mobilePanel, setMobilePanel] = useState("code");

    return (
        <div className="w-full">
            {/* ── Segmented switcher — only visible below xl ── */}
            <div className="explorer-mobile-tabs">
                {EXPLORER_TABS.map((t) => (
                    <button
                        key={t.id}
                        className={`explorer-mobile-tab${mobilePanel === t.id ? " active" : ""}`}
                        onClick={() => setMobilePanel(t.id)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* ── Desktop: 3-column grid. Mobile: one panel at a time ── */}
            <div className="explorer-grid">
                <div className={`explorer-panel${mobilePanel === "files" ? " mobile-visible" : ""}`}>
                    <FileExplorer />
                </div>
                <div className={`explorer-panel${mobilePanel === "code" ? " mobile-visible" : ""}`}>
                    <CodePreview />
                </div>
                <div className={`explorer-panel${mobilePanel === "details" ? " mobile-visible" : ""}`}>
                    <DetailsPanel />
                </div>
            </div>
        </div>
    );
}

function Repository() {
    const { repository, selectedFile, setSelectedFile, activeTab } = useRepository();

    // Auto-select the first or entry-point file if none is selected yet
    useEffect(() => {
        if (repository && !selectedFile && repository.files?.length > 0) {
            const entryFile =
                repository.files.find((f) => f.path === repository.entryPoint?.path) ||
                repository.files[0];
            setSelectedFile(entryFile);
        }
    }, [repository, selectedFile, setSelectedFile]);

    if (!repository) {
        return <Navigate to="/" replace />;
    }

    const currentTab = activeTab || "overview";

    return (
        <div className="min-h-screen w-full text-[var(--ink)] pt-[98px] sm:pt-[106px] pb-0 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative">
            {/* ── Fixed Full-Page LiquidEther Fluid Background (Calm / Lesser Intensity) ── */}
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
                    mouseForce={12}
                    cursorSize={50}
                    isViscous={true}
                    viscous={32}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    autoDemo={true}
                    autoSpeed={0.2}
                    autoIntensity={10}
                    takeoverDuration={0.4}
                    autoResumeDelay={1500}
                    autoRampDuration={1.0}
                />
            </div>

            <div className="w-full max-w-[1240px] flex flex-col gap-9 sm:gap-10 relative z-10">
                <RepositoryHeader />
                <StatsBar />
                {currentTab === "overview" && (
                    <>
                        <HealthSignals />
                        <FolderDistribution />
                        <AiArchitectureCard />
                    </>
                )}
                {currentTab === "explorer" && (
                    <ExplorerLayout />
                )}

                {currentTab === "graph" && (
                    <div className="flex flex-col gap-8 w-full">
                        <DependencyGraph />
                        <FolderDistribution />
                    </div>
                )}
                {currentTab === "ai" && <AiInsights />}
                {currentTab === "assistant" && <Assistant />}
                {currentTab !== "overview" &&
                    currentTab !== "explorer" &&
                    currentTab !== "graph" &&
                    currentTab !== "ai" &&
                    currentTab !== "assistant" && <MainContent />}
            </div>

            {/* ── Full-bleed footer — escapes the max-w and side-padding ── */}
            <div
                style={{
                    width: "100vw",
                    marginLeft: "calc(-1 * var(--page-px, 16px))",
                    position: "relative",
                    zIndex: 10,
                }}
                className="[--page-px:1rem] sm:[--page-px:1.5rem] lg:[--page-px:2rem]"
            >
                <RepositoryFooter />
            </div>
        </div>
    );
}

export default Repository;
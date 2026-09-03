import { useEffect } from "react";
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
import { useRepository } from "../context/RepositoryContext";
import { Navigate } from "react-router-dom";


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
        <div className="min-h-screen w-full text-[var(--ink)] pt-28 pb-16 px-4 sm:px-8 lg:px-12 flex flex-col items-center relative z-10">
            <div className="w-full max-w-[var(--max-w)] flex flex-col gap-12">
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
                    <div className="explorer-grid grid grid-cols-1 xl:grid-cols-[260px_1fr_280px] gap-6 items-start w-full">
                        <FileExplorer />
                        <CodePreview />
                        <DetailsPanel />
                    </div>
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
        </div>
    );
}

export default Repository;
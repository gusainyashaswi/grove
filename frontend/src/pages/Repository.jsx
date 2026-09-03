import { useEffect } from "react";
import RepositoryHeader from "../components/repository/RepositoryHeader";
import StatsBar from "../components/repository/StatsBar";
import HealthSignals from "../components/repository/HealthSignals";
import FolderDistribution from "../components/repository/FolderDistribution";
import AiArchitectureCard from "../components/repository/AiArchitectureCard";
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
            <div className="w-full max-w-[var(--max-w)] flex flex-col gap-8">
                <RepositoryHeader />
                <StatsBar />
                {currentTab === "overview" && (
                    <>
                        <HealthSignals />
                        <FolderDistribution />
                        <AiArchitectureCard />
                    </>
                )}
                <MainContent />
            </div>
        </div>
    );
}

export default Repository;
import { useEffect } from "react";
import RepositoryHeader from "../components/repository/RepositoryHeader";
import StatsBar from "../components/repository/StatsBar";
import MainContent from "../components/repository/MainContent";
import { useRepository } from "../context/RepositoryContext";
import { Navigate } from "react-router-dom";

function Repository() {
    const { repository, selectedFile, setSelectedFile } = useRepository();

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

    return (
        <div className="min-h-screen w-full bg-[#0c0c0b] text-[#f7f5ee] pt-28 pb-16 px-4 sm:px-8 lg:px-12 flex flex-col items-center">
            <div className="w-full max-w-[1440px] flex flex-col gap-8">
                <RepositoryHeader />
                <StatsBar />
                <MainContent />
            </div>
        </div>
    );
}

export default Repository;
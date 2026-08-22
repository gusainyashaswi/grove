import RepositoryHeader from "../components/repository/RepositoryHeader";
import StatsBar from "../components/repository/StatsBar";
import MainContent from "../components/repository/MainContent";
import { useRepository } from "../context/RepositoryContext";
import { Navigate } from "react-router-dom";

function Repository() {
    const { repository } = useRepository();

    if (!repository) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-[calc(100vh-64px)] w-full py-10 px-6 sm:px-8 lg:px-12 flex flex-col items-center">
            <div
                className="w-full flex flex-col gap-8"
                style={{ maxWidth: "var(--container-max-w)" }}
            >
                <RepositoryHeader />
                <StatsBar />
                <MainContent />
            </div>
        </div>
    );
}

export default Repository;
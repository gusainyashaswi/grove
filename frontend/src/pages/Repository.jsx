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
        <div className="min-h-screen bg-gray-50">
            <div
                className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6"
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
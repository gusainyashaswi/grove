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
        <div>
            <RepositoryHeader />
            <StatsBar />
            <MainContent />
        </div>
    );
}

export default Repository;
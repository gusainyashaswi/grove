import RepositoryHeader from "../components/repository/RepositoryHeader";
import StatsBar from "../components/repository/StatsBar";
import MainContent from "../components/repository/MainContent";

function Repository() {
    return (
        <div>
            <RepositoryHeader />
            <StatsBar />
            <MainContent />
        </div>
    );
}

export default Repository;
import FileExplorer from "./FileExplorer";
import DetailsPanel from "./DetailsPanel";
import DependencyGraph from "./DependencyGraph";

function MainContent() {
    return (
        <div>
            <FileExplorer />
            <DependencyGraph />
            <DetailsPanel />
        </div>
    );
}

export default MainContent;
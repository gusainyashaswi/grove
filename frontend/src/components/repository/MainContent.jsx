import FileExplorer from "./FileExplorer";
import DetailsPanel from "./DetailsPanel";
import DependencyGraph from "./DependencyGraph";

function MainContent() {
    return (
        <div className="flex gap-4">

            <div className="w-1/4">
                <FileExplorer />
            </div>

            <div className="flex-1">
                <DependencyGraph />
            </div>

            <div className="w-1/4">
                <DetailsPanel />
            </div>

        </div>
    );
}

export default MainContent;
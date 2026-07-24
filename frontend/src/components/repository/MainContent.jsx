import FileExplorer from "./FileExplorer";
import DetailsPanel from "./DetailsPanel";
import DependencyGraph from "./DependencyGraph";
import AIExplanationPanel from "./AIExplanationPanel";
import CodePreview from "./CodePreview";
import RepositoryStructure from "./RepositoryStructure";

function MainContent() {
    return (
        <div className="flex gap-4">

    <div className="w-64">
        <FileExplorer />
    </div>

    <div className="flex-1 flex flex-col gap-4">
    <RepositoryStructure />

    <div className="flex-1">
        <DependencyGraph />
    </div>
</div>

    <div className="w-80 flex flex-col gap-4">
        <DetailsPanel />
        <CodePreview />
    </div>

</div>
    );
}

export default MainContent;
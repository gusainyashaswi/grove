import { useRepository } from "../../context/RepositoryContext";
import StatCard from "./StatCard";

function StatsBar() {
    const { repository } = useRepository();

    const fileCount = repository.files.length;
    const nodeCount = repository.dependencyGraph.nodes.length;
    const edgeCount = repository.dependencyGraph.edges.length;

    return (
        <div>
            <StatCard title="Files" value={fileCount} />
            <StatCard title="Nodes" value={nodeCount} />
            <StatCard title="Edges" value={edgeCount} />
        </div>
    );
}

export default StatsBar;
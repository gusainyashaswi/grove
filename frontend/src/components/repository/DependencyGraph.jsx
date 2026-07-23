import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useRepository } from "../../context/RepositoryContext";

function DependencyGraph() {
    const { repository } = useRepository();

    const nodes = repository.dependencyGraph.nodes.map((node, index) => ({
    id: node.id,

    position: {
        x: 100,
        y: index * 150,
    },

    data: {
        label: node.label,
    },

    type: "default",
}));

const edges = repository.dependencyGraph.edges;

    return(
        <div className="border rounded-lg overflow-hidden" style={{ height: "75vh" }}>
            <ReactFlow nodes={nodes} edges={edges} fitView/>
        </div>
    )
}

export default DependencyGraph;
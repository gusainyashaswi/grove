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
        <div style={{ width: "100%", height: "600px" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
            />
        </div>
    )
}

export default DependencyGraph;
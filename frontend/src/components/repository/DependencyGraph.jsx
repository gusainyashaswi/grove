import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useRepository } from "../../context/RepositoryContext";

function DependencyGraph() {
    const { repository, selectedFile, setSelectedFile } = useRepository();

    const nodes = repository.dependencyGraph.nodes.map((node, index) => {
    const isSelected = selectedFile && selectedFile.path === node.id;

    return {
        id: node.id,

        position: {
            x: 100,
            y: index * 150,
        },

        data: {
            label: node.label,
        },

        type: "default",

        style: {
            border: isSelected
                ? "3px solid #2563eb"
                : "1px solid #555",

            background: isSelected
                ? "#dbeafe"
                : "white",
        },
    };
});


const edges = repository.dependencyGraph.edges;

function handleNodeClick(event, node) {
    const file = repository.files.find(
        (file) => file.path === node.id
    );

    if (file) {
        setSelectedFile(file);
    }
}

    return(
        <div className="border rounded-lg overflow-hidden" style={{ height: "75vh" }}>
            <ReactFlow nodes={nodes} edges={edges} fitView onNodeClick={handleNodeClick}/>
        </div>
    )
}

export default DependencyGraph;
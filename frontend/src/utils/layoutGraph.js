import dagre from "@dagrejs/dagre";

const graph = new dagre.graphlib.Graph();

graph.setDefaultEdgeLabel(() => ({}));

export function layoutGraph(nodes, edges) {
    graph.setGraph({
        rankdir: "LR",
    });

    nodes.forEach((node) => {
        graph.setNode(node.id, {
            width: 180,
            height: 50,
        });
    });

    edges.forEach((edge) => {
        graph.setEdge(edge.source, edge.target);
    });

    dagre.layout(graph);

    return nodes.map((node) => {
        const position = graph.node(node.id);

        return {
            ...node,

            position: {
                x: position.x,
                y: position.y,
            },
        };
    });
}
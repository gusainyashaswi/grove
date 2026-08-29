import dagre from "@dagrejs/dagre";

export function layoutGraph(nodes, edges) {
    const graph = new dagre.graphlib.Graph();

    graph.setDefaultEdgeLabel(() => ({}));

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

    return (nodes || []).map((node, index) => {
        const position = graph.node(node.id);

        return {
            ...node,
            position: {
                x: position ? position.x - 90 : (index % 4) * 220 + 50,
                y: position ? position.y - 25 : Math.floor(index / 4) * 120 + 50,
            },
        };
    });
}
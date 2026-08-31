import dagre from "@dagrejs/dagre";

export function layoutGraph(nodes, edges) {
    if (!nodes || nodes.length === 0) return [];
    const graph = new dagre.graphlib.Graph();

    graph.setDefaultEdgeLabel(() => ({}));

    graph.setGraph({
        rankdir: "LR",
    });

    nodes.forEach((node) => {
        if (node && node.id) {
            graph.setNode(node.id, {
                width: 180,
                height: 50,
            });
        }
    });

    (edges || []).forEach((edge) => {
        if (edge && edge.source && edge.target) {
            if (!graph.hasNode(edge.source)) {
                graph.setNode(edge.source, { width: 180, height: 50 });
            }
            if (!graph.hasNode(edge.target)) {
                graph.setNode(edge.target, { width: 180, height: 50 });
            }
            graph.setEdge(edge.source, edge.target);
        }
    });

    try {
        dagre.layout(graph);
    } catch (e) {
        console.warn("Dagre graph layout error:", e);
    }

    return (nodes || []).map((node, index) => {
        const position = graph.hasNode(node.id) ? graph.node(node.id) : null;

        return {
            ...node,
            position: {
                x: position ? position.x - 90 : (index % 4) * 220 + 50,
                y: position ? position.y - 25 : Math.floor(index / 4) * 120 + 50,
            },
        };
    });
}
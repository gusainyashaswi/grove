function buildDependencyGraph(analyzedFiles) {
    const graph = {
        nodes: [],
        edges: []
    };

    for (const file of analyzedFiles) {
        graph.nodes.push({
            id: file.path,
            label: file.path.split("/").pop(),
            type: "file",
        });

        const edgeSet = new Set();
        for (const dependency of file.dependencies) {
            const edgeId = `${file.path}-${dependency}`;
            if (!edgeSet.has(edgeId)) {
                edgeSet.add(edgeId);
                graph.edges.push({
                    id: edgeId,
                    source: file.path,
                    target: dependency,
                });
            }
        }
    }

    return graph;
}

module.exports = {
    buildDependencyGraph
};
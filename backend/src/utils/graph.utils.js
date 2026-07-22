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

        for (const dependency of file.dependencies) {
            graph.edges.push({
                id: `${file.path}-${dependency}`,
                source: file.path,
                target: dependency,
            });
        }
    }

    return graph;
}

module.exports = {
    buildDependencyGraph
};
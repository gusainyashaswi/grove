function buildDependencyGraph(analyzedFiles) {
    const graph = {
        nodes: [],
        edges: []
    };

    for (const file of analyzedFiles) {
        graph.nodes.push(file.path);

        for (const dependency of file.dependencies) {
            graph.edges.push({
                from: file.path,
                to: dependency
            });
        }
    }

    return graph;
}

module.exports = {
    buildDependencyGraph
};
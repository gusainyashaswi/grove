function buildRepositoryKnowledge(repositoryAnalysis) {
    if (!repositoryAnalysis) {
        return {
            framework: "Unknown",
            entryPoint: null,
            folders: {},
            files: [],
            importantFiles: [],
            dependencyGraph: { nodes: [], edges: [] },
            statistics: {},
            health: {}
        };
    }

    const rawFiles = Array.isArray(repositoryAnalysis.files) ? repositoryAnalysis.files : [];

    const files = rawFiles.map(file => ({
        path: file.path,
        name: file.name || (file.path ? file.path.split("/").pop() : ""),
        type: file.type || "unknown",
        lineCount: typeof file.lineCount === "number" ? file.lineCount : 0,
        dependencies: Array.isArray(file.dependencies) ? file.dependencies : [],
        dependents: Array.isArray(file.dependents) ? file.dependents : []
    }));

    const importantFilesSet = new Set();
    const importantFiles = [];

    if (repositoryAnalysis.entryPoint && repositoryAnalysis.entryPoint.path) {
        importantFilesSet.add(repositoryAnalysis.entryPoint.path);
        const entryFileObj = files.find(f => f.path === repositoryAnalysis.entryPoint.path);
        importantFiles.push({
            path: repositoryAnalysis.entryPoint.path,
            name: repositoryAnalysis.entryPoint.name || repositoryAnalysis.entryPoint.path.split("/").pop(),
            type: entryFileObj ? entryFileObj.type : "entry",
            reason: "entryPoint"
        });
    }

    const sortedByDependents = [...files]
        .filter(f => f.dependents.length > 0)
        .sort((a, b) => b.dependents.length - a.dependents.length);

    for (const file of sortedByDependents) {
        if (!importantFilesSet.has(file.path)) {
            importantFilesSet.add(file.path);
            importantFiles.push({
                path: file.path,
                name: file.name,
                type: file.type,
                reason: "mostImported",
                dependentsCount: file.dependents.length
            });
        }
        if (importantFiles.length >= 6) {
            break;
        }
    }

    const rawGraph = repositoryAnalysis.dependencyGraph;
    const dependencyGraph = {
        nodes: Array.isArray(rawGraph?.nodes) ? rawGraph.nodes : [],
        edges: Array.isArray(rawGraph?.edges) ? rawGraph.edges : []
    };

    return {
        framework: repositoryAnalysis.structure?.framework || "Unknown",
        entryPoint: repositoryAnalysis.entryPoint || null,
        folders: repositoryAnalysis.structure?.folders || {},
        files,
        importantFiles,
        dependencyGraph,
        statistics: repositoryAnalysis.statistics || {},
        health: repositoryAnalysis.health || {}
    };
}

module.exports = {
    buildRepositoryKnowledge
};

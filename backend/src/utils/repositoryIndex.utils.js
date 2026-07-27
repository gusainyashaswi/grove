function buildRepositoryIndex(analyzedFiles, dependencyGraph, structure, health, entryPoint, statistics) {
    const fileMap = {};

    for (const file of analyzedFiles) {
        fileMap[file.path] = file;
    }

    return {
        files: analyzedFiles,
        fileMap,
        dependencyGraph: dependencyGraph || {
            nodes: [],
            edges: []
        },
        structure: structure || {},
        health,
        entryPoint: {
            name: "main.jsx",
            path: "src/main.jsx"

        },
        statistics,
    };
}

module.exports = {
    buildRepositoryIndex
};
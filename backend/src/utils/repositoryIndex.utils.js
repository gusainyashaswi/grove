function buildRepositoryIndex(analyzedFiles, dependencyGraph, structure, health) {
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
    };
}

module.exports = {
    buildRepositoryIndex
};
function buildRepositoryIndex(analyzedFiles, dependencyGraph, structure) {
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
        structure: structure || {}
    };
}

module.exports = {
    buildRepositoryIndex
};
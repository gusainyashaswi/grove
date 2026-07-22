function buildRepositoryIndex(analyzedFiles, dependencyGraph) {
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
        }
    };
}

module.exports = {
    buildRepositoryIndex
};
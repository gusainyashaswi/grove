function buildRepositoryIndex(analyzedFiles) {

    const fileMap = {}

    for (const file of analyzedFiles) {
        fileMap[file.path] = file;
    }

    return {
        files: analyzedFiles,
        fileMap,
        dependencyGraph: {
            nodes: [],
            edges: []
          }
    };
}

module.exports = {
    buildRepositoryIndex
};
const { buildRepositoryKnowledge } = require("./repositoryKnowledge.utils");

function buildRepositoryIndex(analyzedFiles, dependencyGraph, structure, health, entryPoint, statistics) {
    const fileMap = {};

    for (const file of analyzedFiles) {
        fileMap[file.path] = file;
    }

    const repositoryIndex = {
        files: analyzedFiles,
        fileMap,
        dependencyGraph: dependencyGraph || {
            nodes: [],
            edges: []
        },
        structure: structure || {},
        health,
        entryPoint: entryPoint || {
            name: "main.jsx",
            path: "src/main.jsx"
        },
        statistics,
    };

    repositoryIndex.knowledge = buildRepositoryKnowledge(repositoryIndex);

    return repositoryIndex;
}

module.exports = {
    buildRepositoryIndex
};
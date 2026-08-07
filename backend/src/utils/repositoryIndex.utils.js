const { buildRepositoryKnowledge } = require("./repositoryKnowledge.utils");

function buildRepositoryIndex(analyzedFiles, dependencyGraph, structure, health, entryPoint, statistics) {
    const fileMap = {};

    const safeFiles = Array.isArray(analyzedFiles) ? analyzedFiles : [];

    for (const file of safeFiles) {
        if (file && file.path) {
            fileMap[file.path] = file;
        }
    }

    const repositoryIndex = {
        files: safeFiles,
        fileMap,
        dependencyGraph: dependencyGraph || {
            nodes: [],
            edges: []
        },
        structure: structure || {
            framework: "Unknown",
            folders: {}
        },
        health: health || {
            totalFiles: safeFiles.length,
            largeFiles: [],
            mostImportedFiles: [],
            unusedFiles: [],
            orphanFiles: []
        },
        entryPoint: entryPoint !== undefined ? entryPoint : null,
        statistics: statistics || {
            totalFiles: safeFiles.length,
            totalFolders: 0,
            totalLines: 0,
            averageLinesPerFile: 0,
            largestFile: null,
            averageDependencies: 0,
            maximumDependencies: 0
        },
    };

    repositoryIndex.knowledge = buildRepositoryKnowledge(repositoryIndex);

    return repositoryIndex;
}

module.exports = {
    buildRepositoryIndex
};
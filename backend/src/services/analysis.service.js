const { extractRepositoryInfo, verifyRepositoryExists } = require("../utils/github.utils");
const { cloneRepository } = require("../utils/git.utils");
const { getRepositoryFiles, readRepositoryFiles } = require("../utils/file.utils");
const { analyzeRepository } = require("../utils/repositoryAnalyzer.utils");
const { buildDependencyGraph } = require("../utils/graph.utils");
const { buildRepositoryIndex } = require("../utils/repositoryIndex.utils");
const { analyzeRepositoryStructure } = require("../utils/repositoryStructure.utils");
const { analyzeRepositoryHealth } = require("../utils/repositoryHealth.utils")
const { detectEntryPoint } = require("../utils/entryPoint.utils");
const { analyzeRepositoryStatistics } = require("../utils/repositoryStatistics.utils")

async function analyzeRepositoryService(url) {
    const repositoryInfo = extractRepositoryInfo(url);

    const data = await verifyRepositoryExists(repositoryInfo.owner, repositoryInfo.repository);

    const repository = {
        name: data.name || repositoryInfo.repository,
        owner: data.owner?.login || repositoryInfo.owner,
        description: data.description || "",
        defaultBranch: data.default_branch || "main",
        language: data.language || "",
        cloneUrl: data.clone_url || `https://github.com/${repositoryInfo.owner}/${repositoryInfo.repository}.git`
    };

    const repositoryPath = await cloneRepository(repository.owner, repository.name);

    const files = getRepositoryFiles(repositoryPath);

    const repositoryFiles = readRepositoryFiles(files, repositoryPath);

    const analyzedFiles = analyzeRepository(repositoryFiles, repositoryPath);

    const graph = buildDependencyGraph(analyzedFiles);

    const structure = analyzeRepositoryStructure(analyzedFiles);

    const health = analyzeRepositoryHealth(analyzedFiles);

    const entryPoint = detectEntryPoint(analyzedFiles);

    const statistics = analyzeRepositoryStatistics(analyzedFiles);

    const repositoryIndex = buildRepositoryIndex(analyzedFiles, graph, structure, health, entryPoint, statistics);

    return {
        ...repositoryIndex,
        name: repository.name,
        owner: repository.owner,
        description: repository.description,
        defaultBranch: repository.defaultBranch,
        language: repository.language
    };
}

module.exports = {
    analyzeRepositoryService
};
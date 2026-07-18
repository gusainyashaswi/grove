const { extractRepositoryInfo } = require("../utils/github.utils");
const {cloneRepository} = require("../utils/git.utils")
const {getRepositoryFiles,readRepositoryFiles} = require("../utils/file.utils");
const {analyzeRepository} = require("../utils/repositoryAnalyzer.utils");
const {buildDependencyGraph} = require("../utils/graph.utils");

async function analyzeRepositoryService(url) {
    const repositoryInfo = extractRepositoryInfo(url);
    const response = await verifyRepositoryExists(repositoryInfo.owner,repositoryInfo.repository);
    const data = await response.json();
    const repository = {
        name: data.name,
        owner: data.owner.login,
        description: data.description,
        defaultBranch: data.default_branch,
        language: data.language,
        cloneUrl: data.clone_url
    }
    const repositoryPath = await cloneRepository(repository.owner,repository.name);

    const files = getRepositoryFiles(repositoryPath);

    const repositoryFiles = readRepositoryFiles(files);

    const analyzedFiles = analyzeRepository(repositoryFiles);

    const repositoryIndex = buildRepositoryIndex(analyzedFiles);

    const graph = buildDependencyGraph(analyzedFiles);

    console.log(graph);

    console.log(analyzedFiles.length);
    
    return repositoryIndex;
}


module.exports = {
    analyzeRepositoryService
};
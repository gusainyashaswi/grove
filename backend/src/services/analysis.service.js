const { extractRepositoryInfo } = require("../utils/github.utils");
const AppError = require("../errors/AppError")
const {cloneRepository} = require("../utils/git.utils")
const { getRepositoryFiles } = require("../utils/file.utils");




async function verifyRepositoryExists(owner, repository) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repository}`);

    if (!response.ok) {
        throw new AppError("Repository not found",404);
    }

    return response;
}

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
    console.log(files.length);

    return {
        success: true,
        repository,
    };
}


module.exports = {
    analyzeRepositoryService
};
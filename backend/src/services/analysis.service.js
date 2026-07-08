const { extractRepositoryInfo } = require("../utils/github.utils");

async function verifyRepositoryExists(owner, repository) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repository}`);

    return response;
}

async function analyzeRepositoryService(url) {

    const repositoryInfo = extractRepositoryInfo(url);
    const response = await verifyRepositoryExists(repositoryInfo.owner,repositoryInfo.repository);
    const data = await response.json();

    return {
        success: true,
        repository: data
    };
}

module.exports = {
    analyzeRepositoryService
};
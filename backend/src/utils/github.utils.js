const AppError = require("../errors/AppError")

function extractRepositoryInfo(url) {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.pathname
        .split("/")
        .filter(Boolean);
        
    return {
        owner: parts[0],
        repository: parts[1]
    };
}

async function verifyRepositoryExists(owner, repository) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repository}`);

    if (!response.ok) {
        throw new AppError("Repository not found",404);
    }

    return response;
}

module.exports = {
    extractRepositoryInfo
};
const AppError = require("../errors/AppError");

function extractRepositoryInfo(url) {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.pathname
        .split("/")
        .filter(Boolean);
        
    return {
        owner: parts[0],
        repository: parts[1] ? parts[1].replace(/\.git$/, "") : ""
    };
}

async function verifyRepositoryExists(owner, repository) {
    const cleanRepo = repository ? repository.replace(/\.git$/, "") : "";
    const response = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`, {
        headers: {
            "User-Agent": "Grove-App"
        }
    });

    if (!response.ok) {
        throw new AppError("Repository not found", 404);
    }

    return response;
}

module.exports = {
    extractRepositoryInfo,
    verifyRepositoryExists
};
const AppError = require("../errors/AppError");
const { normalizeGithubUrl } = require("../validators/repository.validator");

function extractRepositoryInfo(rawUrl) {
    if (!rawUrl || typeof rawUrl !== "string") {
        throw new AppError("Invalid repository URL", 400);
    }

    const url = normalizeGithubUrl(rawUrl);
    if (!url) {
        throw new AppError("Invalid repository URL", 400);
    }

    try {
        const parsedUrl = new URL(url);
        const parts = parsedUrl.pathname
            .split("/")
            .filter(Boolean);

        if (!parts[0] || !parts[1]) {
            throw new AppError("Invalid repository URL format", 400);
        }

        return {
            owner: parts[0],
            repository: parts[1] ? parts[1].replace(/\.git$/, "") : ""
        };
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        throw new AppError("Invalid repository URL", 400);
    }
}

async function verifyRepositoryExists(owner, repository) {
    const cleanRepo = repository ? repository.replace(/\.git$/, "") : "";
    const headers = {
        "User-Agent": "Grove-App"
    };

    if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`, { headers });

        if (response.status === 404) {
            throw new AppError("Repository not found", 404);
        }

        if (!response.ok) {
            console.warn(`GitHub API returned status ${response.status} for ${owner}/${cleanRepo}. Falling back to git clone.`);
            return {
                name: cleanRepo,
                owner: { login: owner },
                description: "",
                default_branch: "main",
                language: ""
            };
        }

        const data = await response.json();
        return data;
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        }
        console.warn(`Failed to contact GitHub API: ${err.message}. Falling back to git clone.`);
        return {
            name: cleanRepo,
            owner: { login: owner },
            description: "",
            default_branch: "main",
            language: ""
        };
    }
}

module.exports = {
    extractRepositoryInfo,
    verifyRepositoryExists
};
function normalizeGithubUrl(input) {
    if (!input || typeof input !== "string") return null;
    let url = input.trim();
    if (!url) return null;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        if (url.startsWith("github.com/")) {
            url = "https://" + url;
        } else if (/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(url)) {
            url = "https://github.com/" + url;
        } else {
            url = "https://" + url;
        }
    }
    return url;
}

function validateRepositoryUrl(url) {
    if (!url) {
        return "Repository URL is required.";
    }

    if (typeof url !== "string") {
        return "Repository URL must be a string.";
    }

    const normalized = normalizeGithubUrl(url);
    if (!normalized) {
        return "Invalid URL.";
    }

    let parsedUrl;
    try {
        parsedUrl = new URL(normalized);
    } catch {
        return "Invalid URL.";
    }

    if (parsedUrl.hostname !== "github.com" && parsedUrl.hostname !== "www.github.com") {
        return "Only GitHub repositories are supported.";
    }

    const parts = parsedUrl.pathname.split("/").filter(Boolean);

    if (parts.length < 2) {
        return "Invalid GitHub repository.";
    }

    return null;
}

module.exports = {
    validateRepositoryUrl,
    normalizeGithubUrl
};
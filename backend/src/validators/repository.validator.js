function validateRepositoryUrl(url) {
    if (!url) {
        return "Repository URL is required.";
    }

    if (typeof url !== "string") {
        return "Repository URL must be a string.";
    }

    let parsedUrl;

    try {
        parsedUrl = new URL(url);
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
    validateRepositoryUrl
};
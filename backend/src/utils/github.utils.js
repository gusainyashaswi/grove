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

module.exports = {
    extractRepositoryInfo
};
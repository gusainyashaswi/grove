function analyzeRepositoryStructure(analyzedFiles) {

    const trackedFolders = [
        "components",
        "pages",
        "hooks",
        "context",
        "layouts",
        "utils",
        "services",
        "controllers",
        "routes",
        "middleware",
        "models",
        "config",
        "firebase",
    ];

    const structure = {};

    for (const file of analyzedFiles) {
        const folders = file.folder.split(/[\\/]/);

        for (const folder of folders) {
            const lower = folder.toLowerCase();

            if (!trackedFolders.includes(lower)) continue;

            const name = lower.charAt(0).toUpperCase() + lower.slice(1);

            structure[name] = (structure[name] || 0) + 1;
        }
    }

    return structure;
}

module.exports = {
    analyzeRepositoryStructure,
};
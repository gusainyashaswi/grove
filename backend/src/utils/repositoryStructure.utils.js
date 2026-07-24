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

    const folders = {};

    for (const file of analyzedFiles) {
        const pathFolders = file.folder.split(/[\\/]/);

        for (const folder of pathFolders) {
            const lower = folder.toLowerCase();

            if (!trackedFolders.includes(lower)) continue;

            const name =
                lower.charAt(0).toUpperCase() +
                lower.slice(1);

            folders[name] = (folders[name] || 0) + 1;
        }
    }

    let framework = "Unknown";

    const fileNames = analyzedFiles.map(file =>
        file.name.toLowerCase()
    );

    if (
        fileNames.includes("app.jsx") ||
        fileNames.includes("main.jsx") ||
        fileNames.includes("app.tsx") ||
        fileNames.includes("main.tsx")
    ) {
        framework = "React";
    }

    const hasExpress =
        fileNames.includes("server.js") ||
        fileNames.includes("app.js") ||
        fileNames.includes("index.js") &&
        folders.Controllers &&
        folders.Services;

    if (hasExpress) {
        framework =
            framework === "React"
                ? "React + Express"
                : "Express";
    }

    return {
        framework,
        folders,
    };
    
}

module.exports = {
    analyzeRepositoryStructure,
};
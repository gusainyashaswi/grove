function detectEntryPoint(analyzedFiles) {
    const priorities = [
        "main.tsx",
        "main.jsx",
        "main.ts",
        "main.js",

        "app.tsx",
        "app.jsx",
        "app.ts",
        "app.js",

        "server.js",
        "server.ts",

        "index.tsx",
        "index.jsx",
        "index.ts",
        "index.js",
    ];

    for (const fileName of priorities) {
        const file = analyzedFiles.find(
            file => file.name.toLowerCase() === fileName
        );

        if (file) {
            return {
                name: file.name,
                path: file.path,
            };
        }
    }

    return null;
}

module.exports = {
    detectEntryPoint,
};
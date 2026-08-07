function analyzeRepositoryHealth(analyzedFiles) {
    if (!Array.isArray(analyzedFiles)) {
        return {
            totalFiles: 0,
            largeFiles: [],
            mostImportedFiles: [],
            unusedFiles: [],
            orphanFiles: [],
        };
    }

    const totalFiles = analyzedFiles.length;

    const largeFiles = analyzedFiles
        .filter(file => file && typeof file.lineCount === "number" && file.lineCount > 300)
        .map(file => ({
            name: file.name,
            lines: file.lineCount,
        }));

    const mostImportedFiles = [...analyzedFiles]
        .sort((a, b) => ((b.dependents?.length || 0) - (a.dependents?.length || 0)))
        .slice(0, 5)
        .map(file => ({
            name: file.name,
            imports: file.dependents?.length || 0,
        }));

    const unusedFiles = analyzedFiles
        .filter(file => (file.dependents?.length || 0) === 0)
        .map(file => file.name);

    const orphanFiles = analyzedFiles
        .filter(file =>
            (file.dependencies?.length || 0) === 0 &&
            (file.dependents?.length || 0) === 0
        )
        .map(file => file.name);

    return {
        totalFiles,
        largeFiles,
        mostImportedFiles,
        unusedFiles,
        orphanFiles,
    };
}

module.exports = {
    analyzeRepositoryHealth,
};
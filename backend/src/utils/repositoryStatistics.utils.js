function analyzeRepositoryStatistics(analyzedFiles) {
    if (!Array.isArray(analyzedFiles)) {
        return {
            totalFiles: 0,
            totalFolders: 0,
            totalLines: 0,
            averageLinesPerFile: 0,
            largestFile: null,
            averageDependencies: 0,
            maximumDependencies: 0,
        };
    }

    const totalFiles = analyzedFiles.length;
    const totalLines = analyzedFiles.reduce(
        (sum, file) => sum + (file.lineCount || 0),
        0
    );

    const averageLinesPerFile =
        totalFiles === 0
            ? 0
            : Math.round(totalLines / totalFiles);

    const largestFile =
        analyzedFiles.length === 0
            ? null
            : analyzedFiles.reduce(
                (largest, file) =>
                    (file.lineCount || 0) > (largest.lineCount || 0)
                        ? file
                        : largest,
                analyzedFiles[0]
            );

    const totalDependencies = analyzedFiles.reduce(
        (sum, file) => sum + (file.dependencies?.length || 0),
        0
    );

    const averageDependencies =
        totalFiles === 0
            ? 0
            : Number(
                (totalDependencies / totalFiles).toFixed(1)
            );

    const maximumDependencies = analyzedFiles.reduce(
        (max, file) =>
            Math.max(max, file.dependencies?.length || 0),
        0
    );

    const folders = new Set();

    analyzedFiles.forEach(file => {
        if (file && file.folder) {
            folders.add(file.folder);
        }
    });

    const totalFolders = folders.size;

    return {
        totalFiles,
        totalFolders,
        totalLines,
        averageLinesPerFile,
        largestFile: largestFile
            ? {
                name: largestFile.name,
                path: largestFile.path,
                lines: largestFile.lineCount || 0,
            }
            : null,
        averageDependencies,
        maximumDependencies,
    };
}

module.exports = {
    analyzeRepositoryStatistics,
};

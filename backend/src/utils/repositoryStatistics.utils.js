function analyzeRepositoryStatistics(analyzedFiles) {

    const totalFiles = analyzedFiles.length;
    const totalLines = analyzedFiles.reduce(
        (sum, file) => sum + file.lineCount,
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
                    file.lineCount > largest.lineCount
                        ? file
                        : largest,
                analyzedFiles[0]
            );

    const totalDependencies = analyzedFiles.reduce(
        (sum, file) => sum + file.dependencies.length,
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
            Math.max(max, file.dependencies.length),
        0
    );

    const folders = new Set();

        analyzedFiles.forEach(file => {
            if (file.folder) {
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
                lines: largestFile.lineCount,
            }
            : null,
        averageDependencies,
        maximumDependencies,
    };
        
}

module.exports = {
    analyzeRepositoryStatistics,
};

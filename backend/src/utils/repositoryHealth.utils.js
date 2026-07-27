function analyzeRepositoryHealth(analyzedFiles) {

    const totalFiles = analyzedFiles.length;

    const largeFiles = analyzedFiles
    .filter(file => file.lineCount > 300)
    .map(file => ({
        name: file.name,
        lines: file.lineCount,
    }));

    const mostImportedFiles = [...analyzedFiles]
    .sort((a, b) => b.dependents.length - a.dependents.length)
    .slice(0, 5)
    .map(file => ({
        name: file.name,
        imports: file.dependents.length,
    }));

    const unusedFiles = analyzedFiles
    .filter(file => file.dependents.length === 0)
    .map(file => file.name);

    const orphanFiles = analyzedFiles
    .filter(file =>
        file.dependencies.length === 0 &&
        file.dependents.length === 0
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
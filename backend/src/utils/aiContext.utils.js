function buildRepositoryContext(repository) {
    return {
        structure: repository.structure,
        statistics: repository.statistics,
        health: repository.health,
        entryPoint: repository.entryPoint,
    };
}

module.exports = {
    buildRepositoryContext,
};
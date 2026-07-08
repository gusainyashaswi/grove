const {analyzeRepositoryService} = require("../services/analysis.service");

async function analyzeRepository(req, res) {
    const result = await analyzeRepositoryService(req.body.url);
    res.json(result);
}

module.exports = {
    analyzeRepository
};
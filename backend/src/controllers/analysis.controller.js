const {analyzeRepositoryService} = require("../services/analysis.service");

async function analyzeRepository(req,res,next){
    try{
        const result = await analyzeRepositoryService(req.body.url);
        res.json(result);
    }

    catch(error){
        next(error);
    }
}

module.exports = {
    analyzeRepository
}
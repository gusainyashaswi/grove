const { explainFile, summarizeRepository, answerRepositoryQuestion } = require("../services/ai.service");

async function explainFileController(req, res) {
    try {
        const { repository, file } = req.body;

        if (!repository || !file) {
            return res.status(400).json({
                success: false,
                message: "Repository and file are required.",
            });
        }

        const explanation = await explainFile(repository, file);

        res.json({
            success: true,
            explanation,
        });
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }
}

async function summarizeRepositoryController(req, res) {
    try {
        const { repository } = req.body;

        if (!repository) {
            return res.status(400).json({
                success: false,
                message: "Repository is required.",
            });
        }

        const summary = await summarizeRepository(repository);

        res.json({
            success: true,
            summary,
        });
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }
}

async function answerRepositoryQuestionController(req, res) {
    try {
        const { repository, question } = req.body;

        if (!repository) {
            return res.status(400).json({
                success: false,
                message: "Repository is required.",
            });
        }

        if (!question || typeof question !== "string" || !question.trim()) {
            return res.status(400).json({
                success: false,
                message: "Question is required.",
            });
        }

        const answer = await answerRepositoryQuestion(repository, question.trim());

        res.json({
            success: true,
            answer,
        });
    } catch (error) {
        console.error(error);

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    explainFile: explainFileController,
    summarizeRepository: summarizeRepositoryController,
    answerRepositoryQuestion: answerRepositoryQuestionController,
};
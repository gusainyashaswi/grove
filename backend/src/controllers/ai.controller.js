const { explainFile } = require("../services/ai.service");

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

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    explainFile: explainFileController,
};
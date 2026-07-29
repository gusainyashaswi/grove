const { GoogleGenAI } = require("@google/genai");
const {buildRepositorySummaryPrompt} = require("../prompts/repositorySummary.prompt");
const { buildExplainFilePrompt } = require("../prompts/explainFile.prompt");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function explainFile(repository, file) {
    const prompt = buildExplainFilePrompt(repository, file);

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    return response.text;
}

async function summarizeRepository(repository) {
    const prompt = buildRepositorySummaryPrompt(repository);

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    return response.text;
}

module.exports = {
    explainFile,
    summarizeRepository,
};
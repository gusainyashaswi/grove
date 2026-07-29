const { GoogleGenAI } = require("@google/genai");

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

module.exports = {
    explainFile,
};
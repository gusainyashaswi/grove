const { GoogleGenAI } = require("@google/genai");
const { buildRepositorySummaryPrompt } = require("../prompts/repositorySummary.prompt");
const { buildExplainFilePrompt } = require("../prompts/explainFile.prompt");
const { buildRepositoryQuestionPrompt } = require("../prompts/repositoryQuestion.prompt");
const { buildRepositoryKnowledge } = require("../utils/repositoryKnowledge.utils");
const { selectRelevantFiles } = require("../utils/relevantFileSelector.utils");

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
    const knowledge = repository?.knowledge || (repository?.files ? buildRepositoryKnowledge(repository) : repository);

    const prompt = buildRepositorySummaryPrompt(knowledge);

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    return response.text;
}

async function answerRepositoryQuestion(repository, question) {
    const knowledge = repository?.knowledge || (repository?.files ? buildRepositoryKnowledge(repository) : repository);

    const selectedSourceFiles = selectRelevantFiles(knowledge, question);

    const prompt = buildRepositoryQuestionPrompt(knowledge, question, selectedSourceFiles);

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
    });

    return response.text;
}

module.exports = {
    explainFile,
    summarizeRepository,
    answerRepositoryQuestion,
};
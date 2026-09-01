const { GoogleGenAI } = require("@google/genai");
const path = require("path");
const AppError = require("../errors/AppError");
const { buildRepositorySummaryPrompt } = require("../prompts/repositorySummary.prompt");
const { buildExplainFilePrompt } = require("../prompts/explainFile.prompt");
const { buildRepositoryQuestionPrompt } = require("../prompts/repositoryQuestion.prompt");
const { buildRepositoryKnowledge } = require("../utils/repositoryKnowledge.utils");
const { selectRelevantFiles } = require("../utils/relevantFileSelector.utils");

function getAIClient() {
    if (!process.env.GEMINI_API_KEY) {
        throw new AppError("GEMINI_API_KEY environment variable is not configured.", 500);
    }
    return new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });
}

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.0-flash";

async function explainFile(repository, file) {
    const ai = getAIClient();
    const prompt = buildExplainFilePrompt(repository, file);

    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
    });

    return response.text;
}

async function summarizeRepository(repository) {
    const ai = getAIClient();
    const knowledge = repository?.knowledge || (repository?.files ? buildRepositoryKnowledge(repository) : repository);

    const prompt = buildRepositorySummaryPrompt(knowledge);

    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
    });

    return response.text;
}

async function answerRepositoryQuestion(repository, question) {
    const ai = getAIClient();
    const knowledge = repository?.knowledge || (repository?.files ? buildRepositoryKnowledge(repository) : repository);
    const files = repository?.files || [];

    const repositoryPath = (repository?.owner && repository?.name)
        ? path.resolve(process.cwd(), "temp", "repositories", `${repository.owner}-${repository.name}`)
        : null;

    const selectedSourceFiles = selectRelevantFiles(knowledge, question, repositoryPath, files);

    const prompt = buildRepositoryQuestionPrompt(knowledge, question, selectedSourceFiles);

    const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
    });

    return response.text;
}

module.exports = {
    explainFile,
    summarizeRepository,
    answerRepositoryQuestion,
};
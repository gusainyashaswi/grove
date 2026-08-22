const { readFileContent } = require("./file.utils");

const MAX_SOURCE_FILES = 4;

const METADATA_PHRASES = [
    "entry point",
    "how many files",
    "how many folders",
    "what framework",
    "which framework",
    "what folders",
    "which folders",
    "folder structure",
    "repository structure",
    "what is the structure",
    "most important files",
    "most connected",
    "which files depend",
    "which files are",
    "what files are",
    "how many dependencies",
    "total files",
    "total lines",
    "total folders",
    "repository health",
    "repository statistics",
    "largest file",
    "unused files",
    "orphan files",
    "what is the entry",
    "where is the entry",
];

function isMetadataQuestion(question) {
    const lower = question.toLowerCase();
    return METADATA_PHRASES.some(phrase => lower.includes(phrase));
}

function scoreFile(fileMeta, questionTokens) {
    let score = 0;

    const nameLower = fileMeta.name.toLowerCase();
    const pathLower = fileMeta.path.toLowerCase();

    for (const token of questionTokens) {
        if (nameLower.includes(token)) score += 3;
        if (pathLower.includes(token)) score += 1;
    }

    score += fileMeta.dependents.length;

    return score;
}

function tokenize(question) {
    return question
        .toLowerCase()
        .replace(/[^a-z0-9./_-]/g, " ")
        .split(/\s+/)
        .filter(t => t.length > 2);
}

function selectRelevantFiles(knowledge, question, repositoryPath) {
    if (isMetadataQuestion(question)) {
        return [];
    }

    const files = Array.isArray(knowledge?.files) ? knowledge.files : [];

    if (files.length === 0) {
        return [];
    }

    const questionTokens = tokenize(question);
    const selectedPaths = new Set();
    const candidates = [];

    for (const fileMeta of files) {
        const score = scoreFile(fileMeta, questionTokens);
        if (score > 0) {
            candidates.push({ fileMeta, score });
        }
    }

    candidates.sort((a, b) => b.score - a.score);

    const topCandidates = candidates.slice(0, MAX_SOURCE_FILES);

    for (const { fileMeta } of topCandidates) {
        selectedPaths.add(fileMeta.path);
    }

    const relatedPaths = new Set();
    for (const { fileMeta } of topCandidates) {
        for (const dep of fileMeta.dependencies) {
            if (!selectedPaths.has(dep) && relatedPaths.size + selectedPaths.size < MAX_SOURCE_FILES) {
                relatedPaths.add(dep);
            }
        }
    }

    const allSelectedPaths = [...selectedPaths, ...relatedPaths].slice(0, MAX_SOURCE_FILES);

    const result = [];
    for (const filePath of allSelectedPaths) {
        const fileMeta = files.find(f => f.path === filePath);
        if (fileMeta && fileMeta.content) {
            result.push({ path: filePath, content: fileMeta.content });
            continue;
        }

        try {
            const targetPath = repositoryPath && !path.isAbsolute(filePath)
                ? path.join(repositoryPath, filePath)
                : filePath;
            const content = readFileContent(targetPath);
            result.push({ path: filePath, content });
        } catch {
            // file not readable, skip
        }
    }

    return result;
}

module.exports = {
    selectRelevantFiles,
};

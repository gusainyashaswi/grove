function buildSourceFilesSection(selectedSourceFiles) {
    if (!Array.isArray(selectedSourceFiles) || selectedSourceFiles.length === 0) {
        return "No source files were selected for this question.";
    }

    return selectedSourceFiles
        .map(f => `File: ${f.path}\n\`\`\`\n${f.content}\n\`\`\``)
        .join("\n\n");
}

function buildRepositoryQuestionPrompt(knowledge, question, selectedSourceFiles) {
    return `
You are a senior software engineer helping another developer understand an unfamiliar codebase.

== REPOSITORY KNOWLEDGE (metadata and structure) ==

Framework / Technology:
${knowledge?.framework || "Unknown"}

Entry Point:
${knowledge?.entryPoint?.path ? `${knowledge.entryPoint.name} (${knowledge.entryPoint.path})` : "Not detected"}

Folder Distribution:
${JSON.stringify(knowledge?.folders || {}, null, 2)}

Important Files:
${JSON.stringify(knowledge?.importantFiles || [], null, 2)}

File Metadata (compact - no source code):
${JSON.stringify(knowledge?.files || [], null, 2)}

Dependency Graph:
${JSON.stringify(knowledge?.dependencyGraph || { nodes: [], edges: [] }, null, 2)}

Repository Statistics:
${JSON.stringify(knowledge?.statistics || {}, null, 2)}

Repository Health:
${JSON.stringify(knowledge?.health || {}, null, 2)}

== SELECTED SOURCE FILES (actual source code for files relevant to the question) ==

${buildSourceFilesSection(selectedSourceFiles)}

== USER QUESTION ==

"${question}"

== INSTRUCTIONS ==

Answer the user question using the context above.

- Use the REPOSITORY KNOWLEDGE section for repository-level facts (structure, statistics, entry point, folder distribution, dependency relationships).
- Use the SELECTED SOURCE FILES section for implementation details when source code was provided.
- Do not invent files, folders, technologies, functions, or architectural patterns not present in the provided context.
- Do not claim to have read files that were not included in SELECTED SOURCE FILES.
- If the selected source files do not contain enough information to answer the question fully, explicitly state: "Cannot be determined from the available repository information."
- Keep your answer clear, direct, concise, and helpful.
`;
}

module.exports = {
    buildRepositoryQuestionPrompt,
};

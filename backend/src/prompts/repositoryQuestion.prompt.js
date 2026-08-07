function buildRepositoryQuestionPrompt(knowledge, question) {
    return `
You are a senior software engineer helping another developer understand an unfamiliar codebase.

Analyse the following Repository Knowledge object:

Framework / Technology:
${knowledge?.framework || "Unknown"}

Entry Point:
${knowledge?.entryPoint?.path ? `${knowledge.entryPoint.name} (${knowledge.entryPoint.path})` : "Not detected"}

Folder Distribution:
${JSON.stringify(knowledge?.folders || {}, null, 2)}

Important Files:
${JSON.stringify(knowledge?.importantFiles || [], null, 2)}

File Metadata (compact):
${JSON.stringify(knowledge?.files || [], null, 2)}

Dependency Graph:
${JSON.stringify(knowledge?.dependencyGraph || { nodes: [], edges: [] }, null, 2)}

Repository Statistics:
${JSON.stringify(knowledge?.statistics || {}, null, 2)}

Repository Health:
${JSON.stringify(knowledge?.health || {}, null, 2)}

User Question:
"${question}"

Answer the user question based strictly on the Repository Knowledge provided above.

CRITICAL GROUNDING & ACCURACY RULES:
- Rely strictly on facts provided in the Repository Knowledge object.
- Do not invent files, folders, technologies, dependencies, application features, functions, or architectural patterns.
- Do not pretend to have read source code that was not provided in the Repository Knowledge object.
- If the provided Repository Knowledge does not contain enough information to answer the question, explicitly state: "Cannot be determined from the available repository information."
- Keep your answer clear, direct, concise, and helpful.
`;
}

module.exports = {
    buildRepositoryQuestionPrompt,
};

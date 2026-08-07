function buildRepositorySummaryPrompt(knowledge) {
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

Based strictly on the Repository Knowledge provided above, write a concise, grounded overview for a developer exploring this codebase for the first time.

Cover the following sections:
1. Project Overview (What the project appears to be based strictly on available evidence)
2. Detected Technologies & Frameworks
3. Repository Organization & Important Folders
4. Important Files (and why they are significant)
5. Application Entry Point
6. Key Dependency Relationships
7. Repository Statistics & Health Insights
8. Recommended Starting Point for Exploration
9. Overall Summary

CRITICAL GROUNDING & ACCURACY RULES:
- Rely strictly on facts provided in the Repository Knowledge object.
- Do not invent application features, domain purpose, or business logic without clear evidence in the data.
- Do not make generic assumptions like "This follows a standard layout" or "Expect typical components".
- Do not invent folder meanings, technologies, or architectural patterns not supported by the data.
- Clearly distinguish facts (e.g. detected files, counts) from reasonable inferences.
- If information for a section is insufficient or not available, explicitly state: "Cannot be determined from the available repository information."
- Keep the language clear, direct, concise, and helpful.
`;
}

module.exports = {
    buildRepositorySummaryPrompt,
};
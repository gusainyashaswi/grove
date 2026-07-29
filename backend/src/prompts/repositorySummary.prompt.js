function buildRepositorySummaryPrompt(repository) {
    return `
You are a senior software engineer helping another developer understand an unfamiliar codebase.

Repository Information

Framework:
${repository.structure.framework}

Entry Point:
${repository.entryPoint?.path || "Unknown"}

Statistics

Total Files:
${repository.statistics.totalFiles}

Total Folders:
${repository.statistics.totalFolders}

Total Lines:
${repository.statistics.totalLines}

Repository Structure:
${JSON.stringify(repository.structure.folders, null, 2)}

Repository Health:
${JSON.stringify(repository.health, null, 2)}

Based on this information, provide a repository overview using the following format:

1. Purpose
2. Architecture
3. Technologies
4. Folder Organization
5. Main Features
6. Recommended Starting Point
7. Summary

Do not invent features that are not supported by the provided information.
Use simple language.
`;
}

module.exports = {
    buildRepositorySummaryPrompt,
};
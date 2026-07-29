function buildExplainFilePrompt(repository, file) {
    return `
You are a senior software engineer helping another developer understand an unfamiliar codebase.

Repository Framework:
${repository.structure.framework}

Repository Entry Point:
${repository.entryPoint?.path || "Unknown"}

Selected File

Name:
${file.name}

Path:
${file.path}

Type:
${file.type}

Imports:
${file.dependencies.join(", ") || "None"}

Used By:
${file.dependents.join(", ") || "None"}

Code:

${file.content}

Explain this file using the following sections:

1. Purpose
2. Responsibilities
3. Important Functions or Components
4. How it interacts with other files
5. Summary

Use simple language.

Do not explain every line of code.
`;
}

module.exports = {
    buildExplainFilePrompt,
};
const { parseJavaScript } = require("./parser.utils");
const { extractImports, isInternalImport } = require("./ast.utils");
const { resolveImport } = require("./file.utils");
const { classifyFile } = require("./fileClassifier.utils");

function analyzeRepository(repositoryFiles) {
    if (!Array.isArray(repositoryFiles)) {
        return [];
    }

    const analyzedFiles = [];

    for (const file of repositoryFiles) {
        if (!file || !file.path) continue;

        let imports = [];
        try {
            const ast = parseJavaScript(file.content || "");
            imports = extractImports(ast);
        } catch (error) {
            console.warn(`Failed to parse AST for file: ${file.path}`, error.message);
        }

        const dependencies = [];

        for (const importsPath of imports) {
            if (!isInternalImport(importsPath)) {
                continue;
            }

            const resolvedPath = resolveImport(file.path, importsPath);

            if (!resolvedPath) {
                continue;
            }

            if (!dependencies.includes(resolvedPath)) {
                dependencies.push(resolvedPath);
            }
        }

        const lastSlash = file.path.lastIndexOf("/");
        const folder = lastSlash !== -1 ? file.path.substring(0, lastSlash) : "";
        const name = lastSlash !== -1 ? file.path.substring(lastSlash + 1) : file.path;
        const lastDot = name.lastIndexOf(".");
        const extension = lastDot !== -1 ? name.substring(lastDot) : "";
        const lineCount = typeof file.content === "string" ? file.content.split("\n").length : 0;

        analyzedFiles.push({
            path: file.path,
            name,
            folder,
            extension,
            lineCount,
            type: classifyFile(file.path),
            content: file.content || "",
            imports,
            dependencies,
        });
    }

    const fileMap = new Map();

    for (const file of analyzedFiles) {
        fileMap.set(file.path, file);
    }

    for (const file of analyzedFiles) {
        file.dependents = [];
    }

    for (const file of analyzedFiles) {
        for (const dependency of file.dependencies) {
            const dependencyFile = fileMap.get(dependency);

            if (dependencyFile) {
                dependencyFile.dependents.push(file.path);
            }
        }
    }

    return analyzedFiles;
}

module.exports = {
    analyzeRepository
};
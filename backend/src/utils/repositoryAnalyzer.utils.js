const { parseJavaScript } = require("./parser.utils");
const { extractImports, isInternalImport } = require("./ast.utils");
const { resolveImport } = require("./file.utils");
const { classifyFile } = require("./fileClassifier.utils");

function analyzeRepository(repositoryFiles) {
    const analyzedFiles = [];

    for (const file of repositoryFiles) {
        let imports = [];
        try {
            const ast = parseJavaScript(file.content);
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

            dependencies.push(resolvedPath);
        }

        analyzedFiles.push({
            path: file.path,
            name: file.path.split("/").pop(),
            folder: file.path.substring(0, file.path.lastIndexOf("/")),
            extension: file.path.substring(file.path.lastIndexOf(".")),
            lineCount: file.content.split("\n").length,
            type: classifyFile(file.path),
            content:file.content,
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
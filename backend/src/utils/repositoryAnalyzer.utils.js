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
            type: classifyFile(file.path),
            imports, 
            dependencies
        });
    }

    return analyzedFiles;
}

module.exports = {
    analyzeRepository
};
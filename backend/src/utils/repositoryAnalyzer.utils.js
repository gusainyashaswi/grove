const { parseJavaScript } = require("./parser.utils");
const { extractImports, isInternalImport } = require("./ast.utils");
const { resolveImport } = require("./file.utils");

function analyzeRepository(repositoryFiles) {

    const analyzedFiles = [];

    for (const file of repositoryFiles) {

        const ast = parseJavaScript(file.content);
        const imports = extractImports(ast)
        const dependencies = [];

        for (const importsPath of imports){
            if(!isInternalImport(importsPath)){
                continue;
            }

            const resolvedPath = resolveImport(file.path, importsPath)

            if(!resolvedPath) {
                continue;
            }

            dependencies.push(resolveImport)
        }

        analyzedFiles.push({path: file.path, ast, imports, dependencies});
    }
    return analyzedFiles;
}

module.exports = {
    analyzeRepository
};
const traverse = require("@babel/traverse").default;

function isInternalImport(importPath) {
    return importPath.startsWith("./") ||
           importPath.startsWith("../");
}

function extractImports(ast) {

    const imports = [];

    traverse(ast, {

        ImportDeclaration(path) {
            imports.push(
                path.node.source.value
            );
        },

        CallExpression(path) {
            
            if (path.node.callee.name !== "require"){
                return;
            }

            imports.push(
                path.node.arguments[0].value
            );
        }
    });

    return imports;
}

module.exports = {
    extractImports,
    isInternalImport,
}
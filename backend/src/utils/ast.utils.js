const babelTraverse = require("@babel/traverse");
const traverse = babelTraverse.default || babelTraverse;

function isInternalImport(importPath) {
    if (typeof importPath !== "string") return false;
    return importPath.startsWith("./") ||
           importPath.startsWith("../") ||
           importPath.startsWith("@/");
}

function extractImports(ast) {
    const imports = [];

    if (!ast) return imports;

    traverse(ast, {
        ImportDeclaration(path) {
            if (path.node && path.node.source && typeof path.node.source.value === "string") {
                imports.push(path.node.source.value);
            }
        },

        CallExpression(path) {
            if (path.node.callee.name !== "require") {
                return;
            }

            const arg = path.node.arguments && path.node.arguments[0];
            if (arg && typeof arg.value === "string") {
                imports.push(arg.value);
            }
        }
    });

    return imports;
}

module.exports = {
    extractImports,
    isInternalImport,
};
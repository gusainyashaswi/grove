
function extractImports(ast) {

    const imports = [];

    for (const node of ast.program.body) {

        if (node.type === "ImportDeclaration") {
            imports.push(node.source.value);
            continue;
        }

        if (node.type !== "VariableDeclaration"){
            continue;
        }

        for (const declaration of node.declarations) {

            if (declaration.init && declaration.init.type === "CallExpression" && declaration.init.callee.name === "require") {
                imports.push(declaration.init.arguments[0].value);
            }
        }
    }
    return imports;
}

function isInternalImport(importPath) {
    return importPath.startsWith("./") ||
           importPath.startsWith("../");
}

module.exports = {
    extractImports,
    isInternalImport
}
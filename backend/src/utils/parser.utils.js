const parser = require("@babel/parser");

function parseJavaScript(code) {
    return parser.parse(code, {
        sourceType: "unambiguous",
        plugins: [
            "jsx",
            "typescript",
            "classProperties",
            "dynamicImport",
            "exportDefaultFrom",
            "exportNamespaceFrom",
            "decorators-legacy",
            "importMeta",
            "topLevelAwait"
        ]
    });
}

module.exports = {
    parseJavaScript
};
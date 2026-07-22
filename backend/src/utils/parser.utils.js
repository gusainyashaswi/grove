const parser = require("@babel/parser");

function parseJavaScript(code) {
    return parser.parse(code, {
        sourceType: "unambiguous",
        plugins: [
            "jsx",
            "typescript",
            "classProperties",
            "dynamicImport",
            "exportDefaultFrom"
        ]
    });
}

module.exports = {
    parseJavaScript
};
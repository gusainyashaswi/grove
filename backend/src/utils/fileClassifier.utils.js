const path = require("path");

function classifyFile(filePath) {
    if (!filePath) return "unknown";
    const lowerPath = filePath.toLowerCase();
    const ext = path.extname(filePath).toLowerCase();

    if (lowerPath.includes("controller")) return "controller";
    if (lowerPath.includes("route")) return "route";
    if (lowerPath.includes("service")) return "service";
    if (lowerPath.includes("model")) return "model";
    if (lowerPath.includes("middleware")) return "middleware";
    if (lowerPath.includes("validator")) return "validator";
    if (lowerPath.includes("util") || lowerPath.includes("helper")) return "utility";
    if (lowerPath.includes("component") || ext === ".jsx" || ext === ".tsx") return "component";
    if (lowerPath.includes("config")) return "config";

    if (ext === ".js" || ext === ".mjs" || ext === ".cjs") return "javascript";
    if (ext === ".ts") return "typescript";
    if (ext === ".json") return "json";

    return "file";
}

module.exports = {
    classifyFile
};

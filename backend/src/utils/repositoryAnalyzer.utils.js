const { parseJavaScript } = require("./parser.utils");

function analyzeRepository(repositoryFiles) {

    const analyzedFiles = [];

    for (const file of repositoryFiles) {

        const ast = parseJavaScript(file.content);

        analyzedFiles.push({path: file.path, ast});
    }
    return analyzedFiles;
}

module.exports = {
    analyzeRepository
};
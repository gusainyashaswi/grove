const fs = require("fs");
const path = require("path");

const CODE_EXTENSIONS = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".mjs",
    ".cjs"
    ];

function getRepositoryFiles(directoryPath) {
    const items = fs.readdirSync(directoryPath);
    let files = [];
    const IGNORED_DIRECTORIES = [
    ".git",
    "node_modules",
    "dist",
    "build",
    "coverage",
    ".next"
    ]

    for (const item of items) {

        if (IGNORED_DIRECTORIES.includes(item)) {
            continue;
        }

        const fullPath = path.join(
            directoryPath,
            item
        );
        const stats = fs.statSync(fullPath);
        if (stats.isFile()) {
            files.push(fullPath);
        }
        else if (stats.isDirectory()) {
            const nestedFiles =
                getRepositoryFiles(fullPath);
            files.push(...nestedFiles);
        }
    }
    return files;
}

function readRepositoryFiles(files) {
    const repositoryFiles = [];
    for (const file of files) {
        const content = readFileContent(file);
        repositoryFiles.push({
            path: file,
            content
        });
    }
    return repositoryFiles;
}

function resolveImport(currentFile, importPath) {

    const directory = path.dirname(currentFile);
    return path.resolve(directory,importPath);
}

module.exports = {
    getRepositoryFiles,
    readRepositoryFiles,
    resolveImport

}
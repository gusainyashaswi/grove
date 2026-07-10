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

const IGNORED_DIRECTORIES = [
    ".git",
    "node_modules",
    "dist",
    "build",
    "coverage",
    ".next"
    ]

function getRepositoryFiles(directoryPath) {
    const items = fs.readdirSync(directoryPath);
    let files = [];

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

function readFileContent(filePath) {
    return fs.readFileSync(filePath, "utf8");
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
    const resolvedPath = path.resolve(directory,importPath);

    if (fs.existsSync(resolvedPath + ".js")){
        return resolvedPath + ".js";
    }

    const indexFile = path.join(resolvedPath,"index.js");

    if (fs.existsSync(indexFile)){
        return indexFile;
    }

    return null;
}

module.exports = {
    getRepositoryFiles,
    readRepositoryFiles,
    resolveImport,
    readFileContent

}
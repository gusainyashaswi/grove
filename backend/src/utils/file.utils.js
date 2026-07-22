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
];

function getRepositoryFiles(directoryPath) {
    const items = fs.readdirSync(directoryPath);
    let filePaths = [];

    for (const item of items) {
        if (IGNORED_DIRECTORIES.includes(item)) {
            continue;
        }

        const fullPath = path.join(directoryPath, item);
        const stats = fs.statSync(fullPath);
        if (stats.isFile()) {
            const ext = path.extname(fullPath).toLowerCase();
            if (CODE_EXTENSIONS.includes(ext)) {
                filePaths.push(fullPath);
            }
        } else if (stats.isDirectory()) {
            const nestedFiles = getRepositoryFiles(fullPath);
            filePaths.push(...nestedFiles);
        }
    }
    return filePaths;
}

function readFileContent(filePath) {
    return fs.readFileSync(filePath, "utf8");
}

function readRepositoryFiles(filePaths) {
    const repositoryFiles = [];
    for (const file of filePaths) {
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
    const resolvedPath = path.resolve(directory, importPath);

    if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
        return resolvedPath;
    }

    for (const ext of CODE_EXTENSIONS) {
        const pathWithExt = resolvedPath + ext;
        if (fs.existsSync(pathWithExt) && fs.statSync(pathWithExt).isFile()) {
            return pathWithExt;
        }
    }

    for (const ext of CODE_EXTENSIONS) {
        const indexFile = path.join(resolvedPath, "index" + ext);
        if (fs.existsSync(indexFile) && fs.statSync(indexFile).isFile()) {
            return indexFile;
        }
    }

    return null;
}

module.exports = {
    getRepositoryFiles,
    readRepositoryFiles,
    resolveImport,
    readFileContent,
    CODE_EXTENSIONS
};
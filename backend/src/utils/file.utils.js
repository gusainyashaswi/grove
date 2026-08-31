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

function getRepositoryFiles(directoryPath, baseDir = directoryPath) {
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
                const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
                filePaths.push(relativePath);
            }
        } else if (stats.isDirectory()) {
            const nestedFiles = getRepositoryFiles(fullPath, baseDir);
            filePaths.push(...nestedFiles);
        }
    }
    return filePaths;
}

function readFileContent(filePath) {
    try {
        const stats = fs.statSync(filePath);
        if (stats.size > 2 * 1024 * 1024) {
            return "// File omitted: exceeds size limit (2MB)";
        }
        return fs.readFileSync(filePath, "utf8");
    } catch {
        return "";
    }
}

function readRepositoryFiles(filePaths, repositoryPath) {
    const repositoryFiles = [];
    for (const relPath of filePaths) {
        const fullPath = repositoryPath ? path.join(repositoryPath, relPath) : relPath;
        const content = readFileContent(fullPath);
        repositoryFiles.push({
            path: relPath,
            content
        });
    }
    return repositoryFiles;
}

function resolveImport(currentFile, importPath, repositoryPath) {
    if (!repositoryPath) {
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

    let targetPath = importPath;
    if (importPath.startsWith("@/")) {
        targetPath = importPath.slice(2);
    }

    const currentDir = path.dirname(currentFile);
    const absCurrentDir = path.join(repositoryPath, currentDir);
    const absResolved = (importPath.startsWith("@/") || !importPath.startsWith("."))
        ? path.join(repositoryPath, targetPath)
        : path.resolve(absCurrentDir, importPath);

    function checkFile(absPath) {
        if (fs.existsSync(absPath) && fs.statSync(absPath).isFile()) {
            return path.relative(repositoryPath, absPath).replace(/\\/g, "/");
        }
        return null;
    }

    let found = checkFile(absResolved);
    if (found) return found;

    for (const ext of CODE_EXTENSIONS) {
        found = checkFile(absResolved + ext);
        if (found) return found;
    }

    for (const ext of CODE_EXTENSIONS) {
        found = checkFile(path.join(absResolved, "index" + ext));
        if (found) return found;
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
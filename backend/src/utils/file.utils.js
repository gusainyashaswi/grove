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

const IGNORED_DIRECTORIES = new Set([
    ".git",
    "node_modules",
    "dist",
    "build",
    "coverage",
    ".next",
    ".nuxt",
    ".turbo",
    ".output",
    ".cache",
    ".yarn",
    ".husky",
    ".changeset",
    ".vscode",
    ".idea",
    ".github",
    "temp",
    "tmp",
    "vendor",
    "target",
    "out",
    "docs",
    "documentation",
    "examples",
    "example",
    "fixtures",
    "__fixtures__",
    "test",
    "tests",
    "__tests__",
    "e2e",
    "cypress",
    "playwright",
    "bench",
    "benches",
    "benchmark",
    "benchmarks",
    "evals",
    "site",
    "website",
    "storybook-static"
]);

function isTestOrAuxiliaryFile(filePath) {
    const lower = filePath.toLowerCase();
    if (lower.endsWith(".d.ts")) return true;
    if (lower.endsWith(".map")) return true;
    if (lower.includes(".test.") || lower.includes(".spec.")) return true;
    if (lower.includes("__tests__") || lower.includes("__mocks__") || lower.includes("__snapshots__")) return true;
    return false;
}

const MAX_ANALYZED_FILES = process.env.MAX_FILES ? parseInt(process.env.MAX_FILES, 10) : 800;

function scanAllFiles(directoryPath, baseDir = directoryPath) {
    let items;
    try {
        items = fs.readdirSync(directoryPath);
    } catch {
        return [];
    }

    let filePaths = [];

    for (const item of items) {
        if (IGNORED_DIRECTORIES.has(item.toLowerCase())) {
            continue;
        }

        const fullPath = path.join(directoryPath, item);
        let stats;
        try {
            stats = fs.statSync(fullPath);
        } catch {
            continue;
        }

        if (stats.isFile()) {
            const ext = path.extname(fullPath).toLowerCase();
            if (CODE_EXTENSIONS.includes(ext)) {
                const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
                if (!isTestOrAuxiliaryFile(relativePath)) {
                    filePaths.push(relativePath);
                }
            }
        } else if (stats.isDirectory()) {
            const nestedFiles = scanAllFiles(fullPath, baseDir);
            filePaths.push(...nestedFiles);
        }
    }
    return filePaths;
}

function getRepositoryFiles(directoryPath, baseDir = directoryPath) {
    const allFiles = scanAllFiles(directoryPath, baseDir);
    const totalDiscoveredCount = allFiles.length;

    if (allFiles.length <= MAX_ANALYZED_FILES) {
        allFiles.totalDiscoveredCount = totalDiscoveredCount;
        return allFiles;
    }

    // Prioritize important architectural files for large repositories
    const scoreFile = (filePath) => {
        let score = 0;
        const lower = filePath.toLowerCase();
        const base = path.basename(lower);

        // Core entry points get highest priority
        if (/^(index|main|app|server)\.(jsx?|tsx?|mjs|cjs)$/.test(base)) score += 100;
        // Root configuration or entry files
        if (!filePath.includes("/")) score += 50;
        // High-value application directories
        if (lower.startsWith("src/") || lower.startsWith("app/") || lower.startsWith("lib/")) score += 40;
        if (lower.includes("/controllers/") || lower.includes("/routes/") || lower.includes("/services/")) score += 30;
        if (lower.includes("/components/") || lower.includes("/pages/") || lower.includes("/hooks/")) score += 20;

        // Moderate penalty for deeply nested directories to favor top architecture
        const depth = filePath.split("/").length;
        score -= depth * 3;

        return score;
    };

    allFiles.sort((a, b) => scoreFile(b) - scoreFile(a));
    const selectedFiles = allFiles.slice(0, MAX_ANALYZED_FILES);
    selectedFiles.totalDiscoveredCount = totalDiscoveredCount;
    return selectedFiles;
}

function readFileContent(filePath) {
    try {
        const stats = fs.statSync(filePath);
        if (stats.size > 512 * 1024) {
            return "// File omitted: exceeds size limit (512KB)";
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

function resolveImport(currentFile, importPath, repositoryPath, knownFilesSet = null) {
    let targetPath = importPath;
    if (importPath.startsWith("@/")) {
        targetPath = importPath.slice(2);
    }

    const currentDir = path.dirname(currentFile);
    let relBase = "";
    if (importPath.startsWith("@/") || !importPath.startsWith(".")) {
        relBase = targetPath.replace(/^[\\/]+/, "");
    } else {
        relBase = path.join(currentDir, targetPath).replace(/\\/g, "/");
    }

    // Fast path: In-memory lookup if knownFilesSet is provided
    if (knownFilesSet) {
        if (knownFilesSet.has(relBase)) return relBase;
        for (const ext of CODE_EXTENSIONS) {
            const withExt = relBase + ext;
            if (knownFilesSet.has(withExt)) return withExt;
        }
        for (const ext of CODE_EXTENSIONS) {
            const indexWithExt = path.join(relBase, "index" + ext).replace(/\\/g, "/");
            if (knownFilesSet.has(indexWithExt)) return indexWithExt;
        }
    }

    // Fallback: Check filesystem if repositoryPath is provided
    if (repositoryPath) {
        const absCurrentDir = path.join(repositoryPath, currentDir);
        const absResolved = (importPath.startsWith("@/") || !importPath.startsWith("."))
            ? path.join(repositoryPath, targetPath)
            : path.resolve(absCurrentDir, importPath);

        function checkFile(absPath) {
            try {
                if (fs.existsSync(absPath) && fs.statSync(absPath).isFile()) {
                    return path.relative(repositoryPath, absPath).replace(/\\/g, "/");
                }
            } catch {}
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
    }

    return null;
}

module.exports = {
    getRepositoryFiles,
    readRepositoryFiles,
    resolveImport,
    readFileContent,
    CODE_EXTENSIONS,
    IGNORED_DIRECTORIES
};
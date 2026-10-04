const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const AppError = require("../errors/AppError");

const REPOSITORIES_DIR = process.env.REPO_STORAGE_PATH
    ? path.resolve(process.env.REPO_STORAGE_PATH)
    : path.resolve(__dirname, "../../temp/repositories");

function getRepositoryPath(owner, repository) {
    const cleanRepo = repository ? repository.replace(/\.git$/, "") : "";
    return path.resolve(REPOSITORIES_DIR, `${owner}-${cleanRepo}`);
}

async function cloneRepository(owner, repository) {
    const repositoryPath = getRepositoryPath(owner, repository);

    if (fs.existsSync(repositoryPath)) {
        const gitFolder = path.join(repositoryPath, ".git");
        if (fs.existsSync(gitFolder)) {
            return repositoryPath;
        }
        // Folder exists but .git missing; remove corrupted directory
        fs.rmSync(repositoryPath, { recursive: true, force: true });
    }

    fs.mkdirSync(path.dirname(repositoryPath), { recursive: true });

    const cleanRepo = repository ? repository.replace(/\.git$/, "") : "";
    const repoUrl = `https://github.com/${owner}/${cleanRepo}.git`;

    return new Promise((resolve, reject) => {
        let timedOut = false;
        const timeoutMs = 120000; // 2 minutes

        const git = spawn("git", [
            "clone",
            "--depth",
            "1",
            "--single-branch",
            "--no-tags",
            repoUrl,
            repositoryPath
        ]);

        const timer = setTimeout(() => {
            timedOut = true;
            try {
                git.kill("SIGKILL");
            } catch {}
            if (fs.existsSync(repositoryPath)) {
                try {
                    fs.rmSync(repositoryPath, { recursive: true, force: true });
                } catch {}
            }
            reject(new AppError("Repository cloning timed out (2 minutes). The repository may be too large or GitHub is slow. Please try again.", 408));
        }, timeoutMs);

        git.stdout.on("data", (data) => {
            console.log(data.toString());
        });

        git.stderr.on("data", (data) => {
            console.log(data.toString());
        });

        git.on("error", (err) => {
            clearTimeout(timer);
            if (timedOut) return;
            console.log("SPAWN ERROR:", err);
            if (fs.existsSync(repositoryPath)) {
                try {
                    fs.rmSync(repositoryPath, { recursive: true, force: true });
                } catch {}
            }
            reject(new AppError("Failed to clone repository. Please check the URL and try again.", 400));
        });

        git.on("close", (code) => {
            clearTimeout(timer);
            if (timedOut) return;
            console.log("Git closed with code:", code);

            if (code === 0) {
                resolve(repositoryPath);
            } else {
                if (fs.existsSync(repositoryPath)) {
                    try {
                        fs.rmSync(repositoryPath, { recursive: true, force: true });
                    } catch {}
                }
                reject(new AppError(`Failed to clone repository. Please check the repository URL and ensure it is public.`, 400));
            }
        });
    });
}

module.exports = {
    cloneRepository,
    getRepositoryPath,
    REPOSITORIES_DIR
};
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const AppError = require("../errors/AppError");

async function cloneRepository(owner, repository) {
    const cleanRepo = repository ? repository.replace(/\.git$/, "") : "";
    const repositoryPath = path.resolve(
        process.cwd(),
        "temp",
        "repositories",
        `${owner}-${cleanRepo}`
    );

    if (fs.existsSync(repositoryPath)) {
        const gitFolder = path.join(repositoryPath, ".git");
        if (fs.existsSync(gitFolder)) {
            return repositoryPath;
        }
        // Folder exists but .git missing; remove corrupted directory
        fs.rmSync(repositoryPath, { recursive: true, force: true });
    }

    fs.mkdirSync(path.dirname(repositoryPath), { recursive: true });

    return new Promise((resolve, reject) => {
        const git = spawn("git", [
            "clone",
            `https://github.com/${owner}/${cleanRepo}.git`,
            repositoryPath
        ]);

        git.stdout.on("data", (data) => {
            console.log(data.toString());
        });

        git.stderr.on("data", (data) => {
            console.log(data.toString());
        });

        git.on("error", (err) => {
            console.log("SPAWN ERROR:", err);
            if (fs.existsSync(repositoryPath)) {
                fs.rmSync(repositoryPath, { recursive: true, force: true });
            }
            reject(new AppError("Failed to clone repository. Please check the URL and try again.", 400));
        });

        git.on("close", (code) => {
            console.log("Git closed with code:", code);

            if (code === 0) {
                resolve(repositoryPath);
            } else {
                if (fs.existsSync(repositoryPath)) {
                    fs.rmSync(repositoryPath, { recursive: true, force: true });
                }
                reject(new AppError(`Failed to clone repository. Please check the repository URL and ensure it is public.`, 400));
            }
        });
    });
}

module.exports = {
    cloneRepository
};
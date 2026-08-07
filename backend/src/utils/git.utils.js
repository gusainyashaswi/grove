const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

async function cloneRepository(owner, repository) {
    const cleanRepo = repository ? repository.replace(/\.git$/, "") : "";
    const repositoryPath = path.resolve(
        process.cwd(),
        "temp",
        "repositories",
        `${owner}-${cleanRepo}`
    );

    if (fs.existsSync(repositoryPath)) {
        return repositoryPath;
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
            reject(err);
        });

        git.on("close", (code) => {
            console.log("Git closed with code:", code);

            if (code === 0) {
                resolve(repositoryPath);
            } else {
                if (fs.existsSync(repositoryPath)) {
                    fs.rmSync(repositoryPath, { recursive: true, force: true });
                }
                reject(new Error(`Git exited with code ${code}`));
            }
        });
    });
}

module.exports = {
    cloneRepository
};
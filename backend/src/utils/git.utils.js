const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

async function cloneRepository(owner, repository) {
    const repositoryPath = path.join(
        "temp",
        "repositories",
        `${owner}-${repository}`
    );

    if (fs.existsSync(repositoryPath)) {

        return repositoryPath;
    }

    return new Promise((resolve, reject) => {

        const git = spawn("git", [
            "clone",
            `https://github.com/${owner}/${repository}.git`,
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
            reject(err);
        });

        git.on("close", (code) => {

            console.log("4. Git closed with code:", code);

            if (code === 0) {
                resolve(repositoryPath);
            } else {
                reject(new Error(`Git exited with code ${code}`));
            }

        });

    });
}

module.exports = {
    cloneRepository
};
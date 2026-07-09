const { exec } = require("child_process");
const util = require("util");
const fs = require("fs");
const path = require("path");

const execAsync = util.promisify(exec);

async function cloneRepository(owner, repository) {
    const repositoryPath = path.join("temp", "repositories", `${owner}-${repository}`);
    console.log(repositoryPath);
    if(fs.existsSync(repositoryPath)){
        return repositoryPath;
    }

    const command = `git clone https://github.com/${owner}/${repository}.git ${repositoryPath}`;
    console.log(command);
    await execAsync(command);
    console.log("8. Git Command Finished");
    return repositoryPath;
}

module.exports = {
    cloneRepository
};
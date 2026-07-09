const { exec } = require("child_process");
const util = require("util");

const execAsync = util.promisify(exec);

async function cloneRepository(owner, repository) {
    const command = `git clone https://github.com/${owner}/${repository}.git temp/repositories/${owner}-${repository}`;

    const { stdout } = await execAsync(command);
    console.log(stdout);
}

module.exports = {
    cloneRepository
};
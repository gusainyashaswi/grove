const {getHealthStatus} = require("../services/health.service")

function getHealth(req, res) {
    const health = getHealthStatus()
    res.json(health)
}

module.exports = {
    getHealth
};
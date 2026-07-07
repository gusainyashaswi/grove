function getHealthStatus() {
    return {
        success: true,
        message: "Grove Backend is running"
    };
}

module.exports = {
    getHealthStatus
};
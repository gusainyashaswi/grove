const { validateRepositoryUrl } = require("../validators/repository.validator");

function validateRepository(req, res, next) {
    const error = validateRepositoryUrl(req.body?.url);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }

    next();
}

module.exports = {
    validateRepository
};
function validateRepository(req, res, next) {

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            success: false,
            message: "Repository URL is required."
        });
    }

    if(typeof url !== "string"){

        return res.status(400).json({
        success: false,
        message: "Repository URL must be a string."
        });
    }

    try {
        new URL(url)
    } catch (error) {
        return res.status(400).json({
        success: false,
        message: "Invalid URL"
        });
    }

    const parsedURL = new URL(url)

    if(parsedURL.hostname !=="github.com"){
        return res.status(400).json({
        success: false,
        message: "Only GitHub repositories are supported."
        });
    }

    const parts = parsedURL.pathname.split("/").filter(Boolean);

    if(parts.length !==2){
        return res.status(400).json({
        success: false,
        message: "Invalid GitHub repository."
        });
    }
    
    next();
}

module.exports = {
    validateRepository
};
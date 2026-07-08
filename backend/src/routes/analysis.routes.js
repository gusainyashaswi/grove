const express = require("express");

const router = express.Router();

const {analyzeRepository} = require("../controllers/analysis.controller");
const {validateRepository} = require("../middleware/validateRepository.middleware");

router.post("/analyze",validateRepository, analyzeRepository);

module.exports = router;
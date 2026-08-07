const express = require("express");
const { explainFile, summarizeRepository, answerRepositoryQuestion } = require("../controllers/ai.controller");

const router = express.Router();

router.post("/explain-file", explainFile);
router.post("/repository-summary", summarizeRepository);
router.post("/repository-question", answerRepositoryQuestion);

module.exports = router;
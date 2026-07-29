const express = require("express");
const { explainFile, summarizeRepository, } = require("../controllers/ai.controller");

const router = express.Router();

router.post("/explain-file", explainFile);
router.post("/repository-summary", summarizeRepository);

module.exports = router;
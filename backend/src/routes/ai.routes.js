const express = require("express");
const { explainFile } = require("../controllers/ai.controller");

const router = express.Router();

router.post("/explain-file", explainFile);

module.exports = router;
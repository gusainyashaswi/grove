const express = require("express");

const router = express.Router();

const {getHealth} = require("../controllers/health.controller")

route.get("/health", getHealth)

module.exports = router;
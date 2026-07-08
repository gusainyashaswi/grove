const express = require("express");
const healthRoutes = require("./routes/health.routes")
const analysisRoutes = require("./routes/analysis.routes");

const app = express();

app.use(express.json());
app.use("/api",healthRoutes)
app.use("/api", analysisRoutes)


module.exports = app;
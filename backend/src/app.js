const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/health.routes");
const analysisRoutes = require("./routes/analysis.routes");
const errorHandler = require("./middleware/error.middleware");
const aiRoutes = require("./routes/ai.routes");

const app = express();

const corsOptions = process.env.CLIENT_URL
    ? { origin: [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:3000"] }
    : {};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", healthRoutes);
app.use("/api", analysisRoutes);
app.use("/api/ai", aiRoutes);

app.use(errorHandler);

module.exports = app;
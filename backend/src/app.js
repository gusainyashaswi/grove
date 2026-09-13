const express = require("express");
const cors = require("cors");
const healthRoutes = require("./routes/health.routes");
const analysisRoutes = require("./routes/analysis.routes");
const errorHandler = require("./middleware/error.middleware");
const aiRoutes = require("./routes/ai.routes");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.CLIENT_URL,
].filter(Boolean);

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", healthRoutes);
app.use("/api", analysisRoutes);
app.use("/api/ai", aiRoutes);

app.use(errorHandler);

module.exports = app;
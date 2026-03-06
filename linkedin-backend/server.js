require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const generateRoutes = require("./routes/generate");
const postsRoutes = require("./routes/posts");
const { errorHandler, notFound } = require("./middleware/errorHandler");

connectDB();
const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ success: true, message: "API running 🚀" }));
app.use("/api/generate", generateRoutes);
app.use("/api/posts", postsRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health: http://localhost:${PORT}/health`);
});

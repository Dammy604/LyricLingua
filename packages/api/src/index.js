/**
 * LyricLingua API Server
 * Main entry point
 */

const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Routes
const lyricsRoutes = require("./routes/lyrics");
const audioRoutes = require("./routes/audio");
const communityRoutes = require("./routes/community");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const searchRoutes = require("./routes/search");
const spotifyRoutes = require("./routes/spotify");

// Middleware
const { errorHandler } = require("./middleware/errorHandler");
const { rateLimiter } = require("./middleware/rateLimit");

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

const allowedOrigins = (
  process.env.CORS_ORIGIN || "http://localhost:3000,http://localhost:8081"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow mobile apps / curl (no origin) and whitelisted origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, origin);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    },
    credentials: true,
  })
);

// Logging
app.use(morgan("dev"));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimiter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/lyrics", lyricsRoutes);
app.use("/api/audio", audioRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/spotify", spotifyRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LyricLingua API running on port ${PORT}`);
});

module.exports = app;

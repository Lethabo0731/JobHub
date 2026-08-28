const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/applications", applicationRoutes);

// Test route
app.get("/", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      console.error("Database connection failed:", err);
      return res.status(500).json({
        message: "Database connection failed"
      });
    }

    res.json({
      message: "Job Portal API is running!",
      database: "Connected successfully"
    });
  });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
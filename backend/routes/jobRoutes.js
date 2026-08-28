const express = require("express");

const {
  createJob,
  getJobs,
  getMyJobs
} = require("../controllers/jobController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get jobs belonging to logged-in employer
router.get("/my", authenticateToken, getMyJobs);

// Create a new job
router.post("/", authenticateToken, createJob);

// Get all jobs
router.get("/", getJobs);

module.exports = router;
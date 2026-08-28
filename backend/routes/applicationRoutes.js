const express = require("express");

const {
  applyForJob,
  getMyApplications,
  getEmployerApplications,
  updateApplicationStatus
} = require("../controllers/applicationController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();


// =========================
// JOB SEEKER
// =========================

// Apply for a job
router.post(
  "/",
  authenticateToken,
  applyForJob
);


// View my applications
router.get(
  "/my",
  authenticateToken,
  getMyApplications
);


// =========================
// EMPLOYER
// =========================

// View applications for my jobs
router.get(
  "/employer",
  authenticateToken,
  getEmployerApplications
);


// Accept / reject / review application
router.put(
  "/:id/status",
  authenticateToken,
  updateApplicationStatus
);


module.exports = router;
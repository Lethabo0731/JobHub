const db = require("../config/db");

// =========================
// APPLY FOR A JOB
// =========================

const applyForJob = async (req, res) => {
  try {
    const { job_id, resume_id } = req.body;

    const user_id = req.user.id;

    if (!job_id || !resume_id) {
      return res.status(400).json({
        message: "Job and resume are required"
      });
    }

    // Check that the resume belongs to the logged-in user
    const [resumes] = await db.promise().query(
      "SELECT id FROM resumes WHERE id = ? AND user_id = ?",
      [resume_id, user_id]
    );

    if (resumes.length === 0) {
      return res.status(400).json({
        message: "Invalid resume"
      });
    }

    // Check if the user already applied
    const [existingApplications] = await db.promise().query(
      "SELECT id FROM applications WHERE job_id = ? AND user_id = ?",
      [job_id, user_id]
    );

    if (existingApplications.length > 0) {
      return res.status(409).json({
        message: "You have already applied for this job"
      });
    }

    // Create application
    const [result] = await db.promise().query(
      `INSERT INTO applications
      (job_id, user_id, resume_id)
      VALUES (?, ?, ?)`,
      [job_id, user_id, resume_id]
    );

    res.status(201).json({
      message: "Application submitted successfully",
      applicationId: result.insertId
    });

  } catch (error) {
    console.error("Application error:", error);

    res.status(500).json({
      message: "Server error while submitting application"
    });
  }
};


// =========================
// GET MY APPLICATIONS
// =========================

const getMyApplications = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [applications] = await db.promise().query(
      `SELECT
        applications.id,
        applications.status,
        applications.applied_at,
        jobs.title,
        jobs.location,
        jobs.employment_type,
        companies.company_name
      FROM applications
      INNER JOIN jobs
        ON applications.job_id = jobs.id
      INNER JOIN companies
        ON jobs.company_id = companies.id
      WHERE applications.user_id = ?
      ORDER BY applications.applied_at DESC`,
      [user_id]
    );

    res.json(applications);

  } catch (error) {
    console.error("Get applications error:", error);

    res.status(500).json({
      message: "Server error while retrieving applications"
    });
  }
};


// =========================
// GET EMPLOYER APPLICATIONS
// =========================

const getEmployerApplications = async (req, res) => {
  try {
    const employerId = req.user.id;

    const [applications] = await db.promise().query(
      `
      SELECT
        applications.id,
        applications.status,
        applications.applied_at,

        users.name AS applicant_name,
        users.email AS applicant_email,

        jobs.id AS job_id,
        jobs.title AS job_title,

        resumes.file_name AS resume_file

      FROM applications

      INNER JOIN users
        ON applications.user_id = users.id

      INNER JOIN jobs
        ON applications.job_id = jobs.id

      INNER JOIN companies
        ON jobs.company_id = companies.id

      INNER JOIN resumes
        ON applications.resume_id = resumes.id

      WHERE companies.user_id = ?

      ORDER BY applications.applied_at DESC
      `,
      [employerId]
    );

    res.json(applications);

  } catch (error) {
    console.error(
      "Get employer applications error:",
      error
    );

    res.status(500).json({
      message: "Server error while retrieving employer applications"
    });
  }
};


// =========================
// UPDATE APPLICATION STATUS
// =========================

const updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    const employerId = req.user.id;

    const allowedStatuses = [
      "pending",
      "reviewing",
      "accepted",
      "rejected"
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid application status"
      });
    }

    // Make sure this application belongs to a job
    // posted by the logged-in employer
    const [applications] = await db.promise().query(
      `
      SELECT applications.id
      FROM applications

      INNER JOIN jobs
        ON applications.job_id = jobs.id

      INNER JOIN companies
        ON jobs.company_id = companies.id

      WHERE applications.id = ?
      AND companies.user_id = ?
      `,
      [applicationId, employerId]
    );

    if (applications.length === 0) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    // Update status
    await db.promise().query(
      `
      UPDATE applications
      SET status = ?
      WHERE id = ?
      `,
      [status, applicationId]
    );

    res.json({
      message: "Application status updated successfully"
    });

  } catch (error) {
    console.error(
      "Update application status error:",
      error
    );

    res.status(500).json({
      message:
        "Server error while updating application status"
    });
  }
};


// =========================
// EXPORT CONTROLLERS
// =========================

module.exports = {
  applyForJob,
  getMyApplications,
  getEmployerApplications,
  updateApplicationStatus
};
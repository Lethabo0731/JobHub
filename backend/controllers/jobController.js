const db = require("../config/db");

// =========================
// CREATE A NEW JOB
// =========================

const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      employment_type,
      salary,
      requirements
    } = req.body;

    // Check required fields
    if (!title || !description || !employment_type) {
      return res.status(400).json({
        message:
          "Title, description and employment type are required"
      });
    }

    // Get the logged-in employer's user ID
    const userId = req.user.id;

    // Find the company belonging to this employer
    const [companies] = await db.promise().query(
      "SELECT id FROM companies WHERE user_id = ?",
      [userId]
    );

    if (companies.length === 0) {
      return res.status(404).json({
        message: "No company profile found for this employer"
      });
    }

    const companyId = companies[0].id;

    // Create the job
    const [result] = await db.promise().query(
      `INSERT INTO jobs
      (
        company_id,
        title,
        description,
        location,
        employment_type,
        salary,
        requirements
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        companyId,
        title,
        description,
        location || null,
        employment_type,
        salary || null,
        requirements || null
      ]
    );

    res.status(201).json({
      message: "Job created successfully",
      jobId: result.insertId
    });

  } catch (error) {
    console.error("Create job error:", error);

    res.status(500).json({
      message: "Server error while creating job"
    });
  }
};


// =========================
// GET ALL JOBS
// =========================

const getJobs = async (req, res) => {
  try {
    const [jobs] = await db.promise().query(`
      SELECT
        jobs.id,
        jobs.title,
        jobs.description,
        jobs.location,
        jobs.employment_type,
        jobs.salary,
        jobs.requirements,
        jobs.created_at,
        companies.company_name
      FROM jobs
      JOIN companies
        ON jobs.company_id = companies.id
      ORDER BY jobs.created_at DESC
    `);

    res.json(jobs);

  } catch (error) {
    console.error("Get jobs error:", error);

    res.status(500).json({
      message: "Server error while retrieving jobs"
    });
  }
};


// =========================
// GET MY JOBS
// =========================

const getMyJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const [jobs] = await db.promise().query(
      `
      SELECT
        jobs.id,
        jobs.title,
        jobs.description,
        jobs.location,
        jobs.employment_type,
        jobs.salary,
        jobs.requirements,
        jobs.created_at,
        companies.company_name
      FROM jobs
      JOIN companies
        ON jobs.company_id = companies.id
      WHERE companies.user_id = ?
      ORDER BY jobs.created_at DESC
      `,
      [userId]
    );

    res.json(jobs);

  } catch (error) {
    console.error("Get my jobs error:", error);

    res.status(500).json({
      message: "Server error while retrieving your jobs"
    });
  }
};


// =========================
// EXPORT CONTROLLERS
// =========================

module.exports = {
  createJob,
  getJobs,
  getMyJobs
};
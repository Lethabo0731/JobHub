const db = require("../config/db");

const uploadResume = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: "User ID is required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume"
      });
    }

    const [result] = await db.promise().query(
      `INSERT INTO resumes
      (user_id, file_name, file_path)
      VALUES (?, ?, ?)`,
      [
        user_id,
        req.file.originalname,
        req.file.path
      ]
    );

    res.status(201).json({
      message: "Resume uploaded successfully",
      resumeId: result.insertId,
      fileName: req.file.originalname
    });

  } catch (error) {
    console.error("Resume upload error:", error);

    res.status(500).json({
      message: "Server error while uploading resume"
    });
  }
};

const getUserResume = async (req, res) => {
  try {
    const { userId } = req.params;

    const [resumes] = await db.promise().query(
      `SELECT id, file_name, file_path, uploaded_at
       FROM resumes
       WHERE user_id = ?
       ORDER BY uploaded_at DESC
       LIMIT 1`,
      [userId]
    );

    if (resumes.length === 0) {
      return res.status(404).json({
        message: "No resume found"
      });
    }

    res.json(resumes[0]);

  } catch (error) {
    console.error("Get resume error:", error);

    res.status(500).json({
      message: "Server error while retrieving resume"
    });
  }
};

module.exports = {
  uploadResume,
  getUserResume
};

const express = require("express");
const multer = require("multer");

const {
  uploadResume,
  getUserResume
} = require("../controllers/resumeController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;

    cb(null, uniqueName);
  }
});

const upload = multer({
  storage
});

router.post(
  "/upload",
  upload.single("resume"),
  uploadResume
);

router.get(
  "/user/:userId",
  getUserResume
);

module.exports = router;
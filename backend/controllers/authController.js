const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check that all required fields were provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    // Check if the email already exists
    const [existingUsers] = await db.promise().query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "Email is already registered"
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use job_seeker if no role was provided
    const userRole = role || "job_seeker";

    // Save the user
    const [result] = await db.promise().query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, userRole]
    );

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: result.insertId,
        name,
        email,
        role: userRole
      }
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error during registration"
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find the user
    const [users] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = users[0];

    // Compare password with hashed password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error during login"
    });
  }
};

module.exports = {
  register,
  login
};
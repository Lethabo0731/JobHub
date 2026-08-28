const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "job_portal",
  port: 3306
});

module.exports = db;
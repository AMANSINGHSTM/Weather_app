const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Aman@1234",
  database: process.env.DB_NAME || "weather_app",
});

module.exports = db;

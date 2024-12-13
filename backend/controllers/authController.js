// File: src/controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO Users (username, password_hash) VALUES (?, ?)",
      [username, hashedPassword]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "User already exists or other error", error });
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const [rows] = await db.query("SELECT * FROM Users WHERE username = ?", [
      username,
    ]);
    const user = rows[0];
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

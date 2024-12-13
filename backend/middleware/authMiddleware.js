const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Authorization required " });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

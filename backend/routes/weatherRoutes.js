const express = require("express");
const { getWeather, getReport } = require("../controllers/weatherController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/weather", authenticate, getWeather);
router.get("/report", authenticate, getReport);

module.exports = router;

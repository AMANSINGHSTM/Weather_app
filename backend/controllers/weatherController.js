// File: src/controllers/weatherController.js
const axios = require("axios");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.getWeather = async (req, res) => {
  // console.log(req.headers);
  const token = req.headers.authorization;
  console.log(token);
  if (!token) return res.status(401).json({ error: "Authorization required" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: "City is required" });

    const response = await axios.get(`http://api.weatherstack.com/current`, {
      params: {
        access_key: process.env.WEATHER_API_KEY,
        query: city,
      },
    });

    const weatherInfo = response.data;
    await db.query(
      "INSERT INTO WeatherSearches (user_id, city, weather_info) VALUES (?, ?, ?)",
      [decoded.id, city, JSON.stringify(weatherInfo)]
    );

    res.json({ city, weather: weatherInfo });
  } catch (error) {
    res.status(400).json({ error: "Error fetching weather or invalid token" });
  }
};

exports.getReport = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT Users.username, WeatherSearches.city, WeatherSearches.weather_info, WeatherSearches.searched_at
      FROM WeatherSearches
      INNER JOIN Users ON WeatherSearches.user_id = Users.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const express = require("express");
const authRoutes = require("./routes/authRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

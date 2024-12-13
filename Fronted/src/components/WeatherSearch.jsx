import { useState } from "react";
import axios from "axios";
import { useWeatherContext } from "../context/WeatherContext";

const WeatherSearch = () => {
  const { auth } = useWeatherContext();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/weather/weather",
        {
          token: auth.token,
          city,
        }
      );
      setWeather(data);
    } catch {
      alert("Error fetching weather");
    }
  };

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="City"
        className="border p-2 mr-2"
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="bg-yellow-500 text-white p-2" onClick={fetchWeather}>
        Get Weather
      </button>
      {weather && (
        <div className="my-4 p-4 border">
          <h2 className="font-bold">Weather in {city}</h2>
          <p>Temperature: {weather.current.temperature}°C</p>
          <p>Condition: {weather.current.weather_descriptions[0]}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;

import { useState } from "react";
import axios from "axios";
import { useWeatherContext } from "../context/WeatherContext";

const AuthForm = () => {
  const { setAuth } = useWeatherContext();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleAuth = async (endpoint) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/auth/${endpoint}`,
        credentials
      );
      if (endpoint === "login")
        setAuth({ token: data.token, username: credentials.username });
      alert("Success");
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Username"
        className="border p-2 mr-2"
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mr-2"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button
        className="bg-blue-500 text-white p-2"
        onClick={() => handleAuth("signup")}
      >
        Sign Up
      </button>
      <button
        className="bg-green-500 text-white p-2 ml-2"
        onClick={() => handleAuth("login")}
      >
        Login
      </button>
    </div>
  );
};

export default AuthForm;

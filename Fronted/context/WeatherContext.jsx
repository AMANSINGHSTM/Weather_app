import { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, username: "" });
  const [report, setReport] = useState([]);

  return (
    <WeatherContext.Provider value={{ auth, setAuth, report, setReport }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);

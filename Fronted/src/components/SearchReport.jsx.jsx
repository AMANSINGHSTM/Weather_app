import { useEffect } from "react";
import axios from "axios";
import { useWeatherContext } from "../context/WeatherContext";

const SearchReport = () => {
  const { report, setReport } = useWeatherContext();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost3000/api/weather/report"
        );
        setReport(data);
      } catch {
        alert("Error fetching report");
      }
    };
    fetchReport();
  }, [setReport]);

  return (
    <div className="mt-4">
      <h2 className="font-bold">Search Report</h2>
      <ul>
        {report.map((entry, index) => (
          <li key={index}>
            {entry.username} searched for {entry.city}: {entry.weather}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchReport;

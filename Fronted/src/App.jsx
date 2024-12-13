import { WeatherProvider } from "./context/WeatherContext";
import AuthForm from "./components/AuthForm";
import WeatherSearch from "./components/WeatherSearch";
import SearchReport from "./components/SearchReport";

const App = () => {
  return (
    <WeatherProvider>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Weather App</h1>
        <AuthForm />
        <WeatherSearch />
        <SearchReport />
      </div>
    </WeatherProvider>
  );
};

export default App;

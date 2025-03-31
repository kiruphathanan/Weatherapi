import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const API_KEY = "200ad8c5af66fec4b8fda113e3a3399a"; 
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  
  const [city, setCity] = useState("Dubai");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city) {
      fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        .then((res) => res.json())
        .then((data) => {
          if (data.cod === 200) {
            setWeatherData(data);
            setError(null);
          } else {
            setError(data.message);
            setWeatherData(null);
          }
        })
        .catch((err) => setError("Failed to fetch weather data"));
    }
  }, [city]);

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={() => setCity(city)}>Get Weather</button>
        
        {error && <h2>Error: {error}</h2>}
        {weatherData && (
          <div>
            <h2>{weatherData.name}</h2>
            <h3>Temperature: {weatherData.main.temp}°C</h3>
            <h3>Weather: {weatherData.weather[0].description}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
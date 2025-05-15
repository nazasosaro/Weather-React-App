import { useState } from "react";
import "./WeatherApp.css";

export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const urlBase = import.meta.env.VITE_API_URL;
  const difKelvin = 273.15;

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${urlBase}/api/weather?city=${city}`);
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error("Message error: ", error);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <>
      <div className="container">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search a city"
            value={city}
            onChange={handleCityChange}
          />
          <button type="submit">Search</button>
        </form>

        {weatherData && (
          <div>
            <h2>
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p>
              Current Temperature:{" "}
              {Math.floor(weatherData.main.temp - difKelvin)}C
            </p>
            <p>Condition: {weatherData.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
        )}
      </div>
    </>
  );
};

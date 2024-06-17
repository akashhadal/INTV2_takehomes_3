import React, { useState } from 'react';
import axios from 'axios';
import  "./weather.css";

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '16eb86b5303b437bb6e173004243101';

  const handleSearch = () => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeatherData(null);

    axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then(response => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Failed to fetch weather data');
        alert('Failed to fetch weather data');
      });
  };

  return (
    <div className="weatherApp">
      <h1>Weather App</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading data…</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h2>Temperature</h2>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h2>Humidity</h2>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h2>Condition</h2>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h2>Wind Speed</h2>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}


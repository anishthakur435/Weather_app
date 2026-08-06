import { useState, useCallback } from "react";
import { getForecast, getWeatherData, getWeatherByCoords, getForecastByCoords } from "../services/weatherApi";
import { APP_CONFIG } from "../constants/config";


export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState(APP_CONFIG.DEFAULT_CITY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSearch = useCallback(async (cityName) => {
    if (!cityName || !cityName.trim()) return;

    try {
      setLoading(true);
      setError("");

      const [weatherData, forecastData] = await Promise.all([
        getWeatherData(cityName),
        getForecast(cityName),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setCity(weatherData.name);

    } catch (err) {
      console.error(err);
      setError("Unable to fetch weather data. Please try again.");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearchByCoords = useCallback(async (lat, lon) => {
    try {
      setLoading(true);
      setError("");

      const [weatherData, forecastData] = await Promise.all([
        getWeatherByCoords(lat, lon),
        getForecastByCoords(lat, lon),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setCity(weatherData.name);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch local weather data. Please try again.");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const initWeather = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleSearchByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          console.warn("Geolocation denied or failed, falling back to default city.");
          handleSearch(APP_CONFIG.DEFAULT_CITY);
        },
        { timeout: 5000 }
      );
    } else {
      handleSearch(APP_CONFIG.DEFAULT_CITY);
    }
  }, [handleSearch, handleSearchByCoords]);

  return {
    weather,
    forecast,
    city,
    loading,
    error,
    handleSearch,
    handleSearchByCoords,
    initWeather,
  };
}

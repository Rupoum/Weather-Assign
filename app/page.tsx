"use client";

import { useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import WeatherCard from "@/components/weather-card";
import ForecastSection from "@/components/forecast-section";
import RecentSearches from "@/components/recent-searches";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import Link from "next/link";

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useLocalStorage(
    "recentSearches",
    []
  );

  const fetchWeather = async (cityName) => {
    if (!cityName) return;

    setLoading(true);
    setError("");

    try {
      const weatherResponse = await fetch(
        `/api/weather?city=${encodeURIComponent(cityName)}`
      );

      if (!weatherResponse.ok) {
        throw new Error("City not found or API error");
      }

      const weatherResult = await weatherResponse.json();
      setWeatherData(weatherResult);

      // Fetch 5-day forecast
      const forecastResponse = await fetch(
        `/api/forecast?city=${encodeURIComponent(cityName)}`
      );

      if (forecastResponse.ok) {
        const forecastResult = await forecastResponse.json();
        setForecastData(forecastResult);
      }

      // uPdate recent search
      updateRecentSearches(cityName);
    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const updateRecentSearches = (cityName) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== cityName.toLowerCase()
      );
      return [cityName, ...filtered].slice(0, 5);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const handleRecentSearch = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  const refreshWeather = () => {
    if (weatherData) {
      fetchWeather(weatherData.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex-grow">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Weather
        </motion.h1>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              Search
            </button>
          </form>
        </motion.div>

        {recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <RecentSearches
              searches={recentSearches}
              onSelect={handleRecentSearch}
            />
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingState />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ErrorState message={error} />
            </motion.div>
          ) : weatherData ? (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={refreshWeather}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>

              <WeatherCard data={weatherData} />

              {forecastData && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <ForecastSection data={forecastData} />
                </motion.div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="flex justify-end text-center mb-2">
        <h2 className="text-xs  mr-3  ">
          created by{" "}
          <span className="ml-2">
            <Link className="text-lg " href={"https://github.com/Rupoum"}>
              Rupoum
            </Link>
          </span>
        </h2>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

export default function ForecastSection({ data }) {
  if (!data?.list) return null;

  const dailyForecast = Object.values(
    data.list.reduce((acc, item) => {
      const day = new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      });
      acc[day] = acc[day] || [];
      acc[day].push(item);
      return acc;
    }, {})
  ).map((items) => {
    const avgTemp = Math.round(
      items.reduce((sum, item) => sum + item.main.temp, 0) / items.length
    );
    const middleItem = items[Math.floor(items.length / 2)];
    return {
      day: new Date(middleItem.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      avgTemp,
      icon: middleItem.weather[0].icon,
      description: middleItem.weather[0].description,
    };
  });

  // limiting to 5
  const sortedForecast = dailyForecast.slice(0, 5);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6">5-Day Forecast</h3>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {sortedForecast.map((forecast, index) => (
          <motion.div
            key={index}
            className="bg-gray-800/50 rounded-xl p-4 flex flex-col items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <span className="font-medium text-lg">{forecast.day}</span>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
              alt={forecast.description}
              className="w-16 h-16 my-2"
            />
            <span className="text-2xl font-bold">{forecast.avgTemp}°</span>
            <span className="text-xs text-gray-400 text-center mt-1">
              {forecast.description}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

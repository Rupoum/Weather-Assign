"use client";

import { Droplets, Wind, Thermometer, Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function WeatherCard({ data }) {
  if (!data) return null;

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather: [{ description, icon }],
    wind: { speed, deg },
    sys: { country },
  } = data;

  const temperature = Math.round(temp);
  const feelsLike = Math.round(feels_like);
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 mb-8"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">{name}</h2>
        <p className="text-gray-400">{country}</p>
        <div className="flex items-center justify-center mt-4">
          <span className="text-6xl font-bold">{temperature}°</span>
          <div className="ml-4 text-left">
            <p className="text-xl capitalize">{description}</p>
            <p className="text-gray-400">Feels like {feelsLike}°</p>
          </div>
        </div>
      </div>
      <motion.img
        src={iconUrl}
        alt={description}
        className="w-32 h-32 mx-auto mb-6"
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InfoCard
          icon={<Thermometer size={18} />}
          label="Pressure"
          value={`${pressure} hPa`}
        />
        <InfoCard
          icon={<Droplets size={18} />}
          label="Humidity"
          value={`${humidity}%`}
        />
        <InfoCard
          icon={<Wind size={18} />}
          label="Wind Speed"
          value={`${speed} km/h`}
        />
        <InfoCard
          icon={<Compass size={18} />}
          label="Wind Direction"
          value={` ${deg} °`}
        />
      </div>
    </motion.div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-gray-800/50 p-4 rounded-xl text-center">
      <div className="flex items-center justify-center gap-2 text-blue-400 mb-2">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}

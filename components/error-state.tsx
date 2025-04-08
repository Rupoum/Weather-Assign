"use client"

import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function ErrorState({ message }) {
  return (
    <motion.div
      className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center my-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center mb-4">
        <AlertCircle size={48} className="text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-red-500 mb-2">Error</h3>
      <p className="text-gray-300">{message || "Failed to fetch weather data. Please try again."}</p>
      <p className="text-gray-400 mt-4 text-sm">Please check the city name and try again, or try a different city.</p>
    </motion.div>
  )
}

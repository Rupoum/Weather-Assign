"use client"

import { motion } from "framer-motion"

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <p className="mt-4 text-gray-400">Fetching weather data...</p>
    </div>
  )
}

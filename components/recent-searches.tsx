"use client"

import { motion } from "framer-motion"
import { History } from "lucide-react"

export default function RecentSearches({ searches, onSelect }) {
  if (!searches || searches.length === 0) return null

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <History size={16} className="text-gray-400" />
        <h3 className="text-sm font-medium text-gray-400">Recent Searches</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {searches.map((city, index) => (
          <motion.button
            key={city}
            onClick={() => onSelect(city)}
            className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors duration-200"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {city}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

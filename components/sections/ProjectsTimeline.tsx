'use client'

import { motion } from "framer-motion"
import { useTheme } from "../ThemeProvider"
import { Cpu, Building2, Wrench, Droplets, Settings, Home } from "lucide-react"

const timeline = [
  { year: "2019", project: "Installation d’ascenseurs modernes", result: "12 bâtiments équipés", icon: Home },
  { year: "2020", project: "Construction métallique industrielle", result: "15 structures réalisées", icon: Building2 },
  { year: "2021", project: "Système d’irrigation automatisé", result: "80 hectares modernisés", icon: Droplets },
  { year: "2022", project: "Ajustage et machines outils", result: "30 ateliers équipés", icon: Wrench },
  { year: "2023", project: "Solutions domotiques", result: "25 bâtiments connectés", icon: Settings },
  { year: "2024", project: "Domotique et TIC", result: "50 installations complètes", icon: Cpu },
]

export default function ProjectsTimeline() {
  const { darkMode } = useTheme()

  return (
    <section className={`relative w-full py-28 px-6 transition-colors duration-500 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      
      {/* Ruban central */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-2 md:w-1 h-full rounded-full z-0
        ${darkMode ? "bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" : "bg-gray-200/50"}`} 
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Titre */}
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-20 transition-colors duration-500
          ${darkMode ? "text-white" : "text-blue-600"}`}>
          Historique & Réalisations
        </h2>

        <div className="relative">
          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -120 : 120 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative mb-16 w-full md:w-1/2 ${isLeft ? "md:left-0 md:pr-10" : "md:left-1/2 md:pl-10"}`}
              >
                {/* Point sur le ruban */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-10 shadow-md border-4
                  ${darkMode ? "bg-blue-500 border-gray-900" : "bg-blue-600 border-white"}`}
                />

                {/* Carte */}
                <motion.div
                  whileHover={{ rotateX: 4, rotateY: isLeft ? -4 : 4, scale: 1.05 }}
                  className={`p-6 rounded-3xl shadow-lg relative z-20 transition-all duration-300 cursor-pointer
                    ${darkMode ? "bg-gray-800" : "bg-white"}`
                  }
                >
                  <div className="flex items-center gap-4 mb-3">
                    <Icon className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                    <span className={`font-bold text-xl transition-colors duration-500
                      ${darkMode ? "text-white" : "text-blue-600"}`}>{item.year}</span>
                  </div>
                  <h3 className={`text-lg md:text-xl font-semibold mb-1 transition-colors duration-500
                    ${darkMode ? "text-white" : "text-black"}`}>{item.project}</h3>
                  <p className={`text-sm md:text-base transition-colors duration-500
                    ${darkMode ? "text-gray-300" : "text-gray-800"}`}>{item.result}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { Cpu, Building2, Wrench, Droplets, Settings, Home } from "lucide-react";

const timeline = [
  {
    year: "2019",
    project: "Installation d’ascenseurs modernes",
    result: "12 bâtiments équipés",
    icon: Home,
  },
  {
    year: "2020",
    project: "Construction métallique industrielle",
    result: "15 structures réalisées",
    icon: Building2,
  },
  {
    year: "2021",
    project: "Système d’irrigation automatisé",
    result: "80 hectares modernisés",
    icon: Droplets,
  },
  {
    year: "2022",
    project: "Ajustage et machines outils",
    result: "30 ateliers équipés",
    icon: Wrench,
  },
  {
    year: "2023",
    project: "Solutions domotiques",
    result: "25 bâtiments connectés",
    icon: Settings,
  },
  {
    year: "2024",
    project: "Domotique et TIC",
    result: "50 installations complètes",
    icon: Cpu,
  },
];

export default function ProjectsTimeline() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className={`relative py-32 px-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}
    >
      {/* ligne timeline */}
      <div
        className={`absolute left-1/2 top-0 -translate-x-1/2 w-[3px] h-full ${
          darkMode ? "bg-gray-700" : "bg-blue-100"
        }`}
      />

      {/* ligne active */}
      <motion.div
        style={{ height }}
        className={`absolute left-1/2 top-0 -translate-x-1/2 w-[3px] ${
          darkMode
            ? "bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 shadow-[0_0_25px_#3b82f6]"
            : "bg-blue-600"
        }`}
      />

      <div className="max-w-7xl mx-auto relative">
        <h2
          className={`text-center text-4xl md:text-5xl font-bold mb-24 ${
            darkMode ? "text-white" : "text-blue-600"
          }`}
        >
          Historique & Réalisations
        </h2>

        <div className="space-y-24">
          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -120 : 120 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                {/* point timeline */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 z-20 ${
                    darkMode
                      ? "bg-blue-500 border-gray-900"
                      : "bg-blue-600 border-white"
                  }`}
                />

                {/* card */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotateX: 4,
                    rotateY: isLeft ? -4 : 4,
                  }}
                  className={`w-full md:w-[45%] p-7 rounded-3xl shadow-xl transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <div
                    className={`flex items-center gap-4 mb-3 ${
                      isLeft ? "justify-start" : "justify-end"
                    }`}
                  >
                    {isLeft && (
                      <Icon
                        className={`${darkMode ? "text-blue-400" : "text-white"} w-7 h-7`}
                      />
                    )}

                    <span className="font-bold text-xl">{item.year}</span>

                    {!isLeft && (
                      <Icon
                        className={`${darkMode ? "text-blue-400" : "text-white"} w-7 h-7`}
                      />
                    )}
                  </div>

                  <h3
                    className={`text-lg md:text-xl font-semibold mb-2 ${
                      isLeft ? "text-left" : "text-right"
                    }`}
                  >
                    {item.project}
                  </h3>

                  <p
                    className={`text-sm md:text-base ${
                      darkMode ? "text-gray-300" : "text-blue-100"
                    } ${isLeft ? "text-left" : "text-right"}`}
                  >
                    {item.result}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

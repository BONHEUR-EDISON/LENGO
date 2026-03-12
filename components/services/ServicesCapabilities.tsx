'use client';

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const capabilities = [
  {
    title: "Automatisation industrielle",
    value: 95,
    description:
      "Systèmes intelligents pour maximiser la productivité et la précision des opérations industrielles.",
  },
  {
    title: "Structures métalliques",
    value: 90,
    description:
      "Conception et fabrication de structures robustes et modulaires pour les infrastructures modernes.",
  },
  {
    title: "Ascenseurs intelligents",
    value: 88,
    description:
      "Solutions d’élévation avancées intégrant sécurité, monitoring et automatisation.",
  },
  {
    title: "Domotique avancée",
    value: 92,
    description:
      "Technologies smart building pour un contrôle intelligent et centralisé des infrastructures.",
  },
];

export default function Capabilities() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <section
      className={`relative w-full py-28 overflow-hidden ${
        isDark ? "bg-[#0f111a] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Glow elements */}
      <div
        className={`absolute -top-40 left-[-200px] w-[600px] h-[600px] rounded-full blur-[200px] ${
          isDark ? "bg-blue-500/20" : "bg-blue-300/20"
        }`}
      />
      <div
        className={`absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full blur-[200px] ${
          isDark ? "bg-purple-600/20" : "bg-purple-400/20"
        }`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Nos Capacités d’Ingénierie
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto text-lg`}>
            Lengo Engineering conçoit des solutions techniques innovantes pour bâtir les infrastructures de demain, alliant fiabilité, performance et design intelligent.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`${
                isDark ? "bg-white/5 border-white/10" : "bg-gray-100/50 border-gray-200/30"
              } backdrop-blur-xl rounded-3xl p-8`}
            >
              <div className="flex justify-between mb-3">
                <h3 className={`${isDark ? "text-white" : "text-gray-900"} text-xl font-semibold`}>
                  {cap.title}
                </h3>
                <span className="text-cyan-400 font-semibold">{cap.value}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${cap.value}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                />
              </div>

              <p className={`${isDark ? "text-gray-400" : "text-gray-700"} leading-relaxed text-sm md:text-base`}>
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
'use client'

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function HeroWow() {
 const { theme } = useTheme();
   const [mounted, setMounted] = useState(false);
 
   useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Priorité : thème choisi par l'utilisateur > thème système > sombre par défaut
  //const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = theme === "dark";

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center text-center overflow-hidden ${
        isDark ? "bg-[#0f111a] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 opacity-30 blur-3xl"></div>

      {/* content */}
      <div className="relative z-10 max-w-5xl px-6">
        <motion.h1
          initial={{opacity:0,y:60}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.9}}
          className="text-6xl md:text-7xl font-bold leading-tight"
        >
          L’ingénierie moderne
          pour construire le futur
        </motion.h1>

        <motion.p
          initial={{opacity:0,y:60}}
          animate={{opacity:1,y:0}}
          transition={{delay:0.2}}
          className="mt-6 text-lg text-gray-600 dark:text-gray-300"
        >
          Automatisation, construction métallique,
          TIC et solutions industrielles innovantes.
        </motion.p>

        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:0.5}}
          className="mt-10 flex justify-center gap-6"
        >
          <button className="px-8 py-4 rounded-xl bg-black text-white">
            Découvrir
          </button>

          <button className="px-8 py-4 rounded-xl border">
            Nos projets
          </button>
        </motion.div>
      </div>
    </section>
  );
}
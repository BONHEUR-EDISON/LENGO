"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function ProjectHero() {
  const { theme } = useTheme();

  const textColor = theme === "dark" ? "text-white" : "text-black";
  const overlayOpacity = theme === "dark" ? "opacity-50" : "opacity-70";
  const spanColor = theme === "dark" ? "text-blue-400" : "text-blue-500";

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      
      {/* Background image/video */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/projects/bg-p.jpg"
          alt="Projets background"
          className={`w-full h-full object-cover ${overlayOpacity}`}
        />
        {/* Pour une vidéo, remplacer l'image par :
        <video autoPlay muted loop className={`w-full h-full object-cover ${overlayOpacity}`}>
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        */}
        <div className={`absolute inset-0 bg-black ${overlayOpacity}`}></div>
      </div>

      {/* Texte principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl"
      >
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight ${textColor}`}>
          Nos <span className={spanColor}>Projets</span>
        </h1>
        <p className={`text-base sm:text-lg md:text-xl mb-8 ${theme === "dark" ? "text-white/80" : "text-black/70"}`}>
          Explorez nos réalisations innovantes qui transforment des idées en solutions concrètes.  
          Chaque projet reflète notre expertise et notre passion pour la technologie.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#projects-grid"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition"
          >
            Voir nos projets
          </a>
          <a
            href="#contact"
            className={`px-6 py-3 border ${textColor} hover:bg-white hover:text-black font-semibold rounded-lg transition`}
          >
            Nous contacter
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="block w-3 h-3 rounded-full bg-white mb-1 animate-bounce"></span>
        <span className="text-white/80 text-sm">Scroll</span>
      </motion.div>
    </section>
  );
}
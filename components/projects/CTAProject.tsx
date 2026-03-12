"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function CTAProject() {
  const { theme } = useTheme();

  const buttonBg = theme === "dark" ? "bg-white" : "bg-white";
  const buttonText = theme === "dark" ? "text-indigo-900" : "text-blue-600";
  const gradientFrom = theme === "dark" ? "from-indigo-900" : "from-blue-600";
  const gradientTo = theme === "dark" ? "to-blue-800" : "to-indigo-600";

  return (
    <section
      className={`mt-12 py-24 px-6 text-center bg-gradient-to-r ${gradientFrom} ${gradientTo} relative overflow-hidden`}
    >
      {/* Particules ou overlay subtil Tesla/Apple */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="w-80 h-80 bg-white/10 rounded-full blur-3xl absolute top-10 left-1/4"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 bg-white/10 rounded-full blur-3xl absolute bottom-0 right-1/3"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Discutons de votre projet
        </h2>

        <p className="text-white/80 mb-8 text-lg md:text-xl leading-relaxed">
          Notre équipe peut vous accompagner dans la conception et la réalisation
          de vos infrastructures techniques, industrielles et domotiques avancées.
        </p>

        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          className={`inline-block px-8 py-4 ${buttonBg} ${buttonText} rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          Demander un devis
        </motion.a>
      </motion.div>
    </section>
  );
}
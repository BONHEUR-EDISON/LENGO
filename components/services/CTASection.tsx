'use client';

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function CTASection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <section
      className={`py-24 px-6 text-center ${
        isDark
          ? "bg-gradient-to-r from-indigo-900 to-blue-800"
          : "bg-gradient-to-r from-blue-600 to-indigo-600"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`inline-block px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 ${
            isDark
              ? "bg-white text-indigo-800 hover:shadow-xl"
              : "bg-white text-blue-600 hover:shadow-xl"
          }`}
        >
          Demander un devis
        </motion.a>
      </motion.div>
    </section>
  );
}
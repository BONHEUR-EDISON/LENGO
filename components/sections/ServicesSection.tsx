'use client';

import { motion } from "framer-motion";
import { ArrowRight, Zap, Settings, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const services = [
  {
    icon: <Zap className="w-8 h-8 text-blue-500" />,
    title: "Ascenseurs intelligents",
    description:
      "Conception et installation d’ascenseurs automatisés pour bâtiments modernes et industriels.",
  },
  {
    icon: <Settings className="w-8 h-8 text-purple-500" />,
    title: "Construction métallique",
    description:
      "Structures métalliques robustes, modulaires et optimisées pour tous types d’infrastructures.",
  },
  {
    icon: <Eye className="w-8 h-8 text-green-500" />,
    title: "Automatisation industrielle",
    description:
      "Solutions d’automatisation pour améliorer productivité, sécurité et fiabilité des processus industriels.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-yellow-500" />,
    title: "Domotique avancée",
    description:
      "Intégration de systèmes intelligents pour bâtiments résidentiels et commerciaux.",
  },
];

export default function ServicesSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <section
      id="services"
      className={`relative w-full py-28 overflow-hidden ${
        isDark ? "bg-[#0f111a] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Background Grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        animate={{ backgroundPosition: ["0 0", "80px 80px", "0 0"] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow Blobs Animated */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
        className={`absolute -top-32 left-[-100px] w-[400px] h-[400px] blur-[140px] rounded-full ${
          isDark ? "bg-blue-700/20" : "bg-blue-500/20"
        }`}
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ repeat: Infinity, duration: 140, ease: "linear" }}
        className={`absolute bottom-[-180px] right-[-120px] w-[500px] h-[500px] blur-[160px] rounded-full ${
          isDark ? "bg-purple-800/20" : "bg-purple-600/20"
        }`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"
        >
          Nos Services d’Ingénierie
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`max-w-2xl mx-auto mb-16 text-lg ${
            isDark ? "text-gray-300" : "text-gray-500"
          }`}
        >
          Des solutions modernes combinant ingénierie mécanique, automatisation et technologies intelligentes pour les bâtiments et industries du futur.
        </motion.p>

        {/* Services Grid */}
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <motion.div
                whileHover={{ scale: 1.07 }}
                className={`relative border rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-500 ${
                  isDark
                    ? "bg-white/5 border-white/10 hover:shadow-[0_0_60px_rgba(0,0,0,0.15)]"
                    : "bg-white border-gray-200 hover:shadow-[0_0_40px_rgba(0,0,0,0.1)]"
                }`}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className={`mb-6 w-14 h-14 flex items-center justify-center rounded-xl border border-white/10 transition ${
                    isDark
                      ? "bg-gradient-to-br from-cyan-700/20 to-blue-900/20"
                      : "bg-gradient-to-br from-cyan-400/20 to-blue-500/20"
                  }`}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>

                {/* Description */}
                <p
                  className={`text-sm md:text-base leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {service.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-all"
          >
            En savoir plus
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
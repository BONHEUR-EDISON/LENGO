'use client';

import { motion } from "framer-motion";
import { HardDrive, Cpu, ArrowUp, Home, Network, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const services = [
  {
    title: "Construction métallique",
    desc: "Structures industrielles, hangars et bâtiments métalliques pour infrastructures modernes.",
    icon: <HardDrive className="w-10 h-10" />
  },
  {
    title: "Automatisation industrielle",
    desc: "Systèmes intelligents pour optimiser la production et les processus industriels.",
    icon: <Cpu className="w-10 h-10" />
  },
  {
    title: "Ascenseurs intelligents",
    desc: "Installation et maintenance d’ascenseurs modernes pour bâtiments professionnels.",
    icon: <ArrowUp className="w-10 h-10" />
  },
  {
    title: "Domotique",
    desc: "Bâtiments connectés et systèmes intelligents pour maisons modernes.",
    icon: <Home className="w-10 h-10" />
  },
  {
    title: "Solutions TIC",
    desc: "Infrastructure réseau, sécurité et technologies pour entreprises.",
    icon: <Network className="w-10 h-10" />
  },
  {
    title: "Maintenance industrielle",
    desc: "Maintenance technique et optimisation des équipements industriels.",
    icon: <Wrench className="w-10 h-10" />
  },
];

export default function ServicesList() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // évite le mismatch SSR/CSR

  const isDark = theme === "dark";

  return (
    <section className={`relative py-24 px-6 overflow-hidden ${isDark ? "bg-[#0f111a]" : "bg-slate-50"}`}>
      
      {/* Glow animated background blobs */}
      <div className={`absolute -top-40 -left-40 w-[400px] h-[400px] blur-[140px] rounded-full animate-spin-slow pointer-events-none ${isDark ? "bg-blue-500/20" : "bg-blue-500/10"}`} />
      <div className={`absolute -bottom-40 -right-40 w-[500px] h-[500px] blur-[160px] rounded-full animate-spin-slow pointer-events-none ${isDark ? "bg-purple-600/20" : "bg-purple-500/10"}`} />

      {/* Subtle engineering grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-5xl font-extrabold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
            Nos Expertises
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Nous développons des solutions d’ingénierie avancées pour l’industrie, les bâtiments intelligents et les infrastructures modernes.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className={`group relative p-8 rounded-2xl border backdrop-blur-lg hover:shadow-xl hover:scale-[1.05] transition-all duration-300
                ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"}`}
            >
              {/* Icon with glow hover */}
              <div className="mb-4 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10, filter: "drop-shadow(0 0 12px rgba(0,150,255,0.5))" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`${isDark ? "text-white" : ""}`}
                >
                  {service.icon}
                </motion.div>
              </div>

              <h3 className={`text-xl font-semibold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>
                {service.title}
              </h3>
              <p className={`leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg"
            >
              Voir nos projets
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
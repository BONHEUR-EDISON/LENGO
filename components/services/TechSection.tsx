'use client';

import { motion } from "framer-motion";
import { Cpu, Wifi, Home, HardDrive, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const technologies = [
  { title: "Automatisation industrielle", icon: <Cpu className="w-10 h-10" /> },
  { title: "IoT & Domotique", icon: <Home className="w-10 h-10" /> },
  { title: "Réseaux intelligents", icon: <Wifi className="w-10 h-10" /> },
  { title: "Structures métalliques modernes", icon: <HardDrive className="w-10 h-10" /> },
  { title: "Énergie & Performance", icon: <Zap className="w-10 h-10" /> },
];

export default function TechSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <section className={`relative py-24 px-6 overflow-hidden ${isDark ? "bg-[#0f111a]" : "bg-slate-50"}`}>
      
      {/* Glow blobs */}
      <div className={`absolute -top-40 -left-40 w-[400px] h-[400px] blur-[140px] rounded-full pointer-events-none ${isDark ? "bg-blue-500/20" : "bg-blue-500/10"} animate-spin-slow`} />
      <div className={`absolute -bottom-40 -right-40 w-[500px] h-[500px] blur-[160px] rounded-full pointer-events-none ${isDark ? "bg-purple-600/20" : "bg-purple-500/10"} animate-spin-slow`} />

      <div className="relative max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-5xl font-extrabold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}
        >
          Technologies utilisées
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={`text-lg max-w-3xl mx-auto ${isDark ? "text-slate-400" : "text-gray-600"}`}
        >
          Automatisation industrielle, IoT, réseaux intelligents, structures métalliques modernes et systèmes domotiques avancés.
        </motion.p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {technologies.map((tech, i) => (
          <motion.div
            key={tech.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative group rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300
              ${isDark ? "bg-white/5 border border-white/10 hover:shadow-xl" : "bg-white border border-slate-200 hover:shadow-xl hover:scale-[1.03]"}`}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 10, filter: "drop-shadow(0 0 12px rgba(0,150,255,0.5))" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mb-4"
            >
              {tech.icon}
            </motion.div>
            <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{tech.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
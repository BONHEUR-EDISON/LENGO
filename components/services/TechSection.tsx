'use client';

import { motion } from "framer-motion";
import { Cpu, Wifi, Home, HardDrive, Zap } from "lucide-react";

const technologies = [
  { title: "Automatisation industrielle", icon: <Cpu className="w-10 h-10 text-blue-500 dark:text-cyan-400" /> },
  { title: "IoT & Domotique", icon: <Home className="w-10 h-10 text-purple-500 dark:text-purple-400" /> },
  { title: "Réseaux intelligents", icon: <Wifi className="w-10 h-10 text-green-500 dark:text-green-400" /> },
  { title: "Structures métalliques modernes", icon: <HardDrive className="w-10 h-10 text-yellow-500 dark:text-yellow-400" /> },
  { title: "Énergie & Performance", icon: <Zap className="w-10 h-10 text-red-500 dark:text-red-400" /> },
];

export default function TechSection() {
  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-[#0f111a] overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white"
        >
          Technologies utilisées
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
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
            className="bg-white/5 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center text-center hover:scale-[1.03] hover:shadow-xl transition-all duration-300"
          >
            <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }} className="mb-4">
              {tech.icon}
            </motion.div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{tech.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
'use client';

import { motion } from "framer-motion";
import { HardDrive, Cpu, ArrowUp, Home, Network, Wrench } from "lucide-react";

const services = [
  {
    title: "Construction métallique",
    desc: "Structures industrielles, hangars et bâtiments métalliques pour infrastructures modernes.",
    icon: <HardDrive className="w-10 h-10 text-blue-600 dark:text-cyan-400" />
  },
  {
    title: "Automatisation industrielle",
    desc: "Systèmes intelligents pour optimiser la production et les processus industriels.",
    icon: <Cpu className="w-10 h-10 text-purple-600 dark:text-purple-400" />
  },
  {
    title: "Ascenseurs intelligents",
    desc: "Installation et maintenance d’ascenseurs modernes pour bâtiments professionnels.",
    icon: <ArrowUp className="w-10 h-10 text-green-500 dark:text-green-400" />
  },
  {
    title: "Domotique",
    desc: "Bâtiments connectés et systèmes intelligents pour maisons modernes.",
    icon: <Home className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
  },
  {
    title: "Solutions TIC",
    desc: "Infrastructure réseau, sécurité et technologies pour entreprises.",
    icon: <Network className="w-10 h-10 text-blue-500 dark:text-cyan-300" />
  },
  {
    title: "Maintenance industrielle",
    desc: "Maintenance technique et optimisation des équipements industriels.",
    icon: <Wrench className="w-10 h-10 text-red-500 dark:text-red-400" />
  },
];

export default function ServicesList() {
  return (
    <section className="relative py-24 px-6 bg-slate-50 dark:bg-[#0f111a] overflow-hidden">
      {/* Subtle engineering grid background */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]">
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
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Nos Expertises
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
            Nous développons des solutions d’ingénierie avancées pour
            l’industrie, les bâtiments intelligents et les infrastructures modernes.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl border border-slate-200 dark:border-white/10
                bg-white dark:bg-white/5 backdrop-blur-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-4 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.icon}
                </motion.div>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
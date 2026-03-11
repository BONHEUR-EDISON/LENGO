'use client';

import { motion } from "framer-motion";
import { Search, Layout, Cpu, Wrench } from "lucide-react";

const steps = [
  {
    title: "Analyse",
    desc: "Étude technique complète du projet et définition des besoins spécifiques.",
    icon: <Search className="w-10 h-10 text-blue-500 dark:text-cyan-400" />
  },
  {
    title: "Conception",
    desc: "Architecture et plan d’ingénierie adaptés à vos infrastructures.",
    icon: <Layout className="w-10 h-10 text-purple-500 dark:text-purple-400" />
  },
  {
    title: "Déploiement",
    desc: "Installation professionnelle et mise en service de vos systèmes.",
    icon: <Cpu className="w-10 h-10 text-green-500 dark:text-green-400" />
  },
  {
    title: "Maintenance",
    desc: "Suivi technique, optimisation et support continu.",
    icon: <Wrench className="w-10 h-10 text-red-500 dark:text-red-400" />
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-[#0f111a] overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-12 text-slate-900 dark:text-white"
        >
          Notre Processus
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/5 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-8 flex flex-col items-center text-center hover:scale-[1.03] hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4">
                <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                  {step.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
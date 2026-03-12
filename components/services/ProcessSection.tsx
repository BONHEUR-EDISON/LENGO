'use client';

import { motion } from "framer-motion";
import { Search, Layout, Cpu, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const steps = [
  {
    title: "Analyse",
    desc: "Étude technique complète du projet et définition des besoins spécifiques.",
    icon: <Search className="w-10 h-10" />
  },
  {
    title: "Conception",
    desc: "Architecture et plan d’ingénierie adaptés à vos infrastructures.",
    icon: <Layout className="w-10 h-10" />
  },
  {
    title: "Déploiement",
    desc: "Installation professionnelle et mise en service de vos systèmes.",
    icon: <Cpu className="w-10 h-10" />
  },
  {
    title: "Maintenance",
    desc: "Suivi technique, optimisation et support continu.",
    icon: <Wrench className="w-10 h-10" />
  },
];

export default function ProcessSection() {
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

      <div className="relative max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-5xl font-extrabold mb-12 ${isDark ? "text-white" : "text-slate-900"}`}
        >
          Notre Processus
        </motion.h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">

          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center">

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 60, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, type: "spring", stiffness: 100 }}
                className={`group relative p-8 rounded-2xl border backdrop-blur-lg hover:shadow-xl hover:scale-[1.05] transition-all duration-300
                  ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"}`}
              >
                <div className="mb-4 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10, filter: "drop-shadow(0 0 12px rgba(0,150,255,0.5))" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>{step.title}</h3>
                <p className={`leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>{step.desc}</p>
              </motion.div>

              {/* Animated arrow to next step */}
              {i < steps.length - 1 && (
                <motion.div
                  className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex items-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isDark ? "white" : "black"}
                    strokeWidth={2}
                    className="w-12 h-6 animate-bounce"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </motion.svg>
                </motion.div>
              )}

            </div>
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
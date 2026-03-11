'use client'

import { motion } from "framer-motion"

export default function ServicesHero() {
  return (
    <section className="relative flex items-center justify-center min-h-[70vh] px-6 overflow-hidden text-center">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br 
        from-slate-100 via-white to-slate-200
        dark:from-[#0f111a] dark:via-black dark:to-indigo-950" />

      {/* GRID ENGINEERING */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)"
          }}
        />
      </div>

      {/* GLOW */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-blue-500/20 blur-[140px] rounded-full dark:bg-blue-500/30" />
      <div className="absolute -bottom-40 -right-40 w-[550px] h-[550px] bg-purple-500/20 blur-[160px] rounded-full dark:bg-purple-600/30" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold mb-6
          text-slate-900 dark:text-white"
        >
          Nos Services d’Ingénierie
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl leading-relaxed
          text-slate-600 dark:text-white/70"
        >
          Conception et réalisation de solutions avancées pour
          <span className="text-blue-600 dark:text-cyan-400"> l’automatisation industrielle</span>,
          la <span className="text-blue-600 dark:text-cyan-400"> construction métallique</span>,
          les <span className="text-blue-600 dark:text-cyan-400"> ascenseurs intelligents</span>
          et les <span className="text-blue-600 dark:text-cyan-400"> bâtiments connectés</span>.
        </motion.p>

      </div>

    </section>
  )
}
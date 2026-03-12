"use client";

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"

export default function ServicesHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = theme === "dark"

  const { scrollY } = useScroll()
  const yTitle = useTransform(scrollY, [0, 300], [0, 25])
  const yText = useTransform(scrollY, [0, 300], [0, 15])

  if (!mounted) return <div className="min-h-[70vh]" />

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center min-h-[70vh] px-6 overflow-hidden text-center"
    >

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/services/bg-s.webp" // ton image de fond ici
          alt="Background Services"
          className="w-full h-full object-cover"
        />
        {/* Overlay sombre pour contraste texte */}
        <div className={`absolute inset-0 ${isDark ? "bg-black/50" : "bg-white/30"}`} />
      </div>

      {/* GLOW BLOBS ANIMATED */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
        className={`absolute -top-40 -left-40 w-[450px] h-[450px] blur-[140px] rounded-full ${isDark ? "bg-blue-500/30" : "bg-blue-500/20"}`}
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ repeat: Infinity, duration: 140, ease: "linear" }}
        className={`absolute -bottom-40 -right-40 w-[550px] h-[550px] blur-[160px] rounded-full ${isDark ? "bg-purple-600/30" : "bg-purple-500/20"}`}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl">

        {/* TITLE WITH PARALLAX */}
        <motion.h1
          style={{ y: yTitle }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`text-4xl md:text-6xl font-extrabold mb-6 ${isDark ? "text-white" : "text-slate-900"}`}
        >
          Nos Services d’Ingénierie
        </motion.h1>

        {/* PARAGRAPH WITH HIGHLIGHT AND PARALLAX */}
        <motion.p
          style={{ y: yText }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-lg md:text-xl leading-relaxed ${isDark ? "text-white/80" : "text-slate-700"}`}
        >
          Conception et réalisation de solutions avancées pour{" "}
          <span className="text-blue-600 dark:text-cyan-400 font-semibold">
            l’automatisation industrielle
          </span>, la{" "}
          <span className="text-blue-600 dark:text-cyan-400 font-semibold">
            construction métallique
          </span>, les{" "}
          <span className="text-blue-600 dark:text-cyan-400 font-semibold">
            ascenseurs intelligents
          </span> et les{" "}
          <span className="text-blue-600 dark:text-cyan-400 font-semibold">
            bâtiments connectés
          </span>.
        </motion.p>

        {/* CTA BUTTON */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href="#contact"
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg"
        >
          Demandez un devis
        </motion.a>

      </div>

    </section>
  )
}
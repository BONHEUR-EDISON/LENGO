"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useMemo, useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function AboutPreview() {
  // ⚡ Tous les Hooks doivent être ici, en haut
  const ref = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrollYProgress, setScrollYProgress] = useState(0);

  // ⚡ Particules (useMemo) aussi avant le return
  const particles = useMemo(() => {
    return Array.from({ length: 16 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 6 + Math.random() * 4,
    }));
  }, []);

  // ⚡ Effet pour monter le composant et scroll
  useEffect(() => {
    setMounted(true);
    if (!ref.current) return;

    const updateScroll = () => {
      const rect = ref.current!.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - (rect.bottom - 0.2 * windowHeight) / (rect.height + 0.6 * windowHeight);
      setScrollYProgress(Math.min(Math.max(progress, 0), 1));
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  // ⚡ Condition d'attente pour hydration
  if (!mounted) return null;

  const isDark = theme === "dark";
  const lineScale = scrollYProgress;

  return (
    <section
      ref={ref}
      className={`relative py-32 overflow-hidden ${
        isDark ? "bg-[#0f111a] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* GRID TECHNO */}
      <div className={`absolute inset-0 ${isDark ? "opacity-[0.08]" : "opacity-[0.05]"}`}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* BLOBS */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, -60, 0], y: [0, -60, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className={`absolute -top-40 -left-40 w-[500px] h-[500px] blur-[160px] rounded-full ${
            isDark ? "bg-blue-500/20" : "bg-blue-300/20"
          }`}
        />
        <motion.div
          animate={{ x: [0, -100, 60, 0], y: [0, 80, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className={`absolute bottom-[-250px] right-[-250px] w-[650px] h-[650px] blur-[180px] rounded-full ${
            isDark ? "bg-purple-600/20" : "bg-purple-400/20"
          }`}
        />
      </div>

      {/* PARTICULES */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute w-[3px] h-[3px] bg-cyan-400 rounded-full"
            style={{ top: `${p.top}%`, left: `${p.left}%` }}
            animate={{ y: [-20, 20, -20], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity }}
          />
        ))}
      </div>

      {/* TIMELINE */}
      <div className={`absolute left-0 top-1/2 w-full h-[2px] ${isDark ? "bg-white/10" : "bg-gray-300"}`}>
        <motion.div
          style={{ scaleX: lineScale }}
          className="origin-left h-full bg-gradient-to-r from-cyan-400 to-blue-500"
        />
      </div>

      {/* CONTENU */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        {/* TEXTE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="space-y-8 text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Engineering the Future <br /> of Infrastructure
          </h2>

          <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-lg max-w-xl mx-auto lg:mx-0`}>
            Ascenseurs intelligents • Construction métallique • Automatisation
            industrielle • Domotique avancée
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              Demander une étude technique
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#services"
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-full border ${
                isDark ? "border-white/20" : "border-gray-300"
              } hover:bg-black/5 dark:hover:bg-white/5 transition`}
            >
              Découvrir nos services
            </a>
          </div>
        </motion.div>

        {/* CARDS TECHNO */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid gap-6"
        >
          {/* CARD 1 */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className={`p-8 rounded-3xl backdrop-blur-xl shadow-xl ${
              isDark ? "bg-white/5 border-white/10" : "bg-white/70 border-gray-200"
            }`}
          >
            <span className="text-sm font-semibold text-red-500">Challenge</span>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mt-4`}>
              Les infrastructures modernes exigent automatisation, intelligence et performance pour répondre aux besoins
              des villes intelligentes et de l’industrie du futur.
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            className={`p-8 rounded-3xl backdrop-blur-xl shadow-xl ${
              isDark ? "bg-white/5 border-white/10" : "bg-white/70 border-gray-200"
            }`}
          >
            <span className="text-sm font-semibold text-green-500">Notre solution</span>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mt-4`}>
              Nous développons des systèmes d’ingénierie avancés combinant structures métalliques, automatisation industrielle et technologies intelligentes.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
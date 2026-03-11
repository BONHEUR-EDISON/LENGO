"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import HeroMobileSlider from "./HeroMobileSlider";
import CTAButton from "./CTAButton"; // ton composant CTAButton
import Stats from "./Stats"; // ton composant Stats

export default function HeroVideo() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden"
    >
      {/* VIDEO */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        style={{ scale, opacity }}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </motion.video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl px-6">
        <AnimatedTitle text="Engineering the Future" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-xl text-white/90"
        >
          Ascenseurs intelligents • Construction métallique • Automatisation industrielle • Domotique avancée
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-10 flex gap-6 justify-center flex-wrap"
        >
          <CTAButton href="/contact">Demander une étude technique</CTAButton>

          <a
            href="/services"
            className="px-7 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 transition"
          >
            Découvrir nos services
          </a>
        </motion.div>

        <Stats />
       
      </div>
    </section>
  );
}
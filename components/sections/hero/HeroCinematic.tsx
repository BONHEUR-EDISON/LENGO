"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Stats from "./Stats";
import LightOverlay from "./LightOverlay";
import CTAButton from "./CTAButton";

export default function HeroCinematic() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const videoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden text-center">
        {/* VIDEO BACKGROUND */}

        <motion.video
          autoPlay
          loop
          muted
          playsInline
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </motion.video>

        {/* LIGHT EFFECT */}

        <LightOverlay />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        {/* CONTENT */}

        <motion.div
          style={{ scale: titleScale, y: titleY }}
          className="relative z-10 max-w-5xl px-6"
        >
          <AnimatedTitle text="Engineering the Future" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 text-xl text-white/90"
          >
            Ascenseurs intelligents • Construction métallique Automatisation
            industrielle • Domotique avancée
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="mt-10 flex gap-6 justify-center"
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
        </motion.div>
      </div>
    </section>
  );
}

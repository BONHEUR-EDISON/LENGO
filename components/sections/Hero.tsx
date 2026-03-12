'use client';

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import Stats from "./hero/Stats";

const mobileImages = [
  "/images/hero-img1.jpg",
  "/images/hero-img2.jpg",
  "/images/hero-img3.jpg",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 500], [0, 120]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % mobileImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentImage((prev) => (prev + 1) % mobileImages.length),
    onSwipedRight: () => setCurrentImage((prev) => (prev - 1 + mobileImages.length) % mobileImages.length),
    trackMouse: true,
  });

  if (!mounted) return null;

  const titleWords = ["Ingénierie", "industrielle", "pour", "des", "infrastructures", "modernes", "et", "intelligentes"];

  return (
    <section className="relative min-h-[85vh] pt-24 md:pt-32 pb-24 md:pb-32 flex items-center justify-center overflow-hidden">
      {/* PARALLAX VIDEO/BACKGROUND */}
      <motion.div style={{ y: parallax }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/videos/hero-video.MP4" type="video/mp4" />
        </video>
        {!videoLoaded && (
          <Image
            src="/images/hero-img1.jpg"
            alt="Background industriel"
            fill
            priority
            sizes="100vw"
            className="object-cover hidden md:block"
          />
        )}
      </motion.div>

      {/* MOBILE SLIDER */}
      <div {...handlers} className="absolute inset-0 md:hidden">
        <Image
          key={currentImage}
          src={mobileImages[currentImage]}
          alt="Hero mobile"
          fill
          priority
          sizes="100vw"
          className="object-cover transition-opacity duration-700"
        />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {mobileImages.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentImage ? "bg-white scale-125 animate-pulse" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      {/* OVERLAY + LIGHT EFFECTS */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
          className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-3xl rounded-full top-[-200px] left-[20%]"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ repeat: Infinity, duration: 140, ease: "linear" }}
          className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full bottom-[-200px] right-[20%]"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center flex flex-col items-center gap-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-indigo-400 font-semibold uppercase tracking-widest text-sm"
        >
          Solutions d’ingénierie avancées
        </motion.span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight max-w-4xl">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 120 }}
              className="inline-block mr-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-200 text-lg md:text-xl max-w-3xl"
        >
          Conception et installation d’ascenseurs intelligents, structures métalliques, automatisation industrielle et solutions de domotique avancée pour bâtiments modernes.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:from-purple-500 hover:to-pink-500 transition-all"
          >
            Obtenir un devis
          </a>
          <a
            href="#services"
            className="px-8 py-4 border border-white/40 text-white rounded-xl hover:bg-white hover:text-black transition-all"
          >
            Découvrir nos services
          </a>
        </motion.div>

        {/* STATS */}
        <div className="w-full flex justify-center mt-8">
          <Stats />
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="absolute bottom-10 text-white/70 flex flex-col items-center"
      >
        <span className="text-sm">Découvrir</span>
        <span className="text-2xl animate-bounce">↓</span>
      </motion.div>

      {/* TRANSITION */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-gray-50 dark:to-black" />
    </section>
  );
}
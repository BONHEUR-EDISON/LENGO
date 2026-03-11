"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import Stats from "./hero/Stats";

// Lottie chargé dynamiquement pour ne pas bloquer le SSR
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

// Images mobiles
const mobileImages = [
  "/images/hero-img1.jpg",
  "/images/hero-img2.jpg",
  "/images/hero-img1.jpg",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => setMounted(true), []);

  // Slider automatique mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % mobileImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Swipe mobile
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentImage((prev) => (prev + 1) % mobileImages.length),
    onSwipedRight: () =>
      setCurrentImage((prev) => (prev - 1 + mobileImages.length) % mobileImages.length),
    trackMouse: true,
  });

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Video Desktop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        onCanPlayThrough={() => setVideoLoaded(true)}
      >
        <source src="/videos/hero-video.MP4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback Image si vidéo non chargée */}
      {!videoLoaded && (
        <Image
          src="/images/hero-img1.jpg"
          alt="Fallback Hero"
          fill
          priority
          className="object-cover hidden md:block"
        />
      )}

      {/* Mobile Slider */}
      <div {...handlers} className="absolute inset-0 md:hidden">
        <Image
          key={currentImage} // pour forcer le refresh du fade
          src={mobileImages[currentImage]}
          alt={`Hero background ${currentImage + 1}`}
          fill
          priority
          className="object-cover transition-opacity duration-700 ease-in-out"
        />

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {mobileImages.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentImage ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 flex flex-col items-center text-center gap-10">

        {/* Texte principal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col gap-6 items-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white max-w-4xl">
            Construisez l’avenir dès aujourd’hui
          </h1>

          <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl">
            Ascenseurs intelligents • Structures métalliques • Automatisation industrielle • Domotique avancée
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
              href="#features"
              className="px-7 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:scale-105 transition"
            >
              Demander une étude technique
            </a>

            <a
              href="#services"
              className="px-7 py-3 border border-white text-white rounded-xl hover:bg-white hover:text-black transition"
            >
              Découvrir nos services
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="w-full flex justify-center">
          <Stats />
        </div>

        {/* Lottie Animation Desktop 
        <div className="hidden md:block w-full max-w-md mt-8">
          <Player
            autoplay
            loop
            src="/hero-lottie.json"
            style={{ width: "100%", height: "100%" }}
          />
        </div>*/}

      </div>
    </section>
  );
}
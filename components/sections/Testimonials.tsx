'use client';

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import { useTheme } from "next-themes";

export default function TestimonialsCarousel() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
     
       

  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  

  const cardWidth = 320; // largeur approximative d’une carte + marge

  // Scroll automatique
  const scrollNext = () => {
    if (!carouselRef.current) return;
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    if (carouselRef.current.scrollLeft >= maxScroll - 1) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const index = Math.round(carouselRef.current.scrollLeft / cardWidth);
    setActiveIndex(index % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) scrollNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const refCurrent = carouselRef.current;
    refCurrent?.addEventListener("scroll", handleScroll);
    return () => refCurrent?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMounted(true), []);
      if (!mounted) return null;
    
      const isDark = theme === "dark";

  return (
    <section
      className={`py-20 px-4 sm:px-8 md:px-16 relative transition-colors duration-500 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2
        className={`text-4xl font-bold text-center mb-12 transition-colors duration-500 ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        Ce que nos clients disent
      </h2>

      {/* Flèches navigation desktop */}
      <button
        onClick={() => carouselRef.current?.scrollBy({ left: -cardWidth, behavior: "smooth" })}
        className={`hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full p-3 shadow-lg z-10 transition-colors duration-300 ${
          isDark
            ? "bg-gray-800 hover:bg-gray-700 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-black"
        }`}
        aria-label="Précédent"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => carouselRef.current?.scrollBy({ left: cardWidth, behavior: "smooth" })}
        className={`hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-3 shadow-lg z-10 transition-colors duration-300 ${
          isDark
            ? "bg-gray-800 hover:bg-gray-700 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-black"
        }`}
        aria-label="Suivant"
      >
        <ChevronRight size={24} />
      </button>

      {/* Carrousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
      >
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            className={`flex-shrink-0 w-80 rounded-xl shadow-lg snap-center flex flex-col items-center text-center relative transition-transform duration-500 ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Avatar */}
            <Image
              src={t.avatar} // /images/avatar.png
              alt={t.name}
              width={80}
              height={80}
              className="rounded-full mb-4 object-cover"
            />
            <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              "{t.message}"
            </p>
            <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-black"}`}>
              {t.name}
            </h3>
            <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {t.role}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              activeIndex === index
                ? isDark
                  ? "bg-blue-400"
                  : "bg-blue-500"
                : isDark
                ? "bg-gray-600"
                : "bg-gray-300"
            }`}
            aria-label={`Témoignage ${index + 1}`}
            onClick={() => {
              if (!carouselRef.current) return;
              carouselRef.current.scrollTo({
                left: index * cardWidth,
                behavior: "smooth",
              });
            }}
          />
        ))}
      </div>
    </section>
  );
}
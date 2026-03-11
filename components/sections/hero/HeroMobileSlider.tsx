"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const slides = [
  { src: "/images/hero-img1.jpg", alt: "Slide 1" },
  { src: "/images/hero-img2.jpg", alt: "Slide 2" },
  { src: "/images/hero-img3.jpg", alt: "Slide 3" },
];

export default function HeroMobileSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[500px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <motion.img
          key={index}
          src={slide.src}
          alt={slide.alt}
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

type TeamMember = { name: string; role: string; avatar: string; };

const team: TeamMember[] = [
  { name: 'Jean Mbala', role: 'CEO', avatar: '/images/avatar-male.png' },
  { name: 'Alice Kamanzi', role: 'CTO', avatar: '/images/avatar.png' },
  { name: 'David Luyeye', role: 'Lead Developer', avatar: '/images/avatar-male.png' },
  { name: 'Marie Tumba', role: 'Product Manager', avatar: '/images/avatar.png' },
];

export default function TeamCarousel() {
  // --- HOOKS TOUJOURS AU DÉBUT ---
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Constantes
  const cardWidth = 320;
  const extendedTeam = [...team, ...team, ...team]; // Infini
  const isDark = true; // MODE SOMBRE FORCÉ

  // Scroll helpers
  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth'
    });
  };

  const resetScrollIfNeeded = () => {
    if (!carouselRef.current) return;
    const totalScroll = carouselRef.current.scrollWidth / 3;
    if (carouselRef.current.scrollLeft < totalScroll / 2) {
      carouselRef.current.scrollLeft += totalScroll;
    } else if (carouselRef.current.scrollLeft > totalScroll * 1.5) {
      carouselRef.current.scrollLeft -= totalScroll;
    }
  };

  // --- EFFECT DE SCROLL AUTOMATIQUE ---
  useEffect(() => {
    const ref = carouselRef.current;
    if (!ref) return;

    ref.scrollLeft = ref.scrollWidth / 3;

    const handleScroll = () => {
      resetScrollIfNeeded();
      const index = Math.round(ref.scrollLeft / cardWidth) % team.length;
      setActiveIndex(index);
    };

    ref.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => scroll('right'), 3000);

    return () => {
      ref.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className={`py-20 sm:py-28 px-4 relative bg-gray-900 text-white transition-colors duration-500`}>
      <h2 className="text-4xl font-bold text-center mb-12 text-white">Notre équipe</h2>

      {/* Flèches */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full p-3 shadow-lg bg-gray-800 hover:bg-gray-700 text-white z-10"
        aria-label="Précédent"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-3 shadow-lg bg-gray-800 hover:bg-gray-700 text-white z-10"
        aria-label="Suivant"
      >
        <ChevronRight size={24} />
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
      >
        {extendedTeam.map((member, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-64 sm:w-72 md:w-80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg bg-gray-800 hover:scale-105 transition-transform duration-300 snap-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % team.length) * 0.2 }}
          >
            <Image
              src={member.avatar}
              alt={member.name}
              width={96}
              height={96}
              className="rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-white">{member.name}</h3>
            <p className="text-sm text-gray-400">{member.role}</p>
          </motion.div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {team.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              activeIndex === index ? 'bg-blue-400' : 'bg-gray-600'
            }`}
            aria-label={`Membre ${index + 1}`}
            onClick={() => {
              if (!carouselRef.current) return;
              const scrollTo = index * cardWidth + carouselRef.current.scrollWidth / 3;
              carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      <div className="mt-28" />
    </section>
  );
}
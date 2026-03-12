'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

type TeamMember = {
  name: string;
  role: string;
  avatar: string;
};

const team: TeamMember[] = [
  { name: 'Jean Mbala', role: 'CEO', avatar: '/images/avatar-male.png' },
  { name: 'Alice Kamanzi', role: 'CTO', avatar: '/images/avatar.png' },
  { name: 'David Luyeye', role: 'Lead Developer', avatar: '/images/avatar-male.png' },
  { name: 'Marie Tumba', role: 'Product Manager', avatar: '/images/avatar.png' },
];

export default function TeamCarousel() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const extendedTeam = [...team, ...team, ...team]; // effet infini
  const cardWidth = 320;

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
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
    <section
      className={`py-20 sm:py-28 px-4 sm:px-8 md:px-16 relative transition-colors duration-500 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <h2 className={`text-4xl font-bold text-center mb-12 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>
        Notre équipe
      </h2>

      {/* Flèches desktop */}
      <button
        onClick={() => scroll('left')}
        className={`hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full p-3 shadow-lg z-10 transition-colors duration-300 ${
          isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'
        }`}
        aria-label="Précédent"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll('right')}
        className={`hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full p-3 shadow-lg z-10 transition-colors duration-300 ${
          isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'
        }`}
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
            className={`flex-shrink-0 w-64 sm:w-72 md:w-80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg snap-center transition-transform duration-300 ${
              isDark ? 'bg-gray-800 hover:scale-105' : 'bg-gray-100 hover:scale-105'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (index % team.length) * 0.2 }}
          >
            <Image src={member.avatar} alt={member.name} width={96} height={96} className="rounded-full mb-4 object-cover" />
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{member.name}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{member.role}</p>
          </motion.div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {team.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              activeIndex === index ? (isDark ? 'bg-blue-400' : 'bg-blue-500') : (isDark ? 'bg-gray-600' : 'bg-gray-300')
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

      {/* Espace pour section suivante */}
      <div className="mt-28" />
    </section>
  );
}
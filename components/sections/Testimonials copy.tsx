'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import { testimonials } from '@/data/testimonials';

type TeamMember = {
  name: string;
  role: string;
  avatar: string;
};

const team: TeamMember[] = [
  { name: 'Jean Mbala', role: 'CEO', avatar: 'images/avatar-male.png' },
  { name: 'Alice Kamanzi', role: 'CTO', avatar: 'images/avatar.png' },
  { name: 'David Luyeye', role: 'Lead Developer', avatar: 'images/avatar-male.png' },
  { name: 'Marie Tumba', role: 'Product Manager', avatar: 'images/avatar.png' },
];

export default function TeamAndTestimonialsSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // === TEAM CAROUSEL ===
  const teamRef = useRef<HTMLDivElement>(null);
  const [teamIndex, setTeamIndex] = useState(0);
  const extendedTeam = [...team, ...team, ...team];
  const cardWidthTeam = 320;

  const scrollTeam = (dir: 'left' | 'right') => {
    if (!teamRef.current) return;
    teamRef.current.scrollBy({ left: dir === 'left' ? -cardWidthTeam : cardWidthTeam, behavior: 'smooth' });
  };

  const resetTeamScroll = () => {
    if (!teamRef.current) return;
    const total = teamRef.current.scrollWidth / 3;
    if (teamRef.current.scrollLeft < total / 2) teamRef.current.scrollLeft += total;
    else if (teamRef.current.scrollLeft > total * 1.5) teamRef.current.scrollLeft -= total;
  };

  useEffect(() => {
    const ref = teamRef.current;
    if (!ref) return;
    ref.scrollLeft = ref.scrollWidth / 3;

    const handleScroll = () => {
      resetTeamScroll();
      const idx = Math.round(ref.scrollLeft / cardWidthTeam) % team.length;
      setTeamIndex(idx);
    };
    ref.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => scrollTeam('right'), 3000);

    return () => {
      ref.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // === TESTIMONIALS CAROUSEL ===
  const testRef = useRef<HTMLDivElement>(null);
  const [testIndex, setTestIndex] = useState(0);
  const scrollTest = (dir: 'left' | 'right') => {
    if (!testRef.current) return;
    testRef.current.scrollBy({ left: 300 * (dir === 'left' ? -1 : 1), behavior: 'smooth' });
  };
  const [hoverTest, setHoverTest] = useState(false);

  const handleTestScroll = () => {
    if (!testRef.current) return;
    const idx = Math.round(testRef.current.scrollLeft / 300) % testimonials.length;
    setTestIndex(idx);
  };

  useEffect(() => {
    const ref = testRef.current;
    if (!ref) return;
    ref.addEventListener('scroll', handleTestScroll);
    const interval = setInterval(() => !hoverTest && scrollTest('right'), 3000);
    return () => {
      ref.removeEventListener('scroll', handleTestScroll);
      clearInterval(interval);
    };
  }, [hoverTest]);

  return (
    <section className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} py-20 px-4 sm:px-8 md:px-16 transition-colors duration-500`}>

      {/* ================= TEAM ================= */}
      <h2 className={`text-4xl font-bold text-center mb-12 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>
        Notre équipe
      </h2>
      <button
        onClick={() => scrollTeam('left')}
        className={`hidden md:flex absolute left-4 top-[30%] transform -translate-y-1/2 rounded-full p-3 shadow-lg z-10 transition-colors duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
        aria-label="Précédent"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => scrollTeam('right')}
        className={`hidden md:flex absolute right-4 top-[30%] transform -translate-y-1/2 rounded-full p-3 shadow-lg z-10 transition-colors duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
        aria-label="Suivant"
      >
        <ChevronRight size={24} />
      </button>
      <div ref={teamRef} className="flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory scroll-smooth mb-6">
        {extendedTeam.map((m, i) => (
          <motion.div
            key={i}
            className={`flex-shrink-0 w-64 sm:w-72 md:w-80 rounded-xl p-6 flex flex-col items-center text-center shadow-lg snap-center transition-transform duration-300 ${isDark ? 'bg-gray-800 hover:scale-105' : 'bg-gray-100 hover:scale-105'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % team.length) * 0.2 }}
          >
            <img src={m.avatar} alt={m.name} className="w-24 h-24 rounded-full mb-4 object-cover"/>
            <h3 className={`${isDark ? 'text-white' : 'text-black'} text-xl font-semibold`}>{m.name}</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{m.role}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {team.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${teamIndex === i ? (isDark ? 'bg-blue-400' : 'bg-blue-500') : (isDark ? 'bg-gray-600' : 'bg-gray-300')}`}
            aria-label={`Membre ${i + 1}`}
            onClick={() => {
              if (!teamRef.current) return;
              const scrollTo = i * cardWidthTeam + teamRef.current.scrollWidth / 3;
              teamRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {/* ================= TESTIMONIALS ================= */}
      <h2 className={`text-4xl font-bold text-center mt-20 mb-12 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>
        Ce que nos clients disent
      </h2>
      <button
        onClick={() => scrollTest('left')}
        className={`hidden md:flex absolute left-4 top-[75%] transform -translate-y-1/2 rounded-full p-3 shadow-lg z-10 transition-colors duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
        aria-label="Précédent"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => scrollTest('right')}
        className={`hidden md:flex absolute right-4 top-[75%] transform -translate-y-1/2 rounded-full p-3 shadow-lg z-10 transition-colors duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
        aria-label="Suivant"
      >
        <ChevronRight size={24} />
      </button>
      <div
        ref={testRef}
        className="flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        onMouseEnter={() => setHoverTest(true)}
        onMouseLeave={() => setHoverTest(false)}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className={`flex-shrink-0 w-80 bg-gray-100 dark:bg-gray-900 rounded-xl p-6 shadow-lg snap-center flex flex-col items-center text-center`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-4 object-cover"/>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>“{t.message}”</p>
            <h3 className={`${isDark ? 'text-white' : 'text-black'} text-xl font-semibold`}>{t.name}</h3>
            <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{t.role}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${testIndex === i ? (isDark ? 'bg-blue-400' : 'bg-blue-500') : (isDark ? 'bg-gray-600' : 'bg-gray-300')}`}
            aria-label={`Témoignage ${i + 1}`}
            onClick={() => {
              if (!testRef.current) return;
              testRef.current.scrollTo({ left: i * 300, behavior: 'smooth' });
            }}
          />
        ))}
      </div>
    </section>
  );
}
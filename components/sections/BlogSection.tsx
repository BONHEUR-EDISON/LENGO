'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';

type BlogPost = {
  title: string;
  excerpt: string;
  image: string;
  link: string;
  date: string;
};

const posts: BlogPost[] = [
  {
    title: 'Comment la tech transforme Goma',
    excerpt: 'Découvrez comment les startups locales utilisent la technologie pour innover et connecter la communauté.',
    image: '/blog/goma-tech.jpg',
    link: '#',
    date: '10 mars 2026',
  },
  {
    title: 'Les tendances UX/UI en 2026',
    excerpt: 'Un aperçu des meilleures pratiques en design UX/UI pour les applications web et mobiles cette année.',
    image: '/blog/ux-ui-2026.jpg',
    link: '#',
    date: '5 mars 2026',
  },
  {
    title: 'Sécurité réseau à domicile : Guide pratique',
    excerpt: 'Protégez votre réseau domestique avec ces astuces simples mais efficaces pour sécuriser vos connexions Wi-Fi.',
    image: '/blog/security.jpg',
    link: '#',
    date: '1 mars 2026',
  },
];

export default function PremiumBlogCarousel() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const extendedPosts = [...posts, ...posts, ...posts];
  const cardWidth = 320;

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: direction === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
  };

  const resetScroll = () => {
    if (!carouselRef.current) return;
    const total = carouselRef.current.scrollWidth / 3;
    if (carouselRef.current.scrollLeft < total / 2) carouselRef.current.scrollLeft += total;
    else if (carouselRef.current.scrollLeft > total * 1.5) carouselRef.current.scrollLeft -= total;
  };

  useEffect(() => {
    const ref = carouselRef.current;
    if (!ref) return;

    ref.scrollLeft = ref.scrollWidth / 3;

    const handleScroll = () => {
      resetScroll();
      const idx = Math.round(ref.scrollLeft / cardWidth) % posts.length;
      setActiveIndex(idx);
    };

    ref.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => scroll('right'), 3000);

    return () => {
      ref.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className={`relative py-20 px-4 sm:px-8 md:px-16 transition-colors duration-500 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* BLOBS lumineux */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 left-[-150px] w-[500px] h-[500px] blur-[160px] rounded-full ${isDark ? 'bg-blue-700/20' : 'bg-blue-400/20'}`} />
        <div className={`absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] blur-[180px] rounded-full ${isDark ? 'bg-purple-800/20' : 'bg-purple-600/20'}`} />
      </div>

      <h2 className="text-4xl font-bold text-center mb-12">{isDark ? 'Nos actualités' : 'Nos actualités'}</h2>

      {/* Flèches desktop */}
      <button
        onClick={() => scroll('left')}
        className={`hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-colors duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
        aria-label="Précédent"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => scroll('right')}
        className={`hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-colors duration-300 ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-black'}`}
        aria-label="Suivant"
      >
        <ChevronRight size={24} />
      </button>

      {/* Carrousel */}
      <div ref={carouselRef} className="flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory scroll-smooth relative z-10">
        {extendedPosts.map((post, i) => (
          <motion.a
            key={i}
            href={post.link}
            className={`flex-shrink-0 w-72 sm:w-80 md:w-96 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 snap-center ${isDark ? 'bg-gray-800 hover:shadow-2xl' : 'bg-gray-100 hover:shadow-2xl'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % posts.length) * 0.2 }}
          >
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{post.title}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{post.excerpt}</p>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{post.date}</span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2 relative z-10">
        {posts.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${activeIndex === i ? (isDark ? 'bg-blue-400' : 'bg-blue-500') : (isDark ? 'bg-gray-600' : 'bg-gray-300')}`}
            aria-label={`Article ${i + 1}`}
            onClick={() => {
              if (!carouselRef.current) return;
              const scrollTo = i * cardWidth + carouselRef.current.scrollWidth / 3;
              carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
            }}
          />
        ))}
      </div>
    </section>
  );
}
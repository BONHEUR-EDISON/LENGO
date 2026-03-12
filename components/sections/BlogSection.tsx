'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { BlogPost, blogPosts } from "@/data/blog";

export default function PremiumBlogCarousel() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardWidth = 320;

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

    if (direction === 'left') {
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    } else {
      if (carouselRef.current.scrollLeft + cardWidth <= maxScroll) {
        carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }
  };

  const updateActiveIndex = () => {
    if (!carouselRef.current) return;
    const idx = Math.round(carouselRef.current.scrollLeft / cardWidth);
    setActiveIndex(idx);
  };

  useEffect(() => {
    const ref = carouselRef.current;
    if (!ref) return;

    ref.addEventListener('scroll', updateActiveIndex);
    return () => ref.removeEventListener('scroll', updateActiveIndex);
  }, []);

  return (
    <section className={`relative py-20 px-4 sm:px-8 md:px-16 transition-colors duration-500 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      
      <h2 className="text-4xl font-bold text-center mb-12">Nos actualités</h2>

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
        {blogPosts.map((post, i) => (
          <Link key={i} href={`/blog/${post.slug}`} className="flex-shrink-0 w-72 sm:w-80 md:w-96 snap-center">
            <motion.div
              className={`rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 ${isDark ? 'bg-gray-800 hover:shadow-2xl' : 'bg-gray-100 hover:shadow-2xl'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover"/>
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{post.title}</h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{post.excerpt}</p>
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{post.date}</span>
                </div>
                <span
                  className={`mt-4 inline-block text-center py-2 px-4 rounded font-medium transition-colors duration-300 ${isDark ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                  Lire plus
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2 relative z-10">
        {blogPosts.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === i ? (isDark ? 'bg-blue-400 scale-125' : 'bg-blue-500 scale-125') : (isDark ? 'bg-gray-600' : 'bg-gray-300')}`}
            aria-label={`Article ${i + 1}`}
            onClick={() => {
              if (!carouselRef.current) return;
              carouselRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
            }}
          />
        ))}
      </div>
    </section>
  );
}
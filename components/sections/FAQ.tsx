'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from 'next-themes';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: 'Comment puis-je vous contacter pour un projet ?',
    answer: 'Vous pouvez nous contacter via le formulaire en bas de page ou directement par email à contact@votreentreprise.com.',
  },
  {
    question: 'Proposez-vous des services personnalisés ?',
    answer: 'Oui, chaque projet est unique. Nous adaptons nos solutions selon vos besoins spécifiques.',
  },
  {
    question: 'Quel est le délai moyen pour un projet ?',
    answer: 'Cela dépend de la complexité, mais en moyenne, nos projets sont livrés sous 4 à 8 semaines.',
  },
  {
    question: 'Travaillez-vous uniquement à Goma ?',
    answer: 'Nous sommes basés à Goma, mais nous pouvons collaborer avec des clients à distance partout en RDC et à l’international.',
  },
];

export default function FAQSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className={`py-20 px-4 sm:px-8 md:px-16 transition-colors duration-500 ${
        isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <h2 className="text-4xl font-bold text-center mb-12 transition-colors duration-500">
        Questions fréquentes
      </h2>

      <div className="max-w-4xl mx-auto space-y-6 relative">
        {faqs.map((faq, index) => (
          <div key={index} className="relative">
            {/* Glow derrière FAQ ouverte */}
            <motion.div
              className={`absolute inset-0 rounded-xl blur-3xl opacity-0 pointer-events-none transition-opacity duration-500 ${
                isDark
                  ? 'bg-blue-700/20'
                  : 'bg-blue-400/20'
              }`}
              animate={{ opacity: openIndex === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Carte FAQ */}
            <div
              className={`relative rounded-xl shadow-lg overflow-hidden transition-colors duration-500 ${
                isDark
                  ? 'bg-gray-900 hover:bg-gray-800'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <button
                className={`w-full flex justify-between items-center p-6 text-left font-medium transition-colors duration-500 ${
                  isDark ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'
                }`}
                onClick={() => toggleIndex(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-${index}`}
              >
                <span>{faq.question}</span>
                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    id={`faq-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`px-6 pb-6 transition-colors duration-500 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
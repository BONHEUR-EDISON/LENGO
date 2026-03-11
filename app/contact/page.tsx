"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  // Parallax pour la carte et les icônes sociales
  const { scrollY } = useScroll();
  const yParallaxMap = useTransform(scrollY, [0, 500], [0, -50]);
  const yParallaxIcons = useTransform(scrollY, [0, 500], [0, -20]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white px-4 md:px-16 py-16 flex flex-col md:flex-row gap-12">
      
      {/* Côté gauche : titre + description + formulaire */}
      <motion.div
        className="flex-1 flex flex-col gap-6"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold">Contactez-nous</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl">
          Vous avez un projet ou une question ? Remplissez ce formulaire et nous vous répondrons rapidement.
        </p>

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-lg flex flex-col gap-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre email"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message"
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
          />

          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-transform duration-300 hover:scale-105 mt-2 md:self-start"
          >
            Envoyer
          </button>

          {submitted && (
            <p className="mt-2 text-green-600 dark:text-green-400 font-medium">
              Merci ! Votre message a été envoyé.
            </p>
          )}
        </form>
      </motion.div>

      {/* Côté droit : carte + réseaux sociaux */}
      <motion.div className="flex-1 flex flex-col gap-6">
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center md:text-left">
          Où nous trouver
        </h2>

        {/* Carte avec parallaxe */}
        <motion.div
          className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl"
          style={{ y: yParallaxMap }}
        >
          <iframe
            title="Carte Google Maps - Goma"
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.634771928966!2d29.21826578320508!3d-1.6708768336552526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d8cb52016399f5%3A0x156ddf268d5c7535!2sGoma%2C%20DR!5e0!3m2!1sfr!2srw!4v1697681234567!5m2!1sfr!2srw&markers=color:red%7Clabel:A%7C-1.6708,29.2182"
          />
        </motion.div>

        {/* Réseaux sociaux avec parallaxe */}
        <motion.div
          className="flex gap-6 justify-center md:justify-start mt-2"
          style={{ y: yParallaxIcons }}
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-transform hover:scale-110"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-blue-400 text-white hover:bg-blue-300 transition-transform hover:scale-110"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-blue-700 text-white hover:bg-blue-600 transition-transform hover:scale-110"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-pink-500 text-white hover:bg-pink-400 transition-transform hover:scale-110"
          >
            <FaInstagram />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
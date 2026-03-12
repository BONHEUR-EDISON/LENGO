"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const stats = [
  { value: 1200, suffix: "+", label: "Utilisateurs" },
  { value: 35, suffix: "+", label: "Partenaires" },
  { value: 15, suffix: "", label: "Pays" },
  { value: 99, suffix: "%", label: "Satisfaction" }
];

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [countedStats, setCountedStats] = useState(stats.map(() => 0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const { scrollY } = useScroll();
  const yParallaxMap = useTransform(scrollY, [0, 500], [0, -40]);
  const yParallaxIcons = useTransform(scrollY, [0, 500], [0, -20]);

  // Animation des stats au scroll
  useEffect(() => {
    const controls: any[] = [];
    stats.forEach((stat, i) => {
      controls[i] = animate(0, stat.value, {
        duration: 1.5,
        onUpdate(value) {
          setCountedStats((prev) => {
            const copy = [...prev];
            copy[i] = Math.floor(value);
            return copy;
          });
        }
      });
    });
    return () => controls.forEach((c) => c.stop && c.stop());
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 md:px-16 py-24 flex flex-col md:flex-row gap-12">

      {/* Formulaire côté gauche */}
      <motion.div className="flex-1 flex flex-col gap-16">
        <div className="pt-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Contactez-nous
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mb-8">
            Vous avez un projet ou une question ? Remplissez ce formulaire et nous vous répondrons rapidement.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              required
              className="flex-1 px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre email"
              required
              className="flex-1 px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message"
            required
            rows={6}
            className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all"
          />

          <button
            type="submit"
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300 mt-2 md:self-start shadow-xl hover:shadow-2xl"
          >
            Envoyer
          </button>

          {submitted && (
            <p className="mt-4 text-green-600 dark:text-green-400 font-medium text-lg">
              Merci ! Votre message a été envoyé.
            </p>
          )}
        </motion.form>
      </motion.div>

      {/* Côté droit : carte + stats + réseaux sociaux */}
      <motion.div className="flex-1 flex flex-col gap-12">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center md:text-left mb-6">
          Où nous trouver
        </h2>

        <motion.div
          className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl"
          style={{ y: yParallaxMap }}
          whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
          transition={{ type: "spring", stiffness: 100 }}
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

        {/* Stats animées */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mt-8">
          {countedStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">
                {stat}{stats[index].suffix}
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300 font-medium">{stats[index].label}</p>
            </motion.div>
          ))}
        </div>

        {/* Réseaux sociaux avec micro-animations */}
        <div className="flex gap-6 justify-center md:justify-start mt-6">
          {[{ icon: FaFacebookF, bg: "bg-blue-600 hover:bg-blue-500" },
            { icon: FaTwitter, bg: "bg-blue-400 hover:bg-blue-300" },
            { icon: FaLinkedinIn, bg: "bg-blue-700 hover:bg-blue-600" },
            { icon: FaInstagram, bg: "bg-pink-500 hover:bg-pink-400" }].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                transition={{ type: "spring", stiffness: 150 }}
                className={`p-4 rounded-full text-white ${item.bg} transition-transform`}
              >
                <Icon />
              </motion.a>
            )
          })}
        </div>
      </motion.div>
    </section>
  );
}
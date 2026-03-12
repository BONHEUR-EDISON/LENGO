"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useTheme } from "next-themes";

const stats = [
  { value: 1200, suffix: "+", label: "Utilisateurs" },
  { value: 35, suffix: "+", label: "Partenaires" },
  { value: 15, suffix: "", label: "Pays" },
  { value: 99, suffix: "%", label: "Satisfaction" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [countedStats, setCountedStats] = useState(stats.map(() => 0));

  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const { scrollY } = useScroll();
  const yParallaxMap = useTransform(scrollY, [0, 500], [0, -30]);

  useEffect(() => {
    const controls: any[] = [];
    stats.forEach((stat, i) => {
      controls[i] = animate(0, stat.value, {
        duration: 1.5,
        ease: [0.42, 0, 0.58, 1],
        onUpdate(value) {
          setCountedStats((prev) => {
            const copy = [...prev];
            copy[i] = Math.floor(value);
            return copy;
          });
        },
      });
    });
    return () => controls.forEach((c) => c.stop && c.stop());
  }, []);

  return (
    <section
      className={`min-h-screen px-6 md:px-20 py-24 flex flex-col md:flex-row gap-16 transition-colors duration-500
      ${theme === "dark" ? "bg-gray-900" : "bg-gradient-to-br from-white via-blue-50 to-blue-100"}`}
    >

      {/* Formulaire */}
      <motion.div className="flex-1 flex flex-col gap-12">
        <div className="pt-12">
          <h1
            className={`text-5xl md:text-6xl font-extrabold mb-4 tracking-tight transition-colors duration-500
            ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Contactez-nous
          </h1>
          <p
            className={`text-lg max-w-lg transition-colors duration-500
            ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          >
            Vous avez un projet ou une question ? Remplissez ce formulaire et nous vous répondrons rapidement.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className={`rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col gap-6 transition-colors duration-500
            ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {["name", "email"].map((field, i) => (
              <input
                key={i}
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field === "name" ? "Votre nom" : "Votre email"}
                required
                className={`flex-1 px-6 py-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300
                  ${theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-600"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
                  } focus:outline-none focus:ring-2`}
              />
            ))}
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message"
            required
            rows={6}
            className={`w-full px-6 py-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 resize-none
              ${theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-600"
                : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"
              } focus:outline-none focus:ring-2`}
          />

          <button
            type="submit"
            className="px-12 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300 self-start shadow-xl hover:shadow-2xl"
          >
            Envoyer
          </button>

          {submitted && (
            <p
              className={`mt-4 font-medium text-lg animate-fade-in transition-colors duration-500
                ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
            >
              Merci ! Votre message a été envoyé.
            </p>
          )}
        </motion.form>
      </motion.div>

      {/* Carte et stats */}
      <motion.div className="flex-1 flex flex-col gap-12">
        <h2
          className={`text-3xl font-semibold text-center md:text-left mb-6 transition-colors duration-500
            ${theme === "dark" ? "text-white" : "text-gray-900"}`}
        >
          Où nous trouver
        </h2>

        <motion.div
          className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
          style={{ y: yParallaxMap }}
          whileHover={{ scale: 1.02, rotateX: 1, rotateY: -1 }}
          transition={{ type: "spring", stiffness: 120 }}
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mt-8">
          {countedStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <h3 className={`text-4xl md:text-5xl font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                {stat}{stats[index].suffix}
              </h3>
              <p className={`mt-2 font-medium transition-colors duration-500 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                {stats[index].label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-6 justify-center md:justify-start mt-6">
          {[
            { icon: FaFacebookF, bg: "bg-blue-600 hover:bg-blue-500" },
            { icon: FaTwitter, bg: "bg-blue-400 hover:bg-blue-300" },
            { icon: FaLinkedinIn, bg: "bg-blue-700 hover:bg-blue-600" },
            { icon: FaInstagram, bg: "bg-pink-500 hover:bg-pink-400" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.25, rotate: [0, 10, -10, 0] }}
                transition={{ type: "spring", stiffness: 150 }}
                className={`p-4 rounded-full text-white shadow-lg hover:shadow-xl transition-transform ${item.bg}`}
              >
                <Icon />
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
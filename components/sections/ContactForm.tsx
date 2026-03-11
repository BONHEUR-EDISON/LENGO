'use client'

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export default function ContactForm() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    alert("Message envoyé ! Merci pour votre contact.");
    reset();
  };

  if (!mounted) return null;

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`space-y-6 max-w-xl mx-auto p-8 rounded-2xl shadow-2xl transition-colors duration-500
      ${isDark ? "bg-zinc-900 text-gray-100" : "bg-white text-gray-900"}`}
    >
      {/* NOM */}
      <div className="flex flex-col gap-2">
        <input
          {...register("name", { required: "Le nom est requis" })}
          placeholder="Votre nom"
          className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition
          ${
            errors.name
              ? "border-red-500"
              : isDark
              ? "border-zinc-700 bg-zinc-800"
              : "border-gray-300"
          }`}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      {/* EMAIL */}
      <div className="flex flex-col gap-2">
        <input
          {...register("email", { required: "L'email est requis" })}
          type="email"
          placeholder="Email"
          className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition
          ${
            errors.email
              ? "border-red-500"
              : isDark
              ? "border-zinc-700 bg-zinc-800"
              : "border-gray-300"
          }`}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      {/* TELEPHONE */}
      <div className="flex flex-col gap-2">
        <input
          {...register("phone")}
          placeholder="Téléphone (optionnel)"
          className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition
          ${isDark ? "border-zinc-700 bg-zinc-800" : "border-gray-300"}`}
        />
      </div>

      {/* MESSAGE */}
      <div className="flex flex-col gap-2">
        <textarea
          {...register("message", { required: "Le message est requis" })}
          placeholder="Votre message"
          rows={5}
          className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition
          ${
            errors.message
              ? "border-red-500"
              : isDark
              ? "border-zinc-700 bg-zinc-800"
              : "border-gray-300"
          }`}
        />
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message.message}</span>
        )}
      </div>

      {/* BOUTON */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-blue-500/40"
      >
        Envoyer
      </motion.button>
    </motion.form>
  );
}
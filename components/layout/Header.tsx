"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Magnetic from "../effet/Magnetic";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [blur, setBlur] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState("fr");

  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale) setLocale(savedLocale);

    const handleScroll = () => setBlur(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const links = [
    { name: locale === "fr" ? "Accueil" : "Home", href: "/" },
    { name: locale === "fr" ? "Services" : "Services", href: "/services" },
    { name: locale === "fr" ? "Projets" : "Projects", href: "/projects" },
    { name: locale === "fr" ? "Technologies" : "Technologies", href: "/technologies" },
    { name: locale === "fr" ? "Contact" : "Contact", href: "/contact" },
  ];

  return (
    <header
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-500"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, -100, 0], y: [0, -60, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full top-[-200px] left-[-200px]"
        />
        <motion.div
          animate={{ x: [0, -120, 120, 0], y: [0, 80, -80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-200px] right-[-200px]"
        />
      </div>

      {/* Header Container */}
      <div
        className={`relative transition-all duration-500 ${
          blur
            ? "backdrop-blur-xl bg-gradient-to-r from-white/50 to-white/30 dark:from-black/50 dark:to-black/30 border-b border-white/20 dark:border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between perspective-[1200px]">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.05 }}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md"
            >
              L
            </motion.div>
            <div className="leading-tight">
              <p className={`text-lg font-semibold tracking-tight ${isDark ? "text-white" : "text-white"}`}>
                LENGO
              </p>
              <p className="text-[10px] tracking-widest text-gray-500 dark:text-white uppercase">
                Engineering
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}
          <motion.nav
            whileHover={{ rotateX: 3, rotateY: -3 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="hidden md:flex items-center gap-10"
          >
            {links.map((link) => (
              <Magnetic key={link.name}>
                <Link
                  href={link.href}
                  className={`relative font-medium group ${
                    isDark ? "text-white" : "text-white"
                  }`}
                >
                  {link.name}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-blue-500 to-indigo-500 origin-left"
                  />
                </Link>
              </Magnetic>
            ))}
          </motion.nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800"
            >
              {mounted && (isDark ? <Sun size={18} /> : <Moon size={18} />)}
            </button>

            {/* CTA Desktop */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg"
            >
              {locale === "fr" ? "Demander un devis" : "Request a quote"}
            </motion.button>

            {/* LANGUAGE SELECTOR */}
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded ${
                  locale === "fr"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-zinc-700"
                }`}
                onClick={() => changeLocale("fr")}
              >
                FR
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  locale === "en"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-zinc-700"
                }`}
                onClick={() => changeLocale("en")}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="md:hidden backdrop-blur-xl bg-white/95 dark:bg-black/95 border-b border-white/20"
          >
            <div className="flex flex-col gap-6 p-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-gray-800 dark:text-gray-100"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex gap-2 mt-4 justify-center">
                <button
                  className={`px-3 py-2 rounded ${
                    locale === "fr" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-zinc-700"
                  }`}
                  onClick={() => changeLocale("fr")}
                >
                  FR
                </button>
                <button
                  className={`px-3 py-2 rounded ${
                    locale === "en" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-zinc-700"
                  }`}
                  onClick={() => changeLocale("en")}
                >
                  EN
                </button>
              </div>

              {/* Mobile CTA flottant */}
              <button className="mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg">
                {locale === "fr" ? "Demander un devis" : "Request a quote"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
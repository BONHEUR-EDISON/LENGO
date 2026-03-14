"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Menu, X, Sun, Moon, ShoppingCart } from "lucide-react";
import { useTheme } from "next-themes";
import Magnetic from "../effet/Magnetic";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [blur, setBlur] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState("fr");

  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale) setLocale(savedLocale);

    const handleScroll = () => setBlur(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: locale === "fr" ? "Accueil" : "Home", href: "/" },
    { name: locale === "fr" ? "Services" : "Services", href: "/services" },
    { name: locale === "fr" ? "Projets" : "Projects", href: "/projects" },
    { name: locale === "fr" ? "Technologies" : "Technologies", href: "/technologies" },
    { name: locale === "fr" ? "Produits" : "Products", href: "/produits" },
    { name: locale === "fr" ? "Blog" : "Blog", href: "/blog" },
    { name: locale === "fr" ? "Contact" : "Contact", href: "/contact" },
  ];

  return (
    <header
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
      className="fixed top-0 left-0 w-full z-50"
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
        className={`relative transition-all duration-300 backdrop-blur-xl ${
          blur
            ? "bg-white/10 dark:bg-black/20 border-b border-white/20 dark:border-white/10"
            : "bg-blue-500/80 border-b border-blue-300/50"
        }`}
      >
        <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" aria-label="Accueil" className="flex items-center gap-3 flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg"
            >
              <Image
                src="/images/logo.png"
                alt="Logo LENGO"
                width={40}
                height={40}
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="leading-tight">
              <p className="text-lg font-semibold tracking-tight text-white">LENGO</p>
              <p className="text-[10px] tracking-widest text-gray-200 uppercase">Engineering</p>
            </div>
          </Link>

          {/* NAV DESKTOP */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Magnetic key={link.name}>
                <Link
                  href={link.href}
                  className="relative font-medium group text-white whitespace-nowrap"
                >
                  {link.name}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-blue-200 to-indigo-200 origin-left"
                  />
                </Link>
              </Magnetic>
            ))}

            {/* Cart Icon Desktop */}
            <Link href="/panier" className="relative ml-4 text-white">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="ml-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON + Cart */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/panier" className="relative flex-shrink-0">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button onClick={() => setOpen(!open)} aria-label="Menu mobile">
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
            className="md:hidden backdrop-blur-xl bg-blue-500/95 border-b border-blue-300/50 shadow-lg w-full"
          >
            <div className="flex flex-col gap-6 p-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-white"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Theme toggle */}
              {mounted && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
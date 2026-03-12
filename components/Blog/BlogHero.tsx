// "use client";
import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <section className="relative py-32 text-center overflow-hidden">

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Lengo Journal
      </motion.h1>

      <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Design, technologie et innovation pour construire les produits de demain.
      </p>

    </section>
  );
}
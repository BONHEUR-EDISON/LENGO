"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Shield, Users, Zap, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: <Shield className="w-8 h-8 text-blue-500" />,
    title: "Sécurité & Fiabilité",
    description: "Nos solutions respectent les standards internationaux pour assurer sécurité et durabilité.",
  },
  {
    icon: <Users className="w-8 h-8 text-purple-500" />,
    title: "Équipe d’experts",
    description: "Des ingénieurs et techniciens qualifiés pour des projets de qualité supérieure.",
  },
  {
    icon: <Zap className="w-8 h-8 text-green-500" />,
    title: "Innovation technologique",
    description: "Intégration des dernières technologies pour optimiser performance et efficacité.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-yellow-500" />,
    title: "Résultats garantis",
    description: "Chaque projet est livré avec un suivi complet et des performances mesurables.",
  },
];

export default function WhyChooseUs() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`py-28 transition-colors duration-500 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2
            id="why-heading"
            className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${isDark ? "text-white" : "text-blue-600"}`}
          >
            Pourquoi nous choisir
          </h2>
          <p className={`text-lg md:text-xl transition-colors duration-500 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Nous combinons expertise, technologie et innovation pour vous fournir des solutions de haute qualité, fiables et adaptées à vos besoins.
          </p>
        </motion.div>

        {/* GRID BENEFITS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group p-8 rounded-3xl transition-all duration-500 hover:scale-[1.05] shadow-lg ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
            >
              <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-xl border border-white/10 group-hover:scale-110 transition bg-gradient-to-br from-blue-400/20 to-purple-500/20">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className={`text-sm md:text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
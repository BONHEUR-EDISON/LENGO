"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import CountUp from "react-countup";
import { Users, Globe, Handshake, Star } from "lucide-react";

const stats = [
  { value: 1200, suffix: "+", label: "Utilisateurs", icon: Users, percent: 85 },
  {
    value: 35,
    suffix: "+",
    label: "Partenaires",
    icon: Handshake,
    percent: 70,
  },
  { value: 15, suffix: "", label: "Pays", icon: Globe, percent: 55 },
  { value: 99, suffix: "%", label: "Satisfaction", icon: Star, percent: 99 },
];

export default function StatsSectionPremium() {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <section className={`py-32 ${darkMode ? "bg-gray-900" : "bg-blue-600"}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* titre */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-bold text-white mb-20"
        >
          Notre Impact
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const radius = 52;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (stat.percent / 100) * circumference;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08 }}
                className={`p-10 rounded-3xl text-center backdrop-blur-xl shadow-xl transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white/10 border border-white/20"
                }`}
              >
                {/* cercle progress */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="10"
                      fill="transparent"
                    />

                    <motion.circle
                      cx="64"
                      cy="64"
                      r={radius}
                      stroke="white"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference}
                      animate={{ strokeDashoffset: offset }}
                      transition={{ duration: 2 }}
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* compteur */}
                <h3 className="text-4xl md:text-5xl font-bold text-white">
                  <CountUp end={stat.value} duration={2.5} enableScrollSpy />

                  {stat.suffix}
                </h3>

                <p className="mt-2 text-blue-100 dark:text-gray-300">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

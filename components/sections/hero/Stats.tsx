'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

const stats: Stat[] = [
  { label: "Projets réalisés", value: 120, suffix: "+" },
  { label: "Clients satisfaits", value: 85, suffix: "+" },
  { label: "Années d'expérience", value: 10, suffix: "+" },
  { label: "Technologies maîtrisées", value: 25, suffix: "+" },
];

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const step = value / (duration / 16);

    const interval = setInterval(() => {
      start += step;
      if (start >= value) {
        start = value;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-6 sm:mt-10">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >

        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="
            backdrop-blur-xl
            bg-white/10
            dark:bg-white/5
            border border-white/20
            rounded-2xl
            p-5
            text-center
            shadow-xl
            "
          >

            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>

            <p className="text-xs sm:text-sm text-gray-200 mt-2">
              {stat.label}
            </p>

          </motion.div>
        ))}

      </motion.div>

    </div>
  );
}
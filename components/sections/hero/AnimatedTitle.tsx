"use client";

import { motion } from "framer-motion";

interface Props {
  text: string;
}

export default function AnimatedTitle({ text }: Props) {
  const words = text.split(" ");

  return (
    <motion.h1
      className="text-5xl md:text-6xl lg:text-7xl font-bold flex flex-wrap justify-center text-center"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4 }}
          className="mr-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
'use client'

import { motion } from "framer-motion"

export default function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
    className="overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  )
}
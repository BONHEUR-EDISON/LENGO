'use client'

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  delay?: number
}

export default function Reveal({ children, delay = 0 }: RevealProps) {
  return (
    <motion.div
      style={{ willChange: "transform, opacity" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
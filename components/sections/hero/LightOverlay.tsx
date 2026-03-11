// components/hero/LightOverlay.tsx
'use client'

import { motion } from "framer-motion"

export default function LightOverlay() {
  return (
    <motion.div
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute inset-0 opacity-30"
      style={{
        background:
          "radial-gradient(circle at center, rgba(59,130,246,0.4), transparent 60%)",
        backgroundSize: "200% 200%"
      }}
    />
  )
}
'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

export default function CTAButton({ href, children, className = "", fullWidth = false }: CTAButtonProps) {
  const { darkMode } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Si pas encore monté côté client, on ne rend rien pour éviter mismatch
  if (!mounted) return null

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-block ${fullWidth ? "w-full md:w-auto" : ""}`}
    >
      <Link
        href={href}
        className={`
          ${darkMode ? "bg-blue-500 hover:bg-blue-400 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"} 
          px-6 py-3 rounded-md text-lg font-semibold transition 
          shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/50
          backdrop-blur-sm
          ${className}
        `}
      >
        {children}
      </Link>
    </motion.div>
  )
}
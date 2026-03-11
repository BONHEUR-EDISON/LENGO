'use client'

import { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextType {
  darkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {}
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {

    const stored = localStorage.getItem("theme")

    if (stored === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }

  }, [])

  const toggleDarkMode = () => {

    const newMode = !darkMode
    setDarkMode(newMode)

    if (newMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
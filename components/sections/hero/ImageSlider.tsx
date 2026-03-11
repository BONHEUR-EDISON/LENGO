'use client'
import { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  "/images/hero-img1.jpg",
  "/images/hero-img2.jpg",
  "/images/hero-img1.jpg",
]

export default function ImageSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full relative">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Hero ${index + 1}`}
          fill
          className={`absolute inset-0 object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/25"></div>
    </div>
  )
}
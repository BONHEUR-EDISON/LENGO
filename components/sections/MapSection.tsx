'use client'

import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"

const MapNoSSR = dynamic(() => import("../MapContent"), { ssr: false })

export default function MapSection() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
          Nos installations
        </h2>
        <div className="h-[500px] rounded-xl overflow-hidden shadow-lg">
          <MapNoSSR />
        </div>
      </div>
    </section>
  )
}
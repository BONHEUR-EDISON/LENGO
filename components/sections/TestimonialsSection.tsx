'use client'

import Image from "next/image"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Jean Mukendi",
    role: "Directeur immobilier",
    message: "LENGO Engineering a installé nos ascenseurs avec un professionnalisme remarquable.",
    image: "/clients/client1.jpg"
  },
  {
    name: "Sarah Ndaya",
    role: "Entrepreneure",
    message: "Une équipe technique très compétente pour nos structures métalliques.",
    image: "/clients/client2.jpg"
  },
  {
    name: "David Kabongo",
    role: "Ingénieur",
    message: "Solutions domotiques modernes et parfaitement intégrées.",
    image: "/clients/client3.jpg"
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-28 bg-blue-600 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Témoignages</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-3">Ce que nos clients disent de nous</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 dark:text-gray-200 mb-6">"{testimonial.message}"</p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
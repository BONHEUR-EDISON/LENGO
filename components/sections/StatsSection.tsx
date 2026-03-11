import { motion } from "framer-motion"

const stats = [
  { value: "1200+", label: "Utilisateurs" },
  { value: "35+", label: "Partenaires" },
  { value: "15", label: "Pays" },
  { value: "99%", label: "Satisfaction" }
]

export default function StatsSection() {
  return (
    <section className="py-24 bg-blue-600 text-white dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl font-bold">{stat.value}</h3>
              <p className="mt-2 text-blue-100 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
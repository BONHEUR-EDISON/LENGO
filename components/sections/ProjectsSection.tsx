"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";

type Project = {
  title: string;
  category: string;
  image: string;
  result?: string;
};

const projects: Project[] = [
  {
    title: "Installation d’ascenseur moderne",
    category: "Ascenseurs",
    image: "/images/projects/elevator.webp",
    result: "12 bâtiments équipés",
  },
  {
    title: "Structure métallique industrielle",
    category: "Construction métallique",
    image: "/images/projects/métallique.webp",
    result: "5 usines livrées",
  },
  {
    title: "Système d’irrigation automatisé",
    category: "Irrigation",
    image: "/images/projects/irrigation.jpg",
    result: "80 hectares modernisés",
  },
  {
    title: "Machines industrielles",
    category: "Ingénierie",
    image: "/images/projects/machines.jpg",
    result: "20 machines installées",
  },
  {
    title: "Domotique bâtiment intelligent",
    category: "Domotique",
    image: "/images/projects/domotique.jpg",
    result: "25 bâtiments connectés",
  },
  {
    title: "Infrastructure technique",
    category: "Engineering",
    image: "/images/projects/engineering.jfif",
    result: "10 sites opérationnels",
  },
];

export default function ProjectsSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`py-28 transition-colors duration-500 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2
            id="projects-heading"
            className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${isDark ? "text-white" : "text-blue-600"}`}
          >
            Projets réalisés
          </h2>
          <p
            className={`text-lg md:text-xl transition-colors duration-500 ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Découvrez nos réalisations emblématiques en ingénierie, construction et technologies.
          </p>
        </div>

        {/* GRID PROJECTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer transition-transform duration-500 ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              tabIndex={0}
              aria-label={`${project.title}, ${project.category}`}
            >
              {/* IMAGE */}
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                priority={index === 0}
                loading={index !== 0 ? "lazy" : "eager"}
              />

              {/* OVERLAY HOVER */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition duration-500 z-10"
              />

              {/* INFO */}
              <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-md bg-black/50 dark:bg-gray-900/50 rounded-b-3xl text-white">
                <span className="text-blue-400 text-sm">{project.category}</span>
                <h3 className="text-xl font-semibold mt-1">{project.title}</h3>
                {project.result && <p className="text-sm mt-1">{project.result}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* BUTTON SEE MORE */}
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:scale-105 transition"
          >
            Voir plus de projets
          </Link>
        </div>
      </div>
    </section>
  );
}
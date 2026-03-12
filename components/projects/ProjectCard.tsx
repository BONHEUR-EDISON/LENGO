"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { useTheme } from "next-themes";

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const { theme } = useTheme();

  // Couleurs selon le thème
  const overlayGradient =
    theme === "dark"
      ? "from-black/80 via-black/40 to-transparent"
      : "from-black/60 via-black/30 to-transparent";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const categoryColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const resultColor = theme === "dark" ? "text-blue-400" : "text-blue-600";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer h-[320px]"
      onClick={() => onOpen(project)}
    >
      {/* IMAGE */}
      <div className="relative w-full h-full">
        <Image
          src={project.images?.[0] || "/images/placeholder.jpg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-700 group-hover:scale-110"
        />

        {/* OVERLAY GRADIENT */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${overlayGradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
        />
      </div>

      {/* TEXTE */}
      <div className={`absolute bottom-0 p-6 w-full`}>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`text-2xl font-semibold ${textColor}`}
        >
          {project.title}
        </motion.h2>

        <p className={`text-sm opacity-80 ${categoryColor}`}>{project.category}</p>

        {project.result && (
          <p className={`mt-2 text-sm font-semibold ${resultColor}`}>{project.result}</p>
        )}
      </div>
    </motion.div>
  );
}
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/types/project";

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => onOpen(project)}
    >
      {/* IMAGE */}
      <div className="relative h-[320px] w-full overflow-hidden">
        <Image
          src={project.images?.[0] || "/images/placeholder.jpg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* OVERLAY GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* TEXTE */}
      <div className="absolute bottom-0 p-6 text-white w-full">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold"
        >
          {project.title}
        </motion.h2>

        <p className="text-sm opacity-80">{project.category}</p>

        {project.result && (
          <p className="text-blue-400 mt-2 text-sm font-semibold">
            {project.result}
          </p>
        )}
      </div>
    </motion.div>
  );
}
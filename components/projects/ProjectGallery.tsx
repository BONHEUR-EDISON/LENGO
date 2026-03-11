'use client';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React from "react";

type Project = {
  id: number;
  title: string;
  category: string;
  images: string[]; // plusieurs images
  description: string;
  technologies?: string[];
  result?: string;
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full overflow-y-auto max-h-[90vh] relative p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 text-xl font-bold"
          >
            ×
          </button>

          <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

          {project.technologies && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Technologies :</h3>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.result && (
            <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
              {project.result}
            </p>
          )}

          {/* Galerie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((img, index) => (
              <div key={index} className="relative h-48 w-full rounded overflow-hidden">
                <Image src={img} alt={`${project.title} ${index}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
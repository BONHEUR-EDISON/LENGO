"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

type Project = {
  id: number;
  title: string;
  category: string;
  images?: string[];
  description: string;
  technologies?: string[];
  result?: string;
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const { theme } = useTheme(); // ← récupération du thème
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setCurrentImage(0);
  }, [project]);

  const images = project?.images?.filter(Boolean) ?? [];

  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 80) prevImage();
    if (info.offset.x < -80) nextImage();
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{
          backgroundColor: theme === "dark" ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)",
          backdropFilter: "blur(6px)",
        }}
        onClick={onClose}
      >
        <motion.div
          key="modal-content"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={`rounded-2xl max-w-6xl w-full overflow-hidden flex flex-col md:flex-row relative shadow-2xl`}
          style={{
            backgroundColor: theme === "dark" ? "#111827" : "#ffffff",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* IMAGE SECTION */}
          <div className="relative w-full md:w-1/2 h-80 md:h-[520px]">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentImage] ?? "/images/placeholder.jpg"}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition"
                  style={{
                    backgroundColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.35)",
                    color: theme === "dark" ? "#fff" : "#fff",
                  }}
                  aria-label="Image précédente"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition"
                  style={{
                    backgroundColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.35)",
                    color: theme === "dark" ? "#fff" : "#fff",
                  }}
                  aria-label="Image suivante"
                >
                  ›
                </button>
              </>
            )}

            {/* thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 px-4 overflow-x-auto absolute bottom-4 left-0 w-full">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`relative w-20 h-16 rounded overflow-hidden border ${
                      index === currentImage
                        ? theme === "dark"
                          ? "border-blue-400"
                          : "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${index + 1}`} fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO SECTION */}
          <div className="p-6 md:p-8 overflow-y-auto max-h-[520px] md:w-1/2 flex flex-col">
            <h2 className={theme === "dark" ? "text-white text-3xl font-bold mb-3" : "text-gray-900 text-3xl font-bold mb-3"}>
              {project.title}
            </h2>
            <p className={theme === "dark" ? "text-gray-300 mb-6" : "text-gray-600 mb-6"}>{project.description}</p>

            {project.technologies && (
              <>
                <h3 className={theme === "dark" ? "font-semibold mb-2 text-gray-200" : "font-semibold mb-2 text-gray-800"}>
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-sm rounded-full ${
                        theme === "dark"
                          ? "bg-blue-800 text-blue-200"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </>
            )}

            {project.result && (
              <p className={`font-semibold mb-6 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                {project.result}
              </p>
            )}
          </div>

          {/* bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition"
            style={{
              backgroundColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.35)",
              color: "#fff",
            }}
            aria-label="Fermer le modal"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
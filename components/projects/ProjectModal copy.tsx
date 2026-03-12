"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";

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

  const [currentImage, setCurrentImage] = useState(0);

  // reset image lorsque projet change
  useEffect(() => {
    setCurrentImage(0);
  }, [project]);

  // sécurité images
  const images = project?.images?.filter(Boolean) ?? [];

  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >

        <motion.div
          key="modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full overflow-hidden relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >

          {/* bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
          >
            ✕
          </button>

          <div className="grid md:grid-cols-2">

            {/* IMAGE SECTION */}
            <div className="relative h-[320px] md:h-[520px] bg-black">

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
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </motion.div>

              {images.length > 1 && (
                <>
                  {/* bouton gauche */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
                  >
                    ‹
                  </button>

                  {/* bouton droite */}
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
                  >
                    ›
                  </button>
                </>
              )}

            </div>

            {/* INFO SECTION */}
            <div className="p-8 overflow-y-auto max-h-[520px]">

              <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                {project.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {project.description}
              </p>

              {project.technologies && (
                <>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Technologies
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {project.result && (
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-6">
                  {project.result}
                </p>
              )}

              {/* thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`relative w-20 h-16 rounded overflow-hidden border ${
                        index === currentImage
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
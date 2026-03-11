'use client';

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { Project } from "@/types/project";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  projects: Project[];
};

export default function ProjectCarousel({ projects }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayedProjects = projects.slice(0, 6);

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.children[index] as HTMLElement;
    if (!card) return;
    const offsetLeft = card.offsetLeft;
    carouselRef.current.scrollTo({ left: offsetLeft, behavior: "smooth" });
  };

  const scroll = (direction: "left" | "right") => {
    let newIndex = activeIndex;
    if (direction === "left") newIndex = Math.max(activeIndex - 1, 0);
    else newIndex = Math.min(activeIndex + 1, displayedProjects.length - 1);
    scrollToIndex(newIndex);
  };

  // Met à jour le dot actif selon le scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      const children = Array.from(carouselRef.current.children) as HTMLElement[];
      const scrollLeft = carouselRef.current.scrollLeft;
      const index = children.findIndex((child, i) => {
        const left = child.offsetLeft;
        const right = left + child.offsetWidth;
        return scrollLeft + child.offsetWidth / 2 >= left && scrollLeft + child.offsetWidth / 2 < right;
      });
      if (index !== -1) setActiveIndex(index);
    };

    const refCurrent = carouselRef.current;
    refCurrent?.addEventListener("scroll", handleScroll);
    return () => refCurrent?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="relative">
        {/* Flèches desktop */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white rounded-full p-3 shadow-lg z-10"
          aria-label="Précédent"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white rounded-full p-3 shadow-lg z-10"
          aria-label="Suivant"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carrousel projets */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto space-x-6 scrollbar-hide snap-x snap-mandatory scroll-smooth py-6 px-2 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible"
        >
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                className="flex-shrink-0 w-72 md:w-auto snap-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onOpen={(p) => setModalProject(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {displayedProjects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeIndex === index
                  ? "bg-blue-500 dark:bg-blue-400"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Projet ${index + 1}`}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Modal détaillé */}
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </>
  );
}
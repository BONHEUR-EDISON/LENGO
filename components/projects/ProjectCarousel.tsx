"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useTheme } from "next-themes";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { Project } from "@/types/project";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = { projects: Project[] };

export default function ProjectCarousel({ projects }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [activePage, setActivePage] = useState(0);

  const { theme } = useTheme(); // ← récupération du thème

  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(2);

  // Responsive
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCols(1);
      setRows(1);
    } else if (window.innerWidth < 1024) {
      setCols(2);
      setRows(2);
    } else {
      setCols(3);
      setRows(2);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projectsPerPage = cols * rows;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginatedProjects = Array.from({ length: totalPages }, (_, pageIndex) =>
    projects.slice(pageIndex * projectsPerPage, (pageIndex + 1) * projectsPerPage)
  );

  const scrollToPage = (page: number) => {
    if (!carouselRef.current) return;
    const pageWidth = carouselRef.current.offsetWidth;
    carouselRef.current.scrollTo({ left: page * pageWidth, behavior: "smooth" });
    setActivePage(page);
  };

  const scroll = (direction: "left" | "right") => {
    let newPage = activePage;
    if (direction === "left") newPage = (activePage - 1 + totalPages) % totalPages;
    else newPage = (activePage + 1) % totalPages;
    scrollToPage(newPage);
  };

  // Swipe mobile
  const handlers = useSwipeable({
    onSwipedLeft: () => scroll("right"),
    onSwipedRight: () => scroll("left"),
    trackMouse: true,
  });

  // Autoscroll automatique
  useEffect(() => {
    const interval = setInterval(() => scroll("right"), 6000);
    return () => clearInterval(interval);
  }, [activePage, totalPages]);

  // Met à jour la page active si scroll manuel
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      const scrollLeft = carouselRef.current.scrollLeft;
      const pageIndex = Math.round(scrollLeft / carouselRef.current.offsetWidth);
      setActivePage(pageIndex);
    };
    const refCurrent = carouselRef.current;
    refCurrent?.addEventListener("scroll", handleScroll);
    return () => refCurrent?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="relative">
        {/* Flèches Desktop */}
        <button
          onClick={() => scroll("left")}
          className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 
                      bg-white/30 backdrop-blur-md hover:bg-white/50 
                      text-black rounded-full p-3 shadow-xl z-20 transition
                      ${theme === "dark" ? "bg-black/30 hover:bg-black/50 text-white" : ""}`}
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={() => scroll("right")}
          className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 
                      bg-white/30 backdrop-blur-md hover:bg-white/50 
                      text-black rounded-full p-3 shadow-xl z-20 transition
                      ${theme === "dark" ? "bg-black/30 hover:bg-black/50 text-white" : ""}`}
        >
          <ChevronRight size={28} />
        </button>

        {/* Carousel */}
        <div
          {...handlers}
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
        >
          {paginatedProjects.map((pageProjects, pageIndex) => (
            <motion.div
              key={pageIndex}
              className="flex-shrink-0 w-full snap-start grid gap-6 px-2 md:px-0"
              style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gridAutoRows: rows === 1 ? "auto" : "320px",
              }}
            >
              <AnimatePresence>
                {pageProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <ProjectCard project={project} onOpen={() => setModalProject(project)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-3 z-10 relative">
          {Array.from({ length: totalPages }).map((_, index) => (
            <motion.button
              key={index}
              animate={{ scale: activePage === index ? 1.4 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`w-3 h-3 rounded-full transition-colors ${
                activePage === index
                  ? "bg-blue-500 dark:bg-blue-400"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              onClick={() => scrollToPage(index)}
            />
          ))}
        </div>
      </section>

      {/* Modal projet */}
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </>
  );
}
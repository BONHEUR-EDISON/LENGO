"use client";
import React from "react";
import { useTheme } from "next-themes";

type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

export default function ProjectFilters({ categories, selected, onSelect }: Props) {
  const { theme } = useTheme();

  return (
    <section className="flex justify-center gap-4 mb-12 flex-wrap">
      {categories.map((cat) => {
        const isSelected = selected === cat;

        // Couleurs dynamiques selon thème
        const bgClass = isSelected
          ? theme === "dark"
            ? "bg-blue-500 text-white shadow-lg"
            : "bg-blue-600 text-white shadow-lg"
          : theme === "dark"
          ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-blue-900 hover:text-blue-200"
          : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:text-blue-600";

        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`relative px-5 py-2 rounded-full font-medium text-sm transition-all ${bgClass}`}
          >
            {cat}
            {/* Underline animé */}
            <span
              className={`absolute left-1/2 -bottom-1 h-1 w-0 rounded-full transition-all duration-300 ease-out ${
                isSelected
                  ? "w-1/2 -translate-x-1/2 bg-white dark:bg-blue-200"
                  : ""
              }`}
            />
          </button>
        );
      })}
    </section>
  );
}
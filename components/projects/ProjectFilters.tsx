'use client';
import React from "react";

type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

export default function ProjectFilters({ categories, selected, onSelect }: Props) {
  return (
    <section className="flex justify-center gap-4 mb-12 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border ${
            selected === cat
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-500"
          } transition-all hover:bg-blue-500 hover:text-white`}
        >
          {cat}
        </button>
      ))}
    </section>
  );
}
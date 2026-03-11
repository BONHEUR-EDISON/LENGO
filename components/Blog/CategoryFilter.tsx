'use client';
import React from 'react';

type Props = {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
};

export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border transition ${
            selected === cat ? 'bg-blue-600 text-white' : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
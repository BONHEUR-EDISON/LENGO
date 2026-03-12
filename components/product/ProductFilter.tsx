'use client';

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface ProductFilterProps {
  categories?: string[];
  selectedCategory?: string | null;
  onCategoryChange?: (category: string | null) => void;
  onPriceChange?: (range: [number, number] | null) => void;
}

export default function ProductFilter({
  categories = [],
  selectedCategory,
  onCategoryChange,
  onPriceChange,
}: ProductFilterProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    onPriceChange?.([0, value]);
  };

  return (
    <div
      className={`
        space-y-6 p-4 rounded-lg
        ${theme === "light" ? "bg-blue-100" : "bg-gray-900"}
        transition-colors
      `}
    >
      {/* Filtre catégorie */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            className={`
              px-3 py-1 rounded
              ${!selectedCategory
                ? theme === "light" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
                : theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-gray-200"}
              transition-colors
            `}
            onClick={() => onCategoryChange?.(null)}
          >
            Toutes
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`
                px-3 py-1 rounded
                ${selectedCategory === cat
                  ? theme === "light" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
                  : theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-gray-200"}
                transition-colors
              `}
              onClick={() => onCategoryChange?.(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Filtre prix */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
          Prix maximum : ${maxPrice}
        </label>
        <input
          type="range"
          min={0}
          max={2000}
          value={maxPrice}
          onChange={handlePriceChange}
          className="w-full"
        />
      </div>
    </div>
  );
}
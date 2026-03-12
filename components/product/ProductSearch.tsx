'use client';

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface ProductSearchProps {
  value?: string;
  onChange?: (query: string) => void;
}

export default function ProductSearch({ value = "", onChange }: ProductSearchProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // On monte le composant côté client pour détecter le thème correctement
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Input de recherche */}
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={value}
        onChange={handleChange}
        className={`
          w-full border rounded-lg p-3
          ${theme === "light" ? "bg-blue-100 border-blue-300 text-gray-900" : "bg-gray-800 border-gray-700 text-white"}
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors
        `}
      />

      {/* Dropdown de suggestions */}
      {value && (
        <div
          className={`
            absolute rounded-lg mt-2 w-full shadow-lg max-h-64 overflow-y-auto z-50
            ${theme === "dark" ? "bg-blue-50 border border-blue-200" : "bg-gray-900 border-gray-700"}
            transition-colors
          `}
        >
          {/* Suggestions dynamiques ou statiques peuvent être ajoutées ici */}
        </div>
      )}
    </div>
  );
}
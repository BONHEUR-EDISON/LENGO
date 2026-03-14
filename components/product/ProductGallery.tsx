'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images?: string[]; // optionnel
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const safeImages = images && images.length > 0 ? images : ["/images/produits/fallback.png"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const prevImage = () => setSelectedIndex((selectedIndex - 1 + safeImages.length) % safeImages.length);
  const nextImage = () => setSelectedIndex((selectedIndex + 1) % safeImages.length);
  const selectImage = (idx: number) => setSelectedIndex(idx);

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg">
        <AnimatePresence initial={false}>
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={safeImages[selectedIndex]}
              alt={`Image produit ${selectedIndex + 1}`}
              fill
              className="object-contain"
              onError={(e) => (e.currentTarget.src = "/images/produits/fallback.png")}
            />
          </motion.div>
        </AnimatePresence>

        {/* Flèches navigation */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition"
        >
          &#10094;
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition"
        >
          &#10095;
        </button>
      </div>

      {/* Miniatures */}
      <div className="flex space-x-3 overflow-x-auto py-1">
        {safeImages.map((img, idx) => (
          <motion.button
            key={idx}
            onClick={() => selectImage(idx)}
            className="relative flex-shrink-0 rounded-lg border-2 overflow-hidden"
            initial={{ scale: 1 }}
            animate={{ scale: idx === selectedIndex ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={80}
              height={80}
              className={`object-cover transition-all duration-300 ${
                idx === selectedIndex ? 'border-blue-600' : 'border-gray-300'
              }`}
              onError={(e) => (e.currentTarget.src = "/images/produits/fallback.png")}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
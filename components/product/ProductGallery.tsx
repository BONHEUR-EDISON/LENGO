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
  const [mainImg, setMainImg] = useState(safeImages[0]);

  const prevImage = () => {
    const newIndex = selectedIndex === 0 ? safeImages.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setMainImg(safeImages[newIndex]);
  };

  const nextImage = () => {
    const newIndex = selectedIndex === safeImages.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setMainImg(safeImages[newIndex]);
  };

  const selectImage = (idx: number) => {
    setSelectedIndex(idx);
    setMainImg(safeImages[idx]);
  };

  return (
    <div>
      <div className="relative w-full h-96 mb-4">
        <AnimatePresence initial={false}>
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={mainImg}
              alt={`Image produit ${selectedIndex + 1}`}
              fill
              className="object-contain rounded"
              onError={(e) => (e.currentTarget.src = "/images/produits/fallback.png")}
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition"
        >
          &#10094;
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition"
        >
          &#10095;
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto">
        {safeImages.map((img, idx) => (
          <button key={idx} onClick={() => selectImage(idx)} className="relative">
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              width={80}
              height={80}
              className={`object-cover rounded border-2 ${idx === selectedIndex ? 'border-blue-600' : 'border-gray-300'}`}
              onError={(e) => (e.currentTarget.src = "/images/produits/fallback.png")}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
'use client';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  image: string;
}

interface Props {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: Props) {
  const { theme } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        href={`/produits/${product.slug}`}
        className={`group relative flex flex-col border rounded-2xl overflow-hidden shadow-lg transition-shadow duration-300
          ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"}`}
      >
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse dark:bg-gray-800 z-10" />
        )}

        <div className="w-full h-64 relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className={`transition-transform duration-500 ease-out ${
              imageLoaded ? "group-hover:scale-105" : "scale-100"
            }`}
            priority={index < 3}
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </div>

        {/* Glassmorphism overlay for text */}
        <div
          className={`p-6 flex flex-col flex-1 backdrop-blur-md ${
            theme === "dark"
              ? "bg-black/30 text-white"
              : "bg-white/30 text-gray-900"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-indigo-500 transition-colors duration-300">
            {product.name}
          </h2>
          <p className="text-xl font-bold mb-4">
            ${product.price}
          </p>
          <p className="line-clamp-3 flex-1">{product.description}</p>

          <span className="mt-4 inline-block font-medium text-indigo-600 group-hover:underline transition-all duration-300">
            Voir le produit →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
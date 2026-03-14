'use client';

import { products } from "@/data/products";
import Link from "next/link";
import Image from "next/image";

interface RelatedProductsProps {
  currentId: number;
  theme?: 'light' | 'dark'; // ajout du thème
}

export default function RelatedProducts({
  currentId,
  theme = 'light',
}: RelatedProductsProps) {
  const related = products.filter((p) => p.id !== currentId).slice(0, 4);
  if (related.length === 0) return null;

  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const priceColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const buttonBg = theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600';
  const buttonHover = theme === 'dark' ? 'hover:bg-blue-600' : 'hover:bg-blue-700';

  return (
    <section className="max-w-7xl mx-auto mt-20 px-6">
      <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${textColor}`}>
        Produits similaires
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((product) => (
          <Link
            key={product.id}
            href={`/produits/${product.slug}`}
            prefetch
            className={`group border ${borderColor} rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-1`}
          >
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={product.image || "/images/produits/fallback.png"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => (e.currentTarget.src = "/images/produits/fallback.png")}
              />
            </div>
            <div className="p-4 flex flex-col justify-between h-36">
              <div>
                <h3 className={`font-semibold mb-1 ${textColor}`}>{product.name}</h3>
                <p className={`font-bold ${priceColor}`}>${product.price.toFixed(2)}</p>
              </div>
              <button
                className={`mt-2 w-full py-2 text-sm font-semibold ${buttonBg} text-white rounded-lg ${buttonHover} transition`}
              >
                Voir le produit
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
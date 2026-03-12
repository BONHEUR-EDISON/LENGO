'use client';

import { products } from "@/data/products";
import Link from "next/link";
import Image from "next/image";

interface RelatedProductsProps {
  currentId: number;
}

export default function RelatedProducts({ currentId }: RelatedProductsProps) {
  const related = products.filter((p) => p.id !== currentId).slice(0, 4);
  if (related.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto mt-20 px-6">
      <h2 className="text-3xl font-bold mb-8">Produits similaires</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {related.map((product) => (
          <Link
            key={product.id}
            href={`/produits/${product.slug}`}
            prefetch
            className="border rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative h-52">
              <Image
                src={product.image || "/images/produits/fallback.png"}
                alt={product.name}
                fill
                className="object-cover"
                onError={(e) => (e.currentTarget.src = "/images/produits/fallback.png")}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="font-bold">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
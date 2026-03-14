// lib/produits.ts
import { products, Product } from "@/data/products";

/**
 * Récupère un produit par son slug.
 * @param slug - Le slug du produit
 * @returns Promise<Product | undefined>
 */
export async function getProduitBySlug(slug: string): Promise<Product | undefined> {
  // Ici tu peux remplacer par un fetch depuis la BDD si nécessaire
  return products.find((p) => p.slug === slug);
}

/**
 * Récupère tous les slugs disponibles
 * Utile pour generateStaticParams ou navigation
 */
export async function getAllProduitSlugs(): Promise<string[]> {
  return products.map((p) => p.slug);
}
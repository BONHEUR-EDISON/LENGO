// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/getAllPosts";
import { getAllProduitSlugs } from "@/lib/produits";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: ChangeFreq;
  priority?: number;
}

// Utilitaire pour créer un sitemap entry
const makeEntry = (
  path: string,
  opts?: { lastModified?: Date; changeFrequency?: ChangeFreq; priority?: number }
): SitemapEntry => ({
  url: `https://lengo-engineeringg.vercel.app${path}`,
  lastModified: opts?.lastModified ?? new Date(),
  changeFrequency: opts?.changeFrequency ?? "weekly",
  priority: opts?.priority ?? 0.7,
});

// Génération par batch pour limiter l’utilisation mémoire
async function generatePages<T extends { slug: string; date?: string }>(
  fetchFn: () => Promise<T[]>,
  prefix: string,
  batchSize = 500
): Promise<SitemapEntry[]> {
  const items = await fetchFn();
  const pages: SitemapEntry[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize).map(item =>
      makeEntry(`${prefix}/${item.slug}`, { lastModified: item.date ? new Date(item.date) : undefined })
    );
    pages.push(...batch);
  }

  return pages;
}

// Adaptateur pour les produits (string[] => { slug })
const adaptSlugs = (slugs: string[]) => slugs.map(slug => ({ slug }));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1️⃣ Pages principales
  const mainPages: SitemapEntry[] = [
    makeEntry("/", { priority: 1 }),
    makeEntry("/services", { priority: 0.9 }),
    makeEntry("/projects", { priority: 0.8 }),
    makeEntry("/technologies", { priority: 0.8 }),
    makeEntry("/produits", { priority: 0.8 }),
    makeEntry("/blog", { priority: 0.9 }),
    makeEntry("/contact", { changeFrequency: "monthly", priority: 0.6 }),
    makeEntry("/panier", { priority: 0.5 }),
  ];

  // 2️⃣ Génération lazy des pages dynamiques
  const [postPages, productPages] = await Promise.all([
    generatePages(getAllPosts, "/blog"),                           // blog au format { slug, date }
    generatePages(async () => adaptSlugs(await getAllProduitSlugs()), "/produits"), // produits string[] => { slug }
  ]);

  return [...mainPages, ...postPages, ...productPages];
}
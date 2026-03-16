// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/getAllPosts";
import { getAllProduitSlugs } from "@/lib/produits";

// type littéral pour éviter le cast répété
type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFreq;
  priority: number;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const productSlugs = await getAllProduitSlugs();

  // Fusion de toutes les URLs dynamiques et statiques
  const urls: SitemapEntry[] = [
    // Pages principales
    { url: "/", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "/produits", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "/services", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: "/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },

    // Pages du blog
    ...posts.map(post => ({
      url: `/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    // Pages produits
    ...productSlugs.map(slug => ({
      url: `/produits/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  // On préfixe automatiquement le domaine pour Vercel
  return urls.map(entry => ({
    ...entry,
    url: `https://lengo-engineeringg.vercel.app${entry.url}`,
  }));
}
// app/sitemap.ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/getAllPosts";
import { getAllProduitSlugs } from "@/lib/produits";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1️⃣ Pages dynamiques du blog
  const posts = await getAllPosts();
  const postUrls = posts.map(post => ({
    url: `https://lengo-engineeringg.vercel.app/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 2️⃣ Pages dynamiques des produits
  const productSlugs = await getAllProduitSlugs();
  const productUrls = productSlugs.map(slug => ({
    url: `https://lengo-engineeringg.vercel.app/produits/${slug}`,
    lastModified: new Date(), // si tu as une date spécifique, remplace ici
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 3️⃣ Pages principales
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: "https://lengo-engineeringg.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://lengo-engineeringg.vercel.app/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://lengo-engineeringg.vercel.app/produits",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://lengo-engineeringg.vercel.app/services",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://lengo-engineeringg.vercel.app/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [...mainPages, ...postUrls, ...productUrls];
}
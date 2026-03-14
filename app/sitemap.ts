import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
}
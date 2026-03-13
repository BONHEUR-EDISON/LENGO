// lib/getAllPosts.ts
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  image: string;
  summary: string;
  category: string;
}

const postsDirectory = path.join(process.cwd(), "data/blog/posts");

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    files.map(async (file, index) => {
      if (!file.endsWith(".mdx")) return null;

      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(postsDirectory, file);
      let content: string;

      try {
        content = await fs.readFile(filePath, "utf-8");
      } catch (err) {
        console.warn(`Impossible de lire le fichier ${file}:`, err);
        return null;
      }

      const { data } = matter(content);

      // Vérification de la date et formatage
      let postDate = "1970-01-01";
      if (data.date) {
        const parsed = Date.parse(data.date);
        postDate = isNaN(parsed) ? "1970-01-01" : data.date;
      }

      return {
        id: index,
        slug,
        title: data.title || "No title",
        date: postDate,
        image: data.image || "/images/default.png",
        summary: data.summary || "",
        category: data.category || "Uncategorized",
      };
    })
  );

  // Supprime les fichiers nuls (non .mdx ou erreurs)
  const validPosts = posts.filter((p): p is BlogPost => p !== null);

  // Tri par date décroissante
  validPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

  return validPosts;
}
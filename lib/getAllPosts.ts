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
      const slug = file.replace(/\.mdx$/, "");
      const content = await fs.readFile(path.join(postsDirectory, file), "utf-8");
      const { data } = matter(content);

      return {
        id: index,
        slug,
        title: data.title || "No title",
        date: data.date || "No date",
        image: data.image || "/default.jpg",
        summary: data.summary || "",
        category: data.category || "Uncategorized",
      };
    })
  );

  // Tri par date décroissante
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}
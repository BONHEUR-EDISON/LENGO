// lib/mdx.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize"; // <- serialize au lieu de compileMDX

export async function loadMdx(slug: string) {
  const filePath = path.join(process.cwd(), "data/blog/posts", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);
  const mdxContent = await serialize(content, { scope: data }); // serialize prend le contenu et les frontmatter
  return { mdxContent, frontMatter: data };
}
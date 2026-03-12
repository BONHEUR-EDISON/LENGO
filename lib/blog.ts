import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"
import { Post } from "@/types/blog"

const postsDirectory = path.join(process.cwd(), "data/blog/posts")

export async function getAllPosts(): Promise<Post[]> {
  const files = await fs.readdir(postsDirectory)

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(".mdx", "")

      const content = await fs.readFile(
        path.join(postsDirectory, file),
        "utf8"
      )

      const { data } = matter(content)

      return {
        slug,
        title: data.title,
        summary: data.summary,
        image: data.image,
        date: data.date,
        category: data.category,
      }
    })
  )

  return posts.sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}
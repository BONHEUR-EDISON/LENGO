import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";

import Header from "@/components/Blog/Header";
import Footer from "@/components/Blog/Footer";
import LeftBar from "@/components/Blog/LeftBar";
import TableOfContents from "@/components/Blog/TableOfContents";
import BlogContent from "@/components/Blog/BlogContent";
import SEO from "@/components/Blog/SEO";
import { readingTime } from "@/lib/readingTime";

const postsDirectory = path.join(process.cwd(), "data/blog/posts");

export async function generateStaticParams() {
  const files = await fs.readdir(postsDirectory);
  return files.map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

interface PostSummary {
  slug: string;
  title: string;
  date: string;
  image: string;
  summary?: string;
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  let fileContent: string;

  try {
    fileContent = await fs.readFile(filePath, "utf-8");
  } catch {
    return notFound();
  }

  const { content, data } = matter(fileContent);
  const time = readingTime(content);
  const mdxSource = await serialize(content, { scope: data });

  // Générer LeftBar
  const files = await fs.readdir(postsDirectory);
  const otherPosts = (
    await Promise.all(
      files.map(async (file) => {
        const postSlug = file.replace(/\.mdx$/, "");
        if (postSlug === slug) return null;

        const fContent = await fs.readFile(path.join(postsDirectory, file), "utf-8");
        const { data } = matter(fContent);
        return {
          slug: postSlug,
          title: data.title,
          date: data.date,
          image: data.image,
          summary: data.summary,
        } as PostSummary;
      })
    )
  ).filter((p): p is PostSummary => p !== null); // <-- Type guard ici

  return (
    <>
      <SEO title={data.title} description={data.summary} image={data.image} />
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-8">
        {/* LeftBar scrollable */}
        <LeftBar posts={otherPosts} />

        {/* Contenu principal */}
        <div className="flex-1">
          <div className="relative w-full h-80 rounded-xl overflow-hidden mb-8">
            <Image src={data.image} alt={data.title} fill className="object-cover" />
          </div>

          <div className="flex items-center gap-4 mb-2">
            <time className="text-sm text-gray-500 dark:text-gray-400">{data.date}</time>
            <span className="text-sm text-gray-500 dark:text-gray-400">• {time}</span>
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{data.category}</p>

          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{data.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{data.summary}</p>

          <div className="md:flex gap-8">
            <TableOfContents mdxContent={content} scrollSpy={true} />
            <article className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 flex-1">
              <BlogContent mdxSource={mdxSource} />
            </article>
          </div>

          <Link
            href="/blog"
            className="inline-block mt-10 text-blue-600 dark:text-blue-400 underline"
          >
            ← Retour au blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
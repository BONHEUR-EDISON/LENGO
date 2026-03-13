import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Link from "next/link";

import Header from "@/components/Blog/Header";
import Footer from "@/components/Blog/Footer";
import LeftBar from "@/components/Blog/LeftBar";
import TableOfContents from "@/components/Blog/TableOfContents";
import BlogContent from "@/components/Blog/BlogContent";
import SEO from "@/components/Blog/SEO";

import { readingTime } from "@/lib/readingTime";
import { getAllPosts, BlogPost } from "@/lib/getAllPosts";


// génération des routes statiques
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { slug } = await params;

  const posts: BlogPost[] = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  const filePath = path.join(
    process.cwd(),
    "data/blog/posts",
    `${slug}.mdx`
  );

  const fileContent = await fs.readFile(filePath, "utf-8");

  const { content, data } = matter(fileContent);

  const time = readingTime(content);

  const otherPosts: BlogPost[] = posts.filter((p) => p.slug !== slug);

  return (
    <>
      <SEO
        title={data.title}
        description={data.summary}
        image={data.image}
      />
<div className="pt-24">
<Header />
</div>
      
      <main className="max-w-7xl mx-auto px-6 py-16 flex gap-8">

        <LeftBar posts={otherPosts} featuredSlug={slug} />

        <div className="flex-1">

          <div className="relative w-full h-80 rounded-xl overflow-hidden mb-8">
            <img
              src={data.image}
              alt={data.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex items-center gap-4 mb-2">
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {data.date}
            </time>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              • {time}
            </span>
          </div>

          <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
            {data.category}
          </p>

          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {data.title}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {data.summary}
          </p>

          <div className="md:flex gap-8">

            <TableOfContents mdxContent={content} scrollSpy={true} />

            <article className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 flex-1">
              <BlogContent source={content} />
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
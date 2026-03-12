// app/blog/[slug]/page.tsx
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Link from "next/link";
import { serialize, MDXRemoteSerializeResult } from "next-mdx-remote/serialize";

import Header from "@/components/Blog/Header"; // Server Component (pas de hooks)
import Footer from "@/components/Blog/Footer"; // Server Component (pas de hooks)
import LeftBar from "@/components/Blog/LeftBar"; // Client Component (useState, useEffect)
import TableOfContents from "@/components/Blog/TableOfContents"; // Client Component (useState, useEffect)
import BlogContent from "@/components/Blog/BlogContent"; // Client Component (MDXRemote + hooks)
import SEO from "@/components/Blog/SEO";
import { readingTime } from "@/lib/readingTime";
import { getAllPosts, BlogPost } from "@/lib/getAllPosts";

// Génération des routes statiques pour Next.js
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface BlogDetailProps {
  params: Promise<{ slug: string }>; // Promise côté app directory
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const { slug } = await params;

  // Récupération de tous les posts
  const posts: BlogPost[] = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();

  // Lecture du fichier MDX
  const filePath = path.join(process.cwd(), "data/blog/posts", `${slug}.mdx`);
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  // Calcul du temps de lecture et préparation du contenu MDX
  const time = readingTime(content);
  const mdxSource: MDXRemoteSerializeResult = await serialize(content, { scope: data });

  // Autres posts pour la sidebar
  const otherPosts: BlogPost[] = posts.filter((p) => p.slug !== slug);

  return (
    <>
      <SEO title={data.title} description={data.summary} image={data.image} />

      <Header /> {/* Server Component */}

      <main className="max-w-7xl mx-auto px-6 py-16 flex gap-8">
        <LeftBar posts={otherPosts} featuredSlug={slug} /> {/* Client Component */}

        <div className="flex-1">
          {/* Image principale */}
          <div className="relative w-full h-80 rounded-xl overflow-hidden mb-8">
            <img src={data.image} alt={data.title} className="object-cover w-full h-full" />
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-4 mb-2">
            <time className="text-sm text-gray-500 dark:text-gray-400">{data.date}</time>
            <span className="text-sm text-gray-500 dark:text-gray-400">• {time}</span>
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{data.category}</p>
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{data.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{data.summary}</p>

          {/* Sommaire + Contenu */}
          <div className="md:flex gap-8">
            <TableOfContents mdxContent={content} scrollSpy={true} /> {/* Client Component */}
            <article className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 flex-1">
              <BlogContent mdxSource={mdxSource} /> {/* Client Component */}
            </article>
          </div>

          {/* Lien retour */}
          <Link href="/blog" className="inline-block mt-10 text-blue-600 dark:text-blue-400 underline">
            ← Retour au blog
          </Link>
        </div>
      </main>

      <Footer /> {/* Server Component */}
    </>
  );
}
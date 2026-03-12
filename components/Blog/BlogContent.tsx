// components/Blog/BlogContent.tsx
"use client"; // ← obligatoire pour utiliser MDXRemote et les hooks

import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

export default function BlogContent({ mdxSource }: Props) {
  return <MDXRemote {...mdxSource} />;
}
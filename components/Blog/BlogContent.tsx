// components/Blog/BlogContent.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

interface Props {
  mdxSource: MDXRemoteProps;
}

export default function BlogContent({ mdxSource }: Props) {
  return <MDXRemote {...mdxSource} />;
}
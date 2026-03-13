import { MDXRemote } from "next-mdx-remote/rsc";

interface BlogContentProps {
  source: string;
}

export default function BlogContent({ source }: BlogContentProps) {
  return <MDXRemote source={source} />;
}
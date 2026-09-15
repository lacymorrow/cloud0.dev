import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getBlogPosts } from "@/lib/blog";

interface Props {
  children: ReactNode;
  params: Promise<{ slug: string[] }>;
}

/**
 * Existence check for /blog/[...slug].
 *
 * A layout renders above its segment's loading.tsx boundary, so notFound()
 * here runs before Next streams the shell and the response gets a real 404
 * instead of a 200 with a not-found body. The page below keeps its skeleton
 * for slow renders. getBlogPosts() reads the same cached post list the page
 * uses, so the extra lookup costs nothing.
 */
export default async function BlogPostLayout({ children, params }: Props) {
  const { slug } = await params;
  const posts = await getBlogPosts();

  if (!posts.some((post) => post.slug === slug.join("/"))) {
    notFound();
  }

  return children;
}

import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, listPosts } from "../../../lib/posts";

export async function generateStaticParams() {
  const posts = await listPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Discover Morocco Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Discover Morocco Blog`,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  return (
    <main className="min-h-screen">
      <article className="max-w-3xl mx-auto container-px py-10">
        <div className="relative h-64 w-full rounded-lg overflow-hidden">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        </div>
        <h1 className="section-title mt-6">{post.title}</h1>
        <p className="text-sm text-neutral-600 mt-2">{new Date(post.date).toLocaleDateString()}</p>
        <div className="prose prose-neutral mt-6 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}

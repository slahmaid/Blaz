import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      openGraph: { images: [post.frontmatter.cover || ""] },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    return (
      <main className="bg-white">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          {post.frontmatter.cover ? (
            <div className="relative h-64 mb-6">
              <Image src={post.frontmatter.cover} alt={post.frontmatter.title} fill className="object-cover rounded-xl" />
            </div>
          ) : null}
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{post.frontmatter.title}</h1>
          <p className="text-sm text-black/60 mt-1">{new Date(post.frontmatter.date).toLocaleDateString()}</p>
          <div className="prose prose-zinc mt-6" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>
      </main>
    );
  } catch {
    return notFound();
  }
}

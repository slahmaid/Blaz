import Link from "next/link";
import Image from "next/image";
import { getAllPostsMeta } from "@/lib/blog";

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = getAllPostsMeta();
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="section-title">Travel Blog</h1>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(({ slug, frontmatter }) => (
            <article key={slug} className="rounded-2xl overflow-hidden border border-black/10">
              {frontmatter.cover ? (
                <div className="relative h-48">
                  <Image src={frontmatter.cover} alt={frontmatter.title} fill className="object-cover" />
                </div>
              ) : null}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{frontmatter.title}</h2>
                <p className="text-sm text-black/70 mt-1">{frontmatter.excerpt}</p>
                <Link href={`/blog/${slug}`} className="inline-block mt-3 text-brand hover:text-brand-dark font-medium">Read more →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

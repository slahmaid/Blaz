import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { listPosts } from "../../lib/posts";

export const metadata: Metadata = {
  title: "Morocco Travel Blog | Discover Morocco",
  description:
    "Morocco travel guides, itineraries, and culture deep-dives: Marrakech, Sahara, Fes, Chefchaouen, food, and festivals.",
};

export default async function BlogPage() {
  const posts = await listPosts();
  return (
    <main className="min-h-screen container mx-auto container-px py-16">
      <h1 className="section-title text-center">Morocco Travel Blog</h1>
      <p className="mt-3 text-center text-neutral-600 max-w-2xl mx-auto">
        Inspiration, guides, and stories to plan your adventure.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-xl overflow-hidden border bg-white hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="relative h-48">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 line-clamp-3">{post.excerpt}</p>
                <span className="inline-flex items-center mt-4 text-[var(--morocco-clay)] font-medium">
                  Read More →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

import { listPosts } from "../lib/posts";
export const dynamic = "force-static";

export default async function sitemap() {
  const baseUrl = "https://example.com";
  const posts = await listPosts();

  const staticRoutes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const postRoutes = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date).toISOString(),
  }));

  return [...staticRoutes, ...postRoutes];
}

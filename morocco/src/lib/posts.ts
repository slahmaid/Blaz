import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  tags?: string[];
};

export type Post = PostMeta & { content: string };

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export async function listPosts(): Promise<PostMeta[]> {
  const files = await safeReaddir(POSTS_DIR);
  const posts: PostMeta[] = [];
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(POSTS_DIR, file);
    const raw = await fs.readFile(fullPath, "utf8");
    const { data } = matter(raw);
    posts.push({
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? new Date().toISOString()),
      excerpt: String(data.excerpt ?? ""),
      coverImage: String(
        data.coverImage ??
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format&fit=crop"
      ),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
    });
  }
  return posts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? new Date().toISOString()),
      excerpt: String(data.excerpt ?? ""),
      coverImage: String(
        data.coverImage ??
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format&fit=crop"
      ),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
      content,
    };
  } catch {
    return null;
  }
}

async function safeReaddir(dirPath: string): Promise<string[]> {
  try {
    return await fs.readdir(dirPath);
  } catch {
    return [];
  }
}

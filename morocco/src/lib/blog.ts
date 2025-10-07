import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type BlogFrontmatter = {
  title: string;
  date: string;
  excerpt?: string;
  cover?: string;
  tags?: string[];
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  contentHtml: string;
};

const postsDir = path.join(process.cwd(), "src", "content", "blog");

export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(postsDir);
  return files.filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDir, `${slug}.md`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();
  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    contentHtml,
  };
}

export function getAllPostsMeta(): { slug: string; frontmatter: BlogFrontmatter }[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => {
      const file = fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf8");
      const { data } = matter(file);
      return { slug, frontmatter: data as BlogFrontmatter };
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

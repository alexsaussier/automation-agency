import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort((a, b) => b.localeCompare(a)); // newest first

  return files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
    const { data } = matter(fileContent);
    return {
      slug: data.slug || filename.replace('.md', ''),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      category: data.category,
      readTime: data.readTime,
    };
  });
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  if (!fs.existsSync(BLOG_DIR)) return null;

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));

  for (const filename of files) {
    const fileContent = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
    const { data, content } = matter(fileContent);
    const postSlug = data.slug || filename.replace('.md', '');

    if (postSlug === slug) {
      return {
        slug: postSlug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        category: data.category,
        readTime: data.readTime,
        content: marked(content) as string,
      };
    }
  }

  return null;
}

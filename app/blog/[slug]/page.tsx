import { getAllPosts, getPostBySlug } from '@/lib/blog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar activePage="blog" />

      <main className="flex-1">
        {/* Article Header */}
        <section className="py-12 lg:py-20 px-6 lg:px-8 border-b border-border">
          <div className="container mx-auto max-w-3xl">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-accent transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>

            {/* Category */}
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-5">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 font-[family-name:var(--font-inter)] leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-foreground/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                  BB
                </div>
                <span className="font-medium text-foreground/70">
                  {process.env.NEXT_PUBLIC_COMPANY_NAME}
                </span>
              </div>
              <span>·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="py-12 lg:py-16 px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 lg:px-8 border-t border-border bg-light-gray dark:bg-dark-bg">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-inter)]">
              Want to automate your business?
            </h2>
            <p className="text-foreground/70 mb-8">
              We build custom AI agents and maintain them for you. Get a free audit to see exactly
              where automation can help.
            </p>
            <Link
              href="/#get-started"
              className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Audit
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { getAllPosts } from '@/lib/blog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: `Blog - AI Automation Insights | ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
  description:
    'Practical guides and insights on how AI automation can transform your business operations.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar activePage="blog" />

      {/* Hero */}
      <section className="py-16 lg:py-24 px-6 lg:px-8 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-inter)]">
            AI Automation <span className="italic text-accent">Insights</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto font-[family-name:var(--font-roboto)]">
            Practical guides on how AI agents are transforming businesses across every industry.
          </p>
        </div>
      </section>

      {/* Posts */}
      <main className="flex-1 py-16 lg:py-24 px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3 font-[family-name:var(--font-inter)]">
                Articles coming soon
              </h2>
              <p className="text-foreground/60">
                We publish new articles daily. Check back tomorrow!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article className="h-full bg-background rounded-2xl border border-border hover:border-accent/50 transition-all hover:shadow-lg p-6 flex flex-col">
                    {/* Category badge */}
                    <span className="inline-block self-start px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-4">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-lg font-bold mb-3 font-[family-name:var(--font-inter)] group-hover:text-accent transition-colors leading-snug flex-1">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-sm text-foreground/60 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-foreground/40 mt-auto pt-4 border-t border-border">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-8 bg-light-gray dark:bg-dark-bg border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-inter)]">
            Ready to automate your business?
          </h2>
          <p className="text-foreground/70 mb-8">
            Get a free AI audit and discover where automation can save you the most time and money.
          </p>
          <Link
            href="/#get-started"
            className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-lg font-medium transition-colors"
          >
            Get Your Free Audit
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

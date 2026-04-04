import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { caseStudies } from '@/lib/case-studies';

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug);
  if (!study) return {};
  return {
    title: `${study.title} | BrightBots`,
    description: study.summary,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar activePage="case-studies" />

      <main className="flex-1">
        {/* Back link + header */}
        <section className="border-b border-border px-6 py-12 lg:px-8 lg:py-16">
          <div className="container mx-auto max-w-6xl">
            <Link
              href="/case-studies"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground/50 transition-colors hover:text-accent"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All case studies
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">
                Case Study {index + 1}
              </span>
              <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                {study.cadence}
              </span>
              <span className="inline-flex items-center rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-foreground/60">
                {study.industry}
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-bold font-[family-name:var(--font-inter)] tracking-[-0.03em] lg:text-5xl">
              {study.title}
            </h1>
            <p className="max-w-3xl text-xl leading-relaxed text-foreground/70">
              {study.summary}
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="px-6 py-12 lg:px-8 lg:py-16">
          <div className="container mx-auto max-w-6xl">
            <article className="overflow-hidden rounded-[28px] border border-border bg-background shadow-[0_18px_50px_rgba(15,20,25,0.06)]">
              <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">

                {/* Left: challenge / solution / outcome */}
                <div className="border-b border-border p-8 lg:border-b-0 lg:border-r lg:p-10">
                  <div className="grid gap-8 md:grid-cols-3">
                    <div>
                      <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Challenge</h2>
                      <ul className="space-y-3 text-foreground/75">
                        {study.challenge.map((item) => (
                          <li key={item} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Solution</h2>
                      <ul className="space-y-3 text-foreground/75">
                        {study.solution.map((item) => (
                          <li key={item} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Outcome</h2>
                      <ul className="space-y-3 text-foreground/75">
                        {study.outcome.map((item) => (
                          <li key={item} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right: stats + stack */}
                <div className="bg-[linear-gradient(180deg,rgba(77,101,255,0.08),rgba(15,20,25,0.02))] p-8 lg:p-10">
                  <div className="mb-8 rounded-2xl border border-accent/15 bg-white/70 p-6">
                    <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Time saved</div>
                    <div className="text-3xl font-bold font-[family-name:var(--font-inter)] tracking-[-0.03em]">
                      {study.timeSavedFull}
                    </div>
                  </div>

                  <div className="mb-8 rounded-2xl border border-border bg-background/80 p-6">
                    <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Automation stack</div>
                    <div className="flex flex-wrap gap-3">
                      {study.stack.map((tool) => (
                        <span
                          key={tool.name}
                          className="inline-flex items-center gap-2 rounded-full border border-border bg-light-gray px-4 py-2 text-sm font-medium text-foreground/80"
                        >
                          <Image src={tool.logo} alt={tool.name} width={16} height={16} className="object-contain" />
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-background/80 p-6">
                    <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">What this replaced</div>
                    <p className="leading-relaxed text-foreground/75">
                      Manual research, repetitive drafting, fragmented reporting, and recurring coordination work that teams were doing every week by hand.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-light-gray px-6 py-16 lg:px-8 lg:py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold font-[family-name:var(--font-inter)] lg:text-4xl">
              Want a similar workflow for your team?
            </h2>
            <p className="mb-8 text-lg text-foreground/70">
              We can identify repetitive work in your business and design a workflow that runs reliably in the background.
            </p>
            <Link
              href="/#get-started"
              className="inline-block rounded-xl bg-accent px-10 py-4 text-base font-semibold text-white transition-all hover:bg-accent-dark"
            >
              Book a discovery call
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

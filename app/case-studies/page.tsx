import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const caseStudies = [
  {
    industry: '⚖️ Law Firm',
    cadence: 'Weekly',
    title: 'Automated blog & LinkedIn content engine',
    summary: 'Monitors legal news, drafts articles and posts, emails finished content — zero manual work.',
    timeSaved: '5h',
    timeSavedLabel: 'per week',
    flow: [
      { logo: '/logos/n8n.png',    label: 'Scrape news' },
      { logo: '/logos/openai.png', label: 'AI drafts' },
      { logo: '/logos/gmail.svg',  label: 'Email sent' },
    ],
    stack: [
      { logo: '/logos/n8n.png',    name: 'n8n' },
      { logo: '/logos/openai.png', name: 'OpenAI' },
    ],
  },
  {
    industry: '🏪 Sport Retailer',
    cadence: 'Continuous',
    title: 'Marketing asset performance tracker',
    summary: 'Searches the internet for campaign asset usage and feeds findings into a dashboard.',
    timeSaved: '15h+',
    timeSavedLabel: 'per week',
    flow: [
      { logo: '/logos/n8n.png',    label: 'Web search' },
      { logo: '/logos/openai.png', label: 'AI analysis' },
      { logo: '/logos/Airtable.png', label: 'Dashboard' },
    ],
    stack: [
      { logo: '/logos/n8n.png',    name: 'n8n' },
      { logo: '/logos/openai.png', name: 'OpenAI' },
    ],
  },
  {
    industry: '⚖️ Law Firm',
    cadence: 'Weekly',
    title: 'Internal legal newsletter',
    summary: 'Scrapes regulation sources, compiles a digest, and distributes it to all lawyers automatically.',
    timeSaved: '10h+',
    timeSavedLabel: 'per week',
    flow: [
      { logo: '/logos/n8n.png',    label: 'Scrape sources' },
      { logo: '/logos/openai.png', label: 'AI digest' },
      { logo: '/logos/gmail.svg',  label: 'Newsletter' },
    ],
    stack: [
      { logo: '/logos/n8n.png',    name: 'n8n' },
      { logo: '/logos/openai.png', name: 'OpenAI' },
    ],
  },
];

export const metadata = {
  title: 'Case Studies | BrightBots',
  description:
    'Real examples of AI automations and agent workflows we built for law firms and enterprise marketing teams.',
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar activePage="case-studies" />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border px-6 py-16 lg:px-8 lg:py-24">
          <div className="container mx-auto max-w-5xl text-center">
            <span className="mb-4 inline-flex items-center rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Case Studies
            </span>
            <h1 className="mb-6 text-5xl font-bold font-[family-name:var(--font-inter)] tracking-[-0.04em] lg:text-6xl">
              Automation systems that remove repetitive work
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-foreground/70 font-[family-name:var(--font-roboto)]">
              A selection of AI automations we built to help teams publish faster, monitor campaigns at scale, and stay informed without manual effort.
            </p>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-b border-border bg-light-gray px-6 py-12 lg:px-8">
          <div className="container mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">3 workflows</div>
              <p className="text-foreground/70">Across content generation, campaign monitoring, and internal knowledge distribution.</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">30+ hours saved</div>
              <p className="text-foreground/70">Combined weekly time savings across the case studies on this page.</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Hands-off execution</div>
              <p className="text-foreground/70">Each workflow runs reliably with no recurring manual intervention.</p>
            </div>
          </div>
        </section>

        {/* Case study cards */}
        <section className="px-6 py-16 lg:px-8 lg:py-24">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {caseStudies.map((study) => (
                <article
                  key={study.title}
                  className="flex flex-col rounded-[24px] border border-accent/12 bg-[linear-gradient(150deg,rgba(77,101,255,0.08)_0%,rgba(180,190,255,0.12)_50%,rgba(255,255,255,0.6)_100%)] p-6 shadow-[0_18px_45px_rgba(15,20,25,0.06)] transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_22px_60px_rgba(77,101,255,0.14)]"
                >
                  {/* Tags */}
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-foreground/6 px-3 py-1 text-xs font-semibold text-foreground/60">
                      {study.industry}
                    </span>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {study.cadence}
                    </span>
                  </div>

                  {/* Title + summary */}
                  <h2 className="mb-2 text-lg font-bold font-[family-name:var(--font-inter)] tracking-[-0.02em] leading-snug">
                    {study.title}
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-foreground/60">
                    {study.summary}
                  </p>

                  {/* Mini flow */}
                  <div className="mb-6 rounded-2xl border border-border/60 bg-white/70 p-4">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-foreground/35">
                      How it works
                    </p>
                    <div className="flex items-center justify-between gap-1">
                      {study.flow.map((step, i) => (
                        <div key={step.label} className="flex items-center gap-1">
                          <div className="flex flex-col items-center gap-1.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white shadow-sm">
                              <Image src={step.logo} alt={step.label} width={20} height={20} className="object-contain" />
                            </div>
                            <span className="text-[10px] font-medium text-foreground/50 text-center leading-tight w-14">
                              {step.label}
                            </span>
                          </div>
                          {i < study.flow.length - 1 && (
                            <svg className="mb-4 flex-shrink-0 text-accent/40" width="16" height="10" viewBox="0 0 16 10" fill="none">
                              <path d="M0 5h13M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: metric + stack */}
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <span className="block text-4xl font-bold font-[family-name:var(--font-inter)] tracking-[-0.04em] text-accent">
                        {study.timeSaved}
                      </span>
                      <span className="text-xs font-medium text-foreground/45">
                        {study.timeSavedLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {study.stack.map((tool) => (
                        <div key={tool.name} className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white shadow-sm">
                          <Image src={tool.logo} alt={tool.name} width={16} height={16} className="object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-light-gray px-6 py-16 lg:px-8 lg:py-24">
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

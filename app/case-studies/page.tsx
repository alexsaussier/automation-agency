import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const caseStudies = [
  {
    title: 'Automated blog article generator for a local law firm',
    summary:
      'A weekly content engine that monitors local legal news, drafts blog articles and LinkedIn posts, and emails finished content to the client with no manual work required.',
    timeSaved: '5 hours saved weekly',
    cadence: 'Runs automatically once a week',
    stack: ['n8n', 'OpenAI'],
    challenge: [
      'The firm wanted to publish timely legal commentary but did not want lawyers or staff spending time reviewing local legal news every week.',
      'Their team needed a way to consistently pick the most relevant legal developments, turn them into client-facing content, and prepare social distribution without adding more work.',
    ],
    solution: [
      'We built an automation that scrapes local legal news sources and filters the stories most relevant to the law firm.',
      'The workflow then generates a full blog article, creates a matching LinkedIn post, and sends the finished content by email to the client for review.',
      'The full process runs automatically every week, so the client does not need to monitor sources, shortlist stories, or write first drafts.',
    ],
    outcome: [
      'The firm saves around 5 hours every week on news selection and content writing.',
      'They get a reliable publishing rhythm without assigning billable staff to repetitive editorial work.',
    ],
  },
  {
    title: 'Internet search tool for marketing asset usage for a large sport retailer',
    summary:
      'A global monitoring workflow that searches the internet for campaign asset usage and feeds the findings into a dashboard for the marketing team.',
    timeSaved: '15+ hours saved weekly',
    cadence: 'Continuous internet monitoring and dashboard reporting',
    stack: ['n8n', 'SerpAPI', 'OpenAI'],
    challenge: [
      'The retailer invests heavily in worldwide marketing assets such as photo shoots, banners, and campaign visuals.',
      'Their central team had limited visibility into whether local entities and retail partners were actually using those assets online.',
      'Checking usage manually required assigning junior analyst time to repetitive global internet research.',
    ],
    solution: [
      'We built a workflow that searches the internet worldwide for the retailer’s marketing assets and campaign traces.',
      'The automation compiles the findings into a dashboard so the team can monitor who uses which assets, where they are being used, and how often they appear.',
      'This gives the marketing team a structured view of asset adoption across markets without manual research cycles.',
    ],
    outcome: [
      'The team now knows which assets perform, who uses them most, and where to focus future campaign efforts.',
      'The workflow saves more than 15 hours per week by removing the need for manual monitoring and reporting.',
    ],
  },
  {
    title: 'Internal legal newsletter for a local law firm',
    summary:
      'A weekly internal newsletter that keeps lawyers up to date on local regulation changes and legal developments without requiring them to manually monitor multiple sources.',
    timeSaved: '10+ hours saved weekly',
    cadence: 'Sent weekly to all lawyers',
    stack: ['n8n', 'OpenAI'],
    challenge: [
      'Lawyers were spending hours every week checking local websites such as Journal de Monaco and Legimonaco to stay current on regulatory developments.',
      'The work was important but repetitive, and it pulled legal staff away from higher-value client work.',
    ],
    solution: [
      'We built an automation that scrapes major local legal news websites on a recurring basis.',
      'It selects the most important developments, compiles them into an easy-to-read and nicely formatted newsletter, and distributes it weekly to all lawyers.',
      'This ensures the team stays informed without having to manually monitor multiple sources.',
    ],
    outcome: [
      'The firm saves more than 10 hours every week across its legal team.',
      'Lawyers stay up to date through a single consistent briefing instead of fragmented manual research.',
    ],
  },
];

export const metadata = {
  title: `Case Studies | ${process.env.NEXT_PUBLIC_COMPANY_NAME}`,
  description:
    'Real examples of AI automations and agent workflows we built for law firms and enterprise marketing teams.',
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar activePage="case-studies" />

      <main className="flex-1">
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
              <p className="text-foreground/70">Each workflow is designed to run reliably with minimal or no recurring manual intervention.</p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 lg:px-8 lg:py-24">
          <div className="container mx-auto max-w-6xl space-y-10">
            {caseStudies.map((study, index) => (
              <article
                key={study.title}
                className="overflow-hidden rounded-[28px] border border-border bg-background shadow-[0_18px_50px_rgba(15,20,25,0.06)]"
              >
                <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="border-b border-border p-8 lg:border-b-0 lg:border-r lg:p-10">
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">
                        Case Study {index + 1}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                        {study.cadence}
                      </span>
                    </div>

                    <h2 className="mb-4 text-3xl font-bold font-[family-name:var(--font-inter)] tracking-[-0.03em] lg:text-4xl">
                      {study.title}
                    </h2>
                    <p className="mb-8 max-w-3xl text-lg leading-relaxed text-foreground/75">
                      {study.summary}
                    </p>

                    <div className="grid gap-8 md:grid-cols-3">
                      <div>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Challenge</h3>
                        <ul className="space-y-3 text-foreground/75">
                          {study.challenge.map((item) => (
                            <li key={item} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Solution</h3>
                        <ul className="space-y-3 text-foreground/75">
                          {study.solution.map((item) => (
                            <li key={item} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Outcome</h3>
                        <ul className="space-y-3 text-foreground/75">
                          {study.outcome.map((item) => (
                            <li key={item} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[linear-gradient(180deg,rgba(77,101,255,0.08),rgba(15,20,25,0.02))] p-8 lg:p-10">
                    <div className="mb-8 rounded-2xl border border-accent/15 bg-white/70 p-6">
                      <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Time saved</div>
                      <div className="text-3xl font-bold font-[family-name:var(--font-inter)] tracking-[-0.03em]">
                        {study.timeSaved}
                      </div>
                    </div>

                    <div className="mb-8 rounded-2xl border border-border bg-background/80 p-6">
                      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent">Automation stack</div>
                      <div className="flex flex-wrap gap-3">
                        {study.stack.map((tool) => (
                          <span
                            key={tool}
                            className="inline-flex items-center rounded-full border border-border bg-light-gray px-4 py-2 text-sm font-medium text-foreground/80"
                          >
                            {tool}
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
            ))}
          </div>
        </section>

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

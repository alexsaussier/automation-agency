import OnboardingForm from '@/components/OnboardingForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AutomationFlowDiagram from '@/components/AutomationFlowDiagram';

const poweredByBrands = [
  {
    name: 'Claude',
    src: '/logos/claude.png',
    width: 170,
    height: 48,
  },
  {
    name: 'OpenAI',
    src: '/logos/openai.png',
    width: 170,
    height: 48,
  },
  {
    name: 'Openclaw',
    src: '/logos/openclaw.svg',
    width: 72,
    height: 72,
  },
  {
    name: 'n8n',
    src: '/logos/n8n.png',
    width: 170,
    height: 48,
  },
  {
    name: 'Gumloop',
    src: '/logos/gumloop.png',
    width: 196,
    height: 58,
  },
  {
    name: 'Airtable',
    src: '/logos/Airtable.png',
    width: 186,
    height: 54,
  },
];

const commonUseCases = [
  {
    title: 'Document Automation',
    description: 'Extract information from documents and emails automatically. Generate reports, automate invoice processing, contract generation and more. ',
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-7-8.494h14M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'HR and Customer Support',
    description: 'Automate HR onboarding, automate customer support responses, create AI chatbots and triage requests.',
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5l-2 2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
      </svg>
    ),
  },
  {
    title: 'Outreach and Lead Qualification',
    description: 'Automate outreach, score leads, enrich them with company data, and route the best opportunities to your team instantly.',
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8L10 18l-5-5-3 3" />
      </svg>
    ),
  },
  {
    title: 'Content Creation',
    description: 'Turn news, internal knowledge, or campaign updates into blog posts, emails, and social content automatically.',
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h8m-8 4h6M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H9l-4 0V4z" />
      </svg>
    ),
  },
  {
    title: 'Reporting & Dashboards',
    description: 'Collect data from multiple tools and deliver weekly summaries, alerts, and dashboards without spreadsheet work.',
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20V10m5 10V4m5 16v-7M4 20h16" />
      </svg>
    ),
  },
  {
    title: 'Research & Monitoring',
    description: 'Track competitors, regulations, online mentions, or campaign usage so your team stays informed automatically.',
    icon: (
      <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
      </svg>
    ),
  },
];

const processSteps = [
  {
    title: 'Intro Call',
    badge: 'FREE',
    description: 'We discuss how you work and identify areas where AI agents can save you time. No commitment, just insights.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Company AI Audit',
    badge: 'FREE under 20 employees',
    description: 'We interview your employees to understand their day-to-day tasks and map out all automation opportunities. You receive a comprehensive report of potential improvements.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Build & Deploy',
    badge: null,
    description: 'We build your custom AI agents and deploy them on our secure servers, ensuring optimal data security in full compliance with European data protection laws.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: '24/7 Maintenance & Support',
    badge: 'ONGOING',
    description: 'We handle all technical aspects—updates, bugs, optimizations—so you never have to worry. Available 24/7 with a direct line to our CEO.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const securityFeatures = [
  {
    title: 'Strong Environment Isolation',
    description: 'Your AI agents run on self-hosted AWS EC2 infrastructure with a dedicated database, encryption key, and credentials store. Access to our systems is restricted using IP allowlisting where applicable.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Secure Credential Management',
    description: 'All credentials are stored exclusively using n8n’s encrypted credential system and are never hardcoded or stored in plain text.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Data Minimization & Retention',
    description: 'Workflow execution data and logs are retained for a maximum of 30 days and automatically deleted thereafter, unless longer retention is explicitly required by the automation logic. We only process the data strictly necessary for the agent to function.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
  },
  {
    title: 'Controlled AI Data Processing',
    description: 'We use AI models from established providers (OpenAI and Anthropic) under plans that contractually state that client data is not used for model training. Where available, data sharing and prompt logging features are disabled.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
      {children}
    </span>
  );
}

function PoweredByLogo({
  name,
  src,
  width,
  height,
}: {
  name: string;
  src: string;
  width: number;
  height: number;
}) {
  return (
    <div className="powered-by-card flex min-w-[180px] items-center justify-center px-4 py-3 opacity-90 transition-opacity duration-300 hover:opacity-100">
      <div className="flex h-12 w-[150px] items-center justify-center">
        <img
          src={src}
          alt={name}
          width={width}
          height={height}
          className="max-h-10 w-auto max-w-[150px] object-contain"
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <Navbar activePage="home" />

      {/* Free Audit Banner */}
      <div className="bg-dark-bg py-2.5 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="hidden sm:inline-flex items-center rounded-full bg-accent/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#9caaff]">
              Limited offer
            </span>
            <p className="text-sm text-white/80">
              <span className="font-semibold text-white">Free AI Audit</span> for companies with less than 20 employees
            </p>
            <a href="#get-started" className="group inline-flex items-center gap-1 text-sm font-semibold text-[#9caaff] transition-colors hover:text-white">
              Claim now
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5-5 5M6 12h12" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-glow relative px-6 py-20 lg:px-8 lg:py-28">
        <div className="hero-grid pointer-events-none absolute inset-0"></div>

        <div className="container relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left side - Text content */}
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-sm text-foreground/70 shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                Taking on new clients for Q3
              </span>
              <h2 className="mb-6 font-[family-name:var(--font-inter)] text-5xl font-bold leading-[1.05] tracking-[-0.03em] lg:text-7xl">
                <span className="bg-gradient-to-r from-accent to-[#7c8fff] bg-clip-text text-transparent">AI Agents</span>
                <br />
                for your business
              </h2>
              <p className="mb-8 max-w-xl font-[family-name:var(--font-roboto)] text-lg leading-relaxed text-foreground/70 lg:text-xl">
                We build AI agents for your business that work while you sleep, and we maintain them so you have total peace of mind.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#get-started" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 font-medium text-white shadow-[0_10px_30px_rgba(77,101,255,0.35)] transition-all hover:bg-accent-dark hover:shadow-[0_12px_36px_rgba(77,101,255,0.45)]">
                  Get in touch
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </a>
                <a href="#features" className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-8 py-3.5 font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent">
                  How it works
                </a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground/60">
                {['Free AI audit', 'Live in weeks, not months', 'GDPR-compliant hosting'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side - Automation Flow Diagram */}
            <div className="relative hidden items-center justify-center lg:flex">
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/[0.07] blur-3xl"></div>
              <AutomationFlowDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* Powered by strip */}
      <section className="border-y border-border bg-light-gray/60 py-10 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-foreground/40">
            Solutions built on modern AI tools
          </p>
          <div className="powered-by-marquee">
            <div className="powered-by-track" aria-label="Powered by brand logos">
              {[...poweredByBrands, ...poweredByBrands].map((brand, index) => (
                <PoweredByLogo
                  key={`${brand.name}-${index}`}
                  name={brand.name}
                  src={brand.src}
                  width={brand.width}
                  height={brand.height}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="px-6 py-20 lg:px-8 lg:py-28">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <SectionEyebrow>Common SME Use Cases</SectionEyebrow>
            <h3 className="mb-4 font-[family-name:var(--font-inter)] text-3xl font-bold tracking-[-0.03em] lg:text-5xl">
              The repetitive work AI handles best
            </h3>
            <p className="mx-auto max-w-3xl text-lg text-foreground/70">
              Most small and mid-sized businesses lose time to the same patterns: answering recurring questions, producing content, chasing reports, and monitoring information manually.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {commonUseCases.map((useCase) => (
              <div
                key={useCase.title}
                className="group relative rounded-2xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(77,101,255,0.12)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/15">
                  {useCase.icon}
                </div>
                <h4 className="mb-3 font-[family-name:var(--font-inter)] text-xl font-bold tracking-[-0.02em]">
                  {useCase.title}
                </h4>
                <p className="leading-relaxed text-foreground/65">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / Features Section */}
      <section id="features" className="border-y border-border bg-light-gray px-6 py-20 lg:px-8 lg:py-28">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <SectionEyebrow>How it works</SectionEyebrow>
            <h3 className="mb-4 font-[family-name:var(--font-inter)] text-3xl font-bold tracking-[-0.03em] lg:text-5xl">
              Get a free AI audit of your company now
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-foreground/70">
              We offer a free, complete audit of AI opportunities in your company for our new customers with less than 20 employees.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <ol className="relative space-y-8 pl-14 lg:pl-16">
              {/* Timeline rail */}
              <div className="pointer-events-none absolute bottom-8 left-[19px] top-2 w-px bg-gradient-to-b from-accent/50 via-accent/25 to-accent/5 lg:left-[23px]" aria-hidden="true"></div>

              {processSteps.map((step, index) => (
                <li key={step.title} className="relative">
                  {/* Numbered marker */}
                  <div className="absolute -left-14 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-accent/25 bg-background font-[family-name:var(--font-inter)] text-sm font-bold text-accent shadow-[0_4px_14px_rgba(77,101,255,0.15)] lg:-left-16 lg:h-12 lg:w-12">
                    {index + 1}
                  </div>

                  <div className="group rounded-2xl border border-border bg-background p-6 transition-all hover:border-accent/35 hover:shadow-[0_16px_40px_rgba(77,101,255,0.1)] lg:p-7">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
                        {step.icon}
                      </div>
                      <h4 className="font-[family-name:var(--font-inter)] text-xl font-bold tracking-[-0.02em]">
                        {step.title}
                      </h4>
                      {step.badge && (
                        <span className="inline-flex items-center rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-green-600">
                          {step.badge}
                        </span>
                      )}
                    </div>
                    <p className="leading-relaxed text-foreground/70">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="relative overflow-hidden bg-dark-bg px-6 py-20 text-white lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_-20%,rgba(77,101,255,0.25),transparent_70%)]"></div>

        <div className="container relative mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#9caaff]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9caaff]"></span>
              Enterprise-grade security
            </span>
            <h3 className="mb-4 font-[family-name:var(--font-inter)] text-3xl font-bold tracking-[-0.03em] lg:text-5xl">
              Data & AI Security Guarantees
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-white/60">
              Your data security is our top priority. We implement enterprise-grade security measures to protect your business.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {securityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur transition-all hover:border-accent/50 hover:bg-white/[0.07]"
              >
                <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-xl bg-accent/20 text-[#9caaff] transition-colors group-hover:bg-accent/30 group-hover:text-white">
                  {feature.icon}
                </div>
                <h4 className="mb-4 font-[family-name:var(--font-inter)] text-xl font-bold tracking-[-0.02em]">
                  {feature.title}
                </h4>
                <p className="leading-relaxed text-white/60">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Security Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-6 py-3">
              <svg className="h-5 w-5 text-[#9caaff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-white/80">
                Built with GDPR principles: data minimization, encryption, and limited retention
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="hero-glow relative px-6 py-20 lg:px-8 lg:py-28">
        <div className="container relative mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <SectionEyebrow>Free discovery call</SectionEyebrow>
            <h3 className="mb-4 font-[family-name:var(--font-inter)] text-3xl font-bold tracking-[-0.03em] lg:text-5xl">
              Get in touch
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-foreground/70">
              Let&apos;s get on a free discovery call together to see how you can benefit from AI-powered automation.
            </p>
          </div>

          {/* Questionnaire */}
          <div className="overflow-hidden rounded-3xl border border-border bg-light-gray shadow-[0_24px_70px_rgba(15,20,25,0.08)]">
            <div className="h-1.5 w-full bg-gradient-to-r from-accent via-[#7c8fff] to-accent/40"></div>
            <div className="p-8 lg:p-12">
              <OnboardingForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

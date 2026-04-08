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
    <div className="powered-by-card flex min-w-[200px] items-center justify-center rounded-2xl border border-transparent bg-transparent px-6 py-5 shadow-none backdrop-blur-0">
      <div className="flex h-14 w-[160px] items-center justify-center">
        <img
          src={src}
          alt={name}
          width={width}
          height={height}
          className="max-h-12 w-auto max-w-[160px] object-contain"
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
      <div className="bg-gradient-to-r from-green-500 to-green-600 py-3 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-center gap-3 text-white text-center">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm md:text-base font-semibold">
              <span className="font-bold">Free AI Audit</span> for companies with less than 20 employees
            </p>
            <a href="#get-started" className="hidden sm:inline-block bg-white text-green-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-green-50 transition-colors ml-2">
              Claim Now
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-6 lg:px-8">
        {/* Decorative corner elements */}
        <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-accent/20 rounded-tl-3xl"></div>
        <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-accent/20 rounded-tr-3xl"></div>

        <div className="container mx-auto max-w-7xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div>
              <h2 className="text-5xl lg:text-7xl font-bold mb-6 font-[family-name:var(--font-inter)] leading-tight">
                <span className="italic text-accent">AI Agents</span> For Your Business
              </h2>
              <p className="text-lg lg:text-xl text-foreground/70 mb-8 font-[family-name:var(--font-roboto)] leading-relaxed">
               We build AI agents for your business that work while you sleep, and we maintain them so you have total peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#get-started" className="bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-lg font-medium transition-colors text-center">
                  Get in touch
                </a>
                <a href="#features" className="border-2 border-border hover:border-accent text-foreground hover:text-accent px-8 py-3.5 rounded-lg font-medium transition-colors text-center">
                  Learn More
                </a>
              </div>
            </div>

            {/* Right side - Automation Flow Diagram */}
            <div className="relative hidden lg:flex items-center justify-center">
              <AutomationFlowDiagram />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-[linear-gradient(180deg,rgba(77,101,255,0.05),rgba(255,255,255,0.9))] py-16 px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="mb-4 inline-flex items-center rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Powered by
            </span>
            <h2 className="max-w-3xl text-3xl font-bold font-[family-name:var(--font-inter)] tracking-[-0.03em] text-foreground lg:text-4xl">
              Solutions built on modern AI tools
            </h2>
          </div>

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

      <section className="px-6 py-16 lg:px-8 lg:py-20">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex items-center rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Common SME Use Cases
            </span>
            <h3 className="mb-4 text-3xl font-bold font-[family-name:var(--font-inter)] tracking-[-0.03em] lg:text-4xl">
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
                className="group relative overflow-hidden rounded-[24px] border border-accent/12 bg-[linear-gradient(150deg,rgba(77,101,255,0.22)_0%,rgba(180,190,255,0.35)_50%,rgba(220,225,255,0.45)_100%)] p-6 shadow-[0_18px_45px_rgba(15,20,25,0.06)] transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_22px_60px_rgba(77,101,255,0.14)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(77,101,255,0.18),transparent_72%)] opacity-80"></div>
                <div className="relative mb-4 flex h-13 w-13 items-center justify-center rounded-2xl border border-white/70 bg-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur">
                  {useCase.icon}
                </div>
                <h4 className="relative mb-3 text-xl font-bold font-[family-name:var(--font-inter)] tracking-[-0.02em]">
                  {useCase.title}
                </h4>
                <p className="relative leading-relaxed text-foreground/72 bg-transparent">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28 px-6 lg:px-8 bg-light-gray">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold mb-4 font-[family-name:var(--font-inter)]">
              Get a free AI audit of your company now
            </h3>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We offer a free, complete audit of AI opportunities in your company for our new customers with less than 20 employees.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 border border-accent/20 hover:border-accent/40 transition-all hover:shadow-xl group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-foreground/5 rounded-full text-xs font-semibold text-foreground/60">
                        STEP 1
                      </span>
                      <span className="inline-block px-4 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full text-sm font-bold text-green-600">
                        FREE
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Intro Call</h4>
                    <p className="text-foreground/70 leading-relaxed">
                      We discuss how you work and identify areas where AI agents can save you time. No commitment, just insights.
                    </p>
                  </div>
                </div>
              </div>
              {/* Connecting Arrow */}
              <div className="flex justify-center py-4">
                <svg className="w-6 h-12 text-accent/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 border border-accent/20 hover:border-accent/40 transition-all hover:shadow-xl group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-foreground/5 rounded-full text-xs font-semibold text-foreground/60">
                        STEP 2
                      </span>
                      <span className="inline-block px-4 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full text-sm font-bold text-green-600">
                        FREE for companies with less than 20 employees
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Company AI Audit</h4>
                    <p className="text-foreground/70 leading-relaxed">
                      We interview your employees to understand their day-to-day tasks and map out all automation opportunities. You receive a comprehensive report of potential improvements.
                    </p>
                  </div>
                </div>
              </div>
              {/* Connecting Arrow */}
              <div className="flex justify-center py-4">
                <svg className="w-6 h-12 text-accent/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 border border-accent/20 hover:border-accent/40 transition-all hover:shadow-xl group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-accent/20 rounded-full text-xs font-semibold text-accent mb-3">
                      STEP 3
                    </div>
                    <h4 className="text-xl font-bold mb-3">Build & Deploy</h4>
                    <p className="text-foreground/70 leading-relaxed">
                      We build your custom AI agents and deploy them on our secure servers, ensuring optimal data security in full compliance with European data protection laws.
                    </p>
                  </div>
                </div>
              </div>
              {/* Connecting Arrow */}
              <div className="flex justify-center py-4">
                <svg className="w-6 h-12 text-accent/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl p-8 border border-accent/20 hover:border-accent/40 transition-all hover:shadow-xl group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-accent/20 rounded-full text-xs font-semibold text-accent mb-3">
                      STEP 4 • ONGOING
                    </div>
                    <h4 className="text-xl font-bold mb-3">24/7 Maintenance & Support</h4>
                    <p className="text-foreground/70 leading-relaxed">
                      We handle all technical aspects—updates, bugs, optimizations—so you never have to worry. Available 24/7 with a direct line to our CEO.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 lg:py-28 px-6 lg:px-8 border-y border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold mb-4 font-[family-name:var(--font-inter)]">
              Data & AI <span className="italic text-accent">Security</span> Guarantees
            </h3>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Your data security is our top priority. We implement enterprise-grade security measures to protect your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Security Feature 1 */}
            <div className="bg-background rounded-2xl p-8 border border-border hover:border-accent/50 transition-all hover:shadow-lg group">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4 font-[family-name:var(--font-inter)]">
                Strong Environment Isolation
              </h4>
              <p className="text-foreground/70 leading-relaxed">
                Your AI agents run on self-hosted AWS EC2 infrastructure with a dedicated database, encryption key, and credentials store. Access to our systems is restricted using IP allowlisting where applicable.
              </p>
            </div>

            {/* Security Feature 2 */}
            <div className="bg-background rounded-2xl p-8 border border-border hover:border-accent/50 transition-all hover:shadow-lg group">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4 font-[family-name:var(--font-inter)]">
                Secure Credential Management
              </h4>
              <p className="text-foreground/70 leading-relaxed">
                All credentials are stored exclusively using n8n&apos;s encrypted credential system and are never hardcoded or stored in plain text.
              </p>
            </div>

            {/* Security Feature 3 */}
            <div className="bg-background rounded-2xl p-8 border border-border hover:border-accent/50 transition-all hover:shadow-lg group">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4 font-[family-name:var(--font-inter)]">
                Data Minimization & Retention
              </h4>
              <p className="text-foreground/70 leading-relaxed">
                Workflow execution data and logs are retained for a maximum of 30 days and automatically deleted thereafter, unless longer retention is explicitly required by the automation logic. We only process the data strictly necessary for the agent to function.
              </p>
            </div>

            {/* Security Feature 4 */}
            <div className="bg-background rounded-2xl p-8 border border-border hover:border-accent/50 transition-all hover:shadow-lg group">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-4 font-[family-name:var(--font-inter)]">
                Controlled AI Data Processing
              </h4>
              <p className="text-foreground/70 leading-relaxed">
                We use AI models from established providers (OpenAI and Anthropic) under plans that contractually state that client data is not used for model training. Where available, data sharing and prompt logging features are disabled.
              </p>
            </div>
          </div>

          {/* Additional Security Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 border border-accent/20 rounded-xl">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-accent">
                Built with GDPR principles: data minimization, encryption, and limited retention
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="py-20 lg:py-28 px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-4xl lg:text-5xl font-bold mb-4 font-[family-name:var(--font-inter)]">
              Get <span className="italic text-accent">in Touch</span>
            </h3>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Let&apos;s get on a free discovery call together to see how you can benefit from AI-powered automation.
            </p>
          </div>

          {/* Questionnaire */}
          <div className="bg-light-gray rounded-2xl p-8 lg:p-12 border border-border shadow-xl">
            <OnboardingForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

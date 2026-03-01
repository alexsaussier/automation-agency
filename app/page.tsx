import OnboardingForm from '@/components/OnboardingForm';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Footer from '@/components/Footer';

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
              <span className="font-bold">FREE AI Audit</span> for new customers - Discover automation opportunities in your business
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
                <span className="italic text-accent">AI Agents</span> That Work For You
              </h2>
              <p className="text-lg lg:text-xl text-foreground/70 mb-8 font-[family-name:var(--font-roboto)] leading-relaxed">
               We build AI agents for your business that work while you sleep, and we maintain them so you don&apos;t have to worry about anything.
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

            {/* Right side - AI Agent Cards */}
            <div className="relative hidden lg:block h-[500px]">
              {/* Agent Card 1 - SEO Agent */}
              <div className="absolute top-0 right-0 w-64 h-56 bg-gradient-to-br from-blue-500/40 to-accent/30 rounded-2xl border border-blue-400/50 p-6 shadow-xl backdrop-blur-sm animate-rotate-forward-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 bg-blue-500/60 rounded-full flex items-center justify-center text-xl">
                    🤖
                    <span className="absolute -bottom-0.5 -right-0.5 text-sm">🔍</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">SEO Agent</div>
                    <div className="text-xs text-foreground/70">Search Optimization</div>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 italic leading-relaxed">
                  "I improve your SEO ranking automatically by analyzing competitors and optimizing content"
                </p>
              </div>

              {/* Agent Card 2 - Customer Support Agent */}
              <div className="absolute top-32 right-20 w-64 h-56 bg-gradient-to-br from-purple-500/40 to-accent/30 rounded-2xl border border-purple-400/50 p-6 shadow-xl backdrop-blur-sm animate-rotate-forward-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 bg-purple-500/60 rounded-full flex items-center justify-center text-xl">
                    🤖
                    <span className="absolute -bottom-0.5 -right-0.5 text-sm">💬</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">Customer Support Agent</div>
                    <div className="text-xs text-foreground/70">24/7 Support</div>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 italic leading-relaxed">
                  "I handle customer inquiries 24/7, resolving 80% of tickets instantly"
                </p>
              </div>

              {/* Agent Card 3 - Data Analyst Agent */}
              <div className="absolute bottom-0 right-40 w-64 h-56 bg-gradient-to-br from-green-500/40 to-accent/30 rounded-2xl border border-green-400/50 p-6 shadow-xl backdrop-blur-sm animate-rotate-forward-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 bg-green-500/60 rounded-full flex items-center justify-center text-xl">
                    🤖
                    <span className="absolute -bottom-0.5 -right-0.5 text-sm">📊</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">Marketing Analyst Agent</div>
                    <div className="text-xs text-foreground/70">Analytics & Insights</div>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 italic leading-relaxed">
                  "I monitor the popularity of our marketing campaigns and suggest improvements based on the data"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section - Hidden */}
      {/* 
      <section className="py-16 px-6 lg:px-8 border-y border-border bg-foreground/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-center text-sm font-medium text-foreground/60 uppercase tracking-wider mb-12">
            They use our AI agents
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            <div className="flex items-center justify-center w-32 h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all">
              <Image 
                src="/LOGO-DL-DELFORGE-300.png" 
                alt="Delforge" 
                width={128} 
                height={64}
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-center w-32 h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all">
              <div className="text-2xl font-bold text-foreground/40">TechCo</div>
            </div>
            
          </div>
        </div>
      </section>
      */}

      

      
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

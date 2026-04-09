import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

// Inspiration: https://catalis-temlis.webflow.io/home/home-v1
export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar activePage="about" />

      {/* About Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 px-6 lg:px-8 border-b border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-inter)]">
              About <span className="text-accent">{process.env.NEXT_PUBLIC_COMPANY_NAME}</span>
            </h1>
            <p className="text-xl text-foreground/70 font-[family-name:var(--font-roboto)]">
              Transforming businesses through intelligent automation and AI-powered solutions
            </p>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-start">
              {/* Photo */}
              <div className="order-1 lg:order-1">
                <div className="flex flex-col items-center">
                  <div className="flex justify-center">
                    <div className="relative w-64 h-64 rounded-full overflow-hidden bg-light-gray border-4 border-accent/20 shadow-xl">
                      <Image
                        src="/alex.jpg"
                        alt="Alexandre Saussier"
                        fill
                        className="object-cover object-top"
                        priority
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex w-full max-w-[220px] flex-col items-center rounded-2xl border border-border bg-background p-4 shadow-sm">
                    <span className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                      Previous experience:
                    </span>
                    <Image
                      src="/logos/deloitte.svg"
                      alt="Deloitte"
                      width={132}
                      height={28}
                      className="h-auto w-auto object-contain"
                    />
                  </div>

                </div>
              </div>

              {/* Bio */}
              <div className="order-2 lg:order-2 space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-4xl font-bold font-[family-name:var(--font-inter)]">
                      Alexandre Saussier
                    </h2>
                    <a
                      href="https://www.linkedin.com/in/alexandre-saussier-171b0b152/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-background p-2 text-foreground/70 transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 3A2 2 0 0121 5V19A2 2 0 0119 21H5A2 2 0 013 19V5A2 2 0 015 3H19ZM8.34 10.09H5.67V18H8.34V10.09ZM7 5.88A1.56 1.56 0 005.44 7.44C5.44 8.3 6.12 9 6.98 9H7A1.56 1.56 0 007 5.88ZM18.33 13.17C18.33 10.59 16.95 9.39 15.11 9.39C13.62 9.39 12.95 10.21 12.58 10.79V10.09H9.91C9.95 10.55 9.91 18 9.91 18H12.58V13.58C12.58 13.34 12.6 13.1 12.67 12.93C12.86 12.45 13.28 11.95 14 11.95C14.94 11.95 15.31 12.66 15.31 13.71V18H17.98V13.4C17.98 13.24 17.98 13.17 18.33 13.17Z" />
                      </svg>
                    </a>
                  </div>
                  <p className="text-xl text-accent font-medium">
                    Founder
                  </p>
                </div>

                <div className="space-y-4 text-foreground/80 font-[family-name:var(--font-roboto)]">
                  <p>
                    Alexandre Saussier is the founder of {process.env.NEXT_PUBLIC_COMPANY_NAME}, an AI-powered automation agency
                    that helps businesses of all types automate their operations with AI agents.
                  </p>

                  <p>
                    As a former Consultant at Deloitte&apos;s AI practice in Canada, Alexandre specialized in AI 
                    Automation consulting, building large-scale solutions for some of the biggest companies and institutions in Canada.
                    He holds professional certifications in the Intelligent Automation field (Blue Prism Certified Developer, UiPath Certified RPA Associate)
                    and strong automation project experience with institutions in the banking and insurance industries.
                  </p>

                  <p>
                    A graduate of McGill University with a degree in Finance and Computer Science, Alexandre has 
                    worked across multiple countries including Canada, United Kingdom, and Monaco. Through {process.env.NEXT_PUBLIC_COMPANY_NAME}, 
                    he&apos;s dedicated to helping businesses of all sizes leverage intelligent automation to reduce manual 
                    work, improve accuracy, and focus on what matters most—growing their business.
                  </p>
                </div>

                
              </div>
            </div>
          </div>
        </section>

        {/* YouTube Video Section - Case Studies & Testimonials */}
        <section className="py-16 lg:py-24 px-6 lg:px-8 border-y border-border">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-[family-name:var(--font-inter)]">
                See Our Work in Action
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-[family-name:var(--font-roboto)]">
                Watch how we&apos;ve helped businesses like yours transform their operations with AI automation
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border bg-foreground/5">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/AfqLIkPpsc0"
                  title={process.env.NEXT_PUBLIC_COMPANY_NAME + " - Case Studies & Testimonials"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
              
              <div className="mt-8 text-center">
                <a
                  href="https://www.youtube.com/watch?v=AfqLIkPpsc0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Where and How We Work Section */}
        <section className="py-16 lg:py-24 px-6 lg:px-8 bg-light-gray border-y border-border">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center font-[family-name:var(--font-inter)]">
              Where and How We Work
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Text Content */}
              <div className="space-y-6">
                <p className="text-lg text-foreground/80 font-[family-name:var(--font-roboto)] leading-relaxed">
                  We serve clients principally in Monaco and France. Most of our work is done remotely, but we do occasionally require on-person
                  collaboration to better understand your business and deliver the best possible solution.
                </p>
                
                <div className="pt-4">
                  <h3 className="text-xl font-semibold mb-2 font-[family-name:var(--font-inter)]">Our Office</h3>
                  <p className="text-foreground/70"> 
                    <svg className="inline w-5 h-5 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Monaco 🇲🇨
                  </p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-xl overflow-hidden shadow-lg border border-border h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23177.43691346745!2d7.401688!3d43.738418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdc26f7b3f8531%3A0x74f7784c3ac49cfc!2sMonaco!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Monaco Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-[family-name:var(--font-inter)]">
              Book a free discovery call with us
            </h2>
            <p className="text-lg text-foreground/70 mb-8 font-[family-name:var(--font-roboto)]">
              Let&apos;s discuss where you need to start adding AI to your business.
            </p>
            <Link
              href="/#get-started"
              className="inline-block bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-xl text-base font-semibold transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

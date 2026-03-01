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
              </div>

              {/* Bio */}
              <div className="order-2 lg:order-2 space-y-6">
                <div>
                  <h2 className="text-4xl font-bold mb-2 font-[family-name:var(--font-inter)]">
                    Alexandre Saussier
                  </h2>
                  <p className="text-xl text-accent font-medium">
                    Founder & CEO
                  </p>
                </div>

                <div className="space-y-4 text-foreground/80 font-[family-name:var(--font-roboto)]">
                  <p>
                    Alexandre Saussier is the founder of {process.env.NEXT_PUBLIC_COMPANY_NAME}, an intelligent automation agency
                    that helps businesses of all types automate their operations with AI agents.
                  </p>

                  <p>
                    As a former Consultant at Deloitte&apos;s Omnia AI practice, Alexandre specialized in AI 
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
                  We believe in the power of flexible, asynchronous collaboration. Our team works remotely across 
                  time zones, allowing us to deliver efficient, cost-effective solutions without the overhead of 
                  traditional consulting firms.
                </p>
                <p className="text-lg text-foreground/80 font-[family-name:var(--font-roboto)] leading-relaxed">
                  But we also know that true understanding comes from being there in person. That&apos;s why we travel 
                  on-site to visit our clients, observe workflows firsthand, and interview your team members. 
                  This hands-on approach ensures we truly understand your business challenges and deliver AI solutions 
                  that seamlessly integrate into your day-to-day operations.
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
              Let&apos;s discuss how AI and automation can help you achieve your goals.
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

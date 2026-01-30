import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
              About <span className="text-accent">Teamdesk AI</span>
            </h1>
            <p className="text-xl text-foreground/70 font-[family-name:var(--font-roboto)]">
              Transforming businesses through intelligent automation and AI-powered solutions
            </p>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-16 lg:py-24 px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Photo */}
              <div className="order-1 lg:order-1">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-light-gray dark:bg-dark-bg border border-border">
                  {/* Placeholder - Replace with actual image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-accent/10 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-6xl font-bold text-accent">AS</span>
                      </div>
                      <p className="text-sm text-foreground/60">Add your photo here</p>
                    </div>
                  </div>
                  {/* Uncomment and add your image path:
                  <Image
                    src="/images/alexandre-saussier.jpg"
                    alt="Alexandre Saussier"
                    fill
                    className="object-cover"
                    priority
                  />
                  */}
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
                    Alexandre Saussier is the founder of Teamdesk AI, bringing deep expertise in artificial intelligence 
                    and intelligent automation to help businesses streamline their operations and unlock new efficiencies.
                  </p>

                  <p>
                    As a former Consultant at Deloitte's Omnia AI practice, Alexandre specialized in AI 
                    Automation consulting, building large-scale solutions for some of the biggest companies and institutions in Canada. 
                  </p>

                  <p>
                    With certifications as a Blue Prism Certified Developer and UiPath Certified RPA Associate, 
                    Alexandre combines technical proficiency with strategic consulting experience.
                  </p>

                  <p>
                    A graduate of McGill University with a degree in Finance and Computer Science, Alexandre has 
                    worked across multiple continents including Montreal, London, and Monaco. Through Teamdesk AI, 
                    he's dedicated to helping businesses of all sizes leverage intelligent automation to reduce manual 
                    work, improve accuracy, and focus on what matters most—growing their business.
                  </p>
                </div>

                
              </div>
            </div>
          </div>
        </section>

        {/* Where and How We Work Section */}
        <section className="py-16 lg:py-24 px-6 lg:px-8 bg-light-gray dark:bg-dark-bg border-y border-border">
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
                  But we also know that true understanding comes from being there in person. That's why we travel 
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-foreground/70 mb-8 font-[family-name:var(--font-roboto)]">
              Let's discuss how AI and automation can help you achieve your goals.
            </p>
            <a
              href="/"
              className="inline-block bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-xl text-base font-semibold transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30"
            >
              Get Started Today
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BrightBots',
  description: 'Privacy Policy for BrightBots - Learn how we collect, use, and protect your information.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-between py-4">
            <a href="/" className="text-2xl font-bold text-foreground hover:text-accent transition-colors">
              BrightBots
            </a>
            <a href="/" className="text-sm text-foreground/60 hover:text-accent transition-colors">
              Back to Home
            </a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-foreground/60 mb-8">Last updated: February 19, 2026</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-foreground/80 mb-4">
              Welcome to BrightBots ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className="text-foreground/80">
              By using our website, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.1 Information You Provide to Us</h3>
            <p className="text-foreground/80 mb-4">
              We collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>Fill out our contact form or onboarding questionnaire</li>
              <li>Request information about our services</li>
              <li>Subscribe to our newsletter or updates</li>
              <li>Communicate with us via email or other channels</li>
            </ul>
            <p className="text-foreground/80 mb-4">
              This information may include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>Business information (business type, size, pain points)</li>
              <li>Contact information (email address, phone number, name)</li>
              <li>Any additional information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-foreground/80 mb-4">
              When you visit our website, we may automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>IP address and geolocation data</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Date and time of your visit</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-foreground/80 mb-4">
              We use the information we collect for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Understand your business needs and recommend appropriate automation solutions</li>
              <li>Send you information about our services, updates, and promotional materials</li>
              <li>Improve our website, services, and user experience</li>
              <li>Analyze usage patterns and trends</li>
              <li>Detect, prevent, and address technical issues or fraud</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. How We Share Your Information</h2>
            <p className="text-foreground/80 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf (e.g., email delivery services, analytics providers, hosting services)</li>
              <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, court order, or governmental regulation</li>
              <li><strong>Protection of Rights:</strong> We may disclose information to protect our rights, property, or safety, or that of our users or others</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
            <p className="text-foreground/80 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>Encrypted data transmission using HTTPS/TLS</li>
              <li>Secure email transmission protocols</li>
              <li>Regular security assessments and updates</li>
              <li>Limited access to personal information by authorized personnel only</li>
            </ul>
            <p className="text-foreground/80">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
            <p className="text-foreground/80">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Privacy Rights</h2>
            <p className="text-foreground/80 mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Objection:</strong> Object to our processing of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your information to another service provider</li>
              <li><strong>Withdrawal of Consent:</strong> Withdraw consent for processing where we rely on consent</li>
            </ul>
            <p className="text-foreground/80">
              To exercise these rights, please contact us at alexandre@brightbots.io.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="text-foreground/80 mb-4">
              Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings. However, disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Third-Party Links</h2>
            <p className="text-foreground/80">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Children's Privacy</h2>
            <p className="text-foreground/80">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete such information promptly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. International Data Transfers</h2>
            <p className="text-foreground/80">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws different from those in your country. We take appropriate measures to ensure your information receives adequate protection.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-foreground/80">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Us</h2>
            <p className="text-foreground/80 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-foreground mb-2"><strong>BrightBots</strong></p>
              <p className="text-foreground/80 mb-2">Email: alexandre@brightbots.io</p>
              <p className="text-foreground/80">Website: brightbots.io</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

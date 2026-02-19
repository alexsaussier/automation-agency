import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | BrightBots',
  description: 'Terms of Service for BrightBots - Read our terms and conditions for using our services.',
};

export default function TermsOfService() {
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
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
        <p className="text-foreground/60 mb-8">Last updated: February 19, 2026</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
            <p className="text-foreground/80 mb-4">
              These Terms of Service ("Terms") constitute a legally binding agreement between you and BrightBots ("we," "us," or "our") governing your access to and use of our website, services, and any related content (collectively, the "Services").
            </p>
            <p className="text-foreground/80 mb-4">
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Services</h2>
            <p className="text-foreground/80 mb-4">
              BrightBots provides AI-powered automation solutions for businesses, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>Business process automation consulting and implementation</li>
              <li>Custom AI agent development and integration</li>
              <li>Workflow optimization and automation solutions</li>
              <li>Lead generation and inquiry management through our website</li>
            </ul>
            <p className="text-foreground/80">
              We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time without prior notice.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Eligibility</h2>
            <p className="text-foreground/80 mb-4">
              You must be at least 18 years old and capable of forming a binding contract to use our Services. By using our Services, you represent and warrant that you meet these eligibility requirements.
            </p>
            <p className="text-foreground/80">
              If you are using our Services on behalf of a business or organization, you represent that you have the authority to bind that entity to these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. User Accounts and Registration</h2>
            <p className="text-foreground/80 mb-4">
              When you submit information through our contact forms or onboarding questionnaires, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your information as necessary</li>
              <li>Not impersonate any person or entity or misrepresent your affiliation</li>
              <li>Use the Services only for lawful purposes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Acceptable Use</h2>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">5.1 Permitted Use</h3>
            <p className="text-foreground/80 mb-4">
              You may use our Services for legitimate business purposes, including inquiring about our automation solutions, requesting consultations, and engaging with our content.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">5.2 Prohibited Activities</h3>
            <p className="text-foreground/80 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>Use the Services for any illegal purpose or in violation of any laws</li>
              <li>Transmit any viruses, malware, or other malicious code</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Interfere with or disrupt the Services or servers</li>
              <li>Engage in any automated use of the system (scraping, bots, etc.) without permission</li>
              <li>Collect or harvest personal information of other users</li>
              <li>Use the Services to send spam or unsolicited communications</li>
              <li>Reproduce, duplicate, copy, or resell any part of our Services</li>
              <li>Reverse engineer, decompile, or disassemble any aspect of our Services</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Intellectual Property Rights</h2>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">6.1 Our Intellectual Property</h3>
            <p className="text-foreground/80 mb-4">
              All content, features, and functionality of our Services, including but not limited to text, graphics, logos, images, software, and design, are owned by BrightBots or our licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">6.2 Limited License</h3>
            <p className="text-foreground/80 mb-4">
              We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Services for personal or internal business purposes. This license does not include any right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for commercial purposes without authorization</li>
              <li>Remove any copyright or proprietary notations</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">6.3 Your Content</h3>
            <p className="text-foreground/80">
              You retain all rights to any content you submit through our Services. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content for the purpose of providing and improving our Services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Service Agreements and Deliverables</h2>
            <p className="text-foreground/80 mb-4">
              For clients who engage our automation services, specific terms regarding project scope, deliverables, timelines, and pricing will be set forth in a separate written agreement ("Service Agreement"). In the event of any conflict between these Terms and a Service Agreement, the Service Agreement shall prevail.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Payment Terms</h2>
            <p className="text-foreground/80 mb-4">
              If you purchase services from us:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>You agree to pay all fees as specified in your Service Agreement</li>
              <li>All fees are in USD unless otherwise stated</li>
              <li>Payment is due according to the payment schedule in your Service Agreement</li>
              <li>Late payments may incur interest charges and/or suspension of services</li>
              <li>All fees are non-refundable unless otherwise specified in writing</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Confidentiality</h2>
            <p className="text-foreground/80 mb-4">
              Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of our business relationship. This includes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>Business processes and operations</li>
              <li>Technical information and trade secrets</li>
              <li>Financial information</li>
              <li>Customer data and lists</li>
            </ul>
            <p className="text-foreground/80">
              Confidential information does not include information that is publicly available, independently developed, or rightfully received from a third party.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Disclaimers and Warranties</h2>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">10.1 "As Is" Basis</h3>
            <p className="text-foreground/80 mb-4">
              OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">10.2 No Guarantee of Results</h3>
            <p className="text-foreground/80 mb-4">
              While we strive to provide high-quality automation solutions, we do not guarantee specific results, cost savings, or performance improvements. Results may vary based on numerous factors including client implementation, existing systems, and business processes.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">10.3 Third-Party Services</h3>
            <p className="text-foreground/80">
              Our Services may integrate with or rely on third-party platforms, APIs, or services. We are not responsible for the availability, accuracy, or functionality of these third-party services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Limitation of Liability</h2>
            <p className="text-foreground/80 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, BRIGHTBOTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>Your access to or use of (or inability to access or use) the Services</li>
              <li>Any conduct or content of any third party on the Services</li>
              <li>Unauthorized access, use, or alteration of your content</li>
              <li>Any bugs, viruses, or other harmful code obtained from the Services</li>
            </ul>
            <p className="text-foreground/80">
              OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Indemnification</h2>
            <p className="text-foreground/80">
              You agree to indemnify, defend, and hold harmless BrightBots and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of the Services, your violation of these Terms, or your violation of any rights of another party.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Termination</h2>
            <p className="text-foreground/80 mb-4">
              We reserve the right to suspend or terminate your access to the Services at any time, with or without cause, with or without notice, for any reason including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground/80 space-y-2">
              <li>Violation of these Terms</li>
              <li>Fraudulent, abusive, or illegal activity</li>
              <li>Extended periods of inactivity</li>
              <li>At our sole discretion</li>
            </ul>
            <p className="text-foreground/80">
              Upon termination, your right to use the Services will immediately cease. Provisions that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">14. Dispute Resolution</h2>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">14.1 Informal Resolution</h3>
            <p className="text-foreground/80 mb-4">
              Before filing a claim, you agree to contact us at alexandre@brightbots.io to attempt to resolve the dispute informally. We will attempt to resolve disputes in good faith.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">14.2 Governing Law</h3>
            <p className="text-foreground/80 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which BrightBots operates, without regard to its conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">14.3 Arbitration</h3>
            <p className="text-foreground/80">
              Any dispute arising from or relating to these Terms or the Services that cannot be resolved informally shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except for disputes that qualify for small claims court.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">15. Changes to Terms</h2>
            <p className="text-foreground/80 mb-4">
              We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by updating the "Last updated" date at the top of these Terms and, where appropriate, by other means such as email notification.
            </p>
            <p className="text-foreground/80">
              Your continued use of the Services after any changes to these Terms constitutes your acceptance of the new Terms. If you do not agree to the modified Terms, you must stop using the Services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">16. Miscellaneous</h2>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">16.1 Entire Agreement</h3>
            <p className="text-foreground/80 mb-4">
              These Terms, together with our Privacy Policy and any Service Agreement, constitute the entire agreement between you and BrightBots regarding the Services.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">16.2 Severability</h3>
            <p className="text-foreground/80 mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">16.3 Waiver</h3>
            <p className="text-foreground/80 mb-4">
              No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">16.4 Assignment</h3>
            <p className="text-foreground/80">
              You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign these Terms without restriction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">17. Contact Information</h2>
            <p className="text-foreground/80 mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-foreground mb-2"><strong>BrightBots</strong></p>
              <p className="text-foreground/80 mb-2">Email: alexandre@brightbots.io</p>
              <p className="text-foreground/80">Website: brightbots.io</p>
            </div>
          </section>

          <section className="mb-12">
            <p className="text-foreground/80 italic">
              By using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

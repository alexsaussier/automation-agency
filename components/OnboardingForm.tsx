'use client';

import { useState, useEffect } from 'react';
import Modal from './Modal';

interface FormData {
  businessType: string;
  businessSize: string;
  painPoint: string;
  otherPainPoint: string;
}

function ScrollableOptions({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative max-h-[500px]">
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-light-gray to-transparent pointer-events-none z-10" />
      <div className="overflow-y-auto max-h-[500px] px-4 py-8 scroll-smooth space-y-4 scrollbar-hide">
        {children}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-light-gray to-transparent pointer-events-none z-10" />
    </div>
  );
}

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [displayStep, setDisplayStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessType: '',
    businessSize: '',
    painPoint: '',
    otherPainPoint: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (step !== displayStep) {
      setIsTransitioning(true);

      setTimeout(() => {
        setDisplayStep(step);

        requestAnimationFrame(() => {
          setIsTransitioning(false);
        });
      }, 300);
    }
  }, [step, displayStep]);

  const businessTypes = [
    'Law Firm',
    'E-commerce',
    'Software',
    'Consulting',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Real Estate',
    'Education',
    'Other'
  ];

  const businessSizes = [
    'Solo (just me)',
    'Small (2-10 employees)',
    'Medium (11-50 employees)',
    'Large (51-200 employees)',
    'Enterprise (200+ employees)',
  ];

  const painPoints = [
    'Data entry and processing',
    'Customer communication and support',
    'Invoice and payment processing',
    'Report generation and analysis',
    'Scheduling and calendar management',
    'Email management and responses',
    'Social media management',
    'Document organization and filing',
  ];

  const handleBusinessTypeSelect = (type: string) => {
    if (isTransitioning) return;
    setFormData({ ...formData, businessType: type });
    setStep(2);
  };

  const handleBusinessSizeSelect = (size: string) => {
    if (isTransitioning) return;
    setFormData({ ...formData, businessSize: size });
    setStep(3);
  };

  const handlePainPointSelect = (point: string) => {
    setFormData({
      ...formData,
      painPoint: formData.painPoint === point ? '' : point,
    });
  };

  const handleSubmit = () => {
    if (!formData.painPoint && !formData.otherPainPoint.trim()) return;
    setShowModal(true);
  };

  const handleSendEmail = async () => {
    if (isSending) return;

    setIsSending(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          additionalInfo,
        }),
      });

      if (response.ok) {
        alert('Thank you! We\'ve received your information and will get back to you soon.');
        setShowModal(false);
        setAdditionalInfo('');
        setFormData({ businessType: '', businessSize: '', painPoint: '', otherPainPoint: '' });
        setStep(1);
        setDisplayStep(1);
      } else {
        alert('There was an error sending your information. Please try again or contact us directly at alex@brightbots.io');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error sending your information. Please try again or contact us directly at alex@brightbots.io');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[500px] flex items-start">
      <div
        className={`w-full transition-all ${
          isTransitioning
            ? 'opacity-0 blur-md scale-95 duration-300'
            : 'opacity-100 blur-0 scale-100 duration-500'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {displayStep === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl lg:text-4xl font-bold mb-3 font-[family-name:var(--font-inter)]">
                What kind of business are you in?
              </h3>
              <p className="text-lg text-foreground/60 font-[family-name:var(--font-roboto)]">
                Help us understand your business to provide you tailored advice.
              </p>
            </div>
            <ScrollableOptions>
              {businessTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleBusinessTypeSelect(type)}
                  disabled={isTransitioning}
                  className="group relative w-full p-6 rounded-xl border-2 border-border transition-all text-left bg-background hover:border-accent hover:shadow-lg hover:shadow-accent/10 disabled:opacity-50 disabled:cursor-not-allowed focus:border-accent focus:scale-105"
                >
                  <span className="text-base font-medium group-hover:text-accent transition-colors">
                    {type}
                  </span>
                </button>
              ))}
            </ScrollableOptions>
          </div>
        )}

        {displayStep === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl lg:text-4xl font-bold mb-3 font-[family-name:var(--font-inter)]">
                What is the size of your business?
              </h3>
              <p className="text-lg text-foreground/60 font-[family-name:var(--font-roboto)]">
                This helps us recommend the right scale of automation solutions.
              </p>
            </div>
            <ScrollableOptions>
              {businessSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleBusinessSizeSelect(size)}
                  disabled={isTransitioning}
                  className="group relative w-full p-6 rounded-xl border-2 border-border transition-all text-left bg-background hover:border-accent hover:shadow-lg hover:shadow-accent/10 disabled:opacity-50 disabled:cursor-not-allowed focus:border-accent focus:scale-105"
                >
                  <span className="text-base font-medium group-hover:text-accent transition-colors">
                    {size}
                  </span>
                </button>
              ))}
            </ScrollableOptions>
          </div>
        )}

        {displayStep === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl lg:text-4xl font-bold mb-3 font-[family-name:var(--font-inter)]">
                What parts of your business take the most time?
              </h3>
              <p className="text-lg text-foreground/60 font-[family-name:var(--font-roboto)]">
                Select the areas where you spend the most effort, or tell us about something else.
              </p>
            </div>
            <ScrollableOptions>
              {painPoints.map((point) => (
                <button
                  key={point}
                  onClick={() => handlePainPointSelect(point)}
                  className={`group relative w-full p-6 rounded-xl border-2 transition-all text-left ${
                    formData.painPoint === point
                      ? 'border-accent bg-accent text-white shadow-lg shadow-accent/20'
                      : 'border-border bg-background hover:border-accent hover:shadow-lg hover:shadow-accent/10'
                  }`}
                >
                  <span className={`text-base font-medium transition-colors ${
                    formData.painPoint === point ? '' : 'group-hover:text-accent'
                  }`}>
                    {point}
                  </span>
                </button>
              ))}
            </ScrollableOptions>

            <div className="pt-4">
              <label htmlFor="other" className="block text-base font-medium mb-3 font-[family-name:var(--font-inter)]">
                Or describe your specific challenge:
              </label>
              <textarea
                id="other"
                value={formData.otherPainPoint}
                onChange={(e) =>
                  setFormData({ ...formData, otherPainPoint: e.target.value })
                }
                placeholder="Tell us about your specific challenges..."
                className="w-full p-4 rounded-xl border-2 border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 min-h-[120px] text-base transition-all resize-none"
              />
            </div>

            <div className="flex justify-center pt-6">
              <button
                onClick={handleSubmit}
                disabled={!formData.painPoint && !formData.otherPainPoint.trim()}
                className="bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-xl text-base font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 font-[family-name:var(--font-inter)]"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-inter)]">
              Help us prepare for your call
            </h3>
            <p className="text-foreground/60 font-[family-name:var(--font-roboto)]">
              Is there anything else that would be helpful for us to know before?
            </p>
          </div>

          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="anything else that would be helpful for us to know?"
            className="w-full p-4 rounded-xl border-2 border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 min-h-[150px] text-base transition-all resize-none"
          />

          <div className="flex gap-4">
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-border hover:border-accent transition-all text-base font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSendEmail}
              disabled={isSending}
              className="flex-1 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-xl text-base font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30"
            >
              {isSending ? 'Sending...' : 'Contact Us'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

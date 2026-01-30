'use client';

import { useState, useEffect } from 'react';
import Modal from './Modal';

interface FormData {
  businessType: string;
  businessSize: string;
  painPoint: string;
  otherPainPoint: string;
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
    'E-commerce',
    'SaaS',
    'Consulting',
    'Healthcare',
    'Finance',
    'Manufacturing',
    'Retail',
    'Real Estate',
    'Education',
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
      } else {
        alert('There was an error sending your information. Please try again or contact us directly at alexandre@teamdesk.app');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error sending your information. Please try again or contact us directly at alexandre@teamdesk.app');
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
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-3 font-[family-name:var(--font-inter)]">
                What type of business do you have?
              </h3>
              <p className="text-lg text-foreground/60 font-[family-name:var(--font-roboto)]">
                Help us understand your industry so we can tailor our automation solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {businessTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleBusinessTypeSelect(type)}
                  disabled={isTransitioning}
                  className="group relative p-6 rounded-xl border-2 border-border transition-all text-left bg-background hover:border-accent hover:shadow-lg hover:shadow-accent/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-base font-medium group-hover:text-accent transition-colors">
                    {type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {displayStep === 2 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-3 font-[family-name:var(--font-inter)]">
                What is the size of your business?
              </h3>
              <p className="text-lg text-foreground/60 font-[family-name:var(--font-roboto)]">
                This helps us recommend the right scale of automation solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 max-w-2xl">
              {businessSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleBusinessSizeSelect(size)}
                  disabled={isTransitioning}
                  className="group relative p-6 rounded-xl border-2 border-border transition-all text-left bg-background hover:border-accent hover:shadow-lg hover:shadow-accent/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-base font-medium group-hover:text-accent transition-colors">
                    {size}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {displayStep === 3 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-3 font-[family-name:var(--font-inter)]">
                What parts of your business take the most time?
              </h3>
              <p className="text-lg text-foreground/60 font-[family-name:var(--font-roboto)]">
                Select the areas where you spend the most effort, or tell us about something else.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {painPoints.map((point) => (
                <button
                  key={point}
                  onClick={() => handlePainPointSelect(point)}
                  className={`group relative p-6 rounded-xl border-2 transition-all text-left ${
                    formData.painPoint === point
                      ? 'border-accent bg-accent text-white shadow-lg shadow-accent/20'
                      : 'border-border bg-background hover:border-accent hover:shadow-lg hover:shadow-accent/10'
                  }`}
                >
                  <span className={`text-base font-medium transition-colors ${
                    formData.painPoint === point
                      ? ''
                      : 'group-hover:text-accent'
                  }`}>
                    {point}
                  </span>
                </button>
              ))}
            </div>

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
                Get Your Custom Solution
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-inter)]">
              One Last Thing...
            </h3>
            <p className="text-foreground/60 font-[family-name:var(--font-roboto)]">
              Is there anything else that would be helpful for us to know?
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

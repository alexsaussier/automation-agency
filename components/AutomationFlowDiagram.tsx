'use client';

import { useState, useEffect, useRef } from 'react';

const flows = [
  {
    id: 'newsletter',
    label: 'Law Firm',
    emoji: '⚖️',
    steps: [
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        ),
        label: 'Scrape Legal News',
        sublabel: 'Daily automated web search',
        color: 'from-blue-500/20 to-blue-400/10 border-blue-400/40',
        iconBg: 'bg-blue-500/20 text-blue-600',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        label: 'AI Summarises',
        sublabel: 'Key points extracted by Claude',
        color: 'from-accent/20 to-accent/10 border-accent/40',
        iconBg: 'bg-accent/20 text-accent',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        label: 'Newsletter Sent',
        sublabel: 'Team receives every Monday',
        color: 'from-green-500/20 to-green-400/10 border-green-400/40',
        iconBg: 'bg-green-500/20 text-green-600',
      },
    ],
  },
  {
    id: 'crm',
    label: 'Sales CRM',
    emoji: '💼',
    steps: [
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ),
        label: 'Telegram Bot',
        sublabel: 'Sales rep sends prospect info',
        color: 'from-blue-500/20 to-blue-400/10 border-blue-400/40',
        iconBg: 'bg-blue-500/20 text-blue-600',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        ),
        label: 'Data Enrichment',
        sublabel: 'Company info auto-fetched',
        color: 'from-accent/20 to-accent/10 border-accent/40',
        iconBg: 'bg-accent/20 text-accent',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        label: 'CRM + Slack Alert',
        sublabel: 'Lead registered, team notified',
        color: 'from-green-500/20 to-green-400/10 border-green-400/40',
        iconBg: 'bg-green-500/20 text-green-600',
      },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    emoji: '🎧',
    steps: [
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        ),
        label: 'Customer Email',
        sublabel: 'Incoming support request',
        color: 'from-blue-500/20 to-blue-400/10 border-blue-400/40',
        iconBg: 'bg-blue-500/20 text-blue-600',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        label: 'AI Classifies & Drafts',
        sublabel: 'Intent detected, reply written',
        color: 'from-accent/20 to-accent/10 border-accent/40',
        iconBg: 'bg-accent/20 text-accent',
      },
      {
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        label: '80% Auto-Resolved',
        sublabel: 'Complex cases sent to human',
        color: 'from-green-500/20 to-green-400/10 border-green-400/40',
        iconBg: 'bg-green-500/20 text-green-600',
      },
    ],
  },
];

function FlowConnector() {
  return (
    <div className="flex flex-col items-center py-1">
      <svg width="2" height="44" viewBox="0 0 2 44" fill="none" overflow="visible">
        {/* Static track */}
        <line x1="1" y1="0" x2="1" y2="44" stroke="#e5e5e5" strokeWidth="2" />
        {/* Animated dashes traveling downward */}
        <line
          x1="1" y1="0" x2="1" y2="44"
          stroke="#4d65ff"
          strokeWidth="2"
          strokeDasharray="5 5"
          className="flow-line-dash"
        />
        {/* Arrow tip */}
        <polygon points="1,44 -3,36 5,36" fill="#4d65ff" opacity="0.5" />
      </svg>
    </div>
  );
}

function FlowNode({
  step,
  index,
  nodeKey,
}: {
  step: (typeof flows)[0]['steps'][0];
  index: number;
  nodeKey: number;
}) {
  return (
    <div
      key={`${nodeKey}-${index}`}
      className={`flow-node-enter bg-gradient-to-br ${step.color} border rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm`}
      style={{ animationDelay: `${index * 130}ms` }}
    >
      <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${step.iconBg}`}>
        {step.icon}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground leading-tight">{step.label}</div>
        <div className="text-xs text-foreground/55 mt-0.5 leading-tight">{step.sublabel}</div>
      </div>
      {/* Pulse dot on the right */}
      <div className="flex-shrink-0 ml-auto">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-40"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent/70"></span>
        </span>
      </div>
    </div>
  );
}

export default function AutomationFlowDiagram() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nodeKey, setNodeKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % flows.length);
      setNodeKey((k) => k + 1);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabClick = (i: number) => {
    setActiveIndex(i);
    setNodeKey((k) => k + 1);
    startTimer();
  };

  const flow = flows[activeIndex];

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      {/* Header label */}
      <div className="text-xs font-semibold uppercase tracking-widest text-foreground/40 text-center">
        Live automation example
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-2 bg-foreground/5 rounded-2xl p-1.5">
        {flows.map((f, i) => (
          <button
            key={f.id}
            onClick={() => handleTabClick(i)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              activeIndex === i
                ? 'bg-white text-foreground shadow-sm'
                : 'text-foreground/50 hover:text-foreground/80'
            }`}
          >
            <span>{f.emoji}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Flow diagram */}
      <div className="bg-white/60 backdrop-blur-sm border border-border/60 rounded-2xl p-4 shadow-lg">
        {/* Use-case title */}
        <div className="text-center mb-4">
          <span className="text-xs font-medium text-foreground/40">
            {flow.id === 'newsletter' && 'Legal news → AI → weekly digest'}
            {flow.id === 'crm' && 'Prospect info → enriched → CRM entry'}
            {flow.id === 'support' && 'Email → AI triage → instant reply'}
          </span>
        </div>

        {/* Nodes + connectors */}
        <div className="flex flex-col">
          {flow.steps.map((step, i) => (
            <div key={`${nodeKey}-${i}`}>
              <FlowNode step={step} index={i} nodeKey={nodeKey} />
              {i < flow.steps.length - 1 && <FlowConnector />}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-0.5 bg-foreground/8 rounded-full overflow-hidden">
          <div
            key={`progress-${activeIndex}`}
            className="h-full bg-accent rounded-full flow-progress-bar"
          />
        </div>
      </div>
    </div>
  );
}

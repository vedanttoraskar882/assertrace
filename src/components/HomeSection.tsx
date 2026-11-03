import { useRef } from 'react';

interface HomeSectionProps {
  onRequestPilot: (trigger?: HTMLElement | null) => void;
}

const VALUE_STATEMENTS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="#0F766E" strokeWidth="1.5"/>
        <path d="M7 10L9 12L13 8" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: 'Understand every complaint point.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="14" height="12" rx="2" stroke="#0F766E" strokeWidth="1.5"/>
        <path d="M7 8h6M7 11h4" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    text: 'Check claims against sources and records.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 3L14 6V11L10 14L6 11V6L10 3Z" stroke="#0F766E" strokeWidth="1.5" fill="none"/>
        <path d="M8 9L9.5 10.5L12 8" stroke="#0F766E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    text: 'Review responses with traceable evidence.',
  },
];

const PREVIEW_POINTS = [
  { label: 'Settlement figure query', status: 'Consistent with account record', statusColor: '#0F766E', statusBg: '#E6F5F1' },
  { label: 'End-of-contract charge dispute', status: 'Source found — review interpretation', statusColor: '#C59A45', statusBg: '#FEF9EE' },
  { label: 'Missed callback', status: 'Evidence required', statusColor: '#64748B', statusBg: '#F1F5F9' },
];

const PREVIEW_COVERAGE = [
  { point: 'Settlement figure', status: 'Addressed', color: '#0F766E' },
  { point: 'Charge dispute', status: 'Addressed', color: '#0F766E' },
  { point: 'Missed callback', status: 'Review required', color: '#C59A45' },
];

export default function HomeSection({ onRequestPilot }: HomeSectionProps) {
  const pilotBtnRef = useRef<HTMLButtonElement>(null);
  const exploreBtnRef = useRef<HTMLAnchorElement>(null);

  const scrollToPlatform = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('platform');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="pt-[72px]"
      style={{ background: 'linear-gradient(160deg, #0B1220 0%, #0d1a2e 60%, #0F3530 100%)' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <span
              className="inline-block px-3 py-1 text-xs font-semibold tracking-wide rounded-full mb-6"
              style={{ background: 'rgba(15,118,110,0.2)', color: '#5EEAD4', border: '1px solid rgba(15,118,110,0.3)' }}
            >
              Complaint assurance for UK regulated firms
            </span>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ color: '#F7F9FC' }}
            >
              Verify what arrives.{' '}
              <span style={{ color: '#5EEAD4' }}>Confirm the real grievance.</span>{' '}
              Prove the reply answers it.
            </h1>

            <p className="text-lg leading-relaxed mb-8" style={{ color: '#94A3B8' }}>
              AssertTrace is being developed to help complaint teams verify assertions and
              citations, understand the customer's concerns, and check that every point is
              addressed in the final response—with source-linked evidence and human oversight.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                ref={pilotBtnRef}
                onClick={() => onRequestPilot(pilotBtnRef.current)}
                className="px-6 py-3 font-semibold text-white rounded-lg transition-all duration-150 cursor-pointer"
                style={{ background: '#0F766E' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#0d6560')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#0F766E')}
              >
                Request a Pilot
              </button>
              <a
                ref={exploreBtnRef}
                href="#platform"
                onClick={scrollToPlatform}
                className="px-6 py-3 font-semibold rounded-lg transition-all duration-150 no-underline"
                style={{
                  color: '#5EEAD4',
                  border: '1px solid rgba(94,234,212,0.3)',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(94,234,212,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Explore the Platform
              </a>
            </div>

            <ul className="flex flex-col gap-3" role="list">
              {VALUE_STATEMENTS.map((vs, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="shrink-0">{vs.icon}</span>
                  <span className="text-sm font-medium" style={{ color: '#CBD5E1' }}>
                    {vs.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Illustrative preview */}
          <div className="lg:pl-4">
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0d1929' }}
            >
              {/* Window chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: '#0a1420', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              >
                <span className="w-3 h-3 rounded-full bg-red-500/70"/>
                <span className="w-3 h-3 rounded-full bg-yellow-500/70"/>
                <span className="w-3 h-3 rounded-full bg-green-500/70"/>
                <span className="ml-3 text-xs font-medium" style={{ color: '#64748B' }}>
                  AssertTrace — Complaint Integrity Overview
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold tracking-wide" style={{ color: '#5EEAD4' }}>
                      DEMO-001
                    </p>
                    <p className="text-sm font-bold mt-0.5" style={{ color: '#E2E8F0' }}>
                      Complaint Integrity Overview
                    </p>
                  </div>
                  <span
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: 'rgba(197,154,69,0.15)', color: '#C59A45', border: '1px solid rgba(197,154,69,0.3)' }}
                  >
                    In Review
                  </span>
                </div>

                {/* Assertion cards */}
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#475569' }}>
                    Complaint Points
                  </p>
                  <div className="flex flex-col gap-2">
                    {PREVIEW_POINTS.map((point, i) => (
                      <div
                        key={i}
                        className="rounded-lg p-3 flex items-start justify-between gap-3"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <p className="text-xs font-medium" style={{ color: '#CBD5E1' }}>
                          {point.label}
                        </p>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap shrink-0"
                          style={{ background: point.statusBg + '22', color: point.statusColor, border: `1px solid ${point.statusColor}44` }}
                        >
                          {point.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response coverage */}
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#475569' }}>
                    Response Coverage
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {PREVIEW_COVERAGE.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span style={{ color: '#94A3B8' }}>{item.point}</span>
                        <span className="font-semibold" style={{ color: item.color }}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p
                  className="text-xs text-center py-2 rounded-lg mt-3"
                  style={{ color: '#64748B', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  Illustrative preview — simulated data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#F7F9FC"/>
        </svg>
      </div>
    </section>
  );
}

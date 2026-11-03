import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

interface HomeSectionProps {
  onRequestPilot: (trigger?: HTMLElement | null) => void;
}

const VALUE_STATEMENTS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="7.5" stroke="#5EEAD4" strokeWidth="1.4" />
        <path d="M6 9l2.5 2.5L12.5 7" stroke="#5EEAD4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'Understand every complaint point',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2.5" y="3.5" width="13" height="11" rx="1.5" stroke="#5EEAD4" strokeWidth="1.4" />
        <path d="M5.5 7.5h7M5.5 10h5" stroke="#5EEAD4" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    text: 'Check claims against sources and records',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2L14.5 5V10C14.5 13.3 12 16 9 16.5C6 16 3.5 13.3 3.5 10V5L9 2Z" stroke="#5EEAD4" strokeWidth="1.4" fill="none" />
        <path d="M6.5 9L8 10.5L11.5 7" stroke="#5EEAD4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    text: 'Review responses with traceable evidence',
  },
];

const PREVIEW_POINTS = [
  { label: 'Settlement figure query', status: 'Consistent with account record', dot: '#0F766E', bg: 'rgba(14,118,110,0.08)' },
  { label: 'End-of-contract charge dispute', status: 'Source found — review interpretation', dot: '#C59A45', bg: 'rgba(197,154,69,0.08)' },
  { label: 'Missed callback', status: 'Evidence required', dot: '#64748B', bg: 'rgba(100,116,139,0.07)' },
];

const PREVIEW_COVERAGE = [
  { point: 'Settlement figure', status: 'Addressed', color: '#0F766E' },
  { point: 'Charge dispute', status: 'Addressed', color: '#0F766E' },
  { point: 'Missed callback', status: 'Review required', color: '#C59A45' },
];

export default function HomeSection({ onRequestPilot }: HomeSectionProps) {
  const pilotBtnRef = useRef<HTMLButtonElement>(null);
  const heroRef = useReveal<HTMLDivElement>(0.05);
  const previewRef = useReveal<HTMLDivElement>(0.05);

  const scrollToPlatform = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('platform');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-mesh pt-[68px]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-center">

          {/* ── Copy ── */}
          <div ref={heroRef} className="reveal">
            <div className="mb-6">
              <span
                className="inline-block px-3 py-1 text-[0.7rem] font-semibold tracking-widest uppercase rounded-full"
                style={{
                  background: 'rgba(94,234,212,0.1)',
                  color: '#5EEAD4',
                  border: '1px solid rgba(94,234,212,0.2)',
                  letterSpacing: '0.08em',
                }}
              >
                Complaint assurance for UK regulated firms
              </span>
            </div>

            <h1
              className="text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] font-bold leading-[1.18] mb-6"
              style={{ color: '#F7F9FC', letterSpacing: '-0.02em' }}
            >
              Verify what arrives.{' '}
              <span style={{ color: '#5EEAD4' }}>Confirm the real grievance.</span>{' '}
              Prove the reply answers it.
            </h1>

            <p className="text-[1.0625rem] leading-[1.75] mb-10" style={{ color: '#94A3B8', maxWidth: '520px' }}>
              AssertTrace is being developed to help complaint teams verify assertions and
              citations, understand the customer's concerns, and check that every point is
              addressed in the final response—with source-linked evidence and human oversight.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <button
                ref={pilotBtnRef}
                onClick={() => onRequestPilot(pilotBtnRef.current)}
                className="px-6 py-3 font-semibold text-white rounded-lg cursor-pointer transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #0F766E 0%, #0d6560 100%)',
                  boxShadow: '0 4px 20px rgba(15,118,110,0.4)',
                  fontSize: '0.9375rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(15,118,110,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(15,118,110,0.4)';
                }}
              >
                Request a Pilot
              </button>
              <a
                href="#platform"
                onClick={scrollToPlatform}
                className="px-6 py-3 font-semibold rounded-lg no-underline transition-all duration-200"
                style={{
                  color: '#CBD5E1',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '0.9375rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                  e.currentTarget.style.color = '#F7F9FC';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.color = '#CBD5E1';
                }}
              >
                Explore the Platform
              </a>
            </div>

            <ul className="flex flex-col gap-3" role="list">
              {VALUE_STATEMENTS.map((vs, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(94,234,212,0.1)' }}>
                    {vs.icon}
                  </span>
                  <span style={{ color: '#CBD5E1', fontSize: '0.9rem', fontWeight: 500 }}>{vs.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Illustrative preview ── */}
          <div ref={previewRef} className="reveal reveal-delay-2">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#0d1929',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(15,118,110,0.15)',
              }}
            >
              {/* Window chrome */}
              <div
                className="flex items-center gap-1.5 px-4 py-3"
                style={{ background: '#080f1c', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28CA41' }} />
                <span className="ml-3 text-xs" style={{ color: '#475569', fontFamily: 'monospace' }}>
                  asserttrace — complaint-overview — DEMO-001
                </span>
              </div>

              <div className="p-5">
                {/* Case header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-[0.7rem] font-bold tracking-widest uppercase mb-1" style={{ color: '#5EEAD4' }}>
                      Case DEMO-001
                    </p>
                    <p className="text-sm font-semibold" style={{ color: '#E2E8F0' }}>
                      Complaint Integrity Overview
                    </p>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: 'rgba(197,154,69,0.15)', color: '#C59A45', border: '1px solid rgba(197,154,69,0.25)' }}
                  >
                    In Review
                  </span>
                </div>

                {/* Complaint points */}
                <div className="mb-4">
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest mb-2.5" style={{ color: '#334155' }}>
                    Complaint Points
                  </p>
                  <div className="flex flex-col gap-2">
                    {PREVIEW_POINTS.map((pt, i) => (
                      <div
                        key={i}
                        className="rounded-lg p-3 flex items-start gap-3"
                        style={{ background: pt.bg, border: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        <span
                          className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: pt.dot }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium mb-0.5" style={{ color: '#CBD5E1' }}>{pt.label}</p>
                          <p className="text-[0.7rem]" style={{ color: pt.dot }}>{pt.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4" style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

                {/* Coverage */}
                <div className="mb-4">
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest mb-2.5" style={{ color: '#334155' }}>
                    Response Coverage
                  </p>
                  <div className="flex flex-col gap-2">
                    {PREVIEW_COVERAGE.map((c, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: '#64748B' }}>{c.point}</span>
                        <span className="text-xs font-semibold" style={{ color: c.color }}>{c.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p
                  className="text-center text-[0.65rem] py-2 rounded-lg"
                  style={{ color: '#334155', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
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
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '56px' }}>
          <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" fill="#F7F9FC" />
        </svg>
      </div>
    </section>
  );
}

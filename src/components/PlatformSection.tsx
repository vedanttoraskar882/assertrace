import { useState, useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

interface PlatformSectionProps {
  onRequestPilot: (trigger?: HTMLElement | null) => void;
}

const TABS = [
  { id: 'understanding', label: 'Complaint Understanding' },
  { id: 'verification', label: 'Source & Verification' },
  { id: 'response', label: 'Response Assurance' },
  { id: 'evidence', label: 'Evidence & Insights' },
];

const CAPABILITIES = {
  understanding: [
    {
      number: '1',
      title: 'Assertion Extractor',
      description:
        'Breaks submissions into factual assertions, citations, requested remedies and support cues. The proposed dual-model approach flags extraction disagreements for human review.',
    },
    {
      number: '2',
      title: 'Grievance Distiller',
      description:
        "Produces a short, plain-English list of the customer's complaint points, keeping the actual grievance clearly visible throughout the process.",
    },
    {
      number: '3',
      title: 'Vulnerability Sensitivity',
      description:
        'Highlights language indicating distress or possible support needs so handlers can consider appropriate assistance. These cues must never weaken a complaint.',
    },
    {
      number: '4',
      title: 'Grievance Confirmation Loop',
      description:
        'Offers the customer an accessible summary to confirm, correct or add to. Confirmation is optional; investigation continues if the customer does not respond. Planned formats include standard text, large print, audio, simplified language and assisted confirmation.',
    },
  ],
  verification: [
    {
      number: '5',
      title: 'Citation Resolver',
      description:
        'Checks cited authorities against relevant sources and distinguishes between: Supports the point · Exists but does not support the stated interpretation · Cannot be found. A "cannot be found" result is a source-verification finding, not automatic proof of fabrication.',
    },
    {
      number: '6',
      title: 'Account Fact Matcher',
      description:
        'Compares factual assertions with agreements, account histories and contact records. Possible statuses: Consistent · Contradicted · Not evidenced.',
    },
    {
      number: '7',
      title: 'Point-in-Time Regime Router',
      description:
        'Identifies relevant rule versions and processes for the date and subject of an assertion, and flags deadlines for review. Scope and eligibility decisions remain with the handler.',
    },
    {
      number: '8',
      title: 'Authority Integrity Registry',
      description:
        'A proposed opt-in registry sharing normalised citation fingerprints and verified citation findings across participating organisations. No customer, complaint or firm-identifying data is intended to leave the firm. Registry matches remain subject to local handler review.',
    },
  ],
  response: [
    {
      number: '9',
      title: 'Response Scaffold',
      description:
        'Structures the Final Response around the identified grievance points and supports respectful correction of inaccurate citations.',
    },
    {
      number: '10',
      title: 'Two-Way Assertion Parity',
      description:
        'Checks the firm\'s draft response against the grievance map. Designed checks include: whether each grievance point is addressed, whether cited authorities are verifiable, whether stated account facts match records, and whether referral-rights wording is present. Produces a proposed Response Coverage Proof. Material issues are flagged for handler review, with reasoned overrides recorded.',
    },
  ],
  evidence: [
    {
      number: '11',
      title: 'Sealed Verification Receipt',
      description:
        'A proposed tamper-evident record containing findings, source versions, timestamps, account-record references, handler overrides and response coverage. Exports are intended to help human reviewers understand the case without specialist software. Does not imply official Ombudsman endorsement or guaranteed acceptance.',
    },
    {
      number: '12',
      title: 'Representative Pattern Analytics',
      description: 'Identifies recurring templates and citation errors across representative submissions.',
    },
    {
      number: '13',
      title: 'Fair Treatment Parity Monitor',
      description:
        'Compares outcomes across observable submission profiles, adjusting for verified merits and using statistical safeguards. Does not attempt to detect AI authorship or guarantee that bias has been eliminated.',
    },
    {
      number: '14',
      title: 'Misconception Insight Feed',
      description:
        'Identifies recurring misunderstandings of rules and rights to help communication teams improve customer materials.',
    },
    {
      number: '15',
      title: 'Agent Intake Gateway',
      description:
        'A planned optional structured submission channel for representatives and consumer AI tools. Provides non-blocking integrity feedback. Submitters can proceed unchanged, and other complaint channels remain available.',
    },
  ],
};

const ROADMAP = [
  { phase: 'Months 0–4', items: 'Core extraction, initial source index and benchmark dataset.' },
  { phase: 'Months 4–12', items: 'Benchmarks, account matching, Two-Way Parity and sealed receipts.' },
  { phase: 'Year 2', items: 'Confirmation Loop, Regime Router, Registry and first API partnership.' },
  { phase: 'Year 3', items: 'Agent Intake Gateway, Parity Monitor and additional sector source packs.' },
  { phase: 'Year 3+', items: 'International localisation and broader analytics.' },
];

export default function PlatformSection({ onRequestPilot }: PlatformSectionProps) {
  const [activeTab, setActiveTab] = useState<keyof typeof CAPABILITIES>('understanding');
  const pilotRef = useRef<HTMLButtonElement>(null);
  const headerRef = useReveal<HTMLDivElement>();
  const contentRef = useReveal<HTMLDivElement>(0.05);

  return (
    <section id="platform" style={{ background: '#F0F7F6' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 lg:py-16">

        {/* Header */}
        <div ref={headerRef} className="reveal mb-8">
          <p className="text-[0.75rem] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: '#0F766E' }}>
            Platform
          </p>
          <div className="flex flex-wrap items-start gap-4 mb-3">
            <h2
              className="text-[2rem] sm:text-[2.375rem] font-bold leading-[1.2]"
              style={{ color: '#0B1220', letterSpacing: '-0.02em' }}
            >
              From incoming assertions to accountable responses
            </h2>
            <span className="badge-dev mt-1">In development</span>
          </div>
          <p className="text-[1.0625rem] leading-[1.7]" style={{ color: '#475569', maxWidth: '580px' }}>
            Explore the planned capabilities connecting complaint understanding, verification,
            response assurance and evidence.
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex flex-wrap gap-1.5 mb-6 p-1.5 rounded-xl w-fit"
          role="tablist"
          aria-label="Platform capability groups"
          style={{ background: 'rgba(15,118,110,0.08)' }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as keyof typeof CAPABILITIES)}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer"
                style={
                  isActive
                    ? { background: '#0F766E', color: 'white', boxShadow: '0 2px 8px rgba(15,118,110,0.35)' }
                    : { color: '#475569', background: 'transparent' }
                }
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(15,118,110,0.08)'; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab panels */}
        <div ref={contentRef} className="reveal">
          {TABS.map((tab) => (
            <div
              key={tab.id}
              id={`tabpanel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              hidden={activeTab !== tab.id}
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {(CAPABILITIES[tab.id as keyof typeof CAPABILITIES] ?? []).map((cap) => (
                  <div
                    key={cap.number}
                    className="rounded-xl p-6 bg-white transition-all duration-200"
                    style={{ border: '1px solid #E9EFF7', boxShadow: '0 1px 4px rgba(11,18,32,0.04)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(11,18,32,0.09)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(11,18,32,0.04)';
                      (e.currentTarget as HTMLElement).style.transform = '';
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                        style={{ background: '#E6F5F1', color: '#0F766E' }}
                      >
                        {cap.number}
                      </span>
                      <div>
                        <h3 className="text-[0.9375rem] font-bold mb-2" style={{ color: '#0B1220' }}>
                          {cap.title}
                        </h3>
                        <p className="text-sm leading-[1.7]" style={{ color: '#64748B' }}>
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Roadmap */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #CBD5E1', background: 'white' }}
        >
          <div className="px-6 sm:px-8 py-4 flex items-center gap-3" style={{ background: '#0B1220' }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <rect x="1" y="2.5" width="13" height="10" rx="1.5" stroke="#5EEAD4" strokeWidth="1.1" />
              <path d="M4.5 1v3M10.5 1v3" stroke="#5EEAD4" strokeWidth="1.1" strokeLinecap="round" />
              <path d="M1 6.5h13" stroke="#5EEAD4" strokeWidth="1.1" />
            </svg>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em]" style={{ color: '#5EEAD4' }}>
              Planned rollout — indicative phases, not confirmed release dates
            </p>
          </div>
          <div className="p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {ROADMAP.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4"
                  style={{ background: '#F7F9FC', border: '1px solid #E9EFF7' }}
                >
                  <p className="text-xs font-bold mb-2" style={{ color: '#0F766E' }}>{item.phase}</p>
                  <p className="text-[0.8125rem] leading-[1.6]" style={{ color: '#475569' }}>{item.items}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <button
            ref={pilotRef}
            onClick={() => onRequestPilot(pilotRef.current)}
            className="px-8 py-3 font-semibold text-white rounded-lg cursor-pointer transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #0F766E 0%, #0d6560 100%)',
              boxShadow: '0 4px 16px rgba(15,118,110,0.35)',
              fontSize: '0.9375rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,118,110,0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,118,110,0.35)';
            }}
          >
            Request a Pilot
          </button>
        </div>

      </div>
    </section>
  );
}

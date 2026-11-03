import { useState, useRef } from 'react';

interface PlatformSectionProps {
  onRequestPilot: (trigger?: HTMLElement | null) => void;
}

const TABS = [
  { id: 'understanding', label: 'Complaint Understanding' },
  { id: 'verification', label: 'Source & Account Verification' },
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
      title: 'Sealed Verification Receipt and Ombudsman-Ready Bundle',
      description:
        'A proposed tamper-evident record containing findings, source versions, timestamps, account-record references, handler overrides and response coverage. Exports are intended to help human reviewers understand the case without specialist software. This does not imply official Ombudsman endorsement or guaranteed acceptance.',
    },
    {
      number: '12',
      title: 'Representative Pattern Analytics',
      description:
        'Identifies recurring templates and citation errors across representative submissions.',
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
  { phase: 'Months 0–4', description: 'Core extraction, initial source index and benchmark dataset.' },
  { phase: 'Months 4–12', description: 'Benchmarks, account matching, Two-Way Parity and sealed receipts.' },
  { phase: 'Year 2', description: 'Confirmation Loop, Regime Router, Registry and first API partnership.' },
  { phase: 'Year 3', description: 'Agent Intake Gateway, Parity Monitor and additional sector source packs.' },
  { phase: 'Year 3 onward', description: 'International localisation and broader analytics.' },
];

export default function PlatformSection({ onRequestPilot }: PlatformSectionProps) {
  const [activeTab, setActiveTab] = useState<keyof typeof CAPABILITIES>('understanding');
  const pilotRef = useRef<HTMLButtonElement>(null);

  return (
    <section id="platform" style={{ background: '#E6F5F1' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 lg:py-28">
        {/* Header */}
        <div className="max-w-3xl mb-4">
          <p className="text-sm font-semibold tracking-wide uppercase mb-3" style={{ color: '#0F766E' }}>
            Platform
          </p>
          <div className="flex flex-wrap items-start gap-4 mb-4">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: '#0B1220' }}>
              From incoming assertions to accountable responses
            </h2>
            <span
              className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(197,154,69,0.15)', color: '#C59A45', border: '1px solid rgba(197,154,69,0.4)' }}
            >
              Planned platform — in development
            </span>
          </div>
          <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
            Explore the planned capabilities connecting complaint understanding, verification,
            response assurance and evidence.
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex flex-wrap gap-2 mb-8 p-1 rounded-xl w-fit"
          role="tablist"
          aria-label="Platform capability groups"
          style={{ background: 'rgba(15,118,110,0.08)' }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as keyof typeof CAPABILITIES)}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer"
              style={
                activeTab === tab.id
                  ? { background: '#0F766E', color: 'white' }
                  : { color: '#475569', background: 'transparent' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        {TABS.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
          >
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {(CAPABILITIES[tab.id as keyof typeof CAPABILITIES] ?? []).map((cap) => (
                <div
                  key={cap.number}
                  className="rounded-xl p-6 bg-white"
                  style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{ background: '#E6F5F1', color: '#0F766E' }}
                    >
                      {cap.number}
                    </span>
                    <div>
                      <h3 className="text-base font-bold mb-2" style={{ color: '#0B1220' }}>
                        {cap.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                        {cap.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Planned rollout */}
        <div
          className="rounded-2xl overflow-hidden mt-8"
          style={{ border: '1px solid #CBD5E1', background: 'white' }}
        >
          <div
            className="px-6 py-4 border-b flex items-center gap-3"
            style={{ borderColor: '#E2E8F0', background: '#0B1220' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1" y="3" width="14" height="11" rx="1.5" stroke="#5EEAD4" strokeWidth="1.2"/>
              <path d="M5 1v4M11 1v4" stroke="#5EEAD4" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M1 7h14" stroke="#5EEAD4" strokeWidth="1.2"/>
            </svg>
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#5EEAD4' }}>
              Planned rollout — indicative phases, not confirmed release dates
            </p>
          </div>
          <div className="p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ROADMAP.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-4 rounded-lg"
                  style={{ background: '#F7F9FC', border: '1px solid #E2E8F0' }}
                >
                  <div
                    className="shrink-0 mt-0.5 w-2 h-2 rounded-full"
                    style={{ background: '#0F766E' }}
                  />
                  <div>
                    <p className="text-xs font-bold mb-1" style={{ color: '#0F766E' }}>
                      {item.phase}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            ref={pilotRef}
            onClick={() => onRequestPilot(pilotRef.current)}
            className="px-8 py-3 font-semibold text-white rounded-lg transition-all duration-150 cursor-pointer"
            style={{ background: '#0F766E' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#0d6560')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#0F766E')}
          >
            Request a Pilot
          </button>
        </div>
      </div>
    </section>
  );
}

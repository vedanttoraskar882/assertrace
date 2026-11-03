const STEPS = [
  {
    number: '1',
    title: 'Receive',
    description:
      'A proposed intake layer accepts letters, emails, portal submissions, representative bundles and structured submissions. Scanned documents would use OCR.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 10l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Understand',
    description:
      'Extract assertions, citations, requested remedies and support cues. Distil the grievance and offer the customer an optional opportunity to confirm or correct it.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 9v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Verify',
    description:
      'Check authorities against date-relevant sources, consult Registry findings, compare factual claims with account records and flag applicable processes and deadlines.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4L23 8V14C23 19.5 18.5 23.5 14 24C9.5 23.5 5 19.5 5 14V8L14 4Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 14l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '4',
    title: 'Review',
    description:
      'The handler reviews material findings, investigates unresolved points and records reasons for overrides. Human decision-making is central.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M17.5 17.5L23 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '5',
    title: 'Check the response',
    description:
      'Prepare a response using the scaffold, then check coverage, cited sources and account facts through Two-Way Assertion Parity.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="5" y="4" width="18" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 10h10M9 14h10M9 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '6',
    title: 'Preserve the evidence',
    description:
      'Seal the verification record, retain the human-approved response and prepare an exportable bundle if the case is referred.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4L23 8V14C23 19.5 18.5 23.5 14 24C9.5 23.5 5 19.5 5 14V8L14 4Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 14l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{ background: 'white' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 lg:py-28">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-semibold tracking-wide uppercase mb-3" style={{ color: '#0F766E' }}>
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0B1220' }}>
            A clear path from complaint to verified response
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
            The proposed six-step workflow connects intake, understanding, verification, review,
            response checking and evidence preservation.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {STEPS.map((step, i) => (
            <div key={i} className="relative">
              <div
                className="rounded-xl p-6 h-full"
                style={{
                  background: '#F7F9FC',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  {/* Step number + icon */}
                  <div className="shrink-0 flex flex-col items-center gap-1">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: '#0B1220', color: '#5EEAD4' }}
                    >
                      {step.icon}
                    </div>
                    <span
                      className="text-xs font-bold"
                      style={{ color: '#0F766E' }}
                    >
                      Step {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-2" style={{ color: '#0B1220' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
              {/* Connector arrow (desktop only, not last column) */}
              {i < STEPS.length - 1 && (i + 1) % 3 !== 0 && (
                <div
                  className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 items-center"
                  aria-hidden="true"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 12h8M13 8l4 4-4 4" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Illustrative example */}
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: '#E6F5F1', border: '1px solid #A7D9D1' }}
        >
          <div className="flex items-start gap-4">
            <div
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: '#0F766E' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="14" height="14" rx="2" stroke="white" strokeWidth="1.3"/>
                <path d="M7 7h6M7 10h6M7 13h4" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <p className="text-base font-bold" style={{ color: '#0B1220' }}>
                  Illustrative example
                </p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(197,154,69,0.15)', color: '#C59A45', border: '1px solid rgba(197,154,69,0.4)' }}
                >
                  Simulated scenario
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                A complaint raises concerns about a settlement figure, an end-of-contract charge and
                a missed callback. The planned workflow separates these points, checks supporting
                records, offers customer clarification and flags any point left unanswered in the
                draft response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

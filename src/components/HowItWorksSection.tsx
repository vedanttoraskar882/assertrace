import { useReveal } from '../hooks/useReveal';

const STEPS = [
  {
    number: '01',
    title: 'Receive',
    description:
      'A proposed intake layer accepts letters, emails, portal submissions, representative bundles and structured submissions. Scanned documents would use OCR.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 9l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Understand',
    description:
      'Extract assertions, citations, requested remedies and support cues. Distil the grievance and offer the customer an optional opportunity to confirm or correct it.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Verify',
    description:
      'Check authorities against date-relevant sources, consult Registry findings, compare factual claims with account records and flag applicable processes and deadlines.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3L21 7V13C21 17.97 17 21.96 12 22.5C7 21.96 3 17.97 3 13V7L12 3Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 12l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Review',
    description:
      'The handler reviews material findings, investigates unresolved points and records reasons for overrides. Human decision-making is central.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8.5 11h5M11 8.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Check the response',
    description:
      'Prepare a response using the scaffold, then check coverage, cited sources and account facts through Two-Way Assertion Parity.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Preserve the evidence',
    description:
      'Seal the verification record, retain the human-approved response and prepare an exportable bundle if the case is referred.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3L21 7V13C21 17.97 17 21.96 12 22.5C7 21.96 3 17.97 3 13V7L12 3Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 12l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  const headerRef = useReveal<HTMLDivElement>();
  const stepsRef = useReveal<HTMLDivElement>(0.05);
  const exampleRef = useReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" style={{ background: 'white' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 lg:py-28">

        {/* Header */}
        <div ref={headerRef} className="reveal max-w-[620px] mb-16">
          <p className="text-[0.75rem] font-bold tracking-[0.12em] uppercase mb-4" style={{ color: '#0F766E' }}>
            How It Works
          </p>
          <h2
            className="text-[2rem] sm:text-[2.375rem] font-bold mb-4 leading-[1.2]"
            style={{ color: '#0B1220', letterSpacing: '-0.02em' }}
          >
            A clear path from complaint to verified response
          </h2>
          <p className="text-[1.0625rem] leading-[1.75]" style={{ color: '#475569' }}>
            The proposed six-step workflow connects intake, understanding, verification,
            review, response checking and evidence preservation.
          </p>
        </div>

        {/* Steps grid */}
        <div ref={stepsRef} className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-xl p-6 transition-all duration-200"
              style={{ background: '#F7F9FC', border: '1px solid #E9EFF7' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(11,18,32,0.09)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.background = 'white';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '';
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.background = '#F7F9FC';
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: '#0B1220', color: '#5EEAD4' }}
                >
                  {step.icon}
                </div>
                <span
                  className="text-[0.7rem] font-bold"
                  style={{ color: '#0F766E', letterSpacing: '0.05em' }}
                >
                  Step {step.number}
                </span>
              </div>
              <h3 className="text-[0.9375rem] font-bold mb-2" style={{ color: '#0B1220' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-[1.7]" style={{ color: '#64748B' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Illustrative example */}
        <div
          ref={exampleRef}
          className="reveal rounded-2xl p-6 sm:p-8 flex items-start gap-5"
          style={{ background: '#E6F5F1', border: '1px solid #A7D9D1' }}
        >
          <div
            className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: '#0F766E' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="2.5" y="2.5" width="15" height="15" rx="2" stroke="white" strokeWidth="1.3" />
              <path d="M6 7h8M6 10h8M6 13h5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <p className="text-[0.9375rem] font-bold" style={{ color: '#0B1220' }}>
                Illustrative example
              </p>
              <span
                className="text-[0.65rem] px-2 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(197,154,69,0.15)', color: '#B8861F', border: '1px solid rgba(197,154,69,0.35)' }}
              >
                Simulated scenario
              </span>
            </div>
            <p className="text-sm leading-[1.75]" style={{ color: '#475569' }}>
              A complaint raises concerns about a settlement figure, an end-of-contract charge and
              a missed callback. The planned workflow separates these points, checks supporting
              records, offers customer clarification and flags any point left unanswered in the
              draft response.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

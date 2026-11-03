import { useReveal } from '../hooks/useReveal';

const EXPERIENCE_ITEMS = [
  'Customer Resolutions / Complaints Advisor at Arvato Connect',
  'Experience supporting Volkswagen Financial Services',
  'Investigations across PCP, Hire Purchase and lease agreements',
  'End-of-contract disputes and Final Response preparation',
  'Support for vulnerable customers and complex cases',
  'Proficient with account histories, SAP and Salesforce',
  'Background in recruitment and talent acquisition',
];

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
      <circle cx="7.5" cy="7.5" r="6.5" stroke="#0F766E" strokeWidth="1.2" />
      <path d="M5 7.5L6.8 9.3L10.5 6" stroke="#0F766E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutSection() {
  const headerRef = useReveal<HTMLDivElement>();
  const founderRef = useReveal<HTMLDivElement>();

  return (
    <section id="about" style={{ background: '#F7F9FC' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12 lg:py-16">

        {/* ── Section header ── */}
        <div ref={headerRef} className="reveal max-w-[680px] mb-8">
          <p className="text-[0.75rem] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: '#0F766E' }}>
            About
          </p>
          <h2
            className="text-[2rem] sm:text-[2.375rem] font-bold mb-4 leading-[1.2]"
            style={{ color: '#0B1220', letterSpacing: '-0.02em' }}
          >
            Built around the realities of complaint handling
          </h2>
          <p className="text-[1.0625rem] leading-[1.7] mb-4" style={{ color: '#475569' }}>
            Complaint submissions can combine genuine concerns with repeated assertions, incorrect
            citations and unsupported interpretations. Handlers must identify the actual grievance,
            check the evidence and prepare a complete response. AssertTrace is designed to make
            that work more structured and traceable.
          </p>
          <p className="text-[1.0625rem] leading-[1.7]" style={{ color: '#475569' }}>
            AssertTrace connects the incoming complaint, the supporting evidence and the outgoing
            response in one proposed verification workflow, helping teams keep the customer's
            concerns at the centre of the investigation.
          </p>
        </div>

        {/* ── Founder card — no avatar ── */}
        <div
          ref={founderRef}
          className="reveal rounded-2xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(11,18,32,0.06)' }}
        >
          {/* Card header bar */}
          <div
            className="px-6 sm:px-8 py-4 flex items-center gap-3"
            style={{ background: '#0B1220' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="5.5" r="2.5" stroke="#5EEAD4" strokeWidth="1.2" />
              <path d="M3 13.5c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#5EEAD4" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em]" style={{ color: '#5EEAD4' }}>
              Founder
            </p>
          </div>

          {/* Card body */}
          <div className="p-6 sm:p-8 bg-white">
            {/* Name & role row */}
            <div className="mb-5">
              <h3
                className="text-[1.25rem] font-bold mb-1"
                style={{ color: '#0B1220', letterSpacing: '-0.01em' }}
              >
                Shravya Mekkini
              </h3>
              <p className="text-sm font-semibold" style={{ color: '#0F766E' }}>
                Founder, AssertTrace
              </p>
            </div>

            {/* Bio */}
            <p className="text-[1rem] leading-[1.8] mb-7" style={{ color: '#475569', maxWidth: '680px' }}>
              Shravya Mekkini brings practical experience in motor finance complaint handling,
              including investigations, end-of-contract disputes and Final Response preparation.
              Her background combines customer resolutions, support for vulnerable customers,
              a Computer Science engineering degree and an MSc in Human Resource Management.
            </p>

            {/* Experience */}
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-4" style={{ color: '#94A3B8' }}>
                Professional experience
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5" role="list">
                {EXPERIENCE_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#475569' }}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

const PRINCIPLES = [
  {
    number: '01',
    title: 'Grievance first',
    description:
      "The customer's actual concerns drive the investigation. All extraction, verification and response work is anchored to those concerns.",
  },
  {
    number: '02',
    title: 'Source-linked findings',
    description:
      'Every verification result carries a reference to the source consulted, the version checked and the date of review.',
  },
  {
    number: '03',
    title: 'Human decision-making',
    description:
      'Complaint handlers remain responsible for every decision. Material findings require review, and overrides are recorded with reasons.',
  },
  {
    number: '04',
    title: 'Evidence that travels with the case',
    description:
      'A proposed sealed verification record follows the case from intake to Final Response and into any referral bundle.',
  },
];

const EXPERIENCE_ITEMS = [
  'Customer Resolutions / Complaints Advisor at Arvato Connect',
  'Experience supporting Volkswagen Financial Services',
  'Investigations across PCP, Hire Purchase and lease agreements',
  'End-of-contract disputes and Final Response preparation',
  'Support for vulnerable customers and complex cases',
  'Proficient with account histories, SAP and Salesforce',
  'Background in recruitment and talent acquisition',
];

export default function AboutSection() {
  return (
    <section id="about" style={{ background: '#F7F9FC' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 lg:py-28">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-semibold tracking-wide uppercase mb-3" style={{ color: '#0F766E' }}>
            About
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#0B1220' }}>
            Built around the realities of complaint handling
          </h2>
          <p className="text-lg leading-relaxed mb-6" style={{ color: '#475569' }}>
            Complaint submissions can combine genuine concerns with repeated assertions, incorrect
            citations and unsupported interpretations. Handlers must identify the actual grievance,
            check the evidence and prepare a complete response. AssertTrace is designed to make
            that work more structured and traceable.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
            AssertTrace connects the incoming complaint, the supporting evidence and the outgoing
            response in one proposed verification workflow, helping teams keep the customer's
            concerns at the centre of the investigation.
          </p>
        </div>

        {/* Design principles */}
        <div className="mb-20">
          <h3 className="text-xl font-bold mb-8" style={{ color: '#0B1220' }}>
            Design principles
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPLES.map((p) => (
              <div
                key={p.number}
                className="rounded-xl p-6"
                style={{ background: 'white', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              >
                <div
                  className="text-xs font-bold tracking-widest mb-3 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: '#E6F5F1', color: '#0F766E' }}
                >
                  {p.number}
                </div>
                <h4 className="text-base font-bold mb-2" style={{ color: '#0B1220' }}>
                  {p.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
        >
          <div
            className="px-6 py-4 border-b"
            style={{ background: '#0B1220', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#5EEAD4' }}>
              Founder
            </p>
          </div>
          <div className="p-6 sm:p-8 bg-white">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              {/* Avatar */}
              <div className="shrink-0">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #0F766E 0%, #0B1220 100%)' }}
                  aria-label="Initials avatar for Shravya Mekkini"
                >
                  SM
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1" style={{ color: '#0B1220' }}>
                  Shravya Mekkini
                </h3>
                <p className="text-sm font-semibold mb-4" style={{ color: '#0F766E' }}>
                  Founder, AssertTrace
                </p>
                <p className="text-base leading-relaxed mb-6" style={{ color: '#475569' }}>
                  Shravya Mekkini brings practical experience in motor finance complaint handling,
                  including investigations, end-of-contract disputes and Final Response preparation.
                  Her background combines customer resolutions, support for vulnerable customers,
                  a Computer Science engineering degree and an MSc in Human Resource Management.
                </p>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#64748B' }}>
                    Professional experience
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2" role="list">
                    {EXPERIENCE_ITEMS.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#475569' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
                          <circle cx="8" cy="8" r="6" stroke="#0F766E" strokeWidth="1.2"/>
                          <path d="M5.5 8L7 9.5L10.5 6.5" stroke="#0F766E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

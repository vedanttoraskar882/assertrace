import { useRef } from 'react';

interface MarketPricingSectionProps {
  onRequestPilot: (trigger?: HTMLElement | null) => void;
}

const MAIN_PLANS = [
  {
    name: 'Retrospective Benchmark',
    price: '£3,000–£8,000',
    billing: 'Fixed fee',
    description: 'An initial assessment using a historical complaint sample.',
    features: [
      'Review of citation findings',
      'Identification of genuine grievance points',
      'Comparison with points addressed in existing Final Responses',
      'Retrospective response coverage assessment',
      'Estimate of potential handler time savings',
    ],
  },
  {
    name: 'Team Subscription',
    price: '£750–£3,000',
    billing: 'Per month, by volume band',
    description: 'A team-level verification subscription with core capabilities.',
    features: [
      'Verification allowance',
      'Two-Way Assertion Parity',
      'Grievance Confirmation Loop',
      'Verification receipts',
    ],
  },
  {
    name: 'Enterprise Licence',
    price: '£40,000–£120,000',
    billing: 'Per year',
    description: 'For larger lenders and outsourced complaint providers.',
    features: [
      'Point-in-Time Regime Router',
      'Fair Treatment Parity Monitor',
      'Misconception Insight Feed',
      'Multi-client setup',
      'Registry membership included',
    ],
  },
];

const ADDITIONAL_OPTIONS = [
  {
    name: 'Per-Submission Verification',
    price: '£1.50–£4.00',
    unit: 'per submission',
    note: 'Includes extraction, citation resolution, account matching and assertion map.',
  },
  {
    name: 'Registry Membership',
    price: '£6,000–£15,000',
    unit: 'per year',
    note: 'Included in Enterprise; separately available to platforms and smaller firms. Founding-member discounts are envisaged.',
  },
  {
    name: 'Platform API Licence',
    price: 'Pricing on enquiry',
    unit: 'annual licence plus usage',
    note: '',
  },
  {
    name: 'Agent Intake Gateway',
    price: 'Free to submitters',
    unit: '£0.50–£1.00 per structured submission for receiving firms',
    note: 'Submitters pay nothing. Receiving firms pay per structured submission received.',
  },
  {
    name: 'Sector Source Packs',
    price: 'Pricing on enquiry',
    unit: 'annual add-on',
    note: 'Planned sectors: pensions, energy, telecoms and public sector.',
  },
];

const TARGET_MARKETS = [
  {
    priority: 'Primary focus',
    markets: ['UK motor finance lenders', 'Consumer credit lenders', 'Outsourced complaint-handling providers'],
    color: '#0F766E',
    bg: '#E6F5F1',
  },
  {
    priority: 'Also designed for',
    markets: ['Banks, insurers and payment firms', 'Complaint-management platforms (embedded verification)'],
    color: '#475569',
    bg: '#F1F5F9',
  },
  {
    priority: 'Future expansion',
    markets: ['Pensions providers', 'Utilities and energy', 'Telecoms', 'Public bodies'],
    color: '#C59A45',
    bg: '#FEF9EE',
  },
];

const TYPICAL_BUYERS = [
  'Heads of complaints',
  'Complaint quality leads',
  'Complaint handlers and team leaders',
  'QA analysts',
  'Consumer Duty champions',
  'Compliance and legal teams',
];

export default function MarketPricingSection({ onRequestPilot }: MarketPricingSectionProps) {
  const pilotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <section id="market-pricing" style={{ background: '#F7F9FC' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 lg:py-28">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-semibold tracking-wide uppercase mb-3" style={{ color: '#0F766E' }}>
            Market &amp; Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#0B1220' }}>
            Who AssertTrace is designed for
          </h2>
        </div>

        {/* Target market */}
        <div className="mb-20">
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {TARGET_MARKETS.map((tm) => (
              <div
                key={tm.priority}
                className="rounded-xl p-5"
                style={{ background: tm.bg, border: `1px solid ${tm.color}44` }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: tm.color }}>
                  {tm.priority}
                </p>
                <ul className="flex flex-col gap-1.5" role="list">
                  {tm.markets.map((m) => (
                    <li key={m} className="text-sm font-medium flex items-start gap-2" style={{ color: '#0B1220' }}>
                      <span aria-hidden="true" className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: tm.color }}/>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Typical buyers */}
          <div
            className="rounded-xl p-6 bg-white"
            style={{ border: '1px solid #E2E8F0' }}
          >
            <p className="text-sm font-bold mb-4" style={{ color: '#0B1220' }}>
              Typical buyers and users
            </p>
            <div className="flex flex-wrap gap-2">
              {TYPICAL_BUYERS.map((b) => (
                <span
                  key={b}
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{ background: '#E6F5F1', color: '#0F766E' }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#0B1220' }}>
            Indicative commercial options
          </h2>
          <div
            className="rounded-xl px-5 py-4 flex items-start gap-3"
            style={{ background: 'rgba(197,154,69,0.10)', border: '1px solid rgba(197,154,69,0.35)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
              <circle cx="9" cy="9" r="7.5" stroke="#C59A45" strokeWidth="1.2"/>
              <path d="M9 8v4M9 6h.01" stroke="#C59A45" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <p className="text-sm leading-relaxed" style={{ color: '#92711C' }}>
              <strong>All prices are indicative planning assumptions</strong> and will be validated
              during the benchmark phase. Feature availability follows the development roadmap.
            </p>
          </div>
        </div>

        {/* Main pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {MAIN_PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className="rounded-2xl bg-white flex flex-col"
              style={{ border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
            >
              <div className="p-6 border-b" style={{ borderColor: '#F1F5F9' }}>
                <p className="text-sm font-semibold mb-1" style={{ color: '#0F766E' }}>
                  {plan.name}
                </p>
                <p className="text-3xl font-bold mb-1" style={{ color: '#0B1220' }}>
                  {plan.price}
                </p>
                <p className="text-xs" style={{ color: '#64748B' }}>
                  {plan.billing}
                </p>
              </div>
              <div className="p-6 flex-1">
                <p className="text-sm mb-4" style={{ color: '#475569' }}>
                  {plan.description}
                </p>
                <ul className="flex flex-col gap-2.5" role="list">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#475569' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
                        <circle cx="8" cy="8" r="6" stroke="#0F766E" strokeWidth="1.2"/>
                        <path d="M5.5 8L7 9.5L10.5 6.5" stroke="#0F766E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 pb-6">
                <button
                  ref={(el) => { pilotRefs.current[i] = el; }}
                  onClick={() => onRequestPilot(pilotRefs.current[i])}
                  className="w-full py-3 text-sm font-semibold rounded-lg text-white cursor-pointer transition-all duration-150"
                  style={{ background: '#0F766E' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#0d6560')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#0F766E')}
                >
                  Request a Pilot
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional pricing table */}
        <div>
          <h3 className="text-lg font-bold mb-5" style={{ color: '#0B1220' }}>
            Additional pricing options
          </h3>
          <div
            className="rounded-2xl bg-white overflow-hidden"
            style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: '#0B1220' }}>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                      Option
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                      Basis
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-widest hidden sm:table-cell" style={{ color: '#94A3B8' }}>
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ADDITIONAL_OPTIONS.map((opt, i) => (
                    <tr
                      key={opt.name}
                      style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : undefined }}
                    >
                      <td className="px-6 py-4 font-medium" style={{ color: '#0B1220' }}>
                        {opt.name}
                      </td>
                      <td className="px-6 py-4 font-bold" style={{ color: '#0F766E', whiteSpace: 'nowrap' }}>
                        {opt.price}
                      </td>
                      <td className="px-6 py-4" style={{ color: '#475569' }}>
                        {opt.unit}
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell text-xs" style={{ color: '#64748B' }}>
                        {opt.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

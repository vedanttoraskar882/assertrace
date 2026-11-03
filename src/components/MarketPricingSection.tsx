import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

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
    featured: true,
  },
];

const ADDITIONAL_OPTIONS = [
  { name: 'Per-Submission Verification', price: '£1.50–£4.00', unit: 'per submission', note: 'Includes extraction, citation resolution, account matching and assertion map.' },
  { name: 'Registry Membership', price: '£6,000–£15,000', unit: 'per year', note: 'Included in Enterprise; separately available to platforms and smaller firms. Founding-member discounts are envisaged.' },
  { name: 'Platform API Licence', price: 'Pricing on enquiry', unit: 'annual licence plus usage', note: '' },
  { name: 'Agent Intake Gateway', price: 'Free to submitters', unit: '£0.50–£1.00 per structured submission for receiving firms', note: 'Submitters pay nothing. Receiving firms pay per structured submission received.' },
  { name: 'Sector Source Packs', price: 'Pricing on enquiry', unit: 'annual add-on', note: 'Planned sectors: pensions, energy, telecoms and public sector.' },
];

const TARGET_MARKETS = [
  { priority: 'Primary focus', markets: ['UK motor finance lenders', 'Consumer credit lenders', 'Outsourced complaint-handling providers'], color: '#0F766E', bg: '#E6F5F1', borderColor: 'rgba(15,118,110,0.25)' },
  { priority: 'Also designed for', markets: ['Banks, insurers and payment firms', 'Complaint-management platforms (embedded verification)'], color: '#475569', bg: '#F1F5F9', borderColor: '#E2E8F0' },
  { priority: 'Future expansion', markets: ['Pensions providers', 'Utilities and energy', 'Telecoms', 'Public bodies'], color: '#C59A45', bg: '#FFFBF0', borderColor: 'rgba(197,154,69,0.25)' },
];

const TYPICAL_BUYERS = [
  'Heads of complaints', 'Complaint quality leads', 'Complaint handlers and team leaders',
  'QA analysts', 'Consumer Duty champions', 'Compliance and legal teams',
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
      <circle cx="7.5" cy="7.5" r="6.5" stroke={color} strokeWidth="1.2" />
      <path d="M5 7.5L6.8 9.3L10.5 6" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MarketPricingSection({ onRequestPilot }: MarketPricingSectionProps) {
  const pilotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const headerRef = useReveal<HTMLDivElement>();
  const marketRef = useReveal<HTMLDivElement>(0.05);
  const pricingRef = useReveal<HTMLDivElement>(0.05);

  return (
    <section id="market-pricing" style={{ background: '#F7F9FC' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 lg:py-28">

        {/* Header */}
        <div ref={headerRef} className="reveal max-w-[640px] mb-14">
          <p className="text-[0.75rem] font-bold tracking-[0.12em] uppercase mb-4" style={{ color: '#0F766E' }}>
            Market &amp; Pricing
          </p>
          <h2
            className="text-[2rem] sm:text-[2.375rem] font-bold leading-[1.2]"
            style={{ color: '#0B1220', letterSpacing: '-0.02em' }}
          >
            Who AssertTrace is designed for
          </h2>
        </div>

        {/* Target market */}
        <div ref={marketRef} className="reveal mb-20">
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {TARGET_MARKETS.map((tm) => (
              <div
                key={tm.priority}
                className="rounded-xl p-5"
                style={{ background: tm.bg, border: `1px solid ${tm.borderColor}` }}
              >
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em] mb-3" style={{ color: tm.color }}>
                  {tm.priority}
                </p>
                <ul className="flex flex-col gap-2" role="list">
                  {tm.markets.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm font-medium" style={{ color: '#0B1220' }}>
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        aria-hidden="true"
                        style={{ background: tm.color }}
                      />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 bg-white" style={{ border: '1px solid #E9EFF7' }}>
            <p className="text-sm font-semibold mb-3.5" style={{ color: '#0B1220' }}>
              Typical buyers and users
            </p>
            <div className="flex flex-wrap gap-2">
              {TYPICAL_BUYERS.map((b) => (
                <span
                  key={b}
                  className="text-[0.8125rem] font-medium px-3 py-1.5 rounded-full"
                  style={{ background: '#E6F5F1', color: '#0F766E' }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing header */}
        <div ref={pricingRef} className="reveal mb-8">
          <h2
            className="text-[1.625rem] sm:text-[2rem] font-bold mb-5"
            style={{ color: '#0B1220', letterSpacing: '-0.02em' }}
          >
            Indicative commercial options
          </h2>
          <div
            className="rounded-xl px-5 py-4 flex items-start gap-3"
            style={{ background: 'rgba(197,154,69,0.08)', border: '1px solid rgba(197,154,69,0.3)' }}
          >
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
              <circle cx="8.5" cy="8.5" r="7" stroke="#C59A45" strokeWidth="1.2" />
              <path d="M8.5 7.5v4M8.5 5.5h.01" stroke="#C59A45" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <p className="text-sm leading-[1.65]" style={{ color: '#8B6914' }}>
              <strong>All prices are indicative planning assumptions</strong> and will be validated
              during the benchmark phase. Feature availability follows the development roadmap.
            </p>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {MAIN_PLANS.map((plan, i) => (
            <div
              key={plan.name}
              className="rounded-2xl flex flex-col transition-all duration-200"
              style={{
                border: plan.featured ? '1px solid #0F766E' : '1px solid #E9EFF7',
                background: plan.featured
                  ? 'linear-gradient(160deg, #0B1220 0%, #0F2A28 100%)'
                  : 'white',
                boxShadow: plan.featured
                  ? '0 8px 40px rgba(15,118,110,0.2), 0 2px 8px rgba(11,18,32,0.1)'
                  : '0 1px 4px rgba(11,18,32,0.04)',
              }}
              onMouseEnter={(e) => {
                if (!plan.featured) {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(11,18,32,0.10)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!plan.featured) {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(11,18,32,0.04)';
                  (e.currentTarget as HTMLElement).style.transform = '';
                }
              }}
            >
              <div
                className="p-6 border-b"
                style={{ borderColor: plan.featured ? 'rgba(255,255,255,0.1)' : '#F1F5F9' }}
              >
                <p
                  className="text-[0.8125rem] font-semibold mb-2"
                  style={{ color: plan.featured ? '#5EEAD4' : '#0F766E' }}
                >
                  {plan.name}
                </p>
                <p
                  className="text-[1.875rem] font-bold mb-1"
                  style={{ color: plan.featured ? '#F7F9FC' : '#0B1220', letterSpacing: '-0.02em' }}
                >
                  {plan.price}
                </p>
                <p className="text-xs" style={{ color: plan.featured ? '#64748B' : '#94A3B8' }}>
                  {plan.billing}
                </p>
              </div>
              <div className="p-6 flex-1">
                <p className="text-sm mb-4" style={{ color: plan.featured ? '#94A3B8' : '#64748B' }}>
                  {plan.description}
                </p>
                <ul className="flex flex-col gap-2.5" role="list">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: plan.featured ? '#CBD5E1' : '#475569' }}
                    >
                      <CheckIcon color={plan.featured ? '#5EEAD4' : '#0F766E'} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 pb-6">
                <button
                  ref={(el) => { pilotRefs.current[i] = el; }}
                  onClick={() => onRequestPilot(pilotRefs.current[i])}
                  className="w-full py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-200"
                  style={
                    plan.featured
                      ? { background: '#0F766E', color: 'white', boxShadow: '0 2px 8px rgba(15,118,110,0.4)' }
                      : { background: '#F0F7F6', color: '#0F766E', border: '1px solid rgba(15,118,110,0.2)' }
                  }
                  onMouseEnter={(e) => {
                    if (plan.featured) {
                      (e.currentTarget as HTMLElement).style.background = '#0d6560';
                    } else {
                      (e.currentTarget as HTMLElement).style.background = '#E6F5F1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.featured) {
                      (e.currentTarget as HTMLElement).style.background = '#0F766E';
                    } else {
                      (e.currentTarget as HTMLElement).style.background = '#F0F7F6';
                    }
                  }}
                >
                  Request a Pilot
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional options table */}
        <div>
          <h3
            className="text-[1.0625rem] font-bold mb-5"
            style={{ color: '#0B1220', letterSpacing: '-0.01em' }}
          >
            Additional pricing options
          </h3>
          <div
            className="rounded-2xl bg-white overflow-hidden"
            style={{ border: '1px solid #E9EFF7', boxShadow: '0 1px 4px rgba(11,18,32,0.04)' }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr style={{ background: '#0B1220' }}>
                    {['Option', 'Price', 'Basis', 'Notes'].map((h, i) => (
                      <th
                        key={h}
                        className={`px-5 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest ${i === 3 ? 'hidden sm:table-cell' : ''}`}
                        style={{ color: '#64748B' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ADDITIONAL_OPTIONS.map((opt, i) => (
                    <tr
                      key={opt.name}
                      style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : undefined }}
                    >
                      <td className="px-5 py-4 font-semibold text-[0.875rem]" style={{ color: '#0B1220' }}>
                        {opt.name}
                      </td>
                      <td className="px-5 py-4 font-bold text-[0.875rem]" style={{ color: '#0F766E', whiteSpace: 'nowrap' }}>
                        {opt.price}
                      </td>
                      <td className="px-5 py-4 text-[0.8125rem]" style={{ color: '#475569' }}>
                        {opt.unit}
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell text-[0.75rem]" style={{ color: '#94A3B8' }}>
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

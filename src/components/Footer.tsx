import { useRef } from 'react';

interface FooterProps {
  onRequestPilot: (trigger?: HTMLElement | null) => void;
}

const FOOTER_NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Platform', href: '#platform' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Market Pricing', href: '#market-pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Footer({ onRequestPilot }: FooterProps) {
  const pilotRef = useRef<HTMLButtonElement>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.slice(1));
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 68, behavior: 'smooth' });
  };

  return (
    <footer id="footer" style={{ background: '#080f1c' }}>
      {/* Top accent line */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(15,118,110,0.5) 40%, rgba(15,118,110,0.5) 60%, transparent)' }} />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10 lg:py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="mb-3">
              <span
                className="text-[1.375rem] font-bold"
                style={{ color: '#F7F9FC', letterSpacing: '-0.015em' }}
              >
                Assert<span style={{ color: '#5EEAD4' }}>Trace</span>
              </span>
            </div>
            <p className="text-[0.8125rem] font-semibold mb-2" style={{ color: '#5EEAD4' }}>
              Complaint Assertion Integrity Platform
            </p>
            <p className="text-sm leading-[1.7]" style={{ color: '#475569', maxWidth: '300px' }}>
              Designed for fair, complete and traceable complaint handling.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] mb-5" style={{ color: '#334155' }}>
              Navigation
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[0.875rem] no-underline transition-colors duration-150"
                    style={{ color: '#64748B' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#5EEAD4')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] mb-5" style={{ color: '#334155' }}>
              Get started
            </p>
            <p className="text-sm leading-[1.7] mb-5" style={{ color: '#475569' }}>
              Interested in exploring a benchmark or pilot for your organisation?
            </p>
            <button
              ref={pilotRef}
              onClick={() => onRequestPilot(pilotRef.current)}
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg cursor-pointer transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #0F766E 0%, #0d6560 100%)',
                boxShadow: '0 2px 8px rgba(15,118,110,0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,118,110,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(15,118,110,0.35)';
              }}
            >
              Request a Pilot
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <p className="text-[0.8125rem]" style={{ color: '#334155' }}>
            &copy; {new Date().getFullYear()} AssertTrace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

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
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" style={{ background: '#0B1220' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0F766E 0%, #0d1929 100%)' }}
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="text-xl font-bold" style={{ color: '#F7F9FC' }}>
                Assert<span style={{ color: '#5EEAD4' }}>Trace</span>
              </span>
            </div>
            <p className="text-sm font-semibold mb-2" style={{ color: '#5EEAD4' }}>
              Complaint Assertion Integrity Platform
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
              Designed for fair, complete and traceable complaint handling.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#475569' }}>
              Navigation
            </p>
            <ul className="flex flex-col gap-2" role="list">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm no-underline transition-colors duration-150"
                    style={{ color: '#94A3B8' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#5EEAD4')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA + notice */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#475569' }}>
              Get in touch
            </p>
            <p className="text-sm mb-4" style={{ color: '#64748B' }}>
              Interested in exploring a benchmark or pilot for your organisation?
            </p>
            <button
              ref={pilotRef}
              onClick={() => onRequestPilot(pilotRef.current)}
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg cursor-pointer transition-all duration-150"
              style={{ background: '#0F766E' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0d6560')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#0F766E')}
            >
              Request a Pilot
            </button>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <p className="text-xs" style={{ color: '#475569' }}>
            &copy; {new Date().getFullYear()} AssertTrace. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#475569' }}>
            Pilot form entries are stored only in this browser and are not transmitted.
          </p>
        </div>
      </div>
    </footer>
  );
}

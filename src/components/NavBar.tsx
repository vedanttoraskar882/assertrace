import { useState, useRef, useEffect, useCallback } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Platform', href: '#platform' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Market Pricing', href: '#market-pricing' },
  { label: 'FAQ', href: '#faq' },
];

interface NavBarProps {
  onRequestPilot: (trigger?: HTMLElement | null) => void;
}

export default function NavBar({ onRequestPilot }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const desktopPilotRef = useRef<HTMLButtonElement>(null);
  const mobilePilotRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const handleMobilePilot = useCallback(() => {
    setMenuOpen(false);
    onRequestPilot(mobilePilotRef.current);
  }, [onRequestPilot]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100' : 'bg-white/90 backdrop-blur-sm'
      }`}
      style={{ minHeight: '72px' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-[72px]">
        {/* Wordmark */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 no-underline group"
          aria-label="AssertTrace — home"
        >
          <span
            aria-hidden="true"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #0F766E 0%, #0B1220 100%)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
              <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="text-xl font-bold tracking-tight" style={{ color: '#0B1220' }}>
            Assert<span style={{ color: '#0F766E' }}>Trace</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 no-underline"
              style={{ color: '#475569' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0F766E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
            >
              {link.label}
            </a>
          ))}
          <button
            ref={desktopPilotRef}
            onClick={() => onRequestPilot(desktopPilotRef.current)}
            className="ml-4 px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all duration-150 cursor-pointer"
            style={{ background: '#0F766E' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#0d6560')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#0F766E')}
          >
            Request a Pilot
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          className="lg:hidden p-2 rounded-md cursor-pointer"
          style={{ color: '#0B1220' }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="lg:hidden border-t border-slate-100 bg-white/98 backdrop-blur-sm"
        >
          <nav className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-3 text-sm font-medium rounded-md no-underline"
                style={{ color: '#475569' }}
              >
                {link.label}
              </a>
            ))}
            <button
              ref={mobilePilotRef}
              onClick={handleMobilePilot}
              className="mt-3 px-5 py-3 text-sm font-semibold text-white rounded-lg cursor-pointer text-left"
              style={{ background: '#0F766E' }}
            >
              Request a Pilot
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

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
  const [activeSection, setActiveSection] = useState('home');
  const toggleRef = useRef<HTMLButtonElement>(null);
  const desktopPilotRef = useRef<HTMLButtonElement>(null);
  const mobilePilotRef = useRef<HTMLButtonElement>(null);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Escape closes mobile menu
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

  const scrollTo = useCallback((href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      scrollTo(href);
    },
    [scrollTo]
  );

  const handleMobilePilot = useCallback(() => {
    setMenuOpen(false);
    onRequestPilot(mobilePilotRef.current);
  }, [onRequestPilot]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-md border-b border-slate-100/80'
          : 'bg-white/85 backdrop-blur-sm'
      }`}
      style={{ minHeight: '68px', boxShadow: scrolled ? '0 1px 24px rgba(11,18,32,0.07)' : 'none' }}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between h-[68px]">
        {/* Wordmark — text only, no icon */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="no-underline flex items-baseline gap-0.5"
          aria-label="AssertTrace — return to home"
        >
          <span
            className="text-[1.25rem] font-bold tracking-tight"
            style={{ color: '#0B1220', letterSpacing: '-0.01em' }}
          >
            Assert
          </span>
          <span
            className="text-[1.25rem] font-bold tracking-tight"
            style={{ color: '#0F766E', letterSpacing: '-0.01em' }}
          >
            Trace
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link"
                style={isActive ? { color: '#0F766E' } : {}}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
          <button
            ref={desktopPilotRef}
            onClick={() => onRequestPilot(desktopPilotRef.current)}
            className="ml-5 px-5 py-2.5 text-sm font-semibold text-white rounded-lg cursor-pointer transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #0F766E 0%, #0d6560 100%)',
              boxShadow: '0 2px 8px rgba(15,118,110,0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,118,110,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(15,118,110,0.35)';
            }}
          >
            Request a Pilot
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-150"
          style={{ color: '#0B1220' }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#F1F5F9')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <g
              style={{
                transition: 'opacity 0.15s',
                opacity: menuOpen ? 0 : 1,
                pointerEvents: menuOpen ? 'none' : 'auto',
              }}
            >
              <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <line x1="3" y1="16" x2="14" y2="16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </g>
            <g
              style={{
                transition: 'opacity 0.15s',
                opacity: menuOpen ? 1 : 0,
                pointerEvents: menuOpen ? 'auto' : 'none',
              }}
            >
              <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </g>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '480px' : '0px',
          opacity: menuOpen ? 1 : 0,
        }}
      >
        <div
          className="border-t"
          style={{ background: 'rgba(255,255,255,0.97)', borderColor: '#F1F5F9' }}
        >
          <nav
            className="max-w-[1200px] mx-auto px-5 py-4 flex flex-col gap-0.5"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-3 text-sm font-medium rounded-lg no-underline transition-colors duration-150"
                  style={{
                    color: isActive ? '#0F766E' : '#475569',
                    background: isActive ? '#E6F5F1' : 'transparent',
                  }}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              ref={mobilePilotRef}
              onClick={handleMobilePilot}
              className="mt-3 px-5 py-3 text-sm font-semibold text-white rounded-lg cursor-pointer text-center"
              style={{ background: 'linear-gradient(135deg, #0F766E 0%, #0d6560 100%)' }}
            >
              Request a Pilot
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

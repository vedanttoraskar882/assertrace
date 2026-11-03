import { useState, useCallback } from 'react';
import NavBar from './components/NavBar';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import PlatformSection from './components/PlatformSection';
import HowItWorksSection from './components/HowItWorksSection';
import MarketPricingSection from './components/MarketPricingSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import PilotModal from './components/PilotModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null);

  const openModal = useCallback((trigger?: HTMLElement | null) => {
    if (trigger) setTriggerRef(trigger);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    // Return focus after next paint
    requestAnimationFrame(() => {
      triggerRef?.focus();
    });
  }, [triggerRef]);

  return (
    <div className="min-h-screen">
      <NavBar onRequestPilot={openModal} />
      <main>
        <HomeSection onRequestPilot={openModal} />
        <AboutSection />
        <PlatformSection onRequestPilot={openModal} />
        <HowItWorksSection />
        <MarketPricingSection onRequestPilot={openModal} />
        <FAQSection />
      </main>
      <Footer onRequestPilot={openModal} />
      {modalOpen && <PilotModal onClose={closeModal} />}
    </div>
  );
}

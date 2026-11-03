import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const FAQS = [
  { question: 'What is AssertTrace?', answer: 'AssertTrace is a proposed complaint assertion integrity platform designed to help regulated firms understand complaint points, verify supporting authorities and account facts, and review the completeness of their responses.' },
  { question: 'Who is it designed for?', answer: 'The initial focus is UK motor finance and consumer credit lenders and outsourced complaint-handling providers, with planned expansion into other regulated sectors.' },
  { question: 'Does AssertTrace replace our complaint-management system?', answer: 'It is designed to work alongside existing systems as a verification and assurance layer. API access and read-only integrations are part of the proposed architecture.' },
  { question: 'Does it detect whether a customer used AI?', answer: 'No. The proposed platform checks the substance of assertions and citations. AI use is not treated as a negative credibility signal.' },
  { question: 'Who makes the complaint decision?', answer: 'The human complaint handler remains responsible. Material findings require review, and overrides are recorded with reasons.' },
  { question: 'What if a citation cannot be found?', answer: "The proposed platform records the result explicitly for review. A missing or incorrect citation does not remove the need to investigate the customer's underlying concern." },
  { question: 'Must the customer confirm the grievance summary?', answer: 'No. Confirmation is optional. The firm continues investigating if the customer does not respond.' },
  { question: 'How is customer data intended to be handled?', answer: 'The planned design includes data minimisation, read-only integrations, no customer-data training of shared models and citation-fingerprint-only Registry sharing. UK-hosted deployment and an own-cloud-tenancy option are proposed. These describe the planned product architecture.' },
  { question: 'Are all features available now?', answer: 'The platform describes a phased development roadmap. Feature availability and pilot scope need to be confirmed during discussions.' },
  { question: 'How much does it cost?', answer: 'The proposed commercial options include a £3,000–£8,000 retrospective benchmark, team subscriptions of £750–£3,000 per month and enterprise licences of £40,000–£120,000 per year, with additional usage and licensing options. All prices are indicative.' },
  { question: 'Is the Agent Intake Gateway free?', answer: 'The planned gateway is free for submitters. Receiving firms would pay £0.50–£1.00 per structured submission.' },
  { question: 'What happens when I submit the pilot form on this website?', answer: "This frontend demonstration saves the entered details only in this browser's local storage. It does not send them to AssertTrace, book a pilot or trigger an email. Clearing browser storage can remove saved entries." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headerRef = useReveal<HTMLDivElement>();
  const listRef = useReveal<HTMLDivElement>(0.05);

  return (
    <section id="faq" style={{ background: '#F0F7F6' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 lg:py-28">

        <div ref={headerRef} className="reveal max-w-[580px] mb-12">
          <p className="text-[0.75rem] font-bold tracking-[0.12em] uppercase mb-4" style={{ color: '#0F766E' }}>
            FAQ
          </p>
          <h2
            className="text-[2rem] sm:text-[2.375rem] font-bold leading-[1.2]"
            style={{ color: '#0B1220', letterSpacing: '-0.02em' }}
          >
            Frequently asked questions
          </h2>
        </div>

        <div ref={listRef} className="reveal max-w-[760px]">
          <dl className="flex flex-col gap-2">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    border: isOpen ? '1px solid rgba(15,118,110,0.25)' : '1px solid #E9EFF7',
                    background: isOpen ? 'white' : '#FAFCFF',
                    boxShadow: isOpen ? '0 4px 16px rgba(11,18,32,0.07)' : 'none',
                  }}
                >
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-question-${i}`}
                      className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer gap-4 transition-colors duration-150"
                      style={{ background: 'transparent' }}
                    >
                      <span
                        className="text-[0.9375rem] font-semibold"
                        style={{ color: isOpen ? '#0F766E' : '#0B1220' }}
                      >
                        {faq.question}
                      </span>
                      <span
                        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isOpen ? '#0F766E' : '#E6F5F1',
                          transform: isOpen ? 'rotate(45deg)' : 'none',
                        }}
                        aria-hidden="true"
                      >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path
                            d="M5.5 2v7M2 5.5h7"
                            stroke={isOpen ? 'white' : '#0F766E'}
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </dt>
                  {isOpen && (
                    <dd
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      className="px-5 pb-5"
                    >
                      <div className="mb-3" style={{ height: '1px', background: '#F1F5F9' }} />
                      <p className="text-[0.9rem] leading-[1.75]" style={{ color: '#475569' }}>
                        {faq.answer}
                      </p>
                    </dd>
                  )}
                </div>
              );
            })}
          </dl>
        </div>

      </div>
    </section>
  );
}

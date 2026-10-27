'use client';

import { useState } from 'react';
import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'Brand and business strategy for established companies: positioning, brand architecture, visual identity, naming, messaging, and the digital experiences that carry them, including web, mobile and social.',
  },
  {
    question: "What's your project timeline?",
    answer:
      'Most brand strategy engagements run 8 to 12 weeks. Full repositioning programs, including identity and a new website, typically take 4 to 6 months. We set a detailed timeline after discovery.',
  },
  {
    question: 'How much do you charge?',
    answer:
      'Focused engagements start at $25,000. Comprehensive brand transformations typically run $75,000 to $150,000+. Every proposal is scoped to your goals after an initial conversation.',
  },
  {
    question: 'What industries do you work with?',
    answer:
      'Consumer goods, healthcare and wellness, technology, professional services and hospitality, among others. What our clients share is scale: typically $10M+ in annual revenue and ambitions to grow.',
  },
  {
    question: 'Do you take on small projects?',
    answer:
      'We focus on strategic work that changes a business’s trajectory. A brand audit is often a good, contained starting point if you want to work together before committing to a larger program.',
  },
  {
    question: 'How can I start?',
    answer:
      'Get in touch through the contact page or email hello@chartfoster.co. We’ll schedule a discovery call to understand your business and whether we’re the right fit.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-section border-t border-border">
      <div className="container-x grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <ScrollAnimation>
            <div className="lg:sticky lg:top-28">
              <p className="mono-label flex items-center gap-3 mb-6">
                <span className="text-gold">{'//'}</span>FAQs
              </p>
              <h2 className="text-h2">Questions, answered.</h2>
              <div className="mt-10 border-t border-border-light pt-6">
                <p className="text-muted leading-relaxed mb-6">Still curious? We&apos;re happy to talk it through.</p>
                <Link href="/contact" className="btn-primary">
                  Get in touch <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <ScrollAnimation>
            <ul className="border-t border-border-light">
              {faqs.map((faq, i) => {
                const open = openIndex === i;
                return (
                  <li key={faq.question} className="border-b border-border">
                    <button
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      className="w-full grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 md:py-7 text-left group"
                    >
                      <span className={`mono-label ${open ? '!text-gold' : ''}`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={`text-lg md:text-xl font-semibold tracking-tight transition-colors ${open ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                        {faq.question}
                      </span>
                      <span
                        className={`relative w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                          open ? 'border-gold bg-gold' : 'border-border-light group-hover:border-white'
                        }`}
                        aria-hidden
                      >
                        <span className={`absolute w-3 h-px ${open ? 'bg-primary' : 'bg-white'}`} />
                        <span className={`absolute w-px h-3 transition-transform duration-300 ${open ? 'bg-primary scale-y-0' : 'bg-white'}`} />
                      </span>
                    </button>
                    <div className={`accordion-content ${open ? 'open' : ''}`}>
                      <p className="text-muted leading-relaxed pb-7 pl-16 pr-12 max-w-2xl">{faq.answer}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import SectionLabel from './SectionLabel';
import ScrollAnimation from './ScrollAnimation';

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer comprehensive brand and business strategy consulting including brand strategy & positioning, visual identity design, mobile app development, social media strategy, web development, and digital transformation — all tailored for businesses with $10M+ revenue."
  },
  {
    question: "What's your project timeline?",
    answer: "Timelines vary by scope, but most branding engagements take 8–12 weeks, web development projects 10–16 weeks, and comprehensive brand transformations 4–6 months. We'll provide a detailed timeline during our discovery phase."
  },
  {
    question: "How much do you charge?",
    answer: "Our engagements typically range from $25,000 for focused projects to $150,000+ for comprehensive brand transformations. We customize every proposal based on your specific needs and goals."
  },
  {
    question: "What industries do you work with?",
    answer: "We work across luxury goods, healthcare & wellness, technology, consumer products, financial services, and more. Our sweet spot is small to medium businesses with $10M+ in revenue looking to elevate their brand presence."
  },
  {
    question: "Do you take on small projects?",
    answer: "We focus on strategic engagements that create meaningful impact. While we don't typically take on one-off design tasks, we're happy to discuss how we can help — even a focused brand audit can be a great starting point."
  },
  {
    question: "How can I start?",
    answer: "Simply reach out through our contact page or email us at hello@chartfoster.co. We'll schedule a discovery call to understand your business, goals, and challenges — and determine if we're the right fit."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-section">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
        <ScrollAnimation>
          <SectionLabel text="FAQs" />
        </ScrollAnimation>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mt-8">
          {/* Left column - CTA */}
          <ScrollAnimation>
            <div className="space-y-6">
              <div className="aspect-[4/3] bg-surface-light rounded-card overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-border flex items-center justify-center">
                    <span className="text-3xl">?</span>
                  </div>
                  <p className="text-muted text-lg">Have more questions?</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-lg font-semibold mb-2">Still curious?</p>
                <p className="text-muted mb-6">We&apos;d love to hear from you. Reach out and let&apos;s start a conversation.</p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-white text-primary text-sm font-medium rounded-btn hover:bg-cream transition-colors duration-200"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </ScrollAnimation>

          {/* Right column - Accordion */}
          <ScrollAnimation>
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-border">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className="text-lg font-semibold pr-4 group-hover:text-cream transition-colors">{faq.question}</span>
                    <span className="text-xl text-muted flex-shrink-0 transition-transform duration-300" style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                      +
                    </span>
                  </button>
                  <div className={`accordion-content ${openIndex === i ? 'open' : ''}`}>
                    <p className="text-muted pb-5 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

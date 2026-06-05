'use client';

import { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import ScrollAnimation from '../components/ScrollAnimation';
import FAQ from '../components/FAQ';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  project: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    project: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main>
      {/* Page Header */}
      <section className="pt-32 pb-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <SectionLabel text="Contact" />
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <h1 className="text-h1 mt-4 max-w-3xl">
              Have a bold idea? We&apos;d love to hear it. Let&apos;s build something iconic together.
            </h1>
          </ScrollAnimation>
        </div>
      </section>

      {/* Inline Testimonial */}
      <section className="pb-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <div className="border-l-2 border-border-light pl-6 max-w-2xl">
              <p className="text-lg leading-relaxed text-muted italic">
                &ldquo;From the first call to the final deliverable, Chart+Foster was exceptional.&rdquo;
              </p>
              <p className="mt-3 text-sm font-medium text-white">
                — Marcus Chen, Founder, Vireon Health
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <p className="text-muted mb-10 max-w-2xl leading-relaxed">
              We&apos;re based out of our Brooklyn studio at 146 Franklin Street. Whether you have a
              fully scoped project or a back-of-napkin idea, we&apos;re ready to listen. Fill out
              the form below and we&apos;ll get back to you within one business day.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={100}>
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
              {/* Your Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              {/* Your Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-muted mb-2">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Your Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-muted mb-2">
                  Your Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company Inc."
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              {/* What do you need help with? */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-muted mb-2">
                  What do you need help with?
                </label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="branding">Branding</option>
                  <option value="mobile-apps">Mobile Apps</option>
                  <option value="social-media">Social Media</option>
                  <option value="website">Website</option>
                </select>
              </div>

              {/* Your Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-muted mb-2">
                  Your Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                >
                  <option value="">Select a budget range</option>
                  <option value="10k-25k">$10,000–$25,000</option>
                  <option value="25k-50k">$25,000–$50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>

              {/* The Project */}
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-muted mb-2">
                  The Project
                </label>
                <textarea
                  id="project"
                  name="project"
                  rows={6}
                  placeholder="Tell us about your project..."
                  value={form.project}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-btn bg-white text-primary py-4 font-medium hover:bg-cream transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </ScrollAnimation>
        </div>
      </section>

      {/* Map / Location */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <div className="aspect-[16/9] max-w-2xl bg-surface-light rounded-card flex flex-col items-center justify-center gap-3">
              {/* Map pin icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <p className="text-muted text-sm text-center px-6">
                146 Franklin Street, Brooklyn, NY 11222
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Supporting CTA */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <div className="max-w-2xl space-y-4">
              <p className="text-muted leading-relaxed">
                Prefer to reach out directly? We&apos;re a small, focused team — you&apos;ll always
                hear back from a real person who&apos;s invested in your success. Don&apos;t hesitate
                to drop us a line or give us a call.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="mailto:hello@chartfoster.co"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-cream transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  hello@chartfoster.co
                </a>
                <a
                  href="tel:+13475550146"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-cream transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" />
                  </svg>
                  +1 (347) 555-0146
                </a>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />
    </main>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import SectionLabel from '../components/SectionLabel';
import ScrollAnimation from '../components/ScrollAnimation';
import CounterAnimation from '../components/CounterAnimation';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import { teamMembers, awards } from '../data';

const tabs = ['Branding', 'Mobile Apps', 'Social Media', 'Web Development'];

const tabContent: Record<string, { paragraphs: string[] }> = {
  Branding: {
    paragraphs: [
      "Branding isn't decoration — it's strategy made visible. At Chart+Foster, we believe a great brand is the most durable competitive advantage a business can build. It shapes how customers feel before they read a single word, before they see a price, before they decide to trust you.",
      "We don't arrive with templates. We arrive with questions — sharp ones. We want to understand your business at its core: where you've been, where the industry is heading, and the white space in between that only you can claim. That tension is where genuinely defining brands are born.",
      "From visual identity systems and brand voice to positioning strategy and launch campaigns, we craft every element to work in concert. The result isn't just a beautiful brand — it's a coherent, purposeful one that scales with you and earns loyalty that marketing spend alone never could.",
    ],
  },
  'Mobile Apps': {
    paragraphs: [
      "Mobile is where your brand lives and breathes every single day. It's the most intimate touchpoint you have with your customers — a screen they check first thing in the morning and last thing at night. That proximity demands more than functional design. It demands delight.",
      "Our approach to mobile starts with behavior, not wireframes. We study how people actually use their phones — the gestures, the contexts, the moments of friction — and design experiences that feel like they were made exactly for those people. Intuitive isn't an accident; it's the result of obsessive attention to detail.",
      "We build for both iOS and Android with performance as a non-negotiable. Whether it's a consumer product, a B2B tool, or a brand companion app, we deliver interfaces that are as fast and reliable as they are beautiful — because an app that's stunning but slow teaches users to distrust your entire brand.",
    ],
  },
  'Social Media': {
    paragraphs: [
      "Social media is the world's largest stage and most brutal filter — all at once. Brands that win on social aren't louder, they're smarter. They understand that attention is earned in the first two seconds, and loyalty is built across a hundred small moments of genuine connection.",
      "We develop social strategies rooted in your brand's authentic point of view, not trend-chasing. Your audience can feel the difference between content that was made for them and content that was made to game an algorithm. We make content for people, and the algorithm rewards us anyway.",
      "From content frameworks and visual systems to community management protocols and influencer partnerships, we build social presences that compound. Every post either strengthens the brand or weakens it — there's no neutral. We're here to make sure every piece of content is doing meaningful work.",
    ],
  },
  'Web Development': {
    paragraphs: [
      "Your website is the only place on the internet where you control everything — the story, the experience, the conversion path. Too many businesses treat it as a digital brochure. We treat it as the most powerful sales and brand asset you own.",
      "We build on modern stacks — Next.js, React, Shopify, and custom CMS solutions — with performance, SEO, and accessibility baked in from the start. A site that loads in under two seconds isn't a nice-to-have; it's the difference between a bounce and a sale. We engineer for that reality.",
      "But technology is only as good as the experience it delivers. Our web projects are designed and developed in parallel, not in sequence — which means the vision stays intact from the first sketch to the final deploy. What you approve in design is what your customers experience on launch day.",
    ],
  },
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('Branding');

  return (
    <div className="bg-primary text-white min-h-screen">

      {/* Section 1 — Page Header */}
      <section className="pt-32 pb-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <SectionLabel text="About" />
          </ScrollAnimation>

          <ScrollAnimation delay={100}>
            <h1 className="text-h1 mt-6 max-w-5xl">
              We partner with bold founders and ambitious teams to build brands that define categories and shape culture.
            </h1>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 border-t border-border pt-12">
              {[
                { number: '80', label: 'Brains' },
                { number: '11', label: 'Languages' },
                { number: '17', label: 'Nationalities' },
                { number: '10', label: 'Time Zones' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-h2">{stat.number}</p>
                  <p className="text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Section 2 — Expertise Tabs */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <div className="flex flex-wrap gap-2 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-btn text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab
                      ? 'bg-surface-light text-white'
                      : 'bg-transparent text-muted hover:text-white border border-border'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation>
            <div className="max-w-3xl space-y-6">
              {tabContent[activeTab].paragraphs.map((para, i) => (
                <p key={i} className="text-muted leading-relaxed text-lg">
                  {para}
                </p>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Section 3 — Stats Row */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="pb-12 md:pb-0 md:pr-8">
                <p className="text-stat text-white leading-none">
                  <CounterAnimation end={20} suffix="+" />
                </p>
                <p className="text-muted mt-4 text-lg">Years of Experience</p>
              </div>
              <div className="py-12 md:py-0 md:px-8">
                <p className="text-stat text-white leading-none">
                  <CounterAnimation end={150} suffix="+" />
                </p>
                <p className="text-muted mt-4 text-lg">Projects Delivered</p>
              </div>
              <div className="pt-12 md:pt-0 md:pl-8">
                <p className="text-stat text-white leading-none">
                  <CounterAnimation end={98} suffix="%" />
                </p>
                <p className="text-muted mt-4 text-lg">Customer Satisfaction</p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Section 4 — Mission Statement */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollAnimation>
              <div className="aspect-[4/3] bg-surface-light rounded-card overflow-hidden" />
            </ScrollAnimation>

            <ScrollAnimation delay={150}>
              <div className="space-y-6">
                <h2 className="text-h2">
                  Our mission is to transform ambitious businesses into iconic brands.
                </h2>
                <p className="text-muted leading-relaxed text-lg">
                  We believe the world&apos;s most important businesses deserve brands that match their ambition. Too often, companies with genuinely transformative products and ideas are held back by identities that undersell them — brands built for where they were, not where they&apos;re going.
                </p>
                <p className="text-muted leading-relaxed text-lg">
                  Chart+Foster exists to close that gap. We partner deeply with founders and leadership teams to create brands that don&apos;t just look different — they think differently. Brands that command attention, inspire trust, and compound in value over time.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Section 5 — Awards */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <SectionLabel text="Awards" />
          </ScrollAnimation>

          <ScrollAnimation delay={100}>
            <h2 className="text-h2 mt-6 max-w-2xl">
              A Legacy of Excellence, Honored Worldwide.
            </h2>
            <p className="text-muted mt-4 text-lg max-w-xl leading-relaxed">
              Over two decades of craft, strategy, and relentless pursuit of the exceptional — recognized by the industry&apos;s most respected platforms.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {awards.map((award) => (
                <div
                  key={award.name}
                  className="bg-surface-light rounded-card p-6 md:p-8 flex flex-col justify-between min-h-[140px]"
                >
                  <p className="font-semibold text-white">{award.name}</p>
                  <p className="text-h2 text-muted leading-none mt-4">
                    &times;{award.count}
                  </p>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Section 6 — Team */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <SectionLabel text="Team" />
          </ScrollAnimation>

          <ScrollAnimation delay={100}>
            <h2 className="text-h2 mt-6 max-w-2xl">
              A global team of thinkers, makers, and relentless optimists.
            </h2>
            <p className="text-muted mt-4 text-lg max-w-xl leading-relaxed">
              Spread across 10 time zones and united by a single standard: the work has to be exceptional, or it doesn&apos;t leave the studio.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
              {teamMembers.map((member) => (
                <div key={member.name} className="group">
                  <div className="aspect-square bg-surface-light rounded-card overflow-hidden flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-muted group-hover:text-white transition-colors duration-300">
                      {member.initials}
                    </span>
                  </div>
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="text-muted text-sm mt-0.5">{member.role}</p>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Section 7 — Testimonial + CTA */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <blockquote className="text-xl md:text-2xl lg:text-[1.65rem] leading-relaxed font-light max-w-4xl">
              &ldquo;Chart+Foster didn&apos;t just design our brand — they understood our soul. Every touchpoint feels authentically us. The impact on our business has been immeasurable.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-light flex items-center justify-center text-sm font-bold text-muted">
                SR
              </div>
              <div>
                <p className="font-semibold">Sophia Reynolds</p>
                <p className="text-sm text-muted">CEO, Velóra Chocolate</p>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={150}>
            <div className="mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary text-sm font-medium rounded-btn hover:bg-cream transition-colors duration-200"
              >
                See our work <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Section 8 — FAQ */}
      <div className="border-t border-border">
        <FAQ />
      </div>

    </div>
  );
}

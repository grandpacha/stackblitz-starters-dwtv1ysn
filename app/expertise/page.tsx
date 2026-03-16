'use client';

import SectionLabel from '../components/SectionLabel';
import ScrollAnimation from '../components/ScrollAnimation';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Link from 'next/link';
import { projects } from '../data';

const services = [
  {
    id: 'branding',
    number: '01',
    name: 'Branding',
    heading: 'Where Brands Come Alive',
    description:
      "Brand is not just how you look — it's how you make people feel. We build brand systems that carry meaning, command respect, and create instant recognition across every touchpoint.",
    subServices: [
      'Brand Strategy & Positioning',
      'Visual Identity Design',
      'Brand Voice & Messaging',
      'Brand Guidelines & Systems',
      'Naming & Verbal Identity',
      'Brand Audit & Refresh',
    ],
  },
  {
    id: 'mobile-apps',
    number: '02',
    name: 'Mobile Apps',
    heading: 'From Concept to Home Screen',
    description:
      "We design and build mobile applications that people actually want to use — intuitive, fast, and polished from the first tap to the hundredth. Whether you're launching something new or rethinking what exists, we engineer experiences that earn their place on the home screen.",
    subServices: [
      'iOS & Android Development',
      'UX/UI Design',
      'App Strategy & Roadmapping',
      'Prototyping & User Testing',
      'App Store Optimization',
      'Maintenance & Growth',
    ],
  },
  {
    id: 'social-media',
    number: '03',
    name: 'Social Media',
    heading: 'Bold Ideas, Beautiful Feeds',
    description:
      'Social media is where your brand has an unfiltered conversation with the world. We craft strategies and content that stop the scroll, build communities, and turn followers into advocates — with creative that looks as good as it performs.',
    subServices: [
      'Social Strategy & Planning',
      'Content Creation & Curation',
      'Community Management',
      'Paid Social Campaigns',
      'Influencer Partnerships',
    ],
  },
  {
    id: 'web-development',
    number: '04',
    name: 'Web Development',
    heading: 'Websites that work as good as they look',
    description:
      "Your website is your most powerful sales tool. We design and build digital experiences that are as beautifully engineered as they are visually compelling — performant, accessible, and built to convert.",
    subServices: [
      'Custom Web Design',
      'E-commerce Development',
      'CMS Integration',
      'Performance Optimization',
      'SEO & Analytics',
    ],
  },
];

export default function ExpertisePage() {
  return (
    <main>
      {/* Section 1 — Page Header */}
      <section className="pt-32 py-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <SectionLabel text="Expertise" />
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <h1 className="text-h1 mt-6 max-w-4xl">
              We build things brands brag about&nbsp;— and competitors lose sleep over.
            </h1>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <p className="text-muted text-xl mt-6 max-w-2xl">
              Craft the Brand They Remember. Move Faster Than They Can Follow.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Section 2 — Services Detail */}
      <section className="py-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`border-b border-border pb-16 ${index !== 0 ? 'pt-16' : ''}`}
            >
              <ScrollAnimation>
                {/* Top bar — number + name */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-muted text-sm font-medium tabular-nums">
                    {service.number}
                  </span>
                  <span className="w-px h-4 bg-border-light" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-muted">
                    {service.name}
                  </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
                  {/* Left — heading + description */}
                  <div>
                    <h2 className="text-h2 mb-6">{service.heading}</h2>
                    <p className="text-muted text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Right — sub-services list */}
                  <div className="space-y-3 pt-2">
                    {service.subServices.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-base"
                      >
                        <span className="text-muted mt-[0.3em] select-none">–</span>
                        <span className="text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — Full-Width Parallax Image */}
      <section className="py-section">
        <div className="w-full h-[50vh] parallax-container bg-surface-light relative overflow-hidden">
          {/* Placeholder visual layer */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2 opacity-20">
              <div className="w-24 h-px bg-white mx-auto" />
              <p className="text-sm tracking-widest uppercase font-medium">Chart+Foster Co.</p>
              <div className="w-24 h-px bg-white mx-auto" />
            </div>
          </div>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/40 pointer-events-none" />
        </div>
      </section>

      {/* Section 4 — Testimonials Carousel */}
      <Testimonials />

      {/* Section 5 — Project Gallery Marquee */}
      <section className="py-section overflow-hidden">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 mb-10">
          <ScrollAnimation>
            <SectionLabel text="Our Work" />
            <h2 className="text-h2 mt-4 max-w-2xl">
              Projects that define the standard.
            </h2>
          </ScrollAnimation>
        </div>

        {/* Row 1 — left to right */}
        <div className="relative flex overflow-hidden mb-4">
          <div className="flex gap-4 animate-marquee marquee-track whitespace-nowrap">
            {[...projects, ...projects].map((project, i) => (
              <Link
                key={`row1-${i}`}
                href={`/projects/${project.slug}`}
                className="relative flex-shrink-0 w-72 aspect-[3/2] rounded-card bg-surface-light overflow-hidden group"
              >
                {/* Placeholder thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-surface-light to-border" />
                {/* Project name overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs text-muted uppercase tracking-widest mb-1">
                    {project.category}
                  </p>
                  <p className="text-sm font-semibold">{project.name}</p>
                </div>
                {/* Always-visible name badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-sm font-medium text-white/70">{project.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Row 2 — slower, reversed direction feel via marquee-slow */}
        <div className="relative flex overflow-hidden">
          <div
            className="flex gap-4 animate-marquee-slow marquee-track whitespace-nowrap"
            style={{ animationDirection: 'reverse' }}
          >
            {[...projects, ...projects].map((project, i) => (
              <Link
                key={`row2-${i}`}
                href={`/projects/${project.slug}`}
                className="relative flex-shrink-0 w-72 aspect-[3/2] rounded-card bg-surface-light overflow-hidden group"
              >
                {/* Placeholder thumbnail with slightly different tint */}
                <div className="absolute inset-0 bg-gradient-to-tl from-surface-light to-border" />
                {/* Project name overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs text-muted uppercase tracking-widest mb-1">
                    {project.category}
                  </p>
                  <p className="text-sm font-semibold">{project.name}</p>
                </div>
                {/* Always-visible name badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-sm font-medium text-white/70">{project.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — FAQ */}
      <FAQ />
    </main>
  );
}

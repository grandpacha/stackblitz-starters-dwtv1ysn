'use client';

import SectionLabel from './components/SectionLabel';
import ScrollAnimation from './components/ScrollAnimation';
import CounterAnimation from './components/CounterAnimation';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Link from 'next/link';
import { projects, awards, blogPosts } from './data';

const expertiseItems = [
  { number: '01', name: 'Branding' },
  { number: '02', name: 'Mobile Apps' },
  { number: '03', name: 'Social Media' },
  { number: '04', name: 'Web Development' },
];

const projectCardGradients = [
  'linear-gradient(135deg, #1a1008 0%, #3d2810 100%)',
  'linear-gradient(135deg, #071a1a 0%, #0d3d3d 100%)',
  'linear-gradient(135deg, #0a0a14 0%, #1a1a2e 100%)',
  'linear-gradient(135deg, #0a140a 0%, #1a2e1a 100%)',
];

const blogCardGradients = [
  'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)',
  'linear-gradient(135deg, #14100a 0%, #2e220a 100%)',
  'linear-gradient(135deg, #0a140f 0%, #0a2e18 100%)',
  'linear-gradient(135deg, #100a14 0%, #1e0a2e 100%)',
];

export default function Home() {
  return (
    <main className="bg-primary text-white overflow-x-hidden">

      {/* ─── Section 1: Hero ─── */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Gradient overlay background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[#0d0d14] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 60% -10%, rgba(80,60,160,0.12), transparent)' }} />

        {/* Main hero content */}
        <div className="relative z-10 max-w-content mx-auto px-6 md:px-10 lg:px-16 pt-40 md:pt-48 flex-1 flex flex-col justify-center">
          <ScrollAnimation>
            <h1 className="text-display font-extrabold leading-none tracking-tight">
              <span className="block">Crafting</span>
              <span className="block">Award</span>
              <span className="block">Winning</span>
              <span className="block text-muted">Experiences for the World&apos;s Most Influential Brands.</span>
            </h1>
            <p className="mt-8 max-w-xl text-muted text-lg md:text-xl leading-relaxed font-light">
              We are a strategic brand and design studio helping ambitious companies
              build identities that resonate, convert, and endure.
            </p>
          </ScrollAnimation>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 max-w-content mx-auto px-6 md:px-10 lg:px-16 pb-10 w-full">
          <div className="flex items-end justify-between">
            {/* Scroll to explore */}
            <div className="flex flex-col items-start gap-2">
              <span className="text-sm text-muted tracking-widest uppercase">Scroll to explore</span>
              <div className="flex flex-col items-center gap-1">
                <span className="w-px h-10 bg-gradient-to-b from-muted/60 to-transparent block" />
                <svg
                  className="text-muted animate-bounce"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7 1v12M1 7l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Trusted by Global Brands */}
            <SectionLabel text="Trusted by Global Brands" />
          </div>
        </div>
      </section>

      {/* ─── Section 2: Inline Testimonial Quote ─── */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <blockquote className="text-h2 font-bold leading-snug max-w-4xl">
              &ldquo;Chart+Foster completely transformed how we think about our brand.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-light border border-border flex items-center justify-center text-sm font-bold text-muted flex-shrink-0">
                SR
              </div>
              <div>
                <p className="font-semibold text-white">Sophia Reynolds</p>
                <p className="text-sm text-muted">CEO, Vel&oacute;ra Chocolate</p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* ─── Section 3: Stats ─── */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Counters */}
            <ScrollAnimation>
              <div className="flex flex-col gap-12">
                <div>
                  <div className="text-stat font-extrabold leading-none tabular-nums text-white">
                    <CounterAnimation end={20} suffix="+" className="text-stat font-extrabold" />
                  </div>
                  <p className="mt-3 text-muted text-sm tracking-widest uppercase font-medium">
                    years of experience
                  </p>
                </div>
                <div>
                  <div className="text-stat font-extrabold leading-none tabular-nums text-white">
                    <CounterAnimation end={9990} separator className="text-stat font-extrabold" />
                  </div>
                  <p className="mt-3 text-muted text-sm tracking-widest uppercase font-medium">
                    hours invested in client success
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            {/* Body copy */}
            <ScrollAnimation delay={150}>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-white">
                  We don&apos;t just build brands — we architect lasting competitive advantages
                  for businesses that refuse to be average.
                </p>
                <p className="text-muted leading-relaxed">
                  Chart+Foster was founded on a simple belief: that extraordinary brands are
                  the result of extraordinary thinking. Over two decades, we&apos;ve refined a
                  process that fuses strategic rigour with creative fearlessness — delivering
                  work that moves markets, shifts perceptions, and generates measurable
                  business outcomes.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white pb-0.5 hover:text-muted hover:border-muted transition-colors group"
                >
                  About our firm
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ─── Section 4: Projects Preview ─── */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          {/* Header row */}
          <ScrollAnimation>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <SectionLabel text="Projects" />
                <p className="mt-4 text-muted max-w-lg leading-relaxed">
                  A selection of our most celebrated brand and digital transformations —
                  each one a study in what happens when strategy meets craft.
                </p>
              </div>
              <Link
                href="/projects"
                className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white pb-0.5 hover:text-muted hover:border-muted transition-colors group"
              >
                View all
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Link>
            </div>
          </ScrollAnimation>

          {/* 2×2 card grid */}
          <ScrollAnimation stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {projects.slice(0, 4).map((project, i) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="card-hover block group"
                >
                  {/* Image placeholder */}
                  <div
                    className="aspect-[4/3] rounded-card bg-surface-light overflow-hidden relative mb-4"
                    style={{ background: projectCardGradients[i % projectCardGradients.length] }}
                  >
                    <div className="absolute inset-0 flex items-end p-6">
                      <span className="text-xs font-medium text-white/40 uppercase tracking-widest">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  {/* Card text */}
                  <div className="px-1">
                    <p className="font-bold text-lg text-white group-hover:text-muted transition-colors">
                      {project.name}
                    </p>
                    <p className="text-muted text-sm mt-1">{project.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* ─── Section 5: Statement ─── */}
      <section className="py-section border-t border-border overflow-hidden text-center">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <p className="text-h1 font-extrabold leading-tight">
              Less talk,<br />more impact.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* ─── Section 6: Expertise Preview ─── */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <div className="mb-12">
              <SectionLabel text="Expertise" />
              <p className="mt-4 text-muted max-w-lg leading-relaxed">
                Four interconnected disciplines, mastered over two decades, deployed in
                service of brands that demand excellence.
              </p>
            </div>
          </ScrollAnimation>

          {/* Service rows */}
          <div className="border-t border-border">
            {expertiseItems.map((item, i) => (
              <ScrollAnimation key={item.number} delay={i * 80}>
                <Link
                  href="/expertise"
                  className="flex items-center justify-between py-6 md:py-8 border-b border-border group hover:text-muted transition-colors duration-300"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="text-sm text-muted font-mono w-8 flex-shrink-0 group-hover:text-white/60 transition-colors">
                      {item.number}
                    </span>
                    <span className="text-h3 font-bold text-white leading-none group-hover:text-muted transition-colors duration-300">
                      {item.name}
                    </span>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-muted group-hover:text-white group-hover:translate-x-2 transition-all duration-300 flex-shrink-0 ml-4"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 7: Awards Marquee ─── */}
      <section className="py-section border-t border-border overflow-hidden">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 mb-10">
          <ScrollAnimation>
            <SectionLabel text="Awards" />
            <p className="mt-4 text-muted max-w-lg leading-relaxed">
              26 industry-recognized awards across the world&apos;s most prestigious
              creative and digital platforms.
            </p>
          </ScrollAnimation>
        </div>

        {/* Marquee strip */}
        <div className="relative flex overflow-hidden border-t border-b border-border py-6">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee marquee-track whitespace-nowrap">
            {/* First copy */}
            {awards.map((award) => (
              <span
                key={`a-${award.name}`}
                className="inline-flex items-center gap-3 mx-8 text-sm font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-border-light flex-shrink-0" />
                <span className="font-semibold text-white/80">{award.name}</span>
                <span className="text-muted">&times;{award.count}</span>
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {awards.map((award) => (
              <span
                key={`b-${award.name}`}
                className="inline-flex items-center gap-3 mx-8 text-sm font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-border-light flex-shrink-0" />
                <span className="font-semibold text-white/80">{award.name}</span>
                <span className="text-muted">&times;{award.count}</span>
              </span>
            ))}
            {/* Extra copies for wide screens */}
            {awards.map((award) => (
              <span
                key={`c-${award.name}`}
                className="inline-flex items-center gap-3 mx-8 text-sm font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-border-light flex-shrink-0" />
                <span className="font-semibold text-white/80">{award.name}</span>
                <span className="text-muted">&times;{award.count}</span>
              </span>
            ))}
            {awards.map((award) => (
              <span
                key={`d-${award.name}`}
                className="inline-flex items-center gap-3 mx-8 text-sm font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-border-light flex-shrink-0" />
                <span className="font-semibold text-white/80">{award.name}</span>
                <span className="text-muted">&times;{award.count}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 8: Bold Statement ─── */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 text-center">
          <ScrollAnimation>
            <blockquote className="text-h2 font-bold leading-snug max-w-4xl mx-auto">
              &ldquo;You don&apos;t get many chances to be iconic.
              So we make our first shot truly unforgettable.&rdquo;
            </blockquote>
          </ScrollAnimation>
        </div>
      </section>

      {/* ─── Section 9: Testimonials Carousel ─── */}
      <div className="border-t border-border">
        <Testimonials />
      </div>

      {/* ─── Section 10: Blog Preview ─── */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          {/* Header */}
          <ScrollAnimation>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <SectionLabel text="Blog" />
                <p className="mt-4 text-muted max-w-lg leading-relaxed">
                  Insights, perspectives, and ideas from the Chart+Foster team — on
                  branding, design, and building businesses that last.
                </p>
              </div>
              <Link
                href="/blog"
                className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white pb-0.5 hover:text-muted hover:border-muted transition-colors group"
              >
                All articles
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Link>
            </div>
          </ScrollAnimation>

          {/* Horizontal scroll row */}
          <ScrollAnimation>
            <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 md:-mx-10 md:px-10 lg:-mx-16 lg:px-16">
              {blogPosts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card-hover flex-none w-72 md:w-80 group block"
                >
                  {/* Thumbnail placeholder */}
                  <div
                    className="aspect-[3/2] rounded-card bg-surface-light overflow-hidden mb-4"
                    style={{ background: blogCardGradients[i % blogCardGradients.length] }}
                  />
                  {/* Card body */}
                  <div className="px-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-muted bg-surface-light px-2.5 py-1 rounded-btn border border-border">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted">{post.readTime}</span>
                    </div>
                    <p className="font-bold leading-snug text-white group-hover:text-muted transition-colors">
                      {post.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* ─── Section 11: FAQ ─── */}
      <div className="border-t border-border">
        <FAQ />
      </div>

    </main>
  );
}

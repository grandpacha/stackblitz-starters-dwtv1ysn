'use client';

import Link from 'next/link';
import ScrollAnimation from './components/ScrollAnimation';
import CounterAnimation from './components/CounterAnimation';
import SectionHead from './components/SectionHead';
import GridLines from './components/GridLines';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import TelemetryGauges from './components/infographics/TelemetryGauges';
import GrowthModeler from './components/infographics/GrowthModeler';
import PerformanceDashboard from './components/infographics/PerformanceDashboard';
import { projects, awards, blogPosts } from './data';

const pills = [
  { label: 'Brand Strategy', href: '/expertise#branding' },
  { label: 'Positioning', href: '/expertise#branding' },
  { label: 'Visual Identity', href: '/expertise#branding' },
  { label: 'Mobile Apps', href: '/expertise#mobile-apps' },
  { label: 'Social Media', href: '/expertise#social-media' },
  { label: 'Web Development', href: '/expertise#web-development' },
];

const clients = [
  { name: 'VELÓRA', className: 'font-light tracking-[0.35em] text-lg' },
  { name: 'Vireon Health', className: 'font-semibold tracking-tight text-xl' },
  { name: 'AURA', className: 'font-black tracking-[0.2em] text-xl' },
  { name: 'lumora', className: 'font-medium tracking-tight text-2xl lowercase' },
];

const stats = [
  { end: 20, suffix: '+', label: 'Years of experience', note: 'Founded in Brooklyn, 2005' },
  { end: 150, suffix: '+', label: 'Projects delivered', note: 'Across 11 industries' },
  { end: 9990, suffix: '', label: 'Hours on client work', note: 'In the last 12 months', separator: true },
  { end: 26, suffix: '', label: 'Industry awards', note: 'Framer, Awwwards, FWA and more' },
];

const services = [
  { id: 'branding', n: '01', name: 'Branding', body: 'Strategy, positioning and identity systems that give your business a clear, ownable place in the market.', icon: <path d="M12 3v18M3 12h18M7 7l10 10M17 7L7 17" /> },
  { id: 'mobile-apps', n: '02', name: 'Mobile Apps', body: 'Product strategy and design for apps that customers keep on their home screen and actually use.', icon: <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2" /> },
  { id: 'social-media', n: '03', name: 'Social Media', body: 'Content strategy and creative systems that build audiences and turn attention into demand.', icon: <path d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0M12 4v16M4.5 9h15M4.5 15h15" /> },
  { id: 'web-development', n: '04', name: 'Web Development', body: 'Fast, considered websites built to communicate your positioning and convert the right visitors.', icon: <path d="M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01" /> },
];

const gradients = [
  'linear-gradient(140deg, #1d1307 0%, #45300f 55%, #6b4a12 100%)',
  'linear-gradient(140deg, #061616 0%, #0b3333 55%, #145252 100%)',
  'linear-gradient(140deg, #0b0b12 0%, #1b1b2c 55%, #2b2b46 100%)',
  'linear-gradient(140deg, #08110a 0%, #15291a 55%, #22412b 100%)',
];

function Badge() {
  return (
    <span className="relative inline-flex shrink-0 w-[0.9em] h-[0.9em] align-middle group/badge" aria-hidden>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite] group-hover/badge:animate-[spin_4s_linear_infinite]">
        <defs>
          <path id="badgeCircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="50" cy="50" r="49" fill="#111111" stroke="#333333" strokeWidth="1" />
        <text fill="#999999" fontSize="9.5" fontFamily="'JetBrains Mono', monospace" letterSpacing="3.2">
          <textPath href="#badgeCircle">CHART+FOSTER · EST. 2005 · BROOKLYN ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="relative w-[28%] h-[28%]">
          <span className="absolute left-1/2 top-0 bottom-0 w-[22%] -translate-x-1/2 bg-gold" />
          <span className="absolute top-1/2 left-0 right-0 h-[22%] -translate-y-1/2 bg-gold" />
        </span>
      </span>
    </span>
  );
}

export default function Home() {
  return (
    <main className="bg-primary text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
        <GridLines />
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="container-x h-full">
            <div className="relative h-full">
              <div className="absolute top-0 left-3/4 -translate-x-1/2 h-[34%] w-px gold-beam" />
              <div className="absolute top-[34%] left-3/4 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold shadow-[0_0_16px_4px_rgba(244,178,35,0.5)]" />
            </div>
          </div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%]" style={{ background: 'radial-gradient(ellipse 60% 60% at 75% 0%, rgba(244,178,35,0.08), transparent 70%)' }} />

        <div className="relative container-x w-full pt-36 md:pt-44 flex-1 flex flex-col min-w-0">
          <ScrollAnimation>
            <span className="eyebrow-pill">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Brand &amp; business strategy &middot; $10M+ companies
            </span>
            <h1 className="text-display mt-10">
              <span className="block">Crafting</span>
              <span className="flex flex-wrap items-center gap-x-[0.18em]">
                Award <Badge /> Winning
              </span>
              <span className="block text-h2 text-muted mt-6 md:mt-8 max-w-4xl !font-semibold">
                Experiences for the world&apos;s most influential brands.
              </span>
            </h1>
          </ScrollAnimation>

          <ScrollAnimation>
            <div className="mt-16 md:mt-20 border-t border-border-light pt-8 grid grid-cols-12 gap-x-6 gap-y-10 items-start">
              <p className="col-span-12 md:col-span-6 lg:col-span-4 text-muted text-lg leading-relaxed">
                We help leadership teams at established companies sharpen their positioning, build brands that command a premium, and turn strategy into growth.
              </p>
              <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">
                  Start a project <span aria-hidden>&rarr;</span>
                </Link>
                <Link href="/projects" className="btn-ghost">
                  See our work
                </Link>
              </div>
              <div className="col-span-12 lg:col-span-5 flex flex-wrap gap-2.5 lg:justify-end">
                {pills.map((p, i) => (
                  <Link
                    key={p.label}
                    href={p.href}
                    className="px-4 py-2.5 rounded-btn border border-border-light bg-surface text-sm text-white/80 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.9)] hover:border-gold hover:text-white hover:-translate-y-0.5 transition-all duration-300"
                    style={{ transitionDelay: `${i * 20}ms` }}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          <div className="mt-auto pt-16 pb-8 flex items-end justify-between gap-6">
            <a href="#clients" className="mono-label flex items-center gap-4 hover:!text-white transition-colors">
              <span className="relative block w-px h-10 bg-border-light overflow-hidden">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-gold animate-[scrollCue_2s_ease-in-out_infinite]" />
              </span>
              Scroll to explore
            </a>
            <p className="mono-label hidden sm:block">Trusted by established brands</p>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="scroll-mt-20">
        <div className="container-x">
          <div className="cell-grid grid-cols-2 md:grid-cols-4">
            {clients.map((c) => (
              <div key={c.name} className="h-28 md:h-36 flex items-center justify-center text-white/50 hover:text-white hover:!bg-surface transition-colors duration-300">
                <span className={c.className}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-section">
        <div className="container-x">
          <SectionHead label="Who we are" index="01" title="A strategy partner for companies ready for their next stage." />
          <ScrollAnimation>
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 md:col-start-4 md:col-span-9">
                <p className="text-lead text-white max-w-4xl">
                  Chart+Foster works with founders and leadership teams at $10M+ companies. We combine business strategy with brand craft, so the way you look, speak and sell reflects where the company is going, not where it has been.
                </p>
                <Link href="/about" className="link-underline mt-8 text-sm">
                  About the firm <span className="arrow">&rarr;</span>
                </Link>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation>
            <div className="mt-16 md:mt-24 cell-grid grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="p-6 md:p-8 flex flex-col justify-between min-h-[13rem] md:min-h-[15rem]">
                  <p className="mono-label">{s.label}</p>
                  <div>
                    <CounterAnimation end={s.end} suffix={s.suffix} separator={s.separator} className="block tabular-nums font-extrabold tracking-[-0.04em] leading-none text-[clamp(2.5rem,4.6vw,4.75rem)]" />
                    <p className="text-xs text-muted mt-3">{s.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation>
            <figure className="mt-16 md:mt-24 grid grid-cols-12 gap-x-6 gap-y-6">
              <figcaption className="col-span-12 md:col-span-3 order-2 md:order-1 flex items-center md:items-start gap-4">
                <span className="w-11 h-11 rounded-full border border-border-light flex items-center justify-center font-mono text-[11px] text-gold">SR</span>
                <span>
                  <span className="block font-semibold text-sm">Sophia Reynolds</span>
                  <span className="block text-sm text-muted">CEO, Vel&oacute;ra Chocolate</span>
                </span>
              </figcaption>
              <blockquote className="col-span-12 md:col-span-9 order-1 md:order-2 text-h3 !font-medium">
                <span className="text-gold">&ldquo;</span>Chart+Foster completely changed how we think about our brand.<span className="text-gold">&rdquo;</span>
              </blockquote>
            </figure>
          </ScrollAnimation>
        </div>
      </section>

      <PerformanceDashboard />

      {/* Expertise */}
      <section className="py-section">
        <div className="container-x">
          <SectionHead
            label="Expertise"
            index="02"
            title="Four disciplines. One connected strategy."
            intro="Each practice stands on its own, but the work is strongest when they share one positioning."
            action={{ href: '/expertise', label: 'Explore expertise' }}
          />
          <ScrollAnimation stagger>
            <div className="cell-grid md:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <Link key={s.id} href={`/expertise#${s.id}`} className="group relative p-8 min-h-[22rem] flex flex-col justify-between hover:!bg-surface transition-colors duration-300">
                  <span className="absolute top-0 left-0 h-[2px] w-0 bg-gold group-hover:w-full transition-all duration-500" />
                  <div className="flex items-start justify-between">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white group-hover:text-gold transition-colors" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                    <span className="mono-label">{s.n}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{s.name}</h3>
                    <p className="text-sm text-muted leading-relaxed mt-3">{s.body}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                      Learn more <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Projects */}
      <section className="py-section">
        <div className="container-x">
          <SectionHead
            label="Selected work"
            index="03"
            title="Brands we’ve helped define."
            action={{ href: '/projects', label: 'View all projects' }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
            {projects.slice(0, 4).map((p, i) => (
              <ScrollAnimation key={p.slug} delay={(i % 2) * 120}>
                <Link href={`/projects/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] rounded-card overflow-hidden border border-border">
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]" style={{ background: gradients[i % gradients.length] }} />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.6),transparent_50%)]" />
                    <span className="absolute top-5 left-5 mono-label !text-white/70">{String(i + 1).padStart(2, '0')}</span>
                    <span className="absolute bottom-5 left-5 eyebrow-pill !bg-primary/60 backdrop-blur">{p.category}</span>
                    <span className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      &rarr;
                    </span>
                  </div>
                  <div className="mt-5 border-t border-border pt-5 flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight group-hover:text-gold transition-colors">{p.name}</h3>
                    <span className="mono-label shrink-0">{p.deliverables.length} deliverables</span>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Statement + index */}
      <section className="py-section border-y border-border">
        <div className="container-x">
          <ScrollAnimation>
            <p className="text-display !leading-[0.9]">
              Less talk,
              <br />
              more impact<span className="text-gold">.</span>
            </p>
          </ScrollAnimation>
          <div className="mt-16 md:mt-24 border-t border-white/80 pt-6 grid grid-cols-12 gap-x-6 gap-y-12">
            <p className="col-span-12 md:col-span-3 mono-label flex items-center gap-3">
              <span className="text-gold">{'//'}</span>Index
            </p>
            <div className="col-span-12 sm:col-span-6 md:col-span-4">
              <h3 className="text-2xl font-bold tracking-tight">Selected work</h3>
              <p className="mono-label mt-1 mb-5">Brand &amp; digital</p>
              <ul className="border-t border-border">
                {projects.map((p) => (
                  <li key={p.slug} className="border-b border-border">
                    <Link href={`/projects/${p.slug}`} className="flex justify-between gap-4 py-3 text-sm group">
                      <span className="text-white/80 group-hover:text-gold transition-colors">{p.name}</span>
                      <span className="text-muted truncate">{p.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-5">
              <h3 className="text-2xl font-bold tracking-tight">Recognition</h3>
              <p className="mono-label mt-1 mb-5">26 awards</p>
              <ul className="border-t border-border grid grid-cols-2 gap-x-6">
                {awards.map((a) => (
                  <li key={a.name} className="border-b border-border flex justify-between py-3 text-sm">
                    <span className="text-white/80">{a.name}</span>
                    <span className="font-mono text-gold">&times;{a.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="relative flex overflow-hidden border-b border-border py-5 bg-surface">
        <div className="flex animate-marquee marquee-track whitespace-nowrap">
          {[0, 1, 2, 3].map((copy) =>
            awards.map((a) => (
              <span key={`${copy}-${a.name}`} className="inline-flex items-center gap-3 mx-8 mono-label !text-white/70">
                <span className="text-gold">+</span>
                {a.name} <span className="text-muted">&times;{a.count}</span>
              </span>
            ))
          )}
        </div>
      </div>

      <TelemetryGauges />

      {/* Philosophy */}
      <section className="py-section">
        <div className="container-x">
          <ScrollAnimation>
            <div className="border-t border-border-light pt-6 grid grid-cols-12 gap-x-6 gap-y-8">
              <p className="col-span-12 md:col-span-3 mono-label flex items-center gap-3">
                <span className="text-gold">{'//'}</span>Philosophy
              </p>
              <p className="col-span-12 md:col-span-9 text-h2">
                You don&apos;t get many chances to be iconic. <span className="text-muted">So we make the first one count.</span>
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <GrowthModeler />

      <Testimonials />

      {/* Journal */}
      <section className="py-section border-t border-border">
        <div className="container-x">
          <SectionHead label="Journal" index="04" title="Thinking on brand, strategy and growth." action={{ href: '/blog', label: 'All articles' }} />
          <ScrollAnimation stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {blogPosts.map((post, i) => (
                <Link key={post.slug} href="/blog" className="group block">
                  <div className="relative aspect-[4/3] rounded-card overflow-hidden border border-border">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: gradients[(i + 1) % gradients.length] }} />
                  </div>
                  <div className="mt-5 flex items-center justify-between mono-label">
                    <span className="!text-white/80">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight group-hover:text-gold transition-colors">{post.title}</h3>
                </Link>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <FAQ />
    </main>
  );
}

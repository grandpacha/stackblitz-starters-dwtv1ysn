'use client';

import Link from 'next/link';
import SectionLabel from '../components/SectionLabel';
import ScrollAnimation from '../components/ScrollAnimation';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import { projects } from '../data';

export default function ProjectsPage() {
  return (
    <main className="bg-primary text-white">

      {/* Page Header */}
      <section className="pt-32 pb-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <SectionLabel text="Projects" />
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <h1 className="text-h1 mt-6 max-w-4xl">
              Bold ideas deserve bold execution. Let&apos;s build something iconic.
            </h1>
          </ScrollAnimation>
        </div>
      </section>

      {/* Project Case Studies */}
      <section className="py-section border-t border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <div className="space-y-0">
            {projects.map((project, index) => {
              const isEven = index % 2 === 1;
              return (
                <div key={project.slug} className="py-16 border-b border-border last:border-b-0">
                  <ScrollAnimation>
                    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>

                      {/* Text Column */}
                      <div className={`space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <p className="text-sm text-muted font-medium uppercase tracking-widest">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <h2 className="text-h2">{project.name}</h2>
                        <p className="text-muted leading-relaxed text-lg max-w-lg">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.deliverables.map((d) => (
                            <span
                              key={d}
                              className="text-xs font-medium px-3 py-1.5 rounded-full border border-border-light text-muted"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                        <div className="pt-4">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all duration-300 group"
                          >
                            View Project
                            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                          </Link>
                        </div>
                      </div>

                      {/* Image Column */}
                      <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="relative aspect-[4/3] bg-surface-light rounded-card overflow-hidden">
                          {/* Decorative grid lines */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                          </div>
                          {/* Center mark */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-border-light text-center">
                              <div className="w-16 h-16 mx-auto border border-border-light rounded-full flex items-center justify-center mb-3">
                                <span className="text-xs text-muted font-mono">IMG</span>
                              </div>
                              <p className="text-xs text-border-light font-mono">4 : 3</p>
                            </div>
                          </div>
                          {/* Category tag overlay */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white border border-border-light">
                              {project.category}
                            </span>
                          </div>
                          {/* Hover overlay */}
                          <Link href={`/projects/${project.slug}`} className="absolute inset-0 bg-white/0 hover:bg-white/5 transition-colors duration-300" aria-label={`View ${project.name} project`} />
                        </div>
                      </div>

                    </div>
                  </ScrollAnimation>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <div className="bg-surface rounded-card p-12 lg:p-20 text-center space-y-8">
              <p className="text-sm text-muted font-medium uppercase tracking-widest">
                {'// Start a project'}
              </p>
              <h2 className="text-h2 max-w-2xl mx-auto">
                Ready to build something that stands apart?
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
                We partner with ambitious brands to create identities, experiences, and strategies that move markets.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary text-sm font-semibold rounded-btn hover:bg-cream transition-colors duration-200"
              >
                Get in Touch &rarr;
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

    </main>
  );
}

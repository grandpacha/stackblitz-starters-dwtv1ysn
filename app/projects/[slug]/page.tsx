'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import SectionLabel from '../../components/SectionLabel';
import ScrollAnimation from '../../components/ScrollAnimation';
import FAQ from '../../components/FAQ';
import { projects } from '../../data';

function ImagePlaceholder({ aspectClass, label }: { aspectClass: string; label?: string }) {
  return (
    <div className={`relative ${aspectClass} bg-surface-light rounded-card overflow-hidden`}>
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border border-border-light rounded-full flex items-center justify-center mb-2">
            <span className="text-xs text-muted font-mono">IMG</span>
          </div>
          {label && <p className="text-xs text-border-light font-mono">{label}</p>}
        </div>
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <main className="bg-primary text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted text-sm uppercase tracking-widest font-medium">{'// 404'}</p>
          <h1 className="text-h1">Project not found.</h1>
          <p className="text-muted">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white text-primary text-sm font-semibold rounded-btn hover:bg-cream transition-colors duration-200"
          >
            &larr; Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <main className="bg-primary text-white">

      {/* Hero Image */}
      <section className="pt-32 pb-12">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <ImagePlaceholder aspectClass="aspect-[16/9] lg:aspect-[21/9]" label="16 : 9 / 21 : 9" />
          </ScrollAnimation>
        </div>
      </section>

      {/* Project Header */}
      <section className="py-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <SectionLabel text={project.category} />
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <h1 className="text-h1 mt-6 mb-10">{project.name}</h1>
          </ScrollAnimation>

          {/* Overview + Metadata */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <ScrollAnimation>
              <p className="text-lg leading-relaxed text-muted">{project.description}</p>
            </ScrollAnimation>
            <ScrollAnimation delay={100}>
              <div className="space-y-6">
                {/* Website */}
                <div className="border-b border-border pb-6">
                  <p className="text-xs text-muted uppercase tracking-widest font-medium mb-2">Website</p>
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-cream transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    {project.website.replace('https://', '')}
                    <span className="text-muted text-sm">&nbsp;&rarr;</span>
                  </a>
                </div>
                {/* Deliverables */}
                <div>
                  <p className="text-xs text-muted uppercase tracking-widest font-medium mb-3">Deliverables</p>
                  <div className="flex flex-wrap gap-2">
                    {project.deliverables.map((d) => (
                      <span
                        key={d}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border border-border-light text-muted"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Extended Description */}
      <section className="pb-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <p className="text-muted text-lg md:text-xl leading-relaxed max-w-3xl">
              {project.longDescription}
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Image Gallery — varied layouts */}
      <section className="pb-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16 space-y-6">
          {/* Full-width image */}
          <ScrollAnimation>
            <ImagePlaceholder aspectClass="aspect-[16/7]" label="16 : 7" />
          </ScrollAnimation>
          {/* Side-by-side pair */}
          <ScrollAnimation>
            <div className="grid grid-cols-2 gap-6">
              <ImagePlaceholder aspectClass="aspect-[4/3]" label="4 : 3" />
              <ImagePlaceholder aspectClass="aspect-[4/3]" label="4 : 3" />
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Challenges */}
      <section className="pb-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h3 className="text-h3 mb-6">Challenges</h3>
                <p className="text-muted leading-relaxed text-lg">{project.challenge}</p>
              </div>
              <div className="lg:pt-16">
                <ImagePlaceholder aspectClass="aspect-square" label="1 : 1" />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Additional Images */}
      <section className="pb-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImagePlaceholder aspectClass="aspect-[3/4]" label="3 : 4" />
              <ImagePlaceholder aspectClass="aspect-[3/4]" label="3 : 4" />
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Solution */}
      <section className="pb-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div className="lg:order-2">
                <h3 className="text-h3 mb-6">Solution</h3>
                <p className="text-muted leading-relaxed text-lg">{project.solution}</p>
              </div>
              <div className="lg:order-1">
                <ImagePlaceholder aspectClass="aspect-[4/3]" label="4 : 3" />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Client Testimonial */}
      <section className="py-section border-t border-b border-border">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <div className="max-w-3xl">
              <p className="text-sm text-muted font-medium uppercase tracking-widest mb-8">
                {'// Client Testimonial'}
              </p>
              <blockquote className="text-xl md:text-2xl lg:text-[1.65rem] leading-relaxed font-light mb-10">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-light flex items-center justify-center text-sm font-bold text-muted flex-shrink-0">
                  {project.testimonial.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold">{project.testimonial.name}</p>
                  <p className="text-sm text-muted">{project.testimonial.title}</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Next / Previous Navigation */}
      <section className="py-section">
        <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
          <ScrollAnimation>
            <p className="text-sm text-muted font-medium uppercase tracking-widest mb-10">
              {'// More Projects'}
            </p>
          </ScrollAnimation>

          {/* Next Project — large card */}
          {nextProject && (
            <ScrollAnimation delay={100}>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group block bg-surface rounded-card p-10 lg:p-16 hover:bg-surface-light transition-colors duration-300 mb-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="space-y-4">
                    <p className="text-xs text-muted uppercase tracking-widest font-medium">Next Project</p>
                    <h3 className="text-h3 group-hover:text-cream transition-colors duration-200">
                      {nextProject.name}
                    </h3>
                    <p className="text-muted max-w-lg leading-relaxed">{nextProject.description}</p>
                    <span className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                      View Project <span>&rarr;</span>
                    </span>
                  </div>
                  <div className="hidden lg:block flex-shrink-0 w-48">
                    <div className="aspect-square bg-surface-light rounded-card" />
                  </div>
                </div>
              </Link>
            </ScrollAnimation>
          )}

          {/* Previous Project — text link */}
          {prevProject && (
            <ScrollAnimation delay={150}>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted uppercase tracking-widest font-medium mb-1">Previous Project</p>
                  <Link
                    href={`/projects/${prevProject.slug}`}
                    className="font-semibold text-white hover:text-cream transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    <span>&larr;</span> {prevProject.name}
                  </Link>
                </div>
                <Link
                  href="/projects"
                  className="text-sm text-muted hover:text-white transition-colors duration-200"
                >
                  All Projects
                </Link>
              </div>
            </ScrollAnimation>
          )}

          {/* If only one direction exists, still show All Projects link */}
          {!prevProject && nextProject && (
            <ScrollAnimation delay={150}>
              <div className="pt-4 border-t border-border text-right">
                <Link
                  href="/projects"
                  className="text-sm text-muted hover:text-white transition-colors duration-200"
                >
                  All Projects
                </Link>
              </div>
            </ScrollAnimation>
          )}
          {!nextProject && !prevProject && (
            <ScrollAnimation delay={150}>
              <div className="pt-4 border-t border-border text-right">
                <Link
                  href="/projects"
                  className="text-sm text-muted hover:text-white transition-colors duration-200"
                >
                  All Projects
                </Link>
              </div>
            </ScrollAnimation>
          )}
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

    </main>
  );
}

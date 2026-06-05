'use client';

import { useState } from 'react';
import SectionLabel from './SectionLabel';
import ScrollAnimation from './ScrollAnimation';

const testimonials = [
  {
    quote: "Chart+Foster completely transformed how we think about our brand. Their strategic insight and creative execution were beyond anything we expected.",
    name: "Sophia Reynolds",
    title: "CEO, Velóra Chocolate",
  },
  {
    quote: "Working with Chart+Foster felt like gaining an entire strategy department overnight. They understood our vision from day one and elevated every aspect of our brand.",
    name: "Marcus Chen",
    title: "Founder, Vireon Health",
  },
  {
    quote: "The team at Chart+Foster doesn't just deliver projects — they deliver transformations. Our digital presence has never been stronger.",
    name: "Amara Okafor",
    title: "CMO, AURA Wearables",
  },
  {
    quote: "From strategy to execution, Chart+Foster brought a level of excellence that set a new standard for our entire organization. Truly world-class.",
    name: "Elena Vasquez",
    title: "VP Brand, Lumora Skincare",
  },
];

interface TestimonialsProps {
  showLabel?: boolean;
}

export default function Testimonials({ showLabel = true }: TestimonialsProps) {
  const [active, setActive] = useState(0);

  return (
    <section className="py-section">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
        {showLabel && (
          <ScrollAnimation>
            <SectionLabel text="Testimonials" />
          </ScrollAnimation>
        )}
        <ScrollAnimation>
          <div className="relative min-h-[200px]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testimonial-slide ${i === active ? 'active' : ''}`}
              >
                <blockquote className="text-xl md:text-2xl lg:text-[1.65rem] leading-relaxed font-light max-w-4xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-light flex items-center justify-center text-sm font-bold text-muted">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="mt-10 flex items-center gap-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  i === active ? 'text-white' : 'text-muted hover:text-white/70'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
            <span className="text-muted text-sm">/ {String(testimonials.length).padStart(2, '0')}</span>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

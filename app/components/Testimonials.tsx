'use client';

import { useEffect, useState } from 'react';
import SectionHead from './SectionHead';
import ScrollAnimation from './ScrollAnimation';

const testimonials = [
  {
    quote:
      'Chart+Foster completely changed how we think about our brand. Their strategic insight and the quality of the creative work went well beyond what we expected.',
    name: 'Sophia Reynolds',
    title: 'CEO, Velóra Chocolate',
  },
  {
    quote:
      'It felt like gaining a senior strategy team overnight. They understood our vision from the first workshop and sharpened every part of how we show up.',
    name: 'Marcus Chen',
    title: 'Founder, Vireon Health',
  },
  {
    quote:
      'They don’t just deliver projects. They deliver a clearer business. Our positioning has never been stronger, and our pipeline shows it.',
    name: 'Amara Okafor',
    title: 'CMO, AURA Wearables',
  },
  {
    quote:
      'From strategy to execution, Chart+Foster set a new standard for our whole organization. The work is still paying off two years later.',
    name: 'Elena Vasquez',
    title: 'VP Brand, Lumora Skincare',
  },
];

const DURATION = 7000;

export default function Testimonials({ showLabel = true }: { showLabel?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % testimonials.length), DURATION);
    return () => clearTimeout(t);
  }, [active, paused]);

  const t = testimonials[active];

  return (
    <section className="py-section border-t border-border">
      <div className="container-x" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {showLabel && <SectionHead label="Testimonials" title="In our clients’ words." />}

        <ScrollAnimation>
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-3 order-2 md:order-1 flex md:flex-col justify-between gap-6">
              <div key={active} className="flex items-center gap-4 animate-fade-up">
                <div className="w-12 h-12 rounded-full bg-surface-light border border-border-light flex items-center justify-center font-mono text-xs text-gold">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted">{t.title}</p>
                </div>
              </div>
            </div>

            <blockquote key={`q-${active}`} className="col-span-12 md:col-span-9 order-1 md:order-2 text-h3 !font-medium !leading-snug animate-fade-up">
              <span className="text-gold">&ldquo;</span>
              {t.quote}
              <span className="text-gold">&rdquo;</span>
            </blockquote>
          </div>

          <div className="mt-14 grid grid-cols-4 gap-3 md:gap-6 md:pl-[25%]">
            {testimonials.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setActive(i)}
                className="text-left group"
                aria-label={`Show testimonial ${i + 1} from ${item.name}`}
                aria-current={i === active}
              >
                <span className="block h-px bg-border-light relative overflow-hidden">
                  {i === active && (
                    <span
                      key={`bar-${active}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-gold"
                      style={{
                        width: paused ? '100%' : undefined,
                        animation: paused ? undefined : `testimonialProgress ${DURATION}ms linear forwards`,
                      }}
                    />
                  )}
                </span>
                <span className={`mt-3 flex justify-between mono-label ${i === active ? '!text-white' : 'group-hover:!text-white'}`}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span className="hidden md:inline truncate ml-2 normal-case tracking-normal">{item.name}</span>
                </span>
              </button>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

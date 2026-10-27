import { ReactNode } from 'react';
import Link from 'next/link';
import ScrollAnimation from './ScrollAnimation';

interface SectionHeadProps {
  label: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: { href: string; label: string };
}

export default function SectionHead({ label, index, title, intro, action }: SectionHeadProps) {
  return (
    <ScrollAnimation>
      <div className="border-t border-border-light pt-6 mb-12 md:mb-16 grid grid-cols-12 gap-x-6 gap-y-6">
        <div className="col-span-12 md:col-span-3 flex items-start justify-between md:justify-start gap-6 self-start">
          <p className="mono-label flex items-center gap-3">
            <span className="text-gold">{'//'}</span>
            {label}
          </p>
          {index && <span className="mono-label text-white/30">{index}</span>}
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="text-h2 max-w-4xl">{title}</h2>
          {(intro || action) && (
            <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              {intro && <p className="text-muted text-lg leading-relaxed max-w-xl">{intro}</p>}
              {action && (
                <Link href={action.href} className="link-underline text-sm shrink-0">
                  {action.label} <span className="arrow">&rarr;</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </ScrollAnimation>
  );
}

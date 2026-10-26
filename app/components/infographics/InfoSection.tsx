'use client';

import { ReactNode } from 'react';
import SectionLabel from '../SectionLabel';
import ScrollAnimation from '../ScrollAnimation';

interface InfoSectionProps {
  id?: string;
  label: string;
  title: string;
  note?: string;
  children: ReactNode;
}

export default function InfoSection({ id, label, title, note, children }: InfoSectionProps) {
  return (
    <section id={id} className="py-section scroll-mt-24 border-t border-border">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-16">
        <ScrollAnimation>
          <div className="pb-6 mb-10 border-b border-border flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <SectionLabel text={label} />
              <h2 className="text-h2 max-w-3xl">{title}</h2>
            </div>
            {note && <p className="text-xs font-mono text-muted md:max-w-xs md:text-right">{note}</p>}
          </div>
        </ScrollAnimation>
        <ScrollAnimation>{children}</ScrollAnimation>
      </div>
    </section>
  );
}

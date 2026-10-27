'use client';

import { ReactNode } from 'react';
import SectionHead from '../SectionHead';
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
    <section id={id} className="py-section scroll-mt-24">
      <div className="container-x">
        <SectionHead label={label} title={title} intro={note} />
        <ScrollAnimation>{children}</ScrollAnimation>
      </div>
    </section>
  );
}

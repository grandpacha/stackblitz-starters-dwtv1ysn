import { ReactNode } from 'react';
import ScrollAnimation from './ScrollAnimation';
import GridLines from './GridLines';

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  meta?: { label: string; value: string }[];
  children?: ReactNode;
}

export default function PageHeader({ eyebrow, title, lead, meta, children }: PageHeaderProps) {
  return (
    <section className="relative pt-36 md:pt-44 pb-section overflow-hidden">
      <GridLines />
      <div className="relative container-x">
        <ScrollAnimation>
          <span className="eyebrow-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            {eyebrow}
          </span>
          <h1 className="text-h1 mt-8 max-w-6xl">{title}</h1>
        </ScrollAnimation>

        {(lead || meta) && (
          <ScrollAnimation>
            <div className="mt-16 md:mt-24 border-t border-border-light pt-6 grid grid-cols-12 gap-x-6 gap-y-8">
              {meta && (
                <dl className="col-span-12 md:col-span-5 grid grid-cols-2 gap-6">
                  {meta.map((m) => (
                    <div key={m.label}>
                      <dt className="mono-label">{m.label}</dt>
                      <dd className="mt-2 text-sm text-white">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {lead && (
                <p className={`col-span-12 text-lead text-muted ${meta ? 'md:col-span-7' : 'md:col-span-8 md:col-start-5'}`}>{lead}</p>
              )}
            </div>
          </ScrollAnimation>
        )}
        {children}
      </div>
    </section>
  );
}

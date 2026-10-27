'use client';

import { useEffect, useState } from 'react';
import InfoSection from './InfoSection';
import { useInView } from './useInView';

const gauges = [
  {
    pct: 82,
    label: 'Retention Lift',
    hex: '#F4B223',
    text: 'text-gold',
    title: 'Category Re-anchoring',
    body: 'Moves commoditized accounts into multi-year recurring commitments by repositioning the brand around a defensible category.',
  },
  {
    pct: 91,
    label: 'C-Suite Alignment',
    hex: '#FFFFFF',
    text: 'text-white',
    title: 'Executive Consensus',
    body: 'A unified leadership view of the brand, so brand architecture directly guides how capital and talent are deployed.',
  },
  {
    pct: 73,
    label: 'Margin Expansion',
    hex: '#2DD4BF',
    text: 'text-aqua',
    title: 'Pricing Power Capture',
    body: 'Shifts pricing away from cost-plus billing toward value pricing backed by a stronger, more distinctive brand.',
  },
];

const TOTAL_DOTS = 40;

function Gauge({ g }: { g: (typeof gauges)[number] }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  const [val, setVal] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - t0) / 1500, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * g.pct));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, run, g.pct]);

  const active = Math.round((val / 100) * TOTAL_DOTS);

  return (
    <button
      type="button"
      onClick={() => {
        setVal(0);
        setRun((r) => r + 1);
      }}
      className="group text-left bg-surface border border-border rounded-card p-8 md:p-10 flex flex-col items-center hover:border-border-light transition-colors duration-300"
      aria-label={`${g.label} ${g.pct}%. Click to replay animation.`}
    >
      <div ref={ref} className="relative w-56 h-56 md:w-64 md:h-64">
        <svg viewBox="0 0 240 240" className="w-full h-full -rotate-90 overflow-visible transition-transform duration-500 group-hover:scale-105">
          {Array.from({ length: TOTAL_DOTS }).map((_, i) => {
            const angle = (i / TOTAL_DOTS) * 2 * Math.PI;
            return (
              <circle
                key={i}
                cx={(120 + 86 * Math.cos(angle)).toFixed(2)}
                cy={(120 + 86 * Math.sin(angle)).toFixed(2)}
                r={2.4}
                fill={i < active ? g.hex : '#262626'}
                opacity={i < active ? 1 : 0.65}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-5xl font-extrabold tracking-tight leading-none tabular-nums">{val}%</span>
          <span className={`text-[11px] font-mono uppercase tracking-[0.2em] mt-3 font-semibold ${g.text}`}>{g.label}</span>
        </div>
      </div>
      <div className="w-full mt-8 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold mb-2">{g.title}</h3>
        <p className="text-sm text-muted leading-relaxed">{g.body}</p>
        <p className="text-[11px] font-mono text-muted/60 mt-4 uppercase tracking-widest group-hover:text-muted transition-colors">Click to replay</p>
      </div>
    </button>
  );
}

export default function TelemetryGauges() {
  return (
    <InfoSection
      id="results"
      label="Results"
      title="The measurable impact of a stronger brand."
      note="Illustrative engagement benchmarks. Click a gauge to replay."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {gauges.map((g) => (
          <Gauge key={g.label} g={g} />
        ))}
      </div>
    </InfoSection>
  );
}

'use client';

import { useState } from 'react';
import InfoSection from './InfoSection';

type Mode = 'capital' | 'hours';

const TOTAL_CAPITAL = 2_400_000;
const TOTAL_HOURS = 4680;

const phases = [
  { name: 'Pre-Purchase', share: 45, fill: '#F4B223', text: 'text-gold', bar: 'bg-gold', dot: 'bg-gold' },
  { name: 'Purchase (Delivery)', share: 35, fill: '#6B7280', text: 'text-white', bar: 'bg-steel', dot: 'bg-steel' },
  { name: 'Post-Purchase', share: 20, fill: '#2DD4BF', text: 'text-aqua', bar: 'bg-aqua', dot: 'bg-aqua' },
];

const bars = [
  { label: 'Thought leadership & PR', pct: 25, phase: 0 },
  { label: 'Account advisory pitches', pct: 20, phase: 0 },
  { label: 'Dedicated strategy squads', pct: 22, phase: 1 },
  { label: 'Architecture review & sprints', pct: 13, phase: 1 },
  { label: 'Governance & recurring retainers', pct: 20, phase: 2 },
];

function format(mode: Mode, pct: number) {
  if (mode === 'capital') {
    const v = (pct / 100) * TOTAL_CAPITAL;
    return v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(2)}M` : `$${Math.round(v / 1000)}k`;
  }
  return `${Math.round((pct / 100) * TOTAL_HOURS).toLocaleString('en-US')} hrs`;
}

export default function LifecycleWheel() {
  const [mode, setMode] = useState<Mode>('capital');
  const [hover, setHover] = useState<number | null>(null);

  const dim = (i: number) => (hover === null || hover === i ? 1 : 0.3);

  return (
    <InfoSection
      id="lifecycle"
      label="Lifecycle"
      title="Where brand investment goes across the client journey."
      note="Hover a phase to isolate it. Toggle between capital and executive time."
    >
      <div className="flex justify-end mb-6">
        <div className="inline-flex bg-surface-light border border-border p-1 rounded-btn">
          {(['capital', 'hours'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-5 py-2 text-xs font-semibold rounded-btn transition-colors duration-200 ${
                mode === m ? 'bg-gold text-primary' : 'text-muted hover:text-white'
              }`}
            >
              {m === 'capital' ? 'Capital Invested ($)' : 'Executive Time (Hrs)'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-card p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-3 space-y-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Total engagement audit</p>
            <p className="text-4xl lg:text-5xl font-extrabold font-mono tracking-tight mt-1">
              {mode === 'capital' ? '$2.40M' : '4,680 hrs'}
            </p>
          </div>
          <div className="space-y-3.5 pt-6 border-t border-border">
            {phases.map((p, i) => (
              <button
                key={p.name}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="w-full flex items-center justify-between transition-opacity duration-200"
                style={{ opacity: dim(i) }}
              >
                <span className="flex items-center gap-2.5 text-xs font-medium">
                  <span className={`w-3 h-3 rounded-full ${p.dot}`} />
                  {p.name}
                </span>
                <span className={`text-xs font-mono font-semibold ${p.text}`}>
                  {p.share}% ({format(mode, p.share)})
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center">
          <svg viewBox="0 0 320 320" className="w-72 h-72 sm:w-80 sm:h-80 -rotate-90">
            <path
              d="M 160 160 L 160 15 A 145 145 0 0 1 297.89 204.81 Z"
              fill="#F4B223"
              style={{ opacity: dim(0), transition: 'opacity 0.2s' }}
              onMouseEnter={() => setHover(0)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
            />
            <path
              d="M 160 160 L 278.88 198.63 A 125 125 0 0 1 58.89 233.47 Z"
              fill="#6B7280"
              style={{ opacity: dim(1), transition: 'opacity 0.2s' }}
              onMouseEnter={() => setHover(1)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
            />
            <path
              d="M 160 160 L 75.07 221.71 A 105 105 0 0 1 160 55 Z"
              fill="#2DD4BF"
              style={{ opacity: dim(2), transition: 'opacity 0.2s' }}
              onMouseEnter={() => setHover(2)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer"
            />
            <circle cx="160" cy="160" r="50" fill="#111111" stroke="#222222" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between text-xs font-mono text-muted pb-2 border-b border-border">
            <span>Touchpoint</span>
            <span>{mode === 'capital' ? 'Capital' : 'Hours'} &bull; Weight</span>
          </div>
          {bars.map((b) => {
            const p = phases[b.phase];
            return (
              <div key={b.label} className="transition-opacity duration-200" style={{ opacity: dim(b.phase) }}>
                <div className="flex justify-between mb-1.5 text-xs">
                  <span>
                    <span className="font-mono text-muted mr-2">{['Pre', 'Pur', 'Post'][b.phase]}</span>
                    {b.label}
                  </span>
                  <span className={`font-mono ${p.text}`}>
                    {format(mode, b.pct)} ({b.pct}%)
                  </span>
                </div>
                <div className="w-full bg-surface-light h-2 rounded-full overflow-hidden">
                  <div className={`${p.bar} h-full rounded-full transition-all duration-700`} style={{ width: `${b.pct * 3}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </InfoSection>
  );
}

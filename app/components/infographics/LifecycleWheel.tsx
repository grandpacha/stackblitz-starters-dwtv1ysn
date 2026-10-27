'use client';

import { useState } from 'react';
import InfoSection from './InfoSection';
import { useInView } from './useInView';

type Mode = 'capital' | 'hours';

// Weekly capital in $k across a 60-week client lifecycle (illustrative). Each phase averages $40k a week.
const WEEKLY = [
  21.1, 23.8, 18.9, 27.5, 27.3, 22.2, 29.6, 25.2, 30.6, 41.6, 31.3, 34.2, 34.4, 30.0, 50.3, 49.1, 41.6, 47.8, 34.2, 47.0, 65.1, 53.2, 61.3,
  52.7, 42.8, 70.6, 66.6, 74.9, 60.7, 60.9, 60.0, 43.9, 70.2, 70.9, 56.4, 61.4, 40.0, 39.0, 46.2, 30.8, 29.6, 23.2, 14.2, 16.2, 11.8, 9.1, 11.2,
  9.4, 37.9, 43.8, 62.3, 46.3, 48.9, 49.9, 35.8, 42.8, 32.8, 22.4, 29.3, 27.8,
];
const HOURS_PER_K = 1.95;

const phases = [
  { name: 'Pre-purchase', short: 'PRE-PURCHASE', weeks: 27, share: 45, color: '#F4B223', text: 'text-gold', dot: 'bg-gold' },
  { name: 'Purchase', short: 'PURCHASE', weeks: 21, share: 35, color: '#6B7280', text: 'text-white', dot: 'bg-steel' },
  { name: 'Post-purchase', short: 'POST-PURCHASE', weeks: 12, share: 20, color: '#2DD4BF', text: 'text-aqua', dot: 'bg-aqua' },
];

const channels = [
  { label: 'Thought leadership & PR', pct: 25, phase: 0 },
  { label: 'Account advisory pitches', pct: 20, phase: 0 },
  { label: 'Dedicated strategy squads', pct: 22, phase: 1 },
  { label: 'Architecture review & sprints', pct: 13, phase: 1 },
  { label: 'Governance & retainers', pct: 20, phase: 2 },
];

const CX = 500;
const CY = 500;
const R0 = 172;
const RMAX = 405;
const VMAX = 80;
const START = 120;
const PITCH = 5;
const rOf = (v: number) => R0 + (v / VMAX) * (RMAX - R0);
const pt = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.sin(a), CY - r * Math.cos(a)] as const;
};
const f1 = (n: number) => n.toFixed(1);

const phaseOf = (week: number) => (week < 27 ? 0 : week < 48 ? 1 : 2);
const phaseStart = [0, 27, 48];

function fmt(mode: Mode, k: number, compact = false) {
  if (mode === 'capital') {
    if (!compact && k >= 1000) return `$${(k / 1000).toFixed(2)}M`;
    return `$${Math.round(k)}k`;
  }
  const h = Math.round(k * HOURS_PER_K);
  return `${h.toLocaleString('en-US')} hrs`;
}

export default function LifecycleWheel() {
  const [mode, setMode] = useState<Mode>('capital');
  const [week, setWeek] = useState<number | null>(null);
  const [phaseHover, setPhaseHover] = useState<number | null>(null);
  const { ref, seen } = useInView<HTMLDivElement>(0.25);

  const activePhase = week !== null ? phaseOf(week) : phaseHover;
  const dim = (p: number) => (activePhase === null || activePhase === p ? 1 : 0.22);
  const totals = [1080, 840, 480];

  const rings = [20, 40, 60, 80];

  return (
    <InfoSection
      id="lifecycle"
      label="Lifecycle"
      title="Where brand investment goes across the client journey."
      note="Each spoke is one week of a 60-week engagement. Hover a spoke or a phase."
    >
      <div className="flex justify-end mb-6">
        <div className="inline-flex bg-surface-light border border-border p-1 rounded-btn">
          {(['capital', 'hours'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`px-5 py-2 text-xs font-semibold rounded-btn transition-colors duration-200 ${
                mode === m ? 'bg-gold text-primary' : 'text-muted hover:text-white'
              }`}
            >
              {m === 'capital' ? 'Capital invested ($)' : 'Executive time (hrs)'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-card grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        <div ref={ref} className="lg:col-span-7 p-4 sm:p-8 lg:border-r border-border">
          <svg viewBox="-100 -34 1200 970" className="w-full h-auto" role="img" aria-label="Radial bar chart of weekly spend across a 60-week client lifecycle">
            {rings.map((v) => (
              <circle key={v} cx={CX} cy={CY} r={rOf(v)} fill="none" stroke={v === 80 ? '#383838' : '#2b2b2b'} strokeWidth="1.5" />
            ))}

            {WEEKLY.map((v, i) => {
              const p = phaseOf(i);
              const deg = START + PITCH * (i + 0.5);
              const [x0, y0] = pt(R0, deg);
              const [x1, y1] = pt(rOf(v), deg);
              const [x2, y2] = pt(RMAX, deg);
              const len = rOf(v) - R0;
              const on = week === i;
              return (
                <g key={i} onMouseEnter={() => setWeek(i)} onMouseLeave={() => setWeek(null)} style={{ opacity: dim(p), transition: 'opacity 0.2s' }}>
                  <line x1={f1(x1)} y1={f1(y1)} x2={f1(x2)} y2={f1(y2)} stroke={phases[p].color} strokeWidth="1.2" opacity="0.28" />
                  <line
                    x1={f1(x0)}
                    y1={f1(y0)}
                    x2={f1(x1)}
                    y2={f1(y1)}
                    stroke={on ? '#FFFFFF' : phases[p].color}
                    strokeWidth="7.4"
                    strokeDasharray={len}
                    strokeDashoffset={seen ? 0 : len}
                    style={{ transition: `stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 14}ms, stroke 0.15s` }}
                  />
                  <line x1={f1(x0)} y1={f1(y0)} x2={f1(x2)} y2={f1(y2)} stroke="transparent" strokeWidth="24" />
                </g>
              );
            })}

            {[...phaseStart, 60].map((w, k) => {
              const deg = START + PITCH * w;
              const [x0, y0] = pt(R0 - 8, deg);
              const [x1, y1] = pt(RMAX + 34, deg);
              const [lx, ly] = pt(RMAX + 56, deg);
              const p = phases[k];
              const right = Math.sin((deg * Math.PI) / 180) > 0.2;
              const left = Math.sin((deg * Math.PI) / 180) < -0.2;
              const anchor = right ? 'start' : left ? 'end' : 'middle';
              return (
                <g key={w} style={{ opacity: k < 3 ? dim(k) : 0.6, transition: 'opacity 0.2s' }}>
                  <line x1={f1(x0)} y1={f1(y0)} x2={f1(x1)} y2={f1(y1)} stroke="#8a8a8a" strokeWidth="1.5" />
                  <circle cx={f1(x0)} cy={f1(y0)} r="4" fill="#8a8a8a" />
                  <circle cx={f1(x1)} cy={f1(y1)} r="4" fill="#8a8a8a" />
                  {p && (
                    <g className="hidden sm:block">
                      <text x={f1(lx)} y={f1(ly - 4)} textAnchor={anchor} fill="#FFFFFF" fontSize="24" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                        {p.short}
                      </text>
                      <text x={f1(lx)} y={f1(ly + 24)} textAnchor={anchor} fill="#999999" fontSize="20" fontFamily="'JetBrains Mono', monospace">
                        {p.weeks} WKS · {p.share}%
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            <g textAnchor="middle" style={{ pointerEvents: 'none' }}>
              <text x={CX} y={CY - 52} fill="#999999" fontSize="18" letterSpacing="3" fontFamily="'JetBrains Mono', monospace">
                {week === null ? 'TOTAL LIFECYCLE' : `WEEK ${week + 1} · ${phases[phaseOf(week)].short}`}
              </text>
              <text x={CX} y={CY + 20} fill="#FFFFFF" fontSize="58" fontWeight="800" letterSpacing="-1.5" fontFamily="Inter, sans-serif">
                {week === null ? (mode === 'capital' ? '$2.40M' : '4,680 hrs') : fmt(mode, WEEKLY[week], true)}
              </text>
              <text x={CX} y={CY + 62} fill="#999999" fontSize="18" fontFamily="'JetBrains Mono', monospace">
                {week === null ? '60 weeks · 3 phases' : `${((WEEKLY[week] / 2400) * 100).toFixed(1)}% of total`}
              </text>
            </g>
          </svg>
          <p className="mt-1 text-center font-mono text-[11px] text-muted">
            Rings = {rings.map((v) => fmt(mode, v, true)).join(' · ')} per week
          </p>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col gap-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Total engagement audit</p>
            <p className="text-4xl lg:text-5xl font-extrabold font-mono tracking-tight mt-1">{mode === 'capital' ? '$2.40M' : '4,680 hrs'}</p>
          </div>

          <div className="space-y-1">
            {phases.map((p, i) => (
              <button
                key={p.name}
                onMouseEnter={() => setPhaseHover(i)}
                onMouseLeave={() => setPhaseHover(null)}
                onFocus={() => setPhaseHover(i)}
                onBlur={() => setPhaseHover(null)}
                className="w-full grid grid-cols-[1fr_auto] items-center gap-4 py-3 border-t border-border text-left transition-opacity duration-200"
                style={{ opacity: dim(i) }}
              >
                <span className="flex items-center gap-3 text-sm font-medium">
                  <span className={`w-3 h-3 rounded-full ${p.dot}`} />
                  {p.name}
                  <span className="font-mono text-[11px] text-muted">
                    {phaseStart[i] + 1}&ndash;{phaseStart[i] + p.weeks}
                  </span>
                </span>
                <span className={`font-mono text-xs font-semibold ${p.text}`}>
                  {p.share}% &middot; {fmt(mode, totals[i])}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-xs font-mono text-muted pb-2 border-b border-border">
              <span>Channel</span>
              <span>{mode === 'capital' ? 'Capital' : 'Hours'} &bull; Weight</span>
            </div>
            {channels.map((c) => {
              const p = phases[c.phase];
              return (
                <div key={c.label} className="transition-opacity duration-200" style={{ opacity: dim(c.phase) }}>
                  <div className="flex justify-between mb-1.5 text-xs">
                    <span>{c.label}</span>
                    <span className={`font-mono ${p.text}`}>
                      {fmt(mode, (c.pct / 100) * 2400)} ({c.pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-surface-light h-[3px] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${c.pct * 3}%`, background: p.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </InfoSection>
  );
}

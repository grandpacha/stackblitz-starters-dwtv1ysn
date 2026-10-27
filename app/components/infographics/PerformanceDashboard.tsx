'use client';

import { useMemo, useState } from 'react';
import SectionHead from '../SectionHead';
import ScrollAnimation from '../ScrollAnimation';
import { useInView } from './useInView';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

type MetricKey = 'revenue' | 'margin' | 'retention' | 'equity';

const metrics: Record<
  MetricKey,
  {
    label: string;
    headline: string;
    total: string;
    totalLabel: string;
    wave: [number, number, number, number];
    kpis: { label: string; value: string; caption: string; wave: [number, number, number, number] }[];
    sectors: number[];
  }
> = {
  revenue: {
    label: 'Revenue',
    headline: 'Client revenue growth',
    total: '41',
    totalLabel: 'Active mandates',
    wave: [48, 14, 0.55, 1.4],
    kpis: [
      { label: 'Avg. revenue lift', value: '+38.4%', caption: '12 months after launch', wave: [50, 18, 0.9, 0] },
      { label: 'Pipeline growth', value: '2.1x', caption: 'Qualified opportunities', wave: [45, 16, 1.3, 1] },
      { label: 'Win rate', value: '+11 pts', caption: 'Competitive pitches', wave: [52, 14, 1.1, 2] },
    ],
    sectors: [78, 52, 84, 64, 92, 40],
  },
  margin: {
    label: 'Margin',
    headline: 'Gross margin expansion',
    total: '6.2',
    totalLabel: 'Avg. points gained',
    wave: [42, 12, 0.7, 0.4],
    kpis: [
      { label: 'Price realization', value: '+9.6%', caption: 'Net of discounting', wave: [40, 15, 1.2, 0.5] },
      { label: 'Discount depth', value: '−31%', caption: 'vs. pre-engagement', wave: [55, 12, 0.8, 1.6] },
      { label: 'Premium mix', value: '44%', caption: 'Share of revenue', wave: [46, 17, 1.0, 2.6] },
    ],
    sectors: [61, 74, 48, 82, 55, 70],
  },
  retention: {
    label: 'Retention',
    headline: 'Customer retention',
    total: '94%',
    totalLabel: 'Client renewal rate',
    wave: [58, 10, 0.45, 2.1],
    kpis: [
      { label: 'Net retention', value: '118%', caption: 'Expansion included', wave: [56, 13, 1.4, 0.2] },
      { label: 'Churn reduction', value: '−42%', caption: 'Year over year', wave: [48, 15, 0.9, 1.9] },
      { label: 'Referral share', value: '36%', caption: 'Of new business', wave: [44, 18, 1.2, 3.1] },
    ],
    sectors: [88, 69, 73, 58, 81, 66],
  },
  equity: {
    label: 'Brand Equity',
    headline: 'Brand preference index',
    total: '3.4x',
    totalLabel: 'Aided awareness lift',
    wave: [44, 16, 0.6, 2.8],
    kpis: [
      { label: 'Preference', value: '+27 pts', caption: 'Category tracking study', wave: [42, 19, 1.0, 0.9] },
      { label: 'Share of voice', value: '2.6x', caption: 'Earned + owned', wave: [50, 14, 1.5, 2.2] },
      { label: 'Consideration', value: '+19 pts', caption: 'Target segments', wave: [47, 16, 0.8, 0.1] },
    ],
    sectors: [70, 86, 57, 77, 49, 83],
  },
};

const SECTORS = ['Consumer Goods', 'Healthcare', 'Technology', 'Professional Services', 'Hospitality', 'Industrial'];

function series(n: number, [base, amp, freq, phase]: [number, number, number, number], trend = 0.9) {
  return Array.from({ length: n }, (_, i) => {
    const v = base + amp * Math.sin(i * freq + phase) + amp * 0.45 * Math.sin(i * freq * 2.7 + phase * 1.3) + trend * i;
    return Math.round(Math.max(8, Math.min(98, v)));
  });
}

function sparkPath(values: number[], w: number, h: number) {
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - (v / 100) * h] as const);
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const icons: Record<MetricKey, JSX.Element> = {
  revenue: <path d="M3 17l5-5 4 4 8-8M14 8h6v6" />,
  margin: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  retention: <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5" />,
  equity: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
};

export default function PerformanceDashboard() {
  const [metric, setMetric] = useState<MetricKey>('revenue');
  const [hover, setHover] = useState<number | null>(null);
  const { ref, seen } = useInView<HTMLDivElement>(0.25);
  const m = metrics[metric];

  const bars = useMemo(() => series(24, m.wave), [m]);
  const delta = (((bars[23] - bars[0]) / bars[0]) * 100).toFixed(2);
  const sparks = useMemo(() => m.kpis.map((k) => sparkPath(series(9, k.wave, 0.6), 120, 32)), [m]);

  return (
    <section id="outcomes" className="py-section scroll-mt-24">
      <div className="container-x">
        <SectionHead
          label="Outcomes"
          title="What a sharper brand does to the numbers."
          intro="Illustrative portfolio data across recent engagements. Switch metrics and hover the bars."
        />

        <ScrollAnimation>
          <div ref={ref} className="border border-border bg-surface rounded-card overflow-hidden grid grid-cols-1 lg:grid-cols-[240px_1fr]">
            <aside className="border-b lg:border-b-0 lg:border-r border-border bg-[#0D0D0D] p-6 lg:p-8 flex lg:flex-col gap-6 lg:gap-0">
              <div className="hidden lg:flex items-center gap-3 mb-16">
                <span className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center font-mono text-[11px] text-gold">C+F</span>
                <div>
                  <p className="text-sm font-semibold">Portfolio</p>
                  <p className="text-xs text-muted">2025–2026</p>
                </div>
              </div>
              <nav className="flex lg:flex-col gap-1 overflow-x-auto -mx-2 lg:mx-0" aria-label="Metrics">
                {(Object.keys(metrics) as MetricKey[]).map((k) => {
                  const on = k === metric;
                  return (
                    <button
                      key={k}
                      onClick={() => setMetric(k)}
                      aria-pressed={on}
                      className={`relative shrink-0 flex items-center gap-3 px-3 py-3 rounded text-left font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                        on ? 'text-white' : 'text-white/40 hover:text-white/70'
                      }`}
                    >
                      {on && <span className="hidden lg:block absolute -left-8 top-2 bottom-2 w-[2px] bg-gold" />}
                      <svg viewBox="0 0 24 24" className={`w-4 h-4 shrink-0 ${on ? 'text-gold' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {icons[k]}
                      </svg>
                      {metrics[k].label}
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div className="p-6 md:p-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="mono-label">Client outcomes</p>
                  <p className="text-2xl md:text-3xl font-semibold tracking-tight mt-2">{m.headline}</p>
                </div>
                <div className="text-right">
                  <p className="mono-label">{m.totalLabel}</p>
                  <p className="text-2xl md:text-3xl font-semibold tracking-tight mt-2 tabular-nums">{m.total}</p>
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between">
                <p className="mono-label">Monthly index</p>
                <span className="font-mono text-[11px] px-3 py-1.5 rounded bg-surface-light border border-border-light text-gold">
                  {Number(delta) >= 0 ? '+' : ''}
                  {delta}%
                </span>
              </div>

              <div className="relative mt-6 h-48 md:h-56 flex items-stretch justify-between gap-1" onMouseLeave={() => setHover(null)}>
                {bars.map((v, i) => {
                  const on = hover === i;
                  return (
                    <button
                      key={i}
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      className="relative flex-1 flex flex-col items-center justify-end group"
                      aria-label={`${MONTHS[i % 12]} ${i < 12 ? '2025' : '2026'}: index ${v}`}
                    >
                      <span className="absolute inset-x-0 top-0 bottom-6 flex justify-center items-end">
                        <span className="absolute inset-y-0 w-px bg-white/[0.06]" />
                        <span
                          className={`relative w-[2px] transition-colors duration-200 ${on ? 'bg-gold' : hover === null ? 'bg-white/80' : 'bg-white/30'}`}
                          style={{
                            height: seen ? `${v}%` : '0%',
                            transition: `height 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 25}ms, background-color 0.2s`,
                          }}
                        />
                      </span>
                      <span className={`mt-2 h-4 font-mono text-[8px] tracking-wider ${on ? 'text-gold' : 'text-white/25'} hidden sm:block`}>{MONTHS[i % 12]}</span>
                      {on && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap px-2 py-1 rounded bg-white text-primary font-mono text-[10px] z-10">
                          {MONTHS[i % 12]} &rsquo;{i < 12 ? '25' : '26'} &middot; {v}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 border-t border-border pt-10">
                {m.kpis.map((k, i) => (
                  <div key={k.label}>
                    <p className="mono-label">{k.label}</p>
                    <svg viewBox="0 0 120 32" className="mt-4 w-28 h-8 overflow-visible">
                      <path d={sparks[i]} fill="none" stroke={i === 0 ? '#F4B223' : '#FFFFFF'} strokeWidth="1.6" strokeLinecap="round" style={{ transition: 'd 0.6s ease' }} />
                    </svg>
                    <p className="mt-4 text-xl font-semibold tabular-nums">{k.value}</p>
                    <p className="text-xs text-muted mt-1">{k.caption}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 border-t border-border pt-10">
                {SECTORS.map((s, i) => (
                  <div key={s} className="grid grid-cols-[1fr_1.2fr_2.5rem] items-center gap-4">
                    <span className="mono-label !text-white/80 !tracking-[0.14em] truncate">{s}</span>
                    <span className="h-[2px] bg-border-light relative overflow-hidden">
                      <span
                        className="absolute inset-y-0 left-0 bg-white"
                        style={{ width: seen ? `${m.sectors[i]}%` : '0%', transition: `width 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms` }}
                      />
                    </span>
                    <span className="font-mono text-[11px] text-muted text-right tabular-nums">{m.sectors[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

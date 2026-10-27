'use client';

import { useState } from 'react';
import InfoSection from './InfoSection';
import { useInView } from './useInView';

type Key = 'aqua' | 'steel' | 'gold';

const series: { key: Key; label: string; bar: string; text: string }[] = [
  { key: 'aqua', label: 'Repositioned brand', bar: 'bg-aqua', text: 'text-aqua' },
  { key: 'steel', label: 'Industry median', bar: 'bg-steel', text: 'text-muted' },
  { key: 'gold', label: 'High-friction baseline', bar: 'bg-gold', text: 'text-gold' },
];

const rows: { q: string; v: Partial<Record<Key, number>> }[] = [
  { q: 'Lead generation has been an ongoing challenge for our firm.', v: { aqua: 38, steel: 63 } },
  { q: 'Meeting sales goals has been a challenge for us.', v: { aqua: 13, steel: 38, gold: 50 } },
  { q: 'Our clients always have a great, referenceable experience.', v: { aqua: 63, steel: 38 } },
  { q: 'Differentiating our value in the market has been a challenge.', v: { aqua: 25, steel: 63, gold: 13 } },
  { q: 'We are very communicative and transparent with our accounts.', v: { aqua: 88, steel: 13 } },
  { q: 'We struggle to delegate high-leverage tasks within our team.', v: { steel: 63, gold: 38 } },
];

export default function FrictionBenchmark() {
  const { ref, seen } = useInView<HTMLDivElement>(0.15);
  const [hidden, setHidden] = useState<Key[]>([]);

  const toggle = (k: Key) => setHidden((h) => (h.includes(k) ? h.filter((x) => x !== k) : [...h, k]));

  return (
    <InfoSection
      id="diagnostic"
      label="Diagnostic"
      title="Where growth-stage firms feel the friction."
      note="Use the legend to filter series. Illustrative benchmark data."
    >
      <div ref={ref} className="bg-surface border border-border rounded-card p-6 sm:p-10 space-y-8">
        <div className="flex flex-wrap items-center justify-end gap-3 pb-4 border-b border-border">
          {series.map((s) => {
            const off = hidden.includes(s.key);
            return (
              <button
                key={s.key}
                onClick={() => toggle(s.key)}
                aria-pressed={!off}
                className={`flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-btn border transition-all ${
                  off ? 'border-border text-muted/50' : 'border-border-light text-white'
                }`}
              >
                <span className={`w-3 h-3 rounded-sm ${s.bar} ${off ? 'opacity-30' : ''}`} />
                {s.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-6">
          {rows.map((row, ri) => (
            <div key={row.q} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pb-5 border-b border-border last:border-0 last:pb-0">
              <p className="md:col-span-4 text-sm font-medium pr-2">{row.q}</p>
              <div className="md:col-span-8 space-y-2">
                {series
                  .filter((s) => row.v[s.key] !== undefined && !hidden.includes(s.key))
                  .map((s) => (
                    <div key={s.key} className="flex items-center gap-3">
                      <div className="w-full bg-surface-light h-4 rounded-sm overflow-hidden">
                        <div
                          className={`${s.bar} h-full rounded-sm`}
                          style={{
                            width: seen ? `${row.v[s.key]}%` : '0%',
                            transition: `width 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${ri * 80}ms`,
                          }}
                        />
                      </div>
                      <span className={`font-mono text-xs font-bold w-12 text-right ${s.text}`}>{row.v[s.key]}%</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-border">
          <div className="md:col-span-4" />
          <div className="md:col-span-8 flex justify-between font-mono text-[11px] text-muted px-1">
            {['0%', '25%', '50%', '75%', '100%'].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </InfoSection>
  );
}

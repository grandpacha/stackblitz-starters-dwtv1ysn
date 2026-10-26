'use client';

import { useState } from 'react';
import InfoSection from './InfoSection';

const radii = [160, 148, 136, 124, 112, 100];
const rails = ['#222222', '#262626', '#2A2A2A', '#333333', '#3A3A3A', '#444444'];

const presets = [
  { label: 'Commodity brand', value: 38 },
  { label: 'Repositioned', value: 74.2 },
  { label: 'Category leader', value: 92 },
];

export default function HorseshoeGauge() {
  const [pct, setPct] = useState(74.2);

  return (
    <InfoSection
      id="defensibility"
      label="Defensibility"
      title="Why defensible brands hold their value."
      note="Drag the slider to model how much of your brand value is protected."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 bg-surface border border-border rounded-card p-8 sm:p-12 flex justify-center">
          <div className="relative w-full max-w-[380px] aspect-[360/380]">
            <svg viewBox="0 0 360 380" className="w-full h-full">
              {radii.map((r, i) => {
                const x = 180 - r;
                const d = `M ${x} 360 L ${x} 160 A ${r} ${r} 0 0 1 ${360 - x} 160 L ${360 - x} 360`;
                return (
                  <g key={r} fill="none" strokeWidth="6" strokeLinecap="round">
                    <path d={d} stroke={rails[i]} />
                    <path
                      d={d}
                      stroke="#F4B223"
                      pathLength={100}
                      strokeDasharray={`${pct} 100`}
                      style={{ transition: 'stroke-dasharray 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                  </g>
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-4">
              <span className="text-4xl lg:text-5xl font-extrabold font-mono tracking-tight leading-none tabular-nums">{pct.toFixed(1)}%</span>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gold mt-2 font-semibold">Value defense</span>
              <span className="text-[10px] font-mono text-muted mt-1">vs {(100 - pct).toFixed(1)}% exposed</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-h3">A distinctive brand sets a floor under your pricing.</h3>
          <p className="text-muted leading-relaxed text-lg">
            A brand that is clearly differentiated and relevant is harder for competitors to copy and for buyers to commoditize. That is what protects margin when markets tighten.
          </p>
          <div className="space-y-3 pt-2">
            <label htmlFor="defense" className="flex justify-between text-xs font-mono">
              <span>Brand value defended</span>
              <span className="text-gold">{pct.toFixed(1)}%</span>
            </label>
            <input id="defense" type="range" min={0} max={100} step={0.1} value={pct} onChange={(e) => setPct(parseFloat(e.target.value))} className="w-full" />
            <div className="flex flex-wrap gap-2 pt-2">
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setPct(p.value)}
                  className="px-4 py-2 rounded-btn text-xs font-mono border border-border-light text-muted hover:text-white hover:border-white transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </InfoSection>
  );
}

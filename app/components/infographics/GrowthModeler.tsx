'use client';

import { useState } from 'react';
import Link from 'next/link';
import InfoSection from './InfoSection';

const BASE_MULTIPLE = 6.0;
const MULTIPLE_UPLIFT = 3.75;

const money = (m: number) => `$${m.toFixed(2)}M`;

export default function GrowthModeler() {
  const [revenue, setRevenue] = useState(25);
  const [margin, setMargin] = useState(20);

  const ebitda = revenue * (margin / 100);
  const base = ebitda * BASE_MULTIPLE;
  const delta = ebitda * MULTIPLE_UPLIFT;
  const next = base + delta;

  return (
    <InfoSection
      id="modeler"
      label="Growth Modeler"
      title="What could a stronger brand be worth to your business?"
      note="An illustrative model. It assumes a repositioned brand can lift your EBITDA multiple."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div className="lg:col-span-6 bg-surface border border-border rounded-card p-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-1">Adjust your baseline</h3>
            <p className="text-sm text-muted leading-relaxed">Move the sliders to see the impact of repositioning on enterprise value.</p>
          </div>

          <div className="space-y-3">
            <label htmlFor="rev" className="flex justify-between text-xs font-mono">
              <span>Annual revenue</span>
              <span className="text-gold font-bold">${revenue},000,000</span>
            </label>
            <input id="rev" type="range" min={10} max={100} step={5} value={revenue} onChange={(e) => setRevenue(parseInt(e.target.value, 10))} className="w-full" />
            <div className="flex justify-between text-[10px] font-mono text-muted">
              <span>$10M</span>
              <span>$100M+</span>
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="margin" className="flex justify-between text-xs font-mono">
              <span>EBITDA margin</span>
              <span className="text-aqua font-bold">{margin}%</span>
            </label>
            <input id="margin" type="range" min={10} max={40} step={1} value={margin} onChange={(e) => setMargin(parseInt(e.target.value, 10))} className="w-full" />
            <div className="flex justify-between text-[10px] font-mono text-muted">
              <span>10%</span>
              <span>40%</span>
            </div>
          </div>

          <p className="pt-4 border-t border-border text-xs font-mono text-muted">
            Baseline multiple: <span className="text-white">{BASE_MULTIPLE.toFixed(1)}x</span> &bull; Repositioned:{' '}
            <span className="text-gold font-bold">{(BASE_MULTIPLE + MULTIPLE_UPLIFT).toFixed(2)}x</span> EBITDA
          </p>
        </div>

        <div className="lg:col-span-6 bg-surface-light border border-border rounded-card p-8 lg:p-10 flex flex-col justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-muted block">Potential value uplift</span>
            <div className="text-4xl lg:text-5xl font-extrabold font-mono tracking-tight leading-none mt-2 tabular-nums">+{money(delta)}</div>
            <span className="text-xs font-mono text-gold block pt-2">+{MULTIPLE_UPLIFT.toFixed(2)}x multiple expansion</span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border font-mono">
            <div className="p-4 rounded-xl bg-surface border border-border">
              <span className="text-muted text-[11px] block mb-1">Baseline valuation</span>
              <span className="text-lg font-bold tabular-nums">{money(base)}</span>
            </div>
            <div className="p-4 rounded-xl bg-surface border border-border">
              <span className="text-muted text-[11px] block mb-1">Repositioned valuation</span>
              <span className="text-lg font-bold text-aqua tabular-nums">{money(next)}</span>
            </div>
          </div>

          <Link
            href="/contact"
            className="w-full text-center bg-white text-primary text-sm font-semibold py-3.5 rounded-btn hover:bg-cream hover:scale-[1.02] transition duration-200"
          >
            Talk to us about your brand &rarr;
          </Link>
        </div>
      </div>
    </InfoSection>
  );
}

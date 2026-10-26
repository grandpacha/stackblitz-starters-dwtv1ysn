'use client';

import { useState } from 'react';
import InfoSection from './InfoSection';
import { useInView } from './useInView';

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const kpis = [
  { v: '778', l: 'Brand audits', c: 'text-white' },
  { v: '94.2%', l: 'On-time sprints', c: 'text-gold' },
  { v: '41', l: 'Retainers', c: 'text-white' },
  { v: '35', l: 'Global mandates', c: 'text-aqua' },
  { v: '63', l: 'Workshops', c: 'text-white' },
  { v: '13x', l: 'Valuation multiple', c: 'text-gold' },
];

const upper = 'M 0 240 C 80 190, 160 160, 250 170 C 340 180, 420 110, 520 130 C 620 150, 700 80, 800 120 C 900 160, 960 210, 1000 240';
const lower = 'M 0 240 C 100 230, 180 200, 280 210 C 380 220, 480 170, 580 180 C 680 190, 780 215, 880 220 C 940 225, 980 235, 1000 240';

export default function Streamgraph() {
  const { ref, seen } = useInView<HTMLDivElement>(0.2);
  const [show, setShow] = useState({ sprints: true, retainers: true });

  const toggle = (k: 'sprints' | 'retainers') => setShow((s) => ({ ...s, [k]: !s[k] }));

  return (
    <InfoSection
      id="volume"
      label="Engagement Volume"
      title="A steady rhythm of strategy work, all year."
      note="Toggle each series to compare repositioning sprints against recurring retainers."
    >
      <div className="bg-surface border border-border rounded-card p-6 sm:p-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-gold">Advisory volume reported</span>
            <p className="text-xs text-muted font-mono mt-1">Non-recurring sprints vs. recurring advisory, by month</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggle('sprints')}
              className={`px-4 py-2 rounded-btn text-xs font-mono border transition-colors ${show.sprints ? 'border-gold text-gold' : 'border-border-light text-muted'}`}
            >
              Repositioning sprints
            </button>
            <button
              onClick={() => toggle('retainers')}
              className={`px-4 py-2 rounded-btn text-xs font-mono border transition-colors ${show.retainers ? 'border-aqua text-aqua' : 'border-border-light text-muted'}`}
            >
              Retainers
            </button>
          </div>
        </div>

        <div ref={ref} className="overflow-x-auto">
          <div
            className="min-w-[640px]"
            style={{
              clipPath: seen ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
              transition: 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <svg viewBox="0 0 1000 280" className="w-full h-auto">
              <defs>
                <pattern id="sgHatchGold" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#F4B223" strokeWidth="1.2" opacity="0.4" />
                </pattern>
                <pattern id="sgHatchTeal" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#2DD4BF" strokeWidth="1.2" opacity="0.4" />
                </pattern>
              </defs>
              <line x1="0" y1="240" x2="1000" y2="240" stroke="#222222" />

              <g style={{ opacity: show.retainers ? 1 : 0, transition: 'opacity 0.4s' }}>
                <path d={`${lower} Z`} fill="url(#sgHatchTeal)" />
                <path d={lower} fill="none" stroke="#2DD4BF" strokeWidth="1.8" />
              </g>

              <g style={{ opacity: show.sprints ? 1 : 0, transition: 'opacity 0.4s' }}>
                <path d={`${upper} Z`} fill="url(#sgHatchGold)" />
                <path d={upper} fill="none" stroke="#F4B223" strokeWidth="1.8" />
                <line x1="250" y1="170" x2="250" y2="40" stroke="#F4B223" strokeDasharray="2,2" />
                <circle cx="250" cy="170" r="3.5" fill="#F4B223" />
                <text x="250" y="30" fill="#FFFFFF" fontSize="10" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">Q1 POSITIONING</text>
                <line x1="800" y1="120" x2="800" y2="40" stroke="#F4B223" strokeDasharray="2,2" />
                <circle cx="800" cy="120" r="3.5" fill="#F4B223" />
                <text x="800" y="30" fill="#FFFFFF" fontSize="10" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">Q4 EXIT ACCELERATION</text>
              </g>

              <g fill="#6B7280" fontSize="10" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">
                {months.map((m, i) => (
                  <text key={m} x={40 + i * 80} y="262">{m}</text>
                ))}
              </g>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 pt-8 border-t border-border font-mono text-center">
          {kpis.map((k) => (
            <div key={k.l} className="space-y-1">
              <span className={`text-2xl lg:text-3xl font-extrabold block ${k.c}`}>{k.v}</span>
              <span className="text-[10px] text-muted uppercase tracking-wider block">{k.l}</span>
            </div>
          ))}
        </div>
      </div>
    </InfoSection>
  );
}

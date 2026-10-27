'use client';

import { useState } from 'react';
import InfoSection from './InfoSection';

const tracks = [
  { name: 'Renewable IP Assets', amount: '$529.5M', color: '#2DD4BF', text: 'text-aqua', r: 180, w: 6, arc: 'M 240 90 A 180 180 0 1 1 112 397', end: [112, 397], y: 397 },
  { name: 'Enterprise Efficiency', amount: '$508.9M', color: '#5EEAD4', text: 'text-aqua', r: 154, w: 5, arc: 'M 240 116 A 154 154 0 1 1 131 379', end: [131, 379], y: 379 },
  { name: 'Sustainable Scaling', amount: '$466.0M', color: '#F4B223', text: 'text-gold', r: 128, w: 5, arc: 'M 240 142 A 128 128 0 1 1 149 360', end: [149, 360], y: 360 },
  { name: 'Digital Infrastructure', amount: '$100.0M', color: '#6B7280', text: 'text-white', r: 102, w: 4, arc: 'M 240 168 A 102 102 0 1 1 168 342', end: [168, 342], y: 342 },
  { name: 'Innovation Foundry', amount: '$57.5M', color: '#444444', text: 'text-muted', r: 76, w: 4, arc: 'M 240 194 A 76 76 0 1 1 186 323', end: [186, 323], y: 323 },
];

export default function CommitmentArcs() {
  const [active, setActive] = useState<number | null>(null);
  const dim = (i: number) => (active === null || active === i ? 1 : 0.2);

  return (
    <InfoSection
      id="capital"
      label="Capital"
      title="Targeted deployment of growth capital."
      note="Hover a line item to isolate its arc."
    >
      <div className="bg-surface border border-border rounded-card p-6 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h3 className="text-2xl font-bold">Where the investment goes</h3>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              Commitments are split between high-defensibility assets and recurring revenue lines. Each arc is proportional to total deployment.
            </p>
          </div>
          <div className="space-y-3 font-mono text-xs pt-4 border-t border-border">
            {tracks.map((t, i) => (
              <button
                key={t.name}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-light border border-border hover:border-border-light transition-all duration-200"
                style={{ opacity: dim(i) }}
              >
                <span className="flex items-center gap-3 font-sans text-sm">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                  {t.name}
                </span>
                <span className={`font-semibold ${t.text}`}>{t.amount}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-[620px] aspect-[620/470]">
            <svg viewBox="-70 0 620 470" className="w-full h-full">
              <circle cx="240" cy="270" r="180" fill="none" stroke="#1C1C1C" strokeDasharray="2,3" />
              {tracks.map((t, i) => (
                <g key={t.name} style={{ opacity: dim(i), transition: 'opacity 0.25s' }} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
                  <path d={t.arc} fill="none" stroke={t.color} strokeWidth={t.w} strokeLinecap="round" />
                  <circle cx={t.end[0]} cy={t.end[1]} r="4.5" fill={t.color} />
                  <path d={`M ${t.end[0]} ${t.y} L 52 ${t.y}`} fill="none" stroke={t.color} strokeWidth="1" opacity="0.6" />
                  <circle cx="52" cy={t.y} r="2.5" fill={t.color} />
                  <text x="42" y={t.y + 4} textAnchor="end" fill={t.color === '#444444' ? '#999999' : t.color} fontSize="12" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
                    {t.amount.replace('M', 'm')}
                  </text>
                </g>
              ))}

              <path d="M 240 90 L 160 90 L 90 90" fill="none" stroke="#F4B223" strokeWidth="1" />
              <circle cx="240" cy="90" r="3" fill="#F4B223" />
              <circle cx="90" cy="90" r="2.5" fill="#F4B223" />
              <text x="85" y="86" fill="#FFFFFF" fontSize="14" fontWeight="700" textAnchor="end">&gt;$942m</text>
              <text x="85" y="99" fill="#999999" fontSize="9" fontFamily="'JetBrains Mono', monospace" textAnchor="end">Recycled through repayments</text>

              <path d="M 240 90 L 320 50 L 420 50" fill="none" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="420" cy="50" r="2.5" fill="#FFFFFF" />
              <text x="425" y="46" fill="#FFFFFF" fontSize="20" fontWeight="800">&gt;$1b</text>
              <text x="425" y="60" fill="#999999" fontSize="9" fontFamily="'JetBrains Mono', monospace">New commitments 2026</text>
            </svg>
          </div>
        </div>
      </div>
    </InfoSection>
  );
}

'use client';

import { useMemo, useState } from 'react';
import InfoSection from './InfoSection';

const hubs = [
  { id: 'ny', name: 'Primary Hub • NY', short: 'New York', x: 236, y: 154, dir: -1, sign: -1, color: '#F4B223', coords: '40.7128° N, 74.0060° W', value: '$2.8B', blurb: 'Our primary hub, leading North American mandates and brand strategy engagements.' },
  { id: 'ldn', name: 'EMEA HQ • London', short: 'London', x: 488, y: 132, dir: 1, sign: -1, color: '#2DD4BF', coords: '51.5074° N, 0.1278° W', value: '$1.2B', blurb: 'Anchors European and Middle East engagements and cross-border brand rollouts.' },
  { id: 'sg', name: 'APAC Gateway • SG', short: 'Singapore', x: 772, y: 242, dir: 1, sign: 1, color: '#FFFFFF', coords: '1.3521° N, 103.8198° E', value: '$800M', blurb: 'Our gateway for Asia-Pacific growth, market entry and regional positioning work.' },
];

const clusters = [
  { minX: 140, maxX: 300, minY: 80, maxY: 230, step: 14 },
  { minX: 260, maxX: 360, minY: 250, maxY: 420, step: 16 },
  { minX: 450, maxX: 560, minY: 90, maxY: 180, step: 14 },
  { minX: 460, maxX: 580, minY: 190, maxY: 380, step: 16 },
  { minX: 570, maxX: 840, minY: 70, maxY: 260, step: 15 },
  { minX: 780, maxX: 900, minY: 320, maxY: 420, step: 16 },
];

export default function WorldMap() {
  const [active, setActive] = useState<string>('ny');

  const dots = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    clusters.forEach((c) => {
      for (let x = c.minX; x <= c.maxX; x += c.step) {
        for (let y = c.minY; y <= c.maxY; y += c.step) {
          const water = (x > 220 && x < 260 && y > 180 && y < 240) || (x > 500 && x < 540 && y > 150 && y < 190);
          if (!water) out.push({ x, y });
        }
      }
    });
    return out;
  }, []);

  const current = hubs.find((h) => h.id === active)!;

  return (
    <InfoSection
      id="global-reach"
      label="Global Reach"
      title="Brand strategy that travels across borders."
      note="Select a hub to see its footprint."
    >
      <div className="bg-surface border border-border rounded-card p-4 sm:p-8 overflow-hidden">
        <div className="overflow-x-auto">
          <svg viewBox="0 0 1000 500" className="w-full min-w-[640px] h-auto">
            <line x1="0" y1="250" x2="1000" y2="250" stroke="#1A1A1A" />
            <line x1="500" y1="0" x2="500" y2="500" stroke="#1A1A1A" />
            <g>
              {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={2} fill="#333333" />
              ))}
            </g>
            <path d="M 236 154 Q 360 80 488 132" fill="none" stroke="#F4B223" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.6" />
            <path d="M 488 132 Q 630 140 772 242" fill="none" stroke="#2DD4BF" strokeWidth="1.2" strokeDasharray="3,3" opacity="0.6" />

            {hubs.map((h) => {
              const on = h.id === active;
              const anchor = h.dir === -1 ? 'end' : 'start';
              return (
                <g
                  key={h.id}
                  transform={`translate(${h.x}, ${h.y})`}
                  onClick={() => setActive(h.id)}
                  onMouseEnter={() => setActive(h.id)}
                  className="cursor-pointer"
                  style={{ opacity: on ? 1 : 0.55, transition: 'opacity 0.25s' }}
                >
                  <circle r="30" fill="transparent" />
                  <circle r="18" fill="none" stroke={h.color} strokeWidth="1" opacity="0.3" className="radar-pulse" />
                  <circle r="8" fill="none" stroke={h.color} strokeWidth="1.2" opacity="0.6" />
                  <circle r={on ? 5 : 3.5} fill={h.color} style={{ transition: 'r 0.2s' }} />
                  <path
                    d={`M ${8 * h.dir} ${8 * h.sign} L ${50 * h.dir} ${36 * h.sign} L ${120 * h.dir} ${36 * h.sign}`}
                    fill="none"
                    stroke={h.color}
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  <circle cx={120 * h.dir} cy={36 * h.sign} r="2.5" fill={h.color} />
                  <text x={126 * h.dir} y={36 * h.sign - 4} fill="#FFFFFF" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="700" textAnchor={anchor}>
                    {h.name.toUpperCase()}
                  </text>
                  <text x={126 * h.dir} y={36 * h.sign + 10} fill="#999999" fontSize="9" fontFamily="'JetBrains Mono', monospace" textAnchor={anchor}>
                    {h.coords} • {h.value}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-wrap gap-2">
            {hubs.map((h) => (
              <button
                key={h.id}
                onClick={() => setActive(h.id)}
                className={`px-4 py-2 rounded-btn text-xs font-mono border transition-colors duration-200 ${
                  active === h.id ? 'bg-white text-primary border-white' : 'border-border-light text-muted hover:text-white'
                }`}
              >
                {h.short}
              </button>
            ))}
          </div>
          <div className="md:col-span-7">
            <p className="text-sm text-muted leading-relaxed">
              <span className="font-semibold" style={{ color: current.color }}>
                {current.value} in mandates.
              </span>{' '}
              {current.blurb}
            </p>
          </div>
        </div>
      </div>
    </InfoSection>
  );
}

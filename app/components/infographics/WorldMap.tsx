'use client';

import { useState } from 'react';
import InfoSection from './InfoSection';
import { MAP_ARCS, MAP_HUBS, WORLD_DOTS, WORLD_PITCH, WORLD_VIEWBOX } from './worldMapData';

export default function WorldMap() {
  const [active, setActive] = useState<string>('ny');
  const current = MAP_HUBS.find((h) => h.id === active)!;

  return (
    <InfoSection
      id="global-reach"
      label="Global Reach"
      title="Brand strategy that travels across borders."
      note="Select a hub to see its footprint."
    >
      <div className="bg-surface border border-border rounded-card p-4 sm:p-8 overflow-hidden">
        <svg viewBox={WORLD_VIEWBOX} className="w-full h-auto" role="img" aria-label="Dot-matrix world map with hubs in New York, London and Singapore">
          <path
            d={WORLD_DOTS}
            fill="none"
            stroke="#585858"
            strokeWidth="6.4"
            strokeLinecap="round"
            strokeDasharray={`0 ${WORLD_PITCH}`}
          />

          {MAP_HUBS.map((h) => (
            <path
              key={`glow-${h.id}`}
              d={h.glow}
              fill="none"
              stroke={h.color}
              strokeWidth="8"
              strokeLinecap="round"
              style={{ opacity: h.id === active ? 0.75 : 0, transition: 'opacity 0.35s ease' }}
            />
          ))}

          {MAP_ARCS.map((a) => (
            <path
              key={a.d}
              d={a.d}
              fill="none"
              stroke={a.color}
              strokeWidth="5"
              strokeDasharray="16 14"
              strokeLinecap="round"
              style={{ opacity: a.hubs.includes(active) ? 0.85 : 0.3, transition: 'opacity 0.35s ease' }}
            />
          ))}

          {MAP_HUBS.map((h) => {
            const on = h.id === active;
            const anchor = h.dir === -1 ? 'end' : 'start';
            return (
              <g
                key={h.id}
                onClick={() => setActive(h.id)}
                onMouseEnter={() => setActive(h.id)}
                className="cursor-pointer"
                style={{ opacity: on ? 1 : 0.5, transition: 'opacity 0.3s ease' }}
              >
                <g className="hidden md:block">
                  <polyline points={h.lead.map((p) => p.join(',')).join(' ')} fill="none" stroke={h.color} strokeWidth="4" opacity="0.8" />
                  <circle cx={h.lead[2][0]} cy={h.lead[2][1]} r="9" fill={h.color} />
                  <text x={h.tx} y={h.ty - 8} textAnchor={anchor} fill="#FFFFFF" fontSize="52" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                    {h.label}
                  </text>
                  <text x={h.tx} y={h.ty + 38} textAnchor={anchor} fill="#999999" fontSize="36" fontFamily="'JetBrains Mono', monospace">
                    {h.sub}
                  </text>
                </g>
                <g transform={`translate(${h.x}, ${h.y})`}>
                  <circle r="80" fill="transparent" />
                  <circle r="34" fill="none" stroke={h.color} strokeWidth="5" className="hub-pulse" />
                  <circle r="34" fill="none" stroke={h.color} strokeWidth="5" opacity="0.55" />
                  <circle r={on ? 20 : 15} fill={h.color} style={{ transition: 'r 0.25s ease' }} />
                </g>
              </g>
            );
          })}
        </svg>

        <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-wrap gap-2">
            {MAP_HUBS.map((h) => (
              <button
                key={h.id}
                onClick={() => setActive(h.id)}
                aria-pressed={active === h.id}
                className={`px-4 py-2 rounded-btn text-xs font-mono border transition-colors duration-200 ${
                  active === h.id ? 'bg-white text-primary border-white' : 'border-border-light text-muted hover:text-white'
                }`}
              >
                {h.name}
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
            <p className="mt-2 font-mono text-[11px] text-muted/70">{current.coords}</p>
          </div>
        </div>
      </div>
    </InfoSection>
  );
}

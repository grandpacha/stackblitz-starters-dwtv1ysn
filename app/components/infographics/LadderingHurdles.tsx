'use client';

import { useState } from 'react';
import InfoSection from './InfoSection';

const steps = [
  { title: 'Emotional Benefits', q: 'How does a customer ultimately feel about your brand?' },
  { title: 'Transformational Benefits', q: "How does it change our clients' lives?" },
  { title: 'Functional Benefits', q: 'What functional benefits do these features provide?' },
  { title: 'Product Attributes', q: 'What are the defining features of your product or service?' },
];

const hurdles = [
  { name: 'Differentiated', q: 'Is your service or product differentiated from the pack?' },
  { name: 'Relevant', q: 'Is your service or product needed by the market?' },
  { name: 'Sustainable', q: 'Can you develop a moat with your service or product?' },
];

const verdicts = [
  'Not yet a defensible position. Start by clarifying what makes you different.',
  'A starting point. Two hurdles are still open.',
  'Close. One more hurdle stands between you and a defensible position.',
  'A defensible position. Differentiated, relevant and sustainable.',
];

function HurdleIcon({ i }: { i: number }) {
  if (i === 0)
    return (
      <svg className="w-10 h-10" viewBox="0 0 40 40">
        <circle cx="12" cy="12" r="7" fill="none" stroke="#F4B223" strokeWidth="2.5" />
        <circle cx="28" cy="12" r="7" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="12" cy="28" r="7" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="28" cy="28" r="7" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
      </svg>
    );
  if (i === 1)
    return (
      <svg className="w-10 h-10" viewBox="0 0 40 40">
        <circle cx="15" cy="20" r="11" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="25" cy="20" r="11" fill="none" stroke="#F4B223" strokeWidth="2.5" />
        <path d="M 20 11 A 11 11 0 0 1 20 29 A 11 11 0 0 1 20 11" fill="#F4B223" opacity="0.4" />
      </svg>
    );
  return (
    <svg className="w-10 h-10" viewBox="0 0 40 40">
      <path d="M 10 20 A 10 10 0 0 1 28 12" fill="none" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 30 20 A 10 10 0 0 1 12 28" fill="none" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="28,8 31,14 25,14" fill="#2DD4BF" />
      <polygon points="12,32 9,26 15,26" fill="#2DD4BF" />
    </svg>
  );
}

export default function LadderingHurdles() {
  const [step, setStep] = useState(0);
  const [passed, setPassed] = useState<boolean[]>([false, false, false]);
  const score = passed.filter(Boolean).length;

  return (
    <InfoSection
      id="positioning"
      label="Positioning"
      title="Test your brand against the three hurdles."
      note="Step through the ladder, then mark each hurdle your brand clears."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-6 bg-surface border border-border rounded-card p-8">
          <h3 className="text-2xl font-bold mb-3">Laddering</h3>
          <p className="text-sm text-muted leading-relaxed mb-8">
            Laddering de-positions a competitor by highlighting one of your strengths that happens to be their weakness. Climb from features to feelings.
          </p>
          <div className="border-l-4 border-aqua pl-4 space-y-2">
            {steps.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setStep(i)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  step === i ? 'bg-surface-light border-border-light' : 'border-transparent hover:bg-surface-light/50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full font-mono font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                      step === i ? 'bg-white text-primary' : 'bg-border-light text-muted'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm font-bold">{s.title}</span>
                </span>
                <span
                  className="block overflow-hidden text-xs text-aqua italic ml-9 transition-all duration-300"
                  style={{ maxHeight: step === i ? 60 : 0, opacity: step === i ? 1 : 0, marginTop: step === i ? 6 : 0 }}
                >
                  {s.q}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-surface-light border border-border rounded-card p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-bold">Scoring</h3>
              <span className="font-mono text-sm text-gold">{score} / 3</span>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-6">
              We score on three hurdles: is it differentiated, is it relevant, and is it sustainable, meaning ownable and able to form a moat.
            </p>
            <div className="space-y-4">
              {hurdles.map((h, i) => (
                <button
                  key={h.name}
                  onClick={() => setPassed((p) => p.map((v, j) => (j === i ? !v : v)))}
                  aria-pressed={passed[i]}
                  className={`w-full flex items-center gap-5 p-4 rounded-xl border text-left transition-all duration-200 ${
                    passed[i] ? 'bg-surface border-gold' : 'bg-surface border-border hover:border-border-light'
                  }`}
                >
                  <div className="w-16 flex flex-col items-center shrink-0">
                    <HurdleIcon i={i} />
                    <span className="text-[9px] font-mono tracking-wider uppercase text-muted mt-1.5 font-bold">{h.name}</span>
                  </div>
                  <span className="flex-1 text-sm font-medium">{h.q}</span>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      passed[i] ? 'bg-gold text-primary' : 'border border-border-light text-transparent'
                    }`}
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>
          <p className="mt-6 pt-4 border-t border-border text-sm text-muted leading-relaxed" aria-live="polite">
            {verdicts[score]}
          </p>
        </div>
      </div>
    </InfoSection>
  );
}

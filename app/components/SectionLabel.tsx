'use client';

export default function SectionLabel({ text }: { text: string }) {
  return (
    <p className="section-label font-medium">{'// '}{text}</p>
  );
}

export default function SectionLabel({ text, index }: { text: string; index?: string }) {
  return (
    <p className="mono-label flex items-center gap-3 mb-5">
      <span className="text-gold">{'//'}</span>
      <span>{text}</span>
      {index && <span className="text-white/30">{index}</span>}
    </p>
  );
}

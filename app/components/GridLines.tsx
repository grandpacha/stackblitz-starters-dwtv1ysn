export default function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="container-x h-full">
        <div className="relative h-full grid grid-cols-2 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`border-l border-white/[0.05] ${i >= 2 ? 'hidden md:block' : ''} ${i === 3 ? 'md:border-r' : ''} ${i === 1 ? 'border-r md:border-r-0' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

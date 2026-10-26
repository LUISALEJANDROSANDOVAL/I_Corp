export function Marquee({ className = '' }: { className?: string }) {
  const items = ['Origen intacto', 'Bosque puro Chaco', 'Miel cruda', 'Cuevo · Cordillera', 'Extracción en frío', 'Sin pasteurizar']

  const row = items.map((item) => (
    <span key={item} className="flex items-center gap-8 pr-8 md:gap-12 md:pr-12">
      {item}
      <svg viewBox="0 0 24 24" className="size-5 shrink-0 md:size-7" aria-hidden="true">
        <path fill="currentColor" d="M12 2.5c0 0-6.5 7.2-6.5 12a6.5 6.5 0 0 0 13 0c0-4.8-6.5-12-6.5-12Z" />
      </svg>
    </span>
  ))

  return (
    <div aria-hidden="true" className={`relative overflow-hidden bg-amber py-4 text-forest-dark md:py-6 ${className}`}>
      <div className="flex w-max animate-marquee whitespace-nowrap font-serif text-4xl font-light italic hover:[animation-play-state:paused] md:text-7xl">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  )
}

'use client'

import { useId } from 'react'

/** Sello circular giratorio con la leyenda de la faja de garantía de la marca. */
export function RotatingSeal({
  text = 'COSECHA ARTESANAL EN FRÍO · ORIGEN INTACTO · CUEVO · ',
  className = '',
}: {
  text?: string
  className?: string
}) {
  const id = useId().replace(/:/g, '')
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" className="size-full animate-spin-slow" role="img" aria-label={text.trim()}>
        <defs>
          <path id={`seal-${id}`} d="M100,100 m-79,0 a79,79 0 1,1 158,0 a79,79 0 1,1 -158,0" />
        </defs>
        <text
          fontSize="11.5"
          fill="currentColor"
          className="font-label"
          textLength="486"
          lengthAdjust="spacing"
        >
          <textPath href={`#seal-${id}`} textLength="486" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute left-1/2 top-1/2 size-[22%] -translate-x-1/2 -translate-y-1/2 text-amber">
        <path fill="currentColor" d="M12 2.5c0 0-6.5 7.2-6.5 12a6.5 6.5 0 0 0 13 0c0-4.8-6.5-12-6.5-12Z" />
      </svg>
    </div>
  )
}

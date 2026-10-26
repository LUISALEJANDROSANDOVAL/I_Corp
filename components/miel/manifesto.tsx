'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { Eyebrow } from './reveal'

type Tone = 'plain' | 'gold' | 'italic'
const SEGMENTS: { text: string; tone: Tone }[] = [
  { text: 'No fabricamos miel. La', tone: 'plain' },
  { text: 'custodiamos.', tone: 'gold' },
  { text: 'En el monte seco de Cuevo, el quebracho, el algarrobo y el mistol florecen', tone: 'plain' },
  { text: 'cuando la lluvia quiere,', tone: 'italic' },
  { text: 'no cuando el mercado lo exige. Nosotros sólo recogemos lo que el bosque decide regalar:', tone: 'plain' },
  { text: 'miel cruda,', tone: 'gold' },
  { text: 'extraída en frío, sin una sola gota alterada.', tone: 'plain' },
]

const WORDS = SEGMENTS.flatMap((s) => s.text.split(' ').map((w) => ({ w, tone: s.tone })))

function Word({
  word,
  tone,
  range,
  progress,
}: {
  word: string
  tone: Tone
  range: [number, number]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  const color = tone === 'gold' ? 'text-amber' : 'text-cream'
  const style = tone === 'italic' ? 'italic text-amber-rich' : ''
  return (
    <motion.span style={{ opacity }} className={`mr-[0.28em] inline-block ${color} ${style}`}>
      {word}
    </motion.span>
  )
}

/**
 * Manifiesto Editorial:
 * Escenario fijado (sticky stage h-[220svh]) que mantiene la frase centrada y estática
 * mientras el scroll ilumina palabra por palabra antes de avanzar al Capítulo I.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const n = WORDS.length

  return (
    <section ref={ref} data-chapter="Prólogo" className="relative h-[220svh] bg-forest">
      <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden px-6 md:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 85% 20%, color-mix(in oklab, var(--moss) 45%, transparent), transparent 70%), radial-gradient(ellipse 45% 45% at 20% 80%, color-mix(in oklab, var(--forest-dark) 60%, transparent), transparent 70%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1300px]">
          <Eyebrow className="text-amber">Prólogo · El silencio de Cuevo</Eyebrow>

          <p className="mt-10 font-serif text-[clamp(2.1rem,4.4vw,4.8rem)] font-light leading-[1.14] tracking-[-0.01em]">
            <span className="sr-only">{SEGMENTS.map((s) => s.text).join(' ')}</span>
            <span aria-hidden="true">
              {WORDS.map((item, i) => {
                const start = Math.min(0.92, 0.06 + (i / n) * 0.82)
                const end = Math.min(0.98, start + 0.08)
                return (
                  <Word
                    key={`${item.w}-${i}`}
                    word={item.w}
                    tone={item.tone}
                    range={[start, end]}
                    progress={scrollYProgress}
                  />
                )
              })}
            </span>
          </p>

          <div className="mt-14 flex items-center gap-5">
            <span aria-hidden="true" className="h-px w-16 bg-amber/60" />
            <span className="font-label text-[11px] uppercase tracking-[0.4em] text-cream/55">
              Miel Natural del Bosque Chaqueño
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

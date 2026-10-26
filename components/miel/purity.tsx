'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { Eyebrow } from './reveal'

type Row = { big: string; title: string; text: string }

const ROWS: Row[] = [
  {
    big: '0',
    title: 'Aditivos',
    text: 'Sin jarabes, sin conservantes, sin colorantes. Sólo lo que la colmena produce de manera natural.',
  },
  {
    big: '0',
    title: 'Pasteurización',
    text: 'Jamás se calienta. Conserva intactas sus enzimas vivas, su aroma y su carácter botánico silvestre.',
  },
  {
    big: '100%',
    title: 'Miel cruda',
    text: 'Extraída artesanalmente en frío y envasada tal cual: viva, pura, sin filtrados industriales agresivos.',
  },
  {
    big: '№',
    title: 'Lote a mano',
    text: 'Cada frasco lleva su número de lote escrito a mano en el precinto: trazabilidad completa hasta el colmenar.',
  },
]

function PurityRow({
  row,
  range,
  progress,
}: {
  row: Row
  range: [number, number]
  progress: MotionValue<number>
}) {
  const activeProgress = useTransform(progress, range, [0, 1])
  const opacity = useTransform(activeProgress, [0, 1], [0.35, 1])
  const y = useTransform(activeProgress, [0, 1], [25, 0])
  const bgScaleY = useTransform(activeProgress, [0, 1], [0, 1])
  const numColor = useTransform(activeProgress, [0, 0.4], ['#8c6d3b', '#f2a922'])
  const textColor = useTransform(activeProgress, [0, 0.4], ['#1c2a23', '#f7f5f0'])

  return (
    <motion.li style={{ opacity, y }} className="border-b border-forest/15">
      <div className="group relative grid grid-cols-12 items-center gap-3 overflow-hidden rounded-xl py-4 transition-colors md:py-6">
        <motion.span
          aria-hidden="true"
          style={{ scaleY: bgScaleY }}
          className="absolute inset-0 origin-bottom bg-forest shadow-sm"
        />

        <motion.span
          style={{ color: numColor }}
          className="relative col-span-4 pl-3 font-serif text-[clamp(2.8rem,6vw,5.5rem)] font-light italic leading-none md:pl-5"
        >
          {row.big}
        </motion.span>

        <motion.div style={{ color: textColor }} className="relative col-span-8 pr-3 md:pr-5">
          <h3 className="font-label text-[10px] uppercase tracking-[0.3em] font-semibold">{row.title}</h3>
          <p className="mt-1 font-sans text-xs leading-relaxed opacity-85 md:text-sm">{row.text}</p>
        </motion.div>
      </div>
    </motion.li>
  )
}

/**
 * Capítulo IV — La Pureza:
 * Escenario fijado (sticky stage h-[280svh]).
 * La pantalla se queda estática mientras las cuatro certezas de pureza
 * se van activando progresivamente al ritmo del scroll sin perderse de vista.
 */
export function Purity() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const titleOpacity = useTransform(p, [0, 0.15], [0.4, 1])

  return (
    <section
      ref={ref}
      id="pureza"
      data-chapter="La Pureza"
      data-numeral="IV"
      className="relative h-[280svh] bg-cream text-forest"
    >
      <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden px-6 md:px-12">
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Columna izquierda fija */}
          <motion.div style={{ opacity: titleOpacity }} className="flex flex-col gap-6 lg:col-span-5">
            <Eyebrow className="text-bronze">Capítulo IV · La Pureza</Eyebrow>
            <h2 className="font-serif text-[clamp(2.4rem,4.8vw,5.4rem)] font-light leading-[1.02] tracking-[-0.015em]">
              Nada que agregar. <br />
              <span className="italic text-bronze">Nada que quitar.</span>
            </h2>
            <p className="max-w-md font-sans text-sm leading-relaxed text-forest/75 md:text-base">
              Nuestra única promesa es la más difícil de cumplir: que la miel llegue a tu mesa con la misma pureza con
              la que salió de las flores del Chaco.
            </p>

            {/* Certificación Sanitaria y Trazabilidad Real */}
            <div className="overflow-hidden rounded-2xl border border-forest/15 bg-forest/5 p-2 backdrop-blur-sm max-w-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                <Image
                  src="/images/miel-senasag.webp"
                  alt="Registro sanitario SENASAG y lote envasado de Miel Natural del Bosque Chaqueño"
                  fill
                  sizes="(min-width: 1024px) 25vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-2 flex items-center justify-between px-1">
                <span className="font-label text-[9px] uppercase tracking-[0.25em] text-bronze font-semibold">
                  Certificación SENASAG
                </span>
                <span className="font-sans text-[10px] text-forest/75">
                  RSA-AB-02345 · Sabarendi
                </span>
              </div>
            </div>

            <p className="font-label text-[10px] uppercase tracking-[0.45em] text-bronze">
              Cosecha artesanal en frío · Origen intacto Cuevo
            </p>
          </motion.div>

          {/* Columna derecha: 4 pilares activados con el scroll con rangos estrictamente en [0, 1] */}
          <ul className="flex flex-col border-t border-forest/15 lg:col-span-7">
            {ROWS.map((r, i) => {
              const start = 0.12 + i * 0.18
              const end = Math.min(0.98, start + 0.16)
              return (
                <PurityRow
                  key={r.title}
                  row={r}
                  range={[start, end]}
                  progress={p}
                />
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

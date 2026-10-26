'use client'

import Image from 'next/image'
import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const FACTS = [
  { k: 'Coordenadas', v: '20°27′S · Cuevo', d: 'Provincia Cordillera, Santa Cruz' },
  { k: 'Floración', v: 'Quebracho · Algarrobo · Mistol', d: 'Flora nativa del monte seco' },
  { k: 'Territorio', v: 'Sin cultivos ni agroquímicos', d: 'El bosque siempre conserva su parte' },
]

/** Capítulo I — la fotografía pasa de arco a pantalla completa con el scroll (sección fijada). */
export function Terroir() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const v = useTransform(p, [0, 0.45], [9, 0])
  const h = useTransform(p, [0, 0.45], [34, 0])
  const r = useTransform(p, [0, 0.45], [340, 0])
  const clip = useMotionTemplate`inset(${v}% ${h}% ${v}% ${h}% round ${r}px ${r}px 0px 0px)`

  const scale = useTransform(p, [0, 0.6], [1.45, 1])
  const veil = useTransform(p, [0.3, 0.6], [0, 1])
  const bgWord = useTransform(p, [0, 0.3], [1, 0])
  const bgWordY = useTransform(p, [0, 0.5], [0, -120])

  const headOp = useTransform(p, [0.42, 0.54], [0, 1])
  const headY = useTransform(p, [0.42, 0.54], [50, 0])
  const f0 = useTransform(p, [0.52, 0.64], [0, 1])
  const f1 = useTransform(p, [0.60, 0.72], [0, 1])
  const f2 = useTransform(p, [0.68, 0.80], [0, 1])
  const factOps = [f0, f1, f2]

  return (
    <section ref={ref} id="terroir" data-chapter="El Terroir" data-numeral="I" className="relative h-[320svh] bg-forest-dark">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Palabra de capítulo detrás del arco */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: bgWord, y: bgWordY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <p className="font-label text-[11px] uppercase tracking-[0.5em] text-amber">Capítulo I</p>
          <p className="text-outline font-serif text-[clamp(5rem,21vw,22rem)] font-light italic leading-[0.9]">Terroir</p>
        </motion.div>

        {/* Fotografía: arco → pantalla completa */}
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.div style={{ scale }} className="absolute inset-0">
            <Image
              src="/images/chaco-forest.webp"
              alt="Bosque seco del Gran Chaco al atardecer, con quebrachos y algarrobos"
              fill
              sizes="100vw"
              className="object-cover object-[50%_45%]"
            />
          </motion.div>
          <motion.div
            aria-hidden="true"
            style={{ opacity: veil }}
            className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/25 to-forest-dark/10"
          />
        </motion.div>

        {/* Texto sobre la imagen ya expandida */}
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1500px] px-6 pb-8 md:px-12 md:pb-14">
          <motion.div style={{ opacity: headOp, y: headY }}>
            <p className="font-label text-[11px] uppercase tracking-[0.45em] text-amber">Capítulo I · El Terroir</p>
            <h2 className="mt-5 max-w-5xl font-serif text-[clamp(2.3rem,6.2vw,6.4rem)] font-light leading-[0.98] tracking-[-0.015em] text-cream">
              Un monte que <span className="italic text-gold-gradient">nadie ha domesticado.</span>
            </h2>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-cream/25 pt-5 md:mt-12 md:grid-cols-3 md:gap-10 md:pt-7">
            {FACTS.map((f, i) => (
              <motion.div key={f.k} style={{ opacity: factOps[i] }}>
                <p className="font-label text-[10px] uppercase tracking-[0.4em] text-cream/55">{f.k}</p>
                <p className="mt-1.5 font-serif text-xl text-cream md:mt-2 md:text-2xl">{f.v}</p>
                <p className="mt-1 hidden font-sans text-xs text-cream/60 md:block">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

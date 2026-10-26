'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { INSTAGRAM_HANDLE, whatsappLink } from '@/lib/miel'
import { Magnetic } from './magnetic'
import { Eyebrow, Reveal, SplitWords } from './reveal'

/** Epílogo — cierre emocional y contacto. */
export function Epilogue() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '8%'])

  return (
    <section
      ref={ref}
      id="contacto"
      data-chapter="Contacto"
      data-numeral="✦"
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-forest-dark px-6 py-32 text-center text-cream"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[12%] -z-10 opacity-30">
        <Image src="/images/chaco-forest.webp" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--forest-dark)_75%)]"
      />

      <Reveal>
        <Eyebrow className="justify-center text-amber">Epílogo</Eyebrow>
      </Reveal>

      <h2 className="mt-10 font-serif text-[clamp(3rem,9.5vw,10rem)] font-light leading-[0.94] tracking-[-0.02em]">
        <SplitWords text="Origen intacto." className="block" />
        <SplitWords
          text="Bosque puro Chaco."
          className="block italic"
          delay={0.2}
          highlight={['puro', 'Chaco.']}
          highlightClassName="text-gold-gradient"
        />
      </h2>

      <Reveal delay={0.2} className="mt-12">
        <p className="mx-auto max-w-md font-sans text-base leading-relaxed text-cream/70">
          Una marca nueva, nacida en Cuevo. Si quieres conocer la miel o ser de los primeros en probarla, escríbenos.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
        <Magnetic strength={0.4}>
          <a
            href={whatsappLink('Hola, me gustaría conocer Miel Natural del Bosque Chaqueño.')}
            target="_blank"
            rel="noreferrer"
            data-cursor="Hola"
            className="btn-shine grid size-40 place-items-center rounded-full bg-amber text-center font-label text-[11px] uppercase tracking-[0.3em] text-forest-dark transition-transform duration-500 hover:scale-105 md:size-48"
          >
            Escríbenos
            <br />
            <span aria-hidden="true" className="text-2xl">↗</span>
          </a>
        </Magnetic>
        <a
          href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
          target="_blank"
          rel="noreferrer"
          data-cursor="Instagram"
          className="group font-serif text-2xl italic text-cream/85 md:text-3xl"
        >
          <span className="bg-gradient-to-r from-amber to-amber bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-1 transition-[background-size] duration-700 group-hover:bg-[length:100%_1px]">
            @{INSTAGRAM_HANDLE}
          </span>
        </a>
      </div>
    </section>
  )
}

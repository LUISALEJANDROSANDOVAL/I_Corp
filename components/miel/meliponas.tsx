'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Eyebrow } from './reveal'

const FACTS = [
  {
    num: '01',
    k: 'Sin aguijón',
    v: 'Abdomen curvo y suave: docilidad absoluta, pureza intacta y reverencia por la vida del bosque.',
  },
  {
    num: '02',
    k: 'Meliponini',
    v: 'Especie nativa ancestral que poliniza la flora endémica del monte chaqueño desde tiempos inmemoriales.',
  },
  {
    num: '03',
    k: 'Cosecha mínima',
    v: 'Tomamos únicamente el excedente sagrado de la colmena. El bosque siempre conserva su sustento.',
  },
]

/**
 * Capítulo II — Las Guardianas (Meliponini).
 * Escenario fijado (sticky stage): la pantalla se queda estática mientras el usuario hace scroll,
 * completando la coreografía del hexágono y los 3 pilares uno a uno antes de continuar.
 */
export function Meliponas() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Parallax y presencia del numeral monumental
  const numeralY = useTransform(p, [0, 1], [60, -120])
  const numeralOpacity = useTransform(p, [0, 0.15, 0.85, 1], [0, 0.4, 0.4, 0])

  // Fotografía en hexágono
  const photoScale = useTransform(p, [0, 0.35], [0.85, 1])
  const photoRotate = useTransform(p, [0, 1], [-3, 2])
  const hexClip = useTransform(p, [0, 0.25], [0.7, 1])

  // Título y párrafo
  const titleOpacity = useTransform(p, [0.05, 0.2], [0, 1])
  const titleY = useTransform(p, [0.05, 0.2], [40, 0])

  // Hechos secuenciales (cada uno se ilumina y se asienta con el avance del scroll)
  const f0Op = useTransform(p, [0.22, 0.38], [0.2, 1])
  const f0Y = useTransform(p, [0.22, 0.38], [30, 0])
  const f0Active = useTransform(p, [0.22, 0.45], [0, 1])

  const f1Op = useTransform(p, [0.42, 0.58], [0.2, 1])
  const f1Y = useTransform(p, [0.42, 0.58], [30, 0])
  const f1Active = useTransform(p, [0.42, 0.65], [0, 1])

  const f2Op = useTransform(p, [0.62, 0.78], [0.2, 1])
  const f2Y = useTransform(p, [0.62, 0.78], [30, 0])
  const f2Active = useTransform(p, [0.62, 0.85], [0, 1])

  const factTransforms = [
    { op: f0Op, y: f0Y, active: f0Active },
    { op: f1Op, y: f1Y, active: f1Active },
    { op: f2Op, y: f2Y, active: f2Active },
  ]

  return (
    <section
      ref={ref}
      id="meliponas"
      data-chapter="Las Guardianas"
      data-numeral="II"
      className="relative h-[280svh] bg-cream text-forest"
    >
      <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden">
        {/* Numeral romano monumental en el fondo */}
        <motion.p
          aria-hidden="true"
          style={{ y: numeralY, opacity: numeralOpacity }}
          className="text-outline-dark pointer-events-none absolute -right-[2vw] top-[5%] select-none font-serif text-[32vw] font-light italic leading-none"
        >
          II
        </motion.p>

        <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-8 px-6 md:px-12 lg:grid-cols-12 lg:gap-14">
          {/* Columna izquierda: Celda hexagonal de la abeja nativa */}
          <div className="flex flex-col items-center justify-center lg:col-span-5">
            <motion.div
              style={{ scale: photoScale, rotate: photoRotate }}
              className="relative aspect-[0.866] w-[min(65vw,22rem)] md:w-[min(40vw,24rem)]"
            >
              <motion.div style={{ scale: hexClip }} className="size-full">
                <div className="hex-mask relative size-full bg-forest shadow-2xl">
                  <Image
                    src="/images/melipona.webp"
                    alt="Abejas nativas sin aguijón (Meliponini) en la entrada de su colmena silvestre"
                    fill
                    sizes="(min-width: 1024px) 24rem, 65vw"
                    className="object-cover object-[45%_50%]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent"
                  />
                </div>
              </motion.div>

              {/* Marco geométrico de bronce concéntrico */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 115.47"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 size-full translate-x-3 translate-y-3 overflow-visible opacity-70"
              >
                <polygon
                  points="50,0 100,28.87 100,86.6 50,115.47 0,86.6 0,28.87"
                  fill="none"
                  stroke="var(--bronze)"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </motion.div>

            <motion.p
              style={{ opacity: titleOpacity }}
              className="mt-6 font-label text-[10px] uppercase tracking-[0.45em] text-bronze"
            >
              Meliponini · Abeja nativa sin aguijón
            </motion.p>
          </div>

          {/* Columna derecha: Título y hechos que se completan con el scroll */}
          <div className="flex flex-col gap-6 lg:col-span-7 lg:pl-6">
            <motion.div style={{ opacity: titleOpacity, y: titleY }} className="flex flex-col gap-4">
              <Eyebrow className="text-bronze">Capítulo II · Las Guardianas</Eyebrow>
              <h2 className="font-serif text-[clamp(2.4rem,4.8vw,5.4rem)] font-light leading-[1.02] tracking-[-0.015em]">
                Las abejas que <br />
                <span className="italic text-bronze">no conocen el dolor.</span>
              </h2>
              <p className="max-w-xl font-sans text-sm leading-relaxed text-forest/75 md:text-base">
                Las <em className="font-serif text-lg not-italic text-bronze">Meliponini</em> construyen sus nidos
                dentro de los troncos centenarios del Gran Chaco. Sin aguijón que defender, transforman la resina y el
                néctar en una miel silvestre de pureza y acidez incomparables.
              </p>
            </motion.div>

            {/* Lista secuencial de pilares */}
            <ul className="mt-2 flex max-w-2xl flex-col border-t border-forest/20">
              {FACTS.map((f, i) => {
                const { op, y } = factTransforms[i]
                return (
                  <motion.li
                    key={f.k}
                    style={{ opacity: op, y }}
                    className="group border-b border-forest/15 py-4 transition-colors duration-500"
                  >
                    <div className="grid grid-cols-12 items-baseline gap-3">
                      <span className="col-span-2 font-label text-[11px] tracking-[0.25em] text-bronze">
                        {f.num}
                      </span>
                      <span className="col-span-10 font-serif text-xl font-medium text-forest sm:col-span-4 md:text-2xl">
                        {f.k}
                      </span>
                      <span className="col-span-12 font-sans text-xs leading-relaxed text-forest/70 sm:col-span-6 sm:col-start-7 sm:text-sm">
                        {f.v}
                      </span>
                    </div>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

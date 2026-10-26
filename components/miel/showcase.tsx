'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { PRESENTATIONS, whatsappLink } from '@/lib/miel'
import { Magnetic } from './magnetic'
import { EASE, Eyebrow } from './reveal'

/**
 * Capítulo III — La Colección:
 * Escenario fijado (sticky stage h-[320svh]).
 * La pantalla se queda estática mientras el usuario hace scroll, recorriendo
 * suavemente los 3 frascos (01 Coleccionista → 02 Melipona → 03 Cristalizada)
 * con sus notas de cata y resplandor, permitiendo además selección manual por clic.
 */
export function Showcase() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const [active, setActive] = useState(0)
  const [note, setNote] = useState<number | null>(0)
  const current = PRESENTATIONS[active]

  // Actualizar presentación activa según el avance del scroll fijado
  useEffect(() => {
    return p.on('change', (v) => {
      let nextIndex = 0
      if (v >= 0.64) nextIndex = 2
      else if (v >= 0.32) nextIndex = 1
      else nextIndex = 0

      setActive((prev) => {
        if (prev !== nextIndex) {
          setNote(0)
          return nextIndex
        }
        return prev
      })
    })
  }, [p])

  // Tilt al cursor
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 90, damping: 18 })
  const sy = useSpring(py, { stiffness: 90, damping: 18 })
  const rotY = useTransform(sx, [-0.5, 0.5], [-6, 6])
  const rotX = useTransform(sy, [-0.5, 0.5], [5, -5])

  const select = (i: number) => {
    setActive(i)
    setNote(0)
  }

  return (
    <section
      ref={ref}
      id="coleccion"
      data-chapter="La Colección"
      data-numeral="III"
      className="relative h-[320svh] bg-forest-dark text-cream"
    >
      <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden">
        {/* Resplandor ambiental adaptativo por producto */}
        <motion.div
          aria-hidden="true"
          animate={{ backgroundColor: current.glow }}
          transition={{ duration: 1.2, ease: EASE }}
          className="pointer-events-none absolute right-[-10vw] top-[15%] size-[55vw] rounded-full opacity-35 blur-[140px]"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 md:px-12">
          {/* Cabecera compacta */}
          <header className="mb-6 flex flex-col gap-2 md:mb-10">
            <Eyebrow className="text-amber">Capítulo III · La Colección</Eyebrow>
            <h2 className="font-serif text-[clamp(2.2rem,4.4vw,4.6rem)] font-light leading-[1] tracking-[-0.015em]">
              Tres expresiones <span className="italic text-gold-gradient">de un mismo monte</span>
            </h2>
          </header>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Columna izquierda: Pestañas 01/02/03 + Detalles */}
            <div className="order-2 flex flex-col justify-between gap-6 lg:order-1 lg:col-span-6">
              <ul role="tablist" aria-label="Presentaciones" className="border-t border-cream/15">
                {PRESENTATIONS.map((pItem, i) => {
                  const on = i === active
                  return (
                    <li key={pItem.id} className="border-b border-cream/15">
                      <button
                        role="tab"
                        aria-selected={on}
                        onClick={() => select(i)}
                        data-cursor="Ver"
                        className="group flex w-full items-baseline gap-4 py-3 text-left md:gap-7 md:py-4"
                      >
                        <span className="font-label text-xs tracking-[0.25em] text-amber">0{i + 1}</span>
                        <span
                          className={`font-serif text-[clamp(1.8rem,3.4vw,3.6rem)] font-light leading-none transition-all duration-700 ${
                            on ? 'translate-x-2 text-cream' : 'text-outline text-transparent'
                          }`}
                        >
                          {pItem.name}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex max-w-xl flex-col gap-5"
                >
                  <div className="flex flex-col gap-1.5">
                    <p className="font-label text-[10px] uppercase tracking-[0.35em] text-amber">
                      {current.subname}
                    </p>
                    <p className="font-serif text-lg italic leading-relaxed text-cream/85 md:text-xl">
                      {current.tagline}
                    </p>
                  </div>

                  <dl className="grid grid-cols-3 gap-3 border-y border-cream/15 py-4">
                    {[
                      ['Contenido', current.weight],
                      ['Floración', current.floracion],
                      ['Perfil', current.perfil],
                    ].map(([k, v]) => (
                      <div key={k} className="flex flex-col gap-1">
                        <dt className="font-label text-[9px] uppercase tracking-[0.3em] text-amber">{k}</dt>
                        <dd className="font-sans text-xs leading-snug text-cream/80 md:text-sm">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <Magnetic strength={0.3} className="self-start">
                    <a
                      href={whatsappLink(
                        `Hola, quiero conocer más sobre ${current.name} de Miel Natural del Bosque Chaqueño.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="Escribir"
                      className="btn-shine inline-flex items-center gap-3 rounded-full border border-amber/60 px-6 py-3 font-label text-[10px] uppercase tracking-[0.3em] text-amber transition-colors duration-500 hover:bg-amber hover:text-forest-dark"
                    >
                      Consultar esta miel
                      <span aria-hidden="true">→</span>
                    </a>
                  </Magnetic>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Columna derecha: Fotografía con wipe suave y puntos de cata */}
            <div className="order-1 lg:order-2 lg:col-span-6">
              <div
                style={{ perspective: 1200 }}
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect()
                  px.set((e.clientX - r.left) / r.width - 0.5)
                  py.set((e.clientY - r.top) / r.height - 0.5)
                }}
                onPointerLeave={() => {
                  px.set(0)
                  py.set(0)
                }}
              >
                <motion.div
                  style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
                  className="relative mx-auto aspect-[4/5] w-full max-w-[28rem] max-h-[62svh] overflow-hidden rounded-2xl bg-forest shadow-2xl"
                >
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={current.id}
                      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                      exit={{ opacity: 0.95, transition: { duration: 0.9 } }}
                      transition={{ duration: 0.9, ease: EASE }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={current.image}
                        alt={current.alt}
                        fill
                        sizes="(min-width: 1024px) 28rem, 85vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Hotspots interactivos */}
                  <div className="absolute inset-0 z-10">
                    {current.notes.map((n, i) => {
                      const cx = 50 + (n.x - 50) / 0.8
                      const open = note === i
                      return (
                        <div
                          key={`${current.id}-${i}`}
                          className="absolute"
                          style={{ left: `${cx}%`, top: `${n.y}%` }}
                        >
                          <button
                            aria-label={n.title}
                            aria-expanded={open}
                            onClick={() => setNote(open ? null : i)}
                            data-cursor="Nota"
                            className="relative grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center"
                          >
                            <span className="absolute inset-0 animate-ping rounded-full bg-amber/40" />
                            <span className="relative grid size-5 place-items-center rounded-full border border-cream/70 bg-forest-dark/60 backdrop-blur">
                              <span className="size-1 rounded-full bg-amber" />
                            </span>
                          </button>
                        </div>
                      )
                    })}
                  </div>

                  {/* Tarjeta translúcida de cata */}
                  <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 min-h-[5rem]">
                    <AnimatePresence mode="wait">
                      {note !== null && (
                        <motion.div
                          key={`${current.id}-${note}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="rounded-xl border border-cream/20 bg-forest-dark/65 p-4 backdrop-blur-xl"
                        >
                          <p className="font-label text-[9px] uppercase tracking-[0.3em] text-amber">
                            {current.notes[note].title}
                          </p>
                          <p className="mt-1 font-sans text-xs leading-relaxed text-cream/85">
                            {current.notes[note].text}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

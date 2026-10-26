'use client'

import Image from 'next/image'
import { ArrowDownRight } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, type MouseEvent, type PointerEvent } from 'react'
import { scrollToTarget } from '@/lib/scroll'
import { Magnetic } from './magnetic'
import { PollenField } from './pollen-field'
import { EASE, SplitWords } from './reveal'
import { RotatingSeal } from './rotating-seal'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [7, -7])
  const rotateX = useTransform(sy, [-0.5, 0.5], [-5, 5])
  const wordX = useTransform(sx, [-0.5, 0.5], [40, -40])
  const ringX = useTransform(sx, [-0.5, 0.5], [-20, 20])
  const ringY = useTransform(sy, [-0.5, 0.5], [-14, 14])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const archY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const wordY = useTransform(scrollYProgress, [0, 1], [0, 180])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const go = (e: MouseEvent, target: string) => {
    e.preventDefault()
    scrollToTarget(target)
  }

  return (
    <section
      id="inicio"
      ref={ref}
      data-chapter="Prólogo"
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      className="grain relative min-h-svh overflow-hidden bg-forest-dark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 70% at 72% 48%, color-mix(in oklab, var(--moss) 55%, transparent), transparent 70%), radial-gradient(ellipse 45% 40% at 8% 95%, color-mix(in oklab, var(--bronze) 30%, transparent), transparent 70%)',
        }}
      />
      <PollenField density={80} />

      {/* Palabra monumental "Chaco" detrás */}
      <motion.div
        aria-hidden="true"
        style={{ x: wordX, y: wordY }}
        className="pointer-events-none absolute inset-x-0 top-[46%] -translate-y-1/2 select-none text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 2.2, delay: 0.2, ease: EASE }}
          className="text-outline block font-serif text-[38vw] font-light italic leading-none"
        >
          Chaco
        </motion.span>
      </motion.div>

      {/* Contenido principal del Hero (siempre visible y animado al montar) */}
      <div className="relative z-10 mx-auto grid min-h-svh w-full max-w-[1500px] grid-cols-1 items-center gap-12 px-6 pb-28 pt-32 md:px-12 lg:grid-cols-12 lg:gap-6 lg:pb-20">
        {/* Columna izquierda: Textos y llamadas a la acción */}
        <motion.div style={{ y: textY }} className="flex flex-col gap-7 lg:col-span-7 lg:pr-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
            className="flex items-center gap-4 font-label text-[11px] uppercase tracking-[0.42em] text-amber"
          >
            <span aria-hidden="true" className="h-px w-10 bg-amber" />
            Miel cruda silvestre · Gran Chaco
          </motion.p>

          <h1 className="font-serif text-[clamp(3.3rem,8.5vw,9.2rem)] font-light leading-[0.9] tracking-[-0.02em] text-cream">
            <SplitWords text="Miel Natural" delay={0.3} stagger={0.1} className="block" />
            <SplitWords
              text="del Bosque"
              delay={0.55}
              stagger={0.1}
              className="block italic"
              highlight={['del', 'Bosque']}
              highlightClassName="text-gold-gradient"
            />
            <SplitWords text="Chaqueño" delay={0.8} stagger={0.1} className="block" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: EASE }}
            className="max-w-md font-sans text-sm leading-relaxed text-cream/75 md:text-base"
          >
            Cosechada a mano en Cuevo y extraída en frío, tal como la entrega el monte. Sin pasteurizar, sin aditivos:
            <span className="text-cream font-medium"> origen intacto.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: EASE }}
            className="flex flex-wrap items-center gap-5 pt-2"
          >
            <Magnetic>
              <a
                href="#coleccion"
                onClick={(e) => go(e, '#coleccion')}
                data-cursor="Ver"
                className="btn-shine group inline-flex items-center gap-3 rounded-full bg-amber px-8 py-4 font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-forest-dark"
              >
                La colección
                <ArrowDownRight className="size-4 transition-transform duration-500 group-hover:rotate-[-45deg]" />
              </a>
            </Magnetic>
            <a
              href="#terroir"
              onClick={(e) => go(e, '#terroir')}
              className="group relative font-label text-[11px] uppercase tracking-[0.3em] text-cream/80 transition-colors hover:text-amber"
            >
              El territorio
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-[0.3] bg-current transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          </motion.div>
        </motion.div>

        {/* Columna derecha: Arco fotográfico del frasco de miel */}
        <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
          <motion.div
            style={{ y: archY, rotateX, rotateY, transformPerspective: 1200 }}
            className="relative aspect-[3/4.1] w-[min(78vw,24rem)] lg:h-[min(72svh,42rem)] lg:w-auto"
          >
            {/* Aro concéntrico exterior */}
            <motion.div
              aria-hidden="true"
              style={{ x: ringX, y: ringY }}
              className="absolute inset-0 translate-x-5 translate-y-5 rounded-t-full border border-amber/45"
            />

            {/* Fotografía del frasco con revelación por cortina */}
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.8, delay: 0.35, ease: EASE }}
              className="relative size-full overflow-hidden rounded-t-full bg-forest shadow-2xl"
            >
              <motion.div
                initial={{ scale: 1.35 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2.2, delay: 0.35, ease: EASE }}
                className="absolute inset-0"
              >
                <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
                  <Image
                    src="/images/jar-hero.webp"
                    alt="Frasco de miel cruda silvestre con tapa de madera, junto a hojas del monte chaqueño"
                    fill
                    priority
                    sizes="(min-width: 1024px) 34vw, 80vw"
                    className="object-cover object-[50%_60%]"
                  />
                </motion.div>
              </motion.div>
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, color-mix(in oklab, var(--forest-dark) 55%, transparent), transparent 40%), radial-gradient(ellipse 60% 40% at 50% 62%, color-mix(in oklab, var(--amber) 18%, transparent), transparent 70%)',
                }}
              />
            </motion.div>

            {/* Sello rotatorio artesanal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.4, delay: 1.1, ease: EASE }}
              className="absolute -left-6 bottom-14 size-28 rounded-full bg-forest-dark/85 text-amber backdrop-blur-sm sm:size-36 lg:-left-16 shadow-xl"
            >
              <RotatingSeal className="size-full p-1.5" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Coordenadas laterales */}
      <motion.p
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.4 }}
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 rotate-180 font-label text-[10px] uppercase tracking-[0.5em] text-cream/45 [writing-mode:vertical-rl] 2xl:block"
      >
        20°27′S · 63°31′W
      </motion.p>
      <motion.p
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.4 }}
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 rotate-180 font-label text-[10px] uppercase tracking-[0.5em] text-cream/45 [writing-mode:vertical-rl] 2xl:block"
      >
        Edición 2026 · Cosecha silvestre
      </motion.p>

      {/* Indicador de scroll */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="absolute bottom-7 left-6 z-10 hidden items-center gap-4 md:left-12 md:flex"
      >
        <span className="relative block h-14 w-px overflow-hidden bg-cream/20">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-amber"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <span className="font-label text-[10px] uppercase tracking-[0.45em] text-cream/55">Desliza</span>
      </motion.div>
    </section>
  )
}

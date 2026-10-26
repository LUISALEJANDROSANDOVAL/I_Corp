'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EASE, EASE_CURTAIN } from './reveal'

const DURATION = 2300

export function Preloader() {
  const [visible, setVisible] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false)
      return
    }
    const start = performance.now()
    let raf = 0
    let timer = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else timer = window.setTimeout(() => setVisible(false), 380)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
  }, [])

  // El telón empieza a abrirse: liberar scroll y arrancar las animaciones del hero.
  useEffect(() => {
    if (visible) return
    window.__mielLoaded = true
    window.dispatchEvent(new Event('miel:loaded'))
    window.dispatchEvent(new Event('miel:unlock'))
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Cargando experiencia"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-forest-dark"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.15, ease: EASE_CURTAIN }}
        >
          {/* Borde inferior curvo del telón */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-full h-[14vh] bg-forest-dark"
            style={{ borderBottomLeftRadius: '50% 100%', borderBottomRightRadius: '50% 100%' }}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 50% 45% at 50% 50%, color-mix(in oklab, var(--moss) 38%, transparent), transparent 70%)',
            }}
          />

          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.2, ease: EASE }}
            className="relative h-28 w-[min(78vw,520px)] sm:h-36"
          >
            <Image
              src="/images/logo-oficial-white.png"
              alt="Miel Natural del Bosque Chaqueño"
              fill
              priority
              sizes="520px"
              className="object-contain"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
            className="relative mt-8 font-label text-[10px] uppercase tracking-[0.55em] text-cream/65"
          >
            Origen intacto · Bosque puro Chaco
          </motion.p>

          <span
            aria-hidden="true"
            className="absolute bottom-8 left-6 font-serif text-6xl italic leading-none text-amber tabular-nums sm:bottom-10 sm:left-10 sm:text-8xl"
          >
            {String(count).padStart(3, '0')}
          </span>

          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-cream/10">
            <span className="block h-full origin-left bg-amber" style={{ transform: `scaleX(${count / 100})` }} />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

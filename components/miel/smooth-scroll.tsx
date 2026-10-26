'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'
import { SCROLL_EASE } from '@/lib/scroll'

/**
 * Scroll inercial (Lenis).
 * - Empieza bloqueado mientras corre el preloader y se libera con el evento `miel:unlock`.
 * - `miel:lock` / `miel:unlock` funcionan como contador (menú, preloader…).
 * - `miel:scrollto` permite navegar a anclas con animación (ver lib/scroll.ts).
 * - Desactivado con prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.25,
      easing: SCROLL_EASE,
      smoothWheel: true,
    })

    let locks = 1 // el preloader cuenta como un bloqueo
    const apply = () => (locks > 0 ? lenis.stop() : lenis.start())
    const lock = () => {
      locks += 1
      apply()
    }
    const unlock = () => {
      locks = Math.max(0, locks - 1)
      apply()
    }
    const onScrollTo = (e: Event) => {
      const detail = (e as CustomEvent<{ target: string | number; handled: boolean }>).detail
      detail.handled = true
      lenis.scrollTo(detail.target, { duration: 1.8, easing: SCROLL_EASE, force: true })
    }
    apply()

    // Seguro: si el preloader nunca avisa, liberar igualmente.
    const failsafe = window.setTimeout(() => {
      locks = 0
      apply()
    }, 6000)

    window.addEventListener('miel:lock', lock)
    window.addEventListener('miel:unlock', unlock)
    window.addEventListener('miel:scrollto', onScrollTo)

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.clearTimeout(failsafe)
      window.removeEventListener('miel:lock', lock)
      window.removeEventListener('miel:unlock', unlock)
      window.removeEventListener('miel:scrollto', onScrollTo)
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return null
}

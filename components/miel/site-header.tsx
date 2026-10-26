'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState, type MouseEvent } from 'react'
import { CHAPTERS, INSTAGRAM_HANDLE, whatsappLink } from '@/lib/miel'
import { scrollToTarget } from '@/lib/scroll'
import { EASE, EASE_CURTAIN } from './reveal'
import { useLoaded } from './use-loaded'

export function SiteHeader() {
  const loaded = useLoaded()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(v > 40)
    if (Math.abs(v - prev) < 4) return
    setHidden(v > prev && v > 480)
  })

  // Mientras el menú está abierto: bloquear scroll de la página de fondo y permitir Escape.
  useEffect(() => {
    if (!open) return
    window.dispatchEvent(new Event('miel:lock'))
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.dispatchEvent(new Event('miel:unlock'))
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (e: MouseEvent, target: string | number) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(target)
  }

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: !hidden || open ? 0 : -120 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[140] px-4 pt-4 md:px-8"
      >
        <nav
          aria-label="Principal"
          className={`mx-auto flex max-w-[1500px] items-center justify-between rounded-full py-2.5 pl-5 pr-2.5 transition-all duration-700 md:pl-7 ${
            scrolled || open
              ? 'border border-cream/12 bg-forest-dark/85 backdrop-blur-xl'
              : 'border border-transparent'
          }`}
        >
          <a
            href="#inicio"
            onClick={(e) => go(e, 0)}
            aria-label="Miel Natural del Bosque Chaqueño — inicio"
            data-cursor="Inicio"
          >
            <span className="relative block h-9 w-28 sm:h-10 sm:w-36">
              <Image
                src="/images/logo-oficial-white.png"
                alt="Miel Natural del Bosque Chaqueño"
                fill
                priority
                sizes="144px"
                className="object-contain object-left"
              />
            </span>
          </a>

          <p className="hidden font-label text-[10px] uppercase tracking-[0.5em] text-cream/55 lg:block">
            Cuevo · Gran Chaco · Bolivia
          </p>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-overlay"
            data-cursor={open ? 'Cerrar' : 'Menú'}
            className="group flex items-center gap-4 rounded-full border border-cream/25 bg-forest-dark/60 py-3 pl-6 pr-5 text-cream transition-colors duration-500 hover:border-amber hover:bg-amber hover:text-forest-dark"
          >
            <span className="font-label text-[11px] font-medium uppercase tracking-[0.3em]">
              {open ? 'Cerrar' : 'Menú'}
            </span>
            <span aria-hidden="true" className="relative block h-[11px] w-6">
              <span
                className="absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-500"
                style={{ transform: open ? 'translateY(5px) rotate(45deg)' : 'none' }}
              />
              <span
                className="absolute bottom-0 left-0 block h-px w-full bg-current transition-transform duration-500"
                style={{ transform: open ? 'translateY(-5px) rotate(-45deg)' : 'none' }}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-overlay"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Menú de capítulos"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.95, ease: EASE_CURTAIN }}
            className="grain fixed inset-0 z-[130] overflow-y-auto overscroll-contain bg-forest-dark"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 55% 60% at 85% 85%, color-mix(in oklab, var(--bronze) 30%, transparent), transparent 70%), radial-gradient(ellipse 50% 50% at 10% 20%, color-mix(in oklab, var(--moss) 40%, transparent), transparent 70%)',
              }}
            />

            <div className="relative z-10 mx-auto flex min-h-svh max-w-[1500px] flex-col justify-between px-6 pb-12 pt-28 md:px-12 md:pt-32">
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <ul className="flex flex-col justify-center lg:col-span-8">
                  {CHAPTERS.map((c, i) => (
                    <li key={c.id} className="overflow-hidden border-b border-cream/10 last:border-b-0">
                      <motion.a
                        href={`#${c.id}`}
                        onClick={(e) => go(e, `#${c.id}`)}
                        initial={{ y: '105%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '105%' }}
                        transition={{ duration: 0.9, delay: 0.2 + i * 0.06, ease: EASE }}
                        className="group flex items-baseline gap-4 py-2.5 md:gap-7 md:py-3.5"
                      >
                        <span className="w-8 font-label text-xs tracking-[0.25em] text-amber md:w-10">
                          {c.numeral !== '✦' ? String(i + 1).padStart(2, '0') : '✦'}
                        </span>
                        <span className="font-serif text-[clamp(2.1rem,4.4vw,4.8rem)] font-light leading-[1.05] text-cream transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-amber">
                          {c.label}
                        </span>
                      </motion.a>
                    </li>
                  ))}
                </ul>

                <motion.aside
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
                  className="flex flex-col justify-end gap-6 border-t border-cream/10 pt-6 lg:col-span-4 lg:border-t-0 lg:pt-0"
                >
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-[0.45em] text-amber">Escríbenos</p>
                    <a
                      href={whatsappLink('Hola, deseo más información sobre Miel Natural del Bosque Chaqueño.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-3 inline-flex items-center gap-2 font-serif text-2xl text-cream transition-colors hover:text-amber md:text-3xl"
                    >
                      WhatsApp
                      <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
                    </a>
                    <br />
                    <a
                      href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-2 inline-flex items-center gap-2 font-serif text-2xl text-cream transition-colors hover:text-amber md:text-3xl"
                    >
                      Instagram
                      <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
                    </a>
                  </div>

                  <p className="font-label text-[10px] uppercase leading-loose tracking-[0.4em] text-cream/45">
                    20°27′S · Cuevo
                    <br />
                    Provincia Cordillera, Santa Cruz · Bolivia
                  </p>
                </motion.aside>
              </div>

              <div className="mt-8 border-t border-cream/10 pt-4 font-label text-[10px] uppercase tracking-[0.35em] text-cream/35">
                Miel Natural del Bosque Chaqueño · Origen Intacto
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/** Curva editorial: arranque suave, frenada larga. */
export const EASE = [0.16, 1, 0.3, 1] as const
/** Curva de cortinas / paneles (más dramática). */
export const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li'
}) {
  const reduce = useReducedMotion()
  const Component = as === 'li' ? motion.li : motion.div
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </Component>
  )
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-4 font-label text-[11px] font-medium uppercase tracking-[0.4em] ${className}`}>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-60" />
      {children}
    </p>
  )
}

/**
 * Titular partido por palabras con máscara de corte (cada palabra sube desde su propia línea).
 * - `onView`: se dispara al entrar en pantalla. Si es false, depende de `play`.
 * - El texto completo queda en `sr-only` para lectores de pantalla.
 */
export function SplitWords({
  text,
  className = '',
  delay = 0,
  stagger = 0.07,
  onView = true,
  play = true,
  highlight,
  highlightClassName = '',
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  onView?: boolean
  play?: boolean
  highlight?: string[]
  highlightClassName?: string
}) {
  const reduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => {
          const motionProps = onView
            ? {
                initial: { y: reduce ? 0 : '118%' },
                whileInView: { y: 0 },
                viewport: { once: true, margin: '-8% 0px' },
              }
            : {
                initial: { y: reduce ? 0 : '118%' },
                animate: { y: play ? 0 : reduce ? 0 : '118%' },
              }
          return (
            <span key={`${w}-${i}`} className="inline-block overflow-hidden px-[0.04em] pb-[0.14em] -mx-[0.04em] -mb-[0.14em] align-bottom">
              <motion.span
                className={`inline-block ${highlight?.includes(w) ? highlightClassName : ''}`}
                {...motionProps}
                transition={{ duration: 1.2, delay: delay + i * stagger, ease: EASE }}
              >
                {w}
              </motion.span>
              {i < words.length - 1 ? '\u00A0' : null}
            </span>
          )
        })}
      </span>
    </span>
  )
}

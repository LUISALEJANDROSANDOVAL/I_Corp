'use client'

import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

/**
 * Cursor de autor: punto + anillo con inercia.
 * Se activa sólo con puntero fino (no táctil). Cualquier elemento con `data-cursor="Texto"`
 * convierte el anillo en una etiqueta ámbar; enlaces y botones lo agrandan.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 170, damping: 20, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 170, damping: 20, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('[data-cursor], a, button') as HTMLElement | null
      setHover(Boolean(el))
      setLabel(el?.dataset.cursor ?? '')
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)

    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  const size = label ? 96 : hover ? 56 : 34

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[300]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <span className="absolute -left-[3px] -top-[3px] block size-1.5 rounded-full bg-amber" />
      </motion.div>

      <motion.div style={{ x: rx, y: ry }} className="absolute left-0 top-0">
        <motion.div
          animate={{ width: size, height: size }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border transition-colors duration-300 ${
            label
              ? 'border-amber bg-amber text-forest-dark'
              : 'border-amber/70 bg-amber/0 mix-blend-difference'
          }`}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
                className="font-label text-[10px] font-semibold uppercase tracking-[0.25em]"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

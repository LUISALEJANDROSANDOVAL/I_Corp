'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EASE } from './reveal'

type Chapter = { name: string; numeral: string }

/** Indicador fijo del capítulo actual (sólo escritorio). */
export function ChapterIndicator() {
  const [chapter, setChapter] = useState<Chapter | null>(null)

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'))
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            setChapter({ name: el.dataset.chapter ?? '', numeral: el.dataset.numeral ?? '' })
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-8 left-8 z-[110] hidden mix-blend-difference lg:block"
    >
      <AnimatePresence mode="wait">
        {chapter && (
          <motion.p
            key={chapter.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-3 font-label text-[10px] uppercase tracking-[0.35em] text-cream"
          >
            <span>{chapter.numeral}</span>
            <span className="h-px w-8 bg-cream/70" />
            <span>{chapter.name}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

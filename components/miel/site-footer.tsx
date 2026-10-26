'use client'

import Image from 'next/image'
import { CHAPTERS, INSTAGRAM_HANDLE, whatsappLink } from '@/lib/miel'
import { scrollToTarget } from '@/lib/scroll'

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-forest-dark text-cream">
      <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-6 pb-8 pt-20 md:grid-cols-12 md:px-12">
        <div className="flex flex-col gap-6 md:col-span-5">
          <Image
            src="/images/logo-oficial-white.png"
            alt="Miel Natural del Bosque Chaqueño"
            width={220}
            height={96}
            className="h-auto w-44"
          />
          <p className="max-w-sm font-sans text-sm leading-relaxed text-cream/60">
            Miel cruda, cosechada en frío, desde el monte chaqueño de Cuevo, Cordillera — Santa Cruz, Bolivia.
          </p>
        </div>

        <nav aria-label="Capítulos" className="md:col-span-4">
          <p className="mb-5 font-label text-[10px] uppercase tracking-[0.4em] text-amber">Capítulos</p>
          <ul className="flex flex-col gap-3">
            {CHAPTERS.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToTarget(`#${c.id}`)
                  }}
                  className="group inline-flex items-baseline gap-4 font-serif text-xl text-cream/80 transition-colors hover:text-amber"
                >
                  <span className="w-6 font-label text-[10px] tracking-[0.2em] text-bronze">{c.numeral}</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-2">{c.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-5 md:col-span-3">
          <p className="font-label text-[10px] uppercase tracking-[0.4em] text-amber">Contacto</p>
          <a
            href={whatsappLink('Hola, me gustaría conocer Miel Natural del Bosque Chaqueño.')}
            target="_blank"
            rel="noreferrer"
            className="font-serif text-xl text-cream/80 transition-colors hover:text-amber"
          >
            WhatsApp ↗
          </a>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noreferrer"
            className="font-serif text-xl text-cream/80 transition-colors hover:text-amber"
          >
            Instagram ↗
          </a>
          <button
            onClick={() => scrollToTarget(0)}
            data-cursor="Subir"
            className="mt-4 self-start font-label text-[10px] uppercase tracking-[0.4em] text-cream/60 transition-colors hover:text-amber"
          >
            ↑ Volver arriba
          </button>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="text-outline pointer-events-none select-none whitespace-nowrap text-center font-serif text-[19vw] font-light italic leading-[0.85]"
      >
        Bosque Puro
      </p>

      <div className="relative z-10 mx-auto flex max-w-[1500px] flex-col gap-2 border-t border-cream/10 px-6 py-6 font-label text-[10px] uppercase tracking-[0.3em] text-cream/40 sm:flex-row sm:justify-between md:px-12">
        <span>© 2026 Miel Natural del Bosque Chaqueño</span>
        <span>Cosecha artesanal en frío · Origen intacto</span>
      </div>
    </footer>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

type Engine = { ctx: AudioContext; gain: GainNode; stop: () => void }

/** Ambiente sonoro opcional (viento en el monte) generado con Web Audio. Apagado por defecto. */
export function Soundscape() {
  const [on, setOn] = useState(false)
  const engine = useRef<Engine | null>(null)

  const build = (): Engine => {
    const ctx = new AudioContext()
    const len = ctx.sampleRate * 4
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const d = buf.getChannelData(0)
    let last = 0
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1
      last = (last + 0.02 * w) / 1.02 // ruido marrón
      d[i] = last * 3.5
    }
    const src = ctx.createBufferSource()
    src.buffer = buf
    src.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 420
    filter.Q.value = 0.7

    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.11
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 220
    lfo.connect(lfoGain).connect(filter.frequency)

    const gain = ctx.createGain()
    gain.gain.value = 0
    src.connect(filter).connect(gain).connect(ctx.destination)
    src.start()
    lfo.start()
    return {
      ctx,
      gain,
      stop: () => {
        src.stop()
        lfo.stop()
        ctx.close()
      },
    }
  }

  const toggle = () => {
    if (!on) {
      const e = (engine.current ??= build())
      e.ctx.resume()
      e.gain.gain.cancelScheduledValues(e.ctx.currentTime)
      e.gain.gain.linearRampToValueAtTime(0.35, e.ctx.currentTime + 2)
      setOn(true)
    } else if (engine.current) {
      const e = engine.current
      e.gain.gain.cancelScheduledValues(e.ctx.currentTime)
      e.gain.gain.linearRampToValueAtTime(0, e.ctx.currentTime + 1)
      setOn(false)
    }
  }

  useEffect(() => () => engine.current?.stop(), [])

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Silenciar sonido ambiente' : 'Activar sonido ambiente'}
      data-cursor={on ? 'Silencio' : 'Sonido'}
      className="fixed bottom-7 right-6 z-[110] flex items-center gap-3 mix-blend-difference md:right-10"
    >
      <span className="hidden font-label text-[10px] uppercase tracking-[0.35em] text-cream sm:inline">
        Sonido {on ? 'on' : 'off'}
      </span>
      <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-[2px] origin-bottom bg-cream transition-transform duration-500"
            style={{
              height: '100%',
              transform: on ? undefined : 'scaleY(0.2)',
              animation: on ? `sound-bar 1.${i + 2}s ease-in-out ${i * 0.15}s infinite alternate` : undefined,
            }}
          />
        ))}
      </span>
    </button>
  )
}

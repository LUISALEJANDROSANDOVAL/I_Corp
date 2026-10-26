'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  z: number
  r: number
  vx: number
  vy: number
  phase: number
  leaf: boolean
  rot: number
  vr: number
}

const AMBER = '242, 169, 34'
const CREAM = '247, 245, 240'
const MOSS = '74, 93, 78'

export function PollenField({ density = 70 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let raf = 0
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, px: -9999, py: -9999 }
    let particles: Particle[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(density * Math.min(1, width / 1200) + 20)
      particles = Array.from({ length: count }, () => {
        const leaf = Math.random() < 0.12
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 0.9 + 0.1,
          r: leaf ? Math.random() * 5 + 4 : Math.random() * 1.8 + 0.4,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -(Math.random() * 0.25 + 0.05),
          phase: Math.random() * Math.PI * 2,
          leaf,
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 0.01,
        }
      })
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = (e.clientX - rect.left) / rect.width - 0.5
      mouse.ty = (e.clientY - rect.top) / rect.height - 0.5
      mouse.px = e.clientX - rect.left
      mouse.py = e.clientY - rect.top
    }

    const drawLeaf = (p: Particle, x: number, y: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(p.rot)
      ctx.beginPath()
      ctx.ellipse(0, 0, p.r * 0.45, p.r, 0, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${MOSS}, ${0.35 + p.z * 0.35})`
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(0, -p.r)
      ctx.lineTo(0, p.r)
      ctx.strokeStyle = `rgba(${AMBER}, ${0.25 * p.z})`
      ctx.lineWidth = 0.6
      ctx.stroke()
      ctx.restore()
    }

    let t = 0
    let running = true
    const tick = () => {
      if (!running) return
      t += 0.01
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx + Math.sin(t + p.phase) * 0.15 * p.z
          p.y += p.vy * p.z
          p.rot += p.vr

          const dx = p.x - mouse.px
          const dy = p.y - mouse.py
          const dist = Math.hypot(dx, dy)
          if (dist < 120) {
            const force = (1 - dist / 120) * 1.2 * p.z
            p.x += (dx / (dist || 1)) * force
            p.y += (dy / (dist || 1)) * force
          }

          if (p.y < -20) {
            p.y = height + 20
            p.x = Math.random() * width
          }
          if (p.x < -20) p.x = width + 20
          if (p.x > width + 20) p.x = -20
        }

        const ox = -mouse.x * 60 * p.z
        const oy = -mouse.y * 40 * p.z
        const x = p.x + ox
        const y = p.y + oy

        if (p.leaf) {
          drawLeaf(p, x, y)
          continue
        }

        const twinkle = 0.5 + Math.sin(t * 3 + p.phase) * 0.5
        const alpha = (0.25 + twinkle * 0.6) * p.z
        const glow = ctx.createRadialGradient(x, y, 0, x, y, p.r * 6)
        glow.addColorStop(0, `rgba(${AMBER}, ${alpha * 0.55})`)
        glow.addColorStop(1, `rgba(${AMBER}, 0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(x, y, p.r * 6, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(${twinkle > 0.85 ? CREAM : AMBER}, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting
      if (visible && !running) {
        running = true
        raf = requestAnimationFrame(tick)
      } else if (!visible) {
        running = false
      }
    })
    io.observe(canvas)

    resize()
    tick()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      running = false
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [density])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />
}

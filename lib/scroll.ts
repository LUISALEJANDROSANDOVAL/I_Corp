export const SCROLL_EASE = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

/**
 * Desplazamiento suave hacia un ancla (`#id`) o una posición en px.
 * Usa Lenis si está activo; si no (prefers-reduced-motion), cae al scroll nativo.
 */
export function scrollToTarget(target: string | number) {
  if (typeof window === 'undefined') return
  const detail = { target, handled: false }
  window.dispatchEvent(new CustomEvent('miel:scrollto', { detail }))
  if (detail.handled) return
  if (typeof target === 'number') {
    window.scrollTo({ top: target })
  } else {
    document.querySelector(target)?.scrollIntoView()
  }
}

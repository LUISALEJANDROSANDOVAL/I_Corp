'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    __mielLoaded?: boolean
  }
}

/** true cuando el preloader ya abrió el telón. Las animaciones de entrada del hero esperan a esto. */
export function useLoaded() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (window.__mielLoaded) {
      setLoaded(true)
      return
    }
    const on = () => setLoaded(true)
    window.addEventListener('miel:loaded', on, { once: true })
    const failsafe = window.setTimeout(on, 5500)
    return () => {
      window.removeEventListener('miel:loaded', on)
      window.clearTimeout(failsafe)
    }
  }, [])

  return loaded
}

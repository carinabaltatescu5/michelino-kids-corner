import { useReducedMotion } from 'framer-motion'
import { useSyncExternalStore } from 'react'

export const ease = [0.22, 1, 0.36, 1]
export const springy = [0.34, 1.56, 0.64, 1]

const MOBILE_QUERY = '(max-width: 767px)'

function subscribeMobile(callback) {
  const mediaQuery = window.matchMedia(MOBILE_QUERY)
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

export function useIsMobile() {
  return useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  )
}

// 'full' pe desktop, 'lite' pe mobil, 'none' cu prefers-reduced-motion
export function useMotionLevel() {
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()
  if (reduced) return 'none'
  return isMobile ? 'lite' : 'full'
}

export const inView = { once: true, amount: 0.25 }

export function riseIn(level, delay = 0, distance = 36) {
  if (level === 'none') return { initial: false }
  return {
    initial: { opacity: 0, y: level === 'lite' ? distance / 2 : distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: inView,
    transition: { duration: 0.8, delay, ease },
  }
}

export function popIn(level, delay = 0, rotate = 0) {
  if (level === 'none') return { initial: false }
  return {
    initial: { opacity: 0, scale: 0.6, rotate: rotate - 12 },
    whileInView: { opacity: 1, scale: 1, rotate },
    viewport: inView,
    transition: { duration: 0.6, delay, ease: springy },
  }
}

export function slideFrom(level, side = 'left', delay = 0) {
  if (level === 'none') return { initial: false }
  const x = (side === 'left' ? -1 : 1) * (level === 'lite' ? 40 : 120)
  return {
    initial: { opacity: 0, x },
    whileInView: { opacity: 1, x: 0 },
    viewport: inView,
    transition: { duration: 0.9, delay, ease },
  }
}

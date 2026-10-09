import { useId } from 'react'
import { cn } from '../../lib/utils'

const BLOBS = [
  'M210 40 C 300 30, 380 90, 370 180 C 362 260, 290 330, 200 320 C 110 312, 30 260, 36 170 C 42 90, 120 50, 210 40 Z',
  'M180 30 C 270 20, 372 70, 360 160 C 350 240, 310 340, 200 336 C 100 332, 20 280, 30 190 C 40 100, 90 40, 180 30 Z',
  'M220 50 C 330 60, 380 140, 350 220 C 320 300, 230 340, 150 310 C 70 280, 20 200, 50 130 C 80 60, 140 44, 220 50 Z',
]

// Pată de acuarelă pastel: margini neregulate (turbulență) + un inel mai închis la margine.
export default function Watercolor({ color = '#f9c9d4', variant = 0, className, opacity = 0.75 }) {
  const id = useId().replace(/:/g, '')
  const d = BLOBS[variant % BLOBS.length]
  return (
    <svg viewBox="0 0 400 370" aria-hidden="true" className={cn('pointer-events-none absolute', className)} style={{ opacity }}>
      <defs>
        <filter id={`wc-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed={variant + 2} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="38" result="shape" />
          <feGaussianBlur in="shape" stdDeviation="3" />
        </filter>
        <radialGradient id={`wg-${id}`} cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor={color} stopOpacity="0.55" />
          <stop offset="78%" stopColor={color} stopOpacity="0.85" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </radialGradient>
      </defs>
      <g filter={`url(#wc-${id})`}>
        <path d={d} fill={`url(#wg-${id})`} />
        <path d={d} fill="none" stroke={color} strokeWidth="6" opacity="0.9" />
      </g>
    </svg>
  )
}

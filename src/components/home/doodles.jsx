import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { ease } from './motion'

// Un path care se „desenează” cu creionul la apariție (o singură dată).
function DrawPath({ d, delay = 0, duration = 0.9, strokeWidth = 4, color = 'currentColor', ...rest }) {
  const reduced = useReducedMotion()
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={reduced ? false : { pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ pathLength: { duration, delay, ease }, opacity: { duration: 0.01, delay } }}
      {...rest}
    />
  )
}

// Filtru comun pentru textura de creion cerat (margini ușor zdrențuite).
export function CrayonFilter({ id = 'crayon' }) {
  return (
    <defs>
      <filter id={id} x="-10%" y="-30%" width="120%" height="160%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" />
      </filter>
    </defs>
  )
}

export function ScribbleUnderline({ className, color = '#ef8061', delay = 0.3 }) {
  return (
    <svg viewBox="0 0 300 30" preserveAspectRatio="none" className={cn('pointer-events-none', className)} aria-hidden="true">
      <CrayonFilter id="crayon-underline" />
      <g filter="url(#crayon-underline)">
        <DrawPath d="M6 19 C 60 9, 120 22, 180 13 S 270 10, 294 16" color={color} strokeWidth={7} delay={delay} />
        <DrawPath d="M30 25 C 90 17, 170 27, 262 20" color={color} strokeWidth={3.5} delay={delay + 0.6} duration={0.7} opacity={0.7} />
      </g>
    </svg>
  )
}

export function ScribbleCircle({ className, color = '#ef8061', delay = 0.2, strokeWidth = 4 }) {
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="none" className={cn('pointer-events-none', className)} aria-hidden="true">
      <CrayonFilter id="crayon-circle" />
      <g filter="url(#crayon-circle)">
        <DrawPath
          d="M215 18 C 120 10, 22 40, 20 100 C 18 165, 140 190, 230 182 C 330 174, 386 140, 380 92 C 374 40, 290 14, 196 22 C 150 26, 120 34, 98 44"
          color={color}
          strokeWidth={strokeWidth}
          delay={delay}
          duration={1.4}
        />
      </g>
    </svg>
  )
}

export function ScribbleArrow({ className, color = '#831843', delay = 0.4 }) {
  return (
    <svg viewBox="0 0 120 90" className={cn('pointer-events-none', className)} aria-hidden="true">
      <DrawPath d="M8 10 C 30 60, 70 76, 106 70" color={color} strokeWidth={4} delay={delay} />
      <DrawPath d="M88 56 L 108 70 L 88 84" color={color} strokeWidth={4} delay={delay + 0.8} duration={0.35} />
    </svg>
  )
}

export function Star({ className, color = '#f9bd3b', filled = false }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('pointer-events-none', className)} aria-hidden="true">
      <path
        d="M20 3 L24.5 15 L37 15.6 L27 23.4 L30.6 36 L20 28.6 L9.4 36 L13 23.4 L3 15.6 L15.5 15 Z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Sparkle({ className, color = '#f9bd3b' }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('pointer-events-none', className)} aria-hidden="true">
      <path d="M20 2 C 21 14, 26 19, 38 20 C 26 21, 21 26, 20 38 C 19 26, 14 21, 2 20 C 14 19, 19 14, 20 2 Z" fill={color} />
    </svg>
  )
}

export function Spiral({ className, color = '#65c7c0', delay = 0.2 }) {
  return (
    <svg viewBox="0 0 100 100" className={cn('pointer-events-none', className)} aria-hidden="true">
      <DrawPath
        d="M50 50 C 50 44, 58 44, 58 50 C 58 60, 42 60, 42 50 C 42 36, 66 36, 66 50 C 66 68, 34 68, 34 50 C 34 28, 76 28, 76 50 C 76 76, 24 76, 24 50"
        color={color}
        strokeWidth={4}
        delay={delay}
        duration={1.6}
      />
    </svg>
  )
}

export function Balloon({ className, color = '#f9c9d4', string = '#1d4354' }) {
  return (
    <svg viewBox="0 0 60 120" className={cn('pointer-events-none', className)} aria-hidden="true">
      <path d="M30 70 C 26 82, 36 90, 30 100 C 25 108, 34 112, 31 119" fill="none" stroke={string} strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
      <path d="M30 4 C 50 4, 56 22, 56 34 C 56 54, 40 68, 30 70 C 20 68, 4 54, 4 34 C 4 22, 10 4, 30 4 Z" fill={color} stroke={string} strokeOpacity="0.18" strokeWidth="1.5" />
      <path d="M26 70 L 34 70 L 30 76 Z" fill={color} />
      <path d="M16 20 C 18 14, 22 11, 27 10" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  )
}

export function Crayon({ className, color = '#ef8061' }) {
  return (
    <svg viewBox="0 0 120 30" className={cn('pointer-events-none', className)} aria-hidden="true">
      <path d="M2 15 L 22 5 L 22 25 Z" fill={color} />
      <path d="M2 15 L 9 11.5 L 9 18.5 Z" fill="#1d4354" opacity="0.55" />
      <rect x="22" y="5" width="90" height="20" rx="3" fill={color} />
      <rect x="40" y="5" width="12" height="20" fill="#fff" opacity="0.35" />
      <rect x="80" y="5" width="12" height="20" fill="#fff" opacity="0.35" />
      <rect x="108" y="5" width="10" height="20" rx="3" fill="#1d4354" opacity="0.2" />
    </svg>
  )
}

export function Mask({ className, color = '#d75b87' }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('pointer-events-none', className)} aria-hidden="true">
      <path d="M4 14 C 10 10, 30 10, 36 14 C 36 26, 26 28, 20 22 C 14 28, 4 26, 4 14 Z" fill="none" stroke={color} strokeWidth="2.8" strokeLinejoin="round" />
      <circle cx="13" cy="17" r="3" fill={color} />
      <circle cx="27" cy="17" r="3" fill={color} />
    </svg>
  )
}

export function Brush({ className, color = '#c98a10' }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('pointer-events-none', className)} aria-hidden="true">
      <path d="M30 5 L 35 10 L 19 26 L 14 21 Z" fill="none" stroke={color} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M14 21 C 8 21, 5 26, 6 34 C 13 35, 19 32, 19 26 Z" fill={color} />
    </svg>
  )
}

export function Slide({ className, color = '#16817d' }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('pointer-events-none', className)} aria-hidden="true">
      <path d="M8 34 L 8 8 L 14 8 L 14 34 M8 16 L 14 16 M8 24 L 14 24 M14 8 C 22 8, 24 30, 36 34" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Flag({ className, color = '#16817d' }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('pointer-events-none', className)} aria-hidden="true">
      <path d="M2 8 C 14 14, 26 14, 38 8" fill="none" stroke="#1d4354" strokeWidth="1.6" opacity="0.5" />
      <path d="M8 11 L 12 24 L 16 13 Z M20 13 L 22 27 L 27 12 Z M30 11 L 31 23 L 36 9 Z" fill={color} />
    </svg>
  )
}

// Bandă adezivă desenată (pentru colțurile pozelor și bilețelelor).
export function Tape({ className, color = 'rgba(255, 232, 168, 0.85)' }) {
  return (
    <svg viewBox="0 0 120 36" className={cn('pointer-events-none', className)} aria-hidden="true">
      <path d="M4 6 L 10 3 L 8 9 L 116 4 L 112 11 L 117 16 L 112 22 L 116 30 L 6 33 L 9 27 L 3 21 L 8 14 Z" fill={color} />
    </svg>
  )
}

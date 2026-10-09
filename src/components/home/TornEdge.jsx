import { cn } from '../../lib/utils'

const EDGES = [
  'M0 40 L0 22 L18 26 L34 14 L52 22 L66 10 L88 20 L104 12 L122 24 L140 8 L160 18 L176 12 L196 26 L214 14 L230 20 L250 6 L268 18 L286 12 L304 24 L322 10 L340 20 L360 14 L378 26 L396 16 L414 22 L432 8 L452 20 L470 12 L488 24 L506 14 L524 20 L544 6 L562 18 L580 14 L600 26 L600 40 Z',
  'M0 40 L0 18 L20 12 L38 24 L56 14 L74 20 L92 6 L112 18 L130 12 L148 26 L168 14 L186 22 L204 10 L224 20 L242 14 L262 26 L280 8 L298 18 L318 12 L336 24 L354 16 L372 22 L392 8 L410 20 L428 12 L446 24 L466 14 L484 20 L502 6 L522 18 L540 12 L558 24 L578 16 L600 20 L600 40 Z',
]

// Marginea de foaie ruptă, pusă deasupra unei secțiuni (sau dedesubt cu flip).
export default function TornEdge({ color = '#fffaf3', variant = 0, flip = false, className }) {
  return (
    <svg
      viewBox="0 0 600 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 z-10 block h-6 w-full sm:h-10',
        flip ? 'bottom-0 translate-y-[98%] rotate-180' : 'top-0 -translate-y-[98%]',
        className,
      )}
      style={{ filter: 'drop-shadow(0 -6px 6px rgba(29, 67, 84, 0.10))' }}
    >
      <path d={EDGES[variant % EDGES.length]} fill={color} />
      <path d={EDGES[variant % EDGES.length]} fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.6" transform="translate(0 1.5)" />
    </svg>
  )
}

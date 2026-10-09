import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Sparkle, Spiral } from './doodles'

const sparkles = [
  { className: 'left-[18%] top-[22%] w-5 md:w-8', color: '#ffe8a8', delay: 0 },
  { className: 'right-[22%] top-[18%] w-4 md:w-7', color: '#f9c9d4', delay: 0.8 },
  { className: 'right-[8%] top-[42%] hidden w-6 md:block', color: '#ffffff', delay: 1.5 },
  { className: 'left-[7%] top-[46%] hidden w-5 md:block', color: '#cdeefa', delay: 2.1 },
]

// Elementele jucăușe de peste imaginea/video-ul de început.
export default function HeroOverlay({ level }) {
  const animate = level !== 'none'

  return (
    <div className="absolute inset-0 z-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.className}
            className={`absolute ${sparkle.className}`}
            animate={animate ? { scale: [0.6, 1.15, 0.6], rotate: [0, 45, 0], opacity: [0.5, 1, 0.5] } : undefined}
            transition={{ duration: 2.6, delay: sparkle.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkle color={sparkle.color} className="h-auto w-full drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
          </motion.div>
        ))}

        <Spiral color="#ffe8a8" className="absolute left-[4%] top-[18%] hidden w-16 opacity-80 md:block" delay={0.8} />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-2 text-center md:pb-24">
        <motion.a
          href="#servicii"
          animate={animate ? { y: [0, -8, 0], rotate: [-1, 1, -1] } : undefined}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="home-glow-btn group relative inline-flex min-h-11 items-center gap-3 rounded-full bg-berry px-6 py-3 font-display2 text-lg font-extrabold text-white sm:px-8 sm:py-5 sm:text-xl"
        >
          Vezi servicii <ArrowDown size={21} className="transition-transform duration-300 group-hover:translate-y-1" />
          <svg viewBox="0 0 200 12" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-3 left-6 right-6 h-3 w-[calc(100%-3rem)]" aria-hidden="true">
            <path
              d="M4 7 C 50 2, 120 11, 196 5"
              fill="none"
              stroke="#ffe8a8"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              className="[stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 group-hover:[stroke-dashoffset:0]"
            />
          </svg>
        </motion.a>
      </div>
    </div>
  )
}

import { motion, useInView } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { Balloon, Brush, Mask, ScribbleUnderline, Slide, Sparkle, Tape } from './doodles'
import { ease, popIn, riseIn } from './motion'
import TornEdge from './TornEdge'
import Watercolor from './Watercolor'

const VIEW_W = 1000
const VIEW_H = 900

// Liniile de pensulă care dezvăluie prima poză (în zigzag, de sus în jos).
const REVEAL_STROKES = {
  full: [
    'M-60 120 C 260 40, 640 200, 1060 80',
    'M1060 330 C 700 270, 320 420, -60 310',
    'M-60 560 C 300 480, 680 640, 1060 530',
    'M1060 800 C 700 740, 300 880, -60 790',
  ],
  lite: [
    'M-60 230 C 300 140, 700 320, 1060 200',
    'M1060 690 C 700 610, 300 780, -60 680',
  ],
}
const REVEAL_WIDTH = { full: 310, lite: 560 }

// O singură mișcare de „colorat” în zigzag pentru schimbarea pozelor.
const SWAP_STROKE = 'M-120 90 L 1120 60 L -120 460 L 1120 420 L -120 840 L 1120 820'

function BrushImage({ image, strokes, strokeWidth, play, instant, stagger = 0.35, duration = 0.55, onDone }) {
  const uid = useId().replace(/:/g, '')
  const lastIndex = strokes.length - 1
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    onDone?.()
  }

  useEffect(() => {
    if (instant && play && !doneRef.current) {
      doneRef.current = true
      onDone?.()
    }
  }, [instant, play, onDone])

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 h-full w-full" role="img" aria-label={image.alt}>
      <defs>
        <filter id={`rough-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="55" />
        </filter>
        <mask id={`mask-${uid}`} maskUnits="userSpaceOnUse" x="0" y="0" width={VIEW_W} height={VIEW_H}>
          <rect width={VIEW_W} height={VIEW_H} fill="black" />
          {instant ? (
            <rect width={VIEW_W} height={VIEW_H} fill="white" opacity={play ? 1 : 0} />
          ) : (
            <>
              <g filter={`url(#rough-${uid})`}>
                {strokes.map((d, index) => (
                  <motion.path
                    key={d}
                    d={d}
                    fill="none"
                    stroke="white"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{
                      pathLength: { duration, delay: index * stagger, ease: [0.65, 0, 0.35, 1] },
                      opacity: { duration: 0.01, delay: index * stagger },
                    }}
                  />
                ))}
              </g>
              {/* Plasă de siguranță: la final poza e 100% vizibilă */}
              <motion.rect
                width={VIEW_W}
                height={VIEW_H}
                fill="white"
                initial={{ opacity: 0 }}
                animate={play ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: lastIndex * stagger + duration }}
                onAnimationComplete={() => play && finish()}
              />
            </>
          )}
        </mask>
      </defs>
      <image
        href={image.src}
        width={VIEW_W}
        height={VIEW_H}
        preserveAspectRatio="xMidYMid slice"
        mask={`url(#mask-${uid})`}
      />
    </svg>
  )
}

function BrushGallery({ gallery, level }) {
  const frameRef = useRef(null)
  const hasEntered = useInView(frameRef, { once: true, amount: 0.35 })
  const isVisible = useInView(frameRef, { amount: 0.2 })
  const [revealed, setRevealed] = useState(false)
  const [current, setCurrent] = useState(0)
  const [incoming, setIncoming] = useState(null)
  const instant = level === 'none'
  const strokeSet = level === 'full' ? 'full' : 'lite'

  // Slideshow-ul pornește abia după dezvăluire și doar cât secțiunea e vizibilă.
  useEffect(() => {
    if (!revealed || !isVisible || incoming !== null) return undefined
    const timer = window.setTimeout(() => setIncoming((current + 1) % gallery.length), 3500)
    return () => window.clearTimeout(timer)
  }, [revealed, isVisible, incoming, current, gallery.length])

  const finishSwap = () => {
    setCurrent((value) => incoming ?? value)
    setIncoming(null)
  }

  const shown = incoming ?? current

  return (
    <div className="relative">
      <div
        ref={frameRef}
        className="relative rotate-[-2deg] rounded-[2rem] bg-white p-3 shadow-[0_30px_60px_-25px_rgba(131,24,67,0.35),0_8px_20px_-10px_rgba(29,67,84,0.25)] sm:p-4"
      >
        <div className="relative aspect-[10/9] overflow-hidden rounded-[1.4rem] bg-[#fdf3ea]">
          {/* Contur desenat înainte de dezvăluire */}
          <div className="absolute inset-0 flex items-center justify-center font-hand text-3xl text-coral/40" aria-hidden="true">
            {!revealed && '✎'}
          </div>

          {revealed ? (
            <BrushImage key={`base-${current}`} image={gallery[current]} strokes={[]} strokeWidth={0} play instant />
          ) : (
            <BrushImage
              image={gallery[0]}
              strokes={REVEAL_STROKES[strokeSet]}
              strokeWidth={REVEAL_WIDTH[strokeSet]}
              play={hasEntered}
              instant={instant}
              onDone={() => setRevealed(true)}
            />
          )}

          {incoming !== null && (
            <BrushImage
              key={`swap-${incoming}`}
              image={gallery[incoming]}
              strokes={[SWAP_STROKE]}
              strokeWidth={380}
              duration={1.2}
              play
              instant={instant}
              onDone={finishSwap}
            />
          )}
        </div>

        <motion.div
          className="absolute -bottom-6 left-6 right-6 flex items-center justify-between gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg shadow-ink/10 sm:left-10 sm:right-10"
          initial={instant ? false : { opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease }}
        >
          <span className="font-hand text-xl font-bold leading-none text-berry sm:text-3xl">{gallery[shown].label}</span>
          <div className="flex gap-1" aria-label="Selectează imaginea">
            {gallery.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => revealed && index !== shown && incoming === null && setIncoming(index)}
                aria-label={`Arată imaginea ${index + 1}`}
                aria-pressed={index === shown}
                className="flex h-8 items-center justify-center px-0.5"
              >
                <span className={cn('block h-2.5 rounded-full transition-all', index === shown ? 'w-7 bg-coral' : 'w-2.5 bg-berry/25')} />
              </button>
            ))}
          </div>
        </motion.div>

        <Tape className="absolute -left-6 -top-4 w-28 -rotate-[24deg] sm:w-32" />
        <Tape className="absolute -right-5 -top-3 w-24 rotate-[18deg]" color="rgba(205, 238, 250, 0.9)" />
      </div>
    </div>
  )
}

const stickers = [
  { label: 'mascote iubite', bg: 'bg-blush', tilt: '-4deg', Icon: Mask },
  { label: 'pictură pe față', bg: 'bg-butter', tilt: '3deg', Icon: Brush },
  { label: 'distracție și tobogane', bg: 'bg-[#d4f2ee]', tilt: '-2deg', Icon: Slide },
]

export default function StorySection({ gallery, level }) {
  const markerRef = useRef(null)
  const markerOn = useInView(markerRef, { once: true, amount: 1 })
  const float = level === 'full'

  return (
    <section id="despre" className="home-paper relative z-10 overflow-x-clip px-5 pb-28 pt-20 sm:px-10 sm:pb-36 sm:pt-28">
      <TornEdge color="#fffaf3" />

      <Watercolor color="#cdeefa" variant={1} className="-left-24 top-24 w-[420px] sm:w-[560px]" opacity={0.55} />
      <Watercolor color="#ffd9c7" variant={0} className="-right-24 top-10 w-[520px] sm:w-[780px]" opacity={0.6} />
      <Watercolor color="#e3d9ff" variant={2} className="bottom-0 left-[30%] hidden w-[340px] lg:block" opacity={0.45} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="relative">
          <motion.p {...riseIn(level, 0)} className="font-hand text-3xl font-bold text-coralDark sm:text-4xl">
            Din 2012 în Satu Mare
          </motion.p>

          <motion.h2
            {...riseIn(level, 0.1)}
            className="mt-1 font-display2 text-5xl font-extrabold leading-[1] tracking-[-0.02em] text-ink sm:text-7xl"
          >
            Povestea{' '}
            <span className="relative inline-block text-berry">
              noastră
              <ScribbleUnderline className="absolute -bottom-3 left-0 h-5 w-full sm:-bottom-4 sm:h-6" color="#f9bd3b" delay={0.6} />
            </span>
          </motion.h2>

          <motion.div {...riseIn(level, 0.2)} className="mt-10 max-w-lg font-round text-lg font-semibold leading-relaxed text-slateInk/80">
            <p className="mb-5">
              Din 2012, la Michelino transformăm orice petrecere într-un univers de basm, unde hohotele de râs nu se mai opresc. Venim încărcați cu magie, jocuri captivante și personajele mult visate, gata să creăm o atmosferă de neuitat.
            </p>
            <p>
              Rețeta noastră este simplă:{' '}
              <span ref={markerRef} className={cn('home-marker box-decoration-clone font-extrabold text-ink', markerOn && 'is-on')}>
                tu aduci copiii, noi aducem distracția!
              </span>{' '}
              Ție îți rămâne doar să te relaxezi și să colecționezi cele mai frumoase amintiri.
            </p>
          </motion.div>

          <ul className="mt-10 flex flex-wrap gap-3 sm:gap-4">
            {stickers.map(({ label, bg, tilt, Icon }, index) => (
              <motion.li key={label} {...popIn(level, 0.35 + index * 0.12)}>
                <span
                  style={{ '--tilt': tilt }}
                  className={cn(
                    'home-sticker inline-flex min-h-11 items-center gap-2 rounded-2xl border-2 border-white px-4 py-2 font-display2 text-base font-bold text-ink shadow-[0_8px_18px_-8px_rgba(29,67,84,0.35)] sm:text-lg',
                    bg,
                  )}
                >
                  <Icon className="h-6 w-6 shrink-0" />
                  {label}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[680px]"
          initial={level === 'none' ? false : { opacity: 0, y: 40, rotate: 3 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
        >
          <BrushGallery gallery={gallery} level={level} />

          <div className="pointer-events-none absolute -right-4 -top-14 flex gap-1 sm:-right-10 sm:-top-20" aria-hidden="true">
            {[
              ['#f9c9d4', 'w-10 sm:w-14', 0],
              ['#ffe8a8', 'w-8 sm:w-11', 0.8],
              ['#cdeefa', 'w-9 sm:w-12', 1.6],
            ].map(([color, size, delay]) => (
              <motion.div
                key={color}
                className={size}
                animate={float ? { y: [0, -14, 0], rotate: [-5, 5, -5] } : undefined}
                transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Balloon color={color} className="h-auto w-full drop-shadow-md" />
              </motion.div>
            ))}
          </div>

          <Sparkle className="absolute -bottom-12 -left-6 w-8" color="#f9bd3b" />
          <Sparkle className="absolute -left-10 top-1/3 hidden w-5 sm:block" color="#ef8061" />
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Briefcase } from 'lucide-react'
import { Balloon, Flag, Mask, ScribbleCircle, Sparkle, Star } from './doodles'
import { slideFrom } from './motion'
import TornEdge from './TornEdge'
import Watercolor from './Watercolor'

const services = [
  {
    href: '/pachete',
    title: 'Pachete animație',
    text: 'Distracție completă pentru o zi de neuitat.',
    color: '#f2a516',
    titleClass: 'text-amber-500',
    glow: '249 189 59',
    tilt: '-2deg',
    Doodle: Star,
  },
  {
    href: '/mascote',
    title: 'Mascote și personaje',
    text: 'Prietenii preferați ai celor mici vin la petrecere.',
    color: '#ec4899',
    titleClass: 'text-pink-500',
    glow: '244 114 182',
    tilt: '1deg',
    Doodle: Mask,
  },
  {
    href: '/tobogane',
    title: 'Tobogane și jocuri gonflabile',
    text: 'Joacă și energie pentru toate varstele.',
    color: '#f97316',
    titleClass: 'text-orange-500',
    glow: '251 146 60',
    tilt: '-1deg',
    Doodle: Balloon,
  },
  {
    href: '/inchirieri',
    title: 'Închirieri petrecere',
    text: 'Mese, scaune, pavilioane și mașini pentru eveniment.',
    color: '#16817d',
    titleClass: 'text-teal',
    glow: '101 199 192',
    tilt: '1deg',
    Doodle: Flag,
  },
]

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

function cardVariants(level, index) {
  if (level === 'none') return { hidden: {}, show: {} }
  const fall = level === 'lite' ? 40 : 90
  return {
    hidden: { opacity: 0, y: -fall, rotate: index % 2 ? 9 : -9, scale: 0.9 },
    show: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { duration: 0.75, ease: [0.34, 1.4, 0.64, 1] } },
  }
}

// Contur dublu „desenat cu creionul” în jurul cartonașului.
function PencilOutline({ color }) {
  return (
    <>
      <svg className="pointer-events-none absolute inset-[3px] h-[calc(100%-6px)] w-[calc(100%-6px)] overflow-visible" aria-hidden="true">
        <defs>
          <filter id="pencil-outline" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" />
          </filter>
        </defs>
        <rect width="100%" height="100%" rx="33" fill="none" stroke={color} strokeWidth="3.5" filter="url(#pencil-outline)" />
      </svg>
      <svg className="pointer-events-none absolute inset-[9px] h-[calc(100%-18px)] w-[calc(100%-18px)] overflow-visible" aria-hidden="true">
        <rect
          className="home-card-outline"
          width="100%"
          height="100%"
          rx="27"
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.55"
          pathLength="1"
          strokeDasharray="1"
          filter="url(#pencil-outline)"
        />
      </svg>
    </>
  )
}

export default function ServicesSection({ level }) {
  const floaty = level === 'full'

  return (
    <section
      id="servicii"
      className="relative z-10 flex min-h-screen w-full flex-col justify-center overflow-x-clip bg-gradient-to-b from-[#fff4f6] via-[#fffaf0] to-[#eef9fd] px-5 pb-20 pt-24 text-blue-900 sm:px-10 sm:pb-28 md:pt-32"
    >
      <TornEdge color="#fff4f6" variant={1} />

      <Watercolor color="#f9c9d4" variant={2} className="-left-32 top-[30%] w-[460px] sm:w-[620px]" opacity={0.5} />
      <Watercolor color="#cdeefa" variant={0} className="-right-28 bottom-[8%] w-[460px] sm:w-[640px]" opacity={0.55} />
      <Watercolor color="#ffe8a8" variant={1} className="left-[35%] top-6 hidden w-[380px] md:block" opacity={0.45} />

      {/* Stitch – pe marginea stângă */}
      <motion.div
        {...slideFrom(level, 'left', 0.1)}
        className="pointer-events-none absolute left-0 top-[6%] z-0 w-[24vw] max-w-[110px] translate-y-[15%] md:top-[22%] md:w-[35vw] md:max-w-[280px]"
      >
        <motion.img
          src="/home/decor/stitch_side.png"
          alt="Stitch, mascotă pentru petreceri de copii în Satu Mare"
          className="h-auto w-full drop-shadow-2xl"
          animate={floaty ? { y: [0, -10, 0], rotate: [0, -2, 0] } : undefined}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Angel – pe marginea dreaptă */}
      <motion.div
        {...slideFrom(level, 'right', 0.25)}
        className="pointer-events-none absolute right-0 top-[8%] z-0 w-[24vw] max-w-[115px] -translate-y-[30%] md:top-[22%] md:z-30 md:w-[35vw] md:max-w-[290px]"
      >
        <motion.img
          src="/home/decor/angel.png"
          alt="Angel, mascotă pentru petreceri de copii în Satu Mare"
          className="h-auto w-full drop-shadow-2xl"
          animate={floaty ? { y: [0, -12, 0], rotate: [0, 2, 0] } : undefined}
          transition={{ duration: 7, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Titlu */}
      <div className="relative z-20 mb-10 mt-4 flex w-full flex-col items-center justify-center md:mb-14">
        <motion.div
          className="relative flex w-[72%] max-w-2xl flex-col items-center md:w-[58%]"
          initial={level === 'none' ? false : { opacity: 0, scale: 0.8, rotate: -4 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <img
            src="/home/decor/TitluServicii.png"
            alt="Servicii de animație pentru copii în Satu Mare"
            className="pointer-events-none relative z-20 h-auto w-full -translate-y-[12%] object-contain"
          />
          <ScribbleCircle className="absolute -inset-x-[10%] -bottom-[6%] top-[38%] h-[70%] w-[120%]" color="#ef8061" delay={0.6} />
          <Sparkle className="absolute -left-6 top-[30%] w-6 sm:w-9" color="#f9bd3b" />
          <Sparkle className="absolute -right-4 bottom-[10%] w-5 sm:w-7" color="#65c7c0" />
        </motion.div>
      </div>

      {/* Cartonașele de servicii */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          className="relative z-10 mt-4 grid grid-cols-1 gap-6 min-[400px]:grid-cols-2 min-[400px]:gap-4 lg:grid-cols-4 lg:gap-6"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {services.map(({ href, title, text, color, titleClass, glow, tilt, Doodle }, index) => (
            <motion.div key={href} variants={cardVariants(level, index)} className="h-full">
              <a
                href={href}
                style={{ '--tilt': tilt, '--glow': glow }}
                className="home-card group relative flex h-full flex-col rounded-[2.2rem] bg-white p-5 text-blue-900 outline-none sm:p-8"
              >
                <PencilOutline color={color} />
                <Doodle className="home-card-doodle absolute right-4 top-4 h-auto w-8 sm:right-6 sm:top-6 sm:w-10" color={color} />
                <span className={`relative pr-8 font-display2 text-2xl font-extrabold leading-[1.05] sm:text-[2.15rem] ${titleClass}`}>
                  {title}
                </span>
                <p className="relative mt-5 font-round text-base font-semibold leading-relaxed text-blue-900 sm:text-lg">{text}</p>
                <span className="relative mt-auto inline-flex items-center gap-2 pt-6 font-bold text-rose-600">
                  Află mai mult <ArrowUpRight className="home-card-arrow" size={18} />
                </span>
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.a
          {...slideFrom(level, 'right', 0.15)}
          href="/evenimente-corporate"
          className="group relative mt-10 flex w-full items-center justify-between gap-6 overflow-hidden rounded-[2rem] bg-ink px-6 py-6 text-white shadow-[0_24px_50px_-20px_rgba(29,67,84,0.6)] transition-shadow duration-300 hover:shadow-[0_0_0_6px_rgba(101,199,192,0.25),0_24px_60px_-15px_rgba(29,67,84,0.7)] sm:px-8 sm:py-8"
        >
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '18px 18px' }}
            aria-hidden="true"
          />
          <span className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-mint/25 blur-2xl transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
          <div className="relative flex items-center gap-5">
            <Briefcase className="shrink-0 text-mint transition-transform duration-300 group-hover:-rotate-12" size={34} aria-hidden="true" />
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Pentru companii</p>
              <h2 className="mt-1 font-display2 text-xl font-extrabold leading-tight sm:text-3xl">Evenimente Corporate — animație pentru echipa ta</h2>
            </div>
          </div>
          <ArrowRight className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-2" size={28} aria-hidden="true" />
        </motion.a>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-10 left-[6%] hidden w-8 md:block"
        animate={floaty ? { rotate: 360 } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        <Star color="#e3d9ff" filled className="h-auto w-full" />
      </motion.div>
    </section>
  )
}

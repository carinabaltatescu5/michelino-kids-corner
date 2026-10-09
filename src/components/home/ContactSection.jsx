import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Balloon, ScribbleCircle, Sparkle, Spiral, Tape } from './doodles'
import { ease, riseIn } from './motion'
import TornEdge from './TornEdge'
import Watercolor from './Watercolor'

const FacebookIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const linkClass = 'group flex min-h-11 items-center gap-3 rounded-xl px-2 py-1 text-slate-900 transition-colors hover:bg-butter/60 hover:text-slate-700'

export default function ContactSection({ level }) {
  return (
    <footer id="contact" className="relative z-10 flex overflow-x-clip min-h-screen flex-col bg-gradient-to-br from-[#d9effa] via-[#eef6fb] to-[#fff3cc] px-5 py-20 text-slate-900 sm:px-10 sm:py-28">
      <TornEdge color="#d9effa" />

      <Watercolor color="#f9c9d4" variant={0} className="-left-20 bottom-24 w-[360px] sm:w-[520px]" opacity={0.45} />
      <Watercolor color="#ffe8a8" variant={2} className="-right-16 top-16 w-[340px] sm:w-[500px]" opacity={0.6} />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <motion.div {...riseIn(level, 0)}>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-slate-900">Planificăm ceva vesel?</p>
              <h2 className="mt-5 font-display2 text-6xl font-extrabold leading-[0.95] tracking-[-0.02em] sm:text-8xl">
                Hai la<br />
                <span className="relative inline-block text-berry">
                  joacă!
                  <ScribbleCircle className="absolute -inset-x-6 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+3rem)]" color="#ef8061" delay={0.5} />
                </span>
              </h2>
              <p className="mt-8 max-w-3xl font-round text-base font-semibold leading-7 text-slate-900/75 sm:text-lg">
                Alege serviciile potrivite pentru evenimentul tău, apoi sună-ne sau trimite-ne un mesaj pe WhatsApp la numerele afișate pentru programări și mai multe detalii.
              </p>
            </motion.div>

            <motion.div
              className="relative rounded-[1.75rem] bg-white/90 p-6 shadow-[0_30px_60px_-25px_rgba(29,67,84,0.4)] sm:p-8"
              style={{ rotate: level === 'none' ? 1.5 : undefined }}
              initial={level === 'none' ? false : { opacity: 0, y: 50, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1.5 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease }}
            >
              <Tape className="absolute -top-4 left-1/2 w-32 -translate-x-1/2 -rotate-3" />
              <div className="flex flex-col gap-3 text-lg font-bold">
                <a className={linkClass} href="mailto:salut@michelino.ro"><Mail size={20} />
mihaela_simma@yahoo.com</a>
                <a className={linkClass} href="tel:+40740123456"><Phone size={20} /> 0740 862 297  /  0743 608 355</a>
                <a className={linkClass} href="https://www.facebook.com/MichelinoKidsCorner"><FacebookIcon size={20} /> @MichelinoKidsCorner</a>
                <div className="flex items-center gap-3 px-2 py-1 text-slate-900"><MapPin size={20} /> <span>Strada Pinului 5, Satu Mare, Romania</span></div>
              </div>
              <Balloon color="#f9c9d4" className="absolute -right-5 -top-16 hidden w-12 rotate-12 sm:block" />
              <Sparkle color="#f9bd3b" className="absolute -bottom-4 -left-4 w-7" />
            </motion.div>
          </div>
        </div>
        <p className="mt-12 text-xs text-muted">
          Organizăm evenimente în Satu Mare și împrejurimi: Oaș, Negrești-Oaș, Călinești-Oaș, Turț, Gherța Mică, Gherța Mare.
        </p>
        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-slate-900/20 pt-6 text-sm font-semibold text-slate-900/60 sm:flex-row sm:items-center">
          <span>© 2026 Michelino</span>
          <a href="#acasa" className="flex min-h-11 items-center gap-2 text-slate-900 hover:text-slate-700">Sus <ArrowUpRight size={16} /></a>
        </div>
        <Spiral color="#a995ea" className="pointer-events-none absolute bottom-16 right-0 hidden w-16 opacity-70 md:block" delay={0.4} />
      </div>
    </footer>
  )
}

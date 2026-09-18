import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Briefcase, Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePageSeo } from './hooks/usePageSeo'

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
);

const gallery = [
  { src: '/home/gallery/kids.jpg', alt: 'Copii zâmbind la o petrecere colorată', label: 'Râsete mari' },
  { src: '/home/gallery/Aushopping-7487_result.jpg', alt: 'Baloane colorate la o petrecere pentru copii', label: 'Baloane colorate' },
  { src: '/home/gallery/mickey.jpg', alt: 'Mascotă veselă care distrează copiii', label: 'Mascote fantastice' },
  { src: '/home/gallery/mascote2.jpg', alt: 'Mascote pentru petreceri de copii în Satu Mare', label: 'Mascote îndrăgite' },
  { src: '/home/gallery/masina_high_resolution.png', alt: 'Mașină colorată la un eveniment pentru copii', label: 'Distracție colorată' },
  { src: '/home/gallery/poza1.jpg', alt: 'Copii distrându-se la un eveniment Michelino', label: 'Joacă și zâmbete' },
  { src: '/home/gallery/poza2.jpg', alt: 'Animație pentru copii la un eveniment Michelino', label: 'Animație pentru copii' },
  { src: '/home/gallery/poza3.jpg', alt: 'Petrecere pentru copii organizată de Michelino', label: 'Petrecere de neuitat' },
  { src: '/home/gallery/poza4.jpg', alt: 'Copii și mascote la o petrecere Michelino', label: 'Personaje și joacă' },
  { src: '/home/gallery/poza5.jpg', alt: 'Eveniment pentru copii în Satu Mare', label: 'Amintiri frumoase' },
  { src: '/home/gallery/printese.jpg', alt: 'Prințese la o petrecere pentru copii', label: 'Povești de basm' },
  { src: '/home/gallery/IMG-20260908-WA0009 (1).jpg', alt: 'Eveniment pentru copii organizat de Michelino', label: 'Bucurie la petrecere' },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function Page({ contactOnly = false }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  ))
  const prefersReducedMotion = useReducedMotion()
  usePageSeo({
    title: contactOnly ? 'Contact — Michelino Kids Corner Satu Mare' : 'Michelino Kids Corner — Animație pentru copii în Satu Mare',
    description: contactOnly
      ? 'Rezervă animație pentru petrecerea copilului tău în Satu Mare. Sună sau scrie-ne pe WhatsApp pentru disponibilitate și ofertă.'
      : 'Animatori, mascote, pictură pe față și tobogane gonflabile pentru petreceri de copii în Satu Mare, Oaș, Negrești-Oaș, Călinești-Oaș, Turț și Gherța. Rezervă acum!',
  })

  useEffect(() => {
    if (!contactOnly) return undefined

    const frame = window.requestAnimationFrame(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [contactOnly])

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % gallery.length), 3000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)

    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const poster = isMobile ? '/home/video/hero-portrait-poster.jpg' : '/home/video/hero-landscape-poster.jpg'

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Chewy&display=swap');`}</style>
      <main className="overflow-x-hidden bg-background text-foreground">

      <section id="acasa" className="relative flex items-center justify-center overflow-hidden bg-black text-primary-foreground md:min-h-screen md:px-10 md:py-32">
        {prefersReducedMotion ? (
          <img src={poster} alt="" aria-hidden="true" className="relative z-0 block h-auto w-full object-contain md:absolute md:inset-0 md:h-full md:w-full md:object-cover" />
        ) : (
          <video
            key={isMobile ? 'portrait' : 'landscape'}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-hidden="true"
            className="relative z-0 block h-auto w-full object-contain md:absolute md:inset-0 md:h-full md:w-full md:object-cover"
          >
            <source src="/home/video/hero-portrait.mp4" media="(max-width: 767px)" type="video/mp4" />
            <source src="/home/video/hero-landscape.mp4" media="(min-width: 768px)" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 z-10 flex items-end justify-center pb-1 text-center md:pb-24">
                    <motion.a href="#servicii" animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }} className="inline-flex items-center gap-3 rounded-full bg-[#831843] px-8 py-5 font-display text-xl font-black text-white shadow-2xl shadow-[#831843]/40">Vezi servicii <ArrowDown size={21} /></motion.a>
        </div>
      </section>

      <section id="despre" className="relative flex min-h-screen flex-col justify-center bg-gradient-to-br from-[#F7B7C3] via-[#FFE5B4] to-sky-200 px-5 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease }}>
            
            <h2 className="font-display text-balance text-5xl font-black leading-[0.95] tracking-[-0.05em] text-primary sm:text-7xl">
              Distracție<br /><span className="text-accent-foreground">cât cuprinde.</span>
            </h2>
            
            <div className="mt-8 max-w-md text-lg font-semibold leading-relaxed text-foreground/75">
              <p className="mb-4">
                De 12 ani, la Michelino transformăm orice petrecere într-un univers de basm, unde hohotele de râs nu se mai opresc. Venim încărcați cu magie, jocuri captivante și personajele mult visate, gata să creăm o atmosferă de neuitat.
              </p>
              <p>
                Rețeta noastră este simplă: <span className="font-bold text-ink">tu aduci copiii, noi aducem distracția!</span> Ție îți rămâne doar să te relaxezi și să colecționezi cele mai frumoase amintiri.
              </p>
            </div>
            
            <div className="mt-9 flex flex-wrap gap-3">
              <span className="pill">-mascote iubite</span>
              <span className="pill">-pictură pe față</span>
              <span className="pill">-distracție și tobogane</span>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease }} className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] border-8 border-white bg-white shadow-2xl shadow-primary/15">
            {gallery.map((image, index) => (
              <img key={image.src} src={image.src} alt={image.alt} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`} />
            ))}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/85 px-4 py-3 backdrop-blur-md">
              <span className="font-display text-xl font-black text-primary">{gallery[activeSlide].label}</span>
              <div className="flex gap-2" aria-label="Selectează imaginea">
                <span className="sr-only">Galerie foto</span>
                {gallery.map((image, index) => (
                  <button key={image.src} onClick={() => setActiveSlide(index)} aria-label={`Arată imaginea ${index + 1}`} aria-pressed={index === activeSlide} className={`h-2.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-accent' : 'w-2.5 bg-primary/25'}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTIUNEA 3: SERVICII --- */}
      <section id="servicii" className="relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden bg-gradient-to-br from-pink-200 via-yellow-100 to-sky-200 px-5 pb-20 pt-28 text-blue-900 sm:px-10 sm:pb-28 md:pt-32">
        
        {/* Stitch - Lipit absolut de marginea stângă și urcat mai sus */}
        <img
          src="/home/decor/stitch_side.png"
          alt="Stitch, mascotă pentru petreceri de copii în Satu Mare"
          className="absolute left-0 top-[12%] md:top-[22%] z-0 w-[35vw] max-w-[180px] translate-y-[15%] pointer-events-none drop-shadow-2xl md:max-w-[280px]"
        />
        
        {/* Angel - Lipită absolut de marginea dreaptă și urcată mai sus */}
        <img
          src="/home/decor/angel.png"
          alt="Angel, mascotă pentru petreceri de copii în Satu Mare"
          className="absolute right-0 top-[18%] md:top-[22%] z-30 w-[35vw] max-w-[190px] -translate-y-[30%] pointer-events-none drop-shadow-2xl md:max-w-[290px]"
        />

        {/* Container Titlu */}
        <div className="relative z-20 mt-4 mb-12 flex flex-col items-center justify-center w-full">
          <div className="relative flex flex-col items-center">
            {/* Titlu Grafic Urcat Mai Sus */}
            <img
              src="/home/decor/TitluServicii.png"
              alt="Servicii de animație pentru copii în Satu Mare"
              className="pointer-events-none relative z-20 h-auto w-[87%] max-w-2.5xl -translate-y-[25%] object-contain md:w-[64%]"
            />
          </div>
        </div>

        {/* Cutiile de servicii */}
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="relative z-10 mt-4 grid gap-6 md:grid-cols-3">
            <a href="/pachete" className="group rotate-[-2deg] rounded-[3rem] border-4 border-amber-300 bg-white p-8 text-blue-900 shadow-[0_20px_40px_rgba(27,54,40,0.08)] transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-[0_20px_60px_rgba(41,182,246,0.25)]">
              <span style={{ fontFamily: "'Chewy', cursive" }} className="text-4xl font-black text-amber-500">Pachete animație</span>
              <p className="mt-6 text-lg font-semibold leading-relaxed text-blue-900">Distracție completă pentru o zi de neuitat.</p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-rose-600">Află mai mult <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} /></span>
            </a>
            <a href="/mascote" className="group rotate-[1deg] rounded-[3rem] border-4 border-pink-400 bg-white p-8 text-blue-900 shadow-[0_20px_40px_rgba(27,54,40,0.08)] transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-[0_20px_60px_rgba(41,182,246,0.25)]">
              <span style={{ fontFamily: "'Chewy', cursive" }} className="text-4xl font-black text-pink-500">Mascote și personaje</span>
              <p className="mt-6 text-lg font-semibold leading-relaxed text-blue-900">Prietenii preferați ai celor mici vin la petrecere.</p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-rose-600">Află mai mult <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} /></span>
            </a>
            <a href="/tobogane" className="group rotate-[-1deg] rounded-[3rem] border-4 border-orange-400 bg-white p-8 text-blue-900 shadow-[0_20px_40px_rgba(27,54,40,0.08)] transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-[0_20px_60px_rgba(41,182,246,0.25)]">
              <span style={{ fontFamily: "'Chewy', cursive" }} className="text-4xl font-black text-orange-500">Tobogane gonflabile</span>
              <p className="mt-6 text-lg font-semibold leading-relaxed text-blue-900">Joacă și energie pentru toate varstele.</p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-rose-600">Află mai mult <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1" size={18} /></span>
            </a>
          </div>
          <a
            href="/evenimente-corporate"
            className="group mt-8 flex w-full items-center justify-between gap-6 rounded-[2rem] bg-ink px-6 py-6 text-white shadow-[0_20px_40px_rgba(27,54,40,0.12)] transition-transform duration-300 hover:-translate-y-1 sm:px-8 sm:py-8"
          >
            <div className="flex items-center gap-5">
              <Briefcase className="shrink-0 text-mint" size={34} aria-hidden="true" />
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Pentru companii</p>
                <h2 className="mt-1 text-2xl font-black sm:text-3xl">Evenimente Corporate — animație pentru echipa ta</h2>
              </div>
            </div>
            <ArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-2" size={28} aria-hidden="true" />
          </a>
        </div>
      </section>
      
      <footer id="contact" className="flex min-h-screen flex-col bg-gradient-to-br from-blue-200 to-yellow-100 px-5 py-20 text-slate-900 sm:px-10 sm:py-28">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
          <div className="flex-1 flex flex-col justify-center">
            <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-slate-900">Planificăm ceva vesel?</p>
              <h2 className="mt-5 font-display text-6xl font-black leading-[0.9] tracking-[-0.05em] sm:text-8xl">Hai la<br /><span className="text-slate-900">joacă!</span></h2>
              <p className="mt-6 max-w-3xl text-base font-semibold leading-7 text-slate-900/75 sm:text-lg">
                Alege serviciile potrivite pentru evenimentul tău, apoi sună-ne sau trimite-ne un mesaj pe WhatsApp la numerele afișate pentru programări și mai multe detalii.
              </p>
            </div>
            <div className="flex flex-col justify-end gap-5 text-lg font-bold">
              <a className="flex items-center gap-3 text-slate-900 hover:text-slate-700" href="mailto:salut@michelino.ro"><Mail size={20} /> 
mihaela_simma@yahoo.com</a>
              <a className="flex items-center gap-3 text-slate-900 hover:text-slate-700" href="tel:+40740123456"><Phone size={20} /> 0740 862 297  /  0743 608 355</a>
              <a className="flex items-center gap-3 text-slate-900 hover:text-slate-700" href="https://www.facebook.com/MichelinoKidsCorner"><FacebookIcon size={20} /> @MichelinoKidsCorner</a>
              <div className="flex items-center gap-3 text-slate-900"><MapPin size={20} /> <span>Strada Pinului 5, Satu Mare, Romania</span></div>
            </div>
          </div>
          </div>
          <p className="mt-8 text-xs text-muted">
            Organizăm evenimente în Satu Mare și împrejurimi: Oaș, Negrești-Oaș, Călinești-Oaș, Turț, Gherța Mică, Gherța Mare.
          </p>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t border-slate-900/20 pt-6 text-sm font-semibold text-slate-900/60 sm:flex-row">
            <span>© 2026 Michelino</span>
            <a href="#acasa" className="flex items-center gap-2 text-slate-900 hover:text-slate-700">Sus <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </footer>
      </main>
    </>
  )
}
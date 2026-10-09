import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePageSeo } from './hooks/usePageSeo'
import ContactSection from './components/home/ContactSection'
import HeroOverlay from './components/home/HeroOverlay'
import { useIsMobile, useMotionLevel } from './components/home/motion'
import ServicesSection from './components/home/ServicesSection'
import StorySection from './components/home/StorySection'

const gallery = [
  { src: '/home/gallery/mascote2.jpg', alt: 'Mascote pentru petreceri de copii în Satu Mare', label: 'Mascote îndrăgite' },
  { src: '/home/gallery/mascote3.jpg', alt: 'Mascote la o petrecere pentru copii în Satu Mare', label: 'Distracție cu mascote' },
  { src: '/home/gallery/masina_high_resolution.png', alt: 'Mașină colorată la un eveniment pentru copii', label: 'Distracție colorată' },
  { src: '/home/gallery/poza4.jpg', alt: 'Copii și mascote la o petrecere Michelino', label: 'Personaje și joacă' },
  { src: '/home/gallery/IMG-20260908-WA0009 (1).jpg', alt: 'Eveniment pentru copii organizat de Michelino', label: 'Bucurie la petrecere' },
  { src: '/home/gallery/WhatsApp Image 2026-09-22 at 00.20.17.jpeg', alt: 'Eveniment pentru copii organizat de Michelino', label: 'Amintiri frumoase' },
]

const DESKTOP_HERO_MODE = 'image'

export default function Page({ contactOnly = false }) {
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false)
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()
  const level = useMotionLevel()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 40 : 140])
  const heroMotion = level === 'none' ? undefined : { opacity: heroOpacity, y: heroY }
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

  const poster = '/home/video/WhatsApp Image 2026-09-22 at 00.44.55.jpeg'

  return (
    <>
      <main className="overflow-x-hidden bg-background text-foreground">

      <section ref={heroRef} id="acasa" className="relative overflow-hidden bg-black text-primary-foreground md:h-[100svh]">
        <motion.div style={heroMotion} className="origin-top md:h-full">
        {!isMobile && DESKTOP_HERO_MODE === 'image' ? (
          <img
            src="/home/video/masina_high_resolution.png"
            alt=""
            aria-hidden="true"
            className="block h-full w-full object-cover"
          />
        ) : (
          <div className="relative grid w-full">
            {isMobile && (
              <img
                src={poster}
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                className={`col-start-1 row-start-1 mx-auto block h-auto w-full object-contain transition-opacity duration-300 ${isHeroVideoReady ? 'opacity-0' : 'opacity-100'}`}
              />
            )}
            {(isMobile || DESKTOP_HERO_MODE === 'video') && !prefersReducedMotion && (
              <video
                key={isMobile ? 'portrait' : 'landscape'}
                autoPlay
                muted
                loop
                playsInline
                poster={poster}
                preload="metadata"
                aria-hidden="true"
                onCanPlay={() => setIsHeroVideoReady(true)}
                onPlaying={() => setIsHeroVideoReady(true)}
                className={`col-start-1 row-start-1 mx-auto block h-auto w-full object-contain transition-opacity duration-300 ${isHeroVideoReady ? 'opacity-100' : 'opacity-0'}`}
              >
                <source src="/home/video/hero-portrait.mp4" media="(max-width: 767px)" type="video/mp4" />
                <source src="/home/video/hero-landscape.mp4" media="(min-width: 768px)" type="video/mp4" />
              </video>
            )}
          </div>
        )}
        </motion.div>
        <HeroOverlay level={level} />
      </section>

      <StorySection gallery={gallery} level={level} />
      <ServicesSection level={level} />
      <ContactSection level={level} />
      </main>
    </>
  )
}
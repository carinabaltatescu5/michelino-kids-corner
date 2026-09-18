import { AnimatePresence, motion } from 'framer-motion'
import { Image as ImageIcon, PersonStanding, Waves } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const galleryImages = [
  { src: '/gallery/printese.jpg', alt: 'Petrecere Michelino cu printese' },
  { src: '/gallery/mickey.jpg', alt: 'Distractie pentru copii la Michelino' },
  { src: '/gallery/masina_high_resolution.png', alt: 'Masina de joaca Michelino' },
  { src: '/gallery/kids.jpg', alt: 'Copii bucurandu-se de o petrecere' },
  { src: '/gallery/IMG-20260908-WA0009 (1).jpg', alt: 'Eveniment pentru copii organizat de Michelino' },
  { src: '/gallery/Aushopping-7482_result.jpg', alt: 'Animatie pentru copii la Aushopping' },
]

const homeConfetti = [
  ['left-[6%] top-[12%]', 'text-coral', '✦', 0],
  ['left-[18%] top-[24%]', 'text-sun', '●', 0.45],
  ['left-[31%] top-[8%]', 'text-teal', '✦', 0.9],
  ['left-[44%] top-[32%]', 'text-coral', '●', 1.35],
  ['left-[58%] top-[15%]', 'text-grape', '✦', 1.8],
  ['left-[72%] top-[29%]', 'text-sun', '●', 2.25],
  ['left-[87%] top-[11%]', 'text-mint', '✦', 2.7],
  ['left-[95%] top-[40%]', 'text-coral', '●', 0.3],
  ['left-[10%] top-[55%]', 'text-mint', '✦', 0.75],
  ['left-[23%] top-[72%]', 'text-coral', '●', 1.2],
  ['left-[39%] top-[62%]', 'text-sun', '✦', 1.65],
  ['left-[53%] top-[82%]', 'text-teal', '●', 2.1],
  ['left-[68%] top-[58%]', 'text-coral', '✦', 2.55],
  ['left-[82%] top-[76%]', 'text-grape', '●', 0.6],
  ['left-[93%] top-[68%]', 'text-sun', '✦', 1.05],
]

function Home() {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % galleryImages.length)
    }, 3500)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(135deg, #fff0a8 0%, #ffd6e7 38%, #c7f1ec 72%, #d9d0ff 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {homeConfetti.map(([position, color, symbol, delay]) => (
          <motion.span
            key={`${position}-${symbol}`}
            className={`absolute ${position} ${color} text-xl opacity-70`}
            animate={{ y: [0, 28, 0], x: [0, 8, 0], rotate: [0, 180, 360], opacity: [0.25, 0.9, 0.25] }}
            transition={{ duration: 4.5, delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            {symbol}
          </motion.span>
        ))}
        <div className="absolute -left-24 top-[30%] h-72 w-72 rounded-full bg-coral/25 blur-2xl" />
        <div className="absolute right-[-8rem] top-[48%] h-96 w-96 rounded-full bg-grape/20 blur-2xl" />
        <div className="absolute left-[35%] top-[76%] h-64 w-64 rounded-full bg-sun/25 blur-2xl" />
      </div>

      <div className="relative z-10 aspect-[5/4] w-full overflow-hidden bg-gradient-to-br from-teal via-mint to-sun md:aspect-[2.4/1]">
        <AnimatePresence mode="sync">
          <motion.img
            key={galleryImages[activeImage].src}
            src={galleryImages[activeImage].src}
            alt={galleryImages[activeImage].alt}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-2 w-4 sm:left-5" aria-hidden="true">
          {[
            ['left-0 top-[18%] bg-sun', 0],
            ['left-3 top-[44%] bg-coral', 0.35],
            ['left-0 top-[70%] bg-mint', 0.7],
          ].map(([style, delay]) => (
            <motion.span
              key={style}
              className={`absolute h-2 w-1.5 rounded-full ${style}`}
              animate={{ y: [0, 24, 0], rotate: [0, 180, 360], opacity: [0.25, 0.9, 0.25] }}
              transition={{ duration: 3.2, repeat: Infinity, delay, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-2 w-4 sm:right-5" aria-hidden="true">
          {[
            ['right-0 top-[28%] bg-mint', 0],
            ['right-3 top-[53%] bg-sun', 0.3],
            ['right-0 top-[78%] bg-coral', 0.6],
          ].map(([style, delay]) => (
            <motion.span
              key={style}
              className={`absolute h-2 w-1.5 rounded-full ${style}`}
              animate={{ y: [0, -22, 0], rotate: [0, -180, -360], opacity: [0.25, 0.9, 0.25] }}
              transition={{ duration: 3.5, repeat: Infinity, delay, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Afiseaza imaginea ${index + 1}`}
              aria-current={index === activeImage}
              onClick={() => setActiveImage(index)}
              className={`h-2 rounded-full transition-all ${index === activeImage ? 'w-7 bg-white' : 'w-2 bg-white/60 hover:bg-white'}`}
            />
          ))}
        </div>
      </div>

      <div
        className="relative -mt-5 h-36 bg-bottom bg-no-repeat sm:h-44 md:-mt-7"
        style={{ backgroundImage: "url('/ripped.png')", backgroundSize: '100% auto' }}
      >
        <img src="/logo.png" alt="Michelino" className="absolute left-1/2 top-8 z-10 w-56 -translate-x-1/2 object-contain sm:top-10 sm:w-72" />
      </div>

      <section className="relative z-10 px-6 pb-14 pt-4 sm:pb-20 sm:pt-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            { title: 'Pachete animație', text: 'Distracție completă pentru o zi de neuitat.', color: 'bg-sun', Icon: ImageIcon, to: '/services/animation' },
            { title: 'Mascote și personaje', text: 'Prietenii preferați ai celor mici vin la petrecere.', color: 'bg-coral', Icon: PersonStanding, to: '/mascote' },
            { title: 'Tobogane', text: 'Joacă și energie pentru toate vârstele.', color: 'bg-mint', Icon: Waves, to: '/services/tobogane' },
          ].map(({ title, text, color, Icon, to }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className={`${color} rounded-[2rem] p-6 text-ink shadow-[0_7px_0_rgba(29,67,84,0.14)]`}
            >
              <Link to={to} className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-white/80">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80">
                  <Icon size={29} strokeWidth={2.2} />
                </div>
                <h2 className="font-display text-2xl">{title}</h2>
                <p className="mt-2 max-w-xs text-sm font-medium leading-6 text-ink/75">{text}</p>
                <span className="mt-6 inline-block text-sm font-bold underline decoration-2 underline-offset-4">Vezi pachetele →</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 lg:grid-cols-2 lg:px-8 lg:pb-28">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="font-bold uppercase tracking-[0.2em] text-ember">Despre noi</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-ink sm:text-5xl">Facem loc pentru joacă, râsete și amintiri.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">De 12 ani, echipa Michelino aduce culoare la petrecerile din Satu Mare. Venim cu personaje îndrăgite, jocuri creative și echipamente verificate, ca fiecare copil să se simtă parte din poveste.</p>
        </motion.div>
        <motion.img
          src="/michelino.png"
          alt="Mascote Michelino într-o mașină colorată"
          className="h-80 w-full rounded-[2.5rem] object-cover shadow-[12px_12px_0_#65c7c0] sm:h-[26rem]"
          initial={{ opacity: 0, x: 24, rotate: 2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
      </section>
    </section>
  )
}

export default Home

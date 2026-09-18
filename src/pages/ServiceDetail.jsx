import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { usePageSeo } from '../hooks/usePageSeo'

const content = {
  mascote: {
    eyebrow: 'Mascote și personaje',
    title: 'Personajul preferat vine la tine.',
    intro: 'Transformăm întâlnirea într-o poveste pe care cei mici o vor spune mult timp.',
    plans: [
      { slug: 'o-aparitie', nume: 'O apariție', pret: '250 lei', descriere: 'Mascotă pentru fotografii și momente speciale.' },
      { slug: 'mascota-in-actiune', nume: 'Mascotă în acțiune', pret: '400 lei', descriere: '60 de minute de dans, jocuri și interacțiune.' },
      { slug: 'poveste-completa', nume: 'Poveste completă', pret: '600 lei', descriere: 'Personaj, animator și scenariu tematic.' },
    ],
  },
  tobogane: {
    eyebrow: 'Tobogane',
    title: 'Joacă multă, energie cât cuprinde.',
    intro: 'Aducem distracția gonflabilă în siguranță, direct la evenimentul tău.',
    plans: [
      { slug: 'tobogan-mic', nume: 'Tobogan mic', pret: '450 lei', descriere: 'Închiriere pentru o zi, cu transport local.' },
      { slug: 'tobogan-aventura', nume: 'Tobogan aventură', pret: '650 lei', descriere: 'Model mare, colorat, pentru joacă fără pauză.' },
      { slug: 'pachet-joaca', nume: 'Pachet joacă', pret: '850 lei', descriere: 'Tobogan, montaj și animator pentru super distracție.' },
    ],
  },
}

const slidesData = [
  { id: 1, name: 'Frozen', dimensions: 'Lungime 8,5 × Lățime 4,5 × Înălțime 6,5 (m)', price: '750 lei', imageSrc: 'tob1.jpg' },
  { id: 2, name: 'Minecraft', dimensions: 'Lungime 8,5 × Lățime 4,5 × Înălțime 6,5 (m)', price: '750 lei', imageSrc: 'tob2.jpg' },
  { id: 3, name: 'Sonic', dimensions: 'Lungime 8,5 × Lățime 4,5 × Înălțime 6,5 (m)', price: '750 lei', imageSrc: 'tob3.jpg' },
  { id: 4, name: 'Minnie Castel', dimensions: 'Lungime 11 × Lățime 5 × Înălțime 7 (m)', price: '600 lei', imageSrc: 'tob4.jpg' },
  { id: 5, name: 'Minnie Roz', dimensions: 'Lungime 9 × Lățime 5 × Înălțime 6 (m)', price: '550 lei', imageSrc: 'tob5.jpg' },
  { id: 6, name: 'Crocodil', dimensions: 'Lungime 12 × Lățime 6 × Înălțime 8 (m)', price: '800 lei', imageSrc: 'tob6.jpg' },
  { id: 7, name: 'Maimuța Roșie', dimensions: 'Lungime 7 × Lățime 5 × Înălțime 5,5 (m)', price: '450 lei', imageSrc: 'tob7.jpg' },
  { id: 8, name: 'Mickey Club', dimensions: 'Lungime 6 × Lățime 5 × Înălțime 5 (m)', price: '400 lei', imageSrc: 'tob8.jpg' },
  { id: 9, name: 'Patrula Cățelușilor', dimensions: 'Lungime 7,5 × Lățime 5,5 × Înălțime 5 (m)', price: '550 lei', imageSrc: 'tob9.jpg' },
  { id: 10, name: 'Dual Mickey Club', dimensions: 'Lungime 6,5 × Lățime 6 × Înălțime 4,5 (m)', price: '500 lei', imageSrc: 'tob10.jpg' },
  { id: 11, name: 'Broasca', dimensions: 'Lungime 7 × Lățime 5 × Înălțime 5,5 (m)', price: '450 lei', imageSrc: 'tob11.jpg' },
  { id: 12, name: 'Mario', dimensions: 'Lungime 8 × Lățime 6 × Înălțime 7 (m)', price: '650 lei', imageSrc: 'tob12.jpg' },
  { id: 13, name: 'Tom & Jerry', dimensions: 'Lungime 8 × Lățime 6 × Înălțime 6 (m)', price: '650 lei', imageSrc: 'tob13.jpg' },
  { id: 14, name: 'Blue & Bingo', dimensions: 'Lungime 6 × Lățime 5 × Înălțime 3,5 (m)', price: '500 lei', imageSrc: 'tob14.jpg' },
  // id 15 intentionally absent
  { id: 16, name: 'Marvel', dimensions: 'Lungime 8 × Lățime 6 × Înălțime 7 (m)', price: '700 lei', imageSrc: 'tob16.jpg' },
  { id: 17, name: 'Spiderman', dimensions: 'Lungime 9 × Lățime 6 × Înălțime 7 (m)', price: '750 lei', imageSrc: 'tob17.jpg' },
  { id: 18, name: 'Climbing wall', dimensions: 'Lungime 7 × Lățime 5 × Înălțime 5,5 (m)', price: '400 lei', imageSrc: 'tob18.jpg' },
  { id: 19, name: 'Candy', dimensions: 'Lungime 9 × Lățime 6 × Înălțime 7 (m)', price: '850 lei', imageSrc: 'tob19.jpg' },
  { id: 20, name: 'Lilo & Stitch', dimensions: 'Lungime 9 × Lățime 6 × Înălțime 7 (m)', price: '850 lei', imageSrc: 'tob20.jpg' },
  { id: 21, name: 'Cars', dimensions: 'Lungime 9 × Lățime 6 × Înălțime 7 (m)', price: '850 lei', imageSrc: 'tob21.jpg' },
  { id: 22, name: 'Pink', dimensions: 'Lungime 8 × Lățime 6 × Înălțime 7 (m)', price: '750 lei', imageSrc: 'tob22.jpg' },
  { id: 23, name: 'Multiplayer', dimensions: 'Lungime 8 × Lățime 10 × Înălțime 7 (m)', price: '800 lei', imageSrc: 'tob23.jpg' },
]

const rainbowCards = [
  'bg-[#ffe8e5] hover:shadow-[0_0_60px_rgba(239,128,97,0.6)]',
  'bg-[#ffebd6] hover:shadow-[0_0_60px_rgba(244,161,92,0.6)]',
  'bg-[#fff3c7] hover:shadow-[0_0_60px_rgba(249,189,59,0.6)]',
  'bg-[#e3f7df] hover:shadow-[0_0_60px_rgba(101,199,192,0.6)]',
  'bg-[#dff5f8] hover:shadow-[0_0_60px_rgba(22,129,125,0.6)]',
  'bg-[#e8e2ff] hover:shadow-[0_0_60px_rgba(145,125,220,0.6)]',
]

const packageGlowClasses = [
  'shadow-[0_0_60px_rgba(239,128,97,0.6)]',
  'shadow-[0_0_60px_rgba(244,161,92,0.6)]',
  'shadow-[0_0_60px_rgba(249,189,59,0.6)]',
  'shadow-[0_0_60px_rgba(101,199,192,0.6)]',
  'shadow-[0_0_60px_rgba(22,129,125,0.6)]',
  'shadow-[0_0_60px_rgba(145,125,220,0.6)]',
]

const packageCharacters = [
  '/pachete/personaje/mickey_salut.png',
  '/pachete/personaje/minnie_salut.png',
  '/pachete/personaje/stitch_salut.png',
  '/pachete/personaje/spiderman_zboara.png',
  '/pachete/personaje/paw_patrol_zboara.png',
]

function InflatableSlides() {
  const [expandedId, setExpandedId] = useState(null)

  const toggleSlide = (slideId) => {
    setExpandedId((currentId) => (currentId === slideId ? null : slideId))
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {slidesData.map((slide) => {
        const isExpanded = expandedId === slide.id

        return (
          <div key={slide.id}>
            {isExpanded && (
              <button
                type="button"
                aria-label="Închide detaliile"
                className="fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 md:hidden"
                onClick={() => toggleSlide(slide.id)}
              />
            )}
            <button
              type="button"
              className={`relative w-full cursor-pointer overflow-hidden rounded-3xl bg-white text-left shadow-md transition-all duration-500 ease-out ${isExpanded ? 'z-50 scale-100 md:z-20 md:scale-[1.06] max-md:fixed max-md:left-1/2 max-md:top-1/2 max-md:w-[calc(100vw-2rem)] max-md:max-h-[calc(100vh-2rem)] max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:overflow-y-auto' : 'hover:-translate-y-2 hover:shadow-xl'}`}
              onClick={() => toggleSlide(slide.id)}
              aria-expanded={isExpanded}
            >
              <img src={`/tobogane/images/${slide.imageSrc}`} alt={`${slide.name}, tobogan gonflabil pentru petreceri în Satu Mare`} className={`h-40 w-full rounded-t-3xl object-cover sm:h-56 lg:h-64 ${isExpanded ? 'max-md:h-[52vh]' : ''}`} />
              <div className="p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h2 className="min-h-[4.5rem] text-3xl font-black leading-tight text-ink">{slide.name}</h2>
                  <p className="text-xl font-black text-ink sm:shrink-0 md:-translate-x-2">{slide.price}</p>
                </div>
                <div className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="min-h-0 overflow-hidden">
                    <p className="text-sm font-medium text-slate-500">{slide.dimensions}</p>
                  </div>
                </div>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500">
                  Detalii
                  <ChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} size={18} aria-hidden="true" />
                </span>
              </div>
            </button>
          </div>
        )
      })}
    </div>
  )
}

function PackageCard({ index, plan }) {
  const [isPopping, setIsPopping] = useState(false)
  const [isHolding, setIsHolding] = useState(false)
  const popTimeoutRef = useRef(null)
  const titleWithoutPrefix = plan.nume.replace(/^\s*pachet\b\s*/i, '')
  const subtitleMatch = titleWithoutPrefix.match(/\(([^)]*)\)/)
  const subtitle = subtitleMatch?.[1].trim() || ''
  const mainTitle = titleWithoutPrefix.replace(/\([^)]*\)/, '').trim()

  useEffect(() => () => {
    if (popTimeoutRef.current !== null) {
      window.clearTimeout(popTimeoutRef.current)
    }
  }, [])

  const triggerPop = () => {
    if (isPopping) return

    if (popTimeoutRef.current !== null) {
      window.clearTimeout(popTimeoutRef.current)
    }
    setIsPopping(true)
    popTimeoutRef.current = window.setTimeout(() => {
      setIsPopping(false)
      popTimeoutRef.current = null
    }, 3000)
  }

  const handlePressStart = () => {
    setIsHolding(true)
  }

  const handlePressEnd = () => {
    setIsHolding(false)
  }

  return (
    <div
      className="relative z-10 h-full"
      onMouseEnter={triggerPop}
      onClick={triggerPop}
      onMouseDown={handlePressStart}
      onTouchStart={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchEnd={handlePressEnd}
      onMouseLeave={handlePressEnd}
    >
      <img
        src={packageCharacters[index % packageCharacters.length]}
        alt=""
        className={`absolute left-1/2 -z-10 h-[21.6rem] w-auto -translate-x-1/2 object-contain pointer-events-none transition-all duration-500 ease-out ${
          isPopping ? '-top-48 opacity-100' : 'top-4 opacity-0'
        }`}
      />
      <button
        type="button"
        className={`group flex h-full flex-col rounded-[2rem] p-6 text-ink transition duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-mint ${rainbowCards[index % 6]} ${isHolding ? packageGlowClasses[index % 6] : ''}`}
      >
        <h2 className="text-3xl font-extrabold text-teal">{mainTitle}</h2>
        {subtitle && <h3 className="mt-1 text-[1.3rem] font-bold text-ink/80">{subtitle}</h3>}
        <p className="mt-3 min-h-20 flex-grow text-sm leading-6 text-ink/75">
          {plan.descriere.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <p className="mt-8 text-3xl font-extrabold text-teal">{plan.pret}</p>
      </button>
    </div>
  )
}

function ServiceDetail({ type }) {
  const { slug } = useParams()
  const [animationPackages, setAnimationPackages] = useState(null)
  const [loadError, setLoadError] = useState('')
  usePageSeo({
    title: type === 'tobogane' ? 'Tobogane Gonflabile de Închiriat — Michelino Satu Mare' : 'Mascote pentru Petreceri Copii — Michelino',
    description: type === 'tobogane'
      ? 'Închiriere tobogane gonflabile tematice pentru petreceri și evenimente. Livrare și montaj în Satu Mare, Oaș, Turț și Gherța.'
      : 'Mascote pentru petreceri de copii, cu personaje îndrăgite și animație în Satu Mare și împrejurimi.',
  })

  useEffect(() => {
    if (type !== 'animation') return undefined

    let isCurrent = true
    fetch('/data/pachete.json')
      .then((response) => {
        if (!response.ok) throw new Error('Nu am putut încărca pachetele.')
        return response.json()
      })
      .then((packages) => {
        if (isCurrent) setAnimationPackages(packages)
      })
      .catch((error) => {
        if (isCurrent) setLoadError(error.message)
      })

    return () => {
      isCurrent = false
    }
  }, [type])

  const service = type === 'animation'
    ? {
        eyebrow: 'Pachete animație',
        title: 'Energie bună pentru fiecare petrecere.',
        intro: 'Alege pachetul potrivit și lăsăm noi joaca să înceapă.',
        plans: animationPackages,
      }
    : content[type]

  if (!service || (type === 'animation' && !animationPackages && !loadError)) {
    return <section className="mx-auto max-w-6xl px-6 py-24 text-center text-muted">Încărcăm pachetele...</section>
  }

  if (loadError) {
    return <section className="mx-auto max-w-6xl px-6 py-24 text-center text-coral">{loadError}</section>
  }

  const selectedPackage = slug ? service.plans.find((plan) => plan.slug === slug) : null

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 font-display lg:px-8">
      <p className="font-bold uppercase tracking-[0.2em] text-ember">{service.eyebrow}</p>
      <h1 className="mt-3 max-w-none text-5xl leading-tight text-ink lg:whitespace-nowrap">{selectedPackage?.nume || service.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{selectedPackage?.descriere || service.intro}</p>
      {type === 'tobogane' ? (
        <div className="mt-12">
          <InflatableSlides />
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3">
          {service.plans.map((plan, index) => (
            <PackageCard index={index} key={plan.slug} plan={plan} />
          ))}
        </div>
      )}
      <a href="/#contact" className="mt-10 inline-block rounded-full bg-coral px-6 py-4 font-bold text-white shadow-[0_5px_0_#d5674c] transition-transform hover:-translate-y-1">Rezervă acum</a>
    </section>
  )
}

export default ServiceDetail
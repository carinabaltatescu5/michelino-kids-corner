import { useEffect, useRef, useState } from 'react'
import { PartyPopper } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

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
  { id: 1, name: 'Frozen', dimensions: 'L8,5 / l 4,5 / H6,5', price: '750 lei / eveniment', imageSrc: 'tob1.jpg' },
  { id: 2, name: 'Minecraft', dimensions: 'L8,5 / l 4,5 / H6,5', price: '750 lei / eveniment', imageSrc: 'tob2.jpg' },
  { id: 3, name: 'Sonic', dimensions: 'L8,5 / l 4,5 / H6,5', price: '750 lei / eveniment', imageSrc: 'tob3.jpg' },
  { id: 4, name: 'Minnie Castel', dimensions: 'L11 / l 5 / H7', price: '600 lei / eveniment', imageSrc: 'tob4.jpg' },
  { id: 5, name: 'Minnie Roz', dimensions: 'L9 / l 5 / H6', price: '550 lei / eveniment', imageSrc: 'tob5.jpg' },
  { id: 6, name: 'Crocodil', dimensions: 'L12 / l 6 / H8', price: '800 lei / eveniment', imageSrc: 'tob6.jpg' },
  { id: 7, name: 'Maimuța Rosie', dimensions: 'L7 / l 5 / H5,5', price: '450 lei / eveniment', imageSrc: 'tob7.jpg' },
  { id: 8, name: 'Mickey Club', dimensions: 'L6 / l 5 / H5', price: '400 lei / eveniment', imageSrc: 'tob8.jpg' },
  { id: 9, name: 'Patrula Cățelușilor', dimensions: 'L7,5 / l 5,5 / H5', price: '550 lei / eveniment', imageSrc: 'tob9.jpg' },
  { id: 10, name: 'Dual Mickey Club', dimensions: 'L6,5 / l 6 / H4,5', price: '500 lei / eveniment', imageSrc: 'tob10.jpg' },
  { id: 11, name: 'Broasca', dimensions: 'L7 / l 5 / H5,5', price: '450 lei / eveniment', imageSrc: 'tob11.jpg' },
  { id: 12, name: 'Mario', dimensions: 'L8 / l 6 / H7', price: '650 lei / eveniment', imageSrc: 'tob12.jpg' },
  { id: 13, name: 'Tom & Jerry', dimensions: 'L8 / l 6 / H6', price: '650 lei / eveniment', imageSrc: 'tob13.jpg' },
  { id: 14, name: 'Blue & Bingo', dimensions: 'L6 / l 5 / H3,5', price: '500 lei / eveniment', imageSrc: 'tob14.jpg' },
  { id: 16, name: 'Marvel', dimensions: 'L8 / l 6 / H7', price: '700 lei / eveniment', imageSrc: 'tob16.jpg' },
  { id: 17, name: 'Spiderman', dimensions: 'L9 / l 6 / H7', price: '750 lei / eveniment', imageSrc: 'tob17.jpg' },
  { id: 18, name: '?', dimensions: 'L7 / l 5 / H5,5', price: '400 lei / eveniment', imageSrc: 'tob18.jpg' },
  { id: 19, name: 'Candy', dimensions: 'L9 / l 6 / H7', price: '850 lei / eveniment', imageSrc: 'tob19.jpg' },
  { id: 20, name: 'Lilo & Stitch', dimensions: 'L9 / l 6 / H7', price: '850 lei / eveniment', imageSrc: 'tob20.jpg' },
  { id: 21, name: 'Cars', dimensions: 'L9 / l 6 / H7', price: '850 lei / eveniment', imageSrc: 'tob21.jpg' },
  { id: 22, name: 'Pink', dimensions: 'L8 / l 6 / H7', price: '750 lei / eveniment', imageSrc: 'tob22.jpg' },
  { id: 23, name: 'Multiplayer', dimensions: 'L8 / l 10 / H7', price: '800 lei / eveniment', imageSrc: 'tob23.jpg' },
]

const rainbowCards = [
  'bg-[#ffe8e5] hover:shadow-[0_0_60px_rgba(239,128,97,0.6)]',
  'bg-[#fff3c7] hover:shadow-[0_0_60px_rgba(249,189,59,0.6)]',
  'bg-[#e3f7df] hover:shadow-[0_0_60px_rgba(101,199,192,0.6)]',
  'bg-[#e8e2ff] hover:shadow-[0_0_60px_rgba(145,125,220,0.6)]',
  'bg-[#dff5f8] hover:shadow-[0_0_60px_rgba(22,129,125,0.6)]',
]

const packageGlowClasses = [
  'shadow-[0_0_60px_rgba(239,128,97,0.6)]',
  'shadow-[0_0_60px_rgba(249,189,59,0.6)]',
  'shadow-[0_0_60px_rgba(101,199,192,0.6)]',
  'shadow-[0_0_60px_rgba(145,125,220,0.6)]',
  'shadow-[0_0_60px_rgba(22,129,125,0.6)]',
]

const packageCharacters = [
  '/gallery/personaje/mickey_salut.png',
  '/gallery/personaje/minnie_salut.png',
  '/gallery/personaje/stitch_salut.png',
  '/gallery/personaje/spiderman_zboara.png',
  '/gallery/personaje/paw_patrol_zboara.png',
]

function InflatableSlides() {
  const [expandedId, setExpandedId] = useState(null)

  const toggleSlide = (slideId) => {
    setExpandedId((currentId) => (currentId === slideId ? null : slideId))
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {slidesData.map((slide) => {
        const isExpanded = expandedId === slide.id

        return (
          <article
            key={slide.id}
            className="cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            onClick={() => toggleSlide(slide.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                toggleSlide(slide.id)
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
          >
            <img src={`/tobogane/${slide.imageSrc}`} alt={slide.name} className="h-64 w-full rounded-t-3xl object-cover" />
            <div className="p-6">
              <h2 className="font-display text-3xl font-black text-[#1d4354]">{slide.name}</h2>
              <div className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="min-h-0 overflow-hidden">
                  <p className="text-sm font-medium text-slate-500">{slide.dimensions}</p>
                  <p className="mt-3 text-3xl font-black text-[#1d4354]">{slide.price}</p>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function PackageCard({ index, plan, type }) {
  const [isPopping, setIsPopping] = useState(false)
  const [isHolding, setIsHolding] = useState(false)
  const popTimeoutRef = useRef(null)

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
    }, 800)
  }

  const handlePressStart = () => {
    if (popTimeoutRef.current !== null) {
      window.clearTimeout(popTimeoutRef.current)
      popTimeoutRef.current = null
    }
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
        className={`absolute left-1/2 -z-10 h-96 w-auto -translate-x-1/2 object-contain pointer-events-none transition-all duration-500 ease-out ${
          isPopping || isHolding ? '-top-48 opacity-100' : 'top-4 opacity-0'
        }`}
      />
      <Link
        to={`/services/${type}${type === 'animation' ? `/${plan.slug}` : ''}`}
        className={`group block h-full rounded-[2rem] p-8 text-[#1d4354] transition duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#65c7c0] ${rainbowCards[index % rainbowCards.length]} ${isHolding ? packageGlowClasses[index % packageGlowClasses.length] : ''}`}
      >
        <PartyPopper className="text-[#ef8061] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" size={30} />
        <h2 className="font-display mt-7 text-3xl">{plan.nume}</h2>
        <p className="mt-3 min-h-20 text-sm leading-6 text-[#1d4354]/75">
          {plan.descriere.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <p className="mt-8 text-3xl font-extrabold text-[#16817d]">{plan.pret}</p>
      </Link>
    </div>
  )
}

function ServiceDetail({ type }) {
  const { slug } = useParams()
  const [animationPackages, setAnimationPackages] = useState(null)
  const [loadError, setLoadError] = useState('')

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
    return <section className="mx-auto max-w-6xl px-6 py-24 text-center text-[#64727a]">Încărcăm pachetele...</section>
  }

  if (loadError) {
    return <section className="mx-auto max-w-6xl px-6 py-24 text-center text-[#ef8061]">{loadError}</section>
  }

  const selectedPackage = slug ? service.plans.find((plan) => plan.slug === slug) : null

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <p className="font-bold uppercase tracking-[0.2em] text-[#e4864c]">{service.eyebrow}</p>
      <h1 className="font-display mt-3 max-w-3xl text-5xl leading-tight text-[#1d4354]">{selectedPackage?.nume || service.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-[#64727a]">{selectedPackage?.descriere || service.intro}</p>
      {type === 'tobogane' ? (
        <div className="mt-12">
          <InflatableSlides />
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {service.plans.map((plan, index) => (
            <PackageCard index={index} key={plan.slug} plan={plan} type={type} />
          ))}
        </div>
      )}
      <Link to="/contact" className="mt-10 inline-block rounded-full bg-[#ef8061] px-6 py-4 font-bold text-white shadow-[0_5px_0_#d5674c] transition-transform hover:-translate-y-1">Rezervă acum</Link>
    </section>
  )
}

export default ServiceDetail
import { useEffect, useRef, useState } from 'react'
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
}

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
    title: 'Mascote pentru Petreceri Copii — Michelino',
    description: 'Mascote pentru petreceri de copii, cu personaje îndrăgite și animație în Satu Mare și împrejurimi.',
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
      <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3">
        {service.plans.map((plan, index) => (
          <PackageCard index={index} key={plan.slug} plan={plan} />
        ))}
      </div>
      <a href="/#contact" className="mt-10 inline-block rounded-full bg-coral px-6 py-4 font-bold text-white shadow-[0_5px_0_#d5674c] transition-transform hover:-translate-y-1">Rezervă acum</a>
    </section>
  )
}

export default ServiceDetail
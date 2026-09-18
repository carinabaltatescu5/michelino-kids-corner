import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePageSeo } from '../hooks/usePageSeo'

const packageCharacters = [
  '/gallery/personaje/mickey_salut.png',
  '/gallery/personaje/minnie_salut.png',
  '/gallery/personaje/stitch_salut.png',
  '/gallery/personaje/spiderman_zboara.png',
  '/gallery/personaje/paw_patrol_zboara.png',
  '/gallery/personaje/download.png',
]

const packageGlowClasses = [
  'shadow-[0_0_60px_rgba(239,128,97,0.6)]',
  'shadow-[0_0_60px_rgba(244,161,92,0.6)]',
  'shadow-[0_0_60px_rgba(249,189,59,0.6)]',
  'shadow-[0_0_60px_rgba(101,199,192,0.6)]',
  'shadow-[0_0_60px_rgba(22,129,125,0.6)]',
  'shadow-[0_0_60px_rgba(145,125,220,0.6)]',
]

const packageGlowShadows = [
  '0 0 60px rgba(239,128,97,0.6)',
  '0 0 60px rgba(244,161,92,0.6)',
  '0 0 60px rgba(249,189,59,0.6)',
  '0 0 60px rgba(101,199,192,0.6)',
  '0 0 60px rgba(22,129,125,0.6)',
  '0 0 60px rgba(145,125,220,0.6)',
]

const tones = ['coral', 'peach', 'lemon', 'mint', 'sky', 'lavender']

const confetti = [
  ['✦', 'pink', '8%', '29%', '0s'],
  ['•', 'yellow', '16%', '77%', '1.2s'],
  ['✧', 'blue', '31%', '10%', '2.2s'],
  ['✦', 'mint', '43%', '87%', '3s'],
  ['•', 'peach', '56%', '14%', '1.7s'],
  ['✧', 'purple', '69%', '91%', '2.6s'],
  ['✦', 'pink', '83%', '25%', '0.8s'],
  ['•', 'yellow', '91%', '70%', '3.4s'],
  ['✧', 'blue', '5%', '58%', '2s'],
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

  return (
    <div
      className={`package-card-wrap ${isPopping ? 'package-card-wrap-active' : ''}`}
      onMouseEnter={triggerPop}
      onClick={triggerPop}
      onMouseDown={() => setIsHolding(true)}
      onTouchStart={() => setIsHolding(true)}
      onMouseUp={() => setIsHolding(false)}
      onTouchEnd={() => setIsHolding(false)}
      onMouseLeave={() => setIsHolding(false)}
    >
      <img
        src={packageCharacters[index % packageCharacters.length]}
        alt=""
        className={`package-character ${isPopping ? 'package-character-visible' : ''}`}
      />
      <button
        type="button"
        className={`package-card ${tones[index % tones.length]} ${isHolding ? packageGlowClasses[index % packageGlowClasses.length] : ''}`}
        style={isHolding ? { boxShadow: packageGlowShadows[index % packageGlowShadows.length] } : undefined}
      >
        <span className="card-number">0{index + 1}</span>
        <h2>{mainTitle}</h2>
        {subtitle && <h3>{subtitle}</h3>}
        <p className="package-description">
          {plan.descriere.split('\n').map((line, lineIndex) => (
            <span key={`${plan.slug}-${lineIndex}`}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <p className="price">{plan.pret}</p>
        <span className="card-arrow" aria-hidden="true">↗</span>
      </button>
    </div>
  )
}

export default function PacheteAnimatie() {
  const { slug } = useParams()
  const [plans, setPlans] = useState(null)
  const [loadError, setLoadError] = useState('')
  usePageSeo({
    title: 'Pachete Animație Copii — Michelino Satu Mare',
    description: 'Pachete de animație pentru petreceri de copii: jocuri, mascote, baloane modelate și pictură pe față. Servicii în Satu Mare și zona Oaș.',
  })

  useEffect(() => {
    let isCurrent = true

    fetch('/data/pachete.json')
      .then((response) => {
        if (!response.ok) throw new Error('Nu am putut încărca pachetele.')
        return response.json()
      })
      .then((packages) => {
        if (isCurrent) setPlans(packages)
      })
      .catch((error) => {
        if (isCurrent) setLoadError(error.message)
      })

    return () => {
      isCurrent = false
    }
  }, [])

  if (loadError) {
    return <section className="mx-auto max-w-6xl px-6 py-24 text-center text-coral">{loadError}</section>
  }

  if (!plans) {
    return <section className="mx-auto max-w-6xl px-6 py-24 text-center text-muted">Încărcăm pachetele...</section>
  }

  const selectedPlan = slug ? plans.find((plan) => plan.slug === slug) : null

  if (slug && !selectedPlan) {
    return <section className="mx-auto max-w-6xl px-6 py-24 text-center text-coral">Pachetul solicitat nu a fost găsit.</section>
  }

  return (
    <main className="party-page">
      <div className="confetti" aria-hidden="true">
        {confetti.map(([shape, color, top, left, delay], index) => (
          <span key={index} className={`confetti-piece ${color}`} style={{ top, left, animationDelay: delay }}>{shape}</span>
        ))}
      </div>

      <section className="hero" id="top">
        <p className="eyebrow">Pachete de petrecere <span>✦</span></p>
        <h1>{selectedPlan ? selectedPlan.nume : <>Energie bună pentru fiecare <em>petrecere.</em></>}</h1>
        <p className="subtitle">{selectedPlan ? selectedPlan.descriere : 'Alege pachetul potrivit și lăsăm noi joaca să înceapă.'}</p>
      </section>

      <section className="packages" id="packages" aria-label="Pachete de petrecere">
        {plans.map((plan, index) => (
          <PackageCard key={plan.slug} index={index} plan={plan} />
        ))}
      </section>

      <footer id="contact" className="footer-note">Facem loc pentru râsete, joacă și amintiri colorate.</footer>
    </main>
  )
}

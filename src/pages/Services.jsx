import { ArrowRight, Briefcase, PartyPopper } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { tobogane } from '../data/gonflabile'
import { inchirieri } from '../data/inchirieri'
import { preturiServicii } from '../data/servicii'
import { usePageSeo } from '../hooks/usePageSeo'

function Services() {
  const [animationPrice, setAnimationPrice] = useState(null)

  useEffect(() => {
    fetch('/data/pachete.json')
      .then((response) => response.json())
      .then((packages) => {
        const prices = packages
          .map((plan) => Number.parseInt(plan.pret, 10))
          .filter(Number.isFinite)
        setAnimationPrice(prices.length ? Math.min(...prices) : null)
      })
      .catch(() => setAnimationPrice(null))
  }, [])

  const serviceCards = [
    ['Pachete animație', animationPrice, 'Jocuri, concursuri și o doză mare de voie bună.', '/pachete'],
    ['Mascote și personaje', preturiServicii.mascote, 'Personaje îndrăgite pentru o apariție memorabilă.', '/mascote'],
    ['Tobogane și jocuri gonflabile', Math.min(...tobogane.map((item) => item.pret).filter((price) => price != null)), 'Aventuri colorate, instalate și verificate de echipa noastră.', '/tobogane'],
    ['Închirieri petrecere', inchirieri.some((item) => item.pret != null) ? Math.min(...inchirieri.filter((item) => item.pret != null).map((item) => item.pret)) : null, 'Mese, scaune, pavilioane și mașini pentru eveniment.', '/inchirieri'],
  ]

  usePageSeo({
    title: 'Servicii și Prețuri — Michelino Kids Corner Satu Mare',
    description: 'Animație copii, mascote, pictură pe față și tobogane gonflabile pentru petreceri în Satu Mare și împrejurimi.',
  })

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="max-w-2xl">
        <p className="font-bold uppercase tracking-[0.2em] text-ember">Servicii & preturi</p>
        <h1 className="font-display mt-3 text-5xl text-ink">Tot ce ai nevoie pentru o petrecere reusita.</h1>
        <p className="mt-5 text-lg leading-8 text-muted">Alege energia evenimentului tau, iar noi ne ocupam ca cei mici sa se distreze in siguranta.</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {serviceCards.map(([title, price, description, to], index) => (
          <Link key={title} to={to} className={`rounded-[2rem] p-8 transition-transform hover:-translate-y-1 ${index === 1 ? 'bg-teal text-white' : 'border border-line bg-white'}`}>
            <PartyPopper className={index === 1 ? 'text-[#f9d88f]' : 'text-coral'} size={30} />
            <h2 className={`font-display mt-7 text-3xl ${index === 1 ? 'text-white' : 'text-ink'}`}>{title}</h2>
            <p className={`mt-3 text-sm leading-6 ${index === 1 ? 'text-white/80' : 'text-muted'}`}>{description}</p>
            <p className={`mt-7 text-xl font-bold ${index === 1 ? 'text-[#f9d88f]' : 'text-teal'}`}>{price == null ? 'Preț la cerere' : `de la ${price} lei`}</p>
          </Link>
        ))}
      </div>
      <Link
        to="/evenimente-corporate"
        className="group mt-8 flex w-full items-center justify-between gap-6 rounded-[2rem] bg-ink px-6 py-6 text-white transition-transform duration-300 hover:-translate-y-1 sm:px-8 sm:py-8"
      >
        <div className="flex items-center gap-5">
          <Briefcase className="shrink-0 text-mint" size={34} aria-hidden="true" />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-mint">Pentru companii</p>
            <h2 className="font-display mt-1 text-2xl sm:text-3xl">Evenimente Corporate — animație pentru echipa ta</h2>
          </div>
        </div>
        <ArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-2" size={28} aria-hidden="true" />
      </Link>
    </section>
  )
}

export default Services

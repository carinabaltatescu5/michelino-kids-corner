import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const corporatePlans = [
  {
    title: 'Animație Standard Corporate',
    price: '300 lei',
    suffix: '/ animator / oră',
    features: ['Pictură pe față', 'Baloane modelate', 'Mascote', 'Materiale și recuzită incluse'],
    className: 'bg-[#fff3c7] text-ink',
    checkClassName: 'text-teal',
  },
  {
    title: 'Ateliere Corporate',
    price: '400 lei',
    suffix: '/ animator / oră',
    features: ['Tot ce este inclus în pachetul standard', 'Mese și scaune', 'Pavilioane', 'Materiale suplimentare pentru ateliere'],
    className: 'bg-teal text-white',
    checkClassName: 'text-sun',
  },
]

function CorporateEvents() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <header className="max-w-3xl">
        <p className="font-bold uppercase tracking-[0.2em] text-ember">Evenimente Corporate</p>
        <h1 className="font-display mt-3 text-5xl leading-tight text-ink">Animație și distracție pentru echipa ta</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Organizăm animație pentru companii care pregătesc evenimente de echipă, zile de familie sau petreceri corporate pentru copiii angajaților. Este o soluție dedicată companiilor, diferită de pachetele pentru petreceri private.
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {corporatePlans.map((plan) => (
          <article key={plan.title} className={`rounded-[2rem] border-4 border-white p-8 shadow-[0_12px_30px_rgba(29,67,84,0.08)] ${plan.className}`}>
            <h2 className="font-display text-3xl">{plan.title}</h2>
            <div className="mt-7 flex flex-wrap items-baseline gap-2">
              <span className="font-display text-5xl font-black">{plan.price}</span>
              <span className="text-base font-bold opacity-75">{plan.suffix}</span>
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.15em] opacity-75">Ce include:</p>
            <ul className="mt-4 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-base font-semibold">
                  <Check className={`mt-0.5 shrink-0 ${plan.checkClassName}`} size={20} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-6 opacity-75">
              Tariful se calculează per animator și per oră, în funcție de durata evenimentului.
            </p>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-4xl text-base leading-7 text-muted">
        Tarifele sunt calculate pe oră și pentru fiecare animator. Oferta finală depinde de numărul de animatori solicitați și de durata evenimentului; după o scurtă discuție, pregătim o ofertă personalizată pentru compania ta.
      </p>

      <Link
        to="/#contact"
        className="mt-10 inline-flex rounded-full bg-coral px-6 py-4 font-bold text-white shadow-[0_5px_0_#d5674c] transition-transform hover:-translate-y-1"
      >
        Solicită o ofertă pentru evenimentul companiei tale
      </Link>
    </section>
  )
}

export default CorporateEvents

import { PartyPopper } from 'lucide-react'

function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <div className="max-w-2xl">
        <p className="font-bold uppercase tracking-[0.2em] text-[#e4864c]">Servicii & preturi</p>
        <h1 className="font-display mt-3 text-5xl text-[#1d4354]">Tot ce ai nevoie pentru o petrecere reusita.</h1>
        <p className="mt-5 text-lg leading-8 text-[#64727a]">Alege energia evenimentului tau, iar noi ne ocupam ca cei mici sa se distreze in siguranta.</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          ['Animatie', 'de la 350 lei', 'Jocuri, concursuri si o doza mare de voie buna.'],
          ['Tobogane gonflabile', 'de la 450 lei', 'Aventuri colorate, instalate si verificate de echipa noastra.'],
          ['Pachet complet', 'de la 700 lei', 'Animatie plus gonflabil pentru o experienta fara griji.'],
        ].map(([title, price, description], index) => (
          <article key={title} className={`rounded-[2rem] p-8 ${index === 1 ? 'bg-[#16817d] text-white' : 'border border-[#e5ded3] bg-white'}`}>
            <PartyPopper className={index === 1 ? 'text-[#f9d88f]' : 'text-[#ef8061]'} size={30} />
            <h2 className={`font-display mt-7 text-3xl ${index === 1 ? 'text-white' : 'text-[#1d4354]'}`}>{title}</h2>
            <p className={`mt-3 text-sm leading-6 ${index === 1 ? 'text-white/80' : 'text-[#64727a]'}`}>{description}</p>
            <p className={`mt-7 text-xl font-bold ${index === 1 ? 'text-[#f9d88f]' : 'text-[#16817d]'}`}>{price}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services

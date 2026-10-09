import { useState } from 'react'
import { PackageOpen } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { usePageSeo } from '../hooks/usePageSeo'
import { inchirieri } from '../data/inchirieri'

const groups = [
  { key: 'toate', label: 'Toate' },
  { key: 'gustari', label: 'Gustări' },
  { key: 'mese-scaune', label: 'Mese și scaune' },
  { key: 'pavilioane', label: 'Pavilioane' },
]

function PlaceholderImage({ name }) {
  return (
    <div className="flex h-48 w-full items-center justify-center bg-mint/45 text-teal sm:h-56" role="img" aria-label={`Imagine indisponibilă pentru ${name}`}>
      <PackageOpen size={48} strokeWidth={1.5} aria-hidden="true" />
    </div>
  )
}

function RentalImage({ item }) {
  const [hasImage, setHasImage] = useState(Boolean(item.imagine))

  if (!hasImage) return <PlaceholderImage name={item.nume} />

  return (
    <img
      src={item.imagine}
      alt={item.nume}
      className="h-48 w-full object-cover sm:h-56"
      loading="lazy"
      onError={() => setHasImage(false)}
    />
  )
}

function RentalCard({ item }) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      <RentalImage item={item} />
      <div className="p-6">
        <h2 className="text-2xl font-black leading-tight text-ink">{item.nume}</h2>
        {item.variante.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.variante.map((variant) => <span key={variant} className="rounded-full bg-shell px-3 py-1 text-xs font-bold text-teal">{variant}</span>)}
          </div>
        )}
        <p className="mt-3 text-sm leading-6 text-muted">{item.descriere}</p>
        <p className="mt-5 text-xl font-black text-ink">
          {item.pret === null ? 'Preț la cerere' : `${item.pret} lei / ${item.unitate}`}
        </p>
      </div>
    </article>
  )
}

function Inchirieri() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedGroup = searchParams.get('grup')
  const group = groups.some((item) => item.key === requestedGroup) ? requestedGroup : 'toate'
  const visibleItems = group === 'toate' ? inchirieri : inchirieri.filter((item) => item.grup === group)

  usePageSeo({
    title: 'Închirieri petrecere — mese, scaune, pavilioane, vată pe băț | Michelino Satu Mare',
    description: 'Închiriază mese, scaune, pavilioane, mașini de vată pe băț și popcorn pentru petreceri în Satu Mare și împrejurimi.',
  })

  const handleGroupChange = (nextGroup) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams)
      if (nextGroup === 'toate') nextParams.delete('grup')
      else nextParams.set('grup', nextGroup)
      return nextParams
    }, { replace: true, preventScrollReset: true })
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 font-display lg:px-8">
      <header className="max-w-3xl">
        <p className="font-bold uppercase tracking-[0.2em] text-ember">Închirieri petrecere</p>
        <h1 className="mt-3 text-5xl leading-tight text-ink">Tot ce-ți trebuie ca petrecerea să fie completă.</h1>
        <p className="mt-5 text-lg leading-8 text-muted">Completează evenimentul cu vată pe băț, popcorn, mese, scaune și pavilioane potrivite pentru invitații tăi.</p>
      </header>

      <div className="mt-10 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Filtrează închirierile">
        {groups.map((item) => {
          const isSelected = item.key === group
          return (
            <button
              key={item.key}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleGroupChange(item.key)}
              className={`relative shrink-0 snap-start rounded-full px-5 py-3 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-mint ${isSelected ? 'bg-teal text-white shadow-[0_0_28px_rgba(22,129,125,0.55)]' : 'bg-gray-200 text-gray-500 hover:text-gray-700'}`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => <RentalCard key={item.id} item={item} />)}
      </div>
    </section>
  )
}

export default Inchirieri

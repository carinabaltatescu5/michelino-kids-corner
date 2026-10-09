import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { jocuri, tobogane } from '../data/gonflabile'
import { filterByPrice, formatDimensions, formatOptiune, formatPretCard, getPrices, sortItems } from '../lib/gonflabile'
import { usePageSeo } from '../hooks/usePageSeo'
import CompleteazaPetrecerea from '../components/CompleteazaPetrecerea'

const categories = {
  tobogane: {
    label: 'Tobogane gonflabile',
    description: 'Tobogane gonflabile pentru petreceri în Satu Mare și împrejurimi.',
    items: tobogane,
    title: 'Tobogane Gonflabile de Închiriat — Michelino Satu Mare',
  },
  jocuri: {
    label: 'Jocuri gonflabile',
    description: 'Jocuri gonflabile pentru petreceri în Satu Mare și împrejurimi.',
    items: jocuri,
    title: 'Jocuri Gonflabile de Închiriat — Michelino Satu Mare',
  },
}

function GonflabilCard({ item, index, category, expandedId, onToggle }) {
  const isExpanded = expandedId === item.id
  const dimensions = formatDimensions(item)
  const hasOptions = item.optiuni?.length >= 2
  const hasExpandedDetails = dimensions || item.descriere || hasOptions || item.nota

  return (
    <div>
      {isExpanded && (
        <button
          type="button"
          aria-label="Închide detaliile"
          className="fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 md:hidden"
          onClick={() => onToggle(item.id)}
        />
      )}
      <button
        type="button"
        className={`relative w-full cursor-pointer overflow-hidden rounded-3xl bg-white text-left shadow-md transition-all duration-500 ease-out ${isExpanded ? 'z-50 scale-100 md:z-20 md:scale-[1.06] max-md:fixed max-md:left-1/2 max-md:top-1/2 max-md:w-[calc(100vw-2rem)] max-md:max-h-[calc(100vh-2rem)] max-md:-translate-x-1/2 max-md:-translate-y-1/2 max-md:overflow-y-auto' : 'hover:-translate-y-2 hover:shadow-xl'}`}
        onClick={() => onToggle(item.id)}
        aria-expanded={isExpanded}
      >
        <img
          src={encodeURI(item.imagine)}
          alt={category === 'jocuri' ? `${item.nume} — jocuri gonflabile de închiriat, Michelino Satu Mare` : `${item.nume}, tobogan gonflabil pentru petreceri în Satu Mare`}
          loading={index < 4 ? 'eager' : 'lazy'}
          decoding="async"
          className={`h-40 w-full rounded-t-3xl sm:h-56 lg:h-64 ${item.fit === 'contain' ? 'bg-white p-2 object-contain' : 'object-cover'} ${isExpanded ? 'max-md:h-[52vh]' : ''}`}
        />
        <div className="p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <h2 className="min-h-[4.5rem] text-3xl font-black leading-tight text-ink">{item.nume}</h2>
              {hasOptions && <span className="text-xs font-bold text-slate-500">{item.optiuni.length} variante</span>}
            </div>
            <p className="text-xl font-black text-ink sm:shrink-0 md:-translate-x-2">{formatPretCard(item)}</p>
          </div>
          {hasExpandedDetails && (
            <div className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="min-h-0 overflow-hidden">
                {dimensions && <p className="text-sm font-medium text-slate-500">{dimensions}</p>}
                {item.descriere && <p className="mt-3 text-sm leading-6 text-slate-600">{item.descriere}</p>}
                {hasOptions && (
                  <div className="mt-3 space-y-1">
                    {item.optiuni.map((option) => <p key={option.eticheta} className="text-sm font-medium text-slate-600">{formatOptiune(option)}</p>)}
                  </div>
                )}
                {item.nota && <p className="mt-3 text-xs font-medium text-slate-500">{item.nota}</p>}
              </div>
            </div>
          )}
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500">
            Detalii
            <ChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} size={18} aria-hidden="true" />
          </span>
        </div>
      </button>
    </div>
  )
}

function CategorySwitcher({ category, onChange }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="relative z-[60] flex h-12 w-full rounded-full bg-gray-200 p-1 shadow-inner md:h-14">
      {Object.entries(categories).map(([key, value]) => {
        const isSelected = key === category
        return (
          <button
            type="button"
            key={key}
            aria-pressed={isSelected}
            className={`relative z-0 flex min-h-11 flex-1 items-center justify-center rounded-full px-3 text-center text-sm font-bold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-mint sm:text-base ${isSelected ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => onChange(key)}
          >
            {isSelected && (
              <motion.span
                layoutId="gonflabile-pill"
                className="absolute inset-0 -z-10 rounded-full bg-teal shadow-[0_0_28px_rgba(22,129,125,0.55)]"
                transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="leading-tight">{value.label} <span className="font-normal opacity-70">· {value.items.length}</span></span>
          </button>
        )
      })}
    </div>
  )
}

function Gonflabile() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedCategory = searchParams.get('categorie')
  const category = requestedCategory === 'jocuri' ? 'jocuri' : 'tobogane'
  const [expanded, setExpanded] = useState({ category: null, id: null })
  const [isPricePanelOpen, setIsPricePanelOpen] = useState(false)
  const selectedCategory = categories[category]
  const requestedSort = searchParams.get('sortare')
  const sortKey = ['pret-asc', 'pret-desc', 'inaltime-asc', 'inaltime-desc'].includes(requestedSort)
    ? requestedSort
    : 'recomandate'
  const parsePriceParam = (name) => {
    const value = searchParams.get(name)
    if (value === null || value.trim() === '') return null
    const parsed = Number(value)
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
  }
  const minPrice = parsePriceParam('pret_min')
  const maxPrice = parsePriceParam('pret_max')
  const hasInvalidRange = minPrice !== null && maxPrice !== null && minPrice > maxPrice
  const hasPriceFilter = minPrice !== null || maxPrice !== null
  const priceValues = selectedCategory.items
    .flatMap(getPrices)
  const priceMin = priceValues.length ? Math.min(...priceValues) : null
  const priceMax = priceValues.length ? Math.max(...priceValues) : null
  const hasHeights = selectedCategory.items.some((item) => item.inaltime != null)
  const filteredItems = useMemo(
    () => hasInvalidRange ? [...selectedCategory.items] : filterByPrice(selectedCategory.items, minPrice, maxPrice),
    [hasInvalidRange, maxPrice, minPrice, selectedCategory.items],
  )
  const visibleItems = useMemo(
    () => sortItems(filteredItems, sortKey),
    [filteredItems, sortKey],
  )
  const visibleKey = visibleItems.map((item) => item.id).join(',')
  const hiddenWithoutPrice = hasPriceFilter && !hasInvalidRange
    ? selectedCategory.items.filter((item) => getPrices(item).length === 0).length
    : 0
  const expandedId = expanded.category === category && expanded.visibleKey === visibleKey ? expanded.id : null

  usePageSeo({
    title: selectedCategory.title,
    description: selectedCategory.description,
  })

  const handleCategoryChange = (nextCategory) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams)
      if (nextCategory === 'tobogane') {
        nextParams.delete('categorie')
      } else {
        nextParams.set('categorie', nextCategory)
      }
      nextParams.delete('pret_min')
      nextParams.delete('pret_max')
      return nextParams
    }, { replace: true, preventScrollReset: true })
  }

  const updateSearchParam = (name, value) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams)
      if (value === '') nextParams.delete(name)
      else nextParams.set(name, value)
      return nextParams
    }, { replace: true, preventScrollReset: true })
  }

  const resetFilters = () => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams)
      nextParams.delete('sortare')
      nextParams.delete('pret_min')
      nextParams.delete('pret_max')
      return nextParams
    }, { replace: true, preventScrollReset: true })
  }

  const renderPriceInput = (label, name, placeholder) => (
    <label className="flex items-center gap-2 text-sm font-bold text-ink">
      <span>{label}</span>
      <span className="flex items-center rounded-2xl border border-line bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-teal">
        <input
          type="number"
          inputMode="numeric"
          step={50}
          min={0}
          value={name === 'pret_min'
            ? (minPrice === null ? '' : String(minPrice))
            : (maxPrice === null ? '' : String(maxPrice))}
          placeholder={placeholder == null ? '' : String(placeholder)}
          onChange={(event) => updateSearchParam(name, event.target.value)}
          className="w-20 bg-transparent text-right outline-none placeholder:text-slate-400"
          aria-label={`${label} preț`}
        />
        <span className="ml-2 text-muted">lei</span>
      </span>
    </label>
  )

  const filterIsActive = sortKey !== 'recomandate' || hasPriceFilter

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-[var(--nav-offset)] font-display lg:px-8">
      <CategorySwitcher category={category} onChange={handleCategoryChange} />
      <div className="mt-5 rounded-3xl bg-gray-50 p-4 md:flex md:items-center md:gap-4">
        <label className="block flex-1 text-sm font-bold text-ink">
          <span className="mb-2 block">Sortează după</span>
          <select
            value={sortKey}
            onChange={(event) => updateSearchParam('sortare', event.target.value === 'recomandate' ? '' : event.target.value)}
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <option value="recomandate">Recomandate</option>
            <option value="pret-asc">Preț: crescător</option>
            <option value="pret-desc">Preț: descrescător</option>
            {hasHeights && <>
              <option value="inaltime-asc">Înălțime: crescătoare</option>
              <option value="inaltime-desc">Înălțime: descrescătoare</option>
            </>}
          </select>
        </label>
        <button
          type="button"
          className="mt-3 rounded-2xl border border-line bg-white px-4 py-3 text-sm font-bold text-ink md:hidden"
          aria-expanded={isPricePanelOpen}
          aria-controls="price-filter-panel"
          onClick={() => setIsPricePanelOpen((open) => !open)}
        >
          Filtrează prețul {hasPriceFilter && <span className="ml-1 rounded-full bg-teal px-2 py-0.5 text-xs text-white">1</span>}
        </button>
        <div id="price-filter-panel" className={`${isPricePanelOpen ? 'flex' : 'hidden'} mt-3 flex-wrap gap-3 md:flex md:mt-0 md:items-end`}>
          {renderPriceInput('De la', 'pret_min', priceMin)}
          {renderPriceInput('Până la', 'pret_max', priceMax)}
        </div>
        {filterIsActive && <button type="button" onClick={resetFilters} className="hidden text-sm font-bold text-teal hover:underline md:block">Resetează</button>}
      </div>
      {hasInvalidRange && <p className="mt-3 text-sm font-bold text-ember">Prețul minim este mai mare decât maximul</p>}
      <p aria-live="polite" className="mt-4 text-sm font-bold text-muted">Afișăm {visibleItems.length} din {selectedCategory.items.length} {category}</p>
      <h1 className="mt-6 font-bold uppercase tracking-[0.2em] text-ember">Gonflabile pentru petreceri</h1>
      {hiddenWithoutPrice > 0 && <p className="mt-1 text-sm text-muted">{hiddenWithoutPrice} {hiddenWithoutPrice === 1 ? 'produs fără preț afișat este' : 'produse fără preț afișat sunt'} ascunse</p>}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-5"
        >
          {visibleItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleItems.map((item, index) => (
                <GonflabilCard
                  key={item.id}
                  item={item}
                  index={index}
                  category={category}
                  expandedId={expandedId}
                  onToggle={(itemId) => setExpanded({
                    category,
                    visibleKey,
                    id: expandedId === itemId ? null : itemId,
                  })}
                />
              ))}
            </div>
          ) : filterIsActive ? (
            <div className="rounded-3xl bg-white p-10 text-center text-muted shadow-md">
              Nu am găsit produse pentru filtrele alese. <button type="button" onClick={resetFilters} className="font-bold text-teal hover:underline">Resetează filtrele</button>
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-10 text-center text-muted shadow-md">
              Pregătim în curând selecția de jocuri gonflabile. Revino aici pentru noutăți!
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <a href="/#contact" className="mt-10 inline-block rounded-full bg-coral px-6 py-4 font-bold text-white shadow-[0_5px_0_#d5674c] transition-transform hover:-translate-y-1">Rezervă acum</a>
      <CompleteazaPetrecerea />
    </section>
  )
}

export { GonflabilCard }
export default Gonflabile

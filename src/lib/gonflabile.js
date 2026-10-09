export function formatPrice(price) {
  return price === null ? 'Preț la cerere' : `${price} lei`
}

export function formatDimensions(item) {
  if (item.dimensiuniText) return item.dimensiuniText
  const dimensions = [item.lungime, item.latime, item.inaltime]
  if (dimensions.some((dimension) => dimension == null)) return null

  return `${dimensions.map((dimension) => dimension.toLocaleString('ro-RO', { maximumFractionDigits: 2 })).join(' × ')} m (L × l × h)`
}

export function formatPretCard(item) {
  if (item.pret === null) return 'Preț la cerere'
  const prices = getPrices(item)
  const distinctPrices = [...new Set(prices)]
  if (distinctPrices.length >= 2) return `de la ${Math.min(...distinctPrices)} lei`
  return `${item.pret} lei`
}

export function formatOptiune(option) {
  return `${option.eticheta} — ${option.pret} lei${option.unitate ? ` / ${option.unitate}` : ''}`
}

export function getPrices(item) {
  if (item.optiuni) return item.optiuni.map((option) => option.pret)
  return item.pret === null ? [] : [item.pret]
}

export function sortItems(items, sortKey) {
  if (!['pret-asc', 'pret-desc', 'inaltime-asc', 'inaltime-desc'].includes(sortKey)) return [...items]

  const [field, direction] = sortKey.split('-')
  const multiplier = direction === 'desc' ? -1 : 1

  return items
    .map((item, originalIndex) => ({ item, originalIndex }))
    .sort((a, b) => {
      const aValue = a.item[field === 'inaltime' ? 'inaltime' : 'pret']
      const bValue = b.item[field === 'inaltime' ? 'inaltime' : 'pret']

      if (aValue == null && bValue == null) return a.originalIndex - b.originalIndex
      if (aValue == null) return 1
      if (bValue == null) return -1
      return (aValue - bValue) * multiplier || a.originalIndex - b.originalIndex
    })
    .map(({ item }) => item)
}

export function filterByPrice(items, min, max) {
  const hasMin = Number.isFinite(min)
  const hasMax = Number.isFinite(max)
  if (!hasMin && !hasMax) return [...items]

  return items.filter((item) => {
    return getPrices(item).some((price) => {
      if (hasMin && price < min) return false
      if (hasMax && price > max) return false
      return true
    })
  })
}

export function formatPrice(price) {
  return price === null ? 'Preț la cerere' : `${price} lei`
}

export function formatDimensions(item) {
  const dimensions = [item.lungime, item.latime, item.inaltime]
  if (dimensions.some((dimension) => dimension == null)) return null

  return `${dimensions.map((dimension) => dimension.toLocaleString('ro-RO')).join(' × ')} m (L × l × h)`
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
    if (item.pret == null) return false
    if (hasMin && item.pret < min) return false
    if (hasMax && item.pret > max) return false
    return true
  })
}

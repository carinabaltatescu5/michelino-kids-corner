export function formatProdus(product) {
  if (product.pret == null && (product.pretMin == null || product.pretMax == null)) return 'Preț la cerere'
  if (product.pretMin != null && product.pretMax != null) return `${product.pretMin} – ${product.pretMax} lei / ${product.unitate}`
  return `${product.pret} lei / ${product.unitate}`
}
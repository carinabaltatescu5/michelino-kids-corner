import { createPortal } from 'react-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import { formatProdus } from '../lib/inchirieri'

const focusableSelector = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

function GalerieLightbox({ gallery, index, onClose, onChangeIndex }) {
  const closeButtonRef = useRef(null)
  const dialogRef = useRef(null)
  const thumbnailRefs = useRef([])
  const [loadedPhoto, setLoadedPhoto] = useState(null)
  const shouldReduceMotion = useReducedMotion()
  const photoCount = gallery.photos.length
  const photoUrl = gallery.photos[index]
  const photoNumber = index + 1
  const isLoaded = loadedPhoto === photoUrl

  const showPrevious = useCallback(() => onChangeIndex((index - 1 + photoCount) % photoCount), [index, onChangeIndex, photoCount])
  const showNext = useCallback(() => onChangeIndex((index + 1) % photoCount), [index, onChangeIndex, photoCount])

  useEffect(() => {
    const previous = gallery.photos[(index - 1 + photoCount) % photoCount]
    const next = gallery.photos[(index + 1) % photoCount]
    new Image().src = previous
    new Image().src = next
    thumbnailRefs.current[index]?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [gallery.photos, index, photoCount])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousOverscrollBehavior = document.body.style.overscrollBehavior
    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'contain'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        showPrevious()
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        showNext()
        return
      }
      if (event.key === 'Home') {
        event.preventDefault()
        onChangeIndex(0)
        return
      }
      if (event.key === 'End') {
        event.preventDefault()
        onChangeIndex(photoCount - 1)
        return
      }
      if (event.key !== 'Tab') return

      const focusable = [...dialogRef.current.querySelectorAll(focusableSelector)]
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.style.overscrollBehavior = previousOverscrollBehavior
    }
  }, [onChangeIndex, onClose, photoCount, showNext, showPrevious])

  const handleDragEnd = (_event, info) => {
    if (info.offset.x < -80 || info.velocity.x < -500) showNext()
    if (info.offset.x > 80 || info.velocity.x > 500) showPrevious()
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-dialog-title"
        aria-describedby="gallery-dialog-description"
        className="flex h-[100dvh] w-full flex-col overscroll-contain bg-[#1d4354] text-white md:h-[92dvh] md:max-w-6xl md:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center gap-4 border-b border-white/15 px-4 py-3 sm:px-6">
          <div className="min-w-0 flex-1">
            <h2 id="gallery-dialog-title" className="truncate text-lg font-bold sm:text-xl">{gallery.titlu}</h2>
            <p className="text-sm text-white/70">{photoNumber} / {photoCount}</p>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Închide galeria" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint">
            <X size={22} aria-hidden="true" />
          </button>
        </header>

        <motion.div
          className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-14 py-2 sm:px-20"
          drag={shouldReduceMotion ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={handleDragEnd}
          aria-busy={!isLoaded}
        >
          {!isLoaded && <div className="absolute inset-8 animate-pulse rounded-2xl bg-white/10" aria-hidden="true" />}
          <motion.img
            key={photoUrl}
            src={photoUrl}
            alt={`${gallery.titlu}, închiriere Michelino Satu Mare, poza ${photoNumber}`}
            draggable={false}
            onLoad={() => setLoadedPhoto(photoUrl)}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            className="max-h-full max-w-full object-contain"
          />
          <button type="button" onClick={showPrevious} aria-label="Fotografia anterioară" className="absolute left-2 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint sm:left-5">
            <ChevronLeft size={26} aria-hidden="true" />
          </button>
          <button type="button" onClick={showNext} aria-label="Fotografia următoare" className="absolute right-2 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 transition-colors hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint sm:right-5">
            <ChevronRight size={26} aria-hidden="true" />
          </button>
        </motion.div>

        <section id="gallery-dialog-description" className="mx-3 max-h-[28dvh] shrink-0 overflow-y-auto rounded-2xl bg-[#fffaf3] p-4 text-[#1d4354] sm:mx-5 sm:grid sm:grid-cols-2 sm:gap-5 sm:p-5">
          <p className="text-sm leading-6 sm:col-span-2">{gallery.descriere}</p>
          <div className="mt-3 grid gap-2 sm:col-span-2 sm:mt-0 sm:grid-cols-2">
            {gallery.produse.map((product) => (
              <div key={product.nume} className="rounded-xl bg-white/70 px-3 py-2 text-sm">
                <p className="font-bold">{product.nume}</p>
                <p className="font-semibold text-teal">{formatProdus(product)}</p>
                {product.nota && <p className="text-xs text-[#1d4354]/70">{product.nota}</p>}
              </div>
            ))}
          </div>
        </section>

        <div className="flex shrink-0 gap-2 overflow-x-auto px-3 py-3 sm:px-5" aria-label="Miniaturi galerie">
          {gallery.photos.map((photo, photoIndex) => (
            <button
              key={photo}
              ref={(element) => { thumbnailRefs.current[photoIndex] = element }}
              type="button"
              onClick={() => onChangeIndex(photoIndex)}
              aria-label={`Deschide poza ${photoIndex + 1}`}
              aria-current={photoIndex === index}
              className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-mint ${photoIndex === index ? 'ring-2 ring-teal ring-offset-2 ring-offset-[#1d4354]' : 'opacity-70 hover:opacity-100'}`}
            >
              <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">Poza {photoNumber} din {photoCount}</p>
        <Images className="sr-only" aria-hidden="true" />
      </div>
    </div>,
    document.body,
  )
}

export default GalerieLightbox

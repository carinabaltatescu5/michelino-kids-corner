import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-8">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/35 bg-white/80 px-5 py-3 shadow-2xl shadow-[#831843]/10 backdrop-blur-xl" aria-label="Navigație principală">
        <a href="/" aria-label="Acasă">
          <img src="/logo.png" alt="Michelino Logo" className="h-14 w-auto sm:h-16" />
        </a>

        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden items-center gap-6 text-sm font-bold md:flex">
            <a className="transition-colors hover:text-slate-600" href="/">Acasă</a>
            <a className="transition-colors hover:text-slate-600" href="/#servicii">Servicii & prețuri</a>
            <a className="transition-colors hover:text-slate-600" href="/#contact">Contact</a>
          </div>

          <a href="/#contact" className="hidden rounded-full bg-[#831843] px-4 py-2 text-sm font-extrabold text-white shadow-lg shadow-[#831843]/30 transition-transform hover:-translate-y-0.5 md:block">
            Rezervă acum
          </a>

          <button
            type="button"
            className="rounded-full p-2 text-[#1d4354] transition-colors hover:bg-white/70 md:hidden"
            aria-label={isMenuOpen ? 'Închide meniul' : 'Deschide meniul'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>

        {isMenuOpen && (
          <div id="mobile-navigation" className="absolute inset-x-3 top-[calc(100%+0.75rem)] rounded-[1.5rem] border border-white/35 bg-white/95 p-3 shadow-2xl backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1 text-sm font-bold">
              <a className="rounded-xl px-4 py-3 transition-colors hover:bg-[#fdfbf7]" href="/" onClick={closeMenu}>Acasă</a>
              <a className="rounded-xl px-4 py-3 transition-colors hover:bg-[#fdfbf7]" href="/#servicii" onClick={closeMenu}>Servicii & prețuri</a>
              <a className="rounded-xl px-4 py-3 transition-colors hover:bg-[#fdfbf7]" href="/#contact" onClick={closeMenu}>Contact</a>
              <a className="mt-1 rounded-xl bg-[#831843] px-4 py-3 text-center font-extrabold text-white shadow-lg shadow-[#831843]/30" href="/#contact" onClick={closeMenu}>
                Rezervă acum
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
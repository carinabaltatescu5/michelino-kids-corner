import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function CompleteazaPetrecerea() {
  return (
    <Link
      to="/inchirieri"
      className="group mt-10 flex items-center justify-between gap-4 rounded-3xl bg-mint px-5 py-4 text-ink shadow-[0_6px_0_rgba(22,129,125,0.2)] transition-transform hover:-translate-y-1 sm:px-6"
    >
      <span>
        <strong className="block font-display text-xl">Completează petrecerea</strong>
        <span className="mt-1 block text-sm font-medium text-ink/75">Mese, scaune, pavilioane și mașini de vată</span>
      </span>
      <ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" size={24} aria-hidden="true" />
    </Link>
  )
}

export default CompleteazaPetrecerea

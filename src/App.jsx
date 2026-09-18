import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './home_page'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Mascots from './pages/Mascots'
import PacheteAnimatie from './pages/PacheteAnimatie'
import CorporateEvents from './pages/CorporateEvents'

const confetti = [
  ['left-3 top-[16%] text-coral', 0, '✦'],
  ['left-8 top-[31%] text-sun', 0.7, '●'],
  ['left-2 top-[52%] text-mint', 1.2, '✦'],
  ['left-10 top-[72%] text-coral', 1.8, '●'],
  ['right-3 top-[23%] text-mint', 0.4, '✦'],
  ['right-9 top-[43%] text-sun', 1, '●'],
  ['right-2 top-[64%] text-coral', 1.5, '✦'],
  ['right-10 top-[82%] text-mint', 2.1, '●'],
]

function ScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const frame = window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [hash])

  return null
}

function BackToHome() {
  const { pathname } = useLocation()

  if (pathname === '/') return null

  return (
    <Link
      to="/"
      className="fixed left-4 top-28 z-40 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-sm font-bold text-ink shadow-lg shadow-ink/10 backdrop-blur-xl transition-transform hover:-translate-x-1 sm:left-8"
    >
      <ArrowLeft size={17} aria-hidden="true" />
      Înapoi acasă
    </Link>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-white via-shell to-[#dff4fb] text-slateInk">
        <div className="pointer-events-none fixed inset-0 z-30 hidden sm:block" aria-hidden="true">
          {confetti.map(([position, delay, symbol]) => (
            <motion.span
              key={position}
              className={`absolute ${position} text-lg`}
              animate={{ y: [0, 26, 0], rotate: [0, 180, 360], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 3.8, delay, repeat: Infinity, ease: 'easeInOut' }}
            >
              {symbol === '✦' ? <Sparkles size={16} /> : symbol}
            </motion.span>
          ))}
        </div>
        
        {/* Noul Navbar încărcat global pe toate paginile */}
        <Navbar />
        <BackToHome />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/evenimente-corporate" element={<CorporateEvents />} />
            <Route path="/services/animation" element={<PacheteAnimatie />} />
            <Route path="/services/animation/:slug" element={<PacheteAnimatie />} />
            <Route path="/services/mascote" element={<ServiceDetail type="mascote" />} />
            <Route path="/mascote" element={<Mascots />} />
            <Route path="/pachete" element={<PacheteAnimatie />} />
            <Route path="/tobogane" element={<ServiceDetail type="tobogane" />} />
            <Route path="/services/tobogane" element={<ServiceDetail type="tobogane" />} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  )
}

export default App
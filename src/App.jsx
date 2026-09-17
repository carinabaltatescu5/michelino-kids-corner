import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Navbar from './components/Navbar'
import HomePage from './home_page'
import Services from './pages/Services'
import Contact from './pages/Contact'
import ServiceDetail from './pages/ServiceDetail'
import Mascots from './pages/Mascots'

const confetti = [
  ['left-3 top-[16%] text-[#ef8061]', 0, '✦'],
  ['left-8 top-[31%] text-[#f9bd3b]', 0.7, '●'],
  ['left-2 top-[52%] text-[#65c7c0]', 1.2, '✦'],
  ['left-10 top-[72%] text-[#ef8061]', 1.8, '●'],
  ['right-3 top-[23%] text-[#65c7c0]', 0.4, '✦'],
  ['right-9 top-[43%] text-[#f9bd3b]', 1, '●'],
  ['right-2 top-[64%] text-[#ef8061]', 1.5, '✦'],
  ['right-10 top-[82%] text-[#65c7c0]', 2.1, '●'],
]

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-[#fdfbf7] to-[#dff4fb] text-[#20313d]">
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
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/animation" element={<ServiceDetail type="animation" />} />
            <Route path="/services/animation/:slug" element={<ServiceDetail type="animation" />} />
            <Route path="/services/mascote" element={<ServiceDetail type="mascote" />} />
            <Route path="/mascote" element={<Mascots />} />
            <Route path="/pachete" element={<ServiceDetail type="animation" />} />
            <Route path="/tobogane" element={<ServiceDetail type="tobogane" />} />
            <Route path="/services/tobogane" element={<ServiceDetail type="tobogane" />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  )
}

export default App
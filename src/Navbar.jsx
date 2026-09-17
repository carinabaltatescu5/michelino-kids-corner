export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/35 bg-white/80 px-5 py-3 shadow-2xl shadow-primary/15 backdrop-blur-xl" aria-label="Navigație principală">
        <a href="/" aria-label="Acasă"><img src="/logo.png" alt="Michelino Logo" className="h-10 w-auto" /></a>
        <div className="hidden items-center gap-8 text-sm font-bold md:flex">
          <a className="transition-colors hover:text-slate-600" href="/">Acasă</a>
          <a className="transition-colors hover:text-slate-600" href="/#servicii">Servicii & prețuri</a>
        </div>
        <a className="transition-colors hover:text-slate-600" href="/#contact">Contact</a>
        <a href="/#contact" className="rounded-full bg-[#831843] px-4 py-2 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5 shadow-lg shadow-[#831843]/30">Rezervă acum</a>
      </nav>
    </header>
  );
}
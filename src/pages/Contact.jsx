import { Mail, MapPin, Phone } from 'lucide-react'

function Contact() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
      <div>
        <p className="font-bold uppercase tracking-[0.2em] text-[#e4864c]">Contact</p>
        <h1 className="font-display mt-3 text-5xl text-[#1d4354]">Hai sa planificam ziua perfecta.</h1>
        <p className="mt-5 max-w-lg text-lg leading-8 text-[#64727a]">Spune-ne data si tipul evenimentului. Revenim rapid cu disponibilitatea si o oferta potrivita.</p>
        <div className="mt-10 space-y-5 text-[#53636a]">
        </div>
      </div>
      <form className="rounded-[2rem] bg-white p-7 shadow-[0_12px_40px_rgba(38,50,56,0.08)] sm:p-10">
        <label className="block text-sm font-bold text-[#53636a]">Numele tau<input className="mt-2 w-full rounded-xl border border-[#e5ded3] bg-[#fffaf3] px-4 py-3 outline-none focus:border-[#16817d]" type="text" placeholder="Cum te putem striga?" /></label>
        <label className="mt-5 block text-sm font-bold text-[#53636a]">Telefon<input className="mt-2 w-full rounded-xl border border-[#e5ded3] bg-[#fffaf3] px-4 py-3 outline-none focus:border-[#16817d]" type="tel" placeholder="07xx xxx xxx" /></label>
        <label className="mt-5 block text-sm font-bold text-[#53636a]">Detalii eveniment<textarea className="mt-2 min-h-32 w-full resize-y rounded-xl border border-[#e5ded3] bg-[#fffaf3] px-4 py-3 outline-none focus:border-[#16817d]" placeholder="Data, locatia si ce ti-ar placea..." /></label>
        <button type="button" className="mt-6 w-full rounded-full bg-[#ef8061] px-6 py-4 font-bold text-white shadow-[0_5px_0_#d5674c] transition-transform hover:-translate-y-0.5">Trimite mesajul</button>
      </form>
    </section>
  )
}

export default Contact

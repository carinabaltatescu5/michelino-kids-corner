import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const mascotImages = [
  ['alba_cazapada.jpg', 'Alba ca Zăpada'],
  ['banana.jpg', 'Banana'],
  ['barbie.jpg', 'Barbie'],
  ['barbie_idk.jpg', 'Barbie'],
  ['batman.jpg', 'Batman'],
  ['bebe.jpg', 'Bebeluș'],
  ['bluey prieteni.jpg', 'Bluey și prietenii'],
  ['bluey.jpg', 'Bluey'],
  ['buburuza.jpg', 'Buburuza'],
  ['bunny.jpg', 'Bunny'],
  ['ceva urs.jpg', 'Ursuleț'],
  ['cv_bou.jpg', 'Boul simpatic'],
  ['cv_vaca.jpg', 'Văcuța'],
  ['daisy.jpg', 'Daisy'],
  ['de iarna.jpg', 'Personaj de iarnă'],
  ['donald.jpg', 'Donald'],
  ['dora cred.jpg', 'Dora'],
  ['elsa.jpg', 'Elsa'],
  ['elsa2.jpg', 'Elsa'],
  ['eroi.jpg', 'Eroi'],
  ['garfield.jpg', 'Garfield'],
  ['goofy.jpg', 'Goofy'],
  ['halloween.jpg', 'Personaj de Halloween'],
  ['hello kitty.jpg', 'Hello Kitty'],
  ['hulk.jpg', 'Hulk'],
  ['inima.jpg', 'Inimioară'],
  ['jerry.jpg', 'Jerry'],
  ['mario.jpg', 'Mario'],
  ['mickey2.jpg', 'Mickey Mouse'],
  ['mickey3.jpg', 'Mickey Mouse'],
  ['minion.jpg', 'Minion'],
  ['minnie.jpg', 'Minnie Mouse'],
  ['minnie2.jpg', 'Minnie Mouse'],
  ['mosu.jpg', 'Moș Crăciun'],
  ['pawatrol.jpg', 'Paw Patrol'],
  ['pluto.jpg', 'Pluto'],
  ['pokemon.jpg', 'Pokémon'],
  ['pui.jpg', 'Puișor'],
  ['skibidi1.jpg', 'Skibidi'],
  ['skibidi2.jpg', 'Skibidi'],
  ['sonic.jpg', 'Sonic'],
  ['spiderman.jpg', 'Spiderman'],
  ['spongebob.jpg', 'SpongeBob'],
  ['stitch.jpg', 'Stitch'],
  ['strumfii.jpg', 'Ștrumfii'],
  ['superman.jpg', 'Superman'],
  ['tom.jpg', 'Tom'],
  ['urata.jpg', 'Ursuleț'],
  ['uratii.jpg', 'Ursuleți'],
  ['urs simlu.jpg', 'Ursuleț'],
  ['wednesday cred.jpg', 'Wednesday'],
  ['wednesday.jpg', 'Wednesday'],
  ['winnie.jpg', 'Winnie the Pooh'],
]

function Mascots() {
  const [expandedBox, setExpandedBox] = useState(null)

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden bg-[radial-gradient(circle_at_10%_15%,#fff3c7_0,transparent_22%),radial-gradient(circle_at_90%_35%,#dff4fb_0,transparent_25%),linear-gradient(135deg,#fffaf3_0%,#fff7f1_48%,#f1fbf8_100%)] px-6 py-8 sm:py-12 lg:px-8">
      <div className="pointer-events-none absolute -left-14 top-44 h-32 w-32 rounded-full bg-[#ef8061]/15 blur-sm" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-10 top-10 h-24 w-24 rounded-full bg-[#65c7c0]/20" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-24 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-[#f9bd3b]/15" aria-hidden="true" />

      <header className="relative z-10 mx-auto max-w-2xl text-center md:max-w-none">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border-2 border-white bg-[#fff3c7] px-4 py-2 text-sm font-bold text-[#a66c00] shadow-[0_5px_0_rgba(249,189,59,0.28)]">
          <Sparkles size={16} />
          Cele mai iubite personaje
        </div>
        <h1 className="font-display mt-6 text-5xl leading-tight text-transparent [background-image:linear-gradient(90deg,#ef8061_5%,#f0a629_35%,#16817d_68%,#7e65c7_100%)] bg-clip-text sm:text-6xl md:whitespace-nowrap">Alege-ți personajul favorit!</h1>
        <p className="mt-5 text-sm leading-7 text-gray-700 sm:text-base">
          Ce bucurie când prietenul preferat al celor mici apare la petrecere! Mascotele noastre aduc joacă, îmbrățișări și zâmbete cât cuprinde.
        </p>
      </header>

      <div className="relative z-10 mx-auto mt-10 flex max-w-5xl flex-col items-stretch gap-4 md:flex-row md:items-stretch md:gap-0">
        <div className="flex flex-col gap-4 w-full h-full md:flex-1">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setExpandedBox(expandedBox === 'full' ? null : 'full')}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setExpandedBox(expandedBox === 'full' ? null : 'full')
              }
            }}
            className={`cursor-pointer overflow-hidden rounded-[2rem] border-4 border-white bg-yellow-100 p-7 text-center text-[#1d4354] shadow-[0_8px_0_rgba(249,189,59,0.3)] transition-all duration-500 ease-in-out hover:-rotate-1 sm:p-9 ${
              expandedBox === 'full' ? 'flex-1' : 'h-auto'
            }`}
          >
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#a66c00]">PACHET COMPLET</p>
            <p className="font-display mt-3 text-3xl sm:text-4xl">300 RON / 1h</p>
            <p className="mt-1 font-semibold text-[#1d4354]/75">Mascotă + Animator</p>
            <p className={`overflow-hidden text-sm leading-6 text-[#1d4354]/75 transition-all duration-500 ${expandedBox === 'full' ? 'mt-4 max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
              Personajul prinde viață, interacționează, dansează și animează toți copiii prezenți la petrecere.
            </p>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setExpandedBox(expandedBox === 'costume' ? null : 'costume')}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setExpandedBox(expandedBox === 'costume' ? null : 'costume')
              }
            }}
            className={`cursor-pointer overflow-hidden rounded-[2rem] border-4 border-white bg-[#ffe8cc] p-7 text-center text-[#1d4354] shadow-[0_8px_0_rgba(239,128,97,0.25)] transition-all duration-500 ease-in-out hover:-rotate-1 sm:p-9 ${
              expandedBox === 'costume' ? 'flex-1' : 'h-auto'
            }`}
          >
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#b05b32]">DOAR COSTUMUL</p>
            <p className="font-display mt-3 text-3xl sm:text-4xl">100 - 150 RON / tot evenimentul</p>
            <p className="mt-1 font-semibold text-[#1d4354]/75">Închiriere costum fără animator</p>
            <p className={`overflow-hidden text-sm leading-6 text-[#1d4354]/75 transition-all duration-500 ${expandedBox === 'costume' ? 'mt-4 max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
              Se închiriază doar costumul de mascotă, fără animator. Prețul variază în funcție de modelul ales.
            </p>
          </div>
        </div>
        <div className="z-10 -my-1 self-center rounded-full border-4 border-[#fdfbf7] bg-[#ef8061] px-5 py-2 font-display text-xl text-white shadow-[0_5px_0_#d5674c] md:-mx-4 md:my-0">
          sau
        </div>
        <Link
          to="/pachete"
          className="group flex flex-1 items-center justify-between rounded-[2rem] border-4 border-white bg-[#c9f0ed] p-7 text-[#1d4354] shadow-[0_8px_0_rgba(101,199,192,0.35)] transition duration-300 hover:translate-y-[-4px] hover:rotate-1 hover:shadow-[0_14px_35px_rgba(101,199,192,0.42)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#65c7c0] sm:p-9"
        >
          <span>
            <span className="block text-sm font-bold uppercase tracking-[0.15em] text-[#16817d]">Mai multă distracție</span>
            <span className="font-display mt-3 block text-2xl leading-tight sm:text-3xl">Combină cu pachetele de animație la un preț mai avantajos!</span>
          </span>
          <ArrowRight className="ml-4 shrink-0 transition-transform group-hover:translate-x-1" size={28} />
        </Link>
      </div>

      <div className="relative z-10 mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {mascotImages.map(([filename, name], index) => (
          <figure
            key={filename}
            className={`group overflow-hidden rounded-2xl border-4 border-white shadow-[0_5px_18px_rgba(29,67,84,0.12)] transition duration-300 hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_14px_28px_rgba(29,67,84,0.2)] ${
              ['bg-[#ffe2dd]', 'bg-[#fff0b8]', 'bg-[#d4f3ef]', 'bg-[#e9e0ff]'][index % 4]
            }`}
          >
            <img
              src={`/mascote/${filename}`}
              alt={name}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Mascots

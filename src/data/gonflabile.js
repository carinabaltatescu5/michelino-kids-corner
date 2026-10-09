export const tobogane = [
  { id: 1, nume: 'Frozen', pret: 750, lungime: 8.5, latime: 4.5, inaltime: 6.5, imagine: '/tobogane/images/tob1.jpg' },
  { id: 2, nume: 'Minecraft', pret: 750, lungime: 8.5, latime: 4.5, inaltime: 6.5, imagine: '/tobogane/images/tob2.jpg' },
  { id: 3, nume: 'Sonic', pret: 750, lungime: 8.5, latime: 4.5, inaltime: 6.5, imagine: '/tobogane/images/tob3.jpg' },
  { id: 4, nume: 'Minnie Castel', pret: 600, lungime: 11, latime: 5, inaltime: 7, imagine: '/tobogane/images/tob4.jpg' },
  { id: 5, nume: 'Minnie Roz', pret: 400, lungime: 7, latime: 5, inaltime: 5.5, imagine: '/tobogane/images/tob5.jpg' },
  { id: 6, nume: 'Crocodil', pret: 800, lungime: 12, latime: 6, inaltime: 8, imagine: '/tobogane/images/tob6.jpg' },
  { id: 7, nume: 'Maimuța Roșie', pret: 450, lungime: 7, latime: 5, inaltime: 5.5, imagine: '/tobogane/images/tob7.jpg' },
  { id: 8, nume: 'Mickey Club', pret: 400, lungime: 6, latime: 5, inaltime: 5, imagine: '/tobogane/images/tob8.jpg' },
  { id: 9, nume: 'Patrula Cățelușilor', pret: 550, lungime: 7.5, latime: 5.5, inaltime: 5, imagine: '/tobogane/images/tob9.jpg' },
  { id: 10, nume: 'Dual Mickey Club', pret: 500, lungime: 6.5, latime: 6, inaltime: 4.5, imagine: '/tobogane/images/tob10.jpg' },
  { id: 11, nume: 'Broasca', pret: 450, lungime: 7, latime: 5, inaltime: 5.5, imagine: '/tobogane/images/tob11.jpg' },
  { id: 12, nume: 'Mario', pret: 650, lungime: 8, latime: 6, inaltime: 7, imagine: '/tobogane/images/tob12.jpg' },
  { id: 13, nume: 'Tom & Jerry', pret: 650, lungime: 8, latime: 6, inaltime: 6, imagine: '/tobogane/images/tob13.jpg' },
  { id: 14, nume: 'Blue & Bingo', pret: 500, lungime: 6, latime: 5, inaltime: 3.5, imagine: '/tobogane/images/tob14.jpg' },
  { id: 16, nume: 'Marvel', pret: 700, lungime: 8, latime: 6, inaltime: 7, imagine: '/tobogane/images/tob16.jpg' },
  { id: 17, nume: 'Spiderman', pret: 750, lungime: 9, latime: 6, inaltime: 7, imagine: '/tobogane/images/tob17.jpg' },
  { id: 18, nume: 'Perete Cățărare', pret: 800, lungime: 8, latime: 6, inaltime: 8, imagine: '/tobogane/images/tob18.jpg' },
  { id: 19, nume: 'Candy', pret: 850, lungime: 9, latime: 6, inaltime: 7, imagine: '/tobogane/images/tob19.jpg' },
  { id: 20, nume: 'Lilo & Stitch', pret: 850, lungime: 9, latime: 6, inaltime: 7, imagine: '/tobogane/images/tob20.jpg' },
  { id: 21, nume: 'Cars', pret: 850, lungime: 9, latime: 6, inaltime: 7, imagine: '/tobogane/images/tob21.jpg' },
  { id: 22, nume: 'Pink', pret: 750, lungime: 8, latime: 6, inaltime: 7, imagine: '/tobogane/images/tob22.jpg' },
  { id: 23, nume: 'Multiplayer', pret: 800, lungime: 8, latime: 10, inaltime: 7, imagine: '/tobogane/images/tob23.jpg' },
  { id: 24, nume: 'Rainbow', pret: 700, lungime: 8, latime: 5, inaltime: 6, imagine: '/tobogane/images/tob24.png' },
  { id: 25, nume: 'Dinozaur', pret: 700, lungime: 7.5, latime: 5, inaltime: 6, imagine: '/tobogane/images/tob25.png' },
  { id: 26, nume: 'Lego', pret: 650, lungime: null, latime: null, inaltime: null, imagine: '/tobogane/images/tob26.png' },
]

export const jocuri = [
  { id: 'bubble-mare', nume: 'Bubble house mare', imagine: '/jocuri/bubble-mare.png',
    pret: 700, optiuni: null, lungime: 5, latime: null, inaltime: null, diametru: 3,
    dimensiuniText: 'Diametru bulă 3 m · lungime ansamblu 5 m', descriere: null, nota: null, fit: 'cover' },

  { id: 'bubble-mic', nume: 'Bubble house mic', imagine: '/jocuri/bubble-mic.png',
    pret: 400, optiuni: null, lungime: 5, latime: null, inaltime: null, diametru: 3,
    dimensiuniText: 'Diametru bulă 2 m · lungime totală cu extensie 3 m', descriere: null, nota: null, fit: 'cover' },

  { id: 'bouncer-alb', nume: 'Bouncer alb', imagine: '/jocuri/bouncer-alb.png',
    pret: 500, optiuni: null, lungime: null, latime: null, inaltime: null, diametru: null,
    dimensiuniText: null, descriere: null, nota: 'Decorul din baloane nu este inclus în preț.', fit: 'cover' },

  { id: 'sumo', nume: 'Sumo', imagine: '/jocuri/sumo.png',
    pret: 300, optiuni: [ { eticheta: '2 costume sumo', pret: 300 }, { eticheta: '4 costume sumo', pret: 500 } ],
    lungime: null, latime: null, inaltime: null, diametru: 4,
    dimensiuniText: 'Diametru 4 m', descriere: null, nota: null, fit: 'cover' },

  { id: 'ring-box', nume: 'Ring de box', imagine: '/jocuri/ring-box.png',
    pret: 600, optiuni: null, lungime: 5, latime: 5, inaltime: 3, diametru: null,
    dimensiuniText: null, descriere: null, nota: null, fit: 'cover' },

  { id: 'gladiator', nume: 'Gladiator', imagine: '/jocuri/gladiator.png',
    pret: 700, optiuni: null, lungime: 8, latime: 9, inaltime: 0.7, diametru: null,
    dimensiuniText: null, descriere: null, nota: null, fit: 'cover' },

  { id: 'echilibrium', nume: 'Echilibrium', imagine: '/jocuri/echilibrium.png',
    pret: 500, optiuni: null, lungime: null, latime: null, inaltime: null, diametru: null,
    dimensiuniText: null,
    descriere: 'Joc dinamic pentru 2 participanți simultan. Scopul este dezechilibrarea adversarului cu ajutorul unei perne gonflabile, menținându-ți în același timp propriul echilibru. Cine cade primul iese din joc, iar jocul continuă cu cel rămas sus, schimbând adversarul până la epuizarea participanților.',
    nota: null, fit: 'contain' },

  { id: 'joc-ciocan-bile', nume: 'Joc cu ciocan și bile', imagine: '/jocuri/joc-ciocan-bile.png',
    pret: 500, optiuni: null, lungime: 4, latime: 4, inaltime: 2, diametru: null,
    dimensiuniText: null, descriere: null, nota: null, fit: 'cover' },

  { id: 'perete-lipicios', nume: 'Perete lipicios', imagine: '/jocuri/perete-lipicios.png',
    pret: 600, optiuni: null, lungime: null, latime: null, inaltime: null, diametru: null,
    dimensiuniText: null, descriere: null, nota: null, fit: 'cover' }, // TODO: dimensiuni lipsă

  { id: 'ecran-gonflabil', nume: 'Ecran gonflabil', imagine: '/jocuri/ecran-gonflabil.png',
    pret: 1000, optiuni: null, lungime: 6, latime: 3, inaltime: 6, diametru: null, // TODO: confirmă (mesaj original: „L6/l3/6 h")
    dimensiuniText: null, descriere: null, nota: null, fit: 'contain' },
]

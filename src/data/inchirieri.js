export const inchirieri = [
  {
    id: 'masina-vata-bat',
    grup: 'gustari',
    nume: 'Mașină de vată pe băț',
    descriere: 'Un colț dulce și spectaculos pentru invitații tăi.',
    pret: null, // TODO: de completat
    unitate: 'eveniment',
    imagine: '/inchirieri/masina-vata-bat.jpg',
    variante: [],
  },
  {
    id: 'masina-popcorn',
    grup: 'gustari',
    nume: 'Mașină de popcorn',
    descriere: 'Popcorn proaspăt pentru o atmosferă de cinema la petrecere.',
    pret: null, // TODO: de completat
    unitate: 'eveniment',
    imagine: '/inchirieri/masina-popcorn.jpg',
    variante: [],
  },
  {
    id: 'pavilion-3x45',
    grup: 'pavilioane',
    nume: 'Pavilion 3 × 4,5 m',
    descriere: 'Adăpost confortabil pentru invitați și mesele evenimentului.',
    pret: null, // TODO: de completat
    unitate: 'buc',
    imagine: '/inchirieri/pavilion-3x4-5-m.jpg',
    variante: [],
  },
  {
    id: 'pavilion-3x6',
    grup: 'pavilioane',
    nume: 'Pavilion 3 × 6 m',
    descriere: 'Spațiu acoperit pentru petreceri în aer liber.',
    pret: null, // TODO: de completat
    unitate: 'buc',
    imagine: '/inchirieri/pavilion-3x6-m.jpg',
    variante: [],
  },
]

export const galerii = [
  {
    id: 'masuta', grup: 'mese-scaune',
    titlu: 'Măsuțe și scăunele pentru copii',
    rezumat: ['Măsuțe de la 35 lei', 'Scăunel 5 lei'],
    descriere: 'Măsuțe și scăunele pentru copii, în mai multe culori, dimensiuni și modele.',
    produse: [
      {
        nume: 'Măsuțe pentru copii', pretMin: 35, pretMax: 50,
        // TODO: confirmă unitatea (buc. / eveniment / zi)
        unitate: 'buc.', nota: 'în funcție de model',
      },
      {
        nume: 'Scăunel copii (orice model)', pret: 5,
        // TODO: confirmă unitatea (buc. / eveniment / zi)
        unitate: 'buc.',
      },
    ],
  },
  {
    id: 'masa', grup: 'mese-scaune',
    titlu: 'Mese și scaune pentru adulți',
    rezumat: ['Mese de la 50 lei', 'Scaun 10 lei'],
    descriere: 'Mese dreptunghiulare și rotunde, scaune Chiavari și mese cocktail bar pentru invitații adulți.',
    produse: [
      {
        nume: 'Masă dreptunghiulară 180 × 70 cm', pret: 50,
        // TODO: confirmă unitatea (buc. / eveniment / zi)
        unitate: 'buc.',
      },
      {
        nume: 'Masă rotundă, diametru 150 cm', pret: 65,
        // TODO: confirmă unitatea (buc. / eveniment / zi)
        unitate: 'buc.',
      },
      {
        nume: 'Scaun Chiavari', pret: 10,
        // TODO: confirmă unitatea (buc. / eveniment / zi)
        unitate: 'buc.',
      },
      {
        nume: 'Masă cocktail bar', pret: 50,
        // TODO: confirmă unitatea (buc. / eveniment / zi)
        unitate: 'buc.', nota: 'variante: albă și neagră',
      },
      {
        nume: 'Huse pentru mese', pret: null,
        // TODO: confirmă unitatea (buc. / eveniment / zi)
        unitate: 'buc.', nota: 'se închiriază separat',
      },
    ],
  },
]

// TODO: Când apare coșul de rezervare, adaugă tipul "inchiriere" și limita de 200 pentru acest tip.

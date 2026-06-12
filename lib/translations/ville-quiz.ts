export type VilleQuizLang = 'fr' | 'kr' | 'en' | 'es'

export type VilleQuizQuestion = {
  q: string
  options: string[]
  correct: number
  explain?: string
}

export const villeQuiz: Record<VilleQuizLang, VilleQuizQuestion[]> = {
  fr: [
    {
      q: 'Où placer un hôpital dans le jeu ?',
      options: ['Sur argile (A) sans étude', 'Sur roche (R) après étude géologique', 'N\'importe où si budget suffisant'],
      correct: 1,
      explain: 'Les bâtiments lourds critiques doivent être sur roche stable, révélée par l\'étude géologique (étape 1).',
    },
    {
      q: 'Quel matériau est le plus dangereux en Haïti ?',
      options: ['Béton parasismique chaîné', 'Blocs ciment non armé', 'Bois bien ancré'],
      correct: 1,
      explain: 'Les blocs non armés ont une résistance de 0,3 — profil dominant des effondrements 2010.',
    },
    {
      q: 'Que fait le zonage strict (rôle Maire) ?',
      options: ['Augmente le budget', 'Bloque les bâtiments lourds sur sols instables', 'Accélère la construction'],
      correct: 1,
      explain: 'Le zonage empêche hôpitaux et écoles sur argile ou sol meuble sans renforcement.',
    },
    {
      q: 'Pourquoi réparer entre les phases sismiques ?',
      options: ['Pour décorer la ville', 'Les bâtiments endommagés résistent moins au prochain séisme', 'Ce n\'est pas nécessaire'],
      correct: 1,
      explain: 'Un bâtiment fissuré ou effondré a une résistance réduite — la phase 3 (M7,0) sera fatale sans réparation.',
    },
    {
      q: 'La phase 3 de la campagne reproduit…',
      options: ['Un séisme mineur', 'Le séisme du 12 janvier 2010 (Mw 7,0)', 'Un tsunami'],
      correct: 1,
      explain: 'Phase 3 = Léogâne / Port-au-Prince 2010 — l\'épreuve ultime de votre planification parasismique.',
    },
  ],
  kr: [
    {
      q: 'Ki kote pou mete lopital nan jwèt la ?',
      options: ['Sou ajil (A) san etid', 'Sou wòch (R) apre etid jewolojik', 'Nenpòt kote si gen bidjè'],
      correct: 1,
      explain: 'Bilding lou kritik dwe sou wòch estab, revele pa etid jewolojik (etap 1).',
    },
    {
      q: 'Ki materyèl ki pi danjere nan Ayiti ?',
      options: ['Beton parasismik mare', 'Blòk siman san fè', 'Bwa byen mare'],
      correct: 1,
      explain: 'Blòk san fè gen rezistans 0,3 — pwofil dominan tonbe 2010.',
    },
    {
      q: 'Kisa zonaj sevè (wòl Majistra) fè ?',
      options: ['Ogmante bidjè', 'Bloke bilding lou sou tè enstab', 'Akselere konstriksyon'],
      correct: 1,
      explain: 'Zonaj anpeche lopital ak lekòl sou ajil oswa tè meb san ranfòsman.',
    },
    {
      q: 'Poukisa repare ant faz yo ?',
      options: ['Pou dekore vil la', 'Bilding domaje reziste mwens nan pwochen tranblemanntè a', 'Pa nesesè'],
      correct: 1,
      explain: 'Bilding ki gen fisè oswa tonbe gen mwens rezistans — faz 3 (M7,0) ap fatal san reparasyon.',
    },
    {
      q: 'Faz 3 kanpay la repwodui…',
      options: ['Yon ti tranblemanntè', 'Tranblemanntè 12 janvye 2010 (Mw 7,0)', 'Yon tsunami'],
      correct: 1,
      explain: 'Faz 3 = Legann / Pòtoprens 2010 — eprèv final planifikasyon parasismik ou.',
    },
  ],
  en: [
    {
      q: 'Where to place a hospital in the game?',
      options: ['On clay (A) without study', 'On rock (R) after geological study', 'Anywhere if budget allows'],
      correct: 1,
      explain: 'Critical heavy buildings must be on stable rock, revealed by geological study (step 1).',
    },
    {
      q: 'Which material is most dangerous in Haiti?',
      options: ['Confined seismic concrete', 'Unreinforced cement blocks', 'Well-anchored wood'],
      correct: 1,
      explain: 'Unreinforced blocks have 0.3 resistance — dominant 2010 collapse profile.',
    },
    {
      q: 'What does strict zoning (Mayor role) do?',
      options: ['Increases budget', 'Blocks heavy buildings on unstable soils', 'Speeds construction'],
      correct: 1,
      explain: 'Zoning prevents hospitals and schools on clay or soft soil without reinforcement.',
    },
    {
      q: 'Why repair between seismic phases?',
      options: ['To decorate the city', 'Damaged buildings resist less in the next quake', 'Not necessary'],
      correct: 1,
      explain: 'Cracked or collapsed buildings have reduced resistance — phase 3 (M7.0) will be fatal without repair.',
    },
    {
      q: 'Campaign phase 3 reproduces…',
      options: ['A minor earthquake', 'January 12, 2010 earthquake (Mw 7.0)', 'A tsunami'],
      correct: 1,
      explain: 'Phase 3 = Léogâne / Port-au-Prince 2010 — ultimate test of your seismic planning.',
    },
  ],
  es: [
    {
      q: '¿Dónde colocar un hospital en el juego?',
      options: ['En arcilla (A) sin estudio', 'En roca (R) tras estudio geológico', 'En cualquier lugar si hay presupuesto'],
      correct: 1,
      explain: 'Los edificios pesados críticos deben ir en roca estable, revelada por estudio geológico (paso 1).',
    },
    {
      q: '¿Qué material es más peligroso en Haití?',
      options: ['Concreto antisísmico confinado', 'Bloques de cemento sin refuerzo', 'Madera bien anclada'],
      correct: 1,
      explain: 'Los bloques sin refuerzo tienen resistencia 0,3 — perfil dominante de colapsos 2010.',
    },
    {
      q: '¿Qué hace la zonificación estricta (rol alcalde)?',
      options: ['Aumenta el presupuesto', 'Bloquea edificios pesados en suelos inestables', 'Acelera la construcción'],
      correct: 1,
      explain: 'La zonificación impide hospitales y escuelas en arcilla o suelo blando sin refuerzo.',
    },
    {
      q: '¿Por qué reparar entre fases sísmicas?',
      options: ['Para decorar la ciudad', 'Los edificios dañados resisten menos en el próximo sismo', 'No es necesario'],
      correct: 1,
      explain: 'Edificios agrietados o colapsados tienen menos resistencia — la fase 3 (M7,0) será fatal sin reparación.',
    },
    {
      q: 'La fase 3 de la campaña reproduce…',
      options: ['Un sismo menor', 'El sismo del 12 de enero de 2010 (Mw 7,0)', 'Un tsunami'],
      correct: 1,
      explain: 'Fase 3 = Léogâne / Puerto Príncipe 2010 — prueba definitiva de su planificación antisísmica.',
    },
  ],
}

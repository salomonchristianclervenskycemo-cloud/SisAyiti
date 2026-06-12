export type DiagQuizLang = 'fr' | 'kr' | 'en' | 'es'

export type DiagQuizQuestion = {
  q: string
  options: string[]
  correct: number
  explain?: string
}

export const diagnosticQuiz: Record<DiagQuizLang, DiagQuizQuestion[]> = {
  fr: [
    {
      q: 'En Haïti, quelle structure est la plus vulnérable aux séismes ?',
      options: ['Béton armé récent', 'Béton non armé avec étages ajoutés', 'Bois bien entretenu'],
      correct: 1,
      explain: 'Le béton non armé et les étages ajoutés sans calcul structural ont causé des milliers d\'effondrements en 2010.',
    },
    {
      q: 'Fissures en diagonale sur un mur porteur indiquent…',
      options: ['Un problème cosmétique', 'Un stress structural important', 'Une humidité normale'],
      correct: 1,
      explain: 'Les fissures diagonales traduisent souvent une déformation du bâtiment sous contrainte sismique.',
    },
    {
      q: 'Ce diagnostic remplace-t-il une visite d\'ingénieur ?',
      options: ['Oui, totalement', 'Non — c\'est un outil indicatif', 'Seulement pour les immeubles'],
      correct: 1,
      explain: 'SisAyiti oriente vos priorités ; un professionnel doit valider les travaux de renforcement.',
    },
  ],
  kr: [
    {
      q: 'Nan Ayiti, ki estrikti ki pi vilnerab devan tranblemanntè ?',
      options: ['Beton arme resan', 'Beton san fè ak etaj ajoute', 'Bwa byen antretyen'],
      correct: 1,
      explain: 'Beton san fè ak etaj san kalkil te fè plizyè mil bilding tonbe an 2010.',
    },
    {
      q: 'Fisè diagonal sou yon mi sipò vle di…',
      options: ['Pwoblèm kosmetik', 'Gwo estrès estrikti', 'Imidite nòmal'],
      correct: 1,
      explain: 'Fisè diagonal souvan montre bilding la ap deforme.',
    },
    {
      q: 'Èske dyagnostik sa a ranplase yon enjenyè ?',
      options: ['Wi, totalman', 'Non — se zouti endikatif', 'Sèlman pou bilding'],
      correct: 1,
      explain: 'SisAyiti montre priyorite ; yon pwofesyonèl dwe valide travay yo.',
    },
  ],
  en: [
    {
      q: 'In Haiti, which structure is most earthquake-vulnerable?',
      options: ['Recent reinforced concrete', 'Unreinforced concrete with added floors', 'Well-maintained wood'],
      correct: 1,
      explain: 'Unreinforced concrete and unengineered added floors caused thousands of collapses in 2010.',
    },
    {
      q: 'Diagonal cracks on a load-bearing wall indicate…',
      options: ['Cosmetic issue', 'Significant structural stress', 'Normal humidity'],
      correct: 1,
      explain: 'Diagonal cracks often show building deformation under seismic stress.',
    },
    {
      q: 'Does this diagnostic replace an engineer visit?',
      options: ['Yes, completely', 'No — it is indicative only', 'Only for large buildings'],
      correct: 1,
      explain: 'SisAyiti guides priorities; a professional must validate reinforcement work.',
    },
  ],
  es: [
    {
      q: 'En Haití, ¿qué estructura es más vulnerable a sismos?',
      options: ['Concreto armado reciente', 'Concreto sin refuerzo con pisos añadidos', 'Madera bien mantenida'],
      correct: 1,
      explain: 'El concreto sin refuerzo y pisos sin cálculo estructural causaron miles de colapsos en 2010.',
    },
    {
      q: 'Grietas diagonales en un muro portante indican…',
      options: ['Problema cosmético', 'Estrés estructural importante', 'Humedad normal'],
      correct: 1,
      explain: 'Las grietas diagonales suelen mostrar deformación bajo estrés sísmico.',
    },
    {
      q: '¿Este diagnóstico reemplaza una visita de ingeniero?',
      options: ['Sí, totalmente', 'No — es solo indicativo', 'Solo para edificios grandes'],
      correct: 1,
      explain: 'SisAyiti orienta prioridades; un profesional debe validar obras de refuerzo.',
    },
  ],
}

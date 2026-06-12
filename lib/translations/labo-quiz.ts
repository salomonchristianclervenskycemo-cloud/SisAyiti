export type LaboQuizLang = 'fr' | 'kr' | 'en' | 'es'

export type LaboQuizQuestion = {
  q: string
  options: string[]
  correct: number
  explain?: string
}

export const laboQuiz: Record<LaboQuizLang, LaboQuizQuestion[]> = {
  fr: [
    {
      q: 'Qu\'est-ce que le PGA mesure ?',
      options: ['La magnitude du séisme', 'L\'accélération maximale du sol', 'La profondeur du foyer'],
      correct: 1,
      explain: 'Le PGA (Peak Ground Acceleration) est l\'accélération maximale du sol en % de g — indicateur clé des dommages.',
    },
    {
      q: 'Pourquoi Port-au-Prince a-t-il souffert autant en 2010 (Mw 7,0) ?',
      options: ['Magnitude exceptionnelle seule', 'Proximité de la faille + sol meuble + bâtiments fragiles', 'Tsunami principal'],
      correct: 1,
      explain: 'La combinaison distance courte (~13 km), sol alluvionnaire et bâtiments non parasismiques a amplifié les destructions.',
    },
    {
      q: 'Un sol alluvionnaire sous PAP amplifie les secousses d\'environ…',
      options: ['×0,5 par rapport à la roche', '×1,8 par rapport à la roche', 'Pas d\'effet'],
      correct: 1,
      explain: 'L\'effet de site peut multiplier l\'intensité ressentie — facteur ~1,8 pour alluvions, ~2,5 pour sols saturés.',
    },
    {
      q: 'Mw 7,0 vs Mw 6,0 : l\'énergie libérée est environ…',
      options: ['2× plus grande', '32× plus grande', 'Identique'],
      correct: 1,
      explain: 'Chaque +1 de magnitude ≈ 32× plus d\'énergie à la source (échelle logarithmique).',
    },
    {
      q: 'Ce simulateur remplace-t-il un audit structural ?',
      options: ['Oui', 'Non — outil pédagogique indicatif', 'Seulement pour les écoles'],
      correct: 1,
      explain: 'Le Labo aide à comprendre les facteurs de risque ; un ingénieur doit valider les travaux de renforcement.',
    },
  ],
  kr: [
    {
      q: 'Kisa PGA mezire ?',
      options: ['Magnitid tranblemanntè a', 'Akselerasyon maksimòm tè a', 'Pwofondè fokis la'],
      correct: 1,
      explain: 'PGA se akselerasyon maksimòm tè a an % g — endikatè kle pou domaj.',
    },
    {
      q: 'Poukisa Pòtoprens te soufri anpil an 2010 (Mw 7,0) ?',
      options: ['Magnitid eksepsyonèl sèlman', 'Pwoksimite fay + tè meb + bilding fèb', 'Tsunami prensipal'],
      correct: 1,
      explain: 'Konbinezon distans kout, tè aluvyal ak bilding ki pa reziste te ogmante destriksyon.',
    },
    {
      q: 'Tè aluvyal anba PAP ogmante sekou yo apeprè…',
      options: ['×0,5 konpare ak wòch', '×1,8 konpare ak wòch', 'Pa gen efè'],
      correct: 1,
      explain: 'Efè sit ka miltipliye entansite — ~×1,8 pou aluvyon, ~×2,5 pou tè satire.',
    },
    {
      q: 'Mw 7,0 vs Mw 6,0 : enèji lage apeprè…',
      options: ['2 fwa plis', '32 fwa plis', 'Menm bagay'],
      correct: 1,
      explain: 'Chak +1 magnitid ≈ 32 fwa plis enèji nan sous la.',
    },
    {
      q: 'Similatè sa a ranplase yon odit estrikti ?',
      options: ['Wi', 'Non — zouti pedagojik endikatif', 'Sèlman pou lekòl'],
      correct: 1,
      explain: 'Labo ede konprann risk ; yon enjenyè dwe valide travay ranfòsman.',
    },
  ],
  en: [
    {
      q: 'What does PGA measure?',
      options: ['Earthquake magnitude', 'Maximum ground acceleration', 'Focal depth'],
      correct: 1,
      explain: 'PGA (Peak Ground Acceleration) is max ground acceleration in % g — key damage indicator.',
    },
    {
      q: 'Why did Port-au-Prince suffer so much in 2010 (Mw 7.0)?',
      options: ['Exceptional magnitude alone', 'Fault proximity + soft soil + fragile buildings', 'Main tsunami'],
      correct: 1,
      explain: 'Short distance (~13 km), alluvial soil and non-seismic buildings amplified destruction.',
    },
    {
      q: 'Alluvial soil under PAP amplifies shaking by about…',
      options: ['×0.5 vs rock', '×1.8 vs rock', 'No effect'],
      correct: 1,
      explain: 'Site effect can multiply felt intensity — ~×1.8 for alluvium, ~×2.5 for saturated soils.',
    },
    {
      q: 'Mw 7.0 vs Mw 6.0: energy released is about…',
      options: ['2× greater', '32× greater', 'The same'],
      correct: 1,
      explain: 'Each +1 magnitude ≈ 32× more energy at the source (logarithmic scale).',
    },
    {
      q: 'Does this simulator replace a structural audit?',
      options: ['Yes', 'No — indicative educational tool', 'Only for schools'],
      correct: 1,
      explain: 'The Lab helps understand risk factors; an engineer must validate reinforcement work.',
    },
  ],
  es: [
    {
      q: '¿Qué mide el PGA?',
      options: ['La magnitud del sismo', 'La aceleración máxima del suelo', 'La profundidad del foco'],
      correct: 1,
      explain: 'El PGA es la aceleración máxima del suelo en % g — indicador clave de daños.',
    },
    {
      q: '¿Por qué Puerto Príncipe sufrió tanto en 2010 (Mw 7,0)?',
      options: ['Solo magnitud excepcional', 'Proximidad a la falla + suelo blando + edificios frágiles', 'Tsunami principal'],
      correct: 1,
      explain: 'Distancia corta (~13 km), suelo aluvial y edificios no antisísmicos amplificaron la destrucción.',
    },
    {
      q: 'El suelo aluvial bajo PAP amplifica la sacudida aproximadamente…',
      options: ['×0,5 vs roca', '×1,8 vs roca', 'Sin efecto'],
      correct: 1,
      explain: 'El efecto de sitio puede multiplicar la intensidad — ~×1,8 aluvial, ~×2,5 saturado.',
    },
    {
      q: 'Mw 7,0 vs Mw 6,0: la energía liberada es aproximadamente…',
      options: ['2× mayor', '32× mayor', 'Igual'],
      correct: 1,
      explain: 'Cada +1 de magnitud ≈ 32× más energía en el foco (escala logarítmica).',
    },
    {
      q: '¿Este simulador reemplaza una auditoría estructural?',
      options: ['Sí', 'No — herramienta pedagógica indicativa', 'Solo para escuelas'],
      correct: 1,
      explain: 'El Labo ayuda a entender factores de riesgo; un ingeniero debe validar los refuerzos.',
    },
  ],
}

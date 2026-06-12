export type CarteQuizLang = 'fr' | 'kr' | 'en' | 'es'

export type CarteQuizQuestion = {
  q: string
  options: string[]
  correct: number
  explain?: string
}

export const carteQuiz: Record<CarteQuizLang, CarteQuizQuestion[]> = {
  fr: [
    {
      q: 'Sur la carte, un cercle plus grand indique généralement…',
      options: ['Une plus grande profondeur', 'Une plus grande magnitude', 'Un séisme plus ancien'],
      correct: 1,
      explain: 'La taille du marqueur est liée à la magnitude (Mw), pas à la profondeur (couleur).',
    },
    {
      q: 'Un séisme peu profond (<30 km) est souvent…',
      options: ['Moins ressenti en surface', 'Plus destructeur en surface', 'Invisible sur la carte'],
      correct: 1,
      explain: 'Moins de profondeur = énergie libérée plus près des bâtiments — cas du 2010 (13 km).',
    },
    {
      q: 'Quelle faille est responsable du séisme de 2010 ?',
      options: ['Faille septentrionale', 'Enriquillo-Plantain Garden (EPGF)', 'Aucune — c\'était un volcan'],
      correct: 1,
      explain: 'Le grand séisme de Léogâne/PAP est lié à la faille EPGF dans l\'ouest d\'Haïti.',
    },
    {
      q: 'Les événements « historiques » épinglés sur la carte…',
      options: ['Disparaissent avec les filtres', 'Restent visibles pour l\'éducation', 'Sont des prédictions'],
      correct: 1,
      explain: '2010, 2021, 1842… restent accessibles même si la période filtrée est courte.',
    },
    {
      q: 'Badge ACTIF sur la carte signifie…',
      options: ['Données figées', 'Flux temps réel USGS/EMSC connecté', 'Mode hors-ligne uniquement'],
      correct: 1,
      explain: 'Le flux live alimente la carte ; en cas de coupure, le mode SYNC utilise le cache.',
    },
  ],
  kr: [
    {
      q: 'Sou kat la, yon sèk pi gwo endike jeneralman…',
      options: ['Pi gwo pwofondè', 'Pi gwo magnitid', 'Tranblemanntè pi ansyen'],
      correct: 1,
      explain: 'Gwosè makè a lye ak magnitid (Mw), pa pwofondè (koulè).',
    },
    {
      q: 'Tranblemanntè pa fon (<30 km) souvan…',
      options: ['Mwens santi sou sifas', 'Pi destriktif sou sifas', 'Envisib sou kat'],
      correct: 1,
      explain: 'Mwens pwofondè = enèji pi pre bilding — ka 2010 (13 km).',
    },
    {
      q: 'Ki fay ki responsab tranblemanntè 2010 la ?',
      options: ['Fay septantriyonal', 'Enriquillo-Plantain Garden (EPGF)', 'Okenn — te vòlkan'],
      correct: 1,
      explain: 'Gwo tranblemanntè Legann/PAP lye ak fay EPGF nan lwès Ayiti.',
    },
    {
      q: 'Evènman « istorik » sou kat la…',
      options: ['Disparèt ak filt yo', 'Rete vizib pou edikasyon', 'Se prediksyon'],
      correct: 1,
      explain: '2010, 2021, 1842… rete aksesib menm si peryòd la kout.',
    },
    {
      q: 'Badge AKTIF sou kat la vle di…',
      options: ['Done fige', 'Flux tan reyèl USGS/EMSC konekte', 'Sèlman offline'],
      correct: 1,
      explain: 'Flux live nourri kat la ; si koupe, mòd SENK itilize cache.',
    },
  ],
  en: [
    {
      q: 'On the map, a larger circle usually indicates…',
      options: ['Greater depth', 'Greater magnitude', 'An older earthquake'],
      correct: 1,
      explain: 'Marker size is tied to magnitude (Mw), not depth (color).',
    },
    {
      q: 'A shallow earthquake (<30 km) is often…',
      options: ['Less felt at surface', 'More destructive at surface', 'Invisible on the map'],
      correct: 1,
      explain: 'Less depth = energy released closer to buildings — 2010 case (13 km).',
    },
    {
      q: 'Which fault caused the 2010 earthquake?',
      options: ['Septentrional fault', 'Enriquillo-Plantain Garden (EPGF)', 'None — it was a volcano'],
      correct: 1,
      explain: 'The major Léogâne/PAP quake is linked to the EPGF fault in western Haiti.',
    },
    {
      q: 'Pinned « historical » events on the map…',
      options: ['Disappear with filters', 'Stay visible for education', 'Are predictions'],
      correct: 1,
      explain: '2010, 2021, 1842… remain accessible even if the filtered period is short.',
    },
    {
      q: 'ACTIVE badge on the map means…',
      options: ['Frozen data', 'USGS/EMSC real-time stream connected', 'Offline only'],
      correct: 1,
      explain: 'Live feed powers the map; if disconnected, SYNC mode uses cache.',
    },
  ],
  es: [
    {
      q: 'En el mapa, un círculo más grande indica generalmente…',
      options: ['Mayor profundidad', 'Mayor magnitud', 'Un sismo más antiguo'],
      correct: 1,
      explain: 'El tamaño del marcador está ligado a la magnitud (Mw), no a la profundidad (color).',
    },
    {
      q: 'Un sismo superficial (<30 km) suele ser…',
      options: ['Menos sentido en superficie', 'Más destructivo en superficie', 'Invisible en el mapa'],
      correct: 1,
      explain: 'Menos profundidad = energía más cerca de los edificios — caso 2010 (13 km).',
    },
    {
      q: '¿Qué falla causó el sismo de 2010?',
      options: ['Falla septentrional', 'Enriquillo-Plantain Garden (EPGF)', 'Ninguna — fue un volcán'],
      correct: 1,
      explain: 'El gran sismo de Léogâne/PAP está ligado a la falla EPGF en el oeste de Haití.',
    },
    {
      q: 'Los eventos « históricos » fijados en el mapa…',
      options: ['Desaparecen con los filtros', 'Permanecen visibles para educación', 'Son predicciones'],
      correct: 1,
      explain: '2010, 2021, 1842… siguen accesibles aunque el período filtrado sea corto.',
    },
    {
      q: 'La insignia ACTIVO en el mapa significa…',
      options: ['Datos congelados', 'Flujo en tiempo real USGS/EMSC conectado', 'Solo sin conexión'],
      correct: 1,
      explain: 'El flujo en vivo alimenta el mapa; si se corta, el modo SYNC usa caché.',
    },
  ],
}

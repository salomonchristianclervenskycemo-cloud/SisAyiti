export type ActQuizLang = 'fr' | 'kr' | 'en' | 'es'

export type ActQuizQuestion = {
  q: string
  options: string[]
  correct: number
  explain?: string
}

export const actualiteQuiz: Record<ActQuizLang, ActQuizQuestion[]> = {
  fr: [
    {
      q: 'Quelles sources alimentent le centre de surveillance ?',
      options: ['NASA uniquement', 'USGS et EMSC', 'Météo France'],
      correct: 1,
      explain: 'USGS (mondial) et EMSC (régional) sont fusionnés pour le flux SisAyiti.',
    },
    {
      q: 'Le badge « Système connecté » signifie…',
      options: ['Données figées', 'Flux temps réel actif', 'Mode hors-ligne uniquement'],
      correct: 1,
      explain: 'Connexion live au flux sismique — sinon mode dégradé ou cache local.',
    },
    {
      q: 'Pourquoi filtrer par « Zone Haïti » ?',
      options: ['Décoration', 'Prioriser l\'activité près d\'Haïti et Hispaniola', 'Masquer les tsunamis'],
      correct: 1,
      explain: 'Focus pédagogique et opérationnel sur la région nationale.',
    },
    {
      q: 'Un séisme M6 proche d\'Haïti affiché ici, que faire en premier ?',
      options: ['Ignorer', 'Vérifier sur la carte et rappeler les gestes BPK', 'Évacuer sans information'],
      correct: 1,
      explain: 'Carte pour localiser + Prévention pour les gestes immédiats.',
    },
    {
      q: 'Ce module remplace-t-il les alertes officielles d\'évacuation ?',
      options: ['Oui', 'Non — outil de surveillance éducative', 'Seulement pour les écoles'],
      correct: 1,
      explain: 'Suivez autorités haïtiennes, radio et consignes officielles pour évacuation.',
    },
  ],
  kr: [
    {
      q: 'Ki sous ki nourri sant veyans la ?',
      options: ['NASA sèlman', 'USGS ak EMSC', 'Meteo France'],
      correct: 1,
      explain: 'USGS (mondyal) ak EMSC (rejyon) fusione pou flux SisAyiti.',
    },
    {
      q: 'Badj « Sistèm konekte » vle di…',
      options: ['Done fige', 'Flux tan reyèl aktif', 'Sèlman offline'],
      correct: 1,
      explain: 'Koneksyon live — sinon mòd degrade oswa cache lokal.',
    },
    {
      q: 'Poukisa filtre pa « Zòn Ayiti » ?',
      options: ['Dekorasyon', 'Priyorize aktivite pre Ayiti', 'Kache tsunami'],
      correct: 1,
      explain: 'Konsantre sou rejyon nasyonal la.',
    },
    {
      q: 'Tranblemanntè M6 pre Ayiti, ki premye aksyon ?',
      options: ['Ignore', 'Verifye sou kat + raple jès BPK', 'Evakye san enfòmasyon'],
      correct: 1,
      explain: 'Kat pou lokalize + Prevansyon pou jès imedyat.',
    },
    {
      q: 'Modil sa a ranplase alèt evakyasyon ofisyèl ?',
      options: ['Wi', 'Non — zouti veyans edikatif', 'Sèlman lekòl'],
      correct: 1,
      explain: 'Swiv otorite ayisyen ak radyo pou evakyasyon.',
    },
  ],
  en: [
    {
      q: 'Which sources feed the monitoring center?',
      options: ['NASA only', 'USGS and EMSC', 'Météo France'],
      correct: 1,
      explain: 'USGS (global) and EMSC (regional) are merged for the SisAyiti feed.',
    },
    {
      q: '« System connected » badge means…',
      options: ['Frozen data', 'Active real-time stream', 'Offline only'],
      correct: 1,
      explain: 'Live connection to seismic stream — else degraded mode or local cache.',
    },
    {
      q: 'Why filter by « Haiti zone »?',
      options: ['Decoration', 'Prioritize activity near Haiti and Hispaniola', 'Hide tsunamis'],
      correct: 1,
      explain: 'Educational and operational focus on the national region.',
    },
    {
      q: 'M6 quake near Haiti shown here — first action?',
      options: ['Ignore', 'Check on map and recall BPK gestures', 'Evacuate without info'],
      correct: 1,
      explain: 'Map to locate + Prevention for immediate actions.',
    },
    {
      q: 'Does this module replace official evacuation alerts?',
      options: ['Yes', 'No — educational monitoring tool', 'Only for schools'],
      correct: 1,
      explain: 'Follow Haitian authorities, radio and official orders for evacuation.',
    },
  ],
  es: [
    {
      q: '¿Qué fuentes alimentan el centro de vigilancia?',
      options: ['Solo NASA', 'USGS y EMSC', 'Météo France'],
      correct: 1,
      explain: 'USGS (global) y EMSC (regional) se fusionan para el flujo SisAyiti.',
    },
    {
      q: 'La insignia « Sistema conectado » significa…',
      options: ['Datos congelados', 'Flujo en tiempo real activo', 'Solo sin conexión'],
      correct: 1,
      explain: 'Conexión en vivo — si no, modo degradado o caché local.',
    },
    {
      q: '¿Por qué filtrar por « Zona Haití »?',
      options: ['Decoración', 'Priorizar actividad cerca de Haití', 'Ocultar tsunamis'],
      correct: 1,
      explain: 'Enfoque educativo y operacional en la región nacional.',
    },
    {
      q: 'Sismo M6 cerca de Haití — ¿primera acción?',
      options: ['Ignorar', 'Verificar en mapa y recordar gestos BPK', 'Evacuar sin información'],
      correct: 1,
      explain: 'Mapa para localizar + Prevención para gestos inmediatos.',
    },
    {
      q: '¿Este módulo reemplaza alertas oficiales de evacuación?',
      options: ['Sí', 'No — herramienta de vigilancia educativa', 'Solo escuelas'],
      correct: 1,
      explain: 'Siga autoridades haitianas y radio para evacuación.',
    },
  ],
}

export type HomeQuizLang = 'fr' | 'kr' | 'en' | 'es'

export type HomeQuizQuestion = {
  q: string
  options: string[]
  correct: number
  explain?: string
}

export const homeQuiz: Record<HomeQuizLang, HomeQuizQuestion[]> = {
  fr: [
    {
      q: 'Que signifie « Konprann » dans SisAyiti ?',
      options: ['Simuler un séisme', 'Comprendre la science sismique', 'Évacuer'],
      correct: 1,
      explain: 'Premier pilier : module Comprendre (failles, ondes, contexte Haïti).',
    },
    {
      q: 'Quels modules correspondent à « Simile » ?',
      options: ['Carte et Actualité', 'Labo et Ville', 'Prévention seule'],
      correct: 1,
      explain: 'Laboratoire (physique) et Ville (construction parasismique).',
    },
    {
      q: 'Dans quel ordre recommande le parcours guidé ?',
      options: ['Prepare → Konprann → Simile', 'Konprann → Simile → Siveye → Prepare', 'Carte en premier'],
      correct: 1,
      explain: 'Comprendre, simuler, surveiller, puis se préparer.',
    },
    {
      q: 'SisAyiti remplace-t-il les alertes officielles d\'évacuation ?',
      options: ['Oui', 'Non — plateforme éducative', 'Uniquement pour les écoles'],
      correct: 1,
      explain: 'Surveillance et éducation — suivez autorités haïtiennes pour évacuation.',
    },
    {
      q: 'Combien de modules interactifs propose la plateforme ?',
      options: ['4', '8', '12'],
      correct: 1,
      explain: 'Actualité, Comprendre, Labo, Ville, Carte, Prévention, Multirisques, Diagnostic.',
    },
  ],
  kr: [
    {
      q: '« Konprann » vle di sa nan SisAyiti ?',
      options: ['Simile tranblemanntè', 'Konprann syans tranblemanntè', 'Evakye'],
      correct: 1,
      explain: 'Premye poto : modil Konprann (fail, vag, kontèks Ayiti).',
    },
    {
      q: 'Ki modil ki koresponn ak « Simile » ?',
      options: ['Kat ak Aktualite', 'Labo ak Vil', 'Prevansyon sèlman'],
      correct: 1,
      explain: 'Laboratwa (fizik) ak Vil (konstriksyon parasismik).',
    },
    {
      q: 'Ki lòd pèkòs gide a rekòmande ?',
      options: ['Prepare → Konprann → Simile', 'Konprann → Simile → Siveye → Prepare', 'Kat an premye'],
      correct: 1,
      explain: 'Konprann, simile, siveye, epi prepare.',
    },
    {
      q: 'SisAyiti ranplase alèt evakyasyon ofisyèl ?',
      options: ['Wi', 'Non — platfòm edikatif', 'Sèlman lekòl'],
      correct: 1,
      explain: 'Veyans ak edikasyon — swiv otorite ayisyen pou evakyasyon.',
    },
    {
      q: 'Konbyen modil entèaktif platfòm nan ofri ?',
      options: ['4', '8', '12'],
      correct: 1,
      explain: 'Aktualite, Konprann, Labo, Vil, Kat, Prevansyon, Milti-risk, Dyagnostik.',
    },
  ],
  en: [
    {
      q: 'What does « Konprann » mean in SisAyiti?',
      options: ['Simulate an earthquake', 'Understand seismic science', 'Evacuate'],
      correct: 1,
      explain: 'First pillar: Understand module (faults, waves, Haiti context).',
    },
    {
      q: 'Which modules match « Simile »?',
      options: ['Map and News', 'Lab and City', 'Prevention only'],
      correct: 1,
      explain: 'Physics lab and seismic city building game.',
    },
    {
      q: 'What order does the guided path recommend?',
      options: ['Prepare → Understand → Simulate', 'Understand → Simulate → Monitor → Prepare', 'Map first'],
      correct: 1,
      explain: 'Understand, simulate, monitor, then prepare.',
    },
    {
      q: 'Does SisAyiti replace official evacuation alerts?',
      options: ['Yes', 'No — educational platform', 'Schools only'],
      correct: 1,
      explain: 'Monitoring and education — follow Haitian authorities for evacuation.',
    },
    {
      q: 'How many interactive modules does the platform offer?',
      options: ['4', '8', '12'],
      correct: 1,
      explain: 'News, Understand, Lab, City, Map, Prevention, Multi-risk, Diagnostic.',
    },
  ],
  es: [
    {
      q: '¿Qué significa « Konprann » en SisAyiti?',
      options: ['Simular un sismo', 'Comprender la ciencia sísmica', 'Evacuar'],
      correct: 1,
      explain: 'Primer pilar: módulo Comprender (fallas, ondas, contexto Haití).',
    },
    {
      q: '¿Qué módulos corresponden a « Simile »?',
      options: ['Mapa y Actualidad', 'Lab y Ciudad', 'Solo Prevención'],
      correct: 1,
      explain: 'Laboratorio (física) y Ciudad (construcción parasísmica).',
    },
    {
      q: '¿Qué orden recomienda el recorrido guiado?',
      options: ['Prepare → Comprender → Simular', 'Comprender → Simular → Vigilar → Prepararse', 'Mapa primero'],
      correct: 1,
      explain: 'Comprender, simular, vigilar, luego prepararse.',
    },
    {
      q: '¿SisAyiti reemplaza alertas oficiales de evacuación?',
      options: ['Sí', 'No — plataforma educativa', 'Solo escuelas'],
      correct: 1,
      explain: 'Vigilancia y educación — siga autoridades haitianas para evacuación.',
    },
    {
      q: '¿Cuántos módulos interactivos ofrece la plataforma?',
      options: ['4', '8', '12'],
      correct: 1,
      explain: 'Actualidad, Comprender, Lab, Ciudad, Mapa, Prevención, Multirriesgo, Diagnóstico.',
    },
  ],
}

export type QuizLang = "fr" | "kr" | "en" | "es"

export type QuizQuestion = {
  q: string
  options: string[]
  correct: number
  explain?: string
}

export type SectionQuiz = Record<QuizLang, QuizQuestion[]>

/** Quiz par chapitre Comprendre (0–6) — ordre priorité citoyen haïtien */
export const comprendreQuizzes: SectionQuiz[] = [
  // Ch.0 — Pourquoi Haïti tremble
  {
    fr: [
      { q: "Haïti est surtout menacée par des failles de type…", options: ["Subduction verticale", "Décrochement horizontal", "Volcanisme"], correct: 1, explain: "Les blocs glissent horizontalement le long de l'EPGF et de la Septentrionale." },
      { q: "Combien de grands systèmes de failles majeurs traversent Haïti ?", options: ["Un seul (sud)", "Deux (nord et sud)", "Aucun"], correct: 1, explain: "EPGF au sud et Faille Septentrionale au nord." },
      { q: "Peut-on prédire la date exacte du prochain séisme ?", options: ["Oui, avec précision", "Non, seulement des zones à risque", "Oui, chaque 100 ans"], correct: 1, explain: "On connaît l'aléa, pas l'instant précis de rupture." },
    ],
    kr: [
      { q: "Ayiti sitou anba menas fay ki…", options: ["Subduksyon vètikal", "Dekouman orizontal", "Volkan"], correct: 1, explain: "Blòk yo glise sou kote sou EPGF ak Septantriyonal." },
      { q: "Konbyen gwo sistèm fay ki travèse Ayiti ?", options: ["Yon sèl (sid)", "De (nò ak sid)", "Okenn"], correct: 1, explain: "EPGF nan sid ak Fay Septantriyonal nan nò." },
      { q: "Èske nou ka predi jou egzak pwochen tranblemanntè a ?", options: ["Wi, presi", "Non, sèlman zòn danje", "Wi, chak 100 an"], correct: 1, explain: "Nou konnen gen danje, pa lè egzak la." },
    ],
    en: [
      { q: "Haiti is mainly threatened by… faults", options: ["Vertical subduction", "Horizontal strike-slip", "Volcanism"], correct: 1, explain: "Blocks slide horizontally along EPGF and Septentrional." },
      { q: "How many major fault systems cross Haiti?", options: ["One (south)", "Two (north and south)", "None"], correct: 1, explain: "EPGF in the south and Septentrional in the north." },
      { q: "Can we predict the exact date of the next earthquake?", options: ["Yes, precisely", "No, only hazard zones", "Yes, every 100 years"], correct: 1, explain: "We know hazard, not the exact rupture instant." },
    ],
    es: [
      { q: "Haití está amenazada principalmente por fallas de…", options: ["Subducción vertical", "Desplazamiento horizontal", "Volcanismo"], correct: 1, explain: "Los bloques se deslizan horizontalmente en EPGF y Septentrional." },
      { q: "¿Cuántos grandes sistemas de fallas cruzan Haití?", options: ["Uno (sur)", "Dos (norte y sur)", "Ninguno"], correct: 1, explain: "EPGF al sur y Septentrional al norte." },
      { q: "¿Se puede predecir la fecha exacta del próximo sismo?", options: ["Sí, con precisión", "No, solo zonas de riesgo", "Sí, cada 100 años"], correct: 1, explain: "Conocemos el peligro, no el instante exacto." },
    ],
  },
  // Ch.1 — Histoire
  {
    fr: [
      { q: "Le séisme de 1842 a surtout démontré…", options: ["Risque mineur", "Tsunami post-sismique", "Un séisme par siècle"], correct: 1, explain: "Cap-Haïtien : séisme + tsunami sur la côte nord." },
      { q: "Haïti 2010 (Mw 7,0) : la catastrophe vient surtout de…", options: ["Surprise totale", "Vulnérabilité extrême du bâti", "Épicentre sous PAP"], correct: 1, explain: "L'aléa était connu ; les bâtiments non parasismiques ont causé l'essentiel des morts." },
      { q: "2021 (Mw 7,2) était plus fort que 2010 mais…", options: ["Moins meurtrier (moins urbain)", "Autant de morts", "Sans dégâts"], correct: 0, explain: "Mw plus grand ≠ toujours plus de victimes : densité et qualité du bâti comptent." },
    ],
    kr: [
      { q: "Tranblemanntè 1842 montre sitou…", options: ["Ti danje", "Tsunami apre chòk", "Yon fwa pa syèk"], correct: 1, explain: "Kap Ayisyen : tranblemanntè + tsunami sou kòt nò." },
      { q: "Ayiti 2010 : katastwòf la soti sitou nan…", options: ["Sipriz total", "Bilding ki twò fèb", "Episant anba Pòtoprens"], correct: 1, explain: "Yo te konnen gen danje ; bilding ki pa reziste te fè plis lanmò." },
      { q: "2021 pi fò pase 2010 men…", options: ["Mwens moun mouri", "Menm kantite lanmò", "Pa gen domaj"], correct: 0, explain: "Pi gwo Mw pa toujou plis moun mouri." },
    ],
    en: [
      { q: "The 1842 earthquake mainly showed…", options: ["Minor risk", "Post-earthquake tsunami", "One quake per century"], correct: 1, explain: "Cap-Haïtien: earthquake + tsunami on the north coast." },
      { q: "Haiti 2010: catastrophe came mainly from…", options: ["Total surprise", "Extreme building vulnerability", "Epicenter under PAP"], correct: 1, explain: "Hazard was known; non-seismic buildings caused most deaths." },
      { q: "2021 (Mw 7.2) was stronger than 2010 but…", options: ["Less deadly (less urban)", "Same deaths", "No damage"], correct: 0, explain: "Higher Mw ≠ always more deaths." },
    ],
    es: [
      { q: "El sismo de 1842 demostró sobre todo…", options: ["Riesgo menor", "Tsunami post-sísmico", "Un sismo por siglo"], correct: 1, explain: "Cap-Haitiano: sismo + tsunami en la costa norte." },
      { q: "Haití 2010: la catástrofe vino sobre todo de…", options: ["Sorpresa total", "Vulnerabilidad extrema del hábitat", "Epicentro bajo PAP"], correct: 1, explain: "El peligro era conocido; edificios no antisísmicos causaron la mayoría de muertes." },
      { q: "2021 (Mw 7,2) fue más fuerte que 2010 pero…", options: ["Menos mortífero (menos urbano)", "Igual de muertes", "Sin daños"], correct: 0, explain: "Mayor Mw ≠ siempre más muertes." },
    ],
  },
  // Ch.2 — Magnitude / intensité
  {
    fr: [
      { q: "La magnitude Mw mesure…", options: ["Les dégâts chez vous", "L'énergie à la source", "La durée des secousses"], correct: 1, explain: "Mw = taille de la rupture ; l'intensité EMS = effet local." },
      { q: "Même magnitude, sol meuble vs roche :", options: ["Même secousse", "Sol meuble amplifie", "Roche amplifie toujours"], correct: 1, explain: "Port, remblais et argile augmentent l'amplitude (2010 à PAP)." },
      { q: "L'hypocentre est…", options: ["À la surface", "Le point de rupture en profondeur", "Le tsunami"], correct: 1, explain: "L'épicentre est la projection à la surface." },
    ],
    kr: [
      { q: "Magnitid Mw mezire…", options: ["Domaj lakay ou", "Enèji nan sous la", "Tan sekou a"], correct: 1, explain: "Mw = gwosè kase a ; EMS = efè lokal." },
      { q: "Menm magnitid, tè meb vs wòch :", options: ["Menm sekou", "Tè meb anplifye", "Wòch toujou anplifye"], correct: 1, explain: "Pò ak ranblayi ogmante sekou (2010 Pòtoprens)." },
      { q: "Iposant se…", options: ["Sou sifas", "Pwen kase anba tè", "Tsunami"], correct: 1, explain: "Episant se pwojeksyon sou sifas." },
    ],
    en: [
      { q: "Magnitude Mw measures…", options: ["Damage at your home", "Energy at the source", "Shaking duration"], correct: 1, explain: "Mw = rupture size; EMS intensity = local effect." },
      { q: "Same magnitude, soft soil vs rock:", options: ["Same shaking", "Soft soil amplifies", "Rock always amplifies"], correct: 1, explain: "Ports and fill increase amplitude (2010 in PAP)." },
      { q: "The hypocenter is…", options: ["At the surface", "The rupture point at depth", "The tsunami"], correct: 1, explain: "The epicenter is the surface projection." },
    ],
    es: [
      { q: "La magnitud Mw mide…", options: ["Daños en su casa", "Energía en la fuente", "Duración de la sacudida"], correct: 1, explain: "Mw = tamaño de la ruptura; intensidad EMS = efecto local." },
      { q: "Misma magnitud, suelo blando vs roca:", options: ["Igual sacudida", "Suelo blando amplifica", "Roca siempre amplifica"], correct: 1, explain: "Puertos y rellenos aumentan la amplitud (2010 en PAP)." },
      { q: "El hipocentro es…", options: ["En la superficie", "El punto de ruptura en profundidad", "El tsunami"], correct: 1, explain: "El epicentro es la proyección en la superficie." },
    ],
  },
  // Ch.3 — Ondes P/S
  {
    fr: [
      { q: "Les ondes P arrivent en premier car elles sont…", options: ["Longitudinales (compression)", "Transversales", "Des ondes de surface"], correct: 0, explain: "P ~6 km/s en croûte ; S ~3,4 km/s — intervalle = secondes pour Bese." },
      { q: "Les ondes S ne traversent pas…", options: ["La croûte", "Les liquides (noyau externe)", "L'air"], correct: 1, explain: "Absence de rigidité dans les liquides." },
      { q: "Que faire dès les premières secousses ?", options: ["Sortir en courant", "Bese, Pwoteje, Kenbe", "Regarder par la fenêtre"], correct: 1, explain: "Ne pas attendre les secousses fortes." },
    ],
    kr: [
      { q: "Vag P rive an premye paske yo…", options: ["Longitudinèl", "Transvès", "Sou sifas"], correct: 0, explain: "P pi rapid → kèk segonn pou Bese anvan S." },
      { q: "Vag S pa travèse…", options: ["Kwòt la", "Likid (nwayo ekstèn)", "Lè a"], correct: 1, explain: "Likid pa gen rigidite." },
      { q: "Kisa pou fè depi premye sekou ?", options: ["Kouri deyò", "Bese, Pwoteje, Kenbe", "Gade fenèt"], correct: 1, explain: "Pa tann sekou fò yo." },
    ],
    en: [
      { q: "P-waves arrive first because they are…", options: ["Longitudinal (compression)", "Transverse", "Surface waves"], correct: 0, explain: "P faster → seconds to Drop before strong S." },
      { q: "S-waves do not pass through…", options: ["Crust", "Liquids (outer core)", "Air"], correct: 1, explain: "Liquids lack rigidity." },
      { q: "What to do at the first shaking?", options: ["Run outside", "Drop, Cover, Hold", "Look out window"], correct: 1, explain: "Don't wait for violent shaking." },
    ],
    es: [
      { q: "Las ondas P llegan primero porque son…", options: ["Longitudinales", "Transversales", "Superficiales"], correct: 0, explain: "P más rápidas → segundos para agacharse antes de S." },
      { q: "Las ondas S no atraviesan…", options: ["La corteza", "Líquidos (núcleo externo)", "El aire"], correct: 1, explain: "Los líquidos carecen de rigidez." },
      { q: "¿Qué hacer al primer temblor?", options: ["Salir corriendo", "Agacharse, cubrirse, agarrarse", "Mirar la ventana"], correct: 1, explain: "No espere la sacudida fuerte." },
    ],
  },
  // Ch.4 — Sol
  {
    fr: [
      { q: "La liquéfaction se produit quand…", options: ["Le sol est sec", "Sol saturé + secousse", "Il n'y a pas d'eau"], correct: 1, explain: "Eau dans les pores → sol devient fluide (port 2010)." },
      { q: "En 2010, dégâts très inégaux à PAP surtout à cause…", options: ["De la magnitude seule", "Du sol et du bâti", "De l'heure uniquement"], correct: 1, explain: "Même Mw, quartiers meubles vs rocheux." },
      { q: "Avant de construire, il faut…", options: ["Ignorer le terrain", "Étudier le sol / consulter ingénieur", "Toujours choisir le port"], correct: 1, explain: "Microzonage et étude de parcelle." },
    ],
    kr: [
      { q: "Likefaksyon rive lè…", options: ["Tè sèk", "Tè satire + sekou", "Pa gen dlo"], correct: 1, explain: "Dlo nan tè → tè vin likid (pò 2010)." },
      { q: "An 2010 domaj pa menm nan Pòtoprens paske…", options: ["Magnitid sèlman", "Tè ak bilding", "Lè sèlman"], correct: 1, explain: "Menm Mw, katye meb vs wòch." },
      { q: "Anvan ou bati, ou dwe…", options: ["Inyore tè a", "Etidye tè / pale ak enjenyè", "Toujou bati sou pò"], correct: 1, explain: "Etid tè ak mikwozonaj." },
    ],
    en: [
      { q: "Liquefaction happens when…", options: ["Soil is dry", "Saturated soil + shaking", "No water"], correct: 1, explain: "Pore water → soil flows (2010 port)." },
      { q: "In 2010, uneven damage in PAP was mainly due to…", options: ["Magnitude only", "Soil and buildings", "Time only"], correct: 1, explain: "Same Mw, soft vs rocky neighborhoods." },
      { q: "Before building, you should…", options: ["Ignore terrain", "Study soil / consult engineer", "Always build on port"], correct: 1, explain: "Site study and microzonation." },
    ],
    es: [
      { q: "La licuefacción ocurre cuando…", options: ["Suelo seco", "Suelo saturado + sacudida", "Sin agua"], correct: 1, explain: "Agua en poros → suelo fluido (puerto 2010)." },
      { q: "En 2010, daños desiguales en PAP se debieron sobre todo a…", options: ["Solo magnitud", "Suelo y edificios", "Solo hora"], correct: 1, explain: "Misma Mw, barrios blandos vs rocosos." },
      { q: "Antes de construir, debe…", options: ["Ignorar terreno", "Estudiar suelo / consultar ingeniero", "Siempre en puerto"], correct: 1, explain: "Estudio de suelo y microzonificación." },
    ],
  },
  // Ch.5 — Répliques
  {
    fr: [
      { q: "Les répliques sont…", options: ["Des séismes avant le principal", "Des séismes après le principal", "Des tsunamis"], correct: 1, explain: "Réajustement des contraintes ; fréquence décroît avec le temps." },
      { q: "Après 2010, Port-au-Prince a eu…", options: ["Aucune secousse", "Des dizaines de répliques M≥5", "Un seul petit choc"], correct: 1, explain: "Dont M5,9 le 20 janvier — bâtiments fissurés en danger." },
      { q: "Après un fort séisme côtier (1842), il faut…", options: ["Descendre à la plage", "Monter en hauteur (tsunami)", "Rester dans la maison fissurée"], correct: 1, explain: "Ne pas attendre l'alerte officielle." },
    ],
    kr: [
      { q: "Replik se…", options: ["Avan gwo a", "Apre gwo a", "Tsunami"], correct: 1, explain: "Tè ap regle tansyon ; yo vin pi ra." },
      { q: "Apre 2010, Pòtoprens te gen…", options: ["Okenn sekou", "Dizèn replik M≥5", "Yon ti chòk"], correct: 1, explain: "M5,9 20 janvye — bilding fann an danje." },
      { q: "Apre gwo tranblemanntè sou kòt (1842)…", options: ["Ale sou plaj", "Moute wo (tsunami)", "Rete nan kay fann"], correct: 1, explain: "Pa tann alèt ofisyèl." },
    ],
    en: [
      { q: "Aftershocks are…", options: ["Quakes before the main shock", "Quakes after the main shock", "Tsunamis"], correct: 1, explain: "Stress adjustment; frequency decays over time." },
      { q: "After 2010, Port-au-Prince had…", options: ["No more shaking", "Dozens of M≥5 aftershocks", "One small shock"], correct: 1, explain: "Including M5.9 Jan 20 — cracked buildings at risk." },
      { q: "After a strong coastal quake (1842), you should…", options: ["Go to the beach", "Move uphill (tsunami)", "Stay in cracked house"], correct: 1, explain: "Don't wait for official alert." },
    ],
    es: [
      { q: "Las réplicas son…", options: ["Antes del principal", "Después del principal", "Tsunamis"], correct: 1, explain: "Reajuste de tensiones; frecuencia decrece." },
      { q: "Tras 2010, Puerto Príncipe tuvo…", options: ["Sin más sacudidas", "Decenas de réplicas M≥5", "Un choque pequeño"], correct: 1, explain: "Incluida M5,9 el 20 de enero." },
      { q: "Tras sismo costero fuerte (1842)…", options: ["Ir a la playa", "Subir a terreno alto (tsunami)", "Quedarse en casa agrietada"], correct: 1, explain: "No espere alerta oficial." },
    ],
  },
  // Ch.6 — Approfondir
  {
    fr: [
      { q: "La micro-plaque de la Gonâve est coincée entre…", options: ["Pacifique et Indo-Australienne", "Nord-Américaine et Caribéenne", "Africaine et Eurasienne"], correct: 1, explain: "Contexte tectonique régional des Caraïbes." },
      { q: "Le noyau externe est liquide car…", options: ["On l'a vu", "Les ondes S ne le traversent pas", "Le magnetisme seul"], correct: 1, explain: "Sismologie globale." },
      { q: "La maçonnerie chaînée consiste à…", options: ["Pierre seule", "Encadrer blocs avec béton armé", "Blocs libres"], correct: 1, explain: "Norme clé pour Haïti — ductilité et liaison." },
    ],
    kr: [
      { q: "Mikwo-plak Gonav chita ant…", options: ["Pasifik ak Endo-Ostralyen", "Nò-Ameriken ak Karayib", "Afrik ak Ewòp-Azi"], correct: 1, explain: "Kontèks tektonik Karayib." },
      { q: "Nwayo ekstèn likid paske…", options: ["Nou wè l", "Vag S pa pase ladan l", "Mayetis sèlman"], correct: 1, explain: "Sismoloji global." },
      { q: "Masonri mare vle di…", options: ["Sèlman wòch", "Mare blòk ak beton arme", "Blòk lib"], correct: 1, explain: "Nòm enpòtan pou Ayiti." },
    ],
    en: [
      { q: "The Gonâve microplate is between…", options: ["Pacific and Indo-Australian", "North American and Caribbean", "African and Eurasian"], correct: 1, explain: "Regional Caribbean tectonic context." },
      { q: "The outer core is liquid because…", options: ["We saw it", "S-waves cannot pass through", "Magnetism alone"], correct: 1, explain: "Global seismology." },
      { q: "Confined masonry means…", options: ["Stone only", "Frame blocks with reinforced concrete", "Free blocks"], correct: 1, explain: "Key standard for Haiti." },
    ],
    es: [
      { q: "La microplaca de Gonâve está entre…", options: ["Pacífico e Indo-Australiana", "Norteamericana y Caribeña", "Africana y Euroasiática"], correct: 1, explain: "Contexto tectónico del Caribe." },
      { q: "El núcleo externo es líquido porque…", options: ["Lo vimos", "Las ondas S no lo atraviesan", "Solo magnetismo"], correct: 1, explain: "Sismología global." },
      { q: "Mampostería confinada consiste en…", options: ["Solo piedra", "Encuadrar bloques con concreto armado", "Bloques libres"], correct: 1, explain: "Norma clave para Haití." },
    ],
  },
] as SectionQuiz[]

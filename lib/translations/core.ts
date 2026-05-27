import type { Lang } from "@/lib/i18n"

export type TranslationKey = keyof typeof translations
export type TranslationRecord = Record<TranslationKey, Record<Lang, string>>

export const translations = {
  // ═══════════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════════
  "nav.accueil": {
    fr: "Accueil",
    kr: "Akèy",
    en: "Home",
    es: "Inicio",
  },
  "nav.actualite": {
    fr: "Centre de Surveillance",
    kr: "Sant Siveyans",
    en: "Monitoring Center",
    es: "Centro de Vigilancia",
  },
  "nav.comprendre": {
    fr: "Comprendre les séismes",
    kr: "Konprann tranblemanntè",
    en: "Understanding earthquakes",
    es: "Comprender los sismos",
  },
  "nav.labo": {
    fr: "Laboratoire de simulation",
    kr: "Laboratwa similasyon",
    en: "Simulation laboratory",
    es: "Laboratorio de simulación",
  },
  "nav.ville": {
    fr: "Construis une ville",
    kr: "Bati yon vil",
    en: "Build a city",
    es: "Construye una ciudad",
  },
  "nav.carte": {
    fr: "Carte sismique d'Haïti",
    kr: "Kat tranblemanntè Ayiti",
    en: "Haiti seismic map",
    es: "Mapa sísmico de Haití",
  },
  "nav.prevention": {
    fr: "Prévention citoyenne",
    kr: "Prevansyon sitwayen",
    en: "Citizen preparedness",
    es: "Prevención ciudadana",
  },
  "nav.multirisques": {
    fr: "Multirisques ruraux",
    kr: "Plizyè risk nan peyi",
    en: "Rural multi-hazard",
    es: "Multirriesgo rural",
  },
  "nav.diagnostic": {
    fr: "Diagnostic bâtiment",
    kr: "Dyagnostik bilding",
    en: "Building assessment",
    es: "Diagnóstico de edificios",
  },

  // ═══════════════════════════════════════════════════════════════
  // HOME PAGE
  // ═══════════════════════════════════════════════════════════════
  "home.subtitle": {
    fr: "Comprendre · Simuler · Se préparer",
    kr: "Konprann · Simile · Prepare",
    en: "Understand · Simulate · Prepare",
    es: "Comprender · Simular · Prepararse",
  },
  "home.explore": {
    fr: "Explorer les modules",
    kr: "Eksplore modil yo",
    en: "Explore the modules",
    es: "Explorar los módulos",
  },
  "home.about": {
    fr: "À propos",
    kr: "Sou platfòm nan",
    en: "About",
    es: "Acerca de",
  },
  "home.systemActive": {
    fr: "Système actif",
    kr: "Sistèm aktif",
    en: "System active",
    es: "Sistema activo",
  },
  "home.modulesTitle": {
    fr: "Modules interactifs",
    kr: "Modil entèaktif yo",
    en: "Interactive modules",
    es: "Módulos interactivos",
  },
  "home.badge": {
    fr: "Plateforme scientifique · Ayiti",
    kr: "Platfòm syantifik · Ayiti",
    en: "Scientific platform · Haiti",
    es: "Plataforma científica · Haití",
  },
  "ville.titleDetail": {
    fr: "Stratégie urbaine parasismique : analysez les sols, choisissez les bons matériaux et gérez votre budget pour construire une ville résiliente.",
    kr: "Estrateji ibèn ki reziste tranblemanntè: analize tè yo, chwazi bon materyèl epi jere bidjè ou pou bati yon vil ki solid.",
    en: "Seismic urban strategy: analyze soils, choose the right materials, and manage your budget to build a resilient city.",
    es: "Estrategia urbana antisísmica: analice suelos, elija materiales adecuados y gestione su presupuesto para construir una ciudad resiliente.",
  },
  "notify.earthquake": {
    fr: "Séisme",
    kr: "Tranblemanntè",
    en: "Earthquake",
    es: "Sismo",
  },
  "notify.newEvent": {
    fr: "Nouvel événement détecté",
    kr: "Nouvo evènman detekte",
    en: "New event detected",
    es: "Nuevo evento detectado",
  },

  // ═══════════════════════════════════════════════════════════════
  // COMMON BUTTONS & UI
  // ═══════════════════════════════════════════════════════════════
  "common.verifConnaissances": {
    fr: "Vérifier mes connaissances",
    kr: "Verifye konesans mwen",
    en: "Check my knowledge",
    es: "Comprobar mis conocimientos",
  },
  "common.back": {
    fr: "Retour",
    kr: "Retounen",
    en: "Back",
    es: "Volver",
  },
  "common.next": {
    fr: "Suivant",
    kr: "Pwochen",
    en: "Next",
    es: "Siguiente",
  },
  "common.simulate": {
    fr: "Simuler",
    kr: "Simile",
    en: "Simulate",
    es: "Simular",
  },
  "common.close": {
    fr: "Fermer",
    kr: "Fèmen",
    en: "Close",
    es: "Cerrar",
  },
  "common.score": {
    fr: "Score",
    kr: "Pwen",
    en: "Score",
    es: "Puntuación",
  },

  // ═══════════════════════════════════════════════════════════════
  // MODULE DESCRIPTIONS
  // ═══════════════════════════════════════════════════════════════
  "m0.desc": {
    fr: "Surveillance en temps réel, alertes et analyses géospatiales",
    kr: "Siveyans an tan reyèl, alèt ak analiz jewospasyal",
    en: "Real-time monitoring, alerts, and geospatial analysis",
    es: "Vigilancia en tiempo real, alertas y análisis geoespacial",
  },
  "m1.desc": {
    fr: "Micro-plaque de la Gonâve, ondes P/S/Love/Rayleigh, structure interne",
    kr: "Mikwo-plak Gonav, vag P/S/Love/Rayleigh, estrikti entèn",
    en: "Gonâve microplate, P/S/Love/Rayleigh waves, internal structure",
    es: "Microplaca de Gonâve, ondas P/S/Love/Rayleigh, estructura interna",
  },
  "m2.desc": {
    fr: "Simulez l'impact d'un séisme sur différents types de bâtiments",
    kr: "Simile enpak yon tranblemanntè sou diferan kalite bilding",
    en: "Simulate earthquake impact on different building types",
    es: "Simule el impacto de un sismo en distintos tipos de edificios",
  },
  "m3.desc": {
    fr: "Construisez parasismiquement : maçonnerie chaînée, sols stables",
    kr: "Bati ak pwoteksyon sismik: masonri mare, tè solid",
    en: "Build seismically: confined masonry, stable soils",
    es: "Construya con protección sísmica: mampostería confinada, suelos estables",
  },
  "m4.desc": {
    fr: "Faille EPGF : 1751, 1842, 2010, 2021 — chronologie et leçons",
    kr: "Fay EPGF: 1751, 1842, 2010, 2021 — istwa ak leson",
    en: "EPGF fault: 1751, 1842, 2010, 2021 — timeline and lessons",
    es: "Falla EPGF: 1751, 1842, 2010, 2021 — cronología y lecciones",
  },
  "m5.desc": {
    fr: "Bese, Pwoteje, Kenbe — survie et gestes essentiels",
    kr: "Bese, Pwoteje, Kenbe — siviv ak jès esansyèl",
    en: "Drop, Cover, Hold — survival and essential actions",
    es: "Agáchate, Cúbrete, Agárrate — supervivencia y gestos esenciales",
  },
  "m6.desc": {
    fr: "Liquéfaction, glissements, tsunamis, murs de clôture",
    kr: "Likifaksyon, glisman tè, tsunami, mi kloti",
    en: "Liquefaction, landslides, tsunamis, boundary walls",
    es: "Licuefacción, deslizamientos, tsunamis, muros perimetrales",
  },
  "m7.desc": {
    fr: "Diagnostic : sable salé, fers lisses, béton artisanal fragile",
    kr: "Dyagnostik: sab sale, fè lis, beton atizanal ki fèb",
    en: "Assessment: salty sand, smooth rebar, fragile artisanal concrete",
    es: "Diagnóstico: arena salada, varillas lisas, concreto artesanal frágil",
  },

  // ═══════════════════════════════════════════════════════════════
  // SECTION 1 : COMPRENDRE LES SÉISMES
  // ═══════════════════════════════════════════════════════════════
  "comp.tecto.title": {
    fr: "Tectonique des plaques à Haïti",
    kr: "Tektonik plak nan Ayiti",
    en: "Plate tectonics in Haiti",
    es: "Tectónica de placas en Haití",
  },
  "comp.tecto.gonave": {
    fr: "La micro-plaque de la Gonâve",
    kr: "Mikwo-plak Gonav la",
    en: "The Gonâve microplate",
    es: "La microplaca de Gonâve",
  },
  "comp.tecto.desc": {
    fr: "Haïti se situe à l'intersection d'une zone de cisaillement entre la plaque nord-américaine et la plaque caribéenne. Contrairement aux zones de subduction qui créent des séismes profonds, Haïti est striée de failles décrochantes où les blocs coulissent horizontalement.",
    kr: "Ayiti chita nan yon zòn kote plak Nò-Ameriken ak plak Karayib yo ap chire youn ak lòt. Olye pou gen subduksyon ki bay tranblemanntè pwofon, peyi a gen anpil fay dekouman kote blòk tè yo ap glise sou kote.",
    en: "Haiti lies at a strike-slip boundary between the North American and Caribbean plates. Unlike subduction zones that produce deep earthquakes, Haiti is crossed by strike-slip faults where crustal blocks slide horizontally.",
    es: "Haití se encuentra en una zona de fallas de desplazamiento entre las placas Norteamericana y del Caribe. A diferencia de las zonas de subducción, Haití está atravesada por fallas donde los bloques se deslizan horizontalmente.",
  },
  "comp.tecto.failleSeptentrionale": {
    fr: "Faille Septentrionale (Nord)",
    kr: "Fay Septantriyonal (Nò)",
    en: "Northern fault (North)",
    es: "Falla Septentrional (Norte)",
  },
  "comp.tecto.failleSepDesc": {
    fr: "Traverse la péninsule Nord. Capable de générer des séismes de magnitude ≥8,0, comparables aux plus grands séismes mondiaux. Dernier grand séisme : 1842 (Cap-Haïtien).",
    kr: "Li travèse penensil nò a. Li ka pwodui tranblemanntè ak magnitid ≥8,0, menm kalite ak pi gwo tranblemanntè sou latè. Dènye gwo tranblemanntè a se te an 1842 (Kap Ayisyen).",
    en: "It crosses the northern peninsula. It can generate earthquakes of magnitude ≥8.0, comparable to the world's largest events. Last major earthquake: 1842 (Cap-Haïtien).",
    es: "Atraviesa la península norte. Puede generar sismos de magnitud ≥8,0, comparables a los mayores del mundo. Último gran sismo: 1842 (Cap-Haitiano).",
  },
  "comp.tecto.failleEnriquillo": {
    fr: "Faille Enriquillo-Plantain Garden (Sud)",
    kr: "Fay Enriquillo-Plantain Garden (EPGF) (Sid)",
    en: "Enriquillo-Plantain Garden fault (South)",
    es: "Falla Enriquillo-Plantain Garden (Sur)",
  },
  "comp.tecto.failleEnDesc": {
    fr: "Traverse la presqu'île du Sud par Léogâne et Port-au-Prince. Responsable de la rupture massive du 12 janvier 2010 (Mw 7,0) et du 14 août 2021 (Mw 7,2). C'est la faille la plus menaçante pour la capitale.",
    kr: "Li travèse ti penensil sid la, nan Legann ak Pòtoprens. Se li ki te kòz gwo tranblemanntè 12 janvye 2010 (Mw 7,0) ak 14 out 2021 (Mw 7,2). Se fay ki pi danjere pou kapital la.",
    en: "It crosses the southern peninsula through Léogâne and Port-au-Prince. It caused the major ruptures of 12 January 2010 (Mw 7.0) and 14 August 2021 (Mw 7.2). It is the most threatening fault for the capital.",
    es: "Atraviesa la península sur por Léogâne y Puerto Príncipe. Causó las rupturas del 12 de enero de 2010 (Mw 7,0) y del 14 de agosto de 2021 (Mw 7,2). Es la falla más amenazante para la capital.",
  },
  "comp.mecaDécroch": {
    fr: "Le mécanisme de décrochement",
    kr: "Mekanis fay dekouman",
    en: "Strike-slip mechanism",
    es: "Mecanismo de falla de desplazamiento",
  },
  "comp.mecaDesc": {
    fr: "Contrairement aux failles normales ou inverses (mouvement vertical), les failles décrochantes sont des fractures où les blocs glissent horizontalement. Cela accumule une énergie élastique massive dans la croûte superficielle (0-70 km), expliquant la violence des secousses en surface.",
    kr: "Olye pou blòk yo monte oswa desann (mouvman vètikal), nan fay dekouman yo se blòk yo ki ap glise sou kote. Sa fè anpil enèji chita nan kwòt tè a (0–70 km), e se sa ki fè sekou yo fò sou sifas la.",
    en: "Unlike normal or reverse faults (vertical motion), strike-slip faults are fractures where blocks slide horizontally. This stores large elastic energy in the shallow crust (0–70 km), explaining the violence of surface shaking.",
    es: "A diferencia de fallas normales o inversas (movimiento vertical), las fallas de desplazamiento son fracturas donde los bloques se deslizan horizontalmente. Esto acumula gran energía elástica en la corteza superficial (0–70 km), lo que explica la violencia de las sacudidas.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ONDES SISMIQUES
  // ═══════════════════════════════════════════════════════════════
  "comp.ondes.title": {
    fr: "Les ondes sismiques",
    kr: "Vag tranblemanntè yo",
    en: "Seismic waves",
    es: "Ondas sísmicas",
  },
  "comp.ondes.intro": {
    fr: "Après un séisme, des ondes élastiques se propagent à travers la Terre. Elles sont le vecteur des vibrations ressenties et un outil d'exploration de l'intérieur terrestre.",
    kr: "Apre yon tranblemanntè, vag ki fè tè a tranble ap pwopaje nan tout planèt la. Se yo ki pote sekou nou santi yo, e se yo tou ki ede nou konprann enteryè tè a.",
    en: "After an earthquake, elastic waves travel through the Earth. They carry the shaking we feel and help explore Earth's interior.",
    es: "Tras un sismo, las ondas elásticas se propagan por la Tierra. Transmiten las vibraciones que sentimos y permiten explorar el interior terrestre.",
  },
  "comp.ondesP.title": {
    fr: "Ondes P (primaires / compression)",
    kr: "Vag P (premye / konpresyon)",
    en: "P-waves (primary / compression)",
    es: "Ondas P (primarias / compresión)",
  },
  "comp.ondesP.desc": {
    fr: "Les ondes P sont des ondes longitudinales : les particules oscillent dans la direction de propagation. Elles sont les plus rapides (5–8 km/s en croûte, jusqu'à 13 km/s en manteau). Elles traversent tous les milieux (solides, liquides, gaz) et arrivent en premier → d'où leur nom « primaires ».",
    kr: "Vag P yo se vag ki ale dwat devan: patikil yo ap bouje nan menm direksyon ak vag la. Yo pi rapid (5–8 km/s nan kwòt la, jiska 13 km/s nan mantò a). Yo ka pase nan solid, likid ak gaz, e yo rive an premye — se poutèt sa yo rele vag premye.",
    en: "P-waves are longitudinal: particles oscillate in the direction of travel. They are fastest (5–8 km/s in crust, up to 13 km/s in mantle), pass through solids, liquids, and gases, and arrive first — hence “primary.”",
    es: "Las ondas P son longitudinales: las partículas oscilan en la dirección de propagación. Son las más rápidas (5–8 km/s en corteza, hasta 13 km/s en manto), atraviesan sólidos, líquidos y gases, y llegan primero.",
  },
  "comp.ondesS.title": {
    fr: "Ondes S (secondaires / cisaillement)",
    kr: "Vag S (dezyèm / chire)",
    en: "S-waves (secondary / shear)",
    es: "Ondas S (secundarias / cizalla)",
  },
  "comp.ondesS.desc": {
    fr: "Les ondes S sont des ondes transversales : les particules oscillent perpendiculairement à la propagation. Elles sont ~1,7× plus lentes que les ondes P (3–5 km/s). CRUCIAL : les ondes S ne se propagent PAS dans les liquides (absence de rigidité). Cette propriété a permis de découvrir que le noyau externe est liquide.",
    kr: "Vag S yo se vag ki fè patikil yo bouje sou kote, pèpendikilyè ak direksyon vag la. Yo ~1,7 fwa pi dousman pase vag P (3–5 km/s). ENPÒTAN: vag S pa ka pase nan likid paske likid pa gen rigidite. Se ak sa yo te dekouvri nwayo ekstèn nan likid.",
    en: "S-waves are transverse: particles move perpendicular to propagation. They are ~1.7× slower than P-waves (3–5 km/s). CRUCIAL: S-waves do NOT travel through liquids (no rigidity). This revealed that the outer core is liquid.",
    es: "Las ondas S son transversales: las partículas se mueven perpendicularmente a la propagación. Son ~1,7 veces más lentas que las P (3–5 km/s). CRUCIAL: las S no se propagan en líquidos (sin rigidez). Esto permitió descubrir que el núcleo externo es líquido.",
  },
  "comp.ondesLove.title": {
    fr: "Ondes de Love",
    kr: "Vag Love",
    en: "Love waves",
    es: "Ondas Love",
  },
  "comp.ondesLove.desc": {
    fr: "Ondes de surface polarisées horizontalement, perpendiculairement à la direction de propagation. Elles n'existent que si la vitesse des ondes varie avec la profondeur. Leur amplitude décroît exponentiellement avec la profondeur.",
    kr: "Se vag sou sifas ki fè tè a bouje sou kote, pèpendikilyè ak direksyon pwopagasyon an. Yo parèt sèlman lè vitès vag yo chanje selon pwofondè. Fòs yo diminye rapidman pi nou desann anba tè.",
    en: "Horizontally polarized surface waves, perpendicular to propagation. They exist only when wave speed varies with depth. Their amplitude decays exponentially with depth.",
    es: "Ondas superficiales polarizadas horizontalmente, perpendiculares a la propagación. Solo existen si la velocidad varía con la profundidad. Su amplitud decae exponencialmente con la profundidad.",
  },
  "comp.ondesRayleigh.title": {
    fr: "Ondes de Rayleigh",
    kr: "Vag Rayleigh",
    en: "Rayleigh waves",
    es: "Ondas Rayleigh",
  },
  "comp.ondesRayleigh.desc": {
    fr: "Combinent mouvements longitudinaux et verticaux, créant un mouvement rétrograde elliptique. Elles générent le mouvement de roulis ressenti lors des grands séismes et peuvent provoquer des seiches dans les lacs.",
    kr: "Yo melanje mouvman dwat ak mouvman vètikal, ki bay yon mouvman eliptik. Se yo ki fè tè a woule pandan gwo tranblemanntè, e yo ka fè dlo nan lak yo balanse.",
    en: "They combine longitudinal and vertical motion into retrograde elliptical movement. They produce the rolling felt in major earthquakes and can cause seiches in lakes.",
    es: "Combinan movimiento longitudinal y vertical en un movimiento elíptico retrógrado. Producen el balanceo en grandes sismos y pueden causar seiches en lagos.",
  },

  // ═══════════════════════════════════════════════════════════════
  // STRUCTURE DE LA TERRE
  // ═══════════════════════════════════════════════════════════════
  "comp.structure.title": {
    fr: "Structure interne de la Terre",
    kr: "Estrikti entèn tè a",
    en: "Earth's internal structure",
    es: "Estructura interna de la Tierra",
  },
  "comp.structure.croute": {
    fr: "Croûte (0-30 km) : Riche en silice, très cassante. Les séismes y naissent.",
    kr: "Kwòt (0–30 km): Rich nan silis, li fasil kase. Se la tranblemanntè yo pran nesans.",
    en: "Crust (0–30 km): Silica-rich and brittle. Earthquakes originate here.",
    es: "Corteza (0–30 km): Rica en sílice y muy frágil. Aquí nacen los sismos.",
  },
  "comp.structure.manteau": {
    fr: "Manteau (30-2890 km) : Péridotite, chaud et plastique. Siège de la convection.",
    kr: "Mantò (30–2890 km): Peridotit cho, plastik. Se la konveksyon fèt.",
    en: "Mantle (30–2890 km): Hot peridotite, plastic. Site of convection.",
    es: "Manto (30–2890 km): Peridotita caliente y plástica. Lugar de la convección.",
  },
  "comp.structure.noyauExterne": {
    fr: "Noyau externe (2890-5150 km) : Fer-nickel LIQUIDE. Génère le champ magnétique terrestre.",
    kr: "Nwayo ekstèn (2890–5150 km): Fè-nikel LIKID. Li pwodui jaden mayetik tè a.",
    en: "Outer core (2890–5150 km): Liquid iron-nickel. Generates Earth's magnetic field.",
    es: "Núcleo externo (2890–5150 km): Hierro-níquel LÍQUIDO. Genera el campo magnético terrestre.",
  },
  "comp.structure.noyauInterne": {
    fr: "Noyau interne / graine (5150-6371 km) : Fer-nickel SOLIDE à ~5000°C.",
    kr: "Nwayo entèn (5150–6371 km): Fè-nikel SOLID ~5000°C.",
    en: "Inner core (5150–6371 km): Solid iron-nickel at ~5000°C.",
    es: "Núcleo interno (5150–6371 km): Hierro-níquel SÓLIDO a ~5000°C.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CHRONOLOGIE HAÏTI
  // ═══════════════════════════════════════════════════════════════
  "comp.chrono.title": {
    fr: "Chronologie sismique d'Haïti",
    kr: "Kronoloji tranblemanntè Ayiti",
    en: "Haiti seismic timeline",
    es: "Cronología sísmica de Haití",
  },
  "comp.chrono.1751": {
    fr: "1751 & 1770 : Port-au-Prince rasée peu après sa fondation. Les constructions en pierre se montrent très fragiles.",
    kr: "1751 ak 1770: Pòtoprens detwi kèk tan apre li te bati. Bilding an wòch yo te fèb anpil.",
    en: "1751 & 1770: Port-au-Prince destroyed soon after its founding. Stone buildings proved very fragile.",
    es: "1751 y 1770: Puerto Príncipe destruido poco después de su fundación. Las construcciones de piedra resultaron muy frágiles.",
  },
  "comp.chrono.1842": {
    fr: "1842 (Cap-Haïtien) : Grand séisme sur la Faille Septentrionale. Tsunami dévastateur. Leçon : risque côtier majeur.",
    kr: "1842 (Kap Ayisyen): Gwo tranblemanntè sou Fay Septantriyonal la. Tsunami devasta. Leson: gwo risk sou kòt yo.",
    en: "1842 (Cap-Haïtien): Major earthquake on the Northern fault. Devastating tsunami. Lesson: major coastal risk.",
    es: "1842 (Cap-Haitiano): Gran sismo en la Falla Septentrional. Tsunami devastador. Lección: riesgo costero mayor.",
  },
  "comp.chrono.2010": {
    fr: "12 janvier 2010 (Mw 7,0) : Faille EPGF (sud). Épicentre : 15 km SW de Port-au-Prince. >230 000 morts. Bâtiments non parasismiques = catastrophe humanitaire. Énorme aléa sismique, vulnérabilité EXTRÊME du bâti.",
    kr: "12 janvye 2010 (Mw 7,0): Fay EPGF (sid). Episant: 15 km SW Pòtoprens. >230 000 moun mouri. Bilding ki pa reziste tranblemanntè = katastwòf imanitè. Gwo risk sismik, bilding yo TELE fèb.",
    en: "12 January 2010 (Mw 7.0): EPGF fault (south). Epicenter: 15 km SW of Port-au-Prince. >230,000 deaths. Non-seismic buildings = humanitarian catastrophe. High seismic hazard, EXTREME building vulnerability.",
    es: "12 de enero de 2010 (Mw 7,0): Falla EPGF (sur). Epicentro: 15 km SW de Puerto Príncipe. >230 000 muertos. Edificios no antisísmicos = catástrofe humanitaria. Alto peligro sísmico, vulnerabilidad EXTREMA del hábitat.",
  },
  "comp.chrono.2021": {
    fr: "14 août 2021 (Mw 7,2) : PLUS puissant que 2010, mais densité de population différente à l'épicentre → moins de morts. Même faille EPGF. Rappel qu'Haïti reste en zone de grand danger sismique.",
    kr: "14 out 2021 (Mw 7,2): Pi fò pase 2010, men mwens moun te nan zòn episant lan → mwens moun mouri. Menm fay EPGF. Sa raple nou Ayiti toujou nan yon zòn ki gen gwo risk tranblemanntè.",
    en: "14 August 2021 (Mw 7.2): MORE powerful than 2010, but lower population density at the epicenter → fewer deaths. Same EPGF fault. Haiti remains in a zone of high seismic danger.",
    es: "14 de agosto de 2021 (Mw 7,2): MÁS potente que 2010, pero menor densidad poblacional en el epicentro → menos muertes. Misma falla EPGF. Haití sigue en una zona de alto peligro sísmico.",
  },

  // ═══════════════════════════════════════════════════════════════
  // CONSTRUCTION PARASISMIQUE
  // ═══════════════════════════════════════════════════════════════
  "comp.construct.title": {
    fr: "Construction parasismique",
    kr: "Konstriksyon ki reziste tranblemanntè",
    en: "Earthquake-resistant construction",
    es: "Construcción antisísmica",
  },
  "comp.construct.chainee": {
    fr: "Maçonnerie chaînée",
    kr: "Masonri mare",
    en: "Confined masonry",
    es: "Mampostería confinada",
  },
  "comp.construct.chaineeDesc": {
    fr: "Encadrement rigoureux des blocs de maçonnerie par des poteaux et poutres en béton armé. Permet au bâtiment de se déformer sans s'effondrer lors des vibrations.",
    kr: "Blòk masonri yo mare ak poto ak pout an beton arme. Sa pèmèt bilding la pliye san li pa tonbe pandan sekou yo.",
    en: "Masonry blocks framed by reinforced concrete columns and beams. Allows the building to deform without collapsing during shaking.",
    es: "Bloques de mampostería enmarcados por columnas y vigas de concreto armado. Permite que el edificio se deforme sin colapsar durante las sacudidas.",
  },
  "comp.construct.erreurs": {
    fr: "Erreurs fatales (Haïti)",
    kr: "Erè fatal (Ayiti)",
    en: "Fatal errors (Haiti)",
    es: "Errores fatales (Haití)",
  },
  "comp.construct.sableSale": {
    fr: "• Sable salé : Corrosion rapide des armatures acier → perte de résistance",
    kr: "• Sab sale: fè a koròde vit → bilding pèdi fòs li",
    en: "• Salty sand: rapid steel corrosion → loss of strength",
    es: "• Arena salada: corrosión rápida del acero → pérdida de resistencia",
  },
  "comp.construct.betonLiquide": {
    fr: "• Béton trop liquide : Faible compacité → fissuration et porosité excessives",
    kr: "• Beton twò likid: li pa solid → li fann epi li gen twòp twou",
    en: "• Overly wet concrete: low compaction → cracking and excess porosity",
    es: "• Concreto demasiado líquido: baja compactación → fisuras y porosidad excesiva",
  },
  "comp.construct.fersLisses": {
    fr: "• Fers lisses : Absence d'adhérence lors des vibrations → glissement des armatures",
    kr: "• Fè lis: pa kenbe byen nan beton → fè a glise lè tè a tranble",
    en: "• Smooth rebar: poor bond under shaking → rebar slip",
    es: "• Varillas lisas: poca adherencia bajo vibración → deslizamiento del acero",
  },
  "comp.construct.clissage": {
    fr: "• Revalorisation du traditionnel : Le « clissage » (bois + mortier de terre) offre une élasticité naturelle supérieure au béton artisanal fragile.",
    kr: "• Konstriksyon tradisyonèl: « klisaj » (bwa + mortye tè) pi fleksib pase beton atizanal ki fèb.",
    en: "• Traditional methods: “clissage” (wood + earth mortar) offers natural flexibility superior to fragile artisanal concrete.",
    es: "• Métodos tradicionales: el “clissage” (madera + mortero de tierra) ofrece flexibilidad natural superior al concreto artesanal frágil.",
  },

  // ═══════════════════════════════════════════════════════════════
  // PRÉVENTION (BESE, PWOTEJE, KENBE)
  // ═══════════════════════════════════════════════════════════════
  "prev.title": {
    fr: "Bese, Pwoteje, Kenbe — La survie",
    kr: "Bese, Pwoteje, Kenbe — Siviv",
    en: "Drop, Cover, Hold — Survival",
    es: "Agáchate, Cúbrete, Agárrate — Supervivencia",
  },
  "prev.bese": {
    fr: "BESE (Baisse-toi)",
    kr: "BESE (Bese tèt ou)",
    en: "DROP (Get down)",
    es: "AGÁCHATE (Agáchate)",
  },
  "prev.beseDesc": {
    fr: "Réflexe immédiat : baissez-vous pour éviter les chutes d'objets, la cause majeure de blessures immédiates. Protégez votre tête.",
    kr: "Aksyon imedyat: bese tèt ou pou evite objè ki tonbe — se sa ki fè pi plis blesi. Pwoteje tèt ou.",
    en: "Immediate action: get down to avoid falling objects, a major cause of injury. Protect your head.",
    es: "Acción inmediata: agáchate para evitar objetos que caen, causa principal de lesiones. Protege tu cabeza.",
  },
  "prev.pwoteje": {
    fr: "PWOTEJE (Protège-toi)",
    kr: "PWOTEJE (Pwoteje tèt ou)",
    en: "COVER (Protect yourself)",
    es: "CÚBRETE (Protégete)",
  },
  "prev.pwotejeDesc": {
    fr: "Sous une table solide, un renforcement structurel, ou un cadre de porte. Couvrez votre tête et vos épaules. Éloignez-vous des fenêtres, des murs non porteurs, des murs de clôture extérieurs (risque d'effondrement).",
    kr: "Mete tèt ou anba yon tab solid, yon estrikti ranfòse, oswa kad pòt la. Kouvri tèt ak zepòl ou. Rete lwen fenèt, mi ki pa sipòte, ak mi kloti deyò (yo ka tonbe).",
    en: "Under a sturdy table, structural reinforcement, or door frame. Cover your head and shoulders. Stay away from windows, non-load-bearing walls, and exterior boundary walls (collapse risk).",
    es: "Bajo una mesa sólida, refuerzo estructural o marco de puerta. Cubre cabeza y hombros. Aléjate de ventanas, muros no portantes y muros perimetrales exteriores (riesgo de colapso).",
  },
  "prev.kenbe": {
    fr: "KENBE (Accroche-toi)",
    kr: "KENBE (Kenbe fèm)",
    en: "HOLD (Hold on)",
    es: "AGÁRRATE (Agárrate)",
  },
  "prev.kenbeDesc": {
    fr: "Restez accroché(e) jusqu'à ce que les secousses cessent. Les premières ondes P sont peu destructrices (~10 sec) ; ce sont les ondes S et de surface (lentes, ~30-60 sec) qui causent les dommages majeurs.",
    kr: "Kenbe fèm jiskaske sekou yo fini. Premye vag P yo pa twò destriktif (~10 segonn); se vag S ak vag sou sifas (pi dousman, ~30–60 segonn) ki fè pi gwo domaj.",
    en: "Hold on until shaking stops. Early P-waves are less destructive (~10 sec); S-waves and surface waves (slower, ~30–60 sec) cause major damage.",
    es: "Agárrate hasta que cese la sacudida. Las ondas P iniciales son poco destructivas (~10 s); las S y superficiales (más lentas, ~30–60 s) causan los mayores daños.",
  },
  "prev.dangers.title": {
    fr: "Dangers locaux spécifiques",
    kr: "Danje lokal espesifik",
    en: "Specific local hazards",
    es: "Peligros locales específicos",
  },
  "prev.dangers.murloti": {
    fr: "Murs de clôture extérieurs : S'effondrent facilement → rester à distance",
    kr: "Mi kloti deyò: yo tonbe fasil → rete lwen yo",
    en: "Exterior boundary walls: collapse easily → keep your distance",
    es: "Muros perimetrales: colapsan fácilmente → mantén distancia",
  },
  "prev.dangers.mornes": {
    fr: "Mornes déforestés : Glissements de terrain amplifiés par les ondes",
    kr: "Mòn deforeste: glisman tè ogmante ak sekou yo",
    en: "Deforested hillsides: landslides amplified by shaking",
    es: "Laderas deforestadas: deslizamientos amplificados por las ondas",
  },
  "prev.dangers.liquefaction": {
    fr: "Liquéfaction en zones côtières (Port-au-Prince, etc.) : Sols perdent leur capacité portante",
    kr: "Likifaksyon sou kòt yo (Pòtoprens, elatriye): tè a pèdi fòs li pou sipòte",
    en: "Liquefaction in coastal zones (Port-au-Prince, etc.): soils lose bearing capacity",
    es: "Licuefacción en zonas costeras (Puerto Príncipe, etc.): los suelos pierden capacidad portante",
  },
  "prev.dangers.incendies": {
    fr: "Incendies post-sismiques : Réchauds à charbon renversés (comme 1906 San Francisco)",
    kr: "Dife apre tranblemanntè: rechaud charbon tonbe (tankou San Francisco 1906)",
    en: "Post-earthquake fires: overturned charcoal stoves (as in 1906 San Francisco)",
    es: "Incendios post-sísmicos: estufas de carbón volcadas (como San Francisco 1906)",
  },

  // ═══════════════════════════════════════════════════════════════
  // VILLE
  // ═══════════════════════════════════════════════════════════════
  "ville.title": {
    fr: "Construisez Haïti parasismiquement",
    kr: "Bati Ayiti ki reziste tranblemanntè",
    en: "Build Haiti seismically safe",
    es: "Construya Haití con protección sísmica",
  },
  "ville.feedback.excellent": {
    fr: "✓ Excellent ! Maçonnerie chaînée + sol stable = protection maximale",
    kr: "✓ Ekselan! Masonri mare + tè solid = pwoteksyon maksimòm",
    en: "✓ Excellent! Confined masonry + stable soil = maximum protection",
    es: "✓ ¡Excelente! Mampostería confinada + suelo estable = máxima protección",
  },
  "ville.feedback.alerte": {
    fr: "⚠ Alerte ! Sable salé + béton liquide = corrosion + rupture probable",
    kr: "⚠ Atansyon! Sab sale + beton likid = korozyon + gwo risk tonbe",
    en: "⚠ Warning! Salty sand + wet concrete = corrosion + likely failure",
    es: "⚠ ¡Alerta! Arena salada + concreto líquido = corrosión + probable colapso",
  },

  // ═══════════════════════════════════════════════════════════════
  // HISTORICAL LESSONS
  // ═══════════════════════════════════════════════════════════════
  "history.1770": {
    fr: "Leçon du bois (1751-1770)",
    kr: "Leson bwa a (1751–1770)",
    en: "Lesson of wood (1751–1770)",
    es: "Lección de la madera (1751–1770)",
  },
  "history.1770.desc": {
    fr: "Port-au-Prince rasée deux fois en pierre. Le bois s'avère plus flexible.",
    kr: "Pòtoprens detwi de fwa ak bilding an wòch. Bwa pi fleksib.",
    en: "Port-au-Prince destroyed twice in stone. Wood proved more flexible.",
    es: "Puerto Príncipe destruido dos veces en piedra. La madera resultó más flexible.",
  },
  "history.2010": {
    fr: "Leçon du béton (2010)",
    kr: "Leson beton an (2010)",
    en: "Lesson of concrete (2010)",
    es: "Lección del concreto (2010)",
  },
  "history.2010.desc": {
    fr: "Mw 7.0 : >230,000 morts. Béton liquide, fers lisses, sable salé = effondrement.",
    kr: "Mw 7.0: >230 000 moun mouri. Beton likid, fè lis, sab sale = tonbe.",
    en: "Mw 7.0: >230,000 deaths. Wet concrete, smooth rebar, salty sand = collapse.",
    es: "Mw 7.0: >230 000 muertos. Concreto líquido, varillas lisas, arena salada = colapso.",
  },
  "history.2021": {
    fr: "Leçon de la distance (2021)",
    kr: "Leson distans lan (2021)",
    en: "Lesson of distance (2021)",
    es: "Lección de la distancia (2021)",
  },
  "history.2021.desc": {
    fr: "Mw 7.2 plus puissant mais moins meurtrier (épicentre moins peuplé).",
    kr: "Mw 7.2 pi fò men mwens moun mouri (episant pa tèlman peple).",
    en: "Mw 7.2 more powerful but less deadly (epicenter less populated).",
    es: "Mw 7.2 más potente pero menos mortal (epicentro menos poblado).",
  },

  // ═══════════════════════════════════════════════════════════════
  // TECHNICAL TERMS
  // ═══════════════════════════════════════════════════════════════
  "technical.chainedMasonry": {
    fr: "Maçonnerie chaînée",
    kr: "Masonri mare",
    en: "Confined masonry",
    es: "Mampostería confinada",
  },
  "technical.slipFault": {
    fr: "Faille qui glisse",
    kr: "Fay dekouman",
    en: "Strike-slip fault",
    es: "Falla de desplazamiento",
  },
  "technical.liquefaction": {
    fr: "Liquéfaction (sol devient eau)",
    kr: "Likifaksyon (tè vin tounen dlo)",
    en: "Liquefaction (soil turns to fluid)",
    es: "Licuefacción (el suelo se vuelve fluido)",
  },
  "technical.pWaves": {
    fr: "Ondes P (rapides)",
    kr: "Vag P (rapid)",
    en: "P-waves (fast)",
    es: "Ondas P (rápidas)",
  },
  "technical.sWaves": {
    fr: "Ondes S (lentes)",
    kr: "Vag S (dousman)",
    en: "S-waves (slow)",
    es: "Ondas S (lentas)",
  },
  "technical.surfaceWaves": {
    fr: "Ondes de surface (destructrices)",
    kr: "Vag sou sifas (destriktif)",
    en: "Surface waves (destructive)",
    es: "Ondas superficiales (destructivas)",
  },
  "technical.soilAmplification": {
    fr: "Amplification du sol",
    kr: "Tè a ogmante sekou yo",
    en: "Soil amplification",
    es: "Amplificación del suelo",
  },
  "technical.shaking": {
    fr: "Secousses du sol",
    kr: "Sekou tè a",
    en: "Ground shaking",
    es: "Sacudida del suelo",
  },

  // ═══════════════════════════════════════════════════════════════
  // VULNERABILITY FACTORS
  // ═══════════════════════════════════════════════════════════════
  "vuln.saltySand": {
    fr: "Sable salé → -60% résistance",
    kr: "Sab sale → -60% fòs",
    en: "Salty sand → -60% strength",
    es: "Arena salada → -60% resistencia",
  },
  "vuln.liquidConcrete": {
    fr: "Béton liquide → -40% stabilité",
    kr: "Beton likid → -40% estabilite",
    en: "Wet concrete → -40% stability",
    es: "Concreto líquido → -40% estabilidad",
  },
  "vuln.smoothSteel": {
    fr: "Fers lisses → -30% adhérence",
    kr: "Fè lis → -30% kenbe nan beton",
    en: "Smooth rebar → -30% bond",
    es: "Varillas lisas → -30% adherencia",
  },
  "vuln.chainedMasonry": {
    fr: "Maçonnerie chaînée → +80% survie",
    kr: "Masonri mare → +80% chans siviv",
    en: "Confined masonry → +80% survival",
    es: "Mampostería confinada → +80% supervivencia",
  },

  // ═══════════════════════════════════════════════════════════════
  // FAULT ANATOMY
  // ═══════════════════════════════════════════════════════════════
  "fault.northern": {
    fr: "Faille Septentrionale",
    kr: "Fay Septantriyonal",
    en: "Northern fault",
    es: "Falla Septentrional",
  },
  "fault.northern.desc": {
    fr: "Traverse péninsule Nord. Magnitude potentielle ≥8.0. Dernier grand séisme: 1842 (Cap-Haïtien) avec tsunami dévastateur.",
    kr: "Li travèse penensil nò a. Magnitid posib ≥8,0. Dènye gwo tranblemanntè: 1842 (Kap Ayisyen) ak tsunami devasta.",
    en: "Crosses the northern peninsula. Potential magnitude ≥8.0. Last major earthquake: 1842 (Cap-Haïtien) with devastating tsunami.",
    es: "Atraviesa la península norte. Magnitud potencial ≥8,0. Último gran sismo: 1842 (Cap-Haitiano) con tsunami devastador.",
  },
  "fault.southern": {
    fr: "Faille Enriquillo-Plantain Garden (EPGF)",
    kr: "Fay Enriquillo-Plantain Garden (EPGF)",
    en: "Enriquillo-Plantain Garden fault (EPGF)",
    es: "Falla Enriquillo-Plantain Garden (EPGF)",
  },
  "fault.southern.desc": {
    fr: "Traverse presqu'île Sud (Léogâne, Port-au-Prince). Responsable 2010 (Mw 7.0) et 2021 (Mw 7.2). FAILLE LA PLUS MENAÇANTE POUR LA CAPITALE.",
    kr: "Li travèse ti penensil sid la (Legann, Pòtoprens). Li kòz 2010 (Mw 7,0) ak 2021 (Mw 7,2). FAY KI PI DANJERE POU KAPITAL LA.",
    en: "Crosses the southern peninsula (Léogâne, Port-au-Prince). Caused 2010 (Mw 7.0) and 2021 (Mw 7.2). MOST THREATENING FAULT FOR THE CAPITAL.",
    es: "Atraviesa la península sur (Léogâne, Puerto Príncipe). Causó 2010 (Mw 7,0) y 2021 (Mw 7,2). FALLA MÁS AMENAZANTE PARA LA CAPITAL.",
  },

  // ═══════════════════════════════════════════════════════════════
  // LIQUEFACTION
  // ═══════════════════════════════════════════════════════════════
  "liquef.title": {
    fr: "Risque de liquéfaction",
    kr: "Risk likifaksyon",
    en: "Liquefaction hazard",
    es: "Riesgo de licuefacción",
  },
  "liquef.desc": {
    fr: "Sols saturés en eau (sables, alluvions côtières) perdent capacité portante lors du séisme.",
    kr: "Tè ki plen dlo (sab, depo sou kòt) pèdi fòs li pou sipòte lè tranblemanntè a rive.",
    en: "Water-saturated soils (sands, coastal alluvium) lose bearing capacity during earthquakes.",
    es: "Suelos saturados (arenas, aluviones costeros) pierden capacidad portante durante el sismo.",
  },
  "liquef.pap": {
    fr: "Port-au-Prince : Risque TRÈS ÉLEVÉ (plaines alluviales)",
    kr: "Pòtoprens: risk TRÈ WO (plenn aluvyal)",
    en: "Port-au-Prince: VERY HIGH risk (alluvial plains)",
    es: "Puerto Príncipe: riesgo MUY ALTO (llanuras aluviales)",
  },
  "liquef.arcahaie": {
    fr: "Arcahaie : Risque ÉLEVÉ",
    kr: "Lakayè: risk WO",
    en: "Arcahaie: HIGH risk",
    es: "Arcahaie: riesgo ALTO",
  },
  "liquef.leogane": {
    fr: "Léogâne : Risque ÉLEVÉ",
    kr: "Legann: risk WO",
    en: "Léogâne: HIGH risk",
    es: "Léogâne: riesgo ALTO",
  },

  // ═══════════════════════════════════════════════════════════════
  // EARLY WARNING
  // ═══════════════════════════════════════════════════════════════
  "alert.pWaveVelocity": {
    fr: "Ondes P : ~6 km/s dans la croûte",
    kr: "Vag P: ~6 km/s nan kwòt la",
    en: "P-waves: ~6 km/s in the crust",
    es: "Ondas P: ~6 km/s en la corteza",
  },
  "alert.estimate": {
    fr: "Temps d'alerte estimé = Distance ÷ 6 km/s",
    kr: "Tan alèt estime = Distans ÷ 6 km/s",
    en: "Estimated alert time = Distance ÷ 6 km/s",
    es: "Tiempo de alerta estimado = Distancia ÷ 6 km/s",
  },
  "alert.precious": {
    fr: "Ces secondes permettent de se protéger avant les ondes destructrices S et de surface.",
    kr: "Kèk segonn sa yo ka ede w pwoteje tèt ou anvan vag S ak vag sou sifas ki destriktif yo rive.",
    en: "Those seconds allow you to protect yourself before destructive S- and surface waves arrive.",
    es: "Esos segundos permiten protegerse antes de que lleguen las ondas S y superficiales destructivas.",
  },

  // ═══════════════════════════════════════════════════════════════
  // ABOUT MODAL
  // ═══════════════════════════════════════════════════════════════
  "about.title": {
    fr: "À propos de SisAyiti",
    kr: "Sou SisAyiti",
    en: "About SisAyiti",
    es: "Acerca de SisAyiti",
  },
  "about.subtitle": {
    fr: "Plateforme scientifique d'éducation sismique",
    kr: "Platfòm syantifik pou edike sou tranblemanntè",
    en: "Scientific earthquake education platform",
    es: "Plataforma científica de educación sísmica",
  },
  "about.body": {
    fr: "SisAyiti est une plateforme éducative interactive conçue pour sensibiliser la population haïtienne aux risques sismiques. Elle combine éducation scientifique, simulation et outils pratiques de prévention.",
    kr: "SisAyiti se yon platfòm entèaktif pou edike pèp ayisyen sou risk tranblemanntè. Li melanje syans, similasyon ak zouti pratik pou prepare moun.",
    en: "SisAyiti is an interactive educational platform designed to raise awareness of seismic risks among Haitians. It combines scientific education, simulation, and practical preparedness tools.",
    es: "SisAyiti es una plataforma educativa interactiva diseñada para sensibilizar a la población haitiana sobre los riesgos sísmicos. Combina educación científica, simulación y herramientas prácticas de prevención.",
  },
  "about.sources": {
    fr: "Sources de données",
    kr: "Sous done yo",
    en: "Data sources",
    es: "Fuentes de datos",
  },
  "about.references": {
    fr: "Références scientifiques",
    kr: "Referans syantifik",
    en: "Scientific references",
    es: "Referencias científicas",
  },

  // ═══════════════════════════════════════════════════════════════
  // COMPRENDRE — UI
  // ═══════════════════════════════════════════════════════════════
  "comp.subtitle": {
    fr: "Explorez les mécanismes sismiques à travers des illustrations interactives et testez vos connaissances.",
    kr: "Eksplore mekanis tranblemanntè yo ak ilistrasyon entèaktif, epi verifye konesans ou.",
    en: "Explore seismic mechanisms through interactive illustrations and test your knowledge.",
    es: "Explore los mecanismos sísmicos con ilustraciones interactivas y ponga a prueba sus conocimientos.",
  },
  "quiz.submit": {
    fr: "Valider mes réponses",
    kr: "Verifye repons mwen yo",
    en: "Submit my answers",
    es: "Enviar mis respuestas",
  },
  "quiz.correctAnswers": {
    fr: "bonne(s) réponse(s)",
    kr: "bon repons",
    en: "correct answer(s)",
    es: "respuesta(s) correcta(s)",
  },
  "quiz.retry": {
    fr: "Réessayer",
    kr: "Eseye ankò",
    en: "Try again",
    es: "Intentar de nuevo",
  },
  "comp.svg.tectonique": {
    fr: "Animation tectonique des plaques",
    kr: "Animasyon tektonik plak yo",
    en: "Tectonic plate animation",
    es: "Animación tectónica de placas",
  },
  "comp.svg.faille": {
    fr: "Coupe transversale de la faille d'Enriquillo",
    kr: "Koup trasvès fay Enriquillo a",
    en: "Cross-section of the Enriquillo fault",
    es: "Sección transversal de la falla Enriquillo",
  },
  "comp.svg.ondes": {
    fr: "Types d'ondes sismiques",
    kr: "Kalite vag tranblemanntè",
    en: "Types of seismic waves",
    es: "Tipos de ondas sísmicas",
  },
  "comp.svg.hypocentre": {
    fr: "Hypocentre et épicentre",
    kr: "Ipocant ak epicant",
    en: "Hypocenter and epicenter",
    es: "Hipocentro y epicentro",
  },
  "labo.svg.buildingDamage": {
    fr: "Dommages au bâtiment",
    kr: "Domaj sou bilding",
    en: "Building damage",
    es: "Daños al edificio",
  },
  "labo.svg.waves": {
    fr: "Propagation des ondes",
    kr: "Pwopagasyon vag yo",
    en: "Wave propagation",
    es: "Propagación de ondas",
  },
  "ville.cellAria": {
    fr: "Parcelle",
    kr: "Tè",
    en: "Parcel",
    es: "Parcela",
  },
} as const satisfies Record<string, Record<Lang, string>>

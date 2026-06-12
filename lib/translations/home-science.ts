import type { Lang } from '@/lib/i18n'

type L = Record<Lang, string>
const s = (fr: string, kr: string, en: string, es: string): L => ({ fr, kr, en, es })

export const homeScienceStrings: Record<string, L> = {
  'home.subtitleLong': s(
    'Plateforme éducative sur les séismes et les risques naturels en Haïti — parcours Konprann, Simile, Prepare.',
    'Platfòm edikatif sou tranblemanntè ak risk natirèl nan Ayiti — pèkòs Konprann, Simile, Prepare.',
    'Educational platform on earthquakes and natural risks in Haiti — Konprann, Simile, Prepare path.',
    'Plataforma educativa sobre sismos y riesgos naturales en Haití — recorrido Konprann, Simile, Prepare.'
  ),
  'home.hero.headline': s(
    'Comprendre les séismes, simuler les risques, se préparer en Haïti',
    'Konprann tranblemanntè yo, simile risk yo, prepare nan Ayiti',
    'Understand earthquakes, simulate risks, prepare in Haiti',
    'Comprender sismos, simular riesgos, prepararse en Haití'
  ),
  'home.hero.description': s(
    '8 modules interactifs pour écoles, familles et communautés — données USGS/EMSC, cartographie des failles et gestes de protection.',
    '8 modil entèaktif pou lekòl, fanmi ak kominote — done USGS/EMSC, kat fail yo ak jès pwoteksyon.',
    '8 interactive modules for schools, families and communities — USGS/EMSC data, fault mapping and protection gestures.',
    '8 módulos interactivos para escuelas, familias y comunidades — datos USGS/EMSC, mapa de fallas y gestos de protección.'
  ),
  'home.cta.explore': s('Explorer les modules', 'Eksplore modil yo', 'Explore modules', 'Explorar módulos'),
  'home.cta.prevention': s('Gestes de protection', 'Jès pwoteksyon', 'Protection gestures', 'Gestos de protección'),

  'home.pillar.konprann.title': s('Konprann', 'Konprann', 'Understand', 'Comprender'),
  'home.pillar.konprann.desc': s(
    'Failles, ondes sismiques et contexte géologique d\'Haïti.',
    'Fail, vag tranblemanntè ak kontèks jewolojik Ayiti.',
    'Faults, seismic waves and Haiti\'s geological context.',
    'Fallas, ondas sísmicas y contexto geológico de Haití.'
  ),
  'home.pillar.simile.title': s('Simile', 'Simile', 'Simulate', 'Simular'),
  'home.pillar.simile.desc': s(
    'Laboratoire physique et ville parasismique interactifs.',
    'Laboratwa fizik ak vil parasismik entèaktif.',
    'Interactive physics lab and seismic city game.',
    'Laboratorio físico y ciudad parasísmica interactivos.'
  ),
  'home.pillar.prepare.title': s('Prepare', 'Prepare', 'Prepare', 'Prepararse'),
  'home.pillar.prepare.desc': s(
    'Gestes Bese-Pwoteje-Kenbe et diagnostic de bâtiment.',
    'Jès Bese-Pwoteje-Kenbe ak dyagnostik bilding.',
    'Drop-Cover-Hold On gestures and building diagnostic.',
    'Gestos Agáchate-Cúbrete y diagnóstico de edificios.'
  ),

  'home.section.watch': s('Surveiller', 'Siveye', 'Monitor', 'Vigilar'),
  'home.section.learn': s('Comprendre', 'Konprann', 'Learn', 'Comprender'),
  'home.section.simulate': s('Simuler', 'Simile', 'Simulate', 'Simular'),
  'home.section.act': s('Agir', 'Aji', 'Act', 'Actuar'),

  'home.trust.languages': s('4 langues', '4 lang', '4 languages', '4 idiomas'),
  'home.trust.data': s('Données USGS · EMSC', 'Done USGS · EMSC', 'USGS · EMSC data', 'Datos USGS · EMSC'),
  'home.trust.offline': s('Fonctionne hors-ligne', 'Mache deyò entènèt', 'Works offline', 'Funciona sin conexión'),
  'home.trust.haiti': s('Contexte haïtien', 'Kontèks ayisyen', 'Haitian context', 'Contexto haitiano'),

  'home.path.title': s('Par où commencer ?', 'Kòman kòmanse ?', 'Where to start?', '¿Por dónde empezar?'),
  'home.path.hint': s(
    'Suivez les 4 étapes dans l\'ordre — ou explorez librement les modules ci-dessous.',
    'Swiv 4 etap yo nan lòd — oswa eksplore modil yo anba a lib.',
    'Follow the 4 steps in order — or freely explore the modules below.',
    'Siga los 4 pasos en orden — o explore libremente los módulos abajo.'
  ),
  'home.path.progress': s(
    '{steps}/4 étapes · {modules} module(s) visité(s)',
    '{steps}/4 etap · {modules} modil vizite',
    '{steps}/4 steps · {modules} module(s) visited',
    '{steps}/4 pasos · {modules} módulo(s) visitado(s)'
  ),

  'home.step.konprann.title': s('1 · Konprann', '1 · Konprann', '1 · Understand', '1 · Comprender'),
  'home.step.konprann.desc': s(
    'Tectonique, failles EPGF et ondes sismiques — bases scientifiques.',
    'Tektonik, fail EPGF ak vag tranblemanntè — baz syantifik.',
    'Tectonics, EPGF faults and seismic waves — scientific basics.',
    'Tectónica, fallas EPGF y ondas sísmicas — bases científicas.'
  ),
  'home.step.simile.title': s('2 · Simile', '2 · Simile', '2 · Simulate', '2 · Simular'),
  'home.step.simile.desc': s(
    'Laboratoire physique et ville parasismique — tester magnitude, sols et constructions.',
    'Laboratwa fizik ak vil parasismik — teste magnitid, tè ak konstriksyon.',
    'Physics lab and seismic city — test magnitude, soils and buildings.',
    'Laboratorio físico y ciudad parasísmica — probar magnitud, suelos y edificios.'
  ),
  'home.step.surveiller.title': s('3 · Siveye', '3 · Siveye', '3 · Monitor', '3 · Vigilar'),
  'home.step.surveiller.desc': s(
    'Carte interactive et flux Actualité — suivre l\'activité autour d\'Haïti.',
    'Kat entèaktif ak flux Aktualite — swiv aktivite bò Ayiti.',
    'Interactive map and News feed — track activity around Haiti.',
    'Mapa interactivo y flujo Actualidad — seguir actividad alrededor de Haití.'
  ),
  'home.step.prepare.title': s('4 · Prepare', '4 · Prepare', '4 · Prepare', '4 · Prepararse'),
  'home.step.prepare.desc': s(
    'Gestes BPK, diagnostic bâtiment et multirisques — agir avant et pendant le choc.',
    'Jès BPK, dyagnostik bilding ak milti-risk — aji anvan ak pandan chòk la.',
    'BPK gestures, building diagnostic and multi-risk — act before and during the shock.',
    'Gestos BPK, diagnóstico de edificios y multirriesgo — actuar antes y durante el choque.'
  ),

  'home.topic.konprann': s('Konprann', 'Konprann', 'Understand', 'Comprender'),
  'home.topic.simile': s('Simile', 'Simile', 'Simulate', 'Simular'),
  'home.topic.prepare': s('Prepare', 'Prepare', 'Prepare', 'Prepararse'),
  'home.topic.platform': s('Plateforme', 'Platfòm', 'Platform', 'Plataforma'),

  'home.science.konprann.what': s(
    'Comprendre la science derrière les tremblements de terre en Haïti.',
    'Konprann syans ki dèyè tranblemanntè nan Ayiti.',
    'Understand the science behind earthquakes in Haiti.',
    'Comprender la ciencia detrás de los sismos en Haití.'
  ),
  'home.science.konprann.why': s(
    'Sans bases solides, la préparation reste superficielle — la peur remplace la stratégie.',
    'San baz solid, preparasyon rete sipèfisyèl — krentè ranplase estrateji.',
    'Without solid basics, preparation stays superficial — fear replaces strategy.',
    'Sin bases sólidas, la preparación queda superficial — el miedo reemplaza la estrategia.'
  ),
  'home.science.konprann.haiti': s(
    'Faille EPGF, séisme de 2010, contexte géologique caraïbe — contenu ancré localement.',
    'Fail EPGF, tranblemanntè 2010, kontèks jewolojik Karayib — kontni lokal.',
    'EPGF fault, 2010 quake, Caribbean geology — locally anchored content.',
    'Falla EPGF, sismo 2010, geología caribeña — contenido local.'
  ),
  'home.science.konprann.limits': s(
    'La science explique le risque, pas la date exacte du prochain séisme.',
    'Syans eksplike risk la, pa dat egzak pwochen tranblemanntè a.',
    'Science explains risk, not the exact date of the next earthquake.',
    'La ciencia explica el riesgo, no la fecha exacta del próximo sismo.'
  ),
  'home.science.konprann.impact': s(
    'Module Comprendre → point de départ recommandé pour tous les usagers.',
    'Modil Konprann → pwen depa rekòmande pou tout itilizatè.',
    'Understand module → recommended starting point for all users.',
    'Módulo Comprender → punto de partida recomendado para todos.'
  ),

  'home.science.simile.what': s(
    'Simuler l\'effet d\'un séisme sur sols et constructions.',
    'Simile efè yon tranblemanntè sou tè ak bilding.',
    'Simulate earthquake effects on soils and buildings.',
    'Simular el efecto de un sismo en suelos y edificios.'
  ),
  'home.science.simile.why': s(
    'L\'expérience concrète fixe mieux les réflexes que la lecture seule.',
    'Eksperyans konkrè fikse refleks pi byen pase lekti sèlman.',
    'Hands-on experience fixes reflexes better than reading alone.',
    'La experiencia concreta fija mejor los reflejos que solo leer.'
  ),
  'home.science.simile.haiti': s(
    'Labo (ondes, sols) + Ville (budget, matériaux) = double angle haïtien.',
    'Labo (vag, tè) + Vil (bidjè, materyèl) = doub ang ayisyen.',
    'Lab (waves, soils) + City (budget, materials) = dual Haitian angle.',
    'Lab (ondas, suelos) + Ciudad (presupuesto, materiales) = doble ángulo haitiano.'
  ),
  'home.science.simile.limits': s(
    'Les simulations simplifient la réalité — utiles pour apprendre, pas pour certification.',
    'Similasyon senplifye reyalite — itil pou aprann, pa pou sertifikasyon.',
    'Simulations simplify reality — useful to learn, not for certification.',
    'Las simulaciones simplifican la realidad — útiles para aprender, no certificar.'
  ),
  'home.science.simile.impact': s(
    'Diagnostic → Labo : votre bâtiment peut alimenter un scénario personnalisé.',
    'Dyagnostik → Labo : bilding ou ka nouri yon senaryo pèsonalize.',
    'Diagnostic → Lab: your building can feed a personalized scenario.',
    'Diagnóstico → Lab: su edificio puede alimentar un escenario personalizado.'
  ),

  'home.science.prepare.what': s(
    'Se préparer avant, pendant et après un séisme.',
    'Prepare anvan, pandan ak apre yon tranblemanntè.',
    'Prepare before, during and after an earthquake.',
    'Prepararse antes, durante y después de un sismo.'
  ),
  'home.science.prepare.why': s(
    'Les gestes automatiques sauvent des vies quand les secondes comptent.',
    'Jès otomatik sove lavi lè segonn yo konte.',
    'Automatic gestures save lives when seconds count.',
    'Los gestos automáticos salvan vidas cuando los segundos cuentan.'
  ),
  'home.science.prepare.haiti': s(
    'Bese-Pwoteje-Kenbe, kit d\'urgence, diagnostic parasismique — outils SisAyiti.',
    'Bese-Pwoteje-Kenbe, kit ijans, dyagnostik parasismik — zouti SisAyiti.',
    'Drop-Cover-Hold, emergency kit, seismic diagnostic — SisAyiti tools.',
    'Agáchate-Cúbrete, kit de emergencia, diagnóstico parasísmico — herramientas SisAyiti.'
  ),
  'home.science.prepare.limits': s(
    'La préparation familiale complète, ne remplace pas, les consignes officielles.',
    'Preparasyon fanmi konplete, pa ranplase, konsign ofisyèl yo.',
    'Family preparation complements, does not replace, official guidance.',
    'La preparación familiar complementa, no reemplaza, las consignas oficiales.'
  ),
  'home.science.prepare.impact': s(
    'Après Comprendre + Simile → Prévention et Diagnostic pour passer à l\'action.',
    'Apre Konprann + Simile → Prevansyon ak Dyagnostik pou pase a aksyon.',
    'After Understand + Simulate → Prevention and Diagnostic to take action.',
    'Tras Comprender + Simular → Prevención y Diagnóstico para actuar.'
  ),

  'home.science.platform.what': s(
    'SisAyiti réunit 8 modules interactifs, multilingues (FR/HT/EN/ES), pensés pour la connexion 3G.',
    'SisAyiti rasanble 8 modil entèaktif, miltiling (FR/HT/EN/ES), pou koneksyon 3G.',
    'SisAyiti brings together 8 interactive, multilingual (FR/HT/EN/ES) modules for 3G connectivity.',
    'SisAyiti reúne 8 módulos interactivos, multilingües (FR/HT/EN/ES), pensados para conexión 3G.'
  ),
  'home.science.platform.why': s(
    'Une seule porte d\'entrée pour éducateurs, familles et décideurs locaux.',
    'Yon sèl pòt antre pou edikatè, fanmi ak desizyonè lokal.',
    'A single entry point for educators, families and local decision-makers.',
    'Una sola puerta de entrada para educadores, familias y decisores locales.'
  ),
  'home.science.platform.haiti': s(
    'Données USGS/EMSC, contexte BME/CNBH, campagnes MENFP — ancrage national.',
    'Done USGS/EMSC, kontèks BME/CNBH, kanpay MENFP — rasin nasyonal.',
    'USGS/EMSC data, BME/CNBH context, MENFP campaigns — national grounding.',
    'Datos USGS/EMSC, contexto BME/CNBH, campañas MENFP — anclaje nacional.'
  ),
  'home.science.platform.limits': s(
    'Outil éducatif — pas un système d\'alerte d\'évacuation officiel.',
    'Zouti edikatif — pa yon sistèm alèt evakyasyon ofisyèl.',
    'Educational tool — not an official evacuation alert system.',
    'Herramienta educativa — no un sistema oficial de alerta de evacuación.'
  ),
  'home.science.platform.impact': s(
    'Parcours guidé + modules libres = apprentissage progressif adapté à chaque profil.',
    'Pèkòs gide + modil lib = aprantisaj pwogresif adapte a chak pwofil.',
    'Guided path + free modules = progressive learning for every profile.',
    'Recorrido guiado + módulos libres = aprendizaje progresivo para cada perfil.'
  ),

  'home.cta.start': s('Commencer ici', 'Kòmanse isit la', 'Start here', 'Empezar aquí'),
  'home.hero.cta': s(
    'Commencer par Comprendre',
    'Kòmanse pa Konprann',
    'Start with Understand',
    'Empezar por Comprender'
  ),
  'home.education.title': s(
    'En savoir plus sur la plateforme',
    'Aprann plis sou platfòm nan',
    'Learn more about the platform',
    'Saber más sobre la plataforma'
  ),
  'home.education.hint': s(
    'Science, contexte Haïti et quiz — optionnel',
    'Syans, kontèks Ayiti ak quiz — opsyonèl',
    'Science, Haiti context and quiz — optional',
    'Ciencia, contexto Haití y quiz — opcional'
  ),
  'home.step.surveiller.short': s('Siveye', 'Siveye', 'Monitor', 'Vigilar'),
  'home.tagline': s(
    'Plateforme éducative sur les séismes et les risques naturels',
    'Platfòm edikatif sou tranblemanntè ak risk natirèl',
    'Educational platform on earthquakes and natural risks',
    'Plataforma educativa sobre sismos y riesgos naturales'
  ),
}

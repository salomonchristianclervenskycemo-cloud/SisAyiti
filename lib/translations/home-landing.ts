import type { Lang } from '@/lib/i18n'

type L = Record<Lang, string>
const s = (fr: string, kr: string, en: string, es: string): L => ({ fr, kr, en, es })

export const homeLandingStrings: Record<string, L> = {
  'home.landing.hero.title': s(
    'Comprendre les séismes pour mieux protéger Haïti',
    'Konprann tranblemanntè yo pou pi byen pwoteje Ayiti',
    'Understand earthquakes to better protect Haiti',
    'Comprender los sismos para proteger mejor a Haití'
  ),
  'home.landing.hero.subtitle': s(
    'SisAyiti est une plateforme éducative, scientifique et citoyenne qui aide les Haïtiens à comprendre les séismes, simuler leurs effets et se préparer aux risques naturels.',
    'SisAyiti se yon platfòm edikatif, syantifik ak sitwayen ki ede Ayisyen konprann tranblemanntè, simile efè yo epi prepare pou risk natirèl.',
    'SisAyiti is an educational, scientific and civic platform helping Haitians understand earthquakes, simulate their effects and prepare for natural risks.',
    'SisAyiti es una plataforma educativa, científica y ciudadana que ayuda a los haitianos a comprender los sismos, simular sus efectos y prepararse.'
  ),
  'home.landing.hero.ctaLearn': s('Commencer l\'apprentissage', 'Kòmanse aprann', 'Start learning', 'Empezar a aprender'),
  'home.landing.hero.ctaMap': s('Explorer la carte sismique', 'Eksplore kat sismik la', 'Explore seismic map', 'Explorar mapa sísmico'),
  'home.landing.hero.trust1': s('Données réelles USGS et EMSC', 'Done reyèl USGS ak EMSC', 'Real USGS and EMSC data', 'Datos reales USGS y EMSC'),
  'home.landing.hero.trust2': s('Disponible en FR · HT · EN · ES', 'Disponib an FR · HT · EN · ES', 'Available in FR · HT · EN · ES', 'Disponible en FR · HT · EN · ES'),
  'home.landing.hero.trust3': s('Fonctionnement partiel hors ligne', 'Mache yon pati deyò entènèt', 'Partial offline operation', 'Funcionamiento parcial sin conexión'),

  'home.landing.pillar.comprendre.title': s('COMPRENDRE', 'KONPRANN', 'UNDERSTAND', 'COMPRENDER'),
  'home.landing.pillar.comprendre.desc': s(
    'Apprenez les bases de la sismologie grâce à des animations, des schémas et des contenus interactifs.',
    'Aprann baz sismoloji ak animasyon, chem ak kontni entèaktif.',
    'Learn seismology basics through animations, diagrams and interactive content.',
    'Aprenda los fundamentos de la sismología con animaciones, esquemas y contenido interactivo.'
  ),
  'home.landing.pillar.simuler.title': s('SIMULER', 'SIMILE', 'SIMULATE', 'SIMULAR'),
  'home.landing.pillar.simuler.desc': s(
    'Explorez différents scénarios sismiques et observez leurs impacts sur les bâtiments et les infrastructures.',
    'Eksplore diferan senaryo tranblemanntè epi obsève enpak yo sou bilding ak enfrastrikti.',
    'Explore seismic scenarios and observe impacts on buildings and infrastructure.',
    'Explore escenarios sísmicos y observe sus impactos en edificios e infraestructura.'
  ),
  'home.landing.pillar.preparer.title': s('SE PRÉPARER', 'PREPARE', 'PREPARE', 'PREPARARSE'),
  'home.landing.pillar.preparer.desc': s(
    'Découvrez les gestes qui sauvent et évaluez la vulnérabilité de votre habitation.',
    'Dekouvri jès ki sove lavi epi evalye vilnerabilite kay ou.',
    'Discover life-saving gestures and assess your home\'s vulnerability.',
    'Descubra gestos que salvan vidas y evalúe la vulnerabilidad de su vivienda.'
  ),

  'home.landing.stats.title': s('Le risque sismique en Haïti', 'Risk sismik nan Ayiti', 'Seismic risk in Haiti', 'Riesgo sísmico en Haití'),
  'home.landing.stat.faults.title': s('Grandes failles actives', 'Gwo fay aktif', 'Major active faults', 'Grandes fallas activas'),
  'home.landing.stat.faults.desc': s('EPGF et Septentrionale', 'EPGF ak Septantriyonal', 'EPGF and Septentrional', 'EPGF y Septentrional'),
  'home.landing.stat.quakes.title': s('Séismes majeurs historiques', 'Gwo tranblemanntè istorik', 'Major historical quakes', 'Sismos mayores históricos'),
  'home.landing.stat.quakes.desc': s('Depuis le XVIIIe siècle', 'Depi XVIIIe syèk la', 'Since the 18th century', 'Desde el siglo XVIII'),
  'home.landing.stat.exposed.title': s('Personnes exposées', 'Moun ekspoze', 'People exposed', 'Personas expuestas'),
  'home.landing.stat.exposed.desc': s('Population en zone à risque', 'Popilasyon nan zòn risk', 'Population in risk zones', 'Población en zona de riesgo'),
  'home.landing.stat.buildings.title': s('Bâtiments vulnérables', 'Bilding vilnerab', 'Vulnerable buildings', 'Edificios vulnerables'),
  'home.landing.stat.buildings.desc': s('Construction non parasismique', 'Konstriksyon ki pa parasismik', 'Non-seismic construction', 'Construcción no parasísmica'),

  'home.landing.faults.title': s('Les principales failles actives', 'Prensipal fay aktif yo', 'Main active faults', 'Principales fallas activas'),
  'home.landing.faults.subtitle': s(
    'Haïti est traversée par des structures tectoniques majeures qui génèrent une activité sismique récurrente.',
    'Ayiti travèse pa estrikti tektonik majè ki pwodui aktivite sismik regilye.',
    'Haiti is crossed by major tectonic structures that generate recurring seismic activity.',
    'Haití está atravesada por estructuras tectónicas mayores que generan actividad sísmica recurrente.'
  ),
  'home.landing.fault.epgf': s('Faille Enriquillo-Plantain Garden (EPGF)', 'Fay Enriquillo-Plantain Garden (EPGF)', 'Enriquillo-Plantain Garden Fault (EPGF)', 'Falla Enriquillo-Plantain Garden (EPGF)'),
  'home.landing.fault.epgf.desc': s('Ouest d\'Haïti — séisme de 2010', 'Lwès Ayiti — tranblemanntè 2010', 'Western Haiti — 2010 earthquake', 'Oeste de Haití — sismo de 2010'),
  'home.landing.fault.sept': s('Faille Septentrionale', 'Fay Septantriyonal', 'Septentrional Fault', 'Falla Septentrional'),
  'home.landing.fault.sept.desc': s('Nord d\'Haïti — historique de 1842', 'Nò Ayiti — istwa 1842', 'Northern Haiti — 1842 history', 'Norte de Haití — historia de 1842'),
  'home.landing.fault.legend.epgf': s('EPGF (Enriquillo)', 'EPGF (Enriquillo)', 'EPGF (Enriquillo)', 'EPGF (Enriquillo)'),
  'home.landing.fault.legend.sept': s('Septentrionale', 'Septantriyonal', 'Septentrional', 'Septentrional'),

  'home.landing.timeline.title': s('Chronologie des grands séismes', 'Kwonomoloji gwo tranblemanntè', 'Timeline of major earthquakes', 'Cronología de grandes sismos'),
  'home.landing.timeline.1751.mag': s('M ~7.5', 'M ~7.5', 'M ~7.5', 'M ~7.5'),
  'home.landing.timeline.1751.loc': s('Port-au-Prince', 'Pòtoprens', 'Port-au-Prince', 'Puerto Príncipe'),
  'home.landing.timeline.1751.sum': s('Destruction majeure de la capitale coloniale.', 'Destriksyon majè kapital kolonyal la.', 'Major destruction of the colonial capital.', 'Destrucción mayor de la capital colonial.'),
  'home.landing.timeline.1770.mag': s('M ~7.5', 'M ~7.5', 'M ~7.5', 'M ~7.5'),
  'home.landing.timeline.1770.loc': s('Port-au-Prince', 'Pòtoprens', 'Port-au-Prince', 'Puerto Príncipe'),
  'home.landing.timeline.1770.sum': s('Second grand séisme du XVIIIe siècle à PAP.', 'Dezyèm gwo tranblemanntè XVIIIe syèk la nan PAP.', 'Second major 18th-century quake in PAP.', 'Segundo gran sismo del siglo XVIII en PAP.'),
  'home.landing.timeline.1842.mag': s('Ms ~8.1', 'Ms ~8.1', 'Ms ~8.1', 'Ms ~8.1'),
  'home.landing.timeline.1842.loc': s('Cap-Haïtien', 'Okap', 'Cap-Haïtien', 'Cap-Haïtien'),
  'home.landing.timeline.1842.sum': s('Tsunami documenté — faille Septentrionale.', 'Tsunami dokimante — fay Septantriyonal.', 'Documented tsunami — Septentrional fault.', 'Tsunami documentado — falla Septentrional.'),
  'home.landing.timeline.2010.mag': s('Mw 7.0', 'Mw 7.0', 'Mw 7.0', 'Mw 7.0'),
  'home.landing.timeline.2010.loc': s('Léogâne / PAP', 'Legann / PAP', 'Léogâne / PAP', 'Léogâne / PAP'),
  'home.landing.timeline.2010.sum': s('~300 000 victimes — faille EPGF, foyer peu profond.', '~300 000 viktim — fay EPGF, fokis pa fon.', '~300,000 victims — EPGF fault, shallow focus.', '~300 000 víctimas — falla EPGF, foco superficial.'),
  'home.landing.timeline.2021.mag': s('Mw 7.2', 'Mw 7.2', 'Mw 7.2', 'Mw 7.2'),
  'home.landing.timeline.2021.loc': s('Nippes / Sud', 'Nip / Sid', 'Nippes / South', 'Nippes / Sur'),
  'home.landing.timeline.2021.sum': s('Fort séisme au sud — répliques prolongées.', 'Gwo tranblemanntè nan sid — replik pwolonje.', 'Strong southern quake — prolonged aftershocks.', 'Fuerte sismo al sur — réplicas prolongadas.'),

  'home.landing.live.title': s('Centre de surveillance en direct', 'Sant veyans an dirèk', 'Live monitoring center', 'Centro de vigilancia en vivo'),
  'home.landing.live.badge': s('EN DIRECT', 'AN DIRÈK', 'LIVE', 'EN VIVO'),
  'home.landing.live.lastEvent': s('Dernier événement', 'Dènye evènman', 'Latest event', 'Último evento'),
  'home.landing.live.magnitude': s('Magnitude', 'Magnitid', 'Magnitude', 'Magnitud'),
  'home.landing.live.depth': s('Profondeur', 'Pwofondè', 'Depth', 'Profundidad'),
  'home.landing.live.distance': s('Distance', 'Distans', 'Distance', 'Distancia'),
  'home.landing.live.time': s('Heure', 'Lè', 'Time', 'Hora'),
  'home.landing.live.source': s('Source', 'Sous', 'Source', 'Fuente'),
  'home.landing.live.recent': s('Événements récents', 'Evènman resan', 'Recent events', 'Eventos recientes'),
  'home.landing.live.empty': s('Chargement des données sismiques…', 'Chajman done sismik…', 'Loading seismic data…', 'Cargando datos sísmicos…'),
  'home.landing.live.cta': s('Ouvrir le centre de surveillance', 'Louvri sant veyans la', 'Open monitoring center', 'Abrir centro de vigilancia'),

  'home.landing.modules.title': s('Nos modules interactifs', 'Modil entèaktif nou yo', 'Our interactive modules', 'Nuestros módulos interactivos'),
  'home.landing.modules.subtitle': s(
    'Huit outils complémentaires pour apprendre, simuler, surveiller et agir.',
    'Uit zouti konplemantè pou aprann, simile, siveye ak aji.',
    'Eight complementary tools to learn, simulate, monitor and act.',
    'Ocho herramientas complementarias para aprender, simular, vigilar y actuar.'
  ),
  'home.landing.modules.action': s('Accéder au module', 'Ale nan modil la', 'Open module', 'Abrir módulo'),

  'home.landing.offline.title': s('Fonctionnement hors ligne', 'Mache deyò entènèt', 'Offline operation', 'Funcionamiento sin conexión'),
  'home.landing.offline.desc': s(
    'SisAyiti fonctionne même avec une connexion limitée. Les contenus éducatifs, diagnostics et signalements peuvent rester disponibles hors ligne.',
    'SisAyiti mache menm ak yon koneksyon limite. Kontni edikatif, dyagnostik ak rapò ka rete disponib deyò entènèt.',
    'SisAyiti works even with limited connectivity. Educational content, diagnostics and reports can remain available offline.',
    'SisAyiti funciona incluso con conexión limitada. Contenido educativo, diagnósticos y reportes pueden permanecer disponibles sin conexión.'
  ),
  'home.landing.offline.sync': s('Synchronisation automatique', 'Senkronizasyon otomatik', 'Automatic sync', 'Sincronización automática'),

  'home.landing.sources.title': s('Sources de données', 'Sous done', 'Data sources', 'Fuentes de datos'),

  'home.landing.footer.about': s('À propos', 'Sou nou', 'About', 'Acerca de'),
  'home.landing.footer.docs': s('Documentation', 'Dokimantasyon', 'Documentation', 'Documentación'),
  'home.landing.footer.method': s('Méthodologie scientifique', 'Metodoloji syantifik', 'Scientific methodology', 'Metodología científica'),
  'home.landing.footer.faq': s('FAQ', 'FAQ', 'FAQ', 'FAQ'),
  'home.landing.footer.contact': s('Contact', 'Kontak', 'Contact', 'Contacto'),
  'home.landing.footer.sources': s('Sources de données', 'Sous done', 'Data sources', 'Fuentes de datos'),
  'home.landing.footer.limits': s('Limites du diagnostic', 'Limit dyagnostik', 'Diagnostic limits', 'Límites del diagnóstico'),
  'home.landing.footer.terms': s('Conditions d\'utilisation', 'Kondisyon itilizasyon', 'Terms of use', 'Condiciones de uso'),
  'home.landing.footer.copyright': s(
    '© SisAyiti — Plateforme éducative sur les séismes et les risques naturels en Haïti',
    '© SisAyiti — Platfòm edikatif sou tranblemanntè ak risk natirèl nan Ayiti',
    '© SisAyiti — Educational platform on earthquakes and natural risks in Haiti',
    '© SisAyiti — Plataforma educativa sobre sismos y riesgos naturales en Haití'
  ),
}

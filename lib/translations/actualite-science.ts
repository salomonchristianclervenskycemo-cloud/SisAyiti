import type { Lang } from '@/lib/i18n'

type L = Record<Lang, string>
const s = (fr: string, kr: string, en: string, es: string): L => ({ fr, kr, en, es })

export const actualiteScienceStrings: Record<string, L> = {
  'act.subtitleLong': s(
    'Surveillez l\'activité sismique autour d\'Haïti en temps réel : flux USGS/EMSC, alertes, graphiques et lien direct vers la carte et la prévention.',
    'Siveye aktivite tranblemanntè bò Ayiti an tan reyèl : flux USGS/EMSC, alèt, grafik ak lyen dirèk sou kat ak prevansyon.',
    'Monitor seismic activity around Haiti in real time: USGS/EMSC feed, alerts, charts and direct links to the map and prevention.',
    'Vigile la actividad sísmica alrededor de Haití en tiempo real: flujo USGS/EMSC, alertas, gráficos y enlaces al mapa y prevención.'
  ),

  'act.path.title': s('Parcours surveillance', 'Pèkòs veyans', 'Monitoring path', 'Recorrido de vigilancia'),
  'act.path.hint': s(
    'Consultez un événement, filtrez par catégorie Haïti, puis ouvrez-le sur la carte.',
    'Gade yon evènman, filtre pa kategori Ayiti, epi louvri l sou kat la.',
    'Inspect an event, filter by Haiti category, then open it on the map.',
    'Consulte un evento, filtre por categoría Haití y ábralo en el mapa.'
  ),
  'act.path.progress': s(
    '{events} événement(s) consulté(s) · {filters} filtre(s) testé(s)',
    '{events} evènman konsilte · {filters} filt teste',
    '{events} event(s) inspected · {filters} filter(s) tried',
    '{events} evento(s) consultado(s) · {filters} filtro(s) probado(s)'
  ),
  'act.path.ctaCarte': s('Voir sur la carte', 'Gade sou kat', 'View on map', 'Ver en el mapa'),
  'act.path.ctaComprendre': s('Comprendre les ondes', 'Konprann vag yo', 'Understand waves', 'Comprender ondas'),
  'act.path.ctaPrevention': s('Gestes de protection', 'Jès pwoteksyon', 'Protection gestures', 'Gestos de protección'),

  'act.topic.sources': s('Sources', 'Sous', 'Sources', 'Fuentes'),
  'act.topic.alerts': s('Alertes', 'Alèt', 'Alerts', 'Alertas'),
  'act.topic.haiti': s('Haïti', 'Ayiti', 'Haiti', 'Haití'),
  'act.topic.offline': s('Hors-ligne', 'Deyò entènèt', 'Offline', 'Sin conexión'),

  'act.science.sources.what': s(
    'Agrégation des catalogues USGS (global) et EMSC (Europe/Caraïbes) pour une vue consolidée.',
    'Agregasyon katalòg USGS (mondyal) ak EMSC (Ewope/Karayib) pou yon vi konsole.',
    'Aggregation of USGS (global) and EMSC (Europe/Caribbean) catalogs for a consolidated view.',
    'Agregación de catálogos USGS (global) y EMSC (Europa/Caribe) para una vista consolidada.'
  ),
  'act.science.sources.why': s(
    'Deux sources indépendantes réduisent les angles morts et permettent de recouper magnitude, profondeur et localisation.',
    'De sous endepandan diminye twou yo epi pèmèt verifye magnitid, pwofondè ak kote.',
    'Two independent sources reduce blind spots and allow cross-checking magnitude, depth and location.',
    'Dos fuentes independientes reducen puntos ciegos y permiten contrastar magnitud, profundidad y ubicación.'
  ),
  'act.science.sources.haiti': s(
    'Filtre « Zone Haïti » : événements dans le bassin caraïbe + Hispaniola — priorité pour les usagers SisAyiti.',
    'Filt « Zòn Ayiti » : evènman nan basen Karayib + Ispayola — priyorite pou itilizatè SisAyiti.',
    '« Haiti zone » filter: events in the Caribbean + Hispaniola basin — priority for SisAyiti users.',
    'Filtro « Zona Haití »: eventos en la cuenca caribeña + La Española — prioridad para usuarios SisAyiti.'
  ),
  'act.science.sources.limits': s(
    'Magnitudes et profondeurs peuvent différer légèrement entre USGS et EMSC avant révision.',
    'Magnitid ak pwofondè ka diferan yon ti kras ant USGS ak EMSC anvan revizyon.',
    'Magnitudes and depths may differ slightly between USGS and EMSC before revision.',
    'Magnitudes y profundidades pueden diferir levemente entre USGS y EMSC antes de revisión.'
  ),
  'act.science.sources.impact': s(
    'Un M≥5 proche d\'Haïti affiché ici mérite vérification sur la carte et rappel des gestes BPK.',
    'Yon M≥5 pre Ayiti isit la merite verifye sou kat la ak raple jès BPK.',
    'M≥5 near Haiti shown here deserves map check and BPK gesture reminder.',
    'Un M≥5 cerca de Haití aquí merece verificación en el mapa y recordatorio de gestos BPK.'
  ),

  'act.science.alerts.what': s(
    'Panneau d\'alertes : séismes récents à magnitude ou risque élevés nécessitant attention.',
    'Panno alèt : tranblemanntè resan ak magnitid oswa risk wo ki bezwen atansyon.',
    'Alerts panel: recent quakes with high magnitude or risk needing attention.',
    'Panel de alertas: sismos recientes con magnitud o riesgo alto que requieren atención.'
  ),
  'act.science.alerts.why': s(
    'Trier le bruit (micro-séismes) des événements significatifs pour les décideurs et le grand public.',
    'Separe bri (mikwo-seism) ak evènman enpòtan pou desizyonè ak piblik la.',
    'Separate noise (micro-quakes) from significant events for decision-makers and the public.',
    'Separar ruido (microsismos) de eventos significativos para decisores y el público.'
  ),
  'act.science.alerts.haiti': s(
    'Tsunami possible (côte sud) : badge dédié — montez en altitude après fort séisme côtier.',
    'Tsunami posib (kòt sid) : badj dedye — monte pi wo apre gwo sekou sou kòt.',
    'Possible tsunami (south coast): dedicated badge — go uphill after strong coastal quake.',
    'Tsunami posible (costa sur): insignia dedicada — suba tras fuerte sismo costero.'
  ),
  'act.science.alerts.limits': s(
    'Ce tableau n\'émet pas d\'alertes officielles d\'évacuation — suivez autorités haïtiennes et radio.',
    'Tablo sa a pa bay alèt evakyasyon ofisyèl — swiv otorite ayisyen ak radyo.',
    'This dashboard does not issue official evacuation alerts — follow Haitian authorities and radio.',
    'Este panel no emite alertas oficiales de evacuación — siga autoridades haitianas y radio.'
  ),
  'act.science.alerts.impact': s(
    'Alerte M≥6 en Haïti → ouvrir sur la carte + module Prévention (phase PENDANT).',
    'Alèt M≥6 nan Ayiti → louvri sou kat + modil Prevansyon (faz PANDAN).',
    'M≥6 alert in Haiti → open on map + Prevention module (DURING phase).',
    'Alerta M≥6 en Haití → abrir en mapa + módulo Prevención (fase DURANTE).'
  ),

  'act.science.haiti.what': s(
    'KPI « Haïti 24 h » et filtre régional : activité dans la zone d\'intérêt nationale.',
    'KPI « Ayiti 24 è » ak filt rejyon : aktivite nan zòn enterè nasyonal.',
    '« Haiti 24 h » KPI and regional filter: activity in the national interest zone.',
    'KPI « Haití 24 h » y filtro regional: actividad en la zona de interés nacional.'
  ),
  'act.science.haiti.why': s(
    'Un séisme en République dominicaine ou en mer peut être ressenti en Haïti — la surveillance élargie aide à contextualiser.',
    'Yon tranblemanntè nan Dominikani oswa lanmè ka santi nan Ayiti — veyans elaji ede kon tekstualize.',
    'A quake in Dominican Republic or at sea may be felt in Haiti — broader monitoring helps contextualize.',
    'Un sismo en República Dominicana o en el mar puede sentirse en Haití — la vigilancia amplia ayuda a contextualizar.'
  ),
  'act.science.haiti.haiti': s(
    'Catégorie « Historique » : grands séismes 2010, 2021, 1842… toujours accessibles pour l\'éducation.',
    'Kategori « Istorik » : gwo tranblemanntè 2010, 2021, 1842… toujou aksesib pou edikasyon.',
    '« History » category: major 2010, 2021, 1842 quakes… always accessible for education.',
    'Categoría « Histórico »: grandes sismos 2010, 2021, 1842… siempre accesibles para educación.'
  ),
  'act.science.haiti.limits': s(
    'La zone filtrée est une approximation géographique, pas une frontière administrative exacte.',
    'Zòn filtre a se yon apwokimasyon jewografik, pa yon fwontyè administratif egzak.',
    'Filtered zone is a geographic approximation, not an exact administrative boundary.',
    'La zona filtrada es una aproximación geográfica, no una frontera administrativa exacta.'
  ),
  'act.science.haiti.impact': s(
    'Comparer flux Actualité (liste) + Carte (géographie) = compréhension complète d\'un événement.',
    'Konpare flux Aktualite (lis) + Kat (jewografi) = konpreyansyon konplè sou yon evènman.',
    'Compare News feed (list) + Map (geography) = full understanding of an event.',
    'Comparar flujo Actualidad (lista) + Mapa (geografía) = comprensión completa del evento.'
  ),

  'act.science.offline.what': s(
    'Cache local des derniers événements — le tableau reste utilisable sans connexion stable.',
    'Tampon lokal dènye evènman — tablo a rete itil san koneksyon estab.',
    'Local cache of latest events — dashboard stays usable without stable connection.',
    'Caché local de últimos eventos — el panel sigue usable sin conexión estable.'
  ),
  'act.science.offline.why': s(
    'En Haïti, connexion 3G intermittente : mode dégradé affiche la dernière sync enregistrée.',
    'Nan Ayiti, 3G entèmitan : mòd degrade montre dènye senkronizasyon anrejistre.',
    'In Haiti, intermittent 3G: degraded mode shows last saved sync.',
    'En Haití, 3G intermitente: modo degradado muestra la última sincronización guardada.'
  ),
  'act.science.offline.haiti': s(
    'Pack éducation hors-ligne SisAyiti complète la surveillance pour les zones mal connectées.',
    'Pak edikasyon deyò entènèt SisAyiti konplete veyans pou zòn ki pa byen konekte.',
    'SisAyiti offline education pack complements monitoring for poorly connected areas.',
    'El paquete educativo offline de SisAyiti complementa la vigilancia en zonas mal conectadas.'
  ),
  'act.science.offline.limits': s(
    'Sans réseau, pas de nouveaux séismes en direct — vérifiez l\'heure de dernière mise à jour.',
    'San rezo, pa gen nouvo tranblemanntè an dirèk — verifye lè dènye mizajou a.',
    'Without network, no new live quakes — check last update time.',
    'Sin red, no hay nuevos sismos en vivo — verifique la hora de última actualización.'
  ),
  'act.science.offline.impact': s(
    'Avant une coupure : synchronisez, notez les alertes, gardez le module Prévention accessible.',
    'Anvan yon koupe : senkronize, note alèt yo, kenbe modil Prevansyon aksesib.',
    'Before outage: sync, note alerts, keep Prevention module accessible.',
    'Antes de un corte: sincronice, anote alertas, mantenga accesible el módulo Prevención.'
  ),

  'act.education.title': s(
    'Guide pédagogique',
    'Gid pedagojik',
    'Learning guide',
    'Guía pedagógica'
  ),

  'act.cta.prevention': s(
    'Séisme récent détecté ? Passez aux gestes Bese-Pwoteje-Kenbe',
    'Detekte tranblemanntè resan ? Ale nan jès Bese-Pwoteje-Kenbe',
    'Recent quake detected? Go to Drop-Cover-Hold On gestures',
    '¿Sismo reciente detectado? Vaya a los gestos Agáchate-Cúbrete-Agárrate'
  ),
}

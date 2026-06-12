import type { Lang } from '@/lib/i18n'

type L = Record<Lang, string>
const s = (fr: string, kr: string, en: string, es: string): L => ({ fr, kr, en, es })

export const carteScienceStrings: Record<string, L> = {
  'carte.guide.title': s('Guide de la carte', 'Gid kat la', 'Map guide', 'Guía del mapa'),
  'carte.guide.close': s('Fermer', 'Fèmen', 'Close', 'Cerrar'),

  'carte.subtitleLong': s(
    'Visualisez les séismes autour d\'Haïti en temps réel (USGS/EMSC), les failles actives et les événements historiques majeurs — reliez chaque point à ce que vous avez appris dans Comprendre et le Labo.',
    'Gade tranblemanntè yo bò Ayiti an tan reyèl (USGS/EMSC), fay aktif yo ak gwo evènman istorik — konekte chak pwen ak sa ou te aprann nan Konprann ak Labo.',
    'View earthquakes around Haiti in real time (USGS/EMSC), active faults and major historical events — connect each point to what you learned in Understand and the Lab.',
    'Visualice sismos alrededor de Haití en tiempo real (USGS/EMSC), fallas activas y eventos históricos — conecte cada punto con lo aprendido en Comprender y el Labo.'
  ),

  'carte.path.title': s('Parcours carte sismique', 'Pèkòs kat tranblemanntè', 'Seismic map path', 'Recorrido mapa sísmico'),
  'carte.path.hint': s(
    'Cliquez un séisme sur la carte, activez les failles, puis testez vos connaissances.',
    'Klike sou yon tranblemanntè sou kat la, aktive fay yo, epi teste konesans ou.',
    'Click an earthquake on the map, enable faults, then test your knowledge.',
    'Haga clic en un sismo en el mapa, active las fallas y pruebe sus conocimientos.'
  ),
  'carte.path.progress': s(
    '{events} événement(s) exploré(s) · guide {guide}',
    '{events} evènman eksplore · gid {guide}',
    '{events} event(s) explored · guide {guide}',
    '{events} evento(s) explorado(s) · guía {guide}'
  ),
  'carte.path.guideOpened': s('consulté', 'konsilte', 'opened', 'consultado'),
  'carte.path.guideNotOpened': s('pas encore ouvert', 'poko louvri', 'not yet opened', 'aún no abierto'),
  'carte.path.ctaComprendre': s('Failles & ondes', 'Fay & vag', 'Faults & waves', 'Fallas y ondas'),
  'carte.path.ctaLabo': s('Simuler l\'impact', 'Simile enpak', 'Simulate impact', 'Simular impacto'),
  'carte.path.ctaPrevention': s('Gestes de protection', 'Jès pwoteksyon', 'Protection gestures', 'Gestos de protección'),
  'carte.path.ctaActualite': s('Tableau surveillance', 'Tablo veyans', 'Surveillance dashboard', 'Panel de vigilancia'),

  'carte.topic.magnitude': s('Magnitude', 'Magnitid', 'Magnitude', 'Magnitud'),
  'carte.topic.depth': s('Profondeur', 'Pwofondè', 'Depth', 'Profundidad'),
  'carte.topic.faults': s('Failles', 'Fay', 'Faults', 'Fallas'),
  'carte.topic.realtime': s('Temps réel', 'Tan reyèl', 'Real-time', 'Tiempo real'),

  'carte.historical.title': s('Événements majeurs Haïti', 'Gwo evènman Ayiti', 'Major Haiti events', 'Eventos mayores Haití'),
  'carte.historical.locate': s('Localiser sur la carte', 'Montre sou kat la', 'Locate on map', 'Localizar en el mapa'),

  'carte.historical.2010': s(
    'Mw 7,0 à Léogâne — ~300 000 morts. Foyer peu profond (13 km) + sol meuble PAP = catastrophe malgré magnitude « modérée ».',
    'Mw 7,0 Legann — ~300 000 moun mouri. Fokis pa fon (13 km) + tè meb PAP = katastwòf.',
    'Mw 7.0 at Léogâne — ~300,000 deaths. Shallow focus (13 km) + soft PAP soil = catastrophe despite « moderate » magnitude.',
    'Mw 7,0 en Léogâne — ~300 000 muertos. Foco superficial (13 km) + suelo blando PAP = catástrofe.'
  ),
  'carte.historical.2021': s(
    'Mw 7,2 Nippes — plus fort que 2010 mais zone moins urbanisée. Répliques pendant des semaines.',
    'Mw 7,2 Nip — pi fò pase 2010 men mwens ibenize. Replik pandan semèn.',
    'Mw 7.2 Nippes — stronger than 2010 but less urbanized. Aftershocks for weeks.',
    'Mw 7,2 Nippes — más fuerte que 2010 pero menos urbanizado. Réplicas por semanas.'
  ),
  'carte.historical.1842': s(
    'Ms 8,1 Cap-Haïtien — faille septentrionale. Tsunami documenté. Rappel : Haïti a une histoire sismique longue.',
    'Ms 8,1 Okap — fay septantriyonal. Tsunami dokimante.',
    'Ms 8.1 Cap-Haïtien — Septentrional fault. Documented tsunami. Haiti has a long seismic history.',
    'Ms 8,1 Cap-Haïtien — falla septentrional. Tsunami documentado.'
  ),

  'carte.faults.banner': s(
    'Activez la couche « Failles actives » : Enriquillo-Plantain Garden (EPGF) traverse l\'ouest ; Septentrionale au nord.',
    'Aktive kouch « Fay aktif » : Enriquillo-Plantain Garden (EPGF) travèse lwès ; Septantriyonal nan nò.',
    'Enable « Active faults » layer: Enriquillo-Plantain Garden (EPGF) crosses the west; Septentrional to the north.',
    'Active la capa « Fallas activas »: Enriquillo-Plantain Garden (EPGF) cruza el oeste; Septentrional al norte.'
  ),

  'carte.science.magnitude.what': s(
    'La taille des cercles sur la carte reflète la magnitude (Mw) — plus le cercle est grand, plus l\'énergie à la source est forte.',
    'Gwosè sèk sou kat la reflete magnitid (Mw) — pi gwo sèk, pi fò enèji nan sous la.',
    'Circle size on the map reflects magnitude (Mw) — larger circle means more energy at the source.',
    'El tamaño de los círculos refleja la magnitud (Mw) — círculo mayor = más energía en el foco.'
  ),
  'carte.science.magnitude.why': s(
    'Mw mesure l\'énergie libérée, pas les dégâts locaux — un M5 proche peut faire plus de dégâts qu\'un M7 lointain.',
    'Mw mezire enèji, pa domaj lokal — yon M5 pre ka fè plis domaj pase yon M7 lwen.',
    'Mw measures released energy, not local damage — a nearby M5 can cause more damage than a distant M7.',
    'Mw mide energía liberada, no daños locales — un M5 cercano puede dañar más que un M7 lejano.'
  ),
  'carte.science.magnitude.haiti': s(
    '2010 : Mw 7,0 affiché en rouge critique — repérez-le toujours sur la carte (événement historique épinglé).',
    '2010 : Mw 7,0 an wouj kritik — toujou sou kat la (evènman istorik.',
    '2010: Mw 7.0 shown in critical red — always pinned on the map (historical event).',
    '2010: Mw 7,0 en rojo crítico — siempre fijado en el mapa (evento histórico).'
  ),
  'carte.science.magnitude.limits': s(
    'Les micro-séismes (M<3) sont souvent filtrés — ajustez le seuil dans les filtres en bas.',
    'Mikwo tranblemanntè (M<3) souvan filtre — ajiste nan filt yo anba.',
    'Micro-quakes (M<3) are often filtered — adjust threshold in bottom filters.',
    'Microsismos (M<3) a menudo filtrados — ajuste el umbral en los filtros inferiores.'
  ),
  'carte.science.magnitude.impact': s(
    'Comparer distance + magnitude d\'un événement avec votre position aide à estimer l\'intensité ressentie.',
    'Konpare distans + magnitid yon evènman ak pozisyon ou ede estime entansite santi.',
    'Comparing event distance + magnitude with your position helps estimate felt intensity.',
    'Comparar distancia + magnitud del evento con su posición ayuda a estimar intensidad sentida.'
  ),

  'carte.science.depth.what': s(
    'La couleur des points indique la profondeur du foyer : peu profond (0–30 km) = plus destructeur en surface.',
    'Koulè pwen yo montre pwofondè fokis : pa fon (0–30 km) = pi destriktif sou sifas.',
    'Point color indicates focal depth: shallow (0–30 km) = more destructive at surface.',
    'El color indica profundidad del foco: superficial (0–30 km) = más destructivo en superficie.'
  ),
  'carte.science.depth.why': s(
    'Un séisme peu profond libère son énergie plus près des bâtiments — le 2010 était à 13 km.',
    'Tranblemanntè pa fon lage enèji pi pre bilding — 2010 te nan 13 km.',
    'A shallow quake releases energy closer to buildings — 2010 was at 13 km.',
    'Un sismo superficial libera energía más cerca de los edificios — 2010 fue a 13 km.'
  ),
  'carte.science.depth.haiti': s(
    'Haïti est une zone de subduction et de failles transformantes — séismes peu à moyennement profonds dominent.',
    'Ayiti se zòn subduksyon ak fay transfòmasyon — tranblemanntè pa fon rive mwayen domine.',
    'Haiti is a subduction and transform fault zone — shallow to intermediate quakes dominate.',
    'Haití es zona de subducción y fallas transformantes — sismos superficiales a intermedios dominan.'
  ),
  'carte.science.depth.limits': s(
    'La profondeur USGS peut être révisée après analyse — vérifiez la fiche officielle.',
    'Pwofondè USGS ka revise apre analiz — verifye fich ofisyèl la.',
    'USGS depth may be revised after analysis — check the official report.',
    'La profundidad USGS puede revisarse — consulte la ficha oficial.'
  ),
  'carte.science.depth.impact': s(
    'Séisme peu profond + sol meuble (couche liquéfaction) = combo le plus dangereux pour PAP.',
    'Tranblemanntè pa fon + tè meb (kouch likifaksyon) = konbo ki pi danjere pou PAP.',
    'Shallow quake + soft soil (liquefaction layer) = most dangerous combo for PAP.',
    'Sismo superficial + suelo blando (capa licuefacción) = combo más peligroso para PAP.'
  ),

  'carte.science.faults.what': s(
    'Les failles Enriquillo-Plantain Garden (sud-ouest) et Septentrionale (nord) concentrent le risque sismique haïtien.',
    'Fay Enriquillo-Plantain Garden (sidwès) ak Septantriyonal (nò) konsantre risk tranblemanntè ayisyen.',
    'Enriquillo-Plantain Garden (southwest) and Septentrional (north) faults concentrate Haitian seismic risk.',
    'Las fallas Enriquillo-Plantain Garden (sudoeste) y Septentrional (norte) concentran el riesgo sísmico haitiano.'
  ),
  'carte.science.faults.why': s(
    'L\'EPGF a rupturé en 2010 — elle accumule encore du stress ; la Septentrionale menace le nord (Cap-Haïtien 1842).',
    'EPGF te kase an 2010 — li toujou akimile estrès ; Septantriyonal menase nò (Okap 1842).',
    'EPGF ruptured in 2010 — still accumulating stress; Septentrional threatens the north (Cap-Haïtien 1842).',
    'La EPGF rompió en 2010 — aún acumula estrés; la Septentrional amenaza el norte (Cap-Haïtien 1842).'
  ),
  'carte.science.faults.haiti': s(
    'Activez la couche « Failles » dans la barre d\'outils — comparez avec la carte du module Comprendre.',
    'Aktive kouch « Fay » nan ba zouti — konpare ak kat modil Konprann lan.',
    'Enable « Faults » layer in toolbar — compare with the Understand module map.',
    'Active la capa « Fallas » en la barra de herramientas — compare con el mapa de Comprender.'
  ),
  'carte.science.faults.limits': s(
    'Position des failles simplifiée à l\'échelle pédagogique — pas un relevé géologique de terrain.',
    'Pozisyon fay senpifye pou pedagoji — pa yon etid jewolojik teren.',
    'Fault positions simplified for teaching — not a field geological survey.',
    'Posiciones de fallas simplificadas para pedagogía — no es un estudio geológico de campo.'
  ),
  'carte.science.faults.impact': s(
    'Vivre à <20 km d\'une faille active = priorité absolue pour diagnostic et renforcement du bâtiment.',
    'Abite <20 km nan yon fay aktif = priyorite absoli pou dyagnostik ak ranfòsman bilding.',
    'Living <20 km from an active fault = top priority for building diagnostic and reinforcement.',
    'Vivir a <20 km de una falla activa = prioridad absoluta para diagnóstico y refuerzo del edificio.'
  ),

  'carte.science.realtime.what': s(
    'Les données USGS et EMSC alimentent la carte — badge ACTIF = flux temps réel connecté.',
    'Done USGS ak EMSC nourri kat la — badge AKTIF = flux tan reyèl konekte.',
    'USGS and EMSC data feed the map — ACTIVE badge = real-time stream connected.',
    'Datos USGS y EMSC alimentan el mapa — insignia ACTIVO = flujo en tiempo real conectado.'
  ),
  'carte.science.realtime.why': s(
    'La surveillance permet d\'alerter rapidement — mais en Haïti, le temps d\'alerte peut être très court (<10 s).',
    'Veyans pèmèt alète vit — men nan Ayiti, tan alèt ka trè kout (<10 s).',
    'Monitoring enables rapid alerts — but in Haiti, warning time can be very short (<10 s).',
    'La vigilancia permite alertar rápido — pero en Haití, el tiempo de alerta puede ser muy corto (<10 s).'
  ),
  'carte.science.realtime.haiti': s(
    'Module Actualité = tableau détaillé ; Carte = vue géographique — les deux se complètent.',
    'Modil Aktualite = tablo detaye ; Kat = vi jewografik — yo konplete youn lòt.',
    'News module = detailed dashboard; Map = geographic view — they complement each other.',
    'Módulo Actualidad = panel detallado; Mapa = vista geográfica — se complementan.'
  ),
  'carte.science.realtime.limits': s(
    'Connexion 3G instable = mode dégradé avec cache local et sync différée.',
    'Koneksyon 3G enstab = mòd degrade ak cache lokal.',
    'Unstable 3G = degraded mode with local cache and deferred sync.',
    'Conexión 3G inestable = modo degradado con caché local.'
  ),
  'carte.science.realtime.impact': s(
    'Un séisme M≥5 en Haïti : consultez la carte, puis passez au module Prévention (mode crise).',
    'Tranblemanntè M≥5 nan Ayiti : gade kat la, epi ale nan modil Prevansyon (mòd kriz).',
    'M≥5 quake in Haiti: check the map, then go to Prevention module (crisis mode).',
    'Sismo M≥5 en Haití: consulte el mapa, luego vaya al módulo Prevención (modo crisis).'
  ),

  'carte.cta.prevention': s(
    'Un séisme vient de se produire ? Passez aux gestes Bese-Pwoteje-Kenbe',
    'Gen yon tranblemanntè ? Ale nan jès Bese-Pwoteje-Kenbe',
    'Earthquake just happened? Go to Drop-Cover-Hold On gestures',
    '¿Acaba de ocurrir un sismo? Vaya a los gestos Agáchate-Cúbrete-Agárrate'
  ),
}

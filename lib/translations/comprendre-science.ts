import type { Lang } from '@/lib/i18n'

type L = Record<Lang, string>

const s = (fr: string, kr: string, en: string, es: string): L => ({ fr, kr, en, es })

export const comprendreScienceStrings: Record<string, L> = {
  // Chapitres (ordre pédagogique — priorité citoyen haïtien)
  'comp.ch0.title': s(
    'Pourquoi Haïti tremble',
    'Poukisa Ayiti tranble',
    'Why Haiti shakes',
    'Por qué Haití tiembla'
  ),
  'comp.ch0.intro': s(
    'Haïti n\'est pas « malchanceuse » : elle se trouve à la croisée de deux grandes plaques et de failles actives qui accumulent de l\'énergie depuis des siècles.',
    'Ayiti pa « malchans » : li chita kote de gwo plak ak fay aktif rankontre, e yo ap chita anpil enèji depi plizyè syèk.',
    'Haiti is not “unlucky”: it sits where two major plates and active faults meet, storing energy for centuries.',
    'Haití no es “desafortunada”: está donde dos placas y fallas activas acumulan energía desde hace siglos.'
  ),
  'comp.ch1.title': s(
    'Notre histoire sismique',
    'Istwa tranblemanntè nou',
    'Our seismic history',
    'Nuestra historia sísmica'
  ),
  'comp.ch2.title': s(
    'Magnitude et ce que vous ressentez',
    'Magnitid ak sa ou santi',
    'Magnitude and what you feel',
    'Magnitud y lo que usted siente'
  ),
  'comp.ch3.title': s(
    'Quelques secondes pour Bese',
    'Kèk segonn pou Bese',
    'Seconds to Drop — act',
    'Segundos para agacharse'
  ),
  'comp.ch4.title': s(
    'Le sol sous vos pieds',
    'Tè anba pye ou',
    'The ground beneath you',
    'El suelo bajo sus pies'
  ),
  'comp.ch5.title': s(
    'Après le grand choc',
    'Apre gwo chòk la',
    'After the main shock',
    'Después del gran choque'
  ),
  'comp.ch6.title': s(
    'Approfondir — science et construction',
    'Ale pi fon — syans ak konstriksyon',
    'Go deeper — science & building',
    'Profundizar — ciencia y construcción'
  ),

  // Science callout labels
  'comp.science.what': s('Ce que c\'est', 'Kisa li ye', 'What it is', 'Qué es'),
  'comp.science.why': s('Pourquoi c\'est important', 'Poukisa li enpòtan', 'Why it matters', 'Por qué importa'),
  'comp.science.haiti': s('En Haïti', 'Nan Ayiti', 'In Haiti', 'En Haití'),
  'comp.science.limits': s('Limites', 'Limit', 'Limits', 'Límites'),
  'comp.science.impact': s('Impact pour vous', 'Enpak pou ou', 'Impact on you', 'Impacto para usted'),

  // Ch0 callout
  'comp.ch0.what': s(
    'Des failles actives traversent le pays : l\'Enriquillo-Plantain Garden (sud) et la Septentrionale (nord). Les blocs tectoniques glissent de quelques millimètres par an mais les failles bloquent ce mouvement.',
    'Gen fay aktif ki travèse peyi a : Enriquillo-Plantain Garden (sid) ak Septantriyonal (nò). Blòk tektonik yo ap glise kèk milimèt pa ane men fay yo bloke mouvman an.',
    'Active faults cross the country: Enriquillo-Plantain Garden (south) and Septentrional (north). Tectonic blocks move millimeters per year but faults lock that motion.',
    'Fallas activas cruzan el país: Enriquillo-Plantain Garden (sur) y Septentrional (norte). Los bloques se mueven milímetros por año pero las fallas bloquean ese movimiento.'
  ),
  'comp.ch0.why': s(
    'L\'énergie bloquée s\'accumule jusqu\'à rupture brutale → séisme. Plus l\'attente est longue, plus la rupture peut être forte.',
    'Lè fay la bloke, enèji anpile jiskaske li kase → tranblemanntè. Plis tan pase, plis chòk la ka fò.',
    'Locked energy builds until sudden rupture → earthquake. Longer wait can mean a stronger break.',
    'La energía bloqueada crece hasta la ruptura → sismo. Más tiempo puede significar un choque más fuerte.'
  ),
  'comp.ch0.haiti': s(
    'Port-au-Prince et Léogâne sont proches de l\'EPGF ; Cap-Haïtien est menacé par la Septentrionale. Deux systèmes indépendants = risque sur tout le territoire.',
    'Pòtoprens ak Legann tou pre EPGF ; Kap Ayisyen anba menas Fay Septantriyonal la. De sistèm = danje sou tout peyi a.',
    'Port-au-Prince and Léogâne lie near the EPGF; Cap-Haïtien faces the Septentrional fault. Two systems = risk nationwide.',
    'Puerto Príncipe y Léogâne están cerca de la EPGF; Cap-Haitiano enfrenta la Septentrional. Dos sistemas = riesgo en todo el país.'
  ),
  'comp.ch0.limits': s(
    'On ne peut pas prédire la date du prochain séisme. Les cartes montrent des zones à risque, pas des heures précises.',
    'Nou pa ka predi ki jou pwochen tranblemanntè a. Kat yo montre zòn ki gen danje, pa lè egzak.',
    'We cannot predict the exact date of the next earthquake. Maps show hazard zones, not exact times.',
    'No podemos predecir la fecha exacta del próximo sismo. Los mapas muestran zonas de riesgo, no horas precisas.'
  ),
  'comp.ch0.impact': s(
    'Savoir où sont les failles aide à comprendre pourquoi la prévention (bâtiment + comportement) est indispensable, pas optionnelle.',
    'Konnen kote fay yo ye ede w konprann poukisa prevansyon (bilding + konduit) obligatwa, pa opsyonèl.',
    'Knowing fault locations helps you see why prevention (buildings + behavior) is essential, not optional.',
    'Saber dónde están las fallas ayuda a entender por qué la prevención (edificios + conducta) es esencial.'
  ),

  // Fault map
  'comp.faultMap.aria': s('Carte simplifiée des failles actives en Haïti', 'Kat senp fay aktif Ayiti', 'Simplified Haiti active fault map', 'Mapa simplificado de fallas activas en Haití'),
  'comp.faultMap.pap': s('PAP', 'Pòtoprens', 'PAP', 'PAP'),
  'comp.faultMap.leogane': s('Léogâne', 'Legann', 'Léogâne', 'Léogâne'),
  'comp.faultMap.cap': s('Cap-H.', 'Kap', 'Cap-H.', 'Cap-H.'),

  // History panel
  'comp.history.hint': s('Choisissez une date — lisez le contexte, les dégâts et la leçon pour aujourd\'hui', 'Chwazi yon dat — li kontèks, domaj ak leson pou jodi a', 'Pick a date — read context, damage, and today\'s lesson', 'Elija una fecha — contexto, daños y lección actual'),
  'comp.history.tabContext': s('Contexte', 'Kontèks', 'Context', 'Contexto'),
  'comp.history.tabDamages': s('Dégâts', 'Domaj', 'Damage', 'Daños'),
  'comp.history.tabLesson': s('Leçon', 'Leson', 'Lesson', 'Lección'),
  'comp.history.tabLimits': s('Limites', 'Limit', 'Limits', 'Límites'),

  // Events 1751-2021
  'comp.ev.1751.fault': s('Zone Port-au-Prince', 'Zòn Pòtoprens', 'Port-au-Prince area', 'Zona Puerto Príncipe'),
  'comp.ev.1751.context': s('21 novembre 1751 : séisme majeur peu après la fondation de Port-au-Prince. La ville coloniale en pierre subit des destructions importantes.', '21 novanm 1751 : gwo tranblemanntè kèk tan apre fondasyon Pòtoprens. Vil kolonyal an wòch sibi gwo domaj.', '21 November 1751: major quake soon after Port-au-Prince was founded. Stone colonial buildings were heavily damaged.', '21 de noviembre de 1751: gran sismo poco después de fundar Puerto Príncipe. Edificios coloniales de piedra muy dañados.'),
  'comp.ev.1751.damages': s('Édifices effondrés, pertes humaines significatives pour l\'époque. Les constructions rigides en maçonnerie se sont montrées inadaptées.', 'Bilding tonbe, anpil moun mouri pou epòk la. Bilding rijid an masonri pa t reziste.', 'Buildings collapsed, significant casualties for the era. Rigid masonry proved unsuitable.', 'Edificios colapsados, muchas víctimas para la época. Mampostería rígida inadecuada.'),
  'comp.ev.1751.lesson': s('Haïti a connu de grands séismes bien avant 2010. La fragilité du bâti est un problème ancien.', 'Ayiti te deja gen gwo tranblemanntè anvan 2010. Fèblès bilding yo se yon pwoblèm ansyen.', 'Haiti had major quakes long before 2010. Fragile construction is an old problem.', 'Haití tuvo grandes sismos mucho antes de 2010. La fragilidad constructiva es antigua.'),
  'comp.ev.1751.limits': s('Magnitude estimée ~6,6 (catalogues historiques, pas d\'instruments modernes).', 'Magnitid estime ~6,6 (katalòg istorik, pa gen enstriman modèn).', 'Estimated magnitude ~6.6 (historical catalogs, no modern instruments).', 'Magnitud estimada ~6,6 (catálogos históricos, sin instrumentos modernos).'),

  'comp.ev.1770.fault': s('Faille proche de Port-au-Prince', 'Fay tou pre Pòtoprens', 'Fault near Port-au-Prince', 'Falla cerca de Puerto Príncipe'),
  'comp.ev.1770.context': s('3 juin 1770 : un séisme encore plus fort frappe la capitale, 19 ans après 1751. Preuve que la zone peut produire des événements répétés.', '3 jen 1770 : yon tranblemanntè pi fò frape kapital la, 19 an apre 1751. Prèv zòn nan ka repete.', '3 June 1770: an even stronger quake hits the capital, 19 years after 1751. Proof the zone can repeat.', '3 de junio de 1770: un sismo aún más fuerte golpea la capital, 19 años después de 1751.'),
  'comp.ev.1770.damages': s('Nouvelle destruction de Port-au-Prince. Récurrence rapide = la menace ne disparaît pas après un seul séisme.', 'Pòtoprens detwi ankò. Repetisyon rapid = danje a pa fini apre yon sèl tranblemanntè.', 'Port-au-Prince destroyed again. Quick recurrence = danger does not end after one quake.', 'Puerto Príncipe destruido de nuevo. Recurrencia rápida = el peligro no termina con un solo sismo.'),
  'comp.ev.1770.lesson': s('Ne pas croire qu\'« après un grand séisme, c\'est fini ». D\'autres peuvent suivre dans la même région.', 'Pa kwè « apre yon gwo tranblemanntè, sa fini ». Lòt ka vini nan menm zòn nan.', 'Do not assume “after one big quake, it’s over.” More can follow in the same region.', 'No crea que “después de un gran sismo, terminó.” Pueden seguir más en la misma zona.'),
  'comp.ev.1770.limits': s('Mw estimé ~7,5 ; chiffres de victimes historiques incertains.', 'Mw estime ~7,5 ; kantite moun mouri pa klè.', 'Estimated Mw ~7.5; casualty figures uncertain.', 'Mw estimado ~7,5; cifras de víctimas inciertas.'),

  'comp.ev.1842.fault': s('Faille Septentrionale', 'Fay Septantriyonal', 'Septentrional fault', 'Falla Septentrional'),
  'comp.ev.1842.context': s('7 mai 1842 : grand séisme sur la Faille Septentrionale à Cap-Haïtien. L\'un des plus grands événements historiques du nord.', '7 me 1842 : gwo tranblemanntè sou Fay Septantriyonal nan Kap Ayisyen.', '7 May 1842: major earthquake on the Septentrional fault at Cap-Haïtien.', '7 de mayo de 1842: gran sismo en la falla Septentrional en Cap-Haitiano.'),
  'comp.ev.1842.damages': s('Cap-Haïtien largement détruite. Tsunami dévastateur sur le littoral nord. Des milliers de victimes.', 'Kap Ayisyen detwi. Tsunami devasta kòt nò a. Plizyè mil moun mouri.', 'Cap-Haïtien largely destroyed. Devastating tsunami on the north coast. Thousands killed.', 'Cap-Haitiano destruido. Tsunami devastador en la costa norte. Miles de muertos.'),
  'comp.ev.1842.lesson': s('Le nord d\'Haïti est aussi exposé que le sud. Après un fort séisme côtier : monter en hauteur (risque tsunami).', 'Nò Ayiti ekspoze tankou sid. Apre gwo tranblemanntè sou kòt : monte wo (danje tsunami).', 'Northern Haiti is as exposed as the south. After a strong coastal quake: move to higher ground (tsunami).', 'El norte de Haití está tan expuesto como el sur. Tras sismo costero fuerte: subir a terreno alto (tsunami).'),
  'comp.ev.1842.limits': s('Mw ~8,1 estimé ; récits historiques, pas de mesure instrumentale.', 'Mw ~8,1 estime ; istwa oral, pa gen mezi modèn.', 'Estimated Mw ~8.1; historical accounts, no instrumental measure.', 'Mw ~8,1 estimado; relatos históricos, sin medición instrumental.'),

  'comp.ev.1860.fault': s('Faille Septentrionale', 'Fay Septantriyonal', 'Septentrional fault', 'Falla Septentrional'),
  'comp.ev.1860.context': s('8 avril 1860 : nouveau grand séisme au nord, 18 ans après 1842. Le segment septentrional reste très actif.', '8 avril 1860 : nouvo gwo tranblemanntè nan nò, 18 an apre 1842.', '8 April 1860: another major northern quake, 18 years after 1842.', '8 de abril de 1860: otro gran sismo en el norte, 18 años después de 1842.'),
  'comp.ev.1860.damages': s('Destructions majeures à Cap-Haïtien et environs. Rappel que le nord peut subir des catastrophes comparables au sud.', 'Gwo domaj nan Kap Ayisyen ak vwazinaj. Nò a ka soufri katastwòf tankou sid.', 'Major damage in Cap-Haïtien and surroundings. The north can suffer catastrophes like the south.', 'Grandes destrucciones en Cap-Haitiano y alrededores. El norte puede sufrir como el sur.'),
  'comp.ev.1860.lesson': s('Préparer le nord (Cap-Haïtien, Gonaïves) avec la même sérieux que Port-au-Prince.', 'Prepare nò a (Kap, Gonayiv) ak menm serye ak Pòtoprens.', 'Prepare the north (Cap-Haïtien, Gonaïves) as seriously as Port-au-Prince.', 'Preparar el norte (Cap-Haitiano, Gonaïves) con la misma seriedad que Puerto Príncipe.'),
  'comp.ev.1860.limits': s('Mw ~7,5 estimé à partir de descriptions historiques.', 'Mw ~7,5 estime sou baz istwa.', 'Estimated Mw ~7.5 from historical descriptions.', 'Mw ~7,5 estimado por descripciones históricas.'),

  'comp.ev.2010.fault': s('Faille EPGF — segment Léogâne', 'Fay EPGF — segman Legann', 'EPGF fault — Léogâne segment', 'Falla EPGF — segmento Léogâne'),
  'comp.ev.2010.context': s('12 janvier 2010, Mw 7,0 : rupture à ~13 km de profondeur près de Léogâne. Épicentre à ~25 km de Port-au-Prince. Glissement horizontal de plusieurs mètres.', '12 janvye 2010, Mw 7,0 : kase ~13 km pwofondè tou pre Legann. Episant ~25 km Pòtoprens.', '12 January 2010, Mw 7.0: rupture ~13 km deep near Léogâne. Epicenter ~25 km from Port-au-Prince.', '12 de enero de 2010, Mw 7,0: ruptura ~13 km de profundidad cerca de Léogâne.'),
  'comp.ev.2010.damages': s('>230 000 morts, des centaines de milliers de blessés, ~250 000 résidences détruites ou endommagées. État effondré, économie paralysée.', '>230 000 moun mouri, dè santèn mil blese, ~250 000 kay detwi. Leta efondre.', '>230,000 deaths, hundreds of thousands injured, ~250,000 homes destroyed or damaged.', '>230 000 muertos, cientos de miles heridos, ~250 000 viviendas destruidas o dañadas.'),
  'comp.ev.2010.lesson': s('L\'aléa était connu ; la catastrophe vient surtout de bâtiments non parasismiques sur sols meubles. Réduire la vulnérabilité = sauver des vies.', 'Yo te konnen gen danje ; katastwòf la soti nan bilding ki pa reziste sou tè meb. Diminye feblès = sove lavi.', 'Hazard was known; catastrophe came mainly from non-seismic buildings on soft soils. Cut vulnerability = save lives.', 'El peligro era conocido; la catástrofe vino de edificios no antisísmicos en suelos blandos.'),
  'comp.ev.2010.limits': s('Chiffres de victimes approximatifs ; dégâts variables selon quartiers (sol, qualité bâti).', 'Kantite moun mouri apwoksimatif ; domaj diferan selon katye (tè, kalite bilding).', 'Casualty figures approximate; damage varied by neighborhood (soil, building quality).', 'Cifras aproximadas; daños variables por barrio (suelo, calidad constructiva).'),

  'comp.ev.2021.fault': s('Faille EPGF — segment Nippes', 'Fay EPGF — segman Nip', 'EPGF — Nippes segment', 'Falla EPGF — segmento Nippes'),
  'comp.ev.2021.context': s('14 août 2021, Mw 7,2 : rupture plus à l\'ouest (Grand\'Anse, Nippes). Plus énergétique que 2010 mais épicentre moins urbanisé.', '14 out 2021, Mw 7,2 : kase pi nan lwès (Grandans, Nip). Pi fò pase 2010 men mwens vil nan episant.', '14 August 2021, Mw 7.2: rupture farther west (Grand\'Anse, Nippes). More energetic than 2010 but less urban epicenter.', '14 de agosto de 2021, Mw 7,2: ruptura más al oeste (Grand\'Anse, Nippes).'),
  'comp.ev.2021.damages': s('>2 200 morts, milliers de blessés, dizaines de milliers de maisons endommagées. Routes et hôpitaux saturés.', '>2 200 moun mouri, plizyè mil blese, dizèn mil kay domaje.', '>2,200 deaths, thousands injured, tens of thousands of homes damaged.', '>2 200 muertos, miles heridos, decenas de miles de casas dañadas.'),
  'comp.ev.2021.lesson': s('Même faille, autre segment : d\'autres portions peuvent encore casser. Mw plus grand ≠ toujours plus de morts (densité, heure, bâti comptent).', 'Menm fay, lòt segman : lòt pati ka kase toujou. Pi gwo Mw pa toujou plis lanmò (popilasyon, lè, bilding konte).', 'Same fault, different segment: other portions may still break. Higher Mw ≠ always more deaths (density, time, buildings matter).', 'Misma falla, otro segmento: otras partes pueden romperse. Mayor Mw ≠ siempre más muertes.'),
  'comp.ev.2021.limits': s('Estimation rapide des victimes en évolution les premiers jours.', 'Kantite moun mouri chanje nan premye jou yo.', 'Early casualty estimates changed in the first days.', 'Las estimaciones iniciales de víctimas cambiaron en los primeros días.'),

  // Magnitude lab
  'comp.magLab.what': s('La magnitude (Mw) mesure l\'énergie à la source. L\'intensité (EMS) mesure les effets où vous êtes (secousses, dégâts).', 'Magnitid (Mw) mezire enèji nan sous la. Entansite (EMS) mezire efè kote ou ye a.', 'Magnitude (Mw) measures energy at the source. Intensity (EMS) measures effects where you are.', 'La magnitud (Mw) mide la energía en la fuente. La intensidad (EMS) mide los efectos donde usted está.'),
  'comp.magLab.why': s('Un Mw 7,2 (2021) peut faire moins de victimes qu\'un Mw 7,0 (2010) si le bâti et la densité diffèrent. C\'est l\'intensité locale qui compte pour votre maison.', 'Mw 7,2 (2021) ka fè mwens moun mouri pase Mw 7,0 (2010) si bilding ak popilasyon diferan.', 'Mw 7.2 (2021) can kill fewer than Mw 7.0 (2010) if buildings and density differ.', 'Mw 7,2 (2021) puede matar menos que Mw 7,0 (2010) si el hábitat y densidad difieren.'),
  'comp.magLab.haiti': s('2010 : sol meuble à PAP → intensités VIII–X locales malgré distance. 2021 : zone plus rurale → secousses fortes mais moins d\'effondrements urbains massifs.', '2010 : tè meb Pòtoprens → entansite VIII–X. 2021 : pi riral → mwens bilding tonbe nan vil.', '2010: soft soil in PAP → local intensities VIII–X. 2021: more rural → fewer mass urban collapses.', '2010: suelo blando en PAP → intensidades VIII–X. 2021: más rural → menos colapsos urbanos masivos.'),
  'comp.magLab.limits': s('PGA et EMS affichés = modèle simplifié (même base que le Labo). Pas un rapport officiel pour votre adresse.', 'PGA ak EMS = modèl senp (menm baz ak Labo). Pa rapò ofisyèl pou adrès ou.', 'PGA and EMS = simplified model (same basis as Lab). Not an official report for your address.', 'PGA y EMS = modelo simplificado (misma base que el Lab). No es informe oficial para su dirección.'),
  'comp.magLab.impact': s('Comprenez pourquoi renforcer votre maison et choisir le terrain comptent autant que « espérer un petit séisme ».', 'Konprann poukisa ranfòse kay ou ak tè ou enpòtan tankou « swete ti tranblemanntè ».', 'See why strengthening your home and soil matter as much as “hoping for a small quake.”', 'Entienda por qué reforzar su casa y suelo importa tanto como “esperar un sismo pequeño”.'),
  'comp.magLab.mw': s('Magnitude Mw', 'Magnitid Mw', 'Magnitude Mw', 'Magnitud Mw'),
  'comp.magLab.mwHint': s('Taille à la source', 'Gwosè nan sous', 'Size at source', 'Tamaño en la fuente'),
  'comp.magLab.distance': s('Distance à l\'épicentre', 'Distans episant', 'Distance to epicenter', 'Distancia al epicentro'),
  'comp.magLab.soil': s('Type de sol', 'Kalite tè', 'Soil type', 'Tipo de suelo'),
  'comp.magLab.soilRock': s('Roche (Morne)', 'Wòch (mòn)', 'Rock (hill)', 'Roca (loma)'),
  'comp.magLab.soilMedium': s('Sol mixte', 'Tè melanje', 'Mixed soil', 'Suelo mixto'),
  'comp.magLab.soilSoft': s('Sol meuble / port', 'Tè meb / pò', 'Soft soil / port', 'Suelo blando / puerto'),
  'comp.magLab.pgaHint': s('Accélération max. au sol', 'Akselerasyon max sou tè', 'Peak ground acceleration', 'Aceleración máxima en suelo'),
  'comp.magLab.emsHint': s('Effets ressentis / dégâts', 'Efè santi / domaj', 'Felt effects / damage', 'Efectos sentidos / daños'),
  'comp.magLab.disclaimer': s('Modèle pédagogique Esteva simplifié — facteur sol ×1 à ×2,5. Consultez le module Labo pour scénarios détaillés.', 'Modèl pedagojik Esteva senp — factè tè ×1 a ×2,5. Ale nan Labo pou plis detay.', 'Simplified Esteva teaching model — soil factor ×1 to ×2.5. See Lab module for detail.', 'Modelo pedagógico Esteva simplificado — factor suelo ×1 a ×2,5. Vea el módulo Lab.'),

  // Hypocenter
  'comp.hypo.intro': s('L\'hypocentre est le point de rupture en profondeur. L\'épicentre est sa projection à la surface, souvent près de la zone la plus secouée.', 'Iposant se pwen kote tè a kase anba. Episant se pwojeksyon li sou sifas la.', 'The hypocenter is the rupture point at depth. The epicenter is its surface projection.', 'El hipocentro es el punto de ruptura en profundidad. El epicentro es su proyección en la superficie.'),
  'comp.hypo.surface': s('Surface', 'Sifas', 'Surface', 'Superficie'),
  'comp.hypo.epicenter': s('Épicentre', 'Episant', 'Epicenter', 'Epicentro'),
  'comp.hypo.hypocenter': s('Hypocentre', 'Iposant', 'Hypocenter', 'Hipocentro'),
  'comp.hypo.depth': s('Profondeur', 'Pwofondè', 'Depth', 'Profundidad'),
  'comp.hypo.shallow': s('Séisme peu profond (<20 km) : ondes arrivent vite, secousses fortes. Cas typique d\'Haïti (2010 : ~13 km).', 'Tranblemanntè pa twò pwofon (<20 km) : vag rive vit, sekou fò. 2010 : ~13 km.', 'Shallow quake (<20 km): waves arrive fast, strong shaking. Typical Haiti (2010: ~13 km).', 'Sismo poco profundo (<20 km): ondas llegan rápido, sacudida fuerte. Haití 2010: ~13 km.'),
  'comp.hypo.deep': s('Séisme plus profond : énergie atténuée en surface, mais zone affectée peut être large.', 'Tranblemanntè pi pwofon : enèji diminye sou sifas, men zòn afekte ka laj.', 'Deeper quake: energy attenuated at surface, but affected area can be wide.', 'Sismo más profundo: energía atenuada en superficie, pero zona afectada puede ser amplia.'),

  // Waves enhanced
  'comp.waves.what': s('Les ondes P arrivent en premier (rapides, peu destructives). Les ondes S et de surface suivent (plus lentes, plus destructives).', 'Vag P rive an premye (rapid, pa twò destriktif). Vag S ak sou sifas swiv (pi dousman, pi destriktif).', 'P-waves arrive first (fast, less destructive). S and surface waves follow (slower, more destructive).', 'Las ondas P llegan primero (rápidas). Las S y superficiales siguen (más lentas, más destructivas).'),
  'comp.waves.why': s('L\'intervalle P→S donne quelques secondes pour se protéger (Bese, Pwoteje, Kenbe) avant les secousses violentes.', 'Tan ant P ak S bay kèk segonn pou Bese, Pwoteje, Kenbe anvan sekou yo vin fò.', 'The P→S gap gives seconds to Drop, Cover, Hold before violent shaking.', 'El intervalo P→S da segundos para agacharse, cubrirse y agarrarse.'),
  'comp.waves.haiti': s('À ~25 km de l\'épicentre 2010, il restait souvent 5–15 secondes entre P et secousses fortes — peu si on hésite.', '~25 km episant 2010 : souvent 5–15 segonn ant P ak sekou fò — pa anpil si ou rete panse.', '~25 km from 2010 epicenter: often 5–15 s between P and strong shaking — not much if you hesitate.', '~25 km del epicentro 2010: a menudo 5–15 s entre P y sacudida fuerte.'),
  'comp.waves.limits': s('Temps calculés avec vitesses moyennes (P ~6 km/s, S ~3,4 km/s). Réel varie selon géologie.', 'Tan kalkile ak vitès mwayèn. Reyalite ka diferan selon tè a.', 'Times use average speeds (P ~6 km/s, S ~3.4 km/s). Real values vary with geology.', 'Tiempos con velocidades medias. Los valores reales varían.'),
  'comp.waves.impact': s('Dès que vous sentez une secousse : baissez-vous tout de suite, ne attendez pas la « grosse ».', 'Depi ou santi tè a tranble : bese imedyatman, pa tann « gwo a ».', 'As soon as you feel shaking: drop immediately, don\'t wait for the “big one.”', 'Al sentir sacudida: agáchese de inmediato, no espere “la grande”.'),
  'comp.waves.distance': s('Distance à l\'épicentre', 'Distans episant', 'Distance to epicenter', 'Distancia al epicentro'),
  'comp.waves.arrivalP': s('Arrivée P', 'Rive P', 'P arrival', 'Llegada P'),
  'comp.waves.arrivalS': s('Arrivée S forte', 'Rive S fò', 'Strong S arrival', 'Llegada S fuerte'),
  'comp.waves.window': s('Fenêtre pour Bese', 'Tan pou Bese', 'Window to Drop', 'Ventana para agacharse'),
  'comp.waves.idleHint': s('À {sec} s de l\'épicentre, vous avez environ {sec} secondes pour vous protéger après les ondes P.', 'Nan {sec} s nan episant, ou gen ~{sec} segonn pou pwoteje tèt ou apre vag P.', 'At this distance, you have ~{sec} seconds to protect yourself after P-waves.', 'A esta distancia, tiene ~{sec} segundos para protegerse tras las ondas P.'),

  // Soil
  'comp.soil.what': s('L\'amplification : les sols meubles (port, remblai, argile) augmentent l\'amplitude des secousses. La liquéfaction : le sol saturé perd sa résistance et « coule ».', 'Anplifikasyon : tè meb ogmante fòs sekou. Likefaksyon : tè satire pèdi fòs li.', 'Amplification: soft soils increase shaking. Liquefaction: saturated soil loses strength and “flows.”', 'Amplificación: suelos blandos aumentan la sacudida. Licuefacción: suelo saturado pierde resistencia.'),
  'comp.soil.why': s('Même magnitude, quartiers différents : Morne l\'Hôpital (roche) vs port / Cité Soleil (meuble) → dégâts très inégaux en 2010.', 'Menm magnitid, katye diferan : mòn wòch vs pò / tè meb → domaj pa menm an 2010.', 'Same magnitude, different neighborhoods: rock hill vs port/soft fill → very unequal damage in 2010.', 'Misma magnitud, barrios distintos: loma rocosa vs puerto/suelo blando → daños muy desiguales en 2010.'),
  'comp.soil.haiti': s('Léogâne, port de PAP, plaines alluviales : zones à forte amplification et risque de liquéfaction.', 'Legann, pò Pòtoprens, plenn : zòn ki anplifye sekou e gen risk likefaksyon.', 'Léogâne, PAP port, alluvial plains: high amplification and liquefaction risk.', 'Léogâne, puerto de PAP, llanuras: alta amplificación y riesgo de licuefacción.'),
  'comp.soil.limits': s('Carte pédagogique simplifiée. Une étude de sol de parcelle est nécessaire pour construire.', 'Kat senp. Bezwen etid tè pou konstwi.', 'Simplified teaching map. A site study is needed to build.', 'Mapa pedagógico simplificado. Se necesita estudio de suelo para construir.'),
  'comp.soil.impact': s('Avant d\'acheter terrain ou construire : éviter remblais instables, privilégier roche ou sol compact, consulter un ingénieur.', 'Anvan ou achte tè oswa bati : evite ranblayi enstab, chwazi wòch oswa tè solid, pale ak enjenyè.', 'Before buying land or building: avoid unstable fill, prefer rock or firm soil, consult an engineer.', 'Antes de comprar terreno o construir: evite rellenos inestables, prefiera roca o suelo firme, consulte ingeniero.'),
  'comp.soil.rock': s('Sol rocheux', 'Tè wòch', 'Rocky soil', 'Suelo rocoso'),
  'comp.soil.soft': s('Sol meuble', 'Tè meb', 'Soft soil', 'Suelo blando'),
  'comp.soil.rockEx': s('Ex. Morne, plateau calcaire', 'Egz. mòn, platò', 'e.g. hills, limestone plateau', 'ej. lomas, meseta'),
  'comp.soil.softEx': s('Ex. Port, plaine, remblai', 'Egz. pò, plenn', 'e.g. port, plain, fill', 'ej. puerto, llanura'),
  'comp.soil.liquefactionTitle': s('Liquéfaction — mécanisme', 'Likefaksyon — mekanis', 'Liquefaction — mechanism', 'Licuefacción — mecanismo'),
  'comp.soil.liquefaction': s('Eau dans les pores + secousse → pression qui « soulève » les grains → sol devient fluide → fondations s\'enfoncent ou basculent. Observé près du port et zones saturées en 2010.', 'Dlo nan tè a + sekou → presyon fè tè a vin likid → fondasyon tonbe. Te rive 2010 tou pre pò.', 'Water in pores + shaking → pressure lifts grains → soil flows → foundations sink or tilt. Seen near port in 2010.', 'Agua en poros + sacudida → presión → suelo fluido → cimentaciones se hunden. Visto en 2010 cerca del puerto.'),
  'comp.soil.simulate': s('Simuler une secousse', 'Simile yon sekou', 'Simulate shaking', 'Simular sacudida'),

  // Aftershocks
  'comp.after.what': s('Répliques = séismes plus petits après le choc principal, même zone, réajustement des contraintes.', 'Replik = ti tranblemanntè apre gwo a, menm zòn, tè ap regle tansyon.', 'Aftershocks = smaller quakes after the main shock, same area, stress adjustment.', 'Réplicas = sismos menores tras el principal, misma zona.'),
  'comp.after.why': s('Un bâtiment fissuré peut s\'effondrer lors d\'une réplique. La peur continue ; les secousses ne signifient pas que « tout est sorti ».', 'Bilding ki fann ka tonbe nan replik. Sekou kontinye ; sa pa vle di tout enèji fini.', 'A cracked building can collapse in an aftershock. Shaking continues; energy is not all released.', 'Un edificio agrietado puede colapsar en una réplica.'),
  'comp.after.haiti': s('Après 2010 : 40+ répliques M≥5, dont M5,9 le 20 janvier. Des semaines de secousses à Port-au-Prince.', 'Apre 2010 : 40+ replik M≥5, gen M5,9 20 janvye. Semèn sekou nan Pòtoprens.', 'After 2010: 40+ aftershocks M≥5, including M5.9 on 20 January. Weeks of shaking in PAP.', 'Tras 2010: 40+ réplicas M≥5, incluida M5,9 el 20 de enero.'),
  'comp.after.limits': s('Impossible de prédire chaque réplique ; la fréquence diminue avec le temps (loi d\'Omori).', 'Pa ka predi chak replik ; yo vin pi ra avèk tan.', 'Cannot predict each aftershock; frequency decays over time (Omori law).', 'No se puede predecir cada réplica; la frecuencia decrece con el tiempo.'),
  'comp.after.impact': s('Ne pas dormir sous un mur fissuré ; inspecter avant de réoccuper ; évacuer si le bâtiment est dangereux.', 'Pa dòmi anba mir fann ; verifye anvan ou antre ; kite si bilding an danje.', 'Do not sleep under cracked walls; inspect before re-entering; leave if unsafe.', 'No duerma bajo muros agrietados; inspeccione antes de reingresar.'),
  'comp.after.stat1': s('Répliques M≥5 après 2010', 'Replik M≥5 apre 2010', 'M≥5 aftershocks after 2010', 'Réplicas M≥5 tras 2010'),
  'comp.after.stat2': s('Plus forte réplique (20 janv.)', 'Pi fò replik (20 janv.)', 'Largest aftershock (Jan 20)', 'Réplica más fuerte (20 ene.)'),
  'comp.after.stat3': s('Durée des secousses fortes', 'Tan sekou fò yo dire', 'Duration of strong shaking', 'Duración de sacudidas fuertes'),
  'comp.after.tsunamiTitle': s('Séisme et mer (1842)', 'Tranblemanntè ak lanmè (1842)', 'Earthquake and sea (1842)', 'Sismo y mar (1842)'),
  'comp.waves.diagram.epicenter': s('Épicentre', 'Episant', 'Epicenter', 'Epicentro'),
  'comp.waves.diagram.you': s('Vous', 'Ou', 'You', 'Usted'),
  'comp.waves.diagram.fast': s('rapide', 'rapid', 'fast', 'rápida'),
  'comp.waves.diagram.strong': s('destructrice', 'destriktif', 'destructive', 'destructiva'),
  'comp.soil.compare': s('Comparer les deux', 'Konpare toude', 'Compare both', 'Comparar ambos'),
  'comp.soil.ampLabel': s('Amplification ×2–3', 'Anplifikasyon ×2–3', 'Amplification ×2–3', 'Amplificación ×2–3'),
  'comp.magLab.emsScale': s('Échelle d\'intensité EMS-98', 'Echèl entansite EMS-98', 'EMS-98 intensity scale', 'Escala de intensidad EMS-98'),
  'comp.svg.stress': s('Stress accumulé → rupture', 'Tansyon anpile → kase', 'Built-up stress → rupture', 'Tensión acumulada → ruptura'),
  'comp.after.timelineTitle': s('Chronologie des répliques — Haïti 2010', 'Kronoloji replik — Ayiti 2010', 'Aftershock timeline — Haiti 2010', 'Cronología de réplicas — Haití 2010'),
  'comp.after.tsunami': s('Sur la côte nord, le séisme de 1842 a généré un tsunami. Après un fort séisme près de la mer : monter en hauteur immédiatement, ne pas attendre une alerte.', 'Sou kòt nò, tranblemanntè 1842 te fè tsunami. Apre gwo tranblemanntè tou pre lanmè : monte wo imedyatman.', 'On the north coast, 1842 produced a tsunami. After a strong coastal quake: go uphill immediately.', 'En la costa norte, 1842 generó tsunami. Tras sismo costero fuerte: suba a terreno alto de inmediato.'),
}

import type { Lang } from '@/lib/i18n'

type L = Record<Lang, string>
const s = (fr: string, kr: string, en: string, es: string): L => ({ fr, kr, en, es })

export const laboScienceStrings: Record<string, L> = {
  'labo.subtitleLong': s(
    'Simulez un séisme sur votre bâtiment : magnitude, distance à la faille, type de sol et qualité constructive. Comprenez pourquoi Port-au-Prince a souffert plus que d\'autres zones en 2010.',
    'Simile yon tranblemanntè sou bilding ou : magnitid, distans ak fay la, kalite tè ak konstriksyon. Konprann poukisa Pòtoprens te soufri plis pase lòt zòn an 2010.',
    'Simulate an earthquake on your building: magnitude, fault distance, soil type and construction quality. Understand why Port-au-Prince suffered more than other areas in 2010.',
    'Simule un sismo en su edificio: magnitud, distancia a la falla, tipo de suelo y calidad constructiva. Entienda por qué Puerto Príncipe sufrió más que otras zonas en 2010.'
  ),

  'labo.path.title': s('Parcours simulation', 'Pèkòs similasyon', 'Simulation path', 'Recorrido de simulación'),
  'labo.path.hint': s(
    'Essayez un scénario réel haïtien puis ajustez les paramètres de votre logement.',
    'Eseye yon senaryo reyèl ayisyen epi ajiste paramèt kay ou.',
    'Try a real Haitian scenario then adjust your home parameters.',
    'Pruebe un escenario real haitiano y ajuste los parámetros de su vivienda.'
  ),
  'labo.path.ctaComprendre': s('Revoir les ondes (Comprendre)', 'Gade vag yo (Konprann)', 'Review waves (Understand)', 'Revisar ondas (Comprender)'),
  'labo.path.ctaDiagnostic': s('Évaluer mon bâtiment', 'Evalye bilding mwen', 'Assess my building', 'Evaluar mi edificio'),
  'labo.path.ctaPrevention': s('Gestes de protection', 'Jès pwoteksyon', 'Protection gestures', 'Gestos de protección'),
  'labo.path.progress': s(
    '{sims} simulation(s) · {scenarios} scénario(s) haïtien(s) testé(s)',
    '{sims} similasyon · {scenarios} senaryo ayisyen teste',
    '{sims} simulation(s) · {scenarios} Haitian scenario(s) tried',
    '{sims} simulación(es) · {scenarios} escenario(s) haitiano(s) probado(s)'
  ),

  'labo.preset.title': s('Paramètres depuis votre Diagnostic', 'Paramèt soti nan Dyagnostik ou', 'Parameters from your Diagnostic', 'Parámetros desde su Diagnóstico'),
  'labo.preset.subtitle': s(
    'Magnitude, distance, sol et qualité de construction ont été pré-remplis selon votre profil. Lancez la simulation pour visualiser l\'impact.',
    'Magnitid, distans, tè ak kalite konstriksyon ranpli dapre pwofil ou. Lanse similasyon an pou wè enpak la.',
    'Magnitude, distance, soil and building quality were pre-filled from your profile. Run the simulation to see the impact.',
    'Magnitud, distancia, suelo y calidad constructiva se rellenaron según su perfil. Ejecute la simulación para ver el impacto.'
  ),

  'labo.topic.magnitude': s('Magnitude', 'Magnitid', 'Magnitude', 'Magnitud'),
  'labo.topic.distance': s('Distance', 'Distans', 'Distance', 'Distancia'),
  'labo.topic.soil': s('Sol', 'Tè', 'Soil', 'Suelo'),
  'labo.topic.building': s('Bâtiment', 'Bilding', 'Building', 'Edificio'),

  'labo.scenario.observed': s('Intensité observée', 'Entansite obsève', 'Observed intensity', 'Intensidad observada'),
  'labo.scenario.lesson': s('Leçon', 'Leson', 'Lesson', 'Lección'),

  'labo.science.magnitude.what': s(
    'La magnitude de moment (Mw) mesure l\'énergie libérée à la source du séisme.',
    'Magnitid moman (Mw) mezire enèji ki lage nan sous tranblemanntè a.',
    'Moment magnitude (Mw) measures energy released at the earthquake source.',
    'La magnitud de momento (Mw) mide la energía liberada en el foco del sismo.'
  ),
  'labo.science.magnitude.why': s(
    'Chaque +1 sur l\'échelle ≈ 32× plus d\'énergie — mais l\'intensité ressentie dépend aussi de la distance et du sol.',
    'Chak +1 sou echèl la ≈ 32 fwa plis enèji — men entansite santi depann tou de distans ak tè.',
    'Each +1 on the scale ≈ 32× more energy — but felt intensity also depends on distance and soil.',
    'Cada +1 en la escala ≈ 32× más energía — pero la intensidad sentida también depende de distancia y suelo.'
  ),
  'labo.science.magnitude.haiti': s(
    '2010 : Mw 7,0 — énergie comparable à des centaines de bombes atomiques, mais ce n\'est pas la magnitude seule qui a tué : c\'est la proximité + sol meuble + bâtiments fragiles.',
    '2010 : Mw 7,0 — anpil bonb atomik ekivalan, men se pa magnitude sèlman ki te touye : se pwoksimite + tè meb + bilding fèb.',
    '2010: Mw 7.0 — energy like hundreds of atomic bombs, but magnitude alone didn\'t kill: proximity + soft soil + fragile buildings did.',
    '2010: Mw 7,0 — energía como cientos de bombas atómicas, pero no mató solo la magnitud: proximidad + suelo blando + edificios frágiles.'
  ),
  'labo.science.magnitude.limits': s(
    'Mw ne dit pas directement si VOTRE maison s\'effondrera — il faut simuler avec distance, sol et qualité du bâti.',
    'Mw pa di dirèkteman si kay OU ap tonbe — fòk ou simile ak distans, tè ak kalite bilding.',
    'Mw doesn\'t directly say if YOUR house will collapse — simulate with distance, soil and building quality.',
    'Mw no dice directamente si SU casa colapsará — simule con distancia, suelo y calidad constructiva.'
  ),
  'labo.science.magnitude.impact': s(
    'Comparer Mw 6 vs 7 sur la même configuration montre l\'explosion du risque d\'effondrement.',
    'Konpare Mw 6 ak 7 sou menm konfigirasyon montre risk tonbe ogmante anpil.',
    'Comparing Mw 6 vs 7 on the same setup shows how collapse risk explodes.',
    'Comparar Mw 6 vs 7 en la misma configuración muestra cómo explota el riesgo de colapso.'
  ),

  'labo.science.distance.what': s(
    'Distance horizontale entre le bâtiment et la zone de rupture de la faille (pas l\'épicentre seul).',
    'Distans orizontal ant bilding lan ak kote fay la kase (pa sèlman episant lan).',
    'Horizontal distance between the building and the fault rupture zone (not epicenter alone).',
    'Distancia horizontal entre el edificio y la zona de ruptura de la falla (no solo el epicentro).'
  ),
  'labo.science.distance.why': s(
    'Les ondes sismiques s\'atténuent avec la distance — mais en Haïti, beaucoup de villes sont à <30 km des failles actives.',
    'Vag tranblemanntè diminye ak distans — men nan Ayiti, anpil vil yo <30 km nan fay aktif.',
    'Seismic waves attenuate with distance — but in Haiti many towns are <30 km from active faults.',
    'Las ondas sísmicas se atenúan con la distancia — pero en Haití muchas ciudades están a <30 km de fallas activas.'
  ),
  'labo.science.distance.haiti': s(
    'Port-au-Prince était à ~13 km du foyer 2010 : secousses très fortes malgré une magnitude « seulement » 7,0.',
    'Pòtoprens te ~13 km nan fokis 2010 : sekou trè fò malgre magnitude « sèlman » 7,0.',
    'Port-au-Prince was ~13 km from the 2010 focus: very strong shaking despite « only » Mw 7.0.',
    'Puerto Príncipe estaba a ~13 km del foco 2010: sacudida muy fuerte pese a Mw « solo » 7,0.'
  ),
  'labo.science.distance.limits': s(
    'Un grand séisme lointain peut encore être ressenti ; un petit séisme très proche peut être destructeur.',
    'Yon gwo tranblemanntè lwen ka toujou santi ; yon ti tranblemanntè trè pre ka destriktif.',
    'A large distant quake can still be felt; a small very nearby one can be destructive.',
    'Un gran sismo lejano aún se siente; uno pequeño muy cercano puede ser destructivo.'
  ),
  'labo.science.distance.impact': s(
    'Réduire la distance de 100 km à 10 km peut faire passer l\'intensité de IV à VIII+ sur sol meuble.',
    'Diminye distans soti 100 km rive 10 km ka fè entansite ale soti IV rive VIII+ sou tè meb.',
    'Reducing distance from 100 km to 10 km can raise intensity from IV to VIII+ on soft soil.',
    'Reducir distancia de 100 km a 10 km puede subir intensidad de IV a VIII+ en suelo blando.'
  ),

  'labo.science.soil.what': s(
    'Effet de site : le même séisme secoue plus fort sur sol meuble que sur roche (amplification).',
    'Efè sit : menm tranblemanntè a souke pi fò sou tè meb pase sou wòch (ogmantasyon).',
    'Site effect: the same earthquake shakes harder on soft soil than rock (amplification).',
    'Efecto de sitio: el mismo sismo sacude más en suelo blando que en roca (amplificación).'
  ),
  'labo.science.soil.why': s(
    'Les ondes ralentissent dans les sédiments mous et leur énergie se concentre en surface — phénomène clé à PAP et Léogâne.',
    'Vag yo ralanti nan sediman meb epi enèji yo konsantre sou sifas — kle nan Pòtoprens ak Legann.',
    'Waves slow in soft sediments and energy concentrates at surface — key in PAP and Léogâne.',
    'Las ondas se ralentizan en sedimentos blandos y la energía se concentra en superficie — clave en PAP y Léogâne.'
  ),
  'labo.science.soil.haiti': s(
    'Port-au-Prince et la plaine du Cul-de-Sac reposent sur alluvions et sols saturés : amplification ×1,8 à ×2,5 vs roche.',
    'Pòtoprens ak plenn Cul-de-Sac sou aluvyon ak tè satire : ogmantasyon ×1,8 rive ×2,5 konpare ak wòch.',
    'Port-au-Prince and Cul-de-Sac plain sit on alluvium and saturated soils: ×1.8 to ×2.5 vs rock.',
    'Puerto Príncipe y la llanura del Cul-de-Sac están sobre aluviones y suelos saturados: ×1,8 a ×2,5 vs roca.'
  ),
  'labo.science.soil.limits': s(
    'La liquéfaction (sol qui « coule ») n\'est pas modélisée en détail ici — mais le facteur sol saturé l\'approxime.',
    'Likefaksyon (tè ki « koule ») pa modle an detay isit — men faktè tè satire apwokime li.',
    'Liquefaction (soil that « flows ») isn\'t fully modeled here — saturated soil factor approximates it.',
    'La licuefacción no se modela en detalle aquí — el factor de suelo saturado la aproxima.'
  ),
  'labo.science.soil.impact': s(
    'Même bâtiment, même séisme : roche → dommages légers ; sol saturé → effondrement probable.',
    'Menm bilding, menm tranblemanntè : wòch → ti domaj ; tè satire → tonbe pwobab.',
    'Same building, same quake: rock → light damage; saturated soil → likely collapse.',
    'Mismo edificio, mismo sismo: roca → daños leves; suelo saturado → colapso probable.'
  ),

  'labo.science.building.what': s(
    'La qualité constructive détermine le seuil de dommages pour un PGA donné (béton armé vs non armé).',
    'Kalite konstriksyon detèmine limit domaj pou yon PGA bay la (beton arme vs san fè).',
    'Construction quality sets the damage threshold for a given PGA (reinforced vs unreinforced concrete).',
    'La calidad constructiva fija el umbral de daños para un PGA dado (concreto armado vs sin refuerzo).'
  ),
  'labo.science.building.why': s(
    'En 2010, des milliers de bâtiments « pauvres » se sont effondrés à intensité VII–IX alors que quelques structures parasismiques ont tenu.',
    'An 2010, plizyè mil bilding « fèb » tonbe nan entansite VII–IX pandan kèk estrikti reziste te kenbe.',
    'In 2010, thousands of « poor » buildings collapsed at intensity VII–IX while some seismic structures held.',
    'En 2010, miles de edificios « pobres » colapsaron a intensidad VII–IX mientras algunas estructuras antisísmicas resistieron.'
  ),
  'labo.science.building.haiti': s(
    'Profil dominant : béton non armé, fers lisses, étages ajoutés, PAU (planchers sans poutres) — qualité « pauvre » dans le simulateur.',
    'Pwofil dominan : beton san fè, fè lis, etaj ajoute, PAU — kalite « fèb » nan similatè a.',
    'Dominant profile: unreinforced concrete, smooth rebar, added floors, flat slabs — « poor » in the simulator.',
    'Perfil dominante: concreto sin refuerzo, varillas lisas, pisos añadidos, losa plana — « pobre » en el simulador.'
  ),
  'labo.science.building.limits': s(
    'Le simulateur donne des probabilités indicatives, pas une certification structurelle.',
    'Similatè a bay pwobabilite endikatif, pa yon sètifikasyon estrikti.',
    'The simulator gives indicative probabilities, not structural certification.',
    'El simulador da probabilidades indicativas, no certificación estructural.'
  ),
  'labo.science.building.impact': s(
    'Passer de « pauvre » à « excellente » sur la même secousse peut diviser le risque d\'effondrement par 5 à 10.',
    'Pase soti « fèb » rive « ekselan » sou menm sekou ka divize risk tonbe pa 5 rive 10.',
    'Going from « poor » to « excellent » on the same shake can cut collapse risk by 5–10×.',
    'Pasar de « pobre » a « excelente » en la misma sacudida puede dividir el riesgo de colapso entre 5 y 10.'
  ),

  'labo.cta.prevention': s(
    'Maintenant que vous voyez l\'impact : apprenez les gestes Bese-Pwoteje-Kenbe',
    'Kounye a ou wè enpak la : aprann jès Bese-Pwoteje-Kenbe',
    'Now you see the impact: learn Drop-Cover-Hold On gestures',
    'Ahora que ve el impacto: aprenda los gestos Agáchate-Cúbrete-Agárrate'
  ),
}

import type { Lang } from '@/lib/i18n'

type L = Record<Lang, string>
const s = (fr: string, kr: string, en: string, es: string): L => ({ fr, kr, en, es })

export const preventionScienceStrings: Record<string, L> = {
  'prev.path.title': s(
    'Parcours prévention',
    'Pèkòs prevansyon',
    'Prevention path',
    'Recorrido de prevención'
  ),
  'prev.path.progress': s(
    '{done} / {total} éléments validés sur tout le module',
    '{done} / {total} eleman valide nan modil la',
    '{done} / {total} items checked across the module',
    '{done} / {total} elementos validados en el módulo'
  ),
  'prev.path.ctaComprendre': s(
    'Revoir la science (Comprendre)',
    'Gade syans lan ankò (Konprann)',
    'Review the science (Understand)',
    'Revisar la ciencia (Comprender)'
  ),
  'prev.path.ctaDiagnostic': s(
    'Évaluer mon logement',
    'Evalye kay mwen',
    'Assess my home',
    'Evaluar mi vivienda'
  ),

  'prev.bpk.title': s(
    'Simulateur Bese · Pwoteje · Kenbe',
    'Similatè Bese · Pwoteje · Kenbe',
    'Drop · Cover · Hold On simulator',
    'Simulador Agáchate · Cúbrete · Agárrate'
  ),
  'prev.bpk.subtitle': s(
    'Lancez une secousse fictive : vous avez quelques secondes entre les ondes P et S pour adopter la position.',
    'Lanse yon sekou imajinè : ou gen kèk segonn ant vag P ak S pou pran pozisyon an.',
    'Run a mock shake: you have a few seconds between P and S waves to get into position.',
    'Inicia una sacudida simulada: tienes unos segundos entre ondas P y S para adoptar la postura.'
  ),
  'prev.bpk.step.bese': s('BESE', 'BESE', 'DROP', 'AGÁCHATE'),
  'prev.bpk.step.pwoteje': s('PWOTEJE', 'PWOTEJE', 'COVER', 'CÚBRETE'),
  'prev.bpk.step.kenbe': s('KENBE', 'KENBE', 'HOLD ON', 'AGÁRRATE'),
  'prev.bpk.run': s('Lancer la simulation', 'Lanse similasyon an', 'Run simulation', 'Iniciar simulación'),
  'prev.bpk.reset': s('Réinitialiser', 'Rekòmanse', 'Reset', 'Reiniciar'),
  'prev.bpk.phase.wait': s(
    'Prêt ? Appuyez sur Lancer — les ondes P arrivent en premier.',
    'Pare ? Peze Lanse — vag P yo rive an premye.',
    'Ready? Press Run — P-waves arrive first.',
    '¿Listo? Pulsa Iniciar — las ondas P llegan primero.'
  ),
  'prev.bpk.phase.p': s(
    'Onde P — secousse légère. Baissez-vous MAINTENANT.',
    'Vag P — sekou leje. Bese KOUNYE A.',
    'P-wave — light shake. Drop NOW.',
    'Onda P — sacudida leve. Agáchate AHORA.'
  ),
  'prev.bpk.phase.s': s(
    'Ondes S — secousses fortes. Protégez-vous et tenez bon !',
    'Vag S — sekou fò. Pwoteje tèt ou epi kenbe fèm !',
    'S-waves — strong shaking. Cover and hold on!',
    'Ondas S — sacudida fuerte. ¡Cúbrete y agárrate!'
  ),
  'prev.bpk.phase.done': s(
    'Secousses terminées. Ne sortez qu\'après vérification.',
    'Sekou yo fini. Pa soti jiskaske ou verifye.',
    'Shaking ended. Exit only after checking.',
    'Sacudida terminada. Sal solo tras verificar.'
  ),
  'prev.bpk.window': s(
    'Fenêtre d\'action : ~{sec} s',
    'Fenèt aksyon : ~{sec} s',
    'Action window: ~{sec} s',
    'Ventana de acción: ~{sec} s'
  ),

  'prev.scenarios.title': s(
    'Où êtes-vous quand ça tremble ?',
    'Ki kote ou ye lè tè a tranble ?',
    'Where are you when it shakes?',
    '¿Dónde estás cuando tiembla?'
  ),
  'prev.scenarios.pap.title': s('Maison à Port-au-Prince', 'Kay nan Pòtoprens', 'Home in Port-au-Prince', 'Casa en Puerto Príncipe'),
  'prev.scenarios.pap.action': s(
    'Bese sous une table solide, loin des murs extérieurs et fenêtres. Sol meuble = amplification.',
    'Bese anba yon tab solid, lwen mi deyò ak fenèt. Tè meb = plis sekou.',
    'Drop under a sturdy table, away from outer walls and windows. Soft soil = amplification.',
    'Agáchate bajo mesa sólida, lejos de muros exteriores y ventanas. Suelo blando = amplificación.'
  ),
  'prev.scenarios.school.title': s('École / salle de classe', 'Lekòl / sal klas', 'School / classroom', 'Escuela / aula'),
  'prev.scenarios.school.action': s(
    'Sous le bureau, dos tourné aux fenêtres. Ne pas courir vers la cour pendant les secousses.',
    'Anba biwo a, do vire sou fenèt yo. Pa kouri nan lakou pandan sekou yo.',
    'Under the desk, back to windows. Do not run to the yard during shaking.',
    'Bajo el pupitre, espalda a ventanas. No corras al patio durante la sacudida.'
  ),
  'prev.scenarios.market.title': s('Marché / rue bondée', 'Mache / lari plen moun', 'Market / busy street', 'Mercado / calle concurrida'),
  'prev.scenarios.market.action': s(
    'Écartez-vous des murs de clôture et enseignes. Protégez la tête, restez sur place.',
    'Rete lwen mi kloti ak anseyn. Pwoteje tèt ou, rete kote ou ye.',
    'Stay away from boundary walls and signs. Protect head, stay put.',
    'Aléjate de muros y letreros. Protege la cabeza, quédate en el lugar.'
  ),
  'prev.scenarios.coast.title': s('Zone côtière (Léogâne, Gonaïves…)', 'Zòn sou kòt (Legann, Gonayiv…)', 'Coastal zone (Léogâne, Gonaïves…)', 'Zona costera (Léogâne, Gonaïves…)'),
  'prev.scenarios.coast.action': s(
    'Bese loin du littoral si possible. Après les secousses : éloignez-vous de la mer (tsunami).',
    'Bese lwen lanmè si posib. Apre sekou yo : ale pi wo, lwen lanmè (tsunami).',
    'Drop away from shore if possible. After shaking: move inland (tsunami).',
    'Agáchate lejos del mar si es posible. Tras la sacudida: aléjate del mar (tsunami).'
  ),

  'prev.kit.print': s('Imprimer ma checklist', 'Enprime lis mwen', 'Print my checklist', 'Imprimir mi lista'),
  'prev.kit.printTitle': s('Kit d\'urgence SisAyiti', 'Kit ijan SisAyiti', 'SisAyiti emergency kit', 'Kit de emergencia SisAyiti'),
  'prev.kit.hint': s(
    'Cochez chaque élément puis imprimez pour votre foyer.',
    'Make chak bagay epi enprime pou kay ou.',
    'Check each item then print for your household.',
    'Marca cada elemento e imprime para tu hogar.'
  ),

  'prev.science.bese.what': s('Baisser le centre de gravité limite les chutes et projections.', 'Bese sant gravite limite tonbe ak pwojeksyon.', 'Lowering your center of gravity limits falls and projections.', 'Bajar el centro de gravedad limita caídas y proyecciones.'),
  'prev.science.bese.why': s('Les premières secondes sont dominées par chutes d\'objets et perte d\'équilibre.', 'Premye segonn yo domine pa objè ki tonbe ak pèdi balans.', 'First seconds are dominated by falling objects and loss of balance.', 'Los primeros segundos dominan objetos cayendo y pérdida de equilibrio.'),
  'prev.science.bese.haiti': s('Maisons à étages, marchés, écoles bondées : peu d\'espace pour courir — bese sur place.', 'Kay plizyè etaj, mache, lekòl plen : pa gen kote pou kouri — bese kote ou ye.', 'Multi-story homes, crowded markets/schools: little room to run — drop in place.', 'Casas de varios pisos, mercados y escuelas llenos: poco espacio — agáchate donde estés.'),
  'prev.science.bese.limits': s('Ne pas se coucher à plat : rester accroupi pour pouvoir bouger.', 'Pa kouche plat : rete akwoupi pou ka bouje.', 'Do not lie flat: stay crouched to move if needed.', 'No te acuestes: quédate agachado para moverte.'),
  'prev.science.bese.impact': s('Geste le plus rapide à automatiser par des exercices annuels.', 'Jès ki pi rapid pou otomatize ak egzèsis chak ane.', 'Fastest gesture to automate through yearly drills.', 'Gesto más rápido de automatizar con simulacros anuales.'),

  'prev.science.pwoteje.what': s('Se mettre à l\'abri sous un abri rigide (table, bureau, mur porteur).', 'Mete tèt ou anba yon pwoteksyon solid (tab, biwo, mi sipò).', 'Shelter under rigid cover (table, desk, load-bearing wall).', 'Refugiarse bajo cobertura rígida (mesa, pupitre, muro portante).'),
  'prev.science.pwoteje.why': s('Les débris de toiture, vitres et murs tuent plus que le sol qui bouge.', 'Debi twal, vè, mi touye plis pase tè ki bouje.', 'Roof debris, glass and walls kill more than ground motion.', 'Escombros de techo, vidrio y muros matan más que el movimiento del suelo.'),
  'prev.science.pwoteje.haiti': s('Murs de clôture en blocs, balcons fragiles à PAP : danger n°1 en sortant.', 'Mi kloti blo, balkon fèb Pòtoprens : pi gwo danje si ou soti.', 'Block boundary walls, fragile balconies in PAP: #1 danger if you exit.', 'Muros de bloques, balcones frágiles en PAP: peligro #1 al salir.'),
  'prev.science.pwoteje.limits': s('Un carton ou des bras ne suffisent pas contre des blocs — cherchez un vrai abri.', 'Yon katon oswa bra pa ase kont blo — chèche vrè abri.', 'Cardboard or arms alone are not enough against blocks — find real cover.', 'Cartón o brazos no bastan contra bloques — busca cobertura real.'),
  'prev.science.pwoteje.impact': s('Réduit drastiquement les traumatismes crâniens.', 'Diminye anpil blesi nan tèt.', 'Drastically reduces head injuries.', 'Reduce drásticamente traumatismos craneales.'),

  'prev.science.kenbe.what': s('Maintenir la position jusqu\'à la fin des secousses et répliques possibles.', 'Kenbe pozisyon jiskaske sekou yo fini ak replik posib.', 'Maintain position until shaking and possible aftershocks end.', 'Mantén la postura hasta que cese la sacudida y réplicas.'),
  'prev.science.kenbe.why': s('Les ondes S et de surface durent 30–60 s ; des répliques suivent souvent.', 'Vag S ak sou sifas dire 30–60 s ; replik souvan vini apre.', 'S and surface waves last 30–60 s; aftershocks often follow.', 'Ondas S y superficiales duran 30–60 s; suelen venir réplicas.'),
  'prev.science.kenbe.haiti': s('Après 2010 : répliques M≥5 pendant des semaines — rester prudent.', 'Apre 2010 : replik M≥5 pandan semèn — rete pridan.', 'After 2010: M≥5 aftershocks for weeks — stay cautious.', 'Tras 2010: réplicas M≥5 por semanas — mantén precaución.'),
  'prev.science.kenbe.limits': s('Si l\'abri menace de s\'effondrer, déplacez-vous vers une zone plus sûre entre répliques.', 'Si abri a ap tonbe, deplase nan zòn pi an sekirite ant replik yo.', 'If shelter collapses, move to safer zone between aftershocks.', 'Si el refugio colapsa, muévete entre réplicas.'),
  'prev.science.kenbe.impact': s('Évite les blessures en tentant de se relever trop tôt.', 'Evite blesi lè ou leve twò bonè.', 'Avoids injury from standing up too early.', 'Evita lesiones por levantarse demasiado pronto.'),

  'prev.science.dangers.what': s('Dangers aggravés par le contexte haïtien : sols, relief, incendies.', 'Danje ogmante pa kontèks ayisyen : tè, mòn, dife.', 'Hazards worsened by Haitian context: soils, terrain, fires.', 'Peligros agravados por contexto haitiano: suelos, relieve, incendios.'),
  'prev.science.dangers.why': s('Le séisme déclenche effets secondaires (glissement, liquéfaction, feu).', 'Tranblemanntè deklanche efè segondè (glisman, likefaksyon, dife).', 'Earthquake triggers secondary effects (landslide, liquefaction, fire).', 'El sismo desencadena efectos secundarios (deslizamiento, licuefacción, fuego).'),
  'prev.science.dangers.haiti': s('Déforestation des mornes, réchauds charbon, ports de PAP/Léogâne.', 'Deforestasyon mòn, recho charbon, pò Pòtoprens/Legann.', 'Deforested hills, charcoal stoves, PAP/Léogâne ports.', 'Laderas deforestadas, estufas de carbón, puertos PAP/Léogâne.'),
  'prev.science.dangers.limits': s('Carte des dangers ≠ prédiction instantanée ; restez informé après le choc.', 'Kat danje ≠ prediksyon egzak ; rete enfòme apre chòk la.', 'Hazard map ≠ instant prediction; stay informed after the shock.', 'Mapa de peligros ≠ predicción instantánea; infórmate tras el choque.'),
  'prev.science.dangers.impact': s('Anticiper l\'après-séisme sauve autant que les gestes pendant.', 'Antisipe apre tranblemanntè a sove otan ke jès pandan.', 'Anticipating aftermath saves as much as during-shaking actions.', 'Anticipar el aftermath salva tanto como los gestos durante.'),

  'prev.science.kit.what': s('Autonomie 72 h minimum : eau, nourriture, soins, lumière, signal.', 'Otonomi 72 h minimòm : dlo, manje, swen, limyè, siyal.', '72 h minimum autonomy: water, food, care, light, signal.', 'Autonomía mínima 72 h: agua, comida, cuidados, luz, señal.'),
  'prev.science.kit.why': s('Routes bloquées, hôpitaux saturés, coupures d\'eau et d\'électricité fréquentes.', 'Wout bloke, lopital plen, koupü dlo ak elektrisite souvan.', 'Blocked roads, saturated hospitals, frequent water/power cuts.', 'Carreteras bloqueadas, hospitales saturados, cortes frecuentes.'),
  'prev.science.kit.haiti': s('Préparer un kit par foyer ; copies documents (actes, contacts) dans pochette étanche.', 'Prepare yon kit pa kay ; kopi dokiman nan pòch etanch.', 'One kit per household; document copies in waterproof pouch.', 'Un kit por hogar; copias de documentos en bolsa impermeable.'),
  'prev.science.kit.limits': s('Kit inutile s\'il est inaccessible — placez-le près de la sortie.', 'Kit pa sèvi si ou pa ka jwenn li — mete li bò pòt sorti.', 'Kit useless if inaccessible — place near exit.', 'Kit inútil si no es accesible — colócalo cerca de la salida.'),
  'prev.science.kit.impact': s('Réduit dépendance aux secours les premiers jours critiques.', 'Diminye depandans sou èd premye jou kritik yo.', 'Reduces reliance on aid in critical first days.', 'Reduce dependencia de ayuda en los primeros días críticos.'),

  'prev.science.avant.what': s('Réduire la vulnérabilité du foyer avant le choc : plan, kit, logement sécurisé.', 'Diminye vilnerabilite kay la anvan chòk la : plan, kit, kay an sekirite.', 'Reduce household vulnerability before the shock: plan, kit, safer home.', 'Reducir vulnerabilidad del hogar antes del choque: plan, kit, vivienda más segura.'),
  'prev.science.avant.why': s('On ne prédit pas l\'instant du séisme — seule la préparation compte.', 'Nou pa predi lè egzak — sèlman preparasyon ki konte.', 'We cannot predict the instant — only preparation counts.', 'No se predice el instante — solo cuenta la preparación.'),
  'prev.science.avant.haiti': s('Béton non armé, PAU, étages ajoutés : priorité au diagnostic et renforcement progressif.', 'Beton san fè, PAU, etaj ajoute : priyorite dyagnostik ak ranfòsman.', 'Unreinforced concrete, PAU, added floors: prioritize diagnostic and reinforcement.', 'Concreto sin refuerzo, pisos añadidos: priorizar diagnóstico y refuerzo.'),
  'prev.science.avant.limits': s('La préparation ne remplace pas un bâtiment parasismique neuf.', 'Preparasyon pa ranplase yon bilding reziste nèf.', 'Preparation does not replace a new seismic building.', 'La preparación no reemplaza un edificio antisísmico nuevo.'),
  'prev.science.avant.impact': s('Chaque action avant le séisme évite panique et erreurs mortelles pendant.', 'Chak aksyon anvan evite panik ak erè letal pandan.', 'Each pre-quake action avoids panic and fatal mistakes during.', 'Cada acción previa evita pánico y errores mortales durante.'),

  'prev.science.pendant.what': s('Gestes immédiats Bese-Pwoteje-Kenbe + règles spécifiques bâtiment fragile.', 'Jès imedyat Bese-Pwoteje-Kenbe + règ espesyal bilding fèb.', 'Immediate Drop-Cover-Hold + fragile-building rules.', 'Gestos inmediatos + reglas para edificios frágiles.'),
  'prev.science.pendant.why': s('Les 30–60 premières secondes concentrent la majorité des blessures évitables.', '30–60 premye segonn yo koncentre pifò blesi ou ka evite.', 'First 30–60 seconds concentrate most avoidable injuries.', 'Los primeros 30–60 segundos concentran la mayoría de lesiones evitables.'),
  'prev.science.pendant.haiti': s('2010 : courir vers les sorties a tué — rester sous abri intérieur sauf bâtiment en ruine.', '2010 : kouri nan sorti te touye — rete anba abri andedan.', '2010: running to exits killed — stay under indoor cover unless building is collapsing.', '2010: correr a salidas mató — quédate bajo cobertura interior.'),
  'prev.science.pendant.limits': s('Si le bâtiment s\'effondre activement, sortir à quatre pattes vers espace ouvert si possible.', 'Si bilding ap tonbe, soti sou kat pati si posib.', 'If building is actively collapsing, crawl to open space if possible.', 'Si el edificio colapsa activamente, salir a gatas si es posible.'),
  'prev.science.pendant.impact': s('Différence entre blessé léger et décès dans 80 % des cas urbains.', 'Diferans ant blesi leje ak lanmò nan 80% ka vil yo.', 'Difference between minor injury and death in 80% of urban cases.', 'Diferencia entre lesión leve y muerte en 80% de casos urbanos.'),

  'prev.science.apres.what': s('Sécuriser les personnes, couper les fuites, anticiper répliques et feux.', 'Sekirize moun, koupe gaz, antisipe replik ak dife.', 'Secure people, stop leaks, anticipate aftershocks and fires.', 'Asegurar personas, cortar fugas, anticipar réplicas e incendios.'),
  'prev.science.apres.why': s('Autant de victimes après le choc principal (feu, répliques, réintégration prématurée).', 'Otant moun mouri apre chòk prensipal (dife, replik, rantre twò bonè).', 'As many victims after main shock (fire, aftershocks, premature re-entry).', 'Tantas víctimas tras el choque principal (fuego, réplicas, reingreso prematuro).'),
  'prev.science.apres.haiti': s('Ne pas dormir dans bâtiment fissuré — répliques M≥5 possibles des semaines.', 'Pa dòmi nan bilding ki gen fisè — replik M≥5 posib pandan semèn.', 'Do not sleep in cracked building — M≥5 aftershocks possible for weeks.', 'No dormir en edificio agrietado — réplicas M≥5 posibles por semanas.'),
  'prev.science.apres.limits': s('Secours professionnels limités — l\'entraide communautaire est critique les 72 h.', 'Èd pwofesyonèl limite — ede youn lòt kritik premye 72 h.', 'Professional rescue limited — community mutual aid critical first 72 h.', 'Rescate profesional limitado — ayuda mutua crítica primeras 72 h.'),
  'prev.science.apres.impact': s('Bonne gestion après-séisme libère les secours pour les plus gravement touchés.', 'Bon jesyon apre sekou libere èd pou moun ki pi grav.', 'Good aftermath management frees rescue for the worst affected.', 'Buena gestión posterior libera rescate para los más afectados.'),
}

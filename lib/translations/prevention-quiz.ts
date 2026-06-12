export type PrevQuizLang = 'fr' | 'kr' | 'en' | 'es'

export type PrevQuizQuestion = {
  q: string
  options: string[]
  correct: number
  explain?: string
}

export type PrevTabQuiz = Record<PrevQuizLang, PrevQuizQuestion[]>

/** Quiz par phase : avant (0), pendant (1), apres (2) */
export const preventionQuizzes: PrevTabQuiz[] = [
  {
    fr: [
      { q: 'Avant un séisme, quelle action est la plus utile pour un bâtiment non parasismique ?', options: ['Ajouter un étage rapidement', 'Identifier fissures et zones sûres', 'Peindre les murs'], correct: 1, explain: 'Repérer faiblesses et zones d\'abri réduit le risque — pas les étages sans ingénieur.' },
      { q: 'Où placer le kit d\'urgence ?', options: ['Grenier fermé', 'Près d\'une sortie, accessible', 'Sous le lit enfoui'], correct: 1, explain: 'Accessible de nuit, même si le bâtiment est endommagé.' },
      { q: 'Pourquoi fixer les meubles lourds ?', options: ['Décoration', 'Éviter qu\'ils tombent sur les lits', 'Économiser l\'espace'], correct: 1, explain: 'Chute de armoires et frigos = cause fréquente de décès.' },
    ],
    kr: [
      { q: 'Anvan tranblemanntè, ki aksyon ki pi itil pou bilding ki pa reziste ?', options: ['Ajoute etaj vit', 'Idantifye fisè ak zòn ki an sekirite', 'Penti mi'], correct: 1, explain: 'Make feblès ak zòn abri diminye risk.' },
      { q: 'Ki kote pou mete kit ijan ?', options: ['Soulye fèmen', 'Tou pre yon pòt sorti', 'Anba kabann'], correct: 1, explain: 'Aksesib lannwit.' },
      { q: 'Poukisa mare meb lou yo ?', options: ['Dekorasyon', 'Evite yo tonbe sou kabann', 'Ekonomize espas'], correct: 1, explain: 'Amwa ki tonbe sou kabann touye moun.' },
    ],
    en: [
      { q: 'Before an earthquake, best action for non-seismic building?', options: ['Add a floor quickly', 'Identify cracks and safe zones', 'Paint walls'], correct: 1, explain: 'Spot weaknesses and shelter zones — not unengineered floors.' },
      { q: 'Where to place emergency kit?', options: ['Locked attic', 'Near exit, accessible', 'Buried under bed'], correct: 1, explain: 'Accessible at night even if building is damaged.' },
      { q: 'Why secure heavy furniture?', options: ['Decoration', 'Prevent falling onto beds', 'Save space'], correct: 1, explain: 'Falling wardrobes and fridges are a common killer.' },
    ],
    es: [
      { q: 'Antes de un sismo, ¿mejor acción para edificio no antisísmico?', options: ['Añadir piso rápido', 'Identificar grietas y zonas seguras', 'Pintar muros'], correct: 1, explain: 'Detectar debilidades y zonas de refugio.' },
      { q: '¿Dónde colocar el kit de emergencia?', options: ['Ático cerrado', 'Cerca de salida accesible', 'Bajo la cama'], correct: 1, explain: 'Accesible de noche.' },
      { q: '¿Por qué fijar muebles pesados?', options: ['Decoración', 'Evitar que caigan sobre camas', 'Ahorrar espacio'], correct: 1, explain: 'Armarios cayendo sobre camas matan con frecuencia.' },
    ],
  },
  {
    fr: [
      { q: 'Dans un bâtiment en béton non armé, pendant les secousses…', options: ['Descendre l\'escalier vite', 'Rester sous abri, éviter escaliers', 'Se tenir sur le balcon'], correct: 1, explain: 'Escaliers et étages supérieurs s\'effondrent en premier.' },
      { q: 'Première action pendant le séisme ?', options: ['Appeler les secours', 'Bese immédiatement', 'Ouvrir toutes les portes'], correct: 1, explain: 'Baissez le centre de gravité avant tout.' },
      { q: 'Faut-il sortir pendant les secousses ?', options: ['Oui, toujours', 'Non — débris des façades', 'Seulement au RDC'], correct: 1, explain: 'Tuiles et briques tombent — plus sûr sous abri intérieur.' },
    ],
    kr: [
      { q: 'Nan bilding beton san fè, pandan sekou yo…', options: ['Desann eskalye vit', 'Rete anba abri, evite eskalye', 'Kanpe sou balkon'], correct: 1, explain: 'Eskalye ak etaj anwo tonbe an premye.' },
      { q: 'Premye aksyon pandan tranblemanntè ?', options: ['Rele èd', 'Bese imedyatman', 'Ouvri tout pòt'], correct: 1, explain: 'Bese sant gravite anvan tout bagay.' },
      { q: 'Èske ou dwe soti pandan sekou yo ?', options: ['Wi', 'Non — debi sou façade', 'Sèlman anba kay'], correct: 1, explain: 'Twal ak brik tonbe.' },
    ],
    en: [
      { q: 'In unreinforced concrete building during shaking…', options: ['Run down stairs', 'Stay under cover, avoid stairs', 'Stand on balcony'], correct: 1, explain: 'Stairs and upper floors collapse first.' },
      { q: 'First action during earthquake?', options: ['Call emergency', 'Drop immediately', 'Open all doors'], correct: 1, explain: 'Lower center of gravity first.' },
      { q: 'Exit during shaking?', options: ['Yes always', 'No — facade debris', 'Ground floor only'], correct: 1, explain: 'Tiles and bricks fall — safer under indoor cover.' },
    ],
    es: [
      { q: 'En edificio de concreto sin refuerzo durante sacudida…', options: ['Bajar escaleras', 'Quedarse bajo cobertura', 'En balcón'], correct: 1, explain: 'Escaleras y pisos superiores colapsan primero.' },
      { q: '¿Primera acción durante sismo?', options: ['Llamar emergencias', 'Agacharse de inmediato', 'Abrir puertas'], correct: 1, explain: 'Bajar centro de gravedad primero.' },
      { q: '¿Salir durante sacudida?', options: ['Sí siempre', 'No — escombros de fachada', 'Solo planta baja'], correct: 1, explain: 'Tejas y ladrillos caen.' },
    ],
  },
  {
    fr: [
      { q: 'Après un séisme, bâtiment avec fissures diagonales…', options: ['Réintégrer pour récupérer objets', 'Ne pas réintégrer — attendre expert', 'Peindre les fissures'], correct: 1, explain: 'Répliques peuvent achever l\'effondrement.' },
      { q: 'Odeur de gaz après le choc :', options: ['Allumer une bougie', 'Couper le gaz, pas de flamme', 'Ouvrir toutes les fenêtres en courant'], correct: 1, explain: 'Risque d\'explosion — coupez et évacuez.' },
      { q: 'Fort séisme ressenti sur la côte :', options: ['Aller sur la plage vérifier', 'S\'éloigner de la mer (tsunami)', 'Rester dans le bâtiment'], correct: 1, explain: 'Tsunami possible après séisme côtier fort.' },
    ],
    kr: [
      { q: 'Apre tranblemanntè, bilding ak fisè diagonal…', options: ['Rantre pran bagay', 'Pa rantre — tann ekspè', 'Penti fisè'], correct: 1, explain: 'Replik ka fini fè bilding tonbe.' },
      { q: 'Santi gaz apre chòk :', options: ['Limyè chandèl', 'Koupe gaz, pa dife', 'Kouri ouvri fenèt'], correct: 1, explain: 'Risk eksplozyon.' },
      { q: 'Gwo sekou sou kòt :', options: ['Ale sou plaj', 'Ale lwen lanmè (tsunami)', 'Rete nan bilding'], correct: 1, explain: 'Tsunami posib.' },
    ],
    en: [
      { q: 'After earthquake, building with diagonal cracks…', options: ['Re-enter for belongings', 'Do not re-enter — wait for expert', 'Paint cracks'], correct: 1, explain: 'Aftershocks may complete collapse.' },
      { q: 'Gas smell after shock:', options: ['Light a candle', 'Shut off gas, no flames', 'Run opening windows'], correct: 1, explain: 'Explosion risk — shut off and evacuate.' },
      { q: 'Strong quake felt on coast:', options: ['Go to beach', 'Move inland (tsunami)', 'Stay in building'], correct: 1, explain: 'Tsunami possible after strong coastal quake.' },
    ],
    es: [
      { q: 'Tras sismo, edificio con grietas diagonales…', options: ['Reingresar por objetos', 'No reingresar — esperar experto', 'Pintar grietas'], correct: 1, explain: 'Réplicas pueden completar colapso.' },
      { q: 'Olor a gas tras choque:', options: ['Encender vela', 'Cortar gas, sin llamas', 'Correr abriendo ventanas'], correct: 1, explain: 'Riesgo de explosión.' },
      { q: 'Fuerte sismo en costa:', options: ['Ir a la playa', 'Alejarse del mar (tsunami)', 'Quedarse en edificio'], correct: 1, explain: 'Tsunami posible.' },
    ],
  },
]

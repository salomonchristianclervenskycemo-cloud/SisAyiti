export type QuizLang = "fr" | "kr" | "en" | "es"

export type QuizQuestion = {
  q: string
  options: string[]
  correct: number
}

export type SectionQuiz = Record<QuizLang, QuizQuestion[]>

/** Quiz questions per Comprendre section (0–4). */
export const comprendreQuizzes: SectionQuiz[] = [
  {
    "fr": [
      {
        "q": "La Micro-plaque de la Gonâve est coincée entre...",
        "options": [
          "Plaque Pacifique et Indo-Australienne",
          "Plaque Nord-Américaine et Caribéenne",
          "Plaque Africaine et Eurasienne"
        ],
        "correct": 1
      },
      {
        "q": "Le mouvement le long de la faille EPGF est principalement...",
        "options": [
          "Vertical (subduction)",
          "Horizontal (décrochement)",
          "Rotatif"
        ],
        "correct": 1
      },
      {
        "q": "Pourquoi Haïti accumule-t-il une si grande énergie sismique ?",
        "options": [
          "Activité volcanique intense",
          "Mouvement horizontal continu des plaques",
          "Érosion côtière rapide"
        ],
        "correct": 1
      }
    ],
    "kr": [
      {
        "q": "Mikwo-plak Gonav chita ant...",
        "options": [
          "Plak Pasifik ak Endo-Ostralyen",
          "Plak Nò-Ameriken ak Karayib",
          "Plak Afrik ak Ewòp-Azi"
        ],
        "correct": 1
      },
      {
        "q": "Mouvman sou fay EPGF la se prensipalman...",
        "options": [
          "Vètikal (subduksyon)",
          "Orizontal (fay dekouman)",
          "Wotasyon"
        ],
        "correct": 1
      },
      {
        "q": "Poukisa Ayiti chita sou anpil enèji sismik?",
        "options": [
          "Gwo aktivite volkanik",
          "Plak yo ap glise sou kote tout tan",
          "Ewozyon rapid sou kòt yo"
        ],
        "correct": 1
      }
    ],
    "en": [
      {
        "q": "The Gonâve microplate is caught between...",
        "options": [
          "Pacific and Indo-Australian plates",
          "North American and Caribbean plates",
          "African and Eurasian plates"
        ],
        "correct": 1
      },
      {
        "q": "Movement along the EPGF fault is mainly...",
        "options": [
          "Vertical (subduction)",
          "Horizontal (strike-slip)",
          "Rotational"
        ],
        "correct": 1
      },
      {
        "q": "Why does Haiti build up so much seismic energy?",
        "options": [
          "Intense volcanic activity",
          "Continuous horizontal plate motion",
          "Rapid coastal erosion"
        ],
        "correct": 1
      }
    ],
    "es": [
      {
        "q": "La microplaca de Gonâve está atrapada entre...",
        "options": [
          "Placas del Pacífico e Indo-Australiana",
          "Placas Norteamericana y Caribeña",
          "Placas Africana y Euroasiática"
        ],
        "correct": 1
      },
      {
        "q": "El movimiento a lo largo de la falla EPGF es principalmente...",
        "options": [
          "Vertical (subducción)",
          "Horizontal (desgarre)",
          "Rotacional"
        ],
        "correct": 1
      },
      {
        "q": "¿Por qué Haití acumula tanta energía sísmica?",
        "options": [
          "Actividad volcánica intensa",
          "Movimiento horizontal continuo de las placas",
          "Erosión costera rápida"
        ],
        "correct": 1
      }
    ]
  },
  {
    "fr": [
      {
        "q": "Les ondes P sont les plus rapides parce qu'elles sont...",
        "options": [
          "Longitudinales (compression)",
          "Transversales (cisaillement)",
          "Des ondes de surface"
        ],
        "correct": 0
      },
      {
        "q": "Les ondes S ne se propagent PAS dans...",
        "options": [
          "Les roches dures",
          "Les liquides",
          "L'eau salée"
        ],
        "correct": 1
      },
      {
        "q": "Pourquoi les ondes de surface sont-elles les plus destructrices ?",
        "options": [
          "Elles voyagent plus vite",
          "Elles transportent de l'énergie en surface et gardent grande amplitude",
          "Elles traversent le noyau"
        ],
        "correct": 1
      }
    ],
    "kr": [
      {
        "q": "Vag P yo pi rapid paske yo se vag...",
        "options": [
          "Longitudinèl (konpresyon)",
          "Transvès (chire)",
          "Sou sifas"
        ],
        "correct": 0
      },
      {
        "q": "Vag S yo pa ka pase nan...",
        "options": [
          "Wòch di",
          "Likid",
          "Dlo sale"
        ],
        "correct": 1
      },
      {
        "q": "Poukisa vag sou sifas yo pi destriktif?",
        "options": [
          "Yo pi rapid",
          "Yo pote anpil enèji sou sifas la",
          "Yo travèse nwayo a"
        ],
        "correct": 1
      }
    ],
    "en": [
      {
        "q": "P-waves are fastest because they are...",
        "options": [
          "Longitudinal (compression)",
          "Transverse (shear)",
          "Surface waves"
        ],
        "correct": 0
      },
      {
        "q": "S-waves do NOT travel through...",
        "options": [
          "Hard rock",
          "Liquids",
          "Salt water"
        ],
        "correct": 1
      },
      {
        "q": "Why are surface waves the most destructive?",
        "options": [
          "They travel faster",
          "They carry energy at the surface with large amplitude",
          "They cross the core"
        ],
        "correct": 1
      }
    ],
    "es": [
      {
        "q": "Las ondas P son las más rápidas porque son...",
        "options": [
          "Longitudinales (compresión)",
          "Transversales (cizallamiento)",
          "Ondas superficiales"
        ],
        "correct": 0
      },
      {
        "q": "Las ondas S NO se propagan en...",
        "options": [
          "Rocas duras",
          "Líquidos",
          "Agua salada"
        ],
        "correct": 1
      },
      {
        "q": "¿Por qué las ondas superficiales son las más destructivas?",
        "options": [
          "Viajan más rápido",
          "Transportan energía en la superficie con gran amplitud",
          "Atraviesan el núcleo"
        ],
        "correct": 1
      }
    ]
  },
  {
    "fr": [
      {
        "q": "La structure interne de la Terre a...",
        "options": [
          "2 couches (croûte et manteau)",
          "4 couches (croûte, manteau, noyau externe, interne)",
          "1 couche solide"
        ],
        "correct": 1
      },
      {
        "q": "Le noyau externe est...",
        "options": [
          "Solide et ferreux",
          "Liquide de fer-nickel (crée le champ magnétique)",
          "Une région gazeuse"
        ],
        "correct": 1
      },
      {
        "q": "Comment savons-nous que le noyau externe est liquide ?",
        "options": [
          "Par observation directe",
          "Parce que les ondes S ne le traversent pas",
          "Par l'étude du magnetisme"
        ],
        "correct": 1
      }
    ],
    "kr": [
      {
        "q": "Estrikti entèn tè a gen...",
        "options": [
          "2 kouch (kwòt ak mantò)",
          "4 kouch (kwòt, mantò, nwayo ekstèn, nwayo entèn)",
          "1 sèl kouch solid"
        ],
        "correct": 1
      },
      {
        "q": "Nwayo ekstèn nan se...",
        "options": [
          "Solid fè-nikel",
          "Fè-nikel likid (li fè jaden mayetik la)",
          "Yon zòn gaz"
        ],
        "correct": 1
      },
      {
        "q": "Kijan nou konnen nwayo ekstèn nan likid?",
        "options": [
          "Nou wè l dirèkteman",
          "Paske vag S yo pa ka pase ladan l",
          "Ak etid sou mayetis"
        ],
        "correct": 1
      }
    ],
    "en": [
      {
        "q": "Earth's internal structure has...",
        "options": [
          "2 layers (crust and mantle)",
          "4 layers (crust, mantle, outer core, inner core)",
          "1 solid layer"
        ],
        "correct": 1
      },
      {
        "q": "The outer core is...",
        "options": [
          "Solid iron",
          "Liquid iron-nickel (creates magnetic field)",
          "A gaseous region"
        ],
        "correct": 1
      },
      {
        "q": "How do we know the outer core is liquid?",
        "options": [
          "Direct observation",
          "Because S-waves cannot pass through it",
          "Magnetism studies"
        ],
        "correct": 1
      }
    ],
    "es": [
      {
        "q": "La estructura interna de la Tierra tiene...",
        "options": [
          "2 capas (corteza y manto)",
          "4 capas (corteza, manto, núcleo externo, interno)",
          "1 capa sólida"
        ],
        "correct": 1
      },
      {
        "q": "El núcleo externo es...",
        "options": [
          "Hierro sólido",
          "Hierro-níquel líquido (crea el campo magnético)",
          "Una región gaseosa"
        ],
        "correct": 1
      },
      {
        "q": "¿Cómo sabemos que el núcleo externo es líquido?",
        "options": [
          "Observación directa",
          "Porque las ondas S no lo atraviesan",
          "Estudios del magnetismo"
        ],
        "correct": 1
      }
    ]
  },
  {
    "fr": [
      {
        "q": "Le séisme de 1842 (Cap-Haïtien) a démontré...",
        "options": [
          "Risque côtier mineur",
          "L'importance des tsunamis post-sismiques",
          "Que les tremblements n'arrivent qu'une fois par siècle"
        ],
        "correct": 1
      },
      {
        "q": "Haïti 2010 (Mw 7.0) a été dévastateur principalement parce que...",
        "options": [
          "C'était le séisme le plus puissant de l'histoire",
          "L'aléa sismique était CONNU mais la vulnérabilité du bâti était EXTRÊME",
          "Port-au-Prince était à proximité de la faille"
        ],
        "correct": 1
      },
      {
        "q": "Haïti 2021 (Mw 7.2) était plus puissant que 2010, mais...",
        "options": [
          "Moins meurtrier (densité population différente)",
          "Tout aussi meurtrier",
          "N'a causé aucun dégât"
        ],
        "correct": 0
      }
    ],
    "kr": [
      {
        "q": "Tranblemanntè 1842 la (Kap Ayisyen) montre...",
        "options": [
          "Ti risk sou kòt yo",
          "Enpòtans tsunami apre tranblemanntè",
          "Tranblemanntè rive yon fwa pa syèk"
        ],
        "correct": 1
      },
      {
        "q": "Ayiti 2010 (Mw 7,0) te devasta paske...",
        "options": [
          "Se te pi gwo tranblemanntè nan istwa",
          "Risk la te konnen men bilding yo te twò fèb",
          "Pòtoprens te tou pre fay la"
        ],
        "correct": 1
      },
      {
        "q": "Ayiti 2021 (Mw 7,2) te pi fò pase 2010, men...",
        "options": [
          "Mwens moun mouri (episant pa tèlman peple)",
          "Menm kantite moun mouri",
          "Pa te fè okenn domaj"
        ],
        "correct": 0
      }
    ],
    "en": [
      {
        "q": "The 1842 earthquake (Cap-Haïtien) showed...",
        "options": [
          "Minor coastal risk",
          "The importance of post-earthquake tsunamis",
          "Earthquakes happen once per century"
        ],
        "correct": 1
      },
      {
        "q": "Haiti 2010 (Mw 7.0) was devastating mainly because...",
        "options": [
          "It was the most powerful earthquake ever",
          "Seismic hazard was KNOWN but building vulnerability was EXTREME",
          "Port-au-Prince was near the fault"
        ],
        "correct": 1
      },
      {
        "q": "Haiti 2021 (Mw 7.2) was stronger than 2010, but...",
        "options": [
          "Less deadly (different population density)",
          "Equally deadly",
          "Caused no damage"
        ],
        "correct": 0
      }
    ],
    "es": [
      {
        "q": "El sismo de 1842 (Cap-Haïtien) demostró...",
        "options": [
          "Riesgo costero menor",
          "La importancia de los tsunamis post-sísmicos",
          "Los sismos ocurren una vez por siglo"
        ],
        "correct": 1
      },
      {
        "q": "Haití 2010 (Mw 7.0) fue devastador principalmente porque...",
        "options": [
          "Fue el sismo más poderoso de la historia",
          "El peligro sísmico era CONOCIDO pero la vulnerabilidad del hábitat era EXTREMA",
          "Puerto Príncipe estaba cerca de la falla"
        ],
        "correct": 1
      },
      {
        "q": "Haití 2021 (Mw 7.2) fue más fuerte que 2010, pero...",
        "options": [
          "Menos mortífero (densidad poblacional diferente)",
          "Igual de mortífero",
          "No causó daños"
        ],
        "correct": 0
      }
    ]
  },
  {
    "fr": [
      {
        "q": "La Maçonnerie Chaînée consiste à...",
        "options": [
          "Utiliser uniquement de la pierre",
          "Encadrer les blocs par du béton armé aux niveaux",
          "Laisser les blocs libres de bouger"
        ],
        "correct": 1
      },
      {
        "q": "Le sable salé utilisé en construction est dangereux car...",
        "options": [
          "Il affaiblit la saveur du béton",
          "Il corrode rapidement les armatures acier (perte de résistance)",
          "Il augmente la flexibilité"
        ],
        "correct": 1
      },
      {
        "q": "Les fers lisses (vs fers striés) sont problématiques car...",
        "options": [
          "Ils sont moins chers",
          "Ils perdent adhérence lors des vibrations (glissement des armatures)",
          "Ils se dilatent plus facilement"
        ],
        "correct": 1
      }
    ],
    "kr": [
      {
        "q": "Masonri mare vle di...",
        "options": [
          "Itilize sèlman wòch",
          "Mare blòk yo ak poto ak pout an beton arme nan chak nivo",
          "Kite blòk yo lib pou yo bouje"
        ],
        "correct": 1
      },
      {
        "q": "Sab sale nan konstriksyon danjere paske...",
        "options": [
          "Li fè beton an gen move gou",
          "Li fè fè a koròde vit (bilding pèdi fòs)",
          "Li bay plis fleksibilite"
        ],
        "correct": 1
      },
      {
        "q": "Fè lis (okontrè fè estriye) pwoblematik paske...",
        "options": [
          "Yo pi bon mache",
          "Yo pa kenbe byen nan beton lè tè a tranble",
          "Yo dilate pi fasil"
        ],
        "correct": 1
      }
    ],
    "en": [
      {
        "q": "Confined masonry consists of...",
        "options": [
          "Using stone only",
          "Framing blocks with reinforced concrete at each level",
          "Leaving blocks free to move"
        ],
        "correct": 1
      },
      {
        "q": "Salt sand in construction is dangerous because...",
        "options": [
          "It weakens concrete flavor",
          "It quickly corrodes steel rebar (loss of strength)",
          "It increases flexibility"
        ],
        "correct": 1
      },
      {
        "q": "Smooth rebar (vs deformed) is problematic because...",
        "options": [
          "It is cheaper",
          "It loses bond during vibrations (rebar slip)",
          "It expands more easily"
        ],
        "correct": 1
      }
    ],
    "es": [
      {
        "q": "La mampostería confinada consiste en...",
        "options": [
          "Usar solo piedra",
          "Encuadrar bloques con concreto armado en cada nivel",
          "Dejar bloques libres para moverse"
        ],
        "correct": 1
      },
      {
        "q": "La arena salada en construcción es peligrosa porque...",
        "options": [
          "Debilita el sabor del concreto",
          "Corroe rápidamente el acero (pérdida de resistencia)",
          "Aumenta la flexibilidad"
        ],
        "correct": 1
      },
      {
        "q": "Varillas lisas (vs corrugadas) son problemáticas porque...",
        "options": [
          "Son más baratas",
          "Pierden adherencia con las vibraciones (deslizamiento)",
          "Se dilatan más fácilmente"
        ],
        "correct": 1
      }
    ]
  }
] as SectionQuiz[]

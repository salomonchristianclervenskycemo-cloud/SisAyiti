import type { Lang } from '@/lib/i18n'

type L = Record<Lang, string>
const s = (fr: string, kr: string, en: string, es: string): L => ({ fr, kr, en, es })

export const diagnosticScienceStrings: Record<string, L> = {
  'diag.science.what': s(
    'Estimation de la vulnérabilité sismique d\'un bâtiment à partir de 5 facteurs observables.',
    'Estimasyon konbyen yon bilding vilnerab devan tranblemanntè dapre 5 faktè ou ka wè.',
    'Estimate of a building\'s seismic vulnerability from 5 observable factors.',
    'Estimación de la vulnerabilidad sísmica de un edificio según 5 factores observables.'
  ),
  'diag.science.why': s(
    'En Haïti, la qualité du bâti explique l\'essentiel des victimes (2010) plus que la magnitude seule.',
    'Nan Ayiti, kalite bilding eksplike pifò lanmò (2010) plis pase magnitude sèlman.',
    'In Haiti, building quality explains most casualties (2010) more than magnitude alone.',
    'En Haití, la calidad constructiva explica la mayoría de víctimas (2010) más que la magnitud sola.'
  ),
  'diag.science.haiti': s(
    'Béton non armé, étages ajoutés sans ingénieur, sols meubles à PAP/Léogâne : profils très fréquents.',
    'Beton san fè, etaj ajoute san enjenyè, tè meb Pòtoprens/Legann : pwofil ki trè komen.',
    'Unreinforced concrete, unengineered added floors, soft soils in PAP/Léogâne: very common profiles.',
    'Concreto sin refuerzo, pisos añadidos sin ingeniero, suelos blandos en PAP/Léogâne: perfiles muy frecuentes.'
  ),
  'diag.science.limits': s(
    'Outil indicatif, pas un audit structural certifié. Faites appel à un ingénieur pour travaux lourds.',
    'Zouti endikatif, pa yon odit estrikti sètifye. Pran yon enjenyè pou gwo travay.',
    'Indicative tool, not a certified structural audit. Consult an engineer for major work.',
    'Herramienta indicativa, no auditoría estructural certificada. Consulte ingeniero para obras mayores.'
  ),
  'diag.science.impact': s(
    'Prioriser renforcement, fondations et toiture avant le prochain séisme.',
    'Priyorize ranfòsman, fondasyon ak twati anvan pwochen tranblemanntè a.',
    'Prioritize reinforcement, foundations and roof before the next earthquake.',
    'Priorice refuerzo, cimentación y techo antes del próximo sismo.'
  ),

  'diag.types.title': s(
    'Profils courants en Haïti',
    'Pwofil komen nan Ayiti',
    'Common profiles in Haiti',
    'Perfiles comunes en Haití'
  ),
  'diag.types.ngo.title': s('Maison parasismique (ONG)', 'Kay reziste (ONG)', 'Seismic-resistant home (NGO)', 'Vivienda antisísmica (ONG)'),
  'diag.types.ngo.desc': s(
    'Béton armé, fondations renforcées post-2010. Profil le plus résilient.',
    'Beton arme, fondasyon ranfòse apre 2010. Pi rezilyan.',
    'Reinforced concrete, strengthened foundations post-2010. Most resilient.',
    'Concreto armado, cimentación reforzada post-2010. Más resiliente.'
  ),
  'diag.types.pau.title': s('Maison populaire (PAU)', 'Kay popilè (PAU)', 'Popular concrete home', 'Vivienda popular (PAU)'),
  'diag.types.pau.desc': s(
    'Béton non armé, colonnes fines, étages ajoutés. Très vulnérable — fréquent à PAP.',
    'Beton san fè, kolòn mens, etaj ajoute. Trè vilnerab — komen Pòtoprens.',
    'Unreinforced concrete, thin columns, added floors. Very vulnerable — common in PAP.',
    'Concreto sin refuerzo, columnas finas, pisos añadidos. Muy vulnerable — común en PAP.'
  ),
  'diag.types.rural.title': s('Kay rural (bois / brik tè)', 'Kay riral (bwa / brik tè)', 'Rural home (wood / adobe)', 'Casa rural (madera / adobe)'),
  'diag.types.rural.desc': s(
    'Léger mais sensible à l\'humidité et aux pentes. Risque de glissement en mornes.',
    'Lejè men sansib imidite ak pant. Risk glisman sou mòn.',
    'Light but sensitive to moisture and slopes. Landslide risk on hillsides.',
    'Ligera pero sensible a humedad y pendientes. Riesgo de deslizamiento en laderas.'
  ),
  'diag.types.old.title': s('Immeuble ancien centre-ville', 'Bilding vye nan sant vil', 'Old downtown building', 'Edificio antiguo del centro'),
  'diag.types.old.desc': s(
    'Structure fatiguée, entretien limité, fondations inconnues. Vérification urgente.',
    'Estrikti fatige, antretyen limite, fondasyon enkoni. Verifye ijan.',
    'Fatigued structure, limited maintenance, unknown foundations. Urgent check.',
    'Estructura fatigada, mantenimiento limitado, cimentación desconocida. Verificación urgente.'
  ),

  'diag.wizard.step': s('Étape {current} / {total}', 'Etap {current} / {total}', 'Step {current} / {total}', 'Paso {current} / {total}'),
  'diag.wizard.hint.structure': s(
    'Le type de structure détermine ~40 % du risque d\'effondrement.',
    'Kalite estrikti detèmine ~40% risk tonbe.',
    'Structure type drives ~40% of collapse risk.',
    'El tipo de estructura determina ~40% del riesgo de colapso.'
  ),
  'diag.wizard.hint.foundation': s(
    'Fondations sur sol meuble (PAP) : liquéfaction possible.',
    'Fondasyon sou tè meb (Pòtoprens) : likefaksyon posib.',
    'Foundations on soft soil (PAP): liquefaction possible.',
    'Cimentación en suelo blando (PAP): licuefacción posible.'
  ),
  'diag.wizard.hint.condition': s(
    'Fissures en diagonale sur murs = signe d\'alerte structurel.',
    'Fisè diagonal sou mi = siyal alèt estrikti.',
    'Diagonal wall cracks = structural warning sign.',
    'Grietas diagonales en muros = señal de alerta estructural.'
  ),
  'diag.wizard.hint.age': s(
    'Bâtiments pré-1980 en Haïti : rarement conçus pour le parasismique.',
    'Bilding anvan 1980 nan Ayiti : raman fèt pou reziste tranblemanntè.',
    'Pre-1980 buildings in Haiti: rarely designed for earthquakes.',
    'Edificios pre-1980 en Haití: rara vez diseñados para sismos.'
  ),
  'diag.wizard.hint.terrain': s(
    'Pentes et ravines : risque glissement amplifié par le séisme.',
    'Pant ak ravin : risk glisman ogmante ak tranblemanntè.',
    'Slopes and ravines: landslide risk amplified by earthquakes.',
    'Pendientes y barrancos: riesgo de deslizamiento amplificado por sismos.'
  ),

  'diag.results.breakdown': s('Analyse par facteur', 'Analiz pa faktè', 'Factor breakdown', 'Análisis por factor'),
  'diag.results.resilience': s('Indice de résilience', 'Endis rezilyans', 'Resilience index', 'Índice de resiliencia'),
  'diag.results.context2010': s(
    'Rappel : en 2010, des bâtiments similaires se sont effondrés à PAP et Léogâne — la vulnérabilité du bâti a tué plus que le séisme seul.',
    'Rapèl : an 2010, bilding menm jan tonbe Pòtoprens ak Legann — vilnerabilite bilding te touye plis pase chòk la sèlman.',
    'Reminder: in 2010, similar buildings collapsed in PAP and Léogâne — building vulnerability killed more than the shock alone.',
    'Recordatorio: en 2010, edificios similares colapsaron en PAP y Léogâne — la vulnerabilidad del bâti mató más que el sismo solo.'
  ),
  'diag.results.ctaComprendre': s('Comprendre le risque', 'Konprann risk la', 'Understand the risk', 'Comprender el riesgo'),
  'diag.results.ctaPrevention': s('Gestes Bese-Pwoteje-Kenbe', 'Jès Bese-Pwoteje-Kenbe', 'Drop-Cover-Hold actions', 'Gestos Agáchate-Cúbrete'),
  'diag.results.ctaLabo': s('Simuler au laboratoire', 'Simile nan laboratwa', 'Simulate in lab', 'Simular en laboratorio'),

  'diag.factor.structure': s('Structure', 'Estrikti', 'Structure', 'Estructura'),
  'diag.factor.foundation': s('Fondation', 'Fondasyon', 'Foundation', 'Cimentación'),
  'diag.factor.condition': s('État', 'Eta', 'Condition', 'Estado'),
  'diag.factor.age': s('Âge', 'Laj', 'Age', 'Edad'),
  'diag.factor.terrain': s('Terrain', 'Tè', 'Terrain', 'Terreno'),
  'diag.factor.risk.low': s('Faible', 'Ba', 'Low', 'Bajo'),
  'diag.factor.risk.medium': s('Modéré', 'Modere', 'Moderate', 'Moderado'),
  'diag.factor.risk.high': s('Élevé', 'Wo', 'High', 'Alto'),
}

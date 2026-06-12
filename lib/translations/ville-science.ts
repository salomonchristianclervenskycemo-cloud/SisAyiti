import type { Lang } from '@/lib/i18n'

type L = Record<Lang, string>
const s = (fr: string, kr: string, en: string, es: string): L => ({ fr, kr, en, es })

export const villeScienceStrings: Record<string, L> = {
  'ville.subtitleLong': s(
    'Jouez le rôle du Maire, de l\'ingénieur MTPTC ou de la protection civile : étudiez les sols, zonez la ville, choisissez les matériaux et survivez aux 4 séismes historiques d\'Haïti.',
    'Jwe wòl Majistra, enjenyè MTPTC oswa pwoteksyon sivil : etidye tè yo, fè zonaj, chwazi materyèl epi siviv 4 tranblemanntè istorik Ayiti yo.',
    'Play Mayor, MTPTC engineer or civil protection: study soils, zone the city, choose materials and survive Haiti\'s 4 historical earthquakes.',
    'Jue alcalde, ingeniero MTPTC o protección civil: estudie suelos, zone la ciudad, elija materiales y sobreviva a los 4 sismos históricos de Haití.'
  ),

  'ville.path.title': s('Parcours urbanisme parasismique', 'Pèkòs planifikasyon vil', 'Seismic urban planning path', 'Recorrido de urbanismo antisísmico'),
  'ville.path.hint': s(
    'Complétez les 4 étapes puis survivez aux 4 phases sismiques haïtiennes.',
    'Fini 4 etap yo epi siviv 4 faz tranblemanntè ayisyen yo.',
    'Complete the 4 steps then survive the 4 Haitian seismic phases.',
    'Complete los 4 pasos y sobreviva a las 4 fases sísmicas haitianas.'
  ),
  'ville.path.progress': s(
    '{phases}/4 phases testées · {campaigns} campagne(s) terminée(s)',
    '{phases}/4 faz teste · {campaigns} kanpay fini',
    '{phases}/4 phases tested · {campaigns} campaign(s) completed',
    '{phases}/4 fases probadas · {campaigns} campaña(s) completada(s)'
  ),
  'ville.path.ctaComprendre': s('Les ondes sismiques', 'Vag tranblemanntè', 'Seismic waves', 'Ondas sísmicas'),
  'ville.path.ctaDiagnostic': s('Évaluer un bâtiment', 'Evalye yon bilding', 'Assess a building', 'Evaluar un edificio'),
  'ville.path.ctaLabo': s('Simuler un séisme', 'Simile tranblemanntè', 'Simulate earthquake', 'Simular sismo'),
  'ville.path.ctaPrevention': s('Gestes Bese-Pwoteje-Kenbe', 'Jès Bese-Pwoteje-Kenbe', 'Drop-Cover-Hold On', 'Agáchate-Cúbrete-Agárrate'),

  'ville.topic.soil': s('Sols', 'Tè', 'Soils', 'Suelos'),
  'ville.topic.zoning': s('Zonage', 'Zonaj', 'Zoning', 'Zonificación'),
  'ville.topic.materials': s('Matériaux', 'Materyèl', 'Materials', 'Materiales'),
  'ville.topic.campaign': s('Campagne', 'Kanpay', 'Campaign', 'Campaña'),

  'ville.campaign.intro': s(
    '4 séismes réels — du modéré au catastrophique. Chaque phase teste vos choix de sol, zonage et matériaux.',
    '4 tranblemanntè reyèl — soti modere rive katastwòfik. Chak faz teste chwa tè, zonaj ak materyèl ou yo.',
    '4 real earthquakes — from moderate to catastrophic. Each phase tests your soil, zoning and material choices.',
    '4 sismos reales — de moderado a catastrófico. Cada fase prueba sus elecciones de suelo, zonificación y materiales.'
  ),

  'ville.science.soil.what': s(
    'Avant de construire, identifier roche, sol meuble ou argile sur chaque parcelle.',
    'Anvan konstwi, idantifye wòch, tè meb oswa ajil sou chak tè.',
    'Before building, identify rock, soft soil or clay on each parcel.',
    'Antes de construir, identificar roca, suelo blando o arcilla en cada parcela.'
  ),
  'ville.science.soil.why': s(
    'L\'effet de site multiplie les secousses : argile et alluvions = amplification ×2 à ×3,5 vs roche.',
    'Efè sit ogmante sekou yo : ajil ak aluvyon = ×2 rive ×3,5 konpare ak wòch.',
    'Site effect multiplies shaking: clay and alluvium = ×2 to ×3.5 vs rock.',
    'El efecto de sitio multiplica la sacudida: arcilla y aluvión = ×2 a ×3,5 vs roca.'
  ),
  'ville.science.soil.haiti': s(
    'Port-au-Prince et Léogâne reposent sur sols meubles : hôpitaux et écoles doivent être sur roche (R).',
    'Pòtoprens ak Legann sou tè meb : lopital ak lekòl dwe sou wòch (R).',
    'Port-au-Prince and Léogâne sit on soft soils: hospitals and schools must be on rock (R).',
    'Puerto Príncipe y Léogâne están en suelos blandos: hospitales y escuelas deben ir en roca (R).'
  ),
  'ville.science.soil.limits': s(
    'La grille est simplifiée — une vraie ville nécessite des études géotechniques par parcelle.',
    'Kat la senp — yon vrè vil bezwen etid jewoteknik pou chak tè.',
    'The grid is simplified — a real city needs geotechnical studies per parcel.',
    'La cuadrícula es simplificada — una ciudad real necesita estudios geotécnicos por parcela.'
  ),
  'ville.science.soil.impact': s(
    'Construire un hôpital sur argile (A) sans zonage = effondrement quasi certain en phase 3 (2010).',
    'Konstwi lopital sou ajil (A) san zonaj = tonbe prèske sèten nan faz 3 (2010).',
    'Building a hospital on clay (A) without zoning = near-certain collapse in phase 3 (2010).',
    'Construir hospital en arcilla (A) sin zonificación = colapso casi seguro en fase 3 (2010).'
  ),

  'ville.science.zoning.what': s(
    'Le Maire verrouille les parcelles instables pour interdire bâtiments lourds (hôpitaux, écoles).',
    'Majistra fèmen tè enstab yo pou entèdi bilding lou (lopital, lekòl).',
    'The Mayor locks unstable parcels to ban heavy buildings (hospitals, schools).',
    'El alcalde bloquea parcelas inestables para prohibir edificios pesados (hospitales, escuelas).'
  ),
  'ville.science.zoning.why': s(
    'Sans zonage, la pression urbaine pousse à construire partout — comme les étages ajoutés non calculés en Haïti.',
    'San zonaj, presyon iben pouse konstwi tout kote — tankou etaj ajoute san kalkil nan Ayiti.',
    'Without zoning, urban pressure builds everywhere — like uncalculated added floors in Haiti.',
    'Sin zonificación, la presión urbana construye en todas partes — como pisos añadidos sin cálculo en Haití.'
  ),
  'ville.science.zoning.haiti': s(
    'Après 2010, le MTPTC a renforcé le zonage sismique — dans le jeu, le rôle Maire simule cette responsabilité.',
    'Apre 2010, MTPTC ranfòse zonaj — nan jwèt la, wòl Majistra simile responsabilite sa a.',
    'After 2010, MTPTC strengthened seismic zoning — in the game, the Mayor role simulates this duty.',
    'Tras 2010, el MTPTC reforzó la zonificación — en el juego, el rol de alcalde simula esta responsabilidad.'
  ),
  'ville.science.zoning.limits': s(
    'Le zonage seul ne suffit pas — il faut aussi de bons matériaux et des renforts ingénieur.',
    'Zonaj sèlman pa ase — fòk gen bon materyèl ak ranfòsman enjenyè tou.',
    'Zoning alone isn\'t enough — good materials and engineer reinforcements are also needed.',
    'La zonificación sola no basta — también se necesitan buenos materiales y refuerzos de ingeniero.'
  ),
  'ville.science.zoning.impact': s(
    'Bloquer un hôpital sur argile peut sauver des centaines de vies simulées à la phase 3.',
    'Bloke lopital sou ajil ka sove dè santèn lavi simile nan faz 3.',
    'Blocking a hospital on clay can save hundreds of simulated lives in phase 3.',
    'Bloquear un hospital en arcilla puede salvar cientos de vidas simuladas en la fase 3.'
  ),

  'ville.science.materials.what': s(
    'Choix entre béton parasismique, blocs non armés, bois et adobe — chacun a un coût et une résistance différents.',
    'Chwa ant beton parasismik, blòk san fè, bwa ak adobe — chak gen pri ak rezistans diferan.',
    'Choice between seismic concrete, unreinforced blocks, wood and adobe — each has different cost and resistance.',
    'Elección entre concreto antisísmico, bloques sin refuerzo, madera y adobe — cada uno con distinto costo y resistencia.'
  ),
  'ville.science.materials.why': s(
    'Blocs ciment non armé (×1 coût, résistance 0,3) = profil dominant des effondrements 2010.',
    'Blòk siman san fè (×1 pri, rezistans 0,3) = pwofil dominan tonbe 2010.',
    'Unreinforced cement blocks (×1 cost, 0.3 resistance) = dominant 2010 collapse profile.',
    'Bloques sin refuerzo (×1 costo, resistencia 0,3) = perfil dominante de colapsos 2010.'
  ),
  'ville.science.materials.haiti': s(
    'Maçonnerie chaînée + poteaux/poutres BA (parasismique) = norme post-2010 des ONG — coûteux mais vital.',
    'Masonri mare + poto/pout BA (parasismik) = nòm ONG apre 2010 — chè men esansyèl.',
    'Confined masonry + RC columns/beams (seismic) = post-2010 NGO standard — costly but vital.',
    'Mampostería confinada + columnas/vigas BA (antisísmico) = estándar ONG post-2010 — costoso pero vital.'
  ),
  'ville.science.materials.limits': s(
    'Le bois est flexible mais mal ancré = toiture arrachée. L\'adobe = très fragile en zone sismique.',
    'Bwa fleksib men mal mare = twati ka ale. Adobe = trè frajil nan zòn tranblemanntè.',
    'Wood is flexible but poorly anchored = roof torn off. Adobe = very fragile in seismic zones.',
    'La madera es flexible pero mal anclada = techo arrancado. Adobe = muy frágil en zona sísmica.'
  ),
  'ville.science.materials.impact': s(
    'Renfort ingénieur (+55k à +140k HTG/niveau) peut compenser un mauvais matériau — mais pas à l\'infini.',
    'Ranfòsman enjenyè (+55k rive +140k HTG/nivo) ka konpense move materyèl — men pa pou tout tan.',
    'Engineer reinforcement (+55k to +140k HTG/level) can offset poor material — but not indefinitely.',
    'Refuerzo de ingeniero (+55k a +140k HTG/nivel) puede compensar mal material — pero no indefinidamente.'
  ),

  'ville.science.campaign.what': s(
    'Campagne en 4 phases : M5,2 → M6,1 → M7,0 (2010) → M7,6 (2021 Nippes).',
    'Kanpay 4 faz : M5,2 → M6,1 → M7,0 (2010) → M7,6 (2021 Nip).',
    '4-phase campaign: M5.2 → M6.1 → M7.0 (2010) → M7.6 (2021 Nippes).',
    'Campaña 4 fases: M5,2 → M6,1 → M7,0 (2010) → M7,6 (2021 Nippes).'
  ),
  'ville.science.campaign.why': s(
    'Tester progressivement permet d\'apprendre : réparer entre les phases (+350 000 HTG d\'aide).',
    'Teste piti piti pèmèt aprann : repare ant faz yo (+350 000 HTG èd).',
    'Progressive testing allows learning: repair between phases (+350,000 HTG aid).',
    'Probar progresivamente permite aprender: reparar entre fases (+350 000 HTG de ayuda).'
  ),
  'ville.science.campaign.haiti': s(
    'Phase 3 reproduit le 12 janvier 2010 — si votre ville tient, vous avez appliqué les leçons de SisAyiti.',
    'Faz 3 repwodui 12 janvye 2010 — si vil ou kenbe, ou aplike leson SisAyiti yo.',
    'Phase 3 reproduces January 12, 2010 — if your city holds, you\'ve applied SisAyiti\'s lessons.',
    'La fase 3 reproduce el 12 de enero de 2010 — si su ciudad resiste, aplicó las lecciones de SisAyiti.'
  ),
  'ville.science.campaign.limits': s(
    'Grille 5×5 et budget simplifiés — la vraie planification urbaine est bien plus complexe.',
    'Kat 5×5 ak bidjè senp — vrè planifikasyon vil pi konplike anpil.',
    '5×5 grid and simplified budget — real urban planning is far more complex.',
    'Cuadrícula 5×5 y presupuesto simplificado — la planificación urbana real es mucho más compleja.'
  ),
  'ville.science.campaign.impact': s(
    'Objectif : >80 % des bâtiments intacts et budget positif à la fin = excellente planification.',
    'Objektif : >80% bilding an entegrite ak bidjè pozitif = ekselan planifikasyon.',
    'Goal: >80% buildings intact and positive budget at end = excellent planning.',
    'Objetivo: >80% edificios intactos y presupuesto positivo al final = excelente planificación.'
  ),

  'ville.cta.prevention': s(
    'Votre ville a tenu ? Apprenez les gestes de protection pour les vrais séismes',
    'Vil ou kenbe ? Aprann jès pwoteksyon pou vrè tranblemanntè yo',
    'City held up? Learn protection gestures for real earthquakes',
    '¿Resistió su ciudad? Aprenda gestos de protección para sismos reales'
  ),

  'ville.leaderboard.title': s('Classement — Campagne Haïti', 'Klasman — Kanpay Ayiti', 'Leaderboard — Haiti Campaign', 'Clasificación — Campaña Haití'),
  'ville.leaderboard.loading': s('Chargement…', 'Chajman…', 'Loading…', 'Cargando…'),
  'ville.leaderboard.empty': s(
    'Aucun score enregistré pour l\'instant. Terminez une campagne !',
    'Poko gen nòt. Fini yon kanpay!',
    'No scores yet. Finish a campaign!',
    'Aún no hay puntuaciones. ¡Termine una campaña!'
  ),
}

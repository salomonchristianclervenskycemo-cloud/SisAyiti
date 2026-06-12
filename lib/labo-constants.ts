export const SOIL_OPTIONS = [
  {
    id: "rock",
    labelFr: "Roche (Vs30 > 800)",
    labelKr: "Wòch (Vs30 > 800)",
    labelEn: "Rock (Vs30 > 800)",
    labelEs: "Roca (Vs30 > 800)",
    factor: 1.0,
    color: "text-gray-400",
  },
  {
    id: "alluvial",
    labelFr: "Sol alluvionnaire (Vs30 ~250)",
    labelKr: "Tè aluvyal (Vs30 ~250)",
    labelEn: "Alluvial soil (Vs30 ~250)",
    labelEs: "Suelo aluvial (Vs30 ~250)",
    factor: 1.8,
    color: "text-yellow-400",
  },
  {
    id: "saturated",
    labelFr: "Sol saturé / mou (Vs30 < 150)",
    labelKr: "Tè mou / satire (Vs30 < 150)",
    labelEn: "Soft / saturated soil (Vs30 < 150)",
    labelEs: "Suelo blando / saturado (Vs30 < 150)",
    factor: 2.5,
    color: "text-red-400",
  },
]

export const INTENSITY_COLORS = ["", "#22c55e","#4ade80","#86efac","#fde047","#fb923c","#f97316","#ef4444","#dc2626","#b91c1c","#7f1d1d","#450a0a","#1a0000"]
export const INTENSITY_LABELS = ["", "I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"]

export const INTENSITY_DESC_FR = [
  "", "Imperceptible", "Très faible", "Faible", "Largement ressenti",
  "Fort", "Dommages légers", "Dommages", "Destructions graves",
  "Destructions généralisées", "Catastrophique", "Désastre total", "Maximum"
]

export const INTENSITY_DESC_KR = [
  "", "Pa santi", "Trè fèb", "Fèb", "Anpil moun santi",
  "Fò", "Ti domaj", "Domaj", "Destriksyon grav",
  "Destriksyon jeneralize", "Katastwòfik", "Dezas total", "Maksimòm"
]

export const INTENSITY_DESC_EN = [
  "", "Not felt", "Very weak", "Weak", "Widely felt",
  "Strong", "Light damage", "Damage", "Heavy damage",
  "Widespread destruction", "Catastrophic", "Total disaster", "Maximum"
]

export const INTENSITY_DESC_ES = [
  "", "Imperceptible", "Muy débil", "Débil", "Ampliamente sentido",
  "Fuerte", "Daños leves", "Daños", "Destrucción grave",
  "Destrucción generalizada", "Catastrófico", "Desastre total", "Máximo"
]

export const INTENSITY_DESC: Record<string, string[]> = {
  fr: INTENSITY_DESC_FR,
  kr: INTENSITY_DESC_KR,
  en: INTENSITY_DESC_EN,
  es: INTENSITY_DESC_ES,
}

export type LaboScenario = {
  id: string
  name: string
  mag: number
  dist: number
  soil: string
  observed: number
  descFr: string
  descKr: string
  descEn: string
  descEs: string
  lessonFr: string
  lessonKr: string
  lessonEn: string
  lessonEs: string
}

export const REAL_SCENARIOS: LaboScenario[] = [
  {
    id: "haiti-2010-pap",
    name: "Haïti 2010 — Port-au-Prince",
    mag: 7.0, dist: 13, soil: "alluvial",
    observed: 9,
    descFr: "Mw 7,0, foyer à 13 km, sol alluvionnaire sous PAP. Intensité observée IX.",
    descKr: "Mw 7,0, fokis 13 km, tè aluvyal anba Pòtoprens. Entansite obsève IX.",
    descEn: "Mw 7.0, focus at 13 km, alluvial soil under Port-au-Prince. Observed intensity IX.",
    descEs: "Mw 7,0, foco a 13 km, suelo aluvial bajo Puerto Príncipe. Intensidad observada IX.",
    lessonFr: "Proximité + sol meuble + bâtiments non parasismiques = catastrophe malgré une magnitude « modérée ».",
    lessonKr: "Pwoksimite + tè meb + bilding ki pa reziste = katastwòf malgre magnitude « modere ».",
    lessonEn: "Proximity + soft soil + non-seismic buildings = catastrophe despite « moderate » magnitude.",
    lessonEs: "Proximidad + suelo blando + edificios no antisísmicos = catástrofe pese a magnitud « moderada ».",
  },
  {
    id: "haiti-2010-leogane",
    name: "Haïti 2010 — Léogâne",
    mag: 7.0, dist: 5, soil: "saturated",
    observed: 10,
    descFr: "Mw 7,0, à ~5 km du foyer, sols saturés et liquéfaction. Intensité X–XI localement.",
    descKr: "Mw 7,0, ~5 km nan fokis, tè satire ak likefaksyon. Entansite X–XI lokalman.",
    descEn: "Mw 7.0, ~5 km from focus, saturated soils and liquefaction. Intensity X–XI locally.",
    descEs: "Mw 7,0, ~5 km del foco, suelos saturados y licuefacción. Intensidad X–XI localmente.",
    lessonFr: "Léogâne était plus proche et sur sols saturés : liquéfaction = bâtiments qui coulent ou basculent.",
    lessonKr: "Legann te pi pre epi sou tè satire : likefaksyon = bilding ki koule oswa bese.",
    lessonEn: "Léogâne was closer on saturated soils: liquefaction = buildings sink or tilt.",
    lessonEs: "Léogâne estaba más cerca en suelos saturados: licuefacción = edificios que se hunden o inclinan.",
  },
  {
    id: "haiti-2021-nippes",
    name: "Haïti 2021 — Nippes",
    mag: 7.2, dist: 10, soil: "alluvial",
    observed: 8,
    descFr: "Mw 7,2, foyer à 10 km, sol mixte dans Nippes. Intensité observée VIII.",
    descKr: "Mw 7,2, fokis 10 km, tè melanje nan Nip. Entansite obsève VIII.",
    descEn: "Mw 7.2, focus at 10 km, mixed soil in Nippes. Observed intensity VIII.",
    descEs: "Mw 7,2, foco a 10 km, suelo mixto en Nippes. Intensidad observada VIII.",
    lessonFr: "Magnitude plus forte que 2010 mais zone moins urbanisée : moins de victimes, mais destructions massives.",
    lessonKr: "Magnitid pi fò pase 2010 men zòn mwens ibenize : mwens viktim, men gwo destriksyon.",
    lessonEn: "Stronger magnitude than 2010 but less urbanized area: fewer casualties, still massive destruction.",
    lessonEs: "Magnitud mayor que 2010 pero zona menos urbanizada: menos víctimas, destrucción masiva igual.",
  },
  {
    id: "haiti-cap-rock",
    name: "Cap-Haïtien — sol rocheux (hypothèse)",
    mag: 7.0, dist: 80, soil: "rock",
    observed: 5,
    descFr: "Même Mw 7,0 mais à 80 km sur roche : secousses modérées, dommages localisés.",
    descKr: "Menm Mw 7,0 men 80 km sou wòch : sekou modere, domaj lokalize.",
    descEn: "Same Mw 7.0 but 80 km on rock: moderate shaking, localized damage.",
    descEs: "Mismo Mw 7,0 pero a 80 km en roca: sacudida moderada, daños localizados.",
    lessonFr: "La distance et le sol rocheux atténuent fortement les effets — mais ne suppriment pas tout risque.",
    lessonKr: "Distans ak tè wòch diminye anpil efè yo — men risk la pa disparèt nèt.",
    lessonEn: "Distance and rock soil strongly attenuate effects — but risk doesn\'t disappear entirely.",
    lessonEs: "La distancia y el suelo rocoso atenúan mucho los efectos — pero el riesgo no desaparece del todo.",
  },
]

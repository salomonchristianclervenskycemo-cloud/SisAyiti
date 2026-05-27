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

export const REAL_SCENARIOS = [
  {
    name: "Haïti 2010 — Port-au-Prince",
    mag: 7.0, dist: 13, soil: "alluvial",
    observed: 9,
    descFr: "Mw 7,0, foyer à 13 km, sol alluvionnaire sous PAP. Intensité observée IX.",
    descKr: "Mw 7,0, fokis 13 km, tè aluvyal anba Pòtoprens. Entansite obsève IX.",
    descEn: "Mw 7.0, focus at 13 km, alluvial soil under Port-au-Prince. Observed intensity IX.",
    descEs: "Mw 7,0, foco a 13 km, suelo aluvial bajo Puerto Príncipe. Intensidad observada IX.",
  },
  {
    name: "Haïti 2021 — Nippes",
    mag: 7.2, dist: 10, soil: "alluvial",
    observed: 8,
    descFr: "Mw 7,2, foyer à 10 km, sol mixte dans Nippes. Intensité observée VIII.",
    descKr: "Mw 7,2, fokis 10 km, tè melanje nan Nip. Entansite obsève VIII.",
    descEn: "Mw 7.2, focus at 10 km, mixed soil in Nippes. Observed intensity VIII.",
    descEs: "Mw 7,2, foco a 10 km, suelo mixto en Nippes. Intensidad observada VIII.",
  },
]

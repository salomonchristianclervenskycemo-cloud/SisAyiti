// Approximation de la fonction de répartition de la loi normale (CDF)
function normalCDF(x: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x))
  const d = 0.3989423 * Math.exp((-x * x) / 2)
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  return x > 0 ? 1 - p : p
}

// Calcule le PGA (Peak Ground Acceleration) en g
// Basé sur une équation d'atténuation empirique (GMPE) simplifiée type Esteva (1970) adaptée pour Haïti
export function calcPGA(mag: number, dist: number, soilFactor: number): number {
  // R est la distance hypocentrale estimée (en ajoutant une profondeur moyenne de 10km)
  const R = Math.sqrt(dist * dist + 10 * 10)
  
  // Formule empirique : PGA (cm/s²) = 5600 * exp(0.8 * M) / (R + 40)^2
  const pga_cm_s2 = (5600 * Math.exp(0.8 * mag)) / Math.pow(R + 40, 2)
  
  // Conversion en g (1g = 981 cm/s²) et application du facteur d'amplification de site (effet de site)
  let pga_g = (pga_cm_s2 / 981) * soilFactor

  // Plafonnement réaliste (le sol ne peut pas amplifier à l'infini sans se rompre/liquéfier)
  if (pga_g > 2.5) pga_g = 2.5

  return pga_g
}

// Convertit le PGA en Intensité EMS-98 (Basé sur les corrélations de Wald et al. 1999 / Worden et al. 2012)
export function pgaToIntensity(pga: number): number {
  if (pga < 0.0017) return 1 // I
  if (pga < 0.014)  return 2 // II-III (regroupé sur 2 pour l'échelle)
  if (pga < 0.039)  return 4 // IV
  if (pga < 0.092)  return 5 // V
  if (pga < 0.18)   return 6 // VI
  if (pga < 0.34)   return 7 // VII
  if (pga < 0.65)   return 8 // VIII
  if (pga < 1.24)   return 9 // IX
  if (pga < 2.00)   return 10 // X
  if (pga < 2.50)   return 11 // XI
  return 12 // XII
}

export type BuildingQuality = "poor" | "fair" | "good"
export type DamageState = "none" | "slight" | "moderate" | "extensive" | "complete"

// Paramètres des courbes de fragilité (médiane PGA en g, écart-type beta)
// Ajustés pour refléter la réalité du parc immobilier haïtien (très vulnérable en "poor")
const FRAGILITY_PARAMS = {
  poor: { // Auto-construction sans normes, béton de mauvaise qualité, fers lisses
    slight: { mu: 0.04, beta: 0.6 },
    moderate: { mu: 0.08, beta: 0.6 },
    extensive: { mu: 0.15, beta: 0.6 },
    complete: { mu: 0.25, beta: 0.6 }, // S'effondre très vite (ex: 2010)
  },
  fair: { // Construction standard moyenne
    slight: { mu: 0.08, beta: 0.6 },
    moderate: { mu: 0.15, beta: 0.6 },
    extensive: { mu: 0.30, beta: 0.6 },
    complete: { mu: 0.50, beta: 0.6 },
  },
  good: { // Construction parasismique, maçonnerie chaînée, normes respectées
    slight: { mu: 0.15, beta: 0.6 },
    moderate: { mu: 0.30, beta: 0.6 },
    extensive: { mu: 0.60, beta: 0.6 },
    complete: { mu: 0.95, beta: 0.6 }, // Très résistant
  }
}

// Calcule la probabilité d'atteindre ou dépasser chaque état de dommage
export function calculateDamageProbabilities(pga: number, quality: BuildingQuality) {
  const params = FRAGILITY_PARAMS[quality]
  
  if (pga <= 0.001) {
    return { none: 1, slight: 0, moderate: 0, extensive: 0, complete: 0 }
  }

  const prob = (mu: number, beta: number) => normalCDF((Math.log(pga) - Math.log(mu)) / beta)

  const pComplete = prob(params.complete.mu, params.complete.beta)
  const pExtensive = prob(params.extensive.mu, params.extensive.beta) - pComplete
  const pModerate = prob(params.moderate.mu, params.moderate.beta) - prob(params.extensive.mu, params.extensive.beta)
  const pSlight = prob(params.slight.mu, params.slight.beta) - prob(params.moderate.mu, params.moderate.beta)
  const pNone = 1 - prob(params.slight.mu, params.slight.beta)

  return {
    none: Math.max(0, pNone),
    slight: Math.max(0, pSlight),
    moderate: Math.max(0, pModerate),
    extensive: Math.max(0, pExtensive),
    complete: Math.max(0, pComplete)
  }
}

// Détermine l'état de dommage le plus probable
export function getMostProbableDamageState(probs: ReturnType<typeof calculateDamageProbabilities>): DamageState {
  let maxProb = -1
  let state: DamageState = "none"
  
  for (const [key, value] of Object.entries(probs)) {
    if (value > maxProb) {
      maxProb = value
      state = key as DamageState
    }
  }
  return state
}

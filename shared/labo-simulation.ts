/** Pure lab simulation math — no React dependencies. */

import {
  calcPGA,
  pgaToIntensity,
  calculateDamageProbabilities,
  getMostProbableDamageState,
  type BuildingQuality,
  type DamageState,
} from "@/lib/seismic-engine"

export type LaboSimulationInput = {
  magnitude: number
  distance: number
  soilFactor: number
  buildingQuality: BuildingQuality
}

export type LaboSimulationResult = {
  pga: number
  intensity: number
  damageState: DamageState
  damageProbs: ReturnType<typeof calculateDamageProbabilities>
  energyJoules: number
  tntTons: number
  hiroshimaBombs: number
  feltRadius: number
  isDangerous: boolean
  isFatal: boolean
}

export function runLaboSimulation(input: LaboSimulationInput): LaboSimulationResult {
  const { magnitude, distance, soilFactor, buildingQuality } = input
  const pga = calcPGA(magnitude, distance, soilFactor)
  const intensity = pgaToIntensity(pga)
  const damageProbs = calculateDamageProbabilities(pga, buildingQuality)
  const damageState = getMostProbableDamageState(damageProbs)
  const energyJoules = Math.pow(10, 1.5 * magnitude + 4.8)
  const tntTons = energyJoules / (4.184 * Math.pow(10, 9))
  const hiroshimaBombs = tntTons / 15_000
  const feltRadius = Math.round(Math.pow(10, (magnitude - 4) * 0.5) * 50)
  const isDangerous = damageState === "extensive" || damageState === "complete"
  const isFatal = damageState === "complete" && damageProbs.complete > 0.8

  return {
    pga,
    intensity,
    damageState,
    damageProbs,
    energyJoules,
    tntTons,
    hiroshimaBombs,
    feltRadius,
    isDangerous,
    isFatal,
  }
}

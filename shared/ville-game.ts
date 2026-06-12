/**
 * Moteur de simulation parasismique — logique pure (web + RN).
 * Grille 5×5, budget municipal, rôles Ingénieur / Protection civile / Maire.
 */

export type TerrainType = "rock" | "soft" | "clay"
/** @deprecated Alias — use TerrainType */
export type SoilType = TerrainType | "alluvial" | "coastal" | null

export type BuildingType = "school" | "house" | "hospital" | "rescue" | null
export type ConstructType = "parasismique" | "ciment" | "bois" | "adobe" | null
export type PlayerRole = "engineer" | "civil" | "mayor"
export type ShakeResult = "good" | "damaged" | "collapsed"
export type GameStep = 1 | 2 | 3 | 4

export interface VilleCell {
  id: number
  terrain: TerrainType | null
  soilRevealed: boolean
  building: BuildingType
  construct: ConstructType
  reinforceLevel: number
  sensitized: boolean
  zoningLocked: boolean
  /** Dégâts post-séisme — réparables entre les phases */
  damage: ShakeResult | null
  repairSpent: number
}

export interface SimulationReport {
  results: Record<number, ShakeResult>
  intactCount: number
  damagedCount: number
  collapsedCount: number
  totalBuildings: number
  intactPct: number
  livesSaved: number
  livesAtRisk: number
  repairCostHtg: number
  magnitude: number
}

export const GRID_SIZE = 5
/** Budget municipal initial (campagne parasismique Haïti). */
export const BUDGET_START = 2_000_000
/** Aide d’urgence entre deux phases sismiques historiques. */
export const PHASE_BONUS_HTG = 350_000
export const MAGNITUDE_MIN = 5
export const MAGNITUDE_MAX = 8

export interface HaitiEarthquakePhase {
  id: number
  magnitude: number
  labelKey: string
  detailKey: string
}

/** Séismes historiques d’Haïti — du moins au plus dangereux (4 tours). */
export const HAITI_EARTHQUAKE_PHASES: HaitiEarthquakePhase[] = [
  { id: 1, magnitude: 5.2, labelKey: "ville.phase.1.title", detailKey: "ville.phase.1.detail" },
  { id: 2, magnitude: 6.1, labelKey: "ville.phase.2.title", detailKey: "ville.phase.2.detail" },
  { id: 3, magnitude: 7.0, labelKey: "ville.phase.3.title", detailKey: "ville.phase.3.detail" },
  { id: 4, magnitude: 7.6, labelKey: "ville.phase.4.title", detailKey: "ville.phase.4.detail" },
]

const SHAKE_RANK: Record<ShakeResult, number> = { good: 1, damaged: 2, collapsed: 3 }

export const COST_GEO_STUDY = 28_000
export const COST_SENSITIZATION = 18_000
export const COST_ZONING = 22_000
export const REINFORCE_COST_PER_LEVEL = [0, 55_000, 90_000, 140_000] as const

export const BUILDING_COST_BASE: Record<Exclude<BuildingType, null>, number> = {
  school: 80_000,
  house: 25_000,
  hospital: 150_000,
  rescue: 45_000,
}

export const CONSTRUCT_MULTIPLIER: Record<Exclude<ConstructType, null>, number> = {
  parasismique: 2.5,
  ciment: 1.0,
  bois: 1.4,
  adobe: 0.8,
}

export const CONSTRUCT_RESISTANCE: Record<Exclude<ConstructType, null>, number> = {
  parasismique: 0.9,
  ciment: 0.3,
  bois: 0.6,
  adobe: 0.2,
}

export const TERRAIN_RISK: Record<TerrainType, number> = {
  rock: 1.0,
  soft: 2.0,
  clay: 3.5,
}

/** Population estimée par type de bâtiment (vies en jeu) */
export const BUILDING_POPULATION: Record<Exclude<BuildingType, null>, number> = {
  school: 320,
  house: 45,
  hospital: 180,
  rescue: 25,
}

export const HEAVY_BUILDINGS: BuildingType[] = ["hospital", "school"]

export function createCell(id: number): VilleCell {
  return {
    id,
    terrain: null,
    soilRevealed: false,
    building: null,
    construct: null,
    reinforceLevel: 0,
    sensitized: false,
    zoningLocked: false,
    damage: null,
    repairSpent: 0,
  }
}

export const REPAIR_DAMAGE_RATIO = 0.42
export const REPAIR_COLLAPSE_RATIO = 0.88

export function repairCostForCell(cell: VilleCell): number {
  if (!cell.building || !cell.construct || !cell.damage || cell.damage === "good") return 0
  const base = cellBuildingCost(cell)
  return cell.damage === "damaged"
    ? Math.round(base * REPAIR_DAMAGE_RATIO)
    : Math.round(base * REPAIR_COLLAPSE_RATIO)
}

export function canRepairCell(cell: VilleCell): boolean {
  return Boolean(cell.building && (cell.damage === "damaged" || cell.damage === "collapsed"))
}

export function applyDamageFromResults(
  grid: VilleCell[],
  results: Record<number, ShakeResult>
): VilleCell[] {
  return grid.map((c, i) => {
    const hit = results[i]
    if (!c.building) return c
    if (!hit || hit === "good") return { ...c, damage: null }
    const prevRank = c.damage ? SHAKE_RANK[c.damage] : 0
    const nextRank = SHAKE_RANK[hit]
    return { ...c, damage: nextRank >= prevRank ? hit : c.damage }
  })
}

export function applyRepair(cell: VilleCell, cost: number): VilleCell {
  const wasCollapsed = cell.damage === "collapsed"
  return {
    ...cell,
    damage: null,
    repairSpent: cell.repairSpent + cost,
    reinforceLevel: wasCollapsed ? Math.max(0, cell.reinforceLevel - 1) : cell.reinforceLevel,
  }
}

export function damagesFromGrid(grid: VilleCell[]): Record<number, ShakeResult> {
  const out: Record<number, ShakeResult> = {}
  grid.forEach((c, i) => {
    if (c.damage && c.damage !== "good") out[i] = c.damage
  })
  return out
}

export function countDamaged(grid: VilleCell[]): { damaged: number; collapsed: number } {
  let damaged = 0
  let collapsed = 0
  for (const c of grid) {
    if (c.damage === "damaged") damaged++
    if (c.damage === "collapsed") collapsed++
  }
  return { damaged, collapsed }
}

export function emptyGrid(): VilleCell[] {
  return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => createCell(i))
}

export function cellBuildingCost(cell: VilleCell): number {
  if (!cell.building || !cell.construct) return 0
  return Math.round(BUILDING_COST_BASE[cell.building] * CONSTRUCT_MULTIPLIER[cell.construct])
}

export function cellReinforceSpent(cell: VilleCell): number {
  let sum = 0
  for (let l = 1; l <= cell.reinforceLevel; l++) {
    sum += REINFORCE_COST_PER_LEVEL[l]
  }
  return sum
}

export function cellExtraSpent(cell: VilleCell): number {
  let extra = cellReinforceSpent(cell) + cell.repairSpent
  if (cell.soilRevealed && cell.terrain) extra += COST_GEO_STUDY
  if (cell.sensitized) extra += COST_SENSITIZATION
  if (cell.zoningLocked) extra += COST_ZONING
  return extra
}

export function totalSpent(grid: VilleCell[]): number {
  return grid.reduce((sum, c) => sum + cellBuildingCost(c) + cellExtraSpent(c), 0)
}

export function budgetPool(phaseBonusReceived = 0): number {
  return BUDGET_START + phaseBonusReceived
}

export function budgetRemaining(grid: VilleCell[], phaseBonusReceived = 0): number {
  return budgetPool(phaseBonusReceived) - totalSpent(grid)
}

export function canAfford(grid: VilleCell[], additionalCost: number, phaseBonusReceived = 0): boolean {
  return budgetRemaining(grid, phaseBonusReceived) >= additionalCost
}

export function mergeShakeResults(
  prev: Record<number, ShakeResult>,
  next: Record<number, ShakeResult>
): Record<number, ShakeResult> {
  const merged = { ...prev }
  for (const [key, result] of Object.entries(next)) {
    const idx = Number(key)
    const existing = merged[idx]
    if (!existing || SHAKE_RANK[result] > SHAKE_RANK[existing]) merged[idx] = result
  }
  return merged
}

export function aggregateReports(reports: SimulationReport[]): SimulationReport | null {
  if (reports.length === 0) return null
  const mergedResults = reports.reduce(
    (acc, r) => mergeShakeResults(acc, r.results),
    {} as Record<number, ShakeResult>
  )
  let intactCount = 0
  let damagedCount = 0
  let collapsedCount = 0
  for (const r of Object.values(mergedResults)) {
    if (r === "good") intactCount++
    else if (r === "damaged") damagedCount++
    else collapsedCount++
  }
  const totalBuildings = intactCount + damagedCount + collapsedCount
  const intactPct = totalBuildings > 0 ? Math.round((intactCount / totalBuildings) * 100) : 0
  const last = reports[reports.length - 1]
  return {
    results: mergedResults,
    intactCount,
    damagedCount,
    collapsedCount,
    totalBuildings,
    intactPct,
    livesSaved: reports.reduce((s, r) => s + r.livesSaved, 0),
    livesAtRisk: Math.max(...reports.map((r) => r.livesAtRisk)),
    repairCostHtg: reports.reduce((s, r) => s + r.repairCostHtg, 0),
    magnitude: last.magnitude,
  }
}

/** Score de résistance structurelle 0–1 avant séisme */
export function calcStructuralScore(cell: VilleCell): number {
  if (!cell.building) return 1
  if (cell.damage === "collapsed") return 0.08
  if (cell.damage === "damaged") return 0.22

  let score = 0.12
  if (cell.terrain) {
    if (cell.terrain === "rock") score += 0.28
    else if (cell.terrain === "soft") score += 0.12
    else score += 0.04
  }

  if (cell.construct) score += CONSTRUCT_RESISTANCE[cell.construct] * 0.35
  score += cell.reinforceLevel * 0.12
  if (cell.sensitized) score += 0.1

  if (cell.zoningLocked && cell.terrain === "clay" && HEAVY_BUILDINGS.includes(cell.building)) {
    score += 0.15
  }

  return Math.min(1, score)
}

export function magnitudeDemand(magnitude: number, terrain: TerrainType | null): number {
  const m = Math.max(MAGNITUDE_MIN, Math.min(MAGNITUDE_MAX, magnitude))
  const normalized = (m - MAGNITUDE_MIN) / (MAGNITUDE_MAX - MAGNITUDE_MIN)
  const risk = terrain ? TERRAIN_RISK[terrain] / 3.5 : 1.5
  return normalized * 0.55 * risk + 0.15
}

export function simulateEarthquake(grid: VilleCell[], magnitude: number): SimulationReport {
  const results: Record<number, ShakeResult> = {}
  let intactCount = 0
  let damagedCount = 0
  let collapsedCount = 0
  let livesSaved = 0
  let livesAtRisk = 0
  let repairCostHtg = 0

  grid.forEach((cell, i) => {
    if (!cell.building) return

    const demand = magnitudeDemand(magnitude, cell.terrain)
    const score = calcStructuralScore(cell)
    const pop = BUILDING_POPULATION[cell.building]

    livesAtRisk += pop

    let result: ShakeResult
    if (score >= demand + 0.08) {
      result = "good"
      intactCount++
      livesSaved += pop
      if (cell.sensitized) livesSaved += Math.round(pop * 0.15)
    } else if (score >= demand - 0.12) {
      result = "damaged"
      damagedCount++
      livesSaved += Math.round(pop * (cell.sensitized ? 0.55 : 0.35))
      repairCostHtg += Math.round(cellBuildingCost(cell) * 0.45)
    } else {
      result = "collapsed"
      collapsedCount++
      livesSaved += Math.round(pop * (cell.sensitized ? 0.2 : 0.05))
      repairCostHtg += Math.round(cellBuildingCost(cell) * 0.95)
    }

    results[i] = result
  })

  const totalBuildings = intactCount + damagedCount + collapsedCount
  const intactPct = totalBuildings > 0 ? Math.round((intactCount / totalBuildings) * 100) : 0

  return {
    results,
    intactCount,
    damagedCount,
    collapsedCount,
    totalBuildings,
    intactPct,
    livesSaved: Math.min(livesSaved, livesAtRisk + 500),
    livesAtRisk,
    repairCostHtg,
    magnitude,
  }
}

/** @deprecated Use simulateEarthquake */
export function simulateShake(grid: VilleCell[], magnitude = 6.5): Record<number, ShakeResult> {
  return simulateEarthquake(grid, magnitude).results
}

export function countBuildings(grid: VilleCell[]): number {
  return grid.filter((c) => c.building && c.construct).length
}

export function isHeavyBuildingAllowed(cell: VilleCell, building: Exclude<BuildingType, null>): boolean {
  if (!HEAVY_BUILDINGS.includes(building)) return true
  if (cell.terrain === "rock") return true
  if (cell.zoningLocked) return false
  if (cell.terrain === "clay" || cell.terrain === "soft") return false
  return true
}

export function randomHiddenTerrain(seed: number): TerrainType {
  const types: TerrainType[] = ["rock", "soft", "clay", "rock", "soft", "clay", "rock", "soft"]
  return types[seed % types.length]
}

/** Révèle le sol et assigne un terrain stable pour la cellule (id déterministe). */
export function applyGeoStudy(cell: VilleCell): VilleCell {
  if (cell.soilRevealed && cell.terrain) return cell
  return {
    ...cell,
    soilRevealed: true,
    terrain: cell.terrain ?? randomHiddenTerrain(cell.id),
  }
}

/** Legacy helpers */
export function calcResistance(cell: VilleCell): number {
  return calcStructuralScore(cell)
}

export function cellCost(building: BuildingType, construct: ConstructType): number {
  if (!building || !construct) return 0
  return Math.round(BUILDING_COST_BASE[building] * CONSTRUCT_MULTIPLIER[construct])
}

export function countSurvivors(grid: VilleCell[]): number {
  return grid.filter((c) => c.building && calcStructuralScore(c) > 0.5).length
}

/** Pure game logic for the city builder module — no React / UI dependencies. */

export type SoilType = "rock" | "alluvial" | "coastal" | null
export type BuildingType = "school" | "house" | "hospital" | "market" | null
export type ConstructType = "parasismique" | "ciment" | "bois" | "adobe" | null
export type ShakeResult = "good" | "damaged" | "collapsed"
export type GameStep = 1 | 2 | 3 | 4

export interface VilleCell {
  soil: SoilType
  building: BuildingType
  construct: ConstructType
}

export const GRID_SIZE = 5
export const BUDGET_START = 1_000_000

export const BUILDING_COST_BASE: Record<Exclude<BuildingType, null>, number> = {
  school: 80_000,
  house: 25_000,
  hospital: 150_000,
  market: 40_000,
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

export const SOIL_RISK: Record<Exclude<SoilType, null>, number> = {
  rock: 1.0,
  alluvial: 2.0,
  coastal: 3.5,
}

export function emptyGrid(): VilleCell[] {
  return Array.from({ length: GRID_SIZE * GRID_SIZE }, () => ({
    soil: null,
    building: null,
    construct: null,
  }))
}

export function cellCost(building: BuildingType, construct: ConstructType): number {
  if (!building || !construct) return 0
  return Math.round(BUILDING_COST_BASE[building] * CONSTRUCT_MULTIPLIER[construct])
}

export function totalGridCost(grid: VilleCell[]): number {
  return grid.reduce((sum, c) => sum + cellCost(c.building, c.construct), 0)
}

export function budgetRemaining(grid: VilleCell[]): number {
  return BUDGET_START - totalGridCost(grid)
}

export function calcResistance(cell: VilleCell): number {
  if (!cell.building || !cell.construct) return 1
  const soilRisk = cell.soil ? SOIL_RISK[cell.soil] : 1
  return CONSTRUCT_RESISTANCE[cell.construct] / soilRisk
}

export function simulateShake(grid: VilleCell[]): Record<number, ShakeResult> {
  const results: Record<number, ShakeResult> = {}
  grid.forEach((c, i) => {
    if (!c.building) return
    const r = calcResistance(c)
    results[i] = r > 0.6 ? "good" : r > 0.3 ? "damaged" : "collapsed"
  })
  return results
}

export function countBuildings(grid: VilleCell[]): number {
  return grid.filter((c) => c.building && c.construct).length
}

export function countSurvivors(grid: VilleCell[]): number {
  return grid.filter((c) => c.building && c.construct && calcResistance(c) > 0.5).length
}

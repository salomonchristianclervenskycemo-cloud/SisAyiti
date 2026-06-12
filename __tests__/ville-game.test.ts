import {
  simulateEarthquake,
  emptyGrid,
  budgetRemaining,
  budgetPool,
  calcStructuralScore,
  BUDGET_START,
  COST_GEO_STUDY,
  PHASE_BONUS_HTG,
  HAITI_EARTHQUAKE_PHASES,
  mergeShakeResults,
  applyGeoStudy,
  applyRepair,
  repairCostForCell,
  canRepairCell,
} from '@/shared/ville-game'

describe('ville-game engine', () => {
  it('starts with 2M budget on empty grid', () => {
    const grid = emptyGrid()
    expect(grid).toHaveLength(25)
    expect(budgetRemaining(grid)).toBe(BUDGET_START)
    expect(BUDGET_START).toBe(2_000_000)
    expect(grid[0].terrain).toBeNull()
  })

  it('strong quake collapses weak buildings on clay', () => {
    const grid = emptyGrid()
    grid[0] = {
      ...grid[0],
      terrain: 'clay',
      soilRevealed: true,
      building: 'house',
      construct: 'adobe',
      reinforceLevel: 0,
      sensitized: false,
      zoningLocked: false,
      damage: null,
      repairSpent: 0,
    }
    grid[1] = {
      ...grid[1],
      terrain: 'rock',
      soilRevealed: true,
      building: 'hospital',
      construct: 'parasismique',
      reinforceLevel: 3,
      sensitized: true,
      zoningLocked: false,
      damage: null,
      repairSpent: 0,
    }
    const weak = simulateEarthquake(grid, 7.8)
    const strong = simulateEarthquake(grid, 5.2)
    expect(weak.results[0]).toBe('collapsed')
    expect(['good', 'damaged']).toContain(strong.results[1])
  })

  it('reinforcement improves structural score', () => {
    const base = emptyGrid()[0]
    const weak = calcStructuralScore({
      ...base,
      terrain: 'soft',
      soilRevealed: true,
      building: 'school',
      construct: 'ciment',
      reinforceLevel: 0,
      sensitized: false,
    })
    const strong = calcStructuralScore({
      ...base,
      terrain: 'rock',
      soilRevealed: true,
      building: 'school',
      construct: 'parasismique',
      reinforceLevel: 3,
      sensitized: true,
    })
    expect(strong).toBeGreaterThan(weak)
  })

  it('geo study reduces budget when terrain revealed', () => {
    const grid = emptyGrid()
    grid[0] = applyGeoStudy(grid[0])
    expect(budgetRemaining(grid)).toBe(BUDGET_START - COST_GEO_STUDY)
  })

  it('phase bonus increases budget pool', () => {
    expect(budgetPool(PHASE_BONUS_HTG)).toBe(BUDGET_START + PHASE_BONUS_HTG)
    expect(budgetRemaining(emptyGrid(), PHASE_BONUS_HTG)).toBe(BUDGET_START + PHASE_BONUS_HTG)
  })

  it('haiti phases ordered mild to severe', () => {
    const mags = HAITI_EARTHQUAKE_PHASES.map((p) => p.magnitude)
    expect(mags).toEqual([5.2, 6.1, 7.0, 7.6])
  })

  it('mergeShakeResults keeps worst damage', () => {
    const merged = mergeShakeResults({ 0: 'good' }, { 0: 'collapsed' })
    expect(merged[0]).toBe('collapsed')
  })

  it('repair clears damage and costs budget', () => {
    const grid = emptyGrid()
    grid[0] = {
      ...grid[0],
      terrain: 'rock',
      soilRevealed: true,
      building: 'house',
      construct: 'ciment',
      reinforceLevel: 0,
      sensitized: false,
      zoningLocked: false,
      damage: 'damaged',
      repairSpent: 0,
    }
    expect(canRepairCell(grid[0])).toBe(true)
    const cost = repairCostForCell(grid[0])
    expect(cost).toBeGreaterThan(0)
    grid[0] = applyRepair(grid[0], cost)
    expect(grid[0].damage).toBeNull()
    expect(grid[0].repairSpent).toBe(cost)
    expect(budgetRemaining(grid)).toBeLessThan(BUDGET_START - cost)
  })
})

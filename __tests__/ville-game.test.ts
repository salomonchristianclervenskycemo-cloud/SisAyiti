import { simulateShake, emptyGrid, cellCost, calcResistance, BUDGET_START } from '@/shared/ville-game'

describe('ville-game', () => {
  it('starts with full budget on empty grid', () => {
    const grid = emptyGrid()
    expect(grid).toHaveLength(25)
    const total = grid.reduce((sum, c) => sum + cellCost(c.building, c.construct), 0)
    expect(BUDGET_START - total).toBe(BUDGET_START)
  })

  it('simulates shake results for placed buildings', () => {
    const grid = emptyGrid()
    grid[0] = { soil: 'rock', building: 'house', construct: 'parasismique' }
    grid[1] = { soil: 'coastal', building: 'house', construct: 'adobe' }
    const results = simulateShake(grid)
    expect(results[0]).toBe('good')
    expect(results[1]).toBeDefined()
  })

  it('calcResistance favors parasismique on rock', () => {
    const r = calcResistance({ soil: 'rock', building: 'house', construct: 'parasismique' })
    expect(r).toBeGreaterThan(0.5)
  })
})

"use client"

import { useCallback, useMemo, useState } from "react"
import {
  BUDGET_START,
  GRID_SIZE,
  budgetRemaining,
  calcResistance,
  cellCost,
  countBuildings,
  countSurvivors,
  emptyGrid,
  simulateShake,
  type ConstructType,
  type GameStep,
  type ShakeResult,
  type SoilType,
  type VilleCell,
  type BuildingType,
} from "@/shared/ville-game"

export function useVilleGame() {
  const [step, setStep] = useState<GameStep>(1)
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [selectedCells, setSelectedCells] = useState<Set<number>>(new Set())
  const [grid, setGrid] = useState<VilleCell[]>(emptyGrid)
  const [shakeResults, setShakeResults] = useState<Record<number, ShakeResult>>({})
  const [shaking, setShaking] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const budget = budgetRemaining(grid)
  const budgetPct = Math.max(0, (budget / BUDGET_START) * 100)
  const totalBuildings = countBuildings(grid)
  const resistantCount = countSurvivors(grid)

  const calculateBudgetAfterAction = useCallback((newGrid: VilleCell[]) => budgetRemaining(newGrid), [])

  const handleCellClick = useCallback(
    (i: number, ctrlKey: boolean) => {
      if (step === 1 && ctrlKey) {
        setSelectedCells((prev) => {
          const next = new Set(prev)
          if (next.has(i)) next.delete(i)
          else next.add(i)
          return next
        })
      } else {
        setSelectedCell((cur) => (i === cur ? null : i))
        setSelectedCells(new Set())
      }
    },
    [step]
  )

  const setSoil = useCallback(
    (soil: SoilType) => {
      if (selectedCells.size > 0) {
        setGrid((g) => g.map((c, i) => (selectedCells.has(i) ? { ...c, soil } : c)))
      } else if (selectedCell !== null) {
        setGrid((g) => g.map((c, i) => (i === selectedCell ? { ...c, soil } : c)))
      }
    },
    [selectedCell, selectedCells]
  )

  const placeBuilding = useCallback(
    (b: BuildingType) => {
      if (selectedCell === null) return
      const newGrid = grid.map((c, i) =>
        i === selectedCell ? { ...c, building: b, construct: c.construct ?? "ciment" } : c
      )
      if (calculateBudgetAfterAction(newGrid) >= 0) setGrid(newGrid)
    },
    [selectedCell, grid, calculateBudgetAfterAction]
  )

  const setConstruct = useCallback(
    (ct: ConstructType) => {
      if (selectedCell === null || !grid[selectedCell]?.building) return
      const newGrid = grid.map((c, i) => (i === selectedCell ? { ...c, construct: ct } : c))
      if (calculateBudgetAfterAction(newGrid) >= 0) setGrid(newGrid)
    },
    [selectedCell, grid, calculateBudgetAfterAction]
  )

  const runEarthquake = useCallback(() => {
    setShaking(true)
    setTimeout(() => {
      setShakeResults(simulateShake(grid))
      setShaking(false)
      setShowResults(true)
    }, 700)
  }, [grid])

  const reset = useCallback(() => {
    setGrid(emptyGrid())
    setShakeResults({})
    setShowResults(false)
    setSelectedCell(null)
    setSelectedCells(new Set())
    setStep(1)
  }, [])

  const moveSelection = useCallback((deltaRow: number, deltaCol: number) => {
    setSelectedCell((cur) => {
      const start = cur ?? 0
      const row = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor(start / GRID_SIZE) + deltaRow))
      const col = Math.max(0, Math.min(GRID_SIZE - 1, (start % GRID_SIZE) + deltaCol))
      return row * GRID_SIZE + col
    })
    setSelectedCells(new Set())
  }, [])

  const selectedCellData = selectedCell !== null ? grid[selectedCell] : null

  const buildingCostPreview = useMemo(
    () => (b: BuildingType, defaultConstruct: ConstructType = "ciment") =>
      b ? cellCost(b, defaultConstruct) : 0,
    []
  )

  return {
    step,
    setStep,
    selectedCell,
    selectedCells,
    grid,
    shakeResults,
    shaking,
    showResults,
    setShowResults,
    budget,
    budgetPct,
    totalBuildings,
    resistantCount,
    selectedCellData,
    handleCellClick,
    setSoil,
    placeBuilding,
    setConstruct,
    runEarthquake,
    reset,
    moveSelection,
    calculateBudgetAfterAction,
    buildingCostPreview,
    calcResistance,
    cellCost,
    GRID_SIZE,
    BUDGET_START,
  }
}

export type VilleGame = ReturnType<typeof useVilleGame>

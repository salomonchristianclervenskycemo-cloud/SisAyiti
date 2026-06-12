"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  BUDGET_START,
  COST_GEO_STUDY,
  COST_SENSITIZATION,
  COST_ZONING,
  GRID_SIZE,
  HAITI_EARTHQUAKE_PHASES,
  PHASE_BONUS_HTG,
  REINFORCE_COST_PER_LEVEL,
  aggregateReports,
  applyDamageFromResults,
  applyGeoStudy,
  applyRepair,
  budgetPool,
  budgetRemaining,
  canAfford,
  canRepairCell,
  cellBuildingCost,
  cellCost,
  countBuildings,
  countDamaged,
  damagesFromGrid,
  emptyGrid,
  isHeavyBuildingAllowed,
  repairCostForCell,
  simulateEarthquake,
  type BuildingType,
  type ConstructType,
  type GameStep,
  type PlayerRole,
  type ShakeResult,
  type SimulationReport,
  type VilleCell,
} from "@/shared/ville-game"

export type ResultsMode = "phase" | "final" | null

export function useVilleGame() {
  const [step, setStep] = useState<GameStep>(1)
  const [role, setRole] = useState<PlayerRole>("mayor")
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [selectedCells, setSelectedCells] = useState<Set<number>>(new Set())
  const [grid, setGrid] = useState<VilleCell[]>(emptyGrid)
  const [shaking, setShaking] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [resultsMode, setResultsMode] = useState<ResultsMode>(null)
  const [simulationReport, setSimulationReport] = useState<SimulationReport | null>(null)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [phaseReports, setPhaseReports] = useState<SimulationReport[]>([])
  const [phaseBonusReceived, setPhaseBonusReceived] = useState(0)
  const [cumulativeShake, setCumulativeShake] = useState<Record<number, ShakeResult>>({})
  const [advisorKey, setAdvisorKey] = useState<string>("ville.advisor.welcome")

  const currentPhase = HAITI_EARTHQUAKE_PHASES[phaseIndex]
  const campaignComplete = phaseIndex >= HAITI_EARTHQUAKE_PHASES.length

  const budget = budgetRemaining(grid, phaseBonusReceived)
  const totalBudget = budgetPool(phaseBonusReceived)
  const budgetPct = Math.max(0, Math.min(100, (budget / totalBudget) * 100))
  const totalBuildings = countBuildings(grid)
  const damageStats = countDamaged(grid)
  const hasDamage = damageStats.damaged + damageStats.collapsed > 0
  const phaseStarted = phaseReports.length > 0

  const setAdvisor = useCallback((key: string) => setAdvisorKey(key), [])

  const handleCellClick = useCallback(
    (index: number, ctrlKey: boolean) => {
      if (shaking || campaignComplete) return

      const cell = grid[index]
      if (!cell) return

      if (step === 1 && ctrlKey) {
        setSelectedCells((prev) => {
          const next = new Set(prev)
          if (next.has(index)) next.delete(index)
          else next.add(index)
          return next
        })
        return
      }

      setSelectedCell(index)
      setSelectedCells(new Set())

      if (step === 1 && !cell.soilRevealed) {
        if (!canAfford(grid, COST_GEO_STUDY, phaseBonusReceived)) {
          setAdvisor("ville.advisor.noBudget")
          return
        }
        setGrid((g) => g.map((c, i) => (i === index ? applyGeoStudy(c) : c)))
        setAdvisor("ville.advisor.soilRevealed")
        return
      }

      if (step === 2 && role === "civil" && cell.soilRevealed) {
        const cost = cell.sensitized ? 0 : COST_SENSITIZATION
        if (cost > 0 && !canAfford(grid, cost, phaseBonusReceived)) {
          setAdvisor("ville.advisor.noBudget")
          return
        }
        setGrid((g) =>
          g.map((c, i) => (i === index ? { ...c, sensitized: !c.sensitized } : c))
        )
        setAdvisor(cell.sensitized ? "ville.advisor.sensitizeOff" : "ville.advisor.sensitizeOn")
        return
      }

      if (step === 3 && canRepairCell(cell)) {
        const cost = repairCostForCell(cell)
        if (!canAfford(grid, cost, phaseBonusReceived)) {
          setAdvisor("ville.advisor.noBudget")
          return
        }
        const newGrid = grid.map((c, i) => (i === index ? applyRepair(c, cost) : c))
        setGrid(newGrid)
        setCumulativeShake(damagesFromGrid(newGrid))
        setAdvisor(
          cell.damage === "collapsed" ? "ville.advisor.rebuilt" : "ville.advisor.repaired"
        )
        return
      }

      if (step === 3 && cell.building && !cell.damage && cell.reinforceLevel < 3) {
        const nextLevel = cell.reinforceLevel + 1
        const cost = REINFORCE_COST_PER_LEVEL[nextLevel]
        if (!canAfford(grid, cost, phaseBonusReceived)) {
          setAdvisor("ville.advisor.noBudget")
          return
        }
        setGrid((g) =>
          g.map((c, i) => (i === index ? { ...c, reinforceLevel: nextLevel } : c))
        )
        setAdvisor("ville.advisor.reinforced")
      }
    },
    [grid, role, step, shaking, phaseBonusReceived, campaignComplete]
  )

  const revealGeoStudy = useCallback(
    (indices: number[]) => {
      const toStudy = indices.filter((i) => !grid[i]?.soilRevealed)
      const cost = toStudy.length * COST_GEO_STUDY
      if (cost === 0) return false
      if (!canAfford(grid, cost, phaseBonusReceived)) {
        setAdvisor("ville.advisor.noBudget")
        return false
      }
      setGrid((g) => g.map((c, i) => (toStudy.includes(i) ? applyGeoStudy(c) : c)))
      setAdvisor("ville.advisor.soilRevealed")
      return true
    },
    [grid, phaseBonusReceived]
  )

  const toggleZoning = useCallback(
    (index: number) => {
      const cell = grid[index]
      if (!cell?.soilRevealed) return
      const cost = cell.zoningLocked ? 0 : COST_ZONING
      if (cost > 0 && !canAfford(grid, cost, phaseBonusReceived)) {
        setAdvisor("ville.advisor.noBudget")
        return
      }
      setGrid((g) =>
        g.map((c, i) => (i === index ? { ...c, zoningLocked: !c.zoningLocked } : c))
      )
      setAdvisor(cell.zoningLocked ? "ville.advisor.zoningOff" : "ville.advisor.zoningOn")
    },
    [grid, phaseBonusReceived]
  )

  const placeBuilding = useCallback(
    (building: BuildingType) => {
      if (selectedCell === null || !building) return
      const cell = grid[selectedCell]
      if (!cell?.soilRevealed) {
        setAdvisor("ville.advisor.studyFirst")
        return
      }
      if (!isHeavyBuildingAllowed(cell, building)) {
        setAdvisor("ville.advisor.heavyBlocked")
        return
      }

      const newGrid = grid.map((c, i) =>
        i === selectedCell
          ? { ...c, building, construct: c.construct ?? "ciment" }
          : c
      )
      if (budgetRemaining(newGrid, phaseBonusReceived) < 0) {
        setAdvisor("ville.advisor.noBudget")
        return
      }
      setGrid(newGrid)
      setAdvisor("ville.advisor.buildingPlaced")
    },
    [selectedCell, grid, phaseBonusReceived]
  )

  const repairBuilding = useCallback(
    (index: number) => {
      const cell = grid[index]
      if (!cell || !canRepairCell(cell)) return false
      const cost = repairCostForCell(cell)
      if (!canAfford(grid, cost, phaseBonusReceived)) {
        setAdvisor("ville.advisor.noBudget")
        return false
      }
      const newGrid = grid.map((c, i) => (i === index ? applyRepair(c, cost) : c))
      setGrid(newGrid)
      setCumulativeShake(damagesFromGrid(newGrid))
      setAdvisor(cell.damage === "collapsed" ? "ville.advisor.rebuilt" : "ville.advisor.repaired")
      return true
    },
    [grid, phaseBonusReceived]
  )

  const previewRepairCost = useMemo(() => {
    if (selectedCell === null) return 0
    const cell = grid[selectedCell]
    return cell ? repairCostForCell(cell) : 0
  }, [selectedCell, grid])

  const setConstruct = useCallback(
    (construct: ConstructType) => {
      if (selectedCell === null || !construct) return
      const cell = grid[selectedCell]
      if (!cell?.building) return
      const newGrid = grid.map((c, i) => (i === selectedCell ? { ...c, construct } : c))
      if (budgetRemaining(newGrid, phaseBonusReceived) < 0) {
        setAdvisor("ville.advisor.noBudget")
        return
      }
      setGrid(newGrid)
      setAdvisor("ville.advisor.materialSet")
    },
    [selectedCell, grid, phaseBonusReceived]
  )

  const runEarthquake = useCallback(() => {
    if (!currentPhase || totalBuildings === 0) return
    setShaking(true)
    setShowResults(false)
    setTimeout(() => {
      const report = simulateEarthquake(grid, currentPhase.magnitude)
      const gridAfter = applyDamageFromResults(grid, report.results)
      setGrid(gridAfter)
      setCumulativeShake(damagesFromGrid(gridAfter))
      const nextReports = [...phaseReports, report]
      setPhaseReports(nextReports)
      setSimulationReport(report)

      const isLastPhase = phaseIndex >= HAITI_EARTHQUAKE_PHASES.length - 1
      if (isLastPhase) {
        setSimulationReport(aggregateReports(nextReports))
        setResultsMode("final")
      } else {
        setResultsMode("phase")
      }
      setShaking(false)
      setShowResults(true)
    }, 900)
  }, [grid, currentPhase, phaseIndex, phaseReports, totalBuildings])

  const continueAfterPhase = useCallback(() => {
    if (phaseIndex >= HAITI_EARTHQUAKE_PHASES.length - 1) return
    setPhaseBonusReceived((b) => b + PHASE_BONUS_HTG)
    setPhaseIndex((p) => p + 1)
    setShowResults(false)
    setResultsMode(null)
    setAdvisor("ville.advisor.phaseBonus")
    setStep(3)
  }, [phaseIndex])

  const reset = useCallback(() => {
    setGrid(emptyGrid())
    setSimulationReport(null)
    setShowResults(false)
    setResultsMode(null)
    setSelectedCell(null)
    setSelectedCells(new Set())
    setStep(1)
    setRole("mayor")
    setPhaseIndex(0)
    setPhaseReports([])
    setPhaseBonusReceived(0)
    setCumulativeShake({})
    setAdvisorKey("ville.advisor.welcome")
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

  const previewReinforceCost = useMemo(() => {
    if (selectedCell === null) return 0
    const cell = grid[selectedCell]
    if (!cell || cell.reinforceLevel >= 3) return 0
    return REINFORCE_COST_PER_LEVEL[cell.reinforceLevel + 1]
  }, [selectedCell, grid])

  const stepAdvisorKey = useMemo(() => {
    if (step === 3 && hasDamage) return "ville.advisor.stepRepair"
    const keys: Record<GameStep, string> = {
      1: "ville.advisor.step1",
      2: "ville.advisor.step2",
      3: "ville.advisor.step3",
      4: "ville.advisor.step4",
    }
    return keys[step]
  }, [step, hasDamage])

  const prevStepRef = useRef(step)
  useEffect(() => {
    if (prevStepRef.current !== step) {
      setAdvisorKey(stepAdvisorKey)
      prevStepRef.current = step
    }
  }, [step, stepAdvisorKey])

  return {
    step,
    setStep,
    role,
    setRole,
    selectedCell,
    selectedCells,
    grid,
    shaking,
    showResults,
    setShowResults,
    resultsMode,
    simulationReport,
    phaseIndex,
    phaseReports,
    phaseBonusReceived,
    currentPhase,
    campaignComplete,
    cumulativeShake,
    damageStats,
    hasDamage,
    phaseStarted,
    advisorKey: advisorKey || stepAdvisorKey,
    stepAdvisorKey,
    budget,
    totalBudget,
    budgetPct,
    totalBuildings,
    selectedCellData,
    handleCellClick,
    revealGeoStudy,
    toggleZoning,
    placeBuilding,
    setConstruct,
    runEarthquake,
    continueAfterPhase,
    reset,
    moveSelection,
    buildingCostPreview,
    previewReinforceCost,
    previewRepairCost,
    repairBuilding,
    budgetRemaining: (g: VilleCell[]) => budgetRemaining(g, phaseBonusReceived),
    canAfford: (g: VilleCell[], cost: number) => canAfford(g, cost, phaseBonusReceived),
    cellBuildingCost,
    GRID_SIZE,
    BUDGET_START,
    PHASE_BONUS_HTG,
    HAITI_EARTHQUAKE_PHASES,
    COST_GEO_STUDY,
    COST_SENSITIZATION,
    COST_ZONING,
  }
}

export type VilleGame = ReturnType<typeof useVilleGame>

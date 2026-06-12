"use client"

import { useEffect, useRef } from "react"
import { Coins, Building2, Wrench, AlertTriangle, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang-context"
import { useApp } from "@/lib/app-context"
import { useVilleGame } from "@/hooks/use-ville-game"
import { useSubmitScore } from "@/hooks/use-submit-score"
import { recordVillePhaseReached, recordVilleCampaignComplete } from "@/lib/offline-education"
import { VillePathProgress } from "@/components/ville-game/ville-path-progress"
import { VilleScienceNav } from "@/components/ville-game/ville-science-nav"
import { VilleCampaignIntro } from "@/components/ville-game/ville-campaign-intro"
import { VilleQuizPanel } from "@/components/ville-game/ville-quiz-panel"
import { VilleGameGrid } from "@/components/ville-game/ville-game-grid"
import { StepControlPanel, StepStepper } from "@/components/ville-game/step-control-panel"
import { ResultsDialog } from "@/components/ville-game/results-dialog"
import { VilleLeaderboard } from "@/components/ville-game/ville-leaderboard"
import { Civ1Panel } from "@/components/ville-game/civ1-panel"
import { villeAdvisor } from "@/components/ville-game/civ1-theme"
import { damagesFromGrid, HAITI_EARTHQUAKE_PHASES } from "@/shared/ville-game"

export default function ModuleVille() {
  const { lang, t } = useLang()
  const { setActiveModule } = useApp()
  const gridRef = useRef<HTMLDivElement>(null)
  const campaignRecordedRef = useRef(false)
  const scoreSubmittedRef = useRef(false)
  const { submitScore } = useSubmitScore()
  const game = useVilleGame()

  const {
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
    damageStats,
    hasDamage,
    phaseStarted,
    advisorKey,
    stepAdvisorKey,
    budget,
    budgetPct,
    totalBudget,
    totalBuildings,
    handleCellClick,
    reset,
    moveSelection,
    continueAfterPhase,
    phaseIndex,
    phaseReports,
    GRID_SIZE,
  } = game

  const shakeResults = damagesFromGrid(grid)
  const advisorText = t(advisorKey) !== advisorKey ? t(advisorKey) : t(stepAdvisorKey)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault()
        if (e.key === "ArrowUp") moveSelection(-1, 0)
        if (e.key === "ArrowDown") moveSelection(1, 0)
        if (e.key === "ArrowLeft") moveSelection(0, -1)
        if (e.key === "ArrowRight") moveSelection(0, 1)
      }
    }
    el.addEventListener("keydown", onKeyDown)
    return () => el.removeEventListener("keydown", onKeyDown)
  }, [moveSelection])

  useEffect(() => {
    if (!showResults || resultsMode !== "final" || !simulationReport || scoreSubmittedRef.current) return
    scoreSubmittedRef.current = true
    const dominantSoil = grid.find((c) => c.terrain)?.terrain ?? "rock"
    submitScore({
      finalBudget: budget,
      buildingsConstructed: totalBuildings,
      resilientBuildings: simulationReport.intactCount,
      selectedSoil: dominantSoil,
      difficulty: "Haiti-Campaign",
      lang,
    }).catch(() => {
      scoreSubmittedRef.current = false
    })
  }, [showResults, resultsMode, simulationReport, budget, totalBuildings, grid, lang, submitScore])

  useEffect(() => {
    if (!showResults) scoreSubmittedRef.current = false
  }, [showResults])

  useEffect(() => {
    if (phaseReports.length > 0) {
      recordVillePhaseReached(phaseReports.length)
    }
  }, [phaseReports.length])

  useEffect(() => {
    if (showResults && resultsMode === "final" && !campaignRecordedRef.current) {
      campaignRecordedRef.current = true
      recordVilleCampaignComplete()
    }
    if (!showResults) campaignRecordedRef.current = false
  }, [showResults, resultsMode])

  return (
    <div className="min-h-full p-4 md:p-6 lg:p-8 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-background to-teal-500/5 pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-4">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
            {t("ville.title")}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{t("ville.subtitleLong")}</p>
        </motion.header>

        <VillePathProgress />
        <VilleScienceNav />
        <VilleCampaignIntro />

        <VilleLeaderboard />

        {phaseStarted && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary font-semibold border border-primary/20">
              {t("ville.campaignActive")}
            </span>
            {hasDamage && (
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-semibold hover:bg-amber-500/25 transition-colors"
              >
                <Wrench size={12} />
                {damageStats.damaged + damageStats.collapsed} {t("ville.needRepair")}
              </button>
            )}
          </div>
        )}

        <StepStepper step={step} setStep={setStep} />

        <Civ1Panel glowColor="#2e8bc0">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="font-bold flex items-center gap-2">
              <Coins size={18} className="text-primary" />
              {t("ville.budget")}
            </span>
            <span
              className={cn(
                "font-black text-xl tabular-nums",
                budget < 0 ? "text-destructive" : budget < 300_000 ? "text-amber-500" : "text-green-500"
              )}
            >
              {budget.toLocaleString()} HTG
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-secondary overflow-hidden border border-border/50">
            <div
              className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-primary to-teal-500"
              style={{ width: `${budgetPct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
            <span>0 HTG</span>
            <span>{totalBudget.toLocaleString()} HTG</span>
          </div>
        </Civ1Panel>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7">
            <Civ1Panel title={t("ville.mapTitle")} glowColor="#3b82f6">
              <VilleGameGrid
                gridRef={gridRef}
                grid={grid}
                gridSize={GRID_SIZE}
                selectedCell={selectedCell}
                selectedCells={selectedCells}
                shakeResults={shakeResults}
                shaking={shaking}
                onCellClick={handleCellClick}
                ariaLabel={t("ville.title")}
              />
              <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                <Building2 size={14} className="shrink-0 text-primary mt-0.5" />
                <p>{t("ville.gridHint")}</p>
              </div>
            </Civ1Panel>
          </div>

          <div className="lg:col-span-5">
            <StepControlPanel
              {...game}
              role={role}
              setRole={setRole}
              handleCellClick={handleCellClick}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(villeAdvisor, "flex gap-3")}
        >
          <div className="shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            {hasDamage ? (
              <AlertTriangle size={16} className="text-amber-500" />
            ) : (
              <Building2 size={16} className="text-primary" />
            )}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
              {t("ville.advisorTitle")}
            </p>
            <p className="leading-relaxed">{advisorText}</p>
          </div>
        </motion.div>

        <VilleQuizPanel />

        <button
          type="button"
          onClick={() => setActiveModule("prevention")}
          className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-primary/30 bg-primary/5 text-sm font-bold hover:bg-primary/10 transition-colors"
        >
          <ShieldCheck size={18} /> {t("ville.cta.prevention")}
        </button>
      </div>

      <ResultsDialog
        open={showResults}
        onOpenChange={setShowResults}
        report={simulationReport}
        resultsMode={resultsMode}
        phaseIndex={phaseIndex}
        totalPhases={HAITI_EARTHQUAKE_PHASES.length}
        onRetry={reset}
        onContinuePhase={resultsMode === "phase" ? continueAfterPhase : undefined}
      />
    </div>
  )
}

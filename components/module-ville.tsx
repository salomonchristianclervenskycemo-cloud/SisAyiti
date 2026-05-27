"use client"
import { useEffect, useRef } from "react"
import { useLang } from "@/lib/lang-context"
import { l, pickLabel, pickDesc } from "@/lib/i18n"
import { villeLabels, villeTeclaTips } from "@/lib/translations/ville"
import { cn } from "@/lib/utils"
import { useVilleGame } from "@/hooks/use-ville-game"
import { useSubmitScore } from "@/hooks/use-submit-score"
import { cellCost, calcResistance, type VilleCell, type SoilType, type BuildingType, type ConstructType, type GameStep } from "@/shared/ville-game"
import { School, Home, Plus, ShoppingBag, Zap, AlertTriangle, CheckCircle, RotateCcw, Stethoscope, ChevronRight, Info, Shield, Activity } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// --- Composants Utilitaires ---
const GlassCard = ({ children, className, glowColor }: { children: React.ReactNode, className?: string, glowColor?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl",
    "shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] transition-all duration-500",
    className
  )}>
    {glowColor && (
      <div 
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-30 dark:opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: glowColor }}
      />
    )}
    {children}
  </div>
)

/* ── Types ───────────────────────────────────────────────────── */
interface Cell extends VilleCell {}

const STEP_KEYS = ["ville.step.soil", "ville.step.zone", "ville.step.materials", "ville.step.simulation"] as const

const soilDef: Record<Exclude<SoilType, null>, { color: string; cost: number; risk: number }> = {
  rock:     { color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",  cost: 0,     risk: 1.0 },
  alluvial: { color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-600 dark:text-yellow-400",     cost: 0,     risk: 2.0 },
  coastal:  { color: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400",              cost: 0,     risk: 3.5 },
}

const buildingDef: Record<Exclude<BuildingType, null>, { icon: typeof School; costBase: number }> = {
  school:   { icon: School,       costBase: 80000  },
  house:    { icon: Home,         costBase: 25000  },
  hospital: { icon: Plus,         costBase: 150000 },
  market:   { icon: ShoppingBag,  costBase: 40000  },
}

const constructDef: Record<Exclude<ConstructType, null>, { multiplier: number; resistance: number; color: string }> = {
  parasismique: { multiplier: 2.5,  resistance: 0.9, color: "text-green-600 dark:text-green-400" },
  ciment:       { multiplier: 1.0,  resistance: 0.3, color: "text-red-600 dark:text-red-400" },
  bois:         { multiplier: 1.4,  resistance: 0.6, color: "text-yellow-600 dark:text-yellow-400" },
  adobe:        { multiplier: 0.8,  resistance: 0.2, color: "text-orange-600 dark:text-orange-400" },
}

/* ── Cell display ────────────────────────────────────────────── */
function CellDisplay({ cell, onClick, selected, shakeResult }: {
  cell: Cell
  onClick: (e: React.MouseEvent) => void
  selected: boolean
  shakeResult: "good" | "damaged" | "collapsed" | null
}) {
  const { t } = useLang()
  const soil = cell.soil ? soilDef[cell.soil] : null
  const building = cell.building ? buildingDef[cell.building] : null
  const Icon = building?.icon

  const resultColor = shakeResult === "good" ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
    : shakeResult === "damaged" ? "border-orange-500/50 bg-orange-500/10 text-orange-700 dark:text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]"
    : shakeResult === "collapsed" ? "border-red-600/50 bg-red-600/20 text-red-700 dark:text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
    : ""

  return (
    <button
      onClick={(e) => onClick(e)}
      className={cn(
        "relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all duration-300 text-xs font-bold overflow-hidden",
        soil ? soil.color : "bg-secondary/30 border-border/50 hover:bg-secondary/50",
        selected && !shakeResult && "border-primary bg-primary/10 shadow-[0_0_20px_rgba(59,130,246,0.2)] scale-[0.98]",
        shakeResult && resultColor
      )}
      aria-label={`${t("ville.cellAria")}: ${cell.soil ?? ""} ${cell.building ?? ""}`}
    >
      {/* Background pattern for soil */}
      {soil && !shakeResult && (
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)', backgroundSize: '8px 8px' }} />
      )}
      
      {Icon && <Icon size={20} className={cn("shrink-0 relative z-10", shakeResult === "collapsed" && "opacity-50 rotate-12")} />}
      {cell.building && (
        <span className="text-[10px] leading-tight text-center px-1 truncate w-full relative z-10">
          {cell.building.slice(0,5)}
        </span>
      )}
      {shakeResult === "collapsed" && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 backdrop-blur-[1px]">
          <span className="text-2xl text-red-500 font-black drop-shadow-md rotate-[-15deg]">X</span>
        </div>
      )}
      {!cell.soil && !cell.building && <span className="text-muted-foreground/50 text-xl font-light">+</span>}
    </button>
  )
}

/* ── Main Module ─────────────────────────────────────────────── */
export default function ModuleVille() {
  const { lang, t } = useLang()
  const gridRef = useRef<HTMLDivElement>(null)
  const scoreSubmittedRef = useRef(false)
  const { submitScore } = useSubmitScore()
  const {
    step, setStep, selectedCell, selectedCells, grid, shakeResults, shaking, showResults, setShowResults,
    budget, budgetPct, totalBuildings, resistantCount, selectedCellData,
    handleCellClick, setSoil, placeBuilding, setConstruct, runEarthquake, reset, moveSelection,
    calculateBudgetAfterAction, GRID_SIZE, BUDGET_START,
  } = useVilleGame()

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
    if (!showResults || scoreSubmittedRef.current) return
    scoreSubmittedRef.current = true
    const dominantSoil = grid.find((c) => c.soil)?.soil ?? "rock"
    submitScore({
      finalBudget: budget,
      buildingsConstructed: totalBuildings,
      resilientBuildings: resistantCount,
      selectedSoil: dominantSoil,
      difficulty: "medium",
      lang,
    }).catch(() => {
      scoreSubmittedRef.current = false
    })
  }, [showResults, budget, totalBuildings, resistantCount, grid, lang, submitScore])

  useEffect(() => {
    if (!showResults) scoreSubmittedRef.current = false
  }, [showResults])

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8 relative overflow-hidden font-sans transition-colors duration-300">
      {/* Background Textures */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-background to-red-500/5 dark:from-blue-900/20 dark:to-red-900/10 pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
            {t("ville.title")}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            {t("ville.titleDetail")}
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
          {([1,2,3,4] as GameStep[]).map(s => (
            <button key={s} onClick={() => setStep(s)}
              className={cn("shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-300",
                step === s ? "bg-primary/10 border-primary text-foreground shadow-[0_0_15px_rgba(59,130,246,0.15)]" : 
                step > s ? "bg-secondary/50 border-border text-foreground hover:bg-secondary" :
                "bg-card border-border/50 text-muted-foreground hover:border-border"
              )}>
              <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs",
                step === s ? "bg-primary text-primary-foreground" : 
                step > s ? "bg-foreground text-background" :
                "bg-muted text-muted-foreground"
              )}>
                {step > s ? <CheckCircle size={12} /> : s}
              </span>
              {t(STEP_KEYS[s - 1])}
            </button>
          ))}
        </div>

        {/* Budget bar */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between text-base mb-3">
            <span className="font-bold text-foreground flex items-center gap-2">
              <ShoppingBag size={18} className="text-primary" />
              {t("ville.budget")}
            </span>
            <span className={cn("font-black text-xl tracking-tight", budget < 0 ? "text-red-500" : budget < 200000 ? "text-orange-500" : "text-green-500")}>
              {budget.toLocaleString()} HTG
            </span>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden border border-border/50">
            <div className="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${budgetPct}%`, backgroundColor: budget < 0 ? "#ef4444" : budget < 200000 ? "#f97316" : "#22c55e" }}>
                <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', backgroundSize: '200% 100%' }} />
              </div>
          </div>
          <div className="flex justify-between text-xs font-medium text-muted-foreground mt-2">
            <span>0 HTG</span>
            <span>{BUDGET_START.toLocaleString()} HTG</span>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Grid Area */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6">
              <div
                ref={gridRef}
                tabIndex={0}
                role="grid"
                aria-label={t("ville.title")}
                className={cn("grid gap-2 transition-all duration-500 outline-none focus:ring-2 focus:ring-primary/40 rounded-xl", shaking && "animate-shake")}
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
                {grid.map((cell, i) => (
                  <CellDisplay key={i} cell={cell} onClick={(e) => handleCellClick(i, e.ctrlKey)}
                    selected={selectedCell === i || selectedCells.has(i)} shakeResult={shakeResults[i] ?? null} />
                ))}
              </div>
              <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border/50">
                <Info size={16} className="shrink-0 text-primary mt-0.5" />
                <p>
                  {step === 1
                    ? t("ville.tip.multi")
                    : t("ville.tip.single")}
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Controls panel */}
          <div className="lg:col-span-5 space-y-4">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <GlassCard className="p-6 space-y-4">
                    <div className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
                      <span className="w-2 h-6 bg-primary rounded-full" />
                      {t("ville.foundations")}
                    </div>
                    {selectedCell === null && selectedCells.size === 0 ? (
                      <div className="py-8 text-center text-muted-foreground border border-dashed border-border/50 rounded-xl">
                        <p>{t("ville.selectParcels")}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedCells.size > 0 && (
                          <div className="bg-primary/10 text-primary text-xs font-bold px-3 py-2 rounded-lg border border-primary/20 inline-block">
                            {selectedCells.size} {t("ville.parcelsSelected")}
                          </div>
                        )}
                        <div className="space-y-2">
                          {(Object.entries(soilDef) as [Exclude<SoilType, null>, typeof soilDef.rock][]).map(([id, def]) => (
                            <button key={id} onClick={() => setSoil(id)}
                              className={cn("w-full text-left p-4 rounded-xl text-sm border-2 transition-all duration-200 hover:shadow-md", def.color,
                                (selectedCells.size > 0 && Array.from(selectedCells).some(i => grid[i].soil === id)) || (selectedCell !== null && selectedCellData?.soil === id) ? "border-current bg-current/10 scale-[0.98]" : "bg-card hover:bg-secondary/50")}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold">{pickLabel(villeLabels.soil[id], lang)}</span>
                                <span className="text-xs px-2 py-1 rounded-md bg-background/50 font-mono">Risk ×{def.risk}</span>
                              </div>
                              <p className="text-xs opacity-80">{pickDesc(villeLabels.soil[id], lang)}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <GlassCard className="p-6 space-y-4">
                    <div className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
                      <span className="w-2 h-6 bg-primary rounded-full" />
                      {t("ville.infrastructure")}
                    </div>
                    {selectedCell === null ? (
                      <div className="py-8 text-center text-muted-foreground border border-dashed border-border/50 rounded-xl">
                        <p>{t("ville.selectBuild")}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {(Object.entries(buildingDef) as [Exclude<BuildingType, null>, typeof buildingDef.school][]).map(([id, def]) => {
                          const Icon = def.icon
                          const buildingCost = Math.round(def.costBase * constructDef["ciment"].multiplier)
                          const testGrid = grid.map((c, i) => i === selectedCell ? { ...c, building: id as BuildingType, construct: c.construct ?? "ciment" } : c)
                          const wouldExceedBudget = calculateBudgetAfterAction(testGrid) < 0
                          const isSelected = selectedCellData?.building === id
                          
                          return (
                            <button key={id} onClick={() => placeBuilding(id)} disabled={wouldExceedBudget}
                              className={cn("flex flex-col items-center justify-center p-4 rounded-xl text-sm border-2 transition-all duration-200",
                                wouldExceedBudget ? "opacity-40 cursor-not-allowed bg-secondary/30 border-border/50" :
                                isSelected ? "bg-primary/10 border-primary text-primary shadow-sm scale-[0.98]" : "bg-card border-border hover:border-primary/50 hover:bg-secondary/50 text-foreground"
                              )}
                              title={wouldExceedBudget ? t("ville.insufficientBudget") : ""}>
                              <Icon size={24} className="mb-2" />
                              <span className="font-bold mb-1">{pickLabel(villeLabels.building[id], lang)}</span>
                              <span className="text-xs font-mono opacity-70">{buildingCost.toLocaleString()} HTG</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <GlassCard className="p-6 space-y-4">
                    <div className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
                      <span className="w-2 h-6 bg-primary rounded-full" />
                      {t("ville.materialsNorms")}
                    </div>
                    {selectedCell === null ? (
                      <div className="py-8 text-center text-muted-foreground border border-dashed border-border/50 rounded-xl">
                        <p>{t("ville.selectExisting")}</p>
                      </div>
                    ) : !selectedCellData?.building ? (
                      <div className="py-8 text-center text-orange-500/80 border border-dashed border-orange-500/30 bg-orange-500/5 rounded-xl">
                        <p>{t("ville.buildFirst")}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {(Object.entries(constructDef) as [Exclude<ConstructType, null>, typeof constructDef.parasismique][]).map(([id, def]) => {
                          const testGrid = grid.map((c, i) => i === selectedCell ? { ...c, construct: id } : c)
                          const wouldExceedBudget = calculateBudgetAfterAction(testGrid) < 0
                          const isSelected = selectedCellData?.construct === id
                          
                          return (
                            <button key={id} onClick={() => setConstruct(id)} disabled={wouldExceedBudget}
                              className={cn("w-full flex flex-col p-4 rounded-xl text-sm border-2 transition-all duration-200 text-left",
                                wouldExceedBudget ? "opacity-40 cursor-not-allowed bg-secondary/30 border-border/50" :
                                isSelected ? "bg-card border-current shadow-sm scale-[0.98]" : "bg-card border-border hover:border-current/50 hover:bg-secondary/50",
                                def.color
                              )}
                              title={wouldExceedBudget ? t("ville.insufficientBudget") : ""}>
                              <span className="font-bold text-base mb-2">{pickLabel(villeLabels.construct[id], lang)}</span>
                              <div className="flex gap-4 text-xs font-mono opacity-80 bg-background/50 p-2 rounded-lg inline-flex">
                                <span className="flex items-center gap-1"><Shield size={12}/> {t("ville.resistance")}: {(def.resistance*100).toFixed(0)}%</span>
                                <span className="flex items-center gap-1"><ShoppingBag size={12}/> {t("ville.cost")}: ×{def.multiplier}</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </GlassCard>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <GlassCard className="p-6 space-y-6">
                    <div className="text-lg font-bold text-foreground flex items-center gap-2 border-b border-border/50 pb-3">
                      <span className="w-2 h-6 bg-destructive rounded-full" />
                      {t("ville.seismicTest")}
                    </div>
                    
                    <div className="bg-secondary/30 p-4 rounded-xl border border-border/50 text-center">
                      <div className="text-3xl font-black text-foreground mb-1">{totalBuildings}</div>
                      <div className="text-sm text-muted-foreground uppercase tracking-wider font-bold">
                        {t("ville.buildingsBuilt")}
                      </div>
                    </div>

                    <button onClick={runEarthquake} disabled={totalBuildings === 0 || shaking}
                      className="w-full py-4 rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground font-black text-lg transition-all duration-300 disabled:opacity-40 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] active:scale-[0.98]">
                      <Zap size={24} className={cn(shaking && "animate-pulse")} />
                      {t("ville.triggerQuake")}
                    </button>
                    
                    <button onClick={reset} disabled={shaking}
                      className="w-full py-3 rounded-xl bg-secondary text-foreground font-bold text-sm hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2 border border-border">
                      <RotateCcw size={16} />
                      {t("ville.resetCity")}
                    </button>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TECLA tip */}
            <AnimatePresence>
              {selectedCellData?.construct && step === 3 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                  <GlassCard className="p-4 border-l-4 border-l-blue-500 bg-blue-500/5">
                    <div className="flex gap-3">
                      <Info size={20} className="text-blue-500 shrink-0" />
                      <p className="text-sm text-blue-700 dark:text-blue-300 font-medium leading-relaxed">
                        {l(villeTeclaTips[selectedCellData.construct] ?? villeTeclaTips.null, lang)}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-2xl border-t-4 border-t-primary">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <Activity size={24} className="text-primary" />
              {t("ville.postQuake")}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20 shadow-inner">
              <div className="text-4xl font-black text-green-600 dark:text-green-400 mb-1">{resistantCount}</div>
              <div className="text-xs font-bold text-green-700 dark:text-green-500 uppercase tracking-wider">{t("ville.intact")}</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 shadow-inner">
              <div className="text-4xl font-black text-orange-600 dark:text-orange-400 mb-1">
                {Object.values(shakeResults).filter(r => r === "damaged").length}
              </div>
              <div className="text-xs font-bold text-orange-700 dark:text-orange-500 uppercase tracking-wider">{t("ville.damaged")}</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-500/20 shadow-inner">
              <div className="text-4xl font-black text-red-600 dark:text-red-400 mb-1">
                {Object.values(shakeResults).filter(r => r === "collapsed").length}
              </div>
              <div className="text-xs font-bold text-red-700 dark:text-red-500 uppercase tracking-wider">{t("ville.collapsed")}</div>
            </div>
          </div>

          <div className="bg-secondary/50 p-4 rounded-xl border border-border text-center">
            <p className="text-sm font-medium text-foreground">
              {totalBuildings > 0
                ? `${Math.round((resistantCount / totalBuildings) * 100)}% ${t("ville.survived")}`
                : ""}
            </p>
            {resistantCount / totalBuildings < 0.5 && totalBuildings > 0 && (
              <p className="text-xs text-red-500 mt-2 font-bold">{t("ville.badChoices")}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

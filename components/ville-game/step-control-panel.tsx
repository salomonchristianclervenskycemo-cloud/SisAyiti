"use client"

import { AnimatePresence, motion } from "framer-motion"
import { School, Home, Hospital, Shield, Zap, RotateCcw, MapPin, Wrench, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang-context"
import { pickLabel, pickDesc } from "@/lib/i18n"
import { villeLabels } from "@/lib/translations/ville"
import type { VilleGame } from "@/hooks/use-ville-game"
import type { BuildingType, ConstructType, GameStep, TerrainType } from "@/shared/ville-game"
import { isHeavyBuildingAllowed } from "@/shared/ville-game"
import { GlassCard } from "./civ1-panel"
import { RoleActionBar } from "./role-action-bar"
import { PhaseCampaignBar } from "./phase-campaign-bar"
import { villeBtn, villeBtnActive, villeBtnDanger } from "./civ1-theme"
import { canRepairCell } from "@/shared/ville-game"

const STEP_KEYS = ["ville.step.soil", "ville.step.zone", "ville.step.materials", "ville.step.simulation"] as const

const terrainStyle: Record<TerrainType, string> = {
  rock: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-400",
  soft: "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-400",
  clay: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-400",
}

const buildingIcons = { school: School, house: Home, hospital: Hospital, rescue: Shield } as const

type Props = Pick<
  VilleGame,
  | "step"
  | "setStep"
  | "role"
  | "setRole"
  | "selectedCell"
  | "selectedCells"
  | "grid"
  | "selectedCellData"
  | "budget"
  | "totalBuildings"
  | "shaking"
  | "revealGeoStudy"
  | "toggleZoning"
  | "placeBuilding"
  | "setConstruct"
  | "runEarthquake"
  | "reset"
  | "buildingCostPreview"
  | "previewReinforceCost"
  | "previewRepairCost"
  | "repairBuilding"
  | "damageStats"
  | "hasDamage"
  | "COST_GEO_STUDY"
  | "handleCellClick"
  | "phaseIndex"
  | "phaseReports"
  | "currentPhase"
  | "campaignComplete"
  | "HAITI_EARTHQUAKE_PHASES"
>

export function StepControlPanel(props: Props) {
  const { t, lang } = useLang()
  const {
    step,
    role,
    setRole,
    selectedCell,
    selectedCells,
    selectedCellData,
    budget,
    totalBuildings,
    shaking,
    revealGeoStudy,
    toggleZoning,
    placeBuilding,
    setConstruct,
    runEarthquake,
    reset,
    buildingCostPreview,
    previewReinforceCost,
    previewRepairCost,
    repairBuilding,
    damageStats,
    hasDamage,
    COST_GEO_STUDY,
    handleCellClick,
    phaseIndex,
    phaseReports,
    currentPhase,
    campaignComplete,
    HAITI_EARTHQUAKE_PHASES,
  } = props

  return (
    <div className="space-y-2">
      <GlassCard title={t("ville.activeRole")}>
        <RoleActionBar role={role} onRoleChange={setRole} />
      </GlassCard>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GlassCard title={t("ville.foundations")}>
              <p className="text-xs mb-2 font-medium">{t("ville.step1Hint")}</p>
              <p className="text-[10px] mb-2 opacity-80">{t("ville.step1Click")}</p>
              {selectedCell === null && selectedCells.size === 0 ? (
                <EmptyHint>{t("ville.selectParcels")}</EmptyHint>
              ) : (
                <div className="space-y-2">
                  {selectedCells.size > 0 && (
                    <button
                      type="button"
                      onClick={() => revealGeoStudy(Array.from(selectedCells))}
                      className={cn(villeBtn, "w-full")}
                    >
                      {t("ville.studyBatch")} ({selectedCells.size}×{COST_GEO_STUDY.toLocaleString()})
                    </button>
                  )}
                  {selectedCell !== null && !selectedCellData?.soilRevealed && (
                    <button
                      type="button"
                      onClick={() => revealGeoStudy([selectedCell])}
                      className={cn(villeBtn, "w-full")}
                    >
                      <MapPin size={14} className="inline mr-1" />
                      {t("ville.studyParcel")} — {COST_GEO_STUDY.toLocaleString()} HTG
                    </button>
                  )}
                  {selectedCellData?.soilRevealed && selectedCellData.terrain && (
                    <div className={cn("p-2 border-2 text-xs", terrainStyle[selectedCellData.terrain])}>
                      <p className="font-bold">{pickLabel(villeLabels.soil[selectedCellData.terrain], lang)}</p>
                      <p className="mt-0.5">{pickDesc(villeLabels.soil[selectedCellData.terrain], lang)}</p>
                    </div>
                  )}
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GlassCard title={t("ville.infrastructure")}>
              <p className="text-xs mb-2">{t("ville.step2Hint")}</p>
              {selectedCell === null ? (
                <EmptyHint>{t("ville.selectBuild")}</EmptyHint>
              ) : !selectedCellData?.soilRevealed ? (
                <EmptyHint>{t("ville.studyFirst")}</EmptyHint>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => toggleZoning(selectedCell)}
                    className={cn(villeBtn, "w-full mb-2 text-xs", selectedCellData.zoningLocked && villeBtnActive)}
                  >
                    {selectedCellData.zoningLocked ? t("ville.zoningOn") : t("ville.zoningOff")}
                  </button>
                  {role === "civil" && (
                    <p className="text-[10px] mb-2 opacity-80">{t("ville.step2CivilClick")}</p>
                  )}
                  <div className="grid grid-cols-2 gap-1">
                    {(["school", "house", "hospital", "rescue"] as const).map((id) => {
                      const Icon = buildingIcons[id]
                      const cost = buildingCostPreview(id, "ciment")
                      const allowed = isHeavyBuildingAllowed(selectedCellData, id)
                      const over = budget < cost
                      return (
                        <button
                          key={id}
                          type="button"
                          disabled={!allowed || over}
                          onClick={() => placeBuilding(id)}
                          className={cn(
                        villeBtn,
                        "flex flex-col items-center min-h-[72px] text-[10px]",
                        selectedCellData.building === id && villeBtnActive,
                            (!allowed || over) && "opacity-40"
                          )}
                        >
                          <Icon size={18} />
                          <span className="font-bold">{pickLabel(villeLabels.building[id], lang)}</span>
                          <span className="font-mono">{cost.toLocaleString()}</span>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </GlassCard>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {hasDamage && (
              <GlassCard title={t("ville.repairTitle")} glowColor="#14b8a6" className="mb-2">
                <div className="flex gap-3 text-xs mb-2">
                  <span className="flex items-center gap-1 text-amber-600">
                    <AlertTriangle size={12} />
                    {damageStats.damaged} {t("ville.damaged")}
                  </span>
                  <span className="flex items-center gap-1 text-destructive">
                    {damageStats.collapsed} {t("ville.collapsed")}
                  </span>
                </div>
                {selectedCell !== null && selectedCellData && canRepairCell(selectedCellData) ? (
                  <button
                    type="button"
                    disabled={budget < previewRepairCost}
                    onClick={() => repairBuilding(selectedCell)}
                    className={cn(villeBtn, "w-full flex items-center justify-center gap-2 border-teal-500/50 bg-teal-500/10")}
                  >
                    <Wrench size={16} />
                    {selectedCellData.damage === "collapsed"
                      ? t("ville.rebuild")
                      : t("ville.repair")}{" "}
                    — {previewRepairCost.toLocaleString()} HTG
                  </button>
                ) : (
                  <p className="text-xs text-muted-foreground">{t("ville.selectDamaged")}</p>
                )}
              </GlassCard>
            )}
            <GlassCard title={t("ville.materialsNorms")} glowColor="#eab308">
              {!selectedCellData?.building ? (
                <EmptyHint>{t("ville.buildFirst")}</EmptyHint>
              ) : canRepairCell(selectedCellData) ? (
                <p className="text-xs text-muted-foreground py-4 text-center">{t("ville.repairFirstHint")}</p>
              ) : (
                <div className="space-y-1">
                  {(["parasismique", "ciment", "bois", "adobe"] as const).map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setConstruct(id)}
                      className={cn(
                        villeBtn,
                        "w-full text-left text-xs",
                        selectedCellData.construct === id && villeBtnActive
                      )}
                    >
                      {pickLabel(villeLabels.construct[id], lang)}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={selectedCellData.reinforceLevel >= 3 || budget < previewReinforceCost}
                    onClick={() => handleCellClick(selectedCell!, false)}
                    className={cn(villeBtn, "w-full mt-1 text-xs")}
                  >
                    {t("ville.reinforce")} +{previewReinforceCost.toLocaleString()} — Lv{" "}
                    {selectedCellData.reinforceLevel}/3
                  </button>
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GlassCard title={t("ville.seismicTest")}>
              <PhaseCampaignBar
                phases={HAITI_EARTHQUAKE_PHASES}
                phaseIndex={phaseIndex}
                phaseReports={phaseReports}
              />
              {currentPhase && !campaignComplete && (
                <div className="mt-3 p-3 rounded-xl border border-primary/30 bg-primary/10 text-xs">
                  <p className="font-bold">{t(currentPhase.labelKey)}</p>
                  <p className="mt-1 opacity-90">{t(currentPhase.detailKey)}</p>
                  <p className="mt-2 font-black text-lg text-primary">M{currentPhase.magnitude}</p>
                </div>
              )}
              <div className="text-center py-2 mt-2 rounded-xl border border-border/50 bg-secondary/40">
                <div className="text-2xl font-black">{totalBuildings}</div>
                <div className="text-[10px] font-bold uppercase">{t("ville.buildingsBuilt")}</div>
              </div>
              <button
                type="button"
                onClick={runEarthquake}
                disabled={totalBuildings === 0 || shaking || campaignComplete}
                className={cn(villeBtn, villeBtnDanger, "w-full mt-2 py-3 text-base disabled:opacity-40")}
              >
                <Zap size={18} className="inline mr-2" />
                {currentPhase
                  ? `${t("ville.launchPhase")} ${phaseIndex + 1}`
                  : t("ville.triggerQuake")}
              </button>
              <button type="button" onClick={reset} disabled={shaking} className={cn(villeBtn, "w-full mt-1 text-xs")}>
                <RotateCcw size={14} className="inline mr-1" />
                {t("ville.resetCity")}
              </button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-6 text-center text-xs border border-dashed border-border/60 rounded-xl bg-muted/30">
      {children}
    </div>
  )
}

export function StepStepper({ step, setStep }: { step: GameStep; setStep: (s: GameStep) => void }) {
  const { t } = useLang()
  return (
    <div className="flex flex-wrap gap-1.5 p-1">
      {([1, 2, 3, 4] as GameStep[]).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => setStep(s)}
          className={cn(
            villeBtn,
            "flex-1 min-w-[80px] flex items-center justify-center gap-1 text-xs py-2",
            step === s && villeBtnActive
          )}
        >
          <span className="font-black">{s}</span>
          <span className="truncate hidden sm:inline">{t(STEP_KEYS[s - 1])}</span>
        </button>
      ))}
    </div>
  )
}

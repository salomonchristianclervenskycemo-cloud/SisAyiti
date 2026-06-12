"use client"

import { Activity, RotateCcw, Wrench, Users, Building2, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLang } from "@/lib/lang-context"
import { cn } from "@/lib/utils"
import type { SimulationReport } from "@/shared/ville-game"
import type { ResultsMode } from "@/hooks/use-ville-game"
import { villeBtn, villeAdvisor } from "./civ1-theme"
import { PHASE_BONUS_HTG } from "@/shared/ville-game"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  report: SimulationReport | null
  resultsMode: ResultsMode
  phaseIndex: number
  totalPhases: number
  onRetry: () => void
  onContinuePhase?: () => void
}

export function ResultsDialog({
  open,
  onOpenChange,
  report,
  resultsMode,
  phaseIndex,
  totalPhases,
  onRetry,
  onContinuePhase,
}: Props) {
  const { t } = useLang()
  if (!report) return null

  const isPhase = resultsMode === "phase"
  const isFinal = resultsMode === "final"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-t-4 border-t-destructive bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black flex items-center gap-2">
            <Activity size={22} className="text-destructive" />
            {isFinal ? t("ville.campaignFinal") : t("ville.phaseReport")} — M{report.magnitude.toFixed(1)}
            {isPhase && (
              <span className="text-xs font-normal text-muted-foreground">
                ({phaseIndex + 1}/{totalPhases})
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          <StatCard label={t("ville.intact")} value={`${report.intactPct}%`} tone="green" />
          <StatCard label={t("ville.damaged")} value={String(report.damagedCount)} tone="amber" />
          <StatCard label={t("ville.collapsed")} value={String(report.collapsedCount)} tone="red" />
          <StatCard label={t("ville.livesSaved")} value={report.livesSaved.toLocaleString()} tone="cyan" />
        </div>

        <div className="rounded-xl bg-secondary/50 border border-border p-4 flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-sm font-medium">
            <Wrench size={16} className="text-orange-500" />
            {t("ville.repairCost")}
          </span>
          <span className="text-lg font-black text-orange-600 dark:text-orange-400">
            {report.repairCostHtg.toLocaleString()} HTG
          </span>
        </div>

        {isPhase && (report.damagedCount > 0 || report.collapsedCount > 0) && (
          <p className="text-sm text-center text-amber-600 dark:text-amber-400 font-medium mt-2">
            {t("ville.repairBeforeNext")}
          </p>
        )}

        <p className="text-sm text-center text-muted-foreground mt-3">
          {report.intactPct >= 70
            ? t("ville.resultGreat")
            : report.intactPct >= 40
              ? t("ville.resultMid")
              : t("ville.badChoices")}
        </p>

        {isPhase && onContinuePhase && (
          <div className={cn(villeAdvisor, "mt-3 text-xs")}>
            {t("ville.phaseBonusMsg").replace("{amount}", PHASE_BONUS_HTG.toLocaleString())}
          </div>
        )}

        <div className="flex flex-col gap-2 mt-4">
          {isPhase && onContinuePhase && (
            <button
              type="button"
              onClick={() => {
                onOpenChange(false)
                onContinuePhase()
              }}
              className={cn(
                villeBtn,
                "w-full py-3 flex items-center justify-center gap-2 text-base border-primary bg-primary/10 text-primary"
              )}
            >
              <ArrowRight size={18} />
              {t("ville.continueCampaign")}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              onOpenChange(false)
              if (isFinal || !onContinuePhase) onRetry()
            }}
            className={cn(villeBtn, "w-full py-3 flex items-center justify-center gap-2")}
          >
            <RotateCcw size={18} />
            {isFinal ? t("ville.retryRebuild") : t("ville.resetCity")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "green" | "amber" | "red" | "cyan"
}) {
  const bg =
    tone === "green"
      ? "bg-green-500/10 border-green-500/30"
      : tone === "amber"
        ? "bg-amber-500/10 border-amber-500/30"
        : tone === "red"
          ? "bg-destructive/10 border-destructive/30"
          : "bg-cyan-500/10 border-cyan-500/30"
  return (
    <div className={cn("p-3 rounded-xl border text-center", bg)}>
      <Building2 size={14} className="mx-auto mb-1 opacity-50" />
      <div className="text-[10px] font-bold uppercase text-muted-foreground">{label}</div>
      <div className="text-lg font-black">{value}</div>
    </div>
  )
}

"use client"

import { Activity, AlertTriangle, MapPin } from "lucide-react"
import { useLang } from "@/lib/lang-context"
import type { SurveillanceKpis } from "@/lib/surveillance/kpis"
import { GlassCard } from "./glass-card"
import { cn } from "@/lib/utils"

type Props = {
  kpis: SurveillanceKpis
}

const KPI_CONFIG = [
  {
    key: "count",
    labelKey: "act.quakesToday",
    border: "border-l-blue-500",
    valueClass: "text-foreground",
    icon: Activity,
    sub: (k: SurveillanceKpis, t: (k: string) => string) =>
      `${t("act.last24h")} · ${k.count_total} ${t("act.results")}`,
  },
  {
    key: "mag",
    labelKey: "act.maxMagnitude",
    border: "border-l-red-500",
    valueClass: "text-red-600 dark:text-red-400",
    icon: null,
    sub: (k: SurveillanceKpis, t: (k: string) => string) =>
      `${t("act.last24h")} · ${k.count_24h} ${t("act.results")}`,
    format: (k: SurveillanceKpis) => `M ${k.max_magnitude_24h.toFixed(1)}`,
  },
  {
    key: "alerts",
    labelKey: "act.activeAlerts",
    border: "border-l-orange-500",
    valueClass: "text-orange-600 dark:text-orange-400",
    icon: AlertTriangle,
    sub: (_k: SurveillanceKpis, t: (k: string) => string) => t("act.needsAttention"),
  },
  {
    key: "depth",
    labelKey: "act.avgDepth",
    border: "border-l-cyan-500",
    valueClass: "text-cyan-700 dark:text-cyan-400",
    icon: MapPin,
    sub: (k: SurveillanceKpis, t: (k: string) => string) => {
      let s = `${t("surv.kpi.haiti24h")}: ${k.haiti_count_24h}`
      if (k.tsunami_count > 0) s += ` · ${k.tsunami_count} tsunami`
      return s
    },
    format: (k: SurveillanceKpis) => `${k.avg_depth_km} km`,
  },
] as const

export function SurveillanceKpiRow({ kpis }: Props) {
  const { t } = useLang()

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {KPI_CONFIG.map((cfg) => {
        const Icon = cfg.icon
        const value =
          "format" in cfg && cfg.format
            ? cfg.format(kpis)
            : cfg.key === "count"
              ? String(kpis.count_24h)
              : cfg.key === "alerts"
                ? String(kpis.active_alerts)
                : ""

        return (
          <GlassCard
            key={cfg.key}
            className={cn("p-4 sm:p-5 border-l-4", cfg.border)}
          >
            <p className="text-[11px] sm:text-xs font-medium text-muted-foreground mb-1.5 leading-tight">
              {t(cfg.labelKey)}
            </p>
            <p
              className={cn(
                "text-xl sm:text-2xl font-black tabular-nums tracking-tight",
                cfg.valueClass
              )}
            >
              {value}
            </p>
            <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-2 flex items-center gap-1 leading-snug">
              {Icon && <Icon size={11} className="shrink-0 opacity-70" aria-hidden />}
              <span className="line-clamp-2">{cfg.sub(kpis, t)}</span>
            </p>
          </GlassCard>
        )
      })}
    </div>
  )
}

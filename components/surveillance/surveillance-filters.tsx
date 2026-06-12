"use client"

import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang-context"
import {
  Activity,
  AlertTriangle,
  Clock,
  Filter,
  History,
  Search,
  SlidersHorizontal,
  Waves,
} from "lucide-react"

export type SurveillanceCategory =
  | "all"
  | "critical"
  | "tectonic"
  | "tsunami"
  | "history"
  | "haiti"

const CATEGORIES: {
  id: SurveillanceCategory
  labelKey: string
  icon: typeof Clock
}[] = [
  { id: "all", labelKey: "act.cat.all", icon: Clock },
  { id: "haiti", labelKey: "surv.filter.haitiOnly", icon: Filter },
  { id: "critical", labelKey: "act.cat.critical", icon: AlertTriangle },
  { id: "tectonic", labelKey: "act.cat.tectonic", icon: Activity },
  { id: "tsunami", labelKey: "act.cat.tsunami", icon: Waves },
  { id: "history", labelKey: "act.cat.history", icon: History },
]

type Props = {
  activeCategory: SurveillanceCategory
  onCategoryChange: (id: SurveillanceCategory) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  minMagnitude: number
  onMinMagnitudeChange: (mag: number) => void
}

export function SurveillanceFilters({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  minMagnitude,
  onMinMagnitudeChange,
}: Props) {
  const { t } = useLang()

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex gap-2 overflow-x-auto surveillance-scroll pb-1 -mx-1 px-1"
        role="tablist"
        aria-label={t("surv.filter.categories")}
      >
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors shrink-0",
                "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                isActive
                  ? "bg-primary/12 border-primary/40 text-primary shadow-sm"
                  : "bg-muted/50 border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon size={14} aria-hidden />
              {t(cat.labelKey)}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <label className="flex items-center gap-3 text-sm text-muted-foreground bg-card border border-border/60 rounded-xl px-4 py-2.5 shadow-sm min-w-[200px]">
          <SlidersHorizontal size={16} className="shrink-0 text-primary" aria-hidden />
          <span className="whitespace-nowrap font-medium">{t("surv.filter.minMag")}</span>
          <input
            type="range"
            min={2}
            max={6}
            step={0.5}
            value={minMagnitude}
            onChange={(e) => onMinMagnitudeChange(parseFloat(e.target.value))}
            className="flex-1 min-w-[80px] accent-primary h-2"
            aria-valuemin={2}
            aria-valuemax={6}
            aria-valuenow={minMagnitude}
          />
          <span className="font-mono font-bold text-foreground tabular-nums w-9 text-right">
            M{minMagnitude}
          </span>
        </label>
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            size={18}
            aria-hidden
          />
          <input
            type="search"
            placeholder={t("act.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              "w-full bg-card border border-border/60 rounded-xl py-2.5 pl-11 pr-4 text-sm text-foreground",
              "placeholder:text-muted-foreground/80 shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
            )}
          />
        </div>
      </div>
    </div>
  )
}

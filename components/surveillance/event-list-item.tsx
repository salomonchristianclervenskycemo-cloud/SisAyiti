"use client"

import { memo } from "react"
import { formatDistanceToNow } from "date-fns"
import { fr, enUS, es } from "date-fns/locale"
import { Clock, Layers, Waves } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SeismicEventUI, RiskLevel } from "@/lib/seismic-types"

const RISK_COLORS: Record<RiskLevel, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
  low: "#3b82f6",
}

const RISK_RING: Record<RiskLevel, string> = {
  critical: "ring-red-500/40",
  high: "ring-orange-500/35",
  medium: "ring-amber-500/30",
  low: "ring-blue-500/25",
}

function dateLocale(lang: string) {
  if (lang === "fr") return fr
  if (lang === "es") return es
  if (lang === "en") return enUS
  return undefined
}

type Props = {
  event: SeismicEventUI
  isSelected: boolean
  lang: string
  unknownRegion: string
  onSelect: (e: SeismicEventUI) => void
  style?: React.CSSProperties
}

export const SurveillanceEventListItem = memo(function SurveillanceEventListItem({
  event,
  isSelected,
  lang,
  unknownRegion,
  onSelect,
  style,
}: Props) {
  const color = RISK_COLORS[event.risk]

  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      style={style}
      className={cn(
        "w-full text-left mb-2.5 p-3.5 sm:p-4 rounded-xl border transition-[background,border-color,box-shadow] duration-200",
        "relative overflow-hidden block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        isSelected
          ? cn("bg-card border-border shadow-md ring-2", RISK_RING[event.risk])
          : "bg-card/70 border-border/50 hover:bg-card hover:border-border/80"
      )}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      <div className="flex justify-between items-start gap-2 mb-1.5 pl-2">
        <div className="flex items-baseline gap-2 min-w-0">
          <span
            className="text-2xl sm:text-[1.65rem] font-black tabular-nums leading-none"
            style={{ color }}
          >
            {event.magnitude.toFixed(1)}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Mw
          </span>
        </div>
        <time
          className="text-[11px] text-muted-foreground flex items-center gap-1 shrink-0 tabular-nums"
          dateTime={event.eventTime}
        >
          <Clock size={11} aria-hidden />
          {formatDistanceToNow(new Date(event.eventTime), {
            addSuffix: true,
            locale: dateLocale(lang),
          })}
        </time>
      </div>
      <p className="text-sm sm:text-[0.9375rem] font-semibold text-foreground line-clamp-2 pl-2 leading-snug">
        {event.region || event.district || unknownRegion}
      </p>
      <div className="flex flex-wrap gap-1.5 text-[11px] text-muted-foreground pl-2 mt-2">
        <span className="inline-flex items-center gap-1 bg-muted/80 px-2 py-0.5 rounded-md border border-border/40">
          <Layers size={11} aria-hidden />
          {event.depth.toFixed(1)} km
        </span>
        {event.tsunami && (
          <span className="inline-flex items-center gap-1 bg-sky-500/15 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-md border border-sky-500/25 font-medium">
            <Waves size={11} aria-hidden />
            Tsunami
          </span>
        )}
      </div>
    </button>
  )
})

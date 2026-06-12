"use client"

import { memo, useMemo } from "react"
import { format } from "date-fns"
import { Radio } from "lucide-react"
import { useLang } from "@/lib/lang-context"
import type { SeismicEventUI, RiskLevel } from "@/lib/seismic-types"

const RISK_COLORS: Record<RiskLevel, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
  low: "#3b82f6",
}

type Props = {
  events: SeismicEventUI[]
}

function SurveillanceLiveTickerInner({ events }: Props) {
  const { t } = useLang()
  const items = useMemo(() => events.slice(0, 16), [events])
  const duplicated = useMemo(() => [...items, ...items], [items])

  if (items.length === 0) return null

  return (
    <div
      className="w-full bg-card/90 backdrop-blur-md border border-border/50 py-2.5 px-4 flex items-center gap-4 overflow-hidden rounded-xl shadow-sm"
      aria-live="polite"
      aria-label={t("act.liveFeed")}
    >
      <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 whitespace-nowrap shrink-0">
        <Radio size={14} className="motion-safe:animate-pulse" aria-hidden />
        {t("act.liveFeed")}
      </div>
      <div className="flex-1 overflow-hidden min-w-0 mask-linear-fade">
        <div className="surv-marquee-track flex gap-10 text-xs sm:text-sm text-muted-foreground">
          {duplicated.map((e, i) => (
            <span
              key={`ticker-${e.id}-${i}`}
              className="inline-flex items-center gap-2 shrink-0"
            >
              <span className="tabular-nums text-muted-foreground/90">
                {format(new Date(e.eventTime), "HH:mm")}
              </span>
              <span className="font-bold tabular-nums" style={{ color: RISK_COLORS[e.risk] }}>
                M{e.magnitude.toFixed(1)}
              </span>
              <span className="max-w-[12rem] truncate">
                {e.region || e.district || t("act.unknownRegion")}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export const SurveillanceLiveTicker = memo(SurveillanceLiveTickerInner)

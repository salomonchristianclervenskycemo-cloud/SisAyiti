"use client"

import { memo } from "react"
import { AlertTriangle, Waves, MapPin, ExternalLink } from "lucide-react"
import { useLang } from "@/lib/lang-context"
import { cn } from "@/lib/utils"
import type { SurveillanceAlert } from "@/lib/surveillance/alerts"
import { GlassCard } from "./glass-card"
import { formatDistanceToNow } from "date-fns"
import { fr, enUS, es } from "date-fns/locale"

const LEVEL_STYLE: Record<SurveillanceAlert["level"], string> = {
  critical: "border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400",
  high: "border-orange-500/50 bg-orange-500/10 text-orange-800 dark:text-orange-300",
  medium: "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300",
  info: "border-blue-500/30 bg-blue-500/5 text-muted-foreground",
}

function dateLocale(lang: string) {
  if (lang === "fr") return fr
  if (lang === "es") return es
  if (lang === "en") return enUS
  return undefined
}

type Props = {
  alerts: SurveillanceAlert[]
  isLoading?: boolean
  onSelectEventId?: (id: string) => void
  className?: string
}

function SurveillanceAlertsPanelInner({
  alerts,
  isLoading = false,
  onSelectEventId,
  className,
}: Props) {
  const { t, lang } = useLang()

  return (
    <GlassCard className={cn("p-4 md:p-5", className)}>
      <h3 className="text-sm font-bold flex items-center gap-2 mb-3 text-foreground">
        <AlertTriangle size={16} className="text-orange-500" aria-hidden />
        {t("surv.alerts.title")}
      </h3>

      {isLoading && alerts.length === 0 && (
        <p className="text-xs text-muted-foreground animate-pulse">{t("surv.status.loading")}</p>
      )}

      {!isLoading && alerts.length === 0 && (
        <p className="text-xs text-muted-foreground leading-relaxed">{t("surv.alerts.none")}</p>
      )}

      <ul className="space-y-2 max-h-[200px] overflow-y-auto surveillance-scroll">
        {alerts.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => onSelectEventId?.(a.event_id)}
              className={cn(
                "w-full text-left rounded-lg border px-3 py-2 text-xs transition-colors hover:opacity-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                LEVEL_STYLE[a.level]
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold uppercase tracking-wide text-[10px]">
                  {t(a.title_key) !== a.title_key ? t(a.title_key) : t("surv.alert.strong")}
                </span>
                <span className="font-mono font-black tabular-nums">M{a.magnitude.toFixed(1)}</span>
              </div>
              <p className="line-clamp-1 opacity-90">{a.message}</p>
              <div className="flex items-center gap-2 mt-1 opacity-80 text-[10px]">
                {a.is_haiti_region && (
                  <span className="inline-flex items-center gap-0.5">
                    <MapPin size={10} aria-hidden /> HT
                  </span>
                )}
                {a.tsunami && (
                  <span className="inline-flex items-center gap-0.5">
                    <Waves size={10} aria-hidden /> Tsunami
                  </span>
                )}
                <span>
                  {formatDistanceToNow(new Date(a.datetime_utc), {
                    addSuffix: true,
                    locale: dateLocale(lang),
                  })}
                </span>
                {a.official_link && (
                  <a
                    href={a.official_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="ml-auto inline-flex"
                    aria-label={t("surv.inspector.official")}
                  >
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}

export const SurveillanceAlertsPanel = memo(SurveillanceAlertsPanelInner)

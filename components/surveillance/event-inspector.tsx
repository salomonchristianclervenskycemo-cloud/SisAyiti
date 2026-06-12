"use client"

import dynamic from "next/dynamic"
import { format } from "date-fns"
import { fr, enUS, es } from "date-fns/locale"
import {
  Activity,
  AlertTriangle,
  Clock,
  ExternalLink,
  Globe,
  Layers,
  MapPin,
  Map,
} from "lucide-react"
import { useLang } from "@/lib/lang-context"
import { cn } from "@/lib/utils"
import type { SeismicEventUI, RiskLevel } from "@/lib/seismic-types"
import type { SurveillanceSeismicEvent } from "@/lib/surveillance/types"
import { officialLinkSourceLabel, resolveOfficialLink } from "@/lib/surveillance/official-link"
import {
  resolveValidationStatus,
  validationStatusLabelKey,
} from "@/lib/surveillance/validation-label"
import { GlassCard } from "./glass-card"

const EventMiniMap = dynamic(
  () => import("@/components/ui/event-mini-map").then((m) => m.EventMiniMap),
  { ssr: false, loading: () => <div className="min-h-[220px] surveillance-shimmer rounded-xl" /> }
)

const RISK_COLORS: Record<RiskLevel, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
  low: "#3b82f6",
}

function dateLocale(lang: string) {
  if (lang === "fr") return fr
  if (lang === "es") return es
  if (lang === "en") return enUS
  return undefined
}

type Props = {
  uiEvent: SeismicEventUI | null
  rawEvent: SurveillanceSeismicEvent | null
  onOpenOnMap?: () => void
}

export function SurveillanceEventInspector({ uiEvent, rawEvent, onOpenOnMap }: Props) {
  const { t, lang } = useLang()

  if (!uiEvent) {
    return (
      <GlassCard className="p-10 sm:p-12 flex items-center justify-center min-h-[240px]">
        <p className="text-muted-foreground flex items-center gap-2 text-sm">
          <Activity size={18} className="text-primary/60" aria-hidden />
          {t("act.selectEvent")}
        </p>
      </GlassCard>
    )
  }

  const color = RISK_COLORS[uiEvent.risk]
  const officialUrl = resolveOfficialLink(rawEvent, uiEvent)
  const officialSource = officialUrl ? officialLinkSourceLabel(officialUrl) : null
  const validationStatus = resolveValidationStatus(
    rawEvent?.validation_status,
    uiEvent.reviewed
  )
  const validationLabel = t(validationStatusLabelKey(validationStatus))

  return (
    <GlassCard
      glowColor={color}
      className="p-5 sm:p-7 lg:p-8 animate-in fade-in duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-5 min-w-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide rounded-md bg-muted border border-border/50 text-foreground">
                {t("act.detailedAnalysis")}
              </span>
              {uiEvent.risk === "critical" && (
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-red-500/15 text-red-700 dark:text-red-400 flex items-center gap-1 border border-red-500/25">
                  <AlertTriangle size={10} aria-hidden />
                  {t("act.majorAlert")}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight text-balance text-foreground">
              {uiEvent.region || uiEvent.district || t("act.unknownRegion")}
            </h2>
            <p className="text-muted-foreground text-sm mt-2 flex items-center gap-2 tabular-nums">
              <Clock size={14} className="text-primary shrink-0" aria-hidden />
              <time dateTime={uiEvent.eventTime}>
                {format(new Date(uiEvent.eventTime), "dd MMM yyyy · HH:mm:ss", {
                  locale: dateLocale(lang),
                })}
              </time>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
              <div className="text-[11px] font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                Magnitude
              </div>
              <div className="text-3xl sm:text-4xl font-black tabular-nums" style={{ color }}>
                {uiEvent.magnitude.toFixed(1)}{" "}
                <span className="text-sm font-medium text-muted-foreground">
                  {rawEvent?.magnitude_type ?? "Mw"}
                </span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
              <div className="text-[11px] font-medium text-muted-foreground mb-1 uppercase tracking-wide flex items-center gap-1">
                <Layers size={12} aria-hidden />
                {t("act.depth")}
              </div>
              <div className="text-3xl sm:text-4xl font-black tabular-nums text-foreground">
                {uiEvent.depth.toFixed(1)}{" "}
                <span className="text-sm font-medium text-muted-foreground">km</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg border border-border/50 text-muted-foreground font-mono tabular-nums">
              <MapPin size={14} className="text-primary shrink-0" aria-hidden />
              {uiEvent.latitude.toFixed(4)}°, {uiEvent.longitude.toFixed(4)}°
            </span>
            <span className="inline-flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg border border-border/50 text-muted-foreground">
              <Globe size={14} className="shrink-0" aria-hidden />
              {rawEvent
                ? `${t("surv.inspector.merged")}: ${rawEvent.merged_sources.join(" + ")}`
                : `Source: ${uiEvent.source}`}
            </span>
            <span className="inline-flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg border border-border/50 text-muted-foreground">
              <Activity size={14} className="text-primary shrink-0" aria-hidden />
              {t("surv.inspector.status")} : {validationLabel}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {officialUrl && (
              <a
                href={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-lg",
                  "bg-muted/60 border border-border/60 text-foreground text-sm font-semibold",
                  "hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                )}
              >
                <ExternalLink size={16} aria-hidden />
                {t("surv.inspector.official")}
                {officialSource && officialSource !== "other" && (
                  <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    {officialSource}
                  </span>
                )}
              </a>
            )}
            {onOpenOnMap && (
              <button
                type="button"
                onClick={onOpenOnMap}
                className={cn(
                  "inline-flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-lg",
                  "bg-primary text-primary-foreground text-sm font-semibold shadow-sm",
                  "hover:opacity-90 transition-opacity",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                )}
              >
                <Map size={16} aria-hidden />
                {t("surv.inspector.openMap")}
              </button>
            )}
          </div>
        </div>

        <div className="relative min-h-[200px] sm:min-h-[240px] rounded-xl border border-border/50 overflow-hidden bg-muted/20">
          <EventMiniMap event={uiEvent} color={color} />
        </div>
      </div>
    </GlassCard>
  )
}

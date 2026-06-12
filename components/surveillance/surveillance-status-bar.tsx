"use client"

import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang-context"
import { SURVEILLANCE_CACHE_FRESH_MS } from "@/lib/surveillance/cache"
import type { SurveillanceFeedMode } from "@/lib/surveillance/feed-resolver"
import type { SourceFetchReport } from "@/lib/surveillance/types"
import { Activity, WifiOff, AlertTriangle, CloudOff, RefreshCw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr, enUS, es } from "date-fns/locale"

type Props = {
  mode: SurveillanceFeedMode
  status_message_key: string
  last_sync: string | null
  is_refreshing: boolean
  sources: SourceFetchReport[]
  cache_age_ms?: number | null
  onRefresh?: () => void
}

function dateLocale(lang: string) {
  if (lang === "fr") return fr
  if (lang === "es") return es
  if (lang === "en") return enUS
  return undefined
}

const MODE_STYLE: Record<
  SurveillanceFeedMode,
  { icon: typeof Activity; className: string }
> = {
  live: {
    icon: Activity,
    className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  degraded: {
    icon: AlertTriangle,
    className: "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300",
  },
  offline: {
    icon: CloudOff,
    className: "border-sky-500/40 bg-sky-500/10 text-sky-800 dark:text-sky-300",
  },
  error: {
    icon: WifiOff,
    className: "border-destructive/40 bg-destructive/10 text-destructive",
  },
}

function formatCacheAge(ms: number, lang: string): string {
  const min = Math.floor(ms / 60_000)
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  return lang === "fr" ? `${h} h` : `${h}h`
}

export function SurveillanceStatusBar({
  mode,
  status_message_key,
  last_sync,
  is_refreshing,
  sources,
  cache_age_ms,
  onRefresh,
}: Props) {
  const { t, lang } = useLang()
  const { icon: Icon, className } = MODE_STYLE[mode]
  const message =
    t(status_message_key) !== status_message_key ? t(status_message_key) : t("surv.status.loading")

  return (
    <div className={cn("rounded-xl border p-3.5 md:p-4 flex flex-col gap-3 shadow-sm", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <Icon
            size={18}
            className={cn("shrink-0 mt-0.5", is_refreshing && "animate-pulse")}
          />
          <div className="min-w-0">
            <p className="text-sm sm:text-[0.9375rem] font-semibold leading-snug text-pretty">{message}</p>
            {last_sync && (
              <p className="text-xs opacity-80 mt-1">
                {t("surv.lastSync")}{" "}
                {formatDistanceToNow(new Date(last_sync), {
                  addSuffix: true,
                  locale: dateLocale(lang),
                })}
                {cache_age_ms != null && cache_age_ms > SURVEILLANCE_CACHE_FRESH_MS && (
                  <span className="ml-1 opacity-70">
                    · cache {formatCacheAge(cache_age_ms, lang)}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={is_refreshing}
            className="shrink-0 p-2 rounded-lg border border-current/20 hover:bg-background/30 disabled:opacity-50"
            aria-label="Refresh"
          >
            <RefreshCw size={16} className={is_refreshing ? "animate-spin" : ""} />
          </button>
        )}
      </div>
      {sources.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {sources.map((s) => (
            <span
              key={`${s.source}-${s.state}`}
              className={cn(
                "text-[10px] font-bold uppercase px-2 py-1 rounded-md border",
                s.state === "ok"
                  ? "border-emerald-500/30 bg-emerald-500/15"
                  : "border-amber-500/30 bg-amber-500/15"
              )}
            >
              {t(`surv.source.${s.source.toLowerCase()}`) !== `surv.source.${s.source.toLowerCase()}`
                ? t(`surv.source.${s.source.toLowerCase()}`)
                : s.source}{" "}
              · {s.state === "ok" ? t("surv.source.ok") : t(`surv.source.${s.state}`)}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

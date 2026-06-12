'use client'

import { MapPin, Clock, CloudOff, CheckCircle2 } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { useCommunityReports } from '@/hooks/use-community-reports'
import { cn } from '@/lib/utils'

const TYPE_KEYS: Record<string, string> = {
  landslide: 'multi.report.landslide',
  flood: 'multi.report.flood',
  wall: 'multi.report.wall',
  other: 'multi.report.other',
}

const SEVERITY_STYLE = {
  low: 'text-emerald-600 dark:text-emerald-400',
  moderate: 'text-amber-600 dark:text-amber-400',
  critical: 'text-red-600 dark:text-red-400',
} as const

export function CommunityReportsList() {
  const { t } = useLang()
  const { reports } = useCommunityReports()

  if (reports.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8 border border-dashed border-border rounded-xl">
        {t('multi.reports.empty')}
      </p>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-foreground">{t('multi.reports.listTitle')}</h3>
      {reports.map((r) => (
        <div
          key={r.id}
          className="p-4 rounded-xl border border-border/50 bg-card/60 space-y-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold text-sm text-foreground">
              {t(TYPE_KEYS[r.hazardType] ?? 'multi.report.other')}
            </span>
            <span
              className={cn(
                'text-xs font-bold uppercase tracking-wide',
                SEVERITY_STYLE[r.severity]
              )}
            >
              {r.severity === 'critical'
                ? `🔴 ${t('multi.report.severity.critical')}`
                : r.severity === 'moderate'
                  ? `🟡 ${t('multi.report.severity.moderate')}`
                  : `🟢 ${t('multi.report.severity.low')}`}
            </span>
          </div>
          {r.description && (
            <p className="text-sm text-muted-foreground">{r.description}</p>
          )}
          {r.latitude != null && r.longitude != null && (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono">
              <MapPin size={12} />
              {r.latitude.toFixed(4)}°, {r.longitude.toFixed(4)}°
            </p>
          )}
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {new Date(r.createdAt).toLocaleString()}
            </span>
            {r.pendingSync ? (
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <CloudOff size={11} /> {t('multi.reports.pending')}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={11} /> {t('multi.reports.synced')}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

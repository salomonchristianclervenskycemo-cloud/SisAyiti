'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import {
  addCommunityReport,
  markReportsSynced,
  postReportToServer,
  syncCommunityReports,
  type ReportSeverity,
} from '@/lib/community-reports'
import { MapPin, Loader2 } from 'lucide-react'
import { ReportToast } from '@/components/multirisques/report-toast'
import { cn } from '@/lib/utils'

const TYPES = [
  { value: 'landslide', labelKey: 'multi.report.landslide' },
  { value: 'flood', labelKey: 'multi.report.flood' },
  { value: 'wall', labelKey: 'multi.report.wall' },
  { value: 'other', labelKey: 'multi.report.other' },
] as const

const SEVERITIES: { value: ReportSeverity; labelKey: string; emoji: string }[] = [
  { value: 'low', labelKey: 'multi.report.severity.low', emoji: '🟢' },
  { value: 'moderate', labelKey: 'multi.report.severity.moderate', emoji: '🟡' },
  { value: 'critical', labelKey: 'multi.report.severity.critical', emoji: '🔴' },
]

export function CommunityReportForm() {
  const { t } = useLang()
  const [hazardType, setHazardType] = useState('landslide')
  const [severity, setSeverity] = useState<ReportSeverity>('moderate')
  const [description, setDescription] = useState('')
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [locating, setLocating] = useState(false)
  const [toast, setToast] = useState<{ message: string; offline: boolean } | null>(null)

  const useMyPosition = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setToast({ message: t('multi.report.positionError'), offline: false })
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude)
        setLongitude(pos.coords.longitude)
        setLocating(false)
      },
      () => {
        setLocating(false)
        setToast({ message: t('multi.report.positionError'), offline: false })
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  }

  const submit = async () => {
    const online = typeof navigator !== 'undefined' ? navigator.onLine : true

    const report = addCommunityReport({
      hazardType,
      description: description.trim(),
      severity,
      latitude,
      longitude,
      pendingSync: !online,
    })

    if (online) {
      const posted = await postReportToServer(report)
      if (posted) {
        markReportsSynced([report.id])
        await syncCommunityReports()
        setToast({ message: t('multi.report.onlineToast'), offline: false })
      } else {
        setToast({ message: t('multi.report.offlineToast'), offline: true })
      }
    } else {
      setToast({ message: t('multi.report.offlineToast'), offline: true })
    }

    setDescription('')
    setLatitude(null)
    setLongitude(null)
    setSeverity('moderate')
    setHazardType('landslide')
  }

  return (
    <>
      <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-5 space-y-4">
        <h3 className="font-bold text-foreground">{t('multi.report.title')}</h3>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            {t('multi.report.type')}
          </label>
          <select
            value={hazardType}
            onChange={(e) => setHazardType(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
          >
            {TYPES.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {t(opt.labelKey)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            {t('multi.report.severity')}
          </label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value as ReportSeverity)}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
          >
            {SEVERITIES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.emoji} {t(s.labelKey)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            {t('multi.report.desc')}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={useMyPosition}
            disabled={locating}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium',
              'border border-border bg-secondary/50 hover:bg-secondary text-foreground transition-colors'
            )}
          >
            {locating ? <Loader2 size={14} className="animate-spin" /> : <MapPin size={14} />}
            {t('multi.report.myPosition')}
          </button>
          {latitude != null && longitude != null && (
            <span className="text-xs font-mono text-muted-foreground">
              {t('multi.report.coords')}: {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => void submit()}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors"
        >
          {t('multi.report.submit')}
        </button>
      </div>

      <ReportToast
        message={toast?.message ?? ''}
        offline={toast?.offline}
        open={toast != null}
        onClose={() => setToast(null)}
      />
    </>
  )
}

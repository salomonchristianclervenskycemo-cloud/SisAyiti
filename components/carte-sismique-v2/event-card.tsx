'use client'

import { X, MapPin, Clock, Database, Waves, ExternalLink } from 'lucide-react'
import { officialLinkSourceLabel, resolveOfficialLink } from '@/lib/surveillance/official-link'
import { riskColor, type SeismicEventUI } from '@/lib/seismic-types'
import { formatEventDateHaiti } from '@/lib/haiti-region-resolver'
import {
  depthToColor,
  distanceKm,
  formatCoordinates,
  formatCoordinatesDMS,
  HAITI_REFERENCE,
  isInHaitiBounds,
} from '@/lib/seismic-geo'
import { formatDistanceToNow } from 'date-fns'
import { fr, enUS, es } from 'date-fns/locale'

import type { Lang } from '@/lib/i18n'
import { mapEventCardT, mapEventExtrasT, toMapLocale } from '@/lib/translations/map'

function dateLocale(lang: Lang) {
  if (lang === 'fr') return fr
  if (lang === 'en') return enUS
  if (lang === 'es') return es
  return undefined
}

interface EventCardProps {
  event: SeismicEventUI
  lang: Lang
  onClose: () => void
}

function depthClassLabel(depth: number, lang: Lang): string {
  const t = mapEventCardT[toMapLocale(lang)]
  if (depth < 30) return t.shallow
  if (depth < 70) return t.intermediate
  if (depth < 150) return t.deep
  return t.veryDeep
}

export function EventCard({ event, lang, onClose }: EventCardProps) {
  const ml = toMapLocale(lang)
  const t = mapEventCardT[ml]
  const extras = mapEventExtrasT[ml]
  const riskLabel = t[event.risk]
  const depthColor = depthToColor(event.depth)
  const dist = distanceKm(
    event.latitude,
    event.longitude,
    HAITI_REFERENCE.lat,
    HAITI_REFERENCE.lng
  )
  const inZone = isInHaitiBounds(event.latitude, event.longitude)
  const eventDate = new Date(event.eventTime)
  const officialUrl = resolveOfficialLink(null, event)
  const officialSource = officialUrl ? officialLinkSourceLabel(officialUrl) : null

  return (
    <div className="p-5 h-full flex flex-col overflow-y-auto">
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={14} className="text-cyan-400 shrink-0" />
            <h3 className="text-lg font-bold text-white truncate">
              {event.region ?? event.district ?? extras.fallback}
            </h3>
          </div>
          {event.id.startsWith('historical-') && (
            <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wide text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded">
              {extras.historical}
            </span>
          )}
          <p className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-1">
            <Clock size={11} />
            {formatEventDateHaiti(event.eventTime)}
          </p>
          <p className="text-[10px] text-cyan-600/80 mt-0.5">
            {formatDistanceToNow(eventDate, { addSuffix: true, locale: dateLocale(lang) })}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
          aria-label={extras.close}
        >
          <X size={18} className="text-gray-400" />
        </button>
      </div>

      <div
        className="rounded-xl p-5 mb-5 border shadow-lg relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${depthColor}22, transparent 60%)`,
          borderColor: `${depthColor}55`,
        }}
      >
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-30" style={{ backgroundColor: depthColor }} />
        <div className="relative">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t.magnitude}</div>
          <div className="text-5xl font-bold tabular-nums" style={{ color: depthColor }}>
            {event.magnitude.toFixed(1)}
          </div>
          {event.magnitudeType && (
            <div className="text-xs text-gray-500 mt-0.5">Type {event.magnitudeType}</div>
          )}
        </div>
      </div>

      <div className="space-y-2.5 text-sm flex-1">
        <Row icon={<Waves size={14} />} label={t.depth} value={`${event.depth.toFixed(1)} ${t.km}`} valueColor={depthColor} />
        <Row icon={<Waves size={14} />} label={t.depthClass} value={depthClassLabel(event.depth, lang)} valueColor={depthColor} />
        <Row icon={<Database size={14} />} label={t.risk} value={riskLabel} valueColor={riskColor(event.risk)} />
        <Row icon={<Database size={14} />} label={t.source} value={event.source} />
        <Row
          icon={<MapPin size={14} />}
          label={t.coords}
          value={formatCoordinates(event.latitude, event.longitude)}
          mono
        />
        <Row
          icon={<MapPin size={14} />}
          label={t.coordsDms}
          value={formatCoordinatesDMS(event.latitude, event.longitude)}
          mono
          small
        />
        <Row
          icon={<MapPin size={14} />}
          label={t.distance}
          value={`${dist.toFixed(1)} ${t.km} — ${HAITI_REFERENCE.label}`}
        />
      </div>

      <div
        className={`mt-4 px-3 py-2 rounded-lg text-xs border ${
          inZone
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        }`}
      >
        {inZone ? t.inHaiti : t.outsideHaiti}
      </div>

      {event.tsunami && (
        <div className="mt-2 px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/40 text-xs text-blue-300">
          ⚠ {extras.tsunami}
        </div>
      )}

      {officialUrl && (
        <a
          href={officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/15 text-sm font-semibold text-cyan-300 hover:bg-white/10 transition-colors"
        >
          <ExternalLink size={16} aria-hidden />
          {extras.officialReport}
          {officialSource && officialSource !== 'other' && (
            <span className="text-[10px] uppercase tracking-wide text-gray-500">{officialSource}</span>
          )}
        </a>
      )}
    </div>
  )
}

function Row({
  icon,
  label,
  value,
  mono,
  small,
  valueColor,
}: {
  icon?: React.ReactNode
  label: string
  value: string
  mono?: boolean
  small?: boolean
  valueColor?: string
}) {
  return (
    <div className="flex justify-between items-start gap-3 py-2 border-b border-white/5 last:border-0">
      <span className="text-[10px] text-gray-500 uppercase tracking-wide flex items-center gap-1.5 shrink-0">
        {icon}
        {label}
      </span>
      <span
        className={`text-right ${mono ? 'font-mono' : ''} ${small ? 'text-[10px]' : 'text-xs'} text-gray-200`}
        style={valueColor ? { color: valueColor, fontWeight: 600 } : undefined}
      >
        {value}
      </span>
    </div>
  )
}

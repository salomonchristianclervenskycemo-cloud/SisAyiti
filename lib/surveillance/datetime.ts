import { HAITI_IANA_TIMEZONE } from './constants'

export function toUtcIso(date: Date): string {
  return date.toISOString()
}

/** Heure locale Haïti (America/Port-au-Prince) pour affichage citoyen */
export function toHaitiLocalIso(utcDate: Date): string {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: HAITI_IANA_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(utcDate)

    const get = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((p) => p.type === type)?.value ?? '00'

    return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`
  } catch {
    return utcDate.toISOString()
  }
}

export function parseEventTime(value: unknown): Date | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value
  if (typeof value === 'number' && Number.isFinite(value)) {
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? null : d
  }
  if (typeof value === 'string' && value.trim()) {
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? null : d
  }
  return null
}

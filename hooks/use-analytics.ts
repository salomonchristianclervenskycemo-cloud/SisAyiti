'use client'

import { useEffect } from 'react'
import { useSeismicStore } from '@/lib/seismic-store'
import type { RiskLevel, SeismicEventUI, SeismicStats } from '@/lib/seismic-types'

const EMPTY_RISK: Record<RiskLevel, number> = {
  critical: 0,
  high: 0,
  medium: 0,
  low: 0,
}

function statsFromEvents(events: SeismicEventUI[]): SeismicStats {
  const riskDistribution: Record<RiskLevel, number> = { ...EMPTY_RISK }
  const now = Date.now()
  const day24 = now - 24 * 60 * 60 * 1000
  const day7 = now - 7 * 24 * 60 * 60 * 1000

  let sumMag = 0
  let highest = 0
  let last24 = 0
  let last7 = 0

  for (const e of events) {
    sumMag += e.magnitude
    if (e.magnitude > highest) highest = e.magnitude
    const t = new Date(e.eventTime).getTime()
    if (t >= day24) last24++
    if (t >= day7) last7++
    if (e.risk in riskDistribution) riskDistribution[e.risk]++
  }

  const n = events.length
  return {
    totalEvents: n,
    avgMagnitude: n ? sumMag / n : 0,
    highestMagnitude: highest,
    eventsLast24h: last24,
    eventsLast7d: last7,
    riskDistribution,
    topAffectedAreas: [],
  }
}

export function useAnalytics(days = 7) {
  const setStats = useSeismicStore((s) => s.setStats)
  const stats = useSeismicStore((s) => s.stats)
  const events = useSeismicStore((s) => s.events)

  useEffect(() => {
    let cancelled = false

    fetch(`/api/seismic/stats?days=${days}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (data?.success && data.riskDistribution && typeof data.riskDistribution === 'object') {
          setStats({
            totalEvents: data.totalEvents ?? 0,
            avgMagnitude: data.avgMagnitude ?? 0,
            highestMagnitude: data.highestMagnitude ?? 0,
            eventsLast24h: data.eventsLast24h ?? 0,
            eventsLast7d: data.eventsLast7d ?? 0,
            riskDistribution: data.riskDistribution,
            topAffectedAreas: data.topAffectedAreas ?? [],
          })
        } else if (events.length > 0) {
          setStats(statsFromEvents(events))
        }
      })
      .catch(() => {
        if (!cancelled && events.length > 0) {
          setStats(statsFromEvents(events))
        }
      })

    return () => {
      cancelled = true
    }
  }, [days, setStats, events])

  return stats
}

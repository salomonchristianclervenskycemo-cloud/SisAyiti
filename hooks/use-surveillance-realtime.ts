'use client'

import { useEffect, useRef } from 'react'
import { useSeismicStore } from '@/lib/seismic-store'
import { SURVEILLANCE_DASHBOARD_DAYS } from '@/lib/surveillance/constants'
import type { SeismicStreamPayload } from '@/shared/api-contract'

/**
 * SSE léger — Actualités uniquement. Ne modifie pas le store carte (Haïti).
 */
export function useSurveillanceRealtime(enabled: boolean, onTick?: () => void) {
  const setLiveConnected = useSeismicStore((s) => s.setLiveConnected)
  const minMag = useSeismicStore((s) => s.filters.magnitude.min)
  const onTickRef = useRef(onTick)

  useEffect(() => {
    onTickRef.current = onTick
  }, [onTick])

  useEffect(() => {
    if (!enabled || typeof EventSource === 'undefined') {
      setLiveConnected(false)
      return
    }

    const q = new URLSearchParams({
      days: String(SURVEILLANCE_DASHBOARD_DAYS),
      minMagnitude: String(minMag),
      global: 'true',
    })
    const es = new EventSource(`/api/seismic/stream?${q}`)

    es.onopen = () => setLiveConnected(true)
    es.onerror = () => setLiveConnected(false)
    es.onmessage = (msg) => {
      try {
        const payload = JSON.parse(msg.data) as SeismicStreamPayload
        if (payload.type === 'closed') {
          es.close()
          return
        }
        if (payload.type === 'events' && payload.ui_events?.length) {
          onTickRef.current?.()
        }
      } catch {
        /* ignore */
      }
    }

    return () => {
      es.close()
      setLiveConnected(false)
    }
  }, [enabled, setLiveConnected, minMag])
}

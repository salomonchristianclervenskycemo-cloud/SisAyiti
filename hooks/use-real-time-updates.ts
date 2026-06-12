'use client'

import { useEffect } from 'react'
import { useSeismicStore } from '@/lib/seismic-store'
import { enrichSeismicEvent } from '@/lib/seismic-event-enrich'
import { dbEventToUI } from '@/lib/seismic-types'
import { defaultRealtimeTransport, type RealtimeTransport } from '@/lib/realtime-transport'
import { readStoredLang } from '@/shared/i18n'
import { translations } from '@/lib/translations'

function getNotifyStrings(lang: import('@/shared/i18n').Lang) {
  return {
    title: translations['notify.earthquake'][lang],
    body: translations['notify.newEvent'][lang],
  }
}

export function useRealTimeUpdates(
  enabled = true,
  transport: RealtimeTransport = defaultRealtimeTransport
) {
  const prependEvent = useSeismicStore((s) => s.prependEvent)
  const setLiveConnected = useSeismicStore((s) => s.setLiveConnected)

  useEffect(() => {
    if (!enabled) return

    return transport.connect(
      (payload) => {
        if (payload.type === 'events') {
          const uiList =
            payload.ui_events ??
            (Array.isArray(payload.events)
              ? payload.events.map((e) =>
                  enrichSeismicEvent(dbEventToUI({ ...e, eventTime: new Date(e.eventTime) }))
                )
              : [])

          uiList.forEach((ui) => {
            prependEvent(ui)
            if (ui.magnitude >= 5) {
              const lang = readStoredLang() ?? 'fr'
              const { title, body } = getNotifyStrings(lang)
              const msg = `${title} M${ui.magnitude.toFixed(1)} — ${ui.region ?? body}`
              const live = document.getElementById('seismic-live-region')
              if (live) live.textContent = msg
              if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
                new Notification(`${title} M${ui.magnitude.toFixed(1)}`, {
                  body: ui.region ?? body,
                })
              }
            }
          })
        }
      },
      setLiveConnected
    )
  }, [enabled, prependEvent, setLiveConnected, transport])
}

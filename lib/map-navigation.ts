import { enrichSeismicEvent } from '@/lib/seismic-event-enrich'
import { isEventOutsideHaitiMap } from '@/lib/map-viewport'
import type { SeismicEventUI } from '@/lib/seismic-types'
import {
  setSeismicMapFocusEventId,
  setSeismicMapViewportExpanded,
  useSeismicStore,
} from '@/lib/seismic-store'

/**
 * Prépare la navigation Actualités → Carte : injecte l'événement, assouplit les filtres, demande le focus carte.
 */
export function prepareMapNavigationForEvent(event: SeismicEventUI): void {
  const enriched = enrichSeismicEvent(event)
  const store = useSeismicStore.getState()

  const hasEvent = store.events.some((e) => e.id === enriched.id)
  store.setEvents(hasEvent ? store.events : [enriched, ...store.events])
  store.setSelectedEvent(enriched)

  const eventTime = new Date(enriched.eventTime).getTime()
  const magMin = Math.max(0, Math.min(2, enriched.magnitude - 0.5))

  store.setFilters({
    magnitude: { min: magMin, max: 10 },
    dateRange: {
      start: new Date(Math.min(eventTime - 7 * 24 * 60 * 60 * 1000, Date.now() - 30 * 24 * 60 * 60 * 1000)),
      end: new Date(),
    },
  })

  setSeismicMapViewportExpanded(isEventOutsideHaitiMap(enriched))
  setSeismicMapFocusEventId(enriched.id)
  if (typeof store.setDataHydration === 'function') {
    store.setDataHydration(null)
  } else {
    useSeismicStore.setState({ dataHydration: null })
  }
}

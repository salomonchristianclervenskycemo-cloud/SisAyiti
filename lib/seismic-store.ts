import { create } from 'zustand'
import type { MapHoverEvent } from './map-hover-types'
import {
  DEFAULT_FILTERS,
  DEFAULT_LAYERS,
  type LayerVisibility,
  type MapFilters,
  type MapStyle,
  type SeismicEventUI,
  type SeismicStats,
} from './seismic-types'
import type { SeismicDataHydration } from './seismic-hydration'

interface SeismicStore {
  events: SeismicEventUI[]
  stats: SeismicStats | null
  selectedEvent: SeismicEventUI | null
  hoveredMapEvent: MapHoverEvent | null
  filters: MapFilters
  layers: LayerVisibility
  mapStyle: MapStyle
  isLoading: boolean
  lastSync: string | null
  liveConnected: boolean
  fetchDays: number
  dataSource: string | null
  liveEnabled: boolean
  /** Dernière hydratation store (surveillance ou carte) — évite double fetch */
  dataHydration: SeismicDataHydration | null
  /** Focus carte après « Voir sur la carte » (id événement) */
  mapFocusEventId: string | null
  /** Vue élargie hors Haïti (séisme global depuis Actualités) */
  mapViewportExpanded: boolean
  setEvents: (events: SeismicEventUI[]) => void
  setStats: (stats: SeismicStats | null) => void
  setSelectedEvent: (event: SeismicEventUI | null) => void
  setHoveredMapEvent: (event: MapHoverEvent | null) => void
  setFilters: (filters: Partial<MapFilters>) => void
  setLayers: (layers: Partial<LayerVisibility>) => void
  setMapStyle: (style: MapStyle) => void
  setLoading: (loading: boolean) => void
  setLastSync: (iso: string | null) => void
  setLiveConnected: (connected: boolean) => void
  setFetchDays: (days: number) => void
  setDataSource: (source: string | null) => void
  setLiveEnabled: (enabled: boolean) => void
  setDataHydration: (hydration: SeismicDataHydration | null) => void
  setMapFocusEventId: (mapFocusEventId: string | null) => void
  setMapViewportExpanded: (mapViewportExpanded: boolean) => void
  prependEvent: (event: SeismicEventUI) => void
}

export const useSeismicStore = create<SeismicStore>((set) => ({
  events: [],
  stats: null,
  selectedEvent: null,
  hoveredMapEvent: null,
  filters: {
    magnitude: { ...DEFAULT_FILTERS.magnitude },
    depth: { ...DEFAULT_FILTERS.depth },
    dateRange: {
      start: new Date(DEFAULT_FILTERS.dateRange.start),
      end: new Date(DEFAULT_FILTERS.dateRange.end),
    },
    riskLevel: [...DEFAULT_FILTERS.riskLevel],
    sources: [...DEFAULT_FILTERS.sources],
  },
  layers: { ...DEFAULT_LAYERS },
  mapStyle: 'satellite',
  isLoading: true,
  lastSync: null,
  liveConnected: false,
  fetchDays: 7,
  dataSource: null,
  liveEnabled: true,
  dataHydration: null,
  mapFocusEventId: null,
  mapViewportExpanded: false,
  setEvents: (events) => set({ events }),
  setStats: (stats) => set({ stats }),
  setSelectedEvent: (selectedEvent) => set({ selectedEvent }),
  setHoveredMapEvent: (hoveredMapEvent) => set({ hoveredMapEvent }),
  setFilters: (partial) =>
    set((s) => {
      const cur = s.filters ?? DEFAULT_FILTERS
      return {
        filters: {
          magnitude: partial.magnitude
            ? { ...(cur.magnitude ?? DEFAULT_FILTERS.magnitude), ...partial.magnitude }
            : cur.magnitude ?? DEFAULT_FILTERS.magnitude,
          depth: partial.depth
            ? { ...(cur.depth ?? DEFAULT_FILTERS.depth), ...partial.depth }
            : cur.depth ?? DEFAULT_FILTERS.depth,
          dateRange: partial.dateRange
            ? { ...(cur.dateRange ?? DEFAULT_FILTERS.dateRange), ...partial.dateRange }
            : cur.dateRange ?? DEFAULT_FILTERS.dateRange,
          riskLevel: partial.riskLevel ?? cur.riskLevel ?? DEFAULT_FILTERS.riskLevel,
          sources: partial.sources ?? cur.sources ?? DEFAULT_FILTERS.sources,
        },
      }
    }),
  setLayers: (partial) =>
    set((s) => ({
      layers: { ...(s.layers ?? DEFAULT_LAYERS), ...partial },
    })),
  setMapStyle: (mapStyle) => set({ mapStyle }),
  setLoading: (isLoading) => set({ isLoading }),
  setLastSync: (lastSync) => set({ lastSync }),
  setLiveConnected: (liveConnected) => set({ liveConnected }),
  setFetchDays: (fetchDays) => set({ fetchDays }),
  setDataSource: (dataSource) => set({ dataSource }),
  setLiveEnabled: (liveEnabled) => set({ liveEnabled }),
  setDataHydration: (dataHydration) => set({ dataHydration }),
  setMapFocusEventId: (mapFocusEventId) => set({ mapFocusEventId }),
  setMapViewportExpanded: (mapViewportExpanded) => set({ mapViewportExpanded }),
  prependEvent: (event) =>
    set((s) => ({
      events: [event, ...s.events.filter((e) => e.id !== event.id)].slice(0, 1000),
    })),
}))

/** Mise à jour impérative — évite les sélecteurs Zustand undefined après HMR */
export function setSeismicMapViewportExpanded(expanded: boolean) {
  useSeismicStore.setState({ mapViewportExpanded: expanded })
}

export function setSeismicMapFocusEventId(mapFocusEventId: string | null) {
  useSeismicStore.setState({ mapFocusEventId })
}

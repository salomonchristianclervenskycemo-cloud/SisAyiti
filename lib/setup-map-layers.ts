import maplibregl from 'maplibre-gl'
import type { MapLayerMouseEvent } from 'maplibre-gl'
import type { FeatureCollection } from 'geojson'
import {
  earthquakeCorePaint,
  earthquakeHaloPaint,
  earthquakeMagLabelLayout,
  earthquakeMagLabelPaint,
  earthquakePlaceLabelLayout,
  earthquakePlaceLabelPaint,
  earthquakePulseBaseRadius,
  earthquakeRingPaint,
} from './seismic-map-style'
import { resolvePlaceLabel } from './haiti-region-resolver'
import type { MapHoverEvent } from './map-hover-types'
import { normalizeDepthKm } from './seismic-geo'
import type { SeismicEventUI } from './seismic-types'
import { capEventsForMap } from './map-event-cap'
import { MAP_FONT_BOLD } from './map-glyphs'
import { runWhenMapReady } from './map-ready'
import { FAULT_LAYER_IDS, FAULT_LINES_GEOJSON, FAULT_PALETTE } from './haiti-fault-geo'

/* ------------------------------------------------------------------ */
/*  GeoJSON                                                             */
/* ------------------------------------------------------------------ */

export function eventsToGeoJSON(events: SeismicEventUI[]): FeatureCollection {
  if (!Array.isArray(events)) return { type: 'FeatureCollection', features: [] }
  return {
    type: 'FeatureCollection',
    features: events
      .filter(
        (e) =>
          e != null &&
          Number.isFinite(e.latitude) &&
          Number.isFinite(e.longitude) &&
          Number.isFinite(e.magnitude)
      )
      .map((e) => ({
        type: 'Feature' as const,
        id: e.id,
        properties: {
          id: e.id,
          magnitude: Number(e.magnitude) || 0,
          risk: e.risk ?? 'low',
          depth: normalizeDepthKm(e.depth),
          region: e.region ?? '',
          placeLabel: (() => {
            try {
              const label = resolvePlaceLabel(e.latitude, e.longitude, e.region)
              const trimmed = typeof label === 'string' ? label.trim() : ''
              if (trimmed.length > 0) return trimmed
            } catch {
              /* fallback below */
            }
            const region = (e.region ?? '').trim()
            return region.length > 0 ? region : 'Ayiti'
          })(),
          source: e.source ?? 'USGS',
          eventTime: e.eventTime ?? new Date().toISOString(),
          latitude: e.latitude,
          longitude: e.longitude,
          historical: e.id.startsWith('historical-'),
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [e.longitude, e.latitude],
        },
      })),
  }
}

/* ------------------------------------------------------------------ */
/*  Helpers d'ajout de couches / sources                               */
/* ------------------------------------------------------------------ */

function addSourceIfMissing(
  map: maplibregl.Map,
  id: string,
  source: maplibregl.SourceSpecification
) {
  if (!map.getSource(id)) map.addSource(id, source)
}

function addLayerIfMissing(map: maplibregl.Map, layer: maplibregl.AddLayerObject) {
  if (map.getLayer(layer.id)) return
  const safe = { ...layer } as Record<string, unknown>
  if (safe.layout == null) delete safe.layout
  if (safe.paint == null) delete safe.paint
  try {
    map.addLayer(safe as maplibregl.AddLayerObject)
  } catch (err) {
    console.error(`[map] Failed to add layer "${layer.id}":`, err)
  }
}

/** Recrée les couches texte pour appliquer un layout corrigé (évite état HMR obsolète). */
function replaceSymbolLayer(map: maplibregl.Map, layer: maplibregl.AddLayerObject) {
  try {
    if (map.getLayer(layer.id)) map.removeLayer(layer.id)
  } catch {
    /* ok */
  }
  addLayerIfMissing(map, layer)
}

function removeLayersAndSources(map: maplibregl.Map) {
  const layerIds = [
    'earthquake-place-labels', 'earthquake-mag-labels', 'earthquakes-core',
    'earthquakes-ring', 'earthquakes-halo', 'earthquake-pulse',
    'cluster-count', 'clusters', 'earthquake-heat',
    'liquefaction-labels', 'liquefaction-circles',
    ...FAULT_LAYER_IDS,
    'risk-zones-outline', 'risk-zones-fill',
  ]
  for (const id of layerIds) {
    try { if (map.getLayer(id)) map.removeLayer(id) } catch { /* ok */ }
  }
  const sourceIds = ['earthquakes', 'fault-lines', 'liquefaction', 'risk-zones']
  for (const id of sourceIds) {
    try { if (map.getSource(id)) map.removeSource(id) } catch { /* ok */ }
  }
}

/* ------------------------------------------------------------------ */
/*  Options                                                             */
/* ------------------------------------------------------------------ */

export type SetupMapLayersOptions = {
  initialEvents?: SeismicEventUI[]
  onSelectEvent?: (id: string, coordinates: [number, number]) => void
  onHoverEvent?: (event: MapHoverEvent | null) => void
  isStyleChange?: boolean
}

/* ------------------------------------------------------------------ */
/*  Animation de pulsation                                             */
/* ------------------------------------------------------------------ */

let pulsePhase = 0
let setupGeneration = 0

export function updateEarthquakeData(map: maplibregl.Map, events: SeismicEventUI[]) {
  const src = map.getSource('earthquakes') as maplibregl.GeoJSONSource | undefined
  if (!src) return
  try {
    src.setData(eventsToGeoJSON(capEventsForMap(events)))
  } catch { /* ignore */ }
}

export function startPulseAnimation(map: maplibregl.Map): () => void {
  let frame = 0
  let active = true

  const tick = () => {
    if (!active) return
    try {
      if (!map.getStyle() || !map.getLayer('earthquake-pulse')) {
        frame = requestAnimationFrame(tick)
        return
      }
      pulsePhase += 0.05
      const scale = 1 + 0.3 * Math.sin(pulsePhase)
      const expr = [
        'interpolate', ['linear'], ['zoom'],
        1, ['*', ['coalesce', ['get', 'magnitude'], 2], 1.5 * scale],
        8, ['*', ['coalesce', ['get', 'magnitude'], 2], 5 * scale]
      ] as maplibregl.ExpressionSpecification
      map.setPaintProperty('earthquake-pulse', 'circle-radius', expr)
    } catch {
      active = false
      return
    }
    frame = requestAnimationFrame(tick)
  }

  frame = requestAnimationFrame(tick)
  return () => {
    active = false
    cancelAnimationFrame(frame)
  }
}

/* ------------------------------------------------------------------ */
/*  Feature states                                                      */
/* ------------------------------------------------------------------ */

function clearFeatureStates(map: maplibregl.Map, key: string) {
  try {
    // Supprime TOUS les états de la source d'un coup.
    // Cela évite un bug connu de MapLibre GL JS (TypeError dans coalesceChanges)
    // lorsqu'on supprime des états spécifiques sur de nombreux points.
    map.removeFeatureState({ source: 'earthquakes' })
  } catch { /* ignore */ }
}

function setFeatureState(
  map: maplibregl.Map,
  featureId: string | number | undefined,
  state: Record<string, boolean>
) {
  if (featureId == null) return
  try {
    map.setFeatureState({ source: 'earthquakes', id: featureId }, state)
  } catch { /* feature may not exist */ }
}

/* ------------------------------------------------------------------ */
/*  Interactions (souris + clic)                                       */
/* ------------------------------------------------------------------ */

// Map persistante pour les handlers afin de pouvoir les off() correctement
const mapHandlers = new WeakMap<
  maplibregl.Map,
  { cleanup: () => void }
>()

function attachInteractions(
  map: maplibregl.Map,
  onSelectEvent?: (id: string, coordinates: [number, number]) => void,
  onHoverEvent?: (event: MapHoverEvent | null) => void
) {
  // Nettoyer les anciens handlers si existants
  const existing = mapHandlers.get(map)
  if (existing) existing.cleanup()

  let hoveredId: string | number | undefined

  const EQ_LAYERS = [
    'earthquakes-ring',
    'earthquakes-core',
    'earthquakes-halo',
    'earthquake-pulse',
    'earthquake-mag-labels',
    'earthquake-place-labels',
  ]

  const onEnter = (e: MapLayerMouseEvent) => {
    map.getCanvas().style.cursor = 'pointer'
    const f = e.features?.[0]
    if (!f?.properties) return
    const id = f.id ?? f.properties.id
    if (hoveredId !== undefined) setFeatureState(map, hoveredId, { hover: false })
    hoveredId = id
    setFeatureState(map, id, { hover: true })

    if (!f.geometry || f.geometry.type !== 'Point') return
    const coords = f.geometry.coordinates as [number, number]

    onHoverEvent?.({
      id: String(f.properties?.id ?? f.id ?? ''),
      magnitude: Number(f.properties.magnitude ?? 0),
      depth: Number(f.properties.depth ?? 0),
      region: String(f.properties.placeLabel ?? f.properties.region ?? 'Haïti'),
      source: String(f.properties.source ?? ''),
      eventTime: String(f.properties.eventTime ?? new Date().toISOString()),
      latitude: Number(f.properties.latitude ?? coords[1]),
      longitude: Number(f.properties.longitude ?? coords[0]),
      historical: f.properties.historical === true,
      lngLat: coords,
    })
  }

  const onLeave = () => {
    map.getCanvas().style.cursor = ''
    if (hoveredId !== undefined) {
      setFeatureState(map, hoveredId, { hover: false })
      hoveredId = undefined
    }
    onHoverEvent?.(null)
  }

  const onClickEq = (e: MapLayerMouseEvent) => {
    const f = e.features?.[0]
    if (!f?.geometry || f.geometry.type !== 'Point') return
    const id = String(f.properties?.id ?? f.id ?? '')
    if (!id || !onSelectEvent) return

    clearFeatureStates(map, 'selected')
    setFeatureState(map, f.id ?? id, { selected: true })
    onSelectEvent(id, f.geometry.coordinates as [number, number])
    onHoverEvent?.(null)
  }

  const onClusterEnter = () => { map.getCanvas().style.cursor = 'pointer' }
  const onClusterLeave = () => { map.getCanvas().style.cursor = '' }

  const onClickCluster = async (e: MapLayerMouseEvent) => {
    const f = e.features?.[0]
    if (!f?.properties?.cluster_id) return
    const source = map.getSource('earthquakes') as maplibregl.GeoJSONSource
    try {
      const zoom = await source.getClusterExpansionZoom(
        f.properties.cluster_id as number
      )
      if (f.geometry?.type === 'Point') {
        map.easeTo({
          center: f.geometry.coordinates as [number, number],
          zoom: zoom + 0.5,
          duration: 600,
        })
      }
    } catch { /* ignore */ }
  }

  // Enregistrer les handlers
  for (const layerId of EQ_LAYERS) {
    map.on('mouseenter', layerId, onEnter)
    map.on('mouseleave', layerId, onLeave)
    map.on('click', layerId, onClickEq)
  }
  map.on('click', 'clusters', onClickCluster)
  map.on('mouseenter', 'clusters', onClusterEnter)
  map.on('mouseleave', 'clusters', onClusterLeave)

  // Cleanup function
  const cleanup = () => {
    for (const layerId of EQ_LAYERS) {
      map.off('mouseenter', layerId, onEnter)
      map.off('mouseleave', layerId, onLeave)
      map.off('click', layerId, onClickEq)
    }
    map.off('click', 'clusters', onClickCluster)
    map.off('mouseenter', 'clusters', onClusterEnter)
    map.off('mouseleave', 'clusters', onClusterLeave)
    onHoverEvent?.(null)
  }

  mapHandlers.set(map, { cleanup })
}

/* ------------------------------------------------------------------ */
/*  Couches séismes                                                    */
/* ------------------------------------------------------------------ */

function ensureEarthquakeLayers(map: maplibregl.Map, events: SeismicEventUI[]) {
  const eqData = eventsToGeoJSON(events)

  if (!map.getSource('earthquakes')) {
    map.addSource('earthquakes', {
      type: 'geojson',
      data: eqData,
      promoteId: 'id',
      cluster: true,
      clusterMaxZoom: 7,
      clusterRadius: 50,
    })
  } else {
    try {
      ;(map.getSource('earthquakes') as maplibregl.GeoJSONSource).setData(eqData)
    } catch { /* ignore */ }
  }

  // Heatmap (désactivée par défaut, activée via toggle)
  addLayerIfMissing(map, {
    id: 'earthquake-heat',
    type: 'heatmap',
    source: 'earthquakes',
    maxzoom: 12,
    paint: {
      'heatmap-weight': [
        'interpolate', ['linear'],
        ['coalesce', ['get', 'magnitude'], 2],
        2, 0, 8, 1,
      ],
      'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 5, 0.6, 9, 1.2],
      'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 5, 20, 9, 40],
      'heatmap-opacity': 0.75,
      'heatmap-color': [
        'interpolate', ['linear'], ['heatmap-density'],
        0, 'rgba(0,0,0,0)',
        0.2, 'rgba(0,162,255,0.3)',
        0.5, 'rgba(255,160,0,0.6)',
        0.8, 'rgba(255,80,0,0.85)',
        1, 'rgba(255,0,0,1)',
      ],
    },
    layout: { visibility: 'none' },
  })

  // Clusters
  addLayerIfMissing(map, {
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': [
        'step', ['get', 'point_count'],
        '#3b82f6', 10,
        '#eab308', 50,
        '#f97316',
      ],
      'circle-radius': ['step', ['get', 'point_count'], 18, 10, 24, 50, 30],
      'circle-stroke-width': 2,
      'circle-stroke-color': 'rgba(255,255,255,0.5)',
      'circle-opacity': 0.8,
    },
  })

  // Pas de couche texte sur clusters (évite crash glyphes MapLibre sur chaînes vides)

  // Pulse d'animation (M >= 0 pour tout animer comme sur LiveWorldMap)
  addLayerIfMissing(map, {
    id: 'earthquake-pulse',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-radius': [
        'interpolate', ['linear'], ['zoom'],
        1, ['*', ['coalesce', ['get', 'magnitude'], 2], 1.5],
        8, ['*', ['coalesce', ['get', 'magnitude'], 2], 5]
      ],
      'circle-color': [
        'match',
        ['get', 'risk'],
        'critical', '#ef4444',
        'high', '#f97316',
        'medium', '#eab308',
        'low', '#3b82f6',
        '#3b82f6'
      ],
      'circle-opacity': 0.3,
      'circle-stroke-width': 1,
      'circle-stroke-color': [
        'match',
        ['get', 'risk'],
        'critical', '#ef4444',
        'high', '#f97316',
        'medium', '#eab308',
        'low', '#3b82f6',
        '#3b82f6'
      ],
      'circle-stroke-opacity': 0.5,
    },
  })

  // Halo
  addLayerIfMissing(map, {
    id: 'earthquakes-halo',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: earthquakeHaloPaint,
  })

  // Anneau principal
  addLayerIfMissing(map, {
    id: 'earthquakes-ring',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: earthquakeRingPaint,
  })

  // Point central
  addLayerIfMissing(map, {
    id: 'earthquakes-core',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: earthquakeCorePaint,
  })

  // Labels texte : après chargement des glyphes (évite _numberToString.length 0)
  runWhenMapReady(map, () => {
    replaceSymbolLayer(map, {
      id: 'earthquake-mag-labels',
      type: 'symbol',
      source: 'earthquakes',
      minzoom: 5,
      filter: ['all', ['!', ['has', 'point_count']], ['>=', ['coalesce', ['get', 'magnitude'], 0], 3.5]],
      layout: earthquakeMagLabelLayout,
      paint: earthquakeMagLabelPaint,
    })

    replaceSymbolLayer(map, {
      id: 'earthquake-place-labels',
      type: 'symbol',
      source: 'earthquakes',
      minzoom: 7,
      filter: [
        'all',
        ['!', ['has', 'point_count']],
        ['>=', ['coalesce', ['get', 'magnitude'], 0], 4.5],
        ['>', ['length', ['coalesce', ['to-string', ['get', 'placeLabel']], '']], 0],
      ],
      layout: earthquakePlaceLabelLayout,
      paint: earthquakePlaceLabelPaint,
    })
  })
}

/* ------------------------------------------------------------------ */
/*  Couches statiques (failles, liquéfaction, zones de risque)        */
/* ------------------------------------------------------------------ */

function removeFaultLayers(map: maplibregl.Map) {
  for (const id of FAULT_LAYER_IDS) {
    try {
      if (map.getLayer(id)) map.removeLayer(id)
    } catch {
      /* ok */
    }
  }
}

function upsertFaultSource(map: maplibregl.Map) {
  const spec = {
    type: 'geojson' as const,
    data: FAULT_LINES_GEOJSON,
    lineMetrics: true,
  }
  const existing = map.getSource('fault-lines') as maplibregl.GeoJSONSource | undefined
  if (existing?.setData) {
    existing.setData(FAULT_LINES_GEOJSON)
  } else {
    try {
      if (map.getSource('fault-lines')) map.removeSource('fault-lines')
    } catch {
      /* ok */
    }
    addSourceIfMissing(map, 'fault-lines', spec)
  }
}

function addFaultLayers(map: maplibregl.Map) {
  const { epgf, sept } = FAULT_PALETTE

  const addSept = (suffix: string, paint: maplibregl.LineLayerSpecification['paint'], layout?: maplibregl.LineLayerSpecification['layout']) => {
    addLayerIfMissing(map, {
      id: `fault-septentrionale-${suffix}`,
      type: 'line',
      source: 'fault-lines',
      filter: ['==', ['get', 'id'], 'septentrionale'],
      paint,
      layout,
    })
  }

  const addEnriq = (suffix: string, paint: maplibregl.LineLayerSpecification['paint'], layout?: maplibregl.LineLayerSpecification['layout']) => {
    addLayerIfMissing(map, {
      id: `fault-enriquillo-${suffix}`,
      type: 'line',
      source: 'fault-lines',
      filter: ['==', ['get', 'id'], 'enriquillo'],
      paint,
      layout,
    })
  }

  // Septentrionale — bleu, trait discontinu
  addSept('corridor', {
    'line-color': sept.glow,
    'line-width': ['interpolate', ['linear'], ['zoom'], 6, 14, 10, 22, 14, 28],
    'line-opacity': 0.14,
    'line-blur': 8,
  })
  addSept('glow', {
    'line-color': sept.glow,
    'line-width': ['interpolate', ['linear'], ['zoom'], 6, 8, 10, 12, 14, 16],
    'line-opacity': 0.28,
    'line-blur': 4,
  })
  addSept('glow-mid', {
    'line-color': sept.core,
    'line-width': ['interpolate', ['linear'], ['zoom'], 6, 4, 10, 6, 14, 8],
    'line-opacity': 0.45,
    'line-blur': 1.5,
  })
  addSept('core', {
    'line-color': sept.core,
    'line-width': ['interpolate', ['linear'], ['zoom'], 6, 2, 10, 2.8, 14, 3.5],
    'line-opacity': 0.95,
    'line-dasharray': [2, 1.5, 6, 1.5],
  })
  addSept('highlight', {
    'line-color': '#ffffff',
    'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.6, 10, 0.9, 14, 1.1],
    'line-opacity': 0.42,
  })

  // Enriquillo-Plantain Garden — rouge, trait continu lumineux
  addEnriq('corridor', {
    'line-color': epgf.glow,
    'line-width': ['interpolate', ['linear'], ['zoom'], 6, 16, 10, 24, 14, 32],
    'line-opacity': 0.16,
    'line-blur': 10,
  })
  addEnriq('glow', {
    'line-color': epgf.glow,
    'line-width': ['interpolate', ['linear'], ['zoom'], 6, 10, 10, 14, 14, 18],
    'line-opacity': 0.32,
    'line-blur': 5,
  })
  addEnriq('glow-mid', {
    'line-color': epgf.core,
    'line-width': ['interpolate', ['linear'], ['zoom'], 6, 5, 10, 7, 14, 9],
    'line-opacity': 0.5,
    'line-blur': 2,
  })
  addEnriq('core', {
    'line-gradient': [
      'interpolate',
      ['linear'],
      ['line-progress'],
      0,
      '#fb923c',
      0.35,
      epgf.core,
      0.7,
      epgf.glow,
      1,
      '#dc2626',
    ],
    'line-width': ['interpolate', ['linear'], ['zoom'], 6, 2.2, 10, 3.2, 14, 4],
    'line-opacity': 1,
  })
  addEnriq('highlight', {
    'line-color': '#ffffff',
    'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.7, 10, 1, 14, 1.2],
    'line-opacity': 0.5,
  })

  // Labels
  const labelLayout: maplibregl.SymbolLayerSpecification['layout'] = {
    'symbol-placement': 'line-center',
    'text-field': ['get', 'shortName'],
    'text-font': [...MAP_FONT_BOLD],
    'text-size': ['interpolate', ['linear'], ['zoom'], 7, 10, 11, 13, 14, 15],
    'text-letter-spacing': 0.08,
    'text-rotation-alignment': 'map',
    'text-pitch-alignment': 'viewport',
  }

  addLayerIfMissing(map, {
    id: 'fault-septentrionale-label',
    type: 'symbol',
    source: 'fault-lines',
    minzoom: 7,
    filter: ['==', ['get', 'id'], 'septentrionale'],
    layout: labelLayout,
    paint: {
      'text-color': sept.label,
      'text-halo-color': 'rgba(15,23,42,0.92)',
      'text-halo-width': 2,
      'text-halo-blur': 0.5,
    },
  })

  addLayerIfMissing(map, {
    id: 'fault-enriquillo-label',
    type: 'symbol',
    source: 'fault-lines',
    minzoom: 7,
    filter: ['==', ['get', 'id'], 'enriquillo'],
    layout: labelLayout,
    paint: {
      'text-color': epgf.label,
      'text-halo-color': 'rgba(15,23,42,0.92)',
      'text-halo-width': 2,
      'text-halo-blur': 0.5,
    },
  })
}

async function ensureStaticLayers(map: maplibregl.Map, gen: number): Promise<void> {
  try {
    const res = await fetch('/api/seismic/layers')
    if (!res.ok) return
    const data = await res.json()
    if (gen !== setupGeneration) return
    if (!data?.layers) return

    removeFaultLayers(map)
    upsertFaultSource(map)
    addFaultLayers(map)

    addSourceIfMissing(map, 'liquefaction', { type: 'geojson', data: data.layers.liquefaction })
    addSourceIfMissing(map, 'risk-zones', { type: 'geojson', data: data.layers.riskZones })

    // Zones de risque
    addLayerIfMissing(map, {
      id: 'risk-zones-fill',
      type: 'fill',
      source: 'risk-zones',
      paint: {
        'fill-color': ['match', ['get', 'level'], 'critical', '#ff3333', 'high', '#ff9500', '#ff3333'],
        'fill-opacity': 0.08,
      },
      layout: { visibility: 'none' },
    })
    addLayerIfMissing(map, {
      id: 'risk-zones-outline',
      type: 'line',
      source: 'risk-zones',
      paint: {
        'line-color': '#ff4444',
        'line-width': 1.5,
        'line-opacity': 0.5,
        'line-dasharray': [4, 3],
      },
      layout: { visibility: 'none' },
    })

    // Liquéfaction
    addLayerIfMissing(map, {
      id: 'liquefaction-circles',
      type: 'circle',
      source: 'liquefaction',
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 18, 10, 32, 12, 42],
        'circle-color': '#ff2255',
        'circle-opacity': 0.12,
        'circle-stroke-color': 'rgba(255,50,100,0.7)',
        'circle-stroke-width': 2.5,
        'circle-blur': 0.4,
      },
    })
    runWhenMapReady(map, () => {
      replaceSymbolLayer(map, {
        id: 'liquefaction-labels',
        type: 'symbol',
        source: 'liquefaction',
        minzoom: 8,
        filter: ['all', ['has', 'name'], ['>', ['length', ['coalesce', ['to-string', ['get', 'name']], '']], 0]],
        layout: {
          'text-field': ['coalesce', ['get', 'name'], 'Ayiti'],
          'text-size': 11,
          'text-font': [...MAP_FONT_BOLD],
          'text-offset': [0, 1.6],
          'text-anchor': 'top',
          'text-optional': true,
        },
        paint: {
          'text-color': 'rgba(255,200,200,0.95)',
          'text-halo-color': 'rgba(0,0,0,0.85)',
          'text-halo-width': 1.5,
        },
      })
    })
  } catch (err) {
    console.warn('[map] Static layers unavailable:', err)
  }
}

/* ------------------------------------------------------------------ */
/*  Point d'entrée principal                                           */
/* ------------------------------------------------------------------ */

export async function setupMapLayers(
  map: maplibregl.Map,
  options: SetupMapLayersOptions = {}
): Promise<void> {
  const { initialEvents = [], onSelectEvent, onHoverEvent, isStyleChange = false } = options
  const gen = ++setupGeneration

  // Si changement de style, on rebuild tout proprement
  if (isStyleChange) {
    removeLayersAndSources(map)
  }

  ensureEarthquakeLayers(map, initialEvents)

  // Interactions : toujours recréées pour survivre aux changements de style
  attachInteractions(map, onSelectEvent, onHoverEvent)

  await ensureStaticLayers(map, gen)

  if (gen !== setupGeneration) return

  // 2e passe pour s'assurer que les couches séismes sont en bonne position
  ensureEarthquakeLayers(map, initialEvents)
}

/* ------------------------------------------------------------------ */
/*  Visibilité des couches                                             */
/* ------------------------------------------------------------------ */

export function applyLayerVisibility(
  map: maplibregl.Map,
  layers: {
    earthquakes?: boolean
    faults?: boolean
    liquefaction?: boolean
    riskZones?: boolean
    heatmap?: boolean
    clusters?: boolean
  } | null | undefined
) {
  if (!layers) return

  const vis = (id: string, on: boolean) => {
    if (map.getLayer(id)) {
      map.setLayoutProperty(id, 'visibility', on ? 'visible' : 'none')
    }
  }

  const eq = layers.earthquakes ?? true
  const cl = layers.clusters ?? true

  vis('earthquake-heat', layers.heatmap ?? false)
  vis('earthquake-pulse', eq)
  vis('earthquakes-halo', eq)
  vis('earthquakes-ring', eq)
  vis('earthquakes-core', eq)
  vis('earthquake-mag-labels', eq)
  vis('earthquake-place-labels', eq)
  vis('clusters', eq && cl)
  const faultsOn = layers.faults ?? true
  for (const id of FAULT_LAYER_IDS) {
    vis(id, faultsOn)
  }
  vis('liquefaction-circles', layers.liquefaction ?? true)
  vis('liquefaction-labels', layers.liquefaction ?? true)
  vis('risk-zones-fill', layers.riskZones ?? false)
  vis('risk-zones-outline', layers.riskZones ?? false)
}

export function highlightSelectedEvent(map: maplibregl.Map, eventId: string | null) {
  clearFeatureStates(map, 'selected')
  if (eventId) setFeatureState(map, eventId, { selected: true })
}

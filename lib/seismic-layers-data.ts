import type { FeatureCollection } from 'geojson'

export { FAULT_LINES_GEOJSON } from './haiti-fault-geo'

export const HAITI_BOUNDS: [number, number, number, number] = [-74.5, 17.5, -71.5, 20.5]

export const LIQUEFACTION_ZONES_GEOJSON: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Port-au-Prince', risk: 'TRÈS ÉLEVÉ' },
      geometry: {
        type: 'Point',
        coordinates: [-72.335, 18.5392],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Arcahaie', risk: 'ÉLEVÉ' },
      geometry: { type: 'Point', coordinates: [-72.4, 18.8] },
    },
    {
      type: 'Feature',
      properties: { name: 'Léogâne', risk: 'ÉLEVÉ' },
      geometry: { type: 'Point', coordinates: [-72.63, 18.51] },
    },
  ],
}

export const RISK_ZONES_GEOJSON: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { level: 'critical', name: 'Sud — Enriquillo' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.2, 18.0],
            [-71.8, 18.0],
            [-71.8, 18.8],
            [-74.2, 18.8],
            [-74.2, 18.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { level: 'high', name: 'Nord — Septentrionale' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.0, 19.4],
            [-71.6, 19.4],
            [-71.6, 20.1],
            [-74.0, 20.1],
            [-74.0, 19.4],
          ],
        ],
      },
    },
  ],
}

import { MAPLIBRE_GLYPHS_URL } from './map-glyphs'

const GLYPHS = MAPLIBRE_GLYPHS_URL

export const CARTO_DARK_STYLE = {
  version: 8 as const,
  glyphs: GLYPHS,
  sources: {
    carto: {
      type: 'raster' as const,
      // CartoDB dark tiles (CORS-open, pas d'API key requise)
      tiles: [
        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    },
  },
  layers: [
    {
      id: 'basemap',
      type: 'raster' as const,
      source: 'carto',
      paint: { 'raster-brightness-max': 0.95 },
    },
  ],
}

/** Style léger pour mini-cartes (glyphs requis pour cluster-count) */
export const CARTO_LIGHT_STYLE = {
  version: 8 as const,
  glyphs: GLYPHS,
  sources: {
    carto: {
      type: 'raster' as const,
      tiles: [
        'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    },
  },
  layers: [
    {
      id: 'basemap',
      type: 'raster' as const,
      source: 'carto',
    },
  ],
}

export const SATELLITE_STYLE = {
  version: 8 as const,
  glyphs: GLYPHS,
  sources: {
    satellite: {
      type: 'raster' as const,
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: 'Esri',
    },
  },
  layers: [
    {
      id: 'basemap',
      type: 'raster' as const,
      source: 'satellite',
    },
  ],
}

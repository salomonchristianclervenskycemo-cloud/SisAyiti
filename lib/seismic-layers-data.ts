import type { FeatureCollection } from 'geojson'

export const HAITI_BOUNDS: [number, number, number, number] = [-74.5, 17.5, -71.5, 20.5]

export const FAULT_LINES_GEOJSON: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Faille Enriquillo-Plantain Garden', id: 'enriquillo' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-74.5, 18.0],
          [-74.0, 18.2],
          [-73.5, 18.4],
          [-73.0, 18.5],
          [-72.5, 18.55],
          [-72.0, 18.6],
          [-71.5, 18.7],
          [-71.0, 18.8],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Faille Septentrionale', id: 'septentrionale' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-74.0, 19.8],
          [-73.5, 19.85],
          [-73.0, 19.9],
          [-72.5, 19.85],
          [-72.0, 19.8],
          [-71.5, 19.75],
        ],
      },
    },
  ],
}

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

const GLYPHS = 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf'

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

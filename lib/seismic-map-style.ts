import type maplibregl from 'maplibre-gl'

export const HAITI_CENTER: [number, number] = [-72.29, 18.97]
export const HAITI_BOUNDS_FIT: [[number, number], [number, number]] = [
  [-74.6, 17.4],
  [-71.2, 20.2],
]

export const RISK_COLORS = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#3b82f6',
} as const

const riskColorExpr: maplibregl.ExpressionSpecification = [
  'match',
  ['get', 'risk'],
  'critical', RISK_COLORS.critical,
  'high', RISK_COLORS.high,
  'medium', RISK_COLORS.medium,
  'low', RISK_COLORS.low,
  RISK_COLORS.low // fallback
]

/**
 * Taille par magnitude + zoom.
 * Pattern "zoom-and-data-dependent" documenté MapLibre :
 * interpolate(zoom) → step(magnitude) à chaque palier de zoom.
 */
const radiusExpr = (
  s5: number,
  s8: number,
  s11: number
): maplibregl.ExpressionSpecification => [
  'interpolate',
  ['linear'],
  ['zoom'],
  5,
  [
    'step',
    ['coalesce', ['get', 'magnitude'], 2],
    s5 * 0.4,
    3, s5 * 0.55,
    4, s5 * 0.7,
    5, s5,
    6, s5 * 1.3,
    7, s5 * 1.7,
    8, s5 * 2.1,
  ],
  8,
  [
    'step',
    ['coalesce', ['get', 'magnitude'], 2],
    s8 * 0.4,
    3, s8 * 0.55,
    4, s8 * 0.7,
    5, s8,
    6, s8 * 1.3,
    7, s8 * 1.7,
    8, s8 * 2.1,
  ],
  11,
  [
    'step',
    ['coalesce', ['get', 'magnitude'], 2],
    s11 * 0.4,
    3, s11 * 0.55,
    4, s11 * 0.7,
    5, s11,
    6, s11 * 1.3,
    7, s11 * 1.7,
    8, s11 * 2.1,
  ],
]

export const earthquakeHaloPaint: maplibregl.CircleLayerSpecification['paint'] = {
  'circle-radius': 0,
  'circle-color': 'transparent',
  'circle-opacity': 0,
}

export const earthquakeRingPaint: maplibregl.CircleLayerSpecification['paint'] = {
  'circle-radius': [
    'interpolate', ['linear'], ['zoom'],
    1, ['max', 2, ['/', ['get', 'magnitude'], 1.5]],
    8, ['max', 4, ['*', ['get', 'magnitude'], 1.2]]
  ],
  'circle-color': riskColorExpr,
  'circle-opacity': 0.9,
  'circle-stroke-width': 1,
  'circle-stroke-color': '#ffffff',
}

export const earthquakeCorePaint: maplibregl.CircleLayerSpecification['paint'] = {
  'circle-radius': 0,
  'circle-color': 'transparent',
  'circle-opacity': 0,
}

export const earthquakePulseBaseRadius: maplibregl.ExpressionSpecification = [
  'interpolate',
  ['linear'],
  ['zoom'],
  5,
  [
    'step',
    ['coalesce', ['get', 'magnitude'], 4],
    10,
    4, 12,
    5, 16,
    6, 22,
    7, 28,
    8, 36,
  ],
  8,
  [
    'step',
    ['coalesce', ['get', 'magnitude'], 4],
    14,
    4, 18,
    5, 24,
    6, 32,
    7, 42,
    8, 52,
  ],
  11,
  [
    'step',
    ['coalesce', ['get', 'magnitude'], 4],
    18,
    4, 24,
    5, 32,
    6, 44,
    7, 56,
    8, 70,
  ],
]

export const earthquakeMagLabelLayout: maplibregl.SymbolLayerSpecification['layout'] = {
  'text-field': [
    'case',
    ['all', ['has', 'magnitude'], ['!', ['has', 'point_count']]],
    ['concat', 'M', ['to-string', ['coalesce', ['get', 'magnitude'], 0]]],
    '',
  ],
  'text-size': [
    'interpolate',
    ['linear'],
    ['zoom'],
    5, 10,
    8, 12,
    10, 14,
  ],
  'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
  'text-anchor': 'center',
  'text-allow-overlap': true,
  'text-optional': true,
  'text-ignore-placement': false,
}

export const earthquakePlaceLabelLayout: maplibregl.SymbolLayerSpecification['layout'] = {
  'text-field': [
    'case',
    ['all', ['has', 'placeLabel'], ['!', ['has', 'point_count']]],
    ['get', 'placeLabel'],
    '',
  ],
  'text-size': ['interpolate', ['linear'], ['zoom'], 7, 9, 9, 10, 11, 11],
  'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
  'text-offset': [0, 1.6],
  'text-anchor': 'top',
  'text-max-width': 12,
  'text-allow-overlap': false,
  'text-optional': true,
}

export const earthquakeMagLabelPaint: maplibregl.SymbolLayerSpecification['paint'] = {
  'text-color': '#ffffff',
  'text-halo-color': 'rgba(0,0,0,0.85)',
  'text-halo-width': 2,
}

export const earthquakePlaceLabelPaint: maplibregl.SymbolLayerSpecification['paint'] = {
  'text-color': 'rgba(220, 240, 255, 0.95)',
  'text-halo-color': 'rgba(0,0,0,0.9)',
  'text-halo-width': 1.5,
}

export const RISK_LEVEL_KEYS = ['critical', 'high', 'medium', 'low'] as const

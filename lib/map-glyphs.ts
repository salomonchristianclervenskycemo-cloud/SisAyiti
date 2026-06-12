/**
 * Polices MapLibre — demotiles (fiable en local, CORS OK).
 * openmaptiles.org renvoie parfois des PBF invalides → crash _numberToString.
 */
export const MAPLIBRE_GLYPHS_URL =
  'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf'

/** Stacks servis par demotiles.maplibre.org (voir style.json officiel) */
export const MAP_FONT_BOLD = ['Open Sans Bold'] as const
export const MAP_FONT_REGULAR = ['Open Sans Regular'] as const

/** text-field cluster sans {point_count_abbreviated} (plus stable si glyphes lents) */
import type { ExpressionSpecification } from 'maplibre-gl'

export const CLUSTER_COUNT_TEXT_FIELD: ExpressionSpecification = [
  'to-string',
  ['get', 'point_count'],
]

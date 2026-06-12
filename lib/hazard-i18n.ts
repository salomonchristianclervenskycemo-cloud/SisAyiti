export type HazardTypeKey =
  | 'earthquake'
  | 'liquefaction'
  | 'flood'
  | 'hurricane'
  | 'landslide'
  | 'tsunami'

const HAZARD_KEY_MAP: Record<string, string> = {
  earthquake: 'multi.hazard.earthquake',
  liquefaction: 'multi.hazard.liquefaction',
  flood: 'multi.hazard.flood',
  hurricane: 'multi.hazard.hurricane',
  landslide: 'multi.hazard.landslide',
  tsunami: 'multi.hazard.tsunami',
}

export function hazardTranslationKey(type: string): string {
  return HAZARD_KEY_MAP[type] ?? 'multi.report.other'
}

export function formatHazardTags(
  keys: HazardTypeKey[],
  t: (key: string) => string
): string {
  return keys.map((k) => t(hazardTranslationKey(k))).join(' · ')
}

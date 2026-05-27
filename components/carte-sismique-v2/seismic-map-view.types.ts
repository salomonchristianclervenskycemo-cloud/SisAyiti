import type { Lang } from "@/shared/i18n"

/** Platform-agnostic contract for the seismic map module. */
export interface SeismicMapViewProps {
  lang: Lang
  className?: string
}

/** Web MapLibre implementation marker type. */
export type SeismicMapHandle = {
  /** Fit map to Haiti bounds */
  fitHaiti?: () => void
}

import type { Lang } from '@/lib/i18n'

export const commonStrings: Record<string, Record<Lang, string>> = {
  'mod.loading': {
    fr: 'Chargement du module…',
    kr: 'Chajman modil la…',
    en: 'Loading module…',
    es: 'Cargando módulo…',
  },
  'mod.empty.title': {
    fr: 'Aucune donnée à afficher',
    kr: 'Pa gen done pou afiche',
    en: 'Nothing to display',
    es: 'No hay datos que mostrar',
  },
  'mod.empty.hint': {
    fr: 'Réessayez dans un instant ou changez vos filtres.',
    kr: 'Eseye ankò oswa chanje fil yo.',
    en: 'Try again shortly or adjust your filters.',
    es: 'Inténtelo de nuevo o ajuste los filtros.',
  },
  'mod.empty.retry': {
    fr: 'Réessayer',
    kr: 'Eseye ankò',
    en: 'Retry',
    es: 'Reintentar',
  },
  'mod.error.title': {
    fr: 'Chargement impossible',
    kr: 'Pa kapab chaje',
    en: 'Unable to load',
    es: 'No se puede cargar',
  },
}

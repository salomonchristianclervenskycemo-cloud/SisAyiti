import type { Lang } from '@/lib/i18n'

export {
  preventionSections,
  PREVENTION_SECTION_KEYS,
  PHASE_SECTIONS,
  countAllPreventionItems,
  migratePreventionProgress,
  type PreventionPhase,
  type PreventionSectionKey,
  type PreventionItem,
} from './prevention-items'

/** @deprecated Utiliser preventionSections — conservé pour imports existants */
export { preventionSections as preventionItems } from './prevention-items'

export const preventionStrings: Record<string, Record<Lang, string>> = {
  'prev.subtitleLong': {
    fr: 'Avant, pendant et après le séisme : gestes Bese-Pwoteje-Kenbe et conseils pour les bâtiments non parasismiques — la majorité des logements en Haïti.',
    kr: 'Anvan, pandan ak apre tranblemanntè : jès Bese-Pwoteje-Kenbe ak konsèy pou bilding ki pa reziste — pifò kay nan Ayiti.',
    en: 'Before, during and after the earthquake: Drop-Cover-Hold On and advice for non-seismic buildings — most housing in Haiti.',
    es: 'Antes, durante y después del sismo: Agáchate-Cúbrete-Agárrate y consejos para edificios no antisísmicos — la mayoría en Haití.',
  },
  'prev.phase.avant': { fr: 'AVANT', kr: 'ANVAN', en: 'BEFORE', es: 'ANTES' },
  'prev.phase.pendant': { fr: 'PENDANT', kr: 'PANDAN', en: 'DURING', es: 'DURANTE' },
  'prev.phase.apres': { fr: 'APRÈS', kr: 'APRE', en: 'AFTER', es: 'DESPUÉS' },
  'prev.phase.avantDesc': {
    fr: 'Préparer le logement, le plan familial et identifier les risques du bâtiment.',
    kr: 'Prepare kay la, plan fanmi, idantifye risk bilding la.',
    en: 'Prepare home, family plan and identify building risks.',
    es: 'Preparar vivienda, plan familiar e identificar riesgos del edificio.',
  },
  'prev.phase.pendantDesc': {
    fr: 'Bese, Pwoteje, Kenbe — adaptations si le bâtiment n\'est pas parasismique.',
    kr: 'Bese, Pwoteje, Kenbe — adaptasyon si bilding pa reziste.',
    en: 'Drop, Cover, Hold — adaptations if building is not seismic-resistant.',
    es: 'Agáchate, Cúbrete, Agárrate — adaptaciones si el edificio no es antisísmico.',
  },
  'prev.phase.apresDesc': {
    fr: 'Sortie sécurisée, répliques, secours — ne pas réintégrer un bâtiment fragile.',
    kr: 'Soti an sekirite, replik, èd — pa rantre nan bilding fèb.',
    en: 'Safe exit, aftershocks, aid — do not re-enter fragile buildings.',
    es: 'Salida segura, réplicas, ayuda — no reingresar edificios frágiles.',
  },
  'prev.np.title': {
    fr: 'Bâtiment NON parasismique',
    kr: 'Bilding ki PA reziste tranblemanntè',
    en: 'NON seismic-resistant building',
    es: 'Edificio NO antisísmico',
  },
  'prev.np.subtitle': {
    fr: 'La plupart des maisons en Haïti (béton non armé, étages ajoutés) : ces conseils sont essentiels.',
    kr: 'Pifò kay Ayiti (beton san fè, etaj ajoute) : konsèy sa yo esansyèl.',
    en: 'Most homes in Haiti (unreinforced concrete, added floors): these tips are essential.',
    es: 'La mayoría de viviendas en Haití (concreto sin refuerzo): estos consejos son esenciales.',
  },
  'prev.section.general': { fr: 'Conseils généraux', kr: 'Konsèy jeneral', en: 'General advice', es: 'Consejos generales' },
  'prev.section.kit': { fr: 'Kit d\'urgence', kr: 'Kit ijan', en: 'Emergency kit', es: 'Kit de emergencia' },
  'prev.section.dangers': { fr: 'Dangers locaux', kr: 'Danje lokal', en: 'Local hazards', es: 'Peligros locales' },
  'prev.progress.hint': {
    fr: '{done} sur {total} élément(s) complété(s) · Cliquez pour valider',
    kr: '{done} sou {total} eleman konplete · Klike pou valide',
    en: '{done} of {total} item(s) completed · Click to check off',
    es: '{done} de {total} elemento(s) completado(s) · Haz clic para marcar',
  },
  'prev.reminder.title': { fr: 'Les 3 temps de la prévention', kr: '3 tan prevansyon', en: 'The 3 phases of prevention', es: 'Las 3 fases de prevención' },
  'prev.reminder.body': {
    fr: 'ANVAN : préparer (kit, plan, renforcement). PENDANT : Bese-Pwoteje-Kenbe. APRÈS : sécurité, répliques, ne pas réoccuper un bâtiment fissuré.',
    kr: 'ANVAN : prepare. PANDAN : Bese-Pwoteje-Kenbe. APRE : sekirite, replik, pa rantre bilding ki gen fisè.',
    en: 'BEFORE: prepare. DURING: Drop-Cover-Hold. AFTER: safety, aftershocks, do not re-enter cracked buildings.',
    es: 'ANTES: preparar. DURANTE: Agáchate-Cúbrete. DESPUÉS: seguridad, réplicas, no reingresar edificios agrietados.',
  },
}

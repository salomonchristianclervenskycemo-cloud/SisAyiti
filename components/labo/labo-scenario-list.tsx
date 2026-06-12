'use client'

import { useLang } from '@/lib/lang-context'
import { REAL_SCENARIOS, INTENSITY_COLORS, INTENSITY_LABELS, type LaboScenario } from '@/lib/labo-constants'
import { pickDesc } from '@/lib/i18n'
import { recordLaboScenario } from '@/lib/offline-education'

type Props = {
  onApply: (scenario: LaboScenario) => void
}

function pickLesson(s: LaboScenario, lang: string): string {
  if (lang === 'kr') return s.lessonKr
  if (lang === 'en') return s.lessonEn
  if (lang === 'es') return s.lessonEs
  return s.lessonFr
}

export function LaboScenarioList({ onApply }: Props) {
  const { lang, t } = useLang()

  const handleClick = (scenario: LaboScenario) => {
    recordLaboScenario(scenario.id)
    onApply(scenario)
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {REAL_SCENARIOS.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => handleClick(s)}
          className="text-left p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-200 group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="font-bold text-foreground text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {s.name}
            </div>
            <span
              className="text-xs font-black px-2 py-0.5 rounded-lg shrink-0"
              style={{ color: INTENSITY_COLORS[s.observed], backgroundColor: `${INTENSITY_COLORS[s.observed]}18` }}
            >
              {t('labo.scenario.observed')} {INTENSITY_LABELS[s.observed]}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{pickDesc(s, lang)}</p>
          <p className="text-xs text-orange-600/90 dark:text-orange-400/90 mt-2 leading-relaxed border-l-2 border-orange-500/40 pl-2">
            <span className="font-bold">{t('labo.scenario.lesson')}: </span>
            {pickLesson(s, lang)}
          </p>
        </button>
      ))}
    </div>
  )
}

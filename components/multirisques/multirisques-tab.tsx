'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'
import { RuralHazardPanel } from '@/components/multirisques/rural-hazard-panel'
import { NationalRiskCards } from '@/components/multirisques/national-risk-cards'
import { CommunityReportForm } from '@/components/multirisques/community-report-form'
import { CommunityReportsList } from '@/components/multirisques/community-reports-list'

type ViewMode = 'national' | 'local'

export function MultirisquesTab() {
  const { t } = useLang()
  const [view, setView] = useState<ViewMode>('national')

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">
          {t('multi.title')}
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">{t('multi.subtitle')}</p>
      </div>

      <div
        className="inline-flex p-1 rounded-xl bg-secondary/50 border border-border/50"
        role="tablist"
        aria-label={t('multi.filter.national')}
      >
        <button
          type="button"
          role="tab"
          aria-selected={view === 'national'}
          onClick={() => setView('national')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-bold transition-all',
            view === 'national'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {t('multi.filter.national')}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={view === 'local'}
          onClick={() => setView('local')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-bold transition-all',
            view === 'local'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {t('multi.filter.local')}
        </button>
      </div>

      {view === 'national' ? (
        <div key="national-view">
          <RuralHazardPanel />
          <NationalRiskCards />
        </div>
      ) : (
        <div className="space-y-6">
          <CommunityReportForm />
          <CommunityReportsList />
        </div>
      )}
    </div>
  )
}

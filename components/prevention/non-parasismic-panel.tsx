'use client'

import { useLang } from '@/lib/lang-context'
import { Building2, AlertTriangle } from 'lucide-react'

type Props = {
  children: React.ReactNode
}

export function NonParasismicPanel({ children }: Props) {
  const { t } = useLang()

  return (
    <div className="rounded-2xl border-2 border-orange-500/35 bg-gradient-to-br from-orange-500/10 via-background to-red-500/5 p-4 md:p-5 space-y-4">
      <div className="flex gap-3 items-start">
        <div className="w-11 h-11 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0">
          <Building2 size={22} className="text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h3 className="font-black text-foreground text-sm flex items-center gap-2">
            <AlertTriangle size={14} className="text-orange-500" />
            {t('prev.np.title')}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{t('prev.np.subtitle')}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

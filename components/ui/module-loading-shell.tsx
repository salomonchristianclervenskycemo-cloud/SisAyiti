'use client'

import { Loader2 } from 'lucide-react'
import { useLang } from '@/lib/lang-context'

export function ModuleLoadingShell({ label }: { label?: string }) {
  const { t } = useLang()
  const text = label ?? t('mod.loading')

  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-3 p-8 text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden />
      <p className="text-sm font-medium">{text}</p>
    </div>
  )
}

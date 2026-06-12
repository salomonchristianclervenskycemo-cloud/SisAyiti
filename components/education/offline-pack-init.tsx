'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang-context'
import {
  flushPendingDiagnostics,
  isEducationPackReady,
  markEducationPackReady,
} from '@/lib/offline-education'
import { registerCommunityReportsOnlineSync } from '@/lib/community-reports'

/** Initialise le pack éducatif local et tente d’envoyer les diagnostics en attente. */
export function OfflinePackInit() {
  const { t } = useLang()
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    markEducationPackReady()
    if (!isEducationPackReady()) return

    const run = () => {
      flushPendingDiagnostics().catch(() => {})
    }
    run()
    window.addEventListener('online', run)
    const cleanupReports = registerCommunityReportsOnlineSync()
    return () => {
      window.removeEventListener('online', run)
      cleanupReports()
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const seen = sessionStorage.getItem('sisayiti_edu_hint')
    if (!seen && isEducationPackReady()) {
      setShowHint(true)
      sessionStorage.setItem('sisayiti_edu_hint', '1')
      const tmr = window.setTimeout(() => setShowHint(false), 5000)
      return () => window.clearTimeout(tmr)
    }
  }, [])

  if (!showHint) return null

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40 px-3 py-2 rounded-lg bg-card border border-border shadow-lg text-xs text-muted-foreground">
      {t('crisis.pack.ready')}
    </div>
  )
}

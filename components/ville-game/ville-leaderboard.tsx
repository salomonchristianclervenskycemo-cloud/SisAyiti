'use client'

import { useEffect, useState } from 'react'
import { Trophy, Loader2 } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

type LeaderboardEntry = {
  rank: number
  playerName: string
  finalBudget: number
  buildingsConstructed: number
  resilientBuildings: number
  resilientPercentage: number
  difficulty: string
}

export function VilleLeaderboard() {
  const { t } = useLang()
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch('/api/scores/leaderboard?limit=8', { cache: 'no-store' })
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        if (!cancelled) {
          setEntries(Array.isArray(data.leaderboard) ? data.leaderboard : [])
          setError(false)
        }
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
      <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-3">
        <Trophy size={16} className="text-amber-500" />
        {t('ville.leaderboard.title')}
      </h3>

      {loading && (
        <p className="text-xs text-muted-foreground flex items-center gap-2 py-4 justify-center">
          <Loader2 size={14} className="animate-spin" />
          {t('ville.leaderboard.loading')}
        </p>
      )}

      {!loading && error && (
        <p className="text-xs text-muted-foreground text-center py-4">{t('ville.leaderboard.empty')}</p>
      )}

      {!loading && !error && entries.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-4">{t('ville.leaderboard.empty')}</p>
      )}

      {!loading && entries.length > 0 && (
        <ol className="space-y-2">
          {entries.map((e) => (
            <li
              key={`${e.rank}-${e.playerName}`}
              className="flex items-center justify-between gap-2 text-xs rounded-lg px-2 py-1.5 bg-secondary/30"
            >
              <span className="font-bold text-primary tabular-nums w-6">#{e.rank}</span>
              <span className="flex-1 truncate font-medium text-foreground">{e.playerName}</span>
              <span
                className={cn(
                  'tabular-nums font-semibold shrink-0',
                  e.finalBudget >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
                )}
              >
                {e.finalBudget.toLocaleString()} HTG
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

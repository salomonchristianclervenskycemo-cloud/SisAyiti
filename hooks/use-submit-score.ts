'use client'

import { useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/api-client'

export type SubmitScoreInput = {
  playerName?: string
  finalBudget: number
  buildingsConstructed: number
  resilientBuildings: number
  selectedSoil?: string
  difficulty?: string
  lang?: string
}

export function useSubmitScore() {
  const { data: session } = useSession()

  const submitScore = useCallback(
    async (input: SubmitScoreInput) => {
      const playerName = input.playerName ?? session?.user?.name ?? session?.user?.email ?? 'Anonymous'
      return api.postScore({
        ...input,
        playerName,
      })
    },
    [session]
  )

  return { submitScore, isAuthenticated: !!session?.user }
}

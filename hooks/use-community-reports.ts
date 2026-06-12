'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  COMMUNITY_REPORTS_CHANGED,
  fetchServerReports,
  listCommunityReports,
  mergeReports,
  registerCommunityReportsOnlineSync,
  syncCommunityReports,
  type CommunityReport,
} from '@/lib/community-reports'

export function useCommunityReports() {
  const [reports, setReports] = useState<CommunityReport[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const local = listCommunityReports()
    const server = await fetchServerReports()
    setReports(mergeReports(local, server))
    setLoading(false)
  }, [])

  useEffect(() => {
    let mounted = true
    const run = async () => {
      if (!mounted) return
      await refresh()
    }
    const timer = window.setTimeout(() => void run(), 0)
    const onChange = () => void refresh()
    window.addEventListener(COMMUNITY_REPORTS_CHANGED, onChange)
    const cleanupSync = registerCommunityReportsOnlineSync()
    return () => {
      mounted = false
      window.clearTimeout(timer)
      window.removeEventListener(COMMUNITY_REPORTS_CHANGED, onChange)
      cleanupSync()
    }
  }, [refresh])

  const flushPending = useCallback(async () => {
    const n = await syncCommunityReports()
    await refresh()
    return n
  }, [refresh])

  return { reports, loading, refresh, flushPending }
}

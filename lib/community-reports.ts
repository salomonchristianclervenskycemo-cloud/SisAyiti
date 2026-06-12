const REPORTS_KEY = 'sisayiti_community_reports'
export const COMMUNITY_REPORTS_CHANGED = 'sisayiti-community-reports-changed'

export type ReportSeverity = 'low' | 'moderate' | 'critical'

export type CommunityReport = {
  id: string
  hazardType: string
  description: string
  severity: ReportSeverity
  latitude: number | null
  longitude: number | null
  createdAt: string
  synced: boolean
  pendingSync: boolean
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function notifyChanged() {
  if (typeof window === 'undefined') return
  queueMicrotask(() => {
    window.dispatchEvent(new Event(COMMUNITY_REPORTS_CHANGED))
  })
}

function normalizeReport(raw: Partial<CommunityReport> & { hazardType: string }): CommunityReport {
  return {
    id: raw.id ?? `local-${Date.now()}`,
    hazardType: raw.hazardType,
    description: raw.description ?? '',
    severity: raw.severity ?? 'moderate',
    latitude: raw.latitude ?? null,
    longitude: raw.longitude ?? null,
    createdAt: raw.createdAt ?? new Date().toISOString(),
    synced: raw.synced ?? false,
    pendingSync: raw.pendingSync ?? !raw.synced,
  }
}

export function listCommunityReports(): CommunityReport[] {
  if (typeof window === 'undefined') return []
  const list = safeParse<CommunityReport[]>(localStorage.getItem(REPORTS_KEY), [])
  return list.map((r) => normalizeReport(r))
}

function saveLocalList(list: CommunityReport[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(REPORTS_KEY, JSON.stringify(list.slice(0, 50)))
  notifyChanged()
}

export function addCommunityReport(
  input: Omit<CommunityReport, 'id' | 'createdAt' | 'synced' | 'pendingSync'> & {
    pendingSync?: boolean
  }
): CommunityReport {
  const online = typeof navigator !== 'undefined' ? navigator.onLine : true
  const pendingSync = input.pendingSync ?? !online

  const report = normalizeReport({
    ...input,
    id: `local-${Date.now()}`,
    createdAt: new Date().toISOString(),
    synced: false,
    pendingSync,
  })

  const list = listCommunityReports()
  list.unshift(report)
  saveLocalList(list)
  return report
}

export function markReportsSynced(ids: string[]) {
  if (typeof window === 'undefined') return
  const set = new Set(ids)
  const next = listCommunityReports().map((r) =>
    set.has(r.id) ? { ...r, synced: true, pendingSync: false } : r
  )
  saveLocalList(next)
}

export async function fetchServerReports(): Promise<CommunityReport[]> {
  try {
    const res = await fetch('/api/community-reports', { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    const rows = Array.isArray(data.reports) ? data.reports : []
    return rows.map(
      (r: {
        id: string
        clientId?: string | null
        hazardType: string
        description?: string
        severity?: ReportSeverity
        latitude?: number | null
        longitude?: number | null
        createdAt?: string
      }) =>
        normalizeReport({
          hazardType: r.hazardType,
          description: r.description,
          severity: r.severity,
          latitude: r.latitude,
          longitude: r.longitude,
          createdAt: r.createdAt,
          id: r.clientId ?? r.id,
          synced: true,
          pendingSync: false,
        })
    )
  } catch {
    return []
  }
}

export async function postReportToServer(report: CommunityReport): Promise<boolean> {
  try {
    const res = await fetch('/api/community-reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: report.id,
        hazardType: report.hazardType,
        description: report.description,
        severity: report.severity,
        latitude: report.latitude,
        longitude: report.longitude,
      }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function syncCommunityReports(): Promise<number> {
  if (typeof window === 'undefined' || !navigator.onLine) return 0

  const pending = listCommunityReports().filter((r) => r.pendingSync && !r.synced)
  if (pending.length === 0) return 0

  try {
    const res = await fetch('/api/community-reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reports: pending.map((r) => ({
          clientId: r.id,
          hazardType: r.hazardType,
          description: r.description,
          severity: r.severity,
          latitude: r.latitude,
          longitude: r.longitude,
          createdAt: r.createdAt,
        })),
      }),
    })
    if (!res.ok) {
      for (const r of pending) {
        const ok = await postReportToServer(r)
        if (ok) markReportsSynced([r.id])
      }
      return listCommunityReports().filter((r) => r.synced).length
    }
    const data = await res.json()
    const syncedIds = pending.map((r) => r.id)
    markReportsSynced(syncedIds)
    return typeof data.count === 'number' ? data.count : syncedIds.length
  } catch {
    let n = 0
    for (const r of pending) {
      if (await postReportToServer(r)) {
        markReportsSynced([r.id])
        n++
      }
    }
    return n
  }
}

export function registerCommunityReportsOnlineSync() {
  if (typeof window === 'undefined') return () => {}
  const run = () => {
    void syncCommunityReports()
  }
  window.addEventListener('online', run)
  const timer = window.setTimeout(run, 500)
  return () => {
    window.removeEventListener('online', run)
    window.clearTimeout(timer)
  }
}

export function mergeReports(local: CommunityReport[], server: CommunityReport[]): CommunityReport[] {
  const byId = new Map<string, CommunityReport>()
  for (const s of server) byId.set(s.id, s)
  for (const l of local) {
    if (!byId.has(l.id) || l.pendingSync) byId.set(l.id, l)
  }
  return [...byId.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

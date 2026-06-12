import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { db } from '@/lib/db'
import type { ReportSeverity } from '@/lib/community-reports'

export type StoredCommunityReport = {
  id: string
  clientId: string | null
  hazardType: string
  description: string
  severity: ReportSeverity
  latitude: number | null
  longitude: number | null
  createdAt: string
  synced: boolean
}

const FALLBACK_DIR = path.join(process.cwd(), 'data')
const FALLBACK_FILE = path.join(FALLBACK_DIR, 'community-reports.json')

let dbAvailable: boolean | null = null

async function checkDb(): Promise<boolean> {
  if (dbAvailable !== null) return dbAvailable
  try {
    await db.$queryRaw`SELECT 1`
    dbAvailable = true
  } catch {
    dbAvailable = false
  }
  return dbAvailable
}

async function readFallback(): Promise<StoredCommunityReport[]> {
  try {
    const raw = await readFile(FALLBACK_FILE, 'utf8')
    return JSON.parse(raw) as StoredCommunityReport[]
  } catch {
    return []
  }
}

async function writeFallback(reports: StoredCommunityReport[]) {
  await mkdir(FALLBACK_DIR, { recursive: true })
  await writeFile(FALLBACK_FILE, JSON.stringify(reports.slice(0, 200), null, 2), 'utf8')
}

function mapRow(r: {
  id: string
  clientId: string | null
  hazardType: string
  description: string
  severity: string
  latitude: number | null
  longitude: number | null
  createdAt: Date
}): StoredCommunityReport {
  return {
    id: r.id,
    clientId: r.clientId,
    hazardType: r.hazardType,
    description: r.description,
    severity: r.severity as ReportSeverity,
    latitude: r.latitude,
    longitude: r.longitude,
    createdAt: r.createdAt.toISOString(),
    synced: true,
  }
}

export async function listStoredCommunityReports(limit = 50): Promise<StoredCommunityReport[]> {
  if (await checkDb()) {
    try {
      const rows = await db.communityHazardReport.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
      })
      return rows.map(mapRow)
    } catch {
      dbAvailable = false
    }
  }
  const file = await readFallback()
  return file.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit)
}

export async function createStoredCommunityReport(input: {
  clientId?: string | null
  hazardType: string
  description: string
  severity: ReportSeverity
  latitude?: number | null
  longitude?: number | null
}): Promise<{ report: StoredCommunityReport; storage: 'database' | 'file' }> {
  const payload = {
    clientId: input.clientId ?? null,
    hazardType: input.hazardType,
    description: input.description,
    severity: input.severity,
    latitude: input.latitude ?? null,
    longitude: input.longitude ?? null,
  }

  if (await checkDb()) {
    try {
      const row = await db.communityHazardReport.create({ data: payload })
      return { report: mapRow(row), storage: 'database' }
    } catch (err) {
      console.warn('[community-reports] DB insert failed, using file fallback:', err)
      dbAvailable = false
    }
  }

  const report: StoredCommunityReport = {
    id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...payload,
    createdAt: new Date().toISOString(),
    synced: true,
  }
  const list = await readFallback()
  if (payload.clientId) {
    const idx = list.findIndex((r) => r.clientId === payload.clientId)
    if (idx >= 0) list[idx] = report
    else list.unshift(report)
  } else {
    list.unshift(report)
  }
  await writeFallback(list)
  return { report, storage: 'file' }
}

export async function findByClientIds(clientIds: string[]): Promise<Set<string>> {
  const set = new Set<string>()
  if (clientIds.length === 0) return set

  if (await checkDb()) {
    try {
      const rows = await db.communityHazardReport.findMany({
        where: { clientId: { in: clientIds } },
        select: { clientId: true },
      })
      for (const r of rows) {
        if (r.clientId) set.add(r.clientId)
      }
      return set
    } catch {
      dbAvailable = false
    }
  }

  const file = await readFallback()
  for (const r of file) {
    if (r.clientId && clientIds.includes(r.clientId)) set.add(r.clientId)
  }
  return set
}

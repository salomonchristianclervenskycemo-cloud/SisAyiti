import { NextResponse } from 'next/server'
import { communityReportSchema, communityReportSyncSchema } from '@/lib/validations'
import {
  createStoredCommunityReport,
  listStoredCommunityReports,
  findByClientIds,
} from '@/lib/community-reports-persistence'

export async function GET() {
  try {
    const reports = await listStoredCommunityReports(50)
    return NextResponse.json({ reports, count: reports.length })
  } catch (error) {
    console.error('[community-reports] GET:', error)
    return NextResponse.json({ reports: [], count: 0, error: 'storage_unavailable' })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (Array.isArray(body?.reports)) {
      const parsed = communityReportSyncSchema.safeParse(body)
      if (!parsed.success) {
        return NextResponse.json(
          { error: 'Données invalides', details: parsed.error.flatten().fieldErrors },
          { status: 400 }
        )
      }
      const existing = await findByClientIds(
        parsed.data.reports.map((r) => r.clientId).filter(Boolean) as string[]
      )
      const synced: string[] = []
      for (const item of parsed.data.reports) {
        if (!item.clientId || existing.has(item.clientId)) continue
        await createStoredCommunityReport(item)
        synced.push(item.clientId)
        existing.add(item.clientId)
      }
      return NextResponse.json({ synced, count: synced.length })
    }

    const parsed = communityReportSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { report, storage } = await createStoredCommunityReport(parsed.data)
    return NextResponse.json(
      { message: 'Signalement enregistré', report, storage },
      { status: 201 }
    )
  } catch (error) {
    console.error('[community-reports] POST:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

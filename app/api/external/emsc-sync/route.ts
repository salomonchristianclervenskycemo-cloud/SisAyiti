import { NextResponse } from 'next/server'
import { emscClient } from '@/lib/seismic-service'
import { getSeismicSyncService } from '@/lib/seismic-sync-service'
import { unauthorizedSyncResponse, verifySyncSecret } from '@/lib/admin-sync-auth'

export async function POST(req: Request) {
  if (!verifySyncSecret(req)) {
    return unauthorizedSyncResponse()
  }

  try {
    const live = await emscClient.fetchEarthquakes(2.0, 24 * 60)
    const service = getSeismicSyncService()
    await service.sync()
    return NextResponse.json({
      success: true,
      fetched: live.length,
      message: 'EMSC sync completed',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('EMSC sync error:', error)
    return NextResponse.json({ success: false, error: 'EMSC sync failed' }, { status: 500 })
  }
}

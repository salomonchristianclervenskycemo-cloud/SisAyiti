import { NextResponse } from 'next/server'
import { usgsClient } from '@/lib/seismic-service'
import { getSeismicSyncService } from '@/lib/seismic-sync-service'
import { unauthorizedSyncResponse, verifySyncSecret } from '@/lib/admin-sync-auth'

export async function POST(req: Request) {
  if (!verifySyncSecret(req)) {
    return unauthorizedSyncResponse()
  }

  try {
    const live = await usgsClient.fetchEarthquakes(7, 2.0)
    const service = getSeismicSyncService()
    await service.sync()
    return NextResponse.json({
      success: true,
      fetched: live.length,
      message: 'USGS sync completed',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('USGS sync error:', error)
    return NextResponse.json({ success: false, error: 'USGS sync failed' }, { status: 500 })
  }
}

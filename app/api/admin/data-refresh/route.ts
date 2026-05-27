import { NextResponse } from 'next/server'
import { getSeismicSyncService } from '@/lib/seismic-sync-service'
import { invalidateCache } from '@/lib/redis'
import { unauthorizedSyncResponse, verifySyncSecret } from '@/lib/admin-sync-auth'

export async function POST(req: Request) {
  if (!verifySyncSecret(req)) {
    return unauthorizedSyncResponse()
  }

  try {
    await invalidateCache('seismic:events')
    await invalidateCache('seismic:stats')
    const service = getSeismicSyncService()
    await service.sync()

    return NextResponse.json({
      success: true,
      message: 'Manual data refresh completed',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Data refresh error:', error)
    return NextResponse.json({ success: false, error: 'Refresh failed' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCache, setCache } from '@/lib/redis'
import { CACHE_TTL } from '@/lib/cache-strategy'

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams
    const minMagnitude = parseFloat(params.get('minMagnitude') || '2')
    const maxMagnitude = parseFloat(params.get('maxMagnitude') || '10')
    const minDepth = parseFloat(params.get('minDepth') || '0')
    const maxDepth = parseFloat(params.get('maxDepth') || '700')
    const source = params.get('source')
    const start = params.get('start')
    const end = params.get('end')
    const limit = Math.min(parseInt(params.get('limit') || '500'), 1000)

    const cacheKey = `seismic:history:${minMagnitude}:${maxMagnitude}:${source}:${start}:${end}:${limit}`
    const cached = await getCache<{ success: boolean; events: unknown[] }>(cacheKey)
    if (cached) return NextResponse.json(cached)

    const eventTime: { gte?: Date; lte?: Date } = {}
    if (start) eventTime.gte = new Date(start)
    if (end) eventTime.lte = new Date(end)
    if (!start) eventTime.gte = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    const events = await prisma.seismicEvent.findMany({
      where: {
        magnitude: { gte: minMagnitude, lte: maxMagnitude },
        depth: { gte: minDepth, lte: maxDepth },
        ...(source ? { source } : {}),
        eventTime,
      },
      orderBy: [{ eventTime: 'desc' }],
      take: limit,
    })

    const response = {
      success: true,
      count: events.length,
      events,
      timestamp: new Date().toISOString(),
    }
    await setCache(cacheKey, response, CACHE_TTL.history)
    return NextResponse.json(response)
  } catch (error) {
    console.error('Seismic history API error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch history' }, { status: 500 })
  }
}

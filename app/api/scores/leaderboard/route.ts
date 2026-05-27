import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCache, setCache } from '@/lib/redis'

// GET: Public leaderboard of top game scores
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const difficulty = searchParams.get('difficulty')

    // Try cache first
    const cacheKey = `leaderboard:${difficulty || 'all'}:${limit}`
    const cached = await getCache<any>(cacheKey)
    if (cached) {
      return NextResponse.json({ ...cached, fromCache: true })
    }

    // Build query
    const where: any = {}
    if (difficulty) {
      where.difficulty = difficulty
    }

    const scores = await db.gameScore.findMany({
      where,
      orderBy: { finalBudget: 'desc' },
      take: limit,
      select: {
        id: true,
        playerName: true,
        finalBudget: true,
        buildingsConstructed: true,
        resilientBuildings: true,
        selectedSoil: true,
        difficulty: true,
        createdAt: true
      }
    })

    // Calculate rankings with stats
    const leaderboard = scores.map((score, index) => ({
      rank: index + 1,
      ...score,
      resilientPercentage:
        score.buildingsConstructed > 0
          ? Math.round((score.resilientBuildings / score.buildingsConstructed) * 100)
          : 0,
    }))

    // Cache for 5 minutes
    await setCache(cacheKey, { leaderboard, count: leaderboard.length }, 300)

    return NextResponse.json({
      leaderboard,
      count: leaderboard.length,
      fromCache: false,
    })
  } catch (error) {
    console.error('Leaderboard error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

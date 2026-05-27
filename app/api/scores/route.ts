import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { resolveUserIdFromRequest } from '@/lib/auth-mobile-token'
import { db } from '@/lib/db'
import { getCache, setCache, invalidateCache } from '@/lib/redis'
import { gameScoreSchema } from '@/lib/validations'

// GET : Charger le classement des meilleurs scores (avec cache Redis)
export async function GET() {
  try {
    const cacheKey = 'leaderboard_scores'
    
    // Essayer de charger depuis le cache Redis
    const cachedLeaderboard = await getCache<any[]>(cacheKey)
    if (cachedLeaderboard) {
      return NextResponse.json({ leaderboard: cachedLeaderboard, fromCache: true })
    }

    // Sinon, charger depuis PostgreSQL
    const leaderboard = await db.gameScore.findMany({
      orderBy: [
        { finalBudget: 'desc' },
        { resilientBuildings: 'desc' },
        { buildingsConstructed: 'desc' }
      ],
      take: 10,
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

    // Mettre en cache le leaderboard pendant 60 secondes
    await setCache(cacheKey, leaderboard, 60)

    return NextResponse.json({ leaderboard, fromCache: false })
  } catch (error) {
    console.error('Erreur GET leaderboard:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST : Enregistrer un nouveau score de jeu
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const bearerUserId = await resolveUserIdFromRequest(req)
    const body = await req.json()

    // Validation avec Zod
    const validatedData = gameScoreSchema.safeParse(body)
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { playerName, finalBudget, buildingsConstructed, resilientBuildings, selectedSoil, difficulty } = validatedData.data

    // Enregistrement du score
    const userId =
      (session?.user ? (session.user as { id?: string }).id : null) ?? bearerUserId ?? null

    const newScore = await db.gameScore.create({
      data: {
        userId: userId as never,
        playerName: playerName || 'Anonymous',
        finalBudget,
        buildingsConstructed,
        resilientBuildings,
        selectedSoil: selectedSoil || 'sandy',
        difficulty: difficulty || 'medium'
      }
    })

    // Invalider le cache du leaderboard
    await invalidateCache('leaderboard_scores')

    return NextResponse.json(
      { message: 'Score enregistré avec succès', score: newScore },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erreur POST score:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

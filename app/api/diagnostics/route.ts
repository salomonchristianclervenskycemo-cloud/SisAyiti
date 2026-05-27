import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getCache, setCache, invalidateCache } from '@/lib/redis'
import { diagnosticReportSchema } from '@/lib/validations'

// GET : Récupérer les rapports ou les statistiques globales (avec cache Redis)
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url)
    const userOnly = searchParams.get('userOnly') === 'true'

    // 1. Si l'utilisateur demande uniquement ses rapports personnels
    if (userOnly) {
      if (!session?.user) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
      }
      const reports = await db.diagnosticReport.findMany({
        where: { userId: (session.user as any).id },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json({ reports })
    }

    // 2. Sinon, retourner les statistiques globales avec CACHE REDIS
    const cacheKey = 'global_diagnostics_stats'
    const cachedStats = await getCache<any>(cacheKey)
    if (cachedStats) {
      return NextResponse.json({ ...cachedStats, fromCache: true })
    }

    // Calculer les statistiques s'il n'y a pas de cache
    const totalCount = await db.diagnosticReport.count()
    const resilientCount = await db.diagnosticReport.count({ where: { vulnerabilityLevel: 'resilient' } })
    const moderateCount = await db.diagnosticReport.count({ where: { vulnerabilityLevel: 'moderate' } })
    const vulnerableCount = await db.diagnosticReport.count({ where: { vulnerabilityLevel: 'vulnerable' } })

    const stats = {
      total: totalCount,
      resilient: resilientCount,
      moderate: moderateCount,
      vulnerable: vulnerableCount,
      percentages: totalCount > 0 ? {
        resilient: Math.round((resilientCount / totalCount) * 100),
        moderate: Math.round((moderateCount / totalCount) * 100),
        vulnerable: Math.round((vulnerableCount / totalCount) * 100)
      } : { resilient: 0, moderate: 0, vulnerable: 0 }
    }

    // Mettre en cache pour 10 minutes (600 secondes)
    await setCache(cacheKey, stats, 600)

    return NextResponse.json({ ...stats, fromCache: false })
  } catch (error) {
    console.error('Erreur GET diagnostics:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST : Enregistrer un nouveau rapport de diagnostic
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()

    // Validation avec Zod
    const validatedData = diagnosticReportSchema.safeParse(body)
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const {
      structure, foundation, condition, age, terrain,
      score, vulnerabilityLevel, recommendations, latitude, longitude
    } = validatedData.data

    // Création du rapport (userId facultatif si anonyme)
    const report = await db.diagnosticReport.create({
      data: {
        userId: session?.user ? (session.user as any).id : null,
        structure,
        foundation,
        condition,
        age,
        terrain,
        vulnerabilityScore: score,
        vulnerabilityLevel,
        recommendations,
        latitude: latitude || null,
        longitude: longitude || null
      }
    })

    // Invalider le cache des statistiques globales car de nouvelles données sont entrées
    await invalidateCache('global_diagnostics_stats')

    return NextResponse.json(
      { message: 'Diagnostic enregistré avec succès', report },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erreur POST diagnostics:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

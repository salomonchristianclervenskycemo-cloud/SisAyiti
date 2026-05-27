import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { simulationSchema } from '@/lib/validations'

// GET : Récupérer les simulations enregistrées
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url)
    const userOnly = searchParams.get('userOnly') === 'true'

    if (userOnly) {
      if (!session?.user) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
      }
      const simulations = await db.simulation.findMany({
        where: { userId: (session.user as any).id },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json({ simulations })
    }

    // Par défaut, retourner les 20 simulations publiques les plus récentes
    const simulations = await db.simulation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        user: {
          select: {
            name: true,
            role: true
          }
        }
      }
    })

    return NextResponse.json({ simulations })
  } catch (error) {
    console.error('Erreur GET simulations:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST : Sauvegarder une nouvelle configuration de simulation
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()

    // Validation avec Zod
    const validatedData = simulationSchema.safeParse(body)
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { amplitude, frequency, duration, waveType, notes, isPublic } = validatedData.data

    // Sauvegarde en base de données
    const simulation = await db.simulation.create({
      data: {
        userId: session?.user ? (session.user as any).id : null,
        amplitude,
        frequency,
        duration,
        waveType: waveType || 'sine',
        notes: notes || null,
        isPublic: isPublic || false
      }
    })

    return NextResponse.json(
      { message: 'Simulation sauvegardée avec succès', simulation },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erreur POST simulation:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

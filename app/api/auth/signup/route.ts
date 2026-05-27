import { NextResponse } from 'next/server'
import db from '@/lib/db'
import bcrypt from 'bcryptjs'
import { signUpSchema } from '@/lib/validations'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validation des entrées avec Zod
    const validatedData = signUpSchema.safeParse(body)
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { email, password, name, role } = validatedData.data

    // Vérification de l'unicité de l'email
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Un utilisateur avec cette adresse email existe déjà' },
        { status: 400 }
      )
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12)

    // Création de l'utilisateur
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: role || 'citizen'
      }
    })

    // Retourner l'utilisateur créé (sans le mot de passe)
    return NextResponse.json(
      {
        message: 'Utilisateur inscrit avec succès',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return NextResponse.json(
      { error: 'Une erreur interne est survenue' },
      { status: 500 }
    )
  }
}

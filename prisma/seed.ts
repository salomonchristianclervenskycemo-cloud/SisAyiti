import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Créer utilisateurs de test
  const user1 = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Test User',
      role: 'user',
    },
  }).catch(() => {
    console.log('ℹ️  User already exists')
    return null
  })

  if (user1) console.log(`✅ Utilisateur créé: ${user1.email}`)

  const user2 = await prisma.user.create({
    data: {
      email: 'teacher@example.com',
      password: await bcrypt.hash('teacher123', 10),
      name: 'Teacher User',
      role: 'teacher',
    },
  }).catch(() => {
    console.log('ℹ️  Teacher user already exists')
    return null
  })

  if (user2) console.log(`✅ Enseignant créé: ${user2.email}`)

  // Récupérer un utilisateur pour l'assigner aux données
  const targetUser = user1 || (await prisma.user.findFirst())

  if (!targetUser) {
    console.log('❌ Pas d\'utilisateur trouvé')
    return
  }

  // Créer diagnostics de test
  const diagnostic1 = await prisma.diagnosticReport.create({
    data: {
      userId: targetUser.id,
      structure: 'concrete_unreinforced',
      foundation: 'poor',
      condition: 'fair',
      age: 'moderate',
      terrain: 'slope',
      vulnerabilityScore: 2.8,
      vulnerabilityLevel: 'moderate',
      recommendations: ['Renforcer les murs porteurs', 'Améliorer les fondations'],
      district: 'Port-au-Prince',
    },
  }).catch((e) => {
    console.log('ℹ️  Diagnostic already exists')
    return null
  })

  if (diagnostic1) console.log(`✅ Diagnostic créé: ${diagnostic1.id}`)

  const diagnostic2 = await prisma.diagnosticReport.create({
    data: {
      userId: targetUser.id,
      structure: 'wood_brick',
      foundation: 'adequate',
      condition: 'good',
      age: 'recent',
      terrain: 'flat',
      vulnerabilityScore: 2.0,
      vulnerabilityLevel: 'moderate',
      recommendations: ['Ajouter des contreventements'],
      district: 'Carrefour',
    },
  }).catch(() => {
    console.log('ℹ️  Another diagnostic already exists')
    return null
  })

  if (diagnostic2) console.log(`✅ Second diagnostic créé: ${diagnostic2.id}`)

  // Créer scores de jeu
  const gameScore1 = await prisma.gameScore.create({
    data: {
      userId: targetUser.id,
      playerName: 'Test Player',
      finalBudget: 150000,
      buildingsConstructed: 8,
      resilientBuildings: 6,
      selectedSoil: 'rocky',
      survivialPercentage: 85.5,
    },
  }).catch(() => {
    console.log('ℹ️  Game score already exists')
    return null
  })

  if (gameScore1) console.log(`✅ Score de jeu créé: ${gameScore1.id}`)

  // Créer simulations
  const simulation1 = await prisma.simulation.create({
    data: {
      userId: targetUser.id,
      amplitude: 5.2,
      frequency: 2.5,
      duration: 30,
      waveType: 'sine',
      maxAcceleration: 450,
      peakGroundAcceleration: 0.45,
      notes: 'Test simulation',
    },
  }).catch(() => {
    console.log('ℹ️  Simulation already exists')
    return null
  })

  if (simulation1) console.log(`✅ Simulation créée: ${simulation1.id}`)

  // Créer événements sismiques de test (USGS data)
  const seismicEvent1 = await prisma.seismicEvent.create({
    data: {
      usgsId: 'us1000test01',
      source: 'USGS',
      magnitude: 5.2,
      latitude: 18.971,
      longitude: -72.285,
      depth: 12.5,
      region: 'Port-au-Prince, Haiti',
      district: 'Port-au-Prince',
      eventTime: new Date('2023-01-15T10:30:00Z'),
    },
  }).catch(() => {
    console.log('ℹ️  Seismic event already exists')
    return null
  })

  if (seismicEvent1) console.log(`✅ Événement sismique créé: ${seismicEvent1.usgsId}`)

  console.log('✨ Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })

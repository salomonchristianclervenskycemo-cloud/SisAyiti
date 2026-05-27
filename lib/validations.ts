import { z } from 'zod'

// --- Authentification & Utilisateurs ---
export const signUpSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').optional().or(z.literal('')),
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  role: z.enum(['citizen', 'student', 'teacher', 'admin']).default('citizen')
})

export const signInSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères')
})

// --- Rapports de Diagnostic de Bâtiment ---
export const diagnosticReportSchema = z.object({
  structure: z.string().min(1, 'La structure est requise'),
  foundation: z.string().min(1, 'La fondation est requise'),
  condition: z.string().min(1, "L'état général est requis"),
  age: z.string().min(1, "L'âge du bâtiment est requis"),
  terrain: z.string().min(1, 'Le type de terrain est requis'),
  score: z.number().min(0).max(10),
  vulnerabilityLevel: z.enum(['resilient', 'moderate', 'vulnerable']),
  recommendations: z.array(z.string()).min(1, 'Au moins une recommandation est requise'),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable()
})

// --- Scores du Jeu "Construis une Ville" ---
export const gameScoreSchema = z.object({
  playerName: z.string().min(2, 'Le nom du joueur doit contenir au moins 2 caractères').optional().or(z.literal('')),
  finalBudget: z.number().nonnegative(),
  buildingsConstructed: z.number().nonnegative(),
  resilientBuildings: z.number().nonnegative(),
  selectedSoil: z.string().optional().or(z.literal('')),
  difficulty: z.string().optional().default('medium'),
  lang: z.string().optional()
})

// --- Configurations de Simulation Sismique ---
export const simulationSchema = z.object({
  amplitude: z.number().positive('L\'amplitude doit être positive'),
  frequency: z.number().positive('La fréquence doit être positive'),
  duration: z.number().positive('La durée doit être positive'),
  waveType: z.string().default('sine'),
  notes: z.string().optional().or(z.literal('')),
  isPublic: z.boolean().optional().default(false),
})

// --- Alias Exports (pour compatibilité) ---
export const userRegistrationSchema = signUpSchema

/**
 * Persistance locale éducation (3G / hors-ligne) — localStorage + file sync diagnostics.
 */

import type { BuildingQuality } from '@/lib/seismic-engine'
import { migratePreventionProgress } from '@/lib/translations/prevention-items'

export const EDUCATION_PACK_VERSION = 1

const PACK_KEY = 'sisayiti_edu_pack_v'
const PREV_PROGRESS_KEY = 'sisayiti_prev_progress'
const PENDING_DIAG_KEY = 'sisayiti_pending_diagnostics'
const LABO_PRESET_KEY = 'sisayiti_labo_preset'
const LABO_PROGRESS_KEY = 'sisayiti_labo_progress'
const VILLE_PROGRESS_KEY = 'sisayiti_ville_progress'
const CARTE_PROGRESS_KEY = 'sisayiti_carte_progress'
const ACTUALITE_PROGRESS_KEY = 'sisayiti_actualite_progress'
const COMPRENDRE_PROGRESS_KEY = 'sisayiti_comprendre_progress'
const HOME_PROGRESS_KEY = 'sisayiti_home_progress'

export type HomePathStep = 'konprann' | 'simile' | 'surveiller' | 'prepare'

export type PreventionProgress = Record<string, number[]>

export type PendingDiagnostic = {
  structure: string
  foundation: string
  condition: string
  age: string
  terrain: string
  score: number
  vulnerabilityLevel: 'resilient' | 'moderate' | 'vulnerable'
  recommendations: string[]
  latitude?: number | null
  longitude?: number | null
  createdAt: string
}

export type LaboPreset = {
  magnitude: number
  distance: number
  soilId: string
  buildingQuality: BuildingQuality
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function markEducationPackReady() {
  if (typeof window === 'undefined') return
  localStorage.setItem(`${PACK_KEY}${EDUCATION_PACK_VERSION}`, String(Date.now()))
}

export function isEducationPackReady(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(`${PACK_KEY}${EDUCATION_PACK_VERSION}`) != null
}

export function loadPreventionProgress(): PreventionProgress {
  if (typeof window === 'undefined') return {}
  const raw = safeParse<PreventionProgress>(localStorage.getItem(PREV_PROGRESS_KEY), {})
  return migratePreventionProgress(raw)
}

export function savePreventionProgress(progress: PreventionProgress) {
  if (typeof window === 'undefined') return
  localStorage.setItem(PREV_PROGRESS_KEY, JSON.stringify(progress))
  window.dispatchEvent(new Event('sisayiti-prev-progress'))
}

export function saveLaboPreset(preset: LaboPreset) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(LABO_PRESET_KEY, JSON.stringify(preset))
}

function normalizeLaboPreset(raw: unknown): LaboPreset | null {
  if (!raw || typeof raw !== 'object') return null
  const p = raw as Record<string, unknown>
  if (typeof p.magnitude !== 'number' || typeof p.distance !== 'number' || typeof p.soilId !== 'string') {
    return null
  }
  let buildingQuality: BuildingQuality = 'fair'
  if (p.buildingQuality === 'poor' || p.buildingQuality === 'fair' || p.buildingQuality === 'good') {
    buildingQuality = p.buildingQuality
  } else if (p.buildingQuality === 'excellent') {
    buildingQuality = 'good'
  }
  let soilId = p.soilId as string
  if (soilId === 'soft') soilId = 'saturated'

  return {
    magnitude: p.magnitude,
    distance: p.distance,
    soilId,
    buildingQuality,
  }
}

export type LaboProgress = {
  simulations: number
  scenarios: string[]
}

export function loadLaboProgress(): LaboProgress {
  if (typeof window === 'undefined') return { simulations: 0, scenarios: [] }
  const raw = safeParse<LaboProgress>(localStorage.getItem(LABO_PROGRESS_KEY), { simulations: 0, scenarios: [] })
  return {
    simulations: typeof raw.simulations === 'number' ? raw.simulations : 0,
    scenarios: Array.isArray(raw.scenarios) ? raw.scenarios : [],
  }
}

function saveLaboProgress(progress: LaboProgress) {
  if (typeof window === 'undefined') return
  localStorage.setItem(LABO_PROGRESS_KEY, JSON.stringify(progress))
  window.dispatchEvent(new Event('sisayiti-labo-progress'))
}

export function recordLaboSimulation() {
  const p = loadLaboProgress()
  p.simulations += 1
  saveLaboProgress(p)
}

export function recordLaboScenario(scenarioId: string) {
  const p = loadLaboProgress()
  if (!p.scenarios.includes(scenarioId)) {
    p.scenarios = [...p.scenarios, scenarioId]
    saveLaboProgress(p)
  }
}

export type VilleProgress = {
  maxPhasesReached: number
  campaignsCompleted: number
}

export function loadVilleProgress(): VilleProgress {
  if (typeof window === 'undefined') return { maxPhasesReached: 0, campaignsCompleted: 0 }
  const raw = safeParse<VilleProgress>(localStorage.getItem(VILLE_PROGRESS_KEY), {
    maxPhasesReached: 0,
    campaignsCompleted: 0,
  })
  return {
    maxPhasesReached: typeof raw.maxPhasesReached === 'number' ? raw.maxPhasesReached : 0,
    campaignsCompleted: typeof raw.campaignsCompleted === 'number' ? raw.campaignsCompleted : 0,
  }
}

function saveVilleProgress(progress: VilleProgress) {
  if (typeof window === 'undefined') return
  localStorage.setItem(VILLE_PROGRESS_KEY, JSON.stringify(progress))
  window.dispatchEvent(new Event('sisayiti-ville-progress'))
}

export function recordVillePhaseReached(phaseCount: number) {
  const p = loadVilleProgress()
  if (phaseCount > p.maxPhasesReached) {
    p.maxPhasesReached = phaseCount
    saveVilleProgress(p)
  }
}

export function recordVilleCampaignComplete() {
  const p = loadVilleProgress()
  p.campaignsCompleted += 1
  p.maxPhasesReached = Math.max(p.maxPhasesReached, 4)
  saveVilleProgress(p)
}

export type CarteProgress = {
  eventsExplored: string[]
  guideOpened: boolean
}

export function loadCarteProgress(): CarteProgress {
  if (typeof window === 'undefined') return { eventsExplored: [], guideOpened: false }
  const raw = safeParse<CarteProgress>(localStorage.getItem(CARTE_PROGRESS_KEY), {
    eventsExplored: [],
    guideOpened: false,
  })
  return {
    eventsExplored: Array.isArray(raw.eventsExplored) ? raw.eventsExplored : [],
    guideOpened: Boolean(raw.guideOpened),
  }
}

function saveCarteProgress(progress: CarteProgress) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CARTE_PROGRESS_KEY, JSON.stringify(progress))
  window.dispatchEvent(new Event('sisayiti-carte-progress'))
}

export function recordCarteGuideOpened() {
  const p = loadCarteProgress()
  if (!p.guideOpened) {
    p.guideOpened = true
    saveCarteProgress(p)
  }
}

export function recordCarteEventExplored(eventId: string) {
  const p = loadCarteProgress()
  if (!p.eventsExplored.includes(eventId)) {
    p.eventsExplored = [...p.eventsExplored, eventId]
    saveCarteProgress(p)
  }
}

export type ActualiteProgress = {
  eventsInspected: string[]
  filtersTried: string[]
}

export function loadActualiteProgress(): ActualiteProgress {
  if (typeof window === 'undefined') return { eventsInspected: [], filtersTried: [] }
  const raw = safeParse<ActualiteProgress>(localStorage.getItem(ACTUALITE_PROGRESS_KEY), {
    eventsInspected: [],
    filtersTried: [],
  })
  return {
    eventsInspected: Array.isArray(raw.eventsInspected) ? raw.eventsInspected : [],
    filtersTried: Array.isArray(raw.filtersTried) ? raw.filtersTried : [],
  }
}

function saveActualiteProgress(progress: ActualiteProgress) {
  if (typeof window === 'undefined') return
  localStorage.setItem(ACTUALITE_PROGRESS_KEY, JSON.stringify(progress))
  window.dispatchEvent(new Event('sisayiti-actualite-progress'))
}

export function recordActualiteEventInspected(eventId: string) {
  const p = loadActualiteProgress()
  if (!p.eventsInspected.includes(eventId)) {
    p.eventsInspected = [...p.eventsInspected, eventId]
    saveActualiteProgress(p)
  }
}

export function recordActualiteFilter(category: string) {
  const p = loadActualiteProgress()
  if (!p.filtersTried.includes(category)) {
    p.filtersTried = [...p.filtersTried, category]
    saveActualiteProgress(p)
  }
}

export function consumeLaboPreset(): LaboPreset | null {
  if (typeof window === 'undefined') return null
  const raw = sessionStorage.getItem(LABO_PRESET_KEY)
  sessionStorage.removeItem(LABO_PRESET_KEY)
  if (!raw) return null
  try {
    return normalizeLaboPreset(JSON.parse(raw))
  } catch {
    return null
  }
}

export function queuePendingDiagnostic(report: PendingDiagnostic) {
  if (typeof window === 'undefined') return
  const list = safeParse<PendingDiagnostic[]>(localStorage.getItem(PENDING_DIAG_KEY), [])
  list.push(report)
  localStorage.setItem(PENDING_DIAG_KEY, JSON.stringify(list.slice(-10)))
}

export function getPendingDiagnostics(): PendingDiagnostic[] {
  if (typeof window === 'undefined') return []
  return safeParse(localStorage.getItem(PENDING_DIAG_KEY), [])
}

export function clearPendingDiagnostics() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(PENDING_DIAG_KEY)
}

export function loadComprendreProgress(): number[] {
  if (typeof window === 'undefined') return []
  return safeParse(localStorage.getItem(COMPRENDRE_PROGRESS_KEY), [])
}

export type HomeProgress = {
  pathStepsCompleted: HomePathStep[]
  modulesVisited: string[]
}

export function loadHomeProgress(): HomeProgress {
  if (typeof window === 'undefined') return { pathStepsCompleted: [], modulesVisited: [] }
  const raw = safeParse<HomeProgress>(localStorage.getItem(HOME_PROGRESS_KEY), {
    pathStepsCompleted: [],
    modulesVisited: [],
  })
  return {
    pathStepsCompleted: Array.isArray(raw.pathStepsCompleted) ? raw.pathStepsCompleted : [],
    modulesVisited: Array.isArray(raw.modulesVisited) ? raw.modulesVisited : [],
  }
}

function saveHomeProgress(progress: HomeProgress) {
  if (typeof window === 'undefined') return
  localStorage.setItem(HOME_PROGRESS_KEY, JSON.stringify(progress))
  window.dispatchEvent(new Event('sisayiti-home-progress'))
}

export function recordHomePathStep(step: HomePathStep) {
  const p = loadHomeProgress()
  if (!p.pathStepsCompleted.includes(step)) {
    p.pathStepsCompleted = [...p.pathStepsCompleted, step]
    saveHomeProgress(p)
  }
}

export function recordHomeModuleVisited(moduleId: string) {
  if (moduleId === 'home') return
  const p = loadHomeProgress()
  if (!p.modulesVisited.includes(moduleId)) {
    p.modulesVisited = [...p.modulesVisited, moduleId]
    saveHomeProgress(p)
  }
}

export function getInferredHomeSteps(): Set<HomePathStep> {
  const p = loadHomeProgress()
  const inferred = new Set<HomePathStep>(p.pathStepsCompleted)
  if (loadComprendreProgress().length > 0) inferred.add('konprann')
  const labo = loadLaboProgress()
  const ville = loadVilleProgress()
  if (labo.simulations > 0 || labo.scenarios.length > 0 || ville.maxPhasesReached > 0) {
    inferred.add('simile')
  }
  const carte = loadCarteProgress()
  const actu = loadActualiteProgress()
  if (carte.eventsExplored.length > 0 || carte.guideOpened || actu.eventsInspected.length > 0) {
    inferred.add('surveiller')
  }
  const prev = loadPreventionProgress()
  if (Object.keys(prev).length > 0 || getPendingDiagnostics().length > 0) {
    inferred.add('prepare')
  }
  return inferred
}

export function getHomePathCompletion(): { steps: number; modules: number } {
  const p = loadHomeProgress()
  return {
    steps: getInferredHomeSteps().size,
    modules: p.modulesVisited.length,
  }
}

export function markComprendreSectionOpened(index: number): number[] {
  const set = new Set(loadComprendreProgress())
  set.add(index)
  const arr = [...set].sort((a, b) => a - b)
  if (typeof window !== 'undefined') {
    localStorage.setItem(COMPRENDRE_PROGRESS_KEY, JSON.stringify(arr))
    window.dispatchEvent(new Event('sisayiti-comprendre-progress'))
  }
  return arr
}

export async function flushPendingDiagnostics(): Promise<number> {
  const pending = getPendingDiagnostics()
  if (pending.length === 0) return 0
  let sent = 0
  const remaining: PendingDiagnostic[] = []
  for (const item of pending) {
    try {
      const res = await fetch('/api/diagnostics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structure: item.structure,
          foundation: item.foundation,
          condition: item.condition,
          age: item.age,
          terrain: item.terrain,
          score: item.score,
          vulnerabilityLevel: item.vulnerabilityLevel,
          recommendations: item.recommendations,
          latitude: item.latitude ?? null,
          longitude: item.longitude ?? null,
        }),
      })
      if (res.ok) sent++
      else remaining.push(item)
    } catch {
      remaining.push(item)
    }
  }
  if (remaining.length === 0) clearPendingDiagnostics()
  else localStorage.setItem(PENDING_DIAG_KEY, JSON.stringify(remaining))
  return sent
}

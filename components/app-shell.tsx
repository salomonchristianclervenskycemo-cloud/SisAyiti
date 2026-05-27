'use client'

import dynamic from 'next/dynamic'
import { AppProvider, useApp } from '@/lib/app-context'
import { LangProvider } from '@/lib/lang-context'
import { TopBar } from '@/components/top-bar'
import { Sidebar, BottomNav } from '@/components/navigation'
import { useSeismicEvents } from '@/hooks/use-seismic-events'
import { useRealTimeUpdates } from '@/hooks/use-real-time-updates'
import { useSeismicStore } from '@/lib/seismic-store'

const HomeScreen = dynamic(() => import('@/components/home-screen'), { loading: () => null })
const ModuleComprendre = dynamic(() => import('@/components/module-comprendre'), { loading: () => null })
const ModuleLabo = dynamic(() => import('@/components/module-labo'), { loading: () => null })
const ModuleVille = dynamic(() => import('@/components/module-ville'), { loading: () => null })
const ModuleCarte = dynamic(
  () => import('@/components/module-carte').then((m) => m.ModuleCarte),
  { loading: () => null, ssr: false }
)
const ModulePrevention = dynamic(
  () => import('@/components/module-prevention').then((m) => m.ModulePrevention),
  { loading: () => null }
)
const ModuleMultirisques = dynamic(
  () => import('@/components/module-multirisques').then((m) => m.ModuleMultirisques),
  { loading: () => null }
)
const ModuleActualite = dynamic(() => import('@/components/module-actualite'), { loading: () => null })

/** Fetch seismic data only when map or monitoring modules are active. */
function ConditionalDataFetcher() {
  const { activeModule } = useApp()
  const needsData = activeModule === 'carte' || activeModule === 'actualite'
  const fetchDays = useSeismicStore((s) => s.fetchDays)
  const minMagnitude = useSeismicStore((s) => s.filters?.magnitude?.min ?? 2)
  const liveEnabled = useSeismicStore((s) => s.liveEnabled)

  useSeismicEvents(needsData ? fetchDays : 0, minMagnitude)
  useRealTimeUpdates(needsData && liveEnabled)

  return null
}

function AppContent() {
  const { activeModule } = useApp()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto md:ml-64 pb-16 md:pb-0">
          {activeModule === 'home' && <HomeScreen />}
          {activeModule === 'comprendre' && <ModuleComprendre />}
          {activeModule === 'labo' && <ModuleLabo />}
          {activeModule === 'ville' && <ModuleVille />}
          {activeModule === 'carte' && <ModuleCarte />}
          {activeModule === 'prevention' && <ModulePrevention />}
          {(activeModule === 'multirisques' || activeModule === 'diagnostic') && <ModuleMultirisques />}
          {activeModule === 'actualite' && <ModuleActualite />}
        </main>
      </div>
      <BottomNav />
    </div>
  )
}

export function AppShell() {
  return (
    <LangProvider>
      <AppProvider>
        <ConditionalDataFetcher />
        <AppContent />
      </AppProvider>
    </LangProvider>
  )
}

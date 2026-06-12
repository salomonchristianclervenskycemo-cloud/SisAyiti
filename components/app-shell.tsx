'use client'

import dynamic from 'next/dynamic'
import { AppProvider, useApp } from '@/lib/app-context'
import { LangProvider } from '@/lib/lang-context'
import { TopBar } from '@/components/top-bar'
import { Sidebar, BottomNav } from '@/components/navigation'
import { ModuleLoadingShell } from '@/components/ui/module-loading-shell'
import { CrisisJourneyBanner } from '@/components/crisis/crisis-journey-banner'
import { OfflinePackInit } from '@/components/education/offline-pack-init'

const moduleLoading = () => <ModuleLoadingShell />

const HomeScreen = dynamic(() => import('@/components/home-screen'), { loading: moduleLoading })
const ModuleComprendre = dynamic(() => import('@/components/module-comprendre'), { loading: moduleLoading })
const ModuleLabo = dynamic(() => import('@/components/module-labo'), { loading: moduleLoading })
const ModuleVille = dynamic(() => import('@/components/module-ville'), { loading: moduleLoading })
const ModuleCarte = dynamic(
  () => import('@/components/module-carte').then((m) => m.ModuleCarte),
  { loading: moduleLoading, ssr: false }
)
const ModulePrevention = dynamic(
  () => import('@/components/module-prevention').then((m) => m.ModulePrevention),
  { loading: moduleLoading }
)
const ModuleMultirisques = dynamic(
  () => import('@/components/module-multirisques').then((m) => m.ModuleMultirisques),
  { loading: moduleLoading, ssr: false }
)
const ModuleActualite = dynamic(() => import('@/components/module-actualite'), { loading: moduleLoading })

function AppContent() {
  const { activeModule } = useApp()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <CrisisJourneyBanner />
      <OfflinePackInit />
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
        <AppContent />
      </AppProvider>
    </LangProvider>
  )
}

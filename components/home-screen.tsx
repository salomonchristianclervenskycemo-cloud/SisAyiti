"use client"

import { HomeHero } from "@/components/home/home-hero"
import { HomePillarsPremium } from "@/components/home/home-pillars-premium"
import { HomeStatsBand } from "@/components/home/home-stats-band"
import { HomeFaultsBlock } from "@/components/home/home-faults-block"
import { HomeTimeline } from "@/components/home/home-timeline"
import { HomeLivePreview } from "@/components/home/home-live-preview"
import { HomeModulesShowcase } from "@/components/home/home-modules-showcase"
import { HomeOfflineBlock } from "@/components/home/home-offline-block"
import { HomeSources } from "@/components/home/home-sources"
import { HomeLandingFooter } from "@/components/home/home-landing-footer"

export default function HomeScreen() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <HomeHero />
      <HomePillarsPremium />
      <HomeStatsBand />
      <HomeFaultsBlock />
      <HomeTimeline />
      <HomeLivePreview />
      <HomeModulesShowcase />
      <HomeOfflineBlock />
      <HomeSources />
      <HomeLandingFooter />
    </div>
  )
}

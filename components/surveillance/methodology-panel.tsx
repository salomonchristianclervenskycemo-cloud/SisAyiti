"use client"

import { Info, ShieldAlert, WifiOff } from "lucide-react"
import { useLang } from "@/lib/lang-context"
import { GlassCard } from "./glass-card"

export function SurveillanceMethodologyPanel() {
  const { t } = useLang()

  return (
    <GlassCard className="p-5 md:p-6">
      <h3 className="text-sm font-bold flex items-center gap-2 mb-4 text-foreground">
        <Info size={16} className="text-primary" aria-hidden />
        {t("surv.methodology.title")}
      </h3>
      <ul className="space-y-3.5 text-sm text-muted-foreground leading-relaxed">
        <li className="flex gap-2">
          <ShieldAlert size={16} className="shrink-0 text-amber-500 mt-0.5" />
          {t("surv.methodology.sources")}
        </li>
        <li className="flex gap-2">
          <WifiOff size={16} className="shrink-0 text-sky-500 mt-0.5" />
          {t("surv.methodology.offline")}
        </li>
        <li className="flex gap-2">
          <ShieldAlert size={16} className="shrink-0 text-emerald-500 mt-0.5" />
          {t("surv.methodology.prevention")}
        </li>
      </ul>
    </GlassCard>
  )
}

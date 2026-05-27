"use client"
import { useState } from "react"
import { useLang } from "@/lib/lang-context"
import { useApp, type ModuleId } from "@/lib/app-context"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthButton } from "@/components/auth/auth-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Lang } from "@/lib/i18n"

const moduleNameKeys: Record<ModuleId, string> = {
  home: "nav.accueil",
  actualite: "nav.actualite",
  comprendre: "nav.comprendre",
  labo: "nav.labo",
  ville: "nav.ville",
  carte: "nav.carte",
  prevention: "nav.prevention",
  multirisques: "nav.multirisques",
  diagnostic: "nav.diagnostic",
}

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "kr", label: "KR" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
]

export function TopBar() {
  const { lang, setLang, t } = useLang()
  const { activeModule } = useApp()
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 md:left-64 z-30 h-14 flex items-center justify-between px-4 md:px-6 bg-background/70 backdrop-blur-xl border-b border-border shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="text-sm font-bold text-foreground truncate bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t(moduleNameKeys[activeModule]) || "SisAyiti"}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center rounded-lg border border-border bg-muted/30 overflow-hidden text-xs shadow-sm hover:shadow-md transition-all duration-200">
            {LANG_OPTIONS.map(({ code, label }, i) => (
              <div key={code} className="flex items-center">
                {i > 0 && <div className="w-px h-4 bg-border" />}
                <button
                  onClick={() => setLang(code)}
                  className={cn(
                    "min-h-11 min-w-11 px-2.5 font-semibold transition-all duration-200",
                    lang === code
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  aria-pressed={lang === code}
                  aria-label={label}
                >
                  {label}
                </button>
              </div>
            ))}
          </div>

          <AuthButton />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setAboutOpen(true)}
            className="inline-flex items-center justify-center min-h-11 min-w-11 p-2 rounded-lg hover:bg-muted transition-all duration-200 text-muted-foreground hover:text-foreground hover:shadow-sm active:scale-95"
            aria-label={t("home.about")}
          >
            <Info size={16} />
          </button>
        </div>
      </header>

      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("about.title")}
            </DialogTitle>
            <DialogDescription>{t("about.subtitle")}</DialogDescription>
          </DialogHeader>
          <AboutBody t={t} />
        </DialogContent>
      </Dialog>
    </>
  )
}

function AboutBody({ t }: { t: (key: string) => string }) {
  return (
    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
      <p>{t("about.body")}</p>
      <div>
        <h3 className="font-semibold text-foreground mb-2">{t("about.sources")}</h3>
        <ul className="space-y-1">
          <li>• <strong className="text-foreground">USGS</strong> — United States Geological Survey</li>
          <li>• <strong className="text-foreground">BME</strong> — Bureau des Mines et de l&apos;Énergie d&apos;Haïti</li>
          <li>• <strong className="text-foreground">CNBH</strong> — Code National du Bâtiment d&apos;Haïti</li>
          <li>• <strong className="text-foreground">TECLA</strong> — Programme de reconstruction</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-2">{t("about.references")}</h3>
        <ul className="space-y-1 text-xs">
          <li>• Calais et al. (2010). Transpressional rupture of an unmapped fault — <em>Nature Geoscience</em></li>
          <li>• USGS (2021). M7.2 Nippes Earthquake Sequence</li>
          <li>• EMS-98: European Macroseismic Scale</li>
          <li>• Atkinson & Boore (2003). GMPE for Stable Continental Regions</li>
        </ul>
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        {["MENFP", "PNUD", "UNICEF", "USGS", "BME", "TECLA"].map((o) => (
          <span key={o} className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs font-medium">{o}</span>
        ))}
      </div>
    </div>
  )
}

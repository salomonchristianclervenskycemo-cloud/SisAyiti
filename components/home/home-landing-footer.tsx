'use client'

import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'

const LINKS = [
  { key: 'home.landing.footer.about', module: 'comprendre' as const },
  { key: 'home.landing.footer.docs', module: 'comprendre' as const },
  { key: 'home.landing.footer.method', module: 'actualite' as const },
  { key: 'home.landing.footer.faq', module: 'prevention' as const },
  { key: 'home.landing.footer.contact', module: 'home' as const },
  { key: 'home.landing.footer.sources', module: 'actualite' as const },
  { key: 'home.landing.footer.limits', module: 'diagnostic' as const },
  { key: 'home.landing.footer.terms', module: 'home' as const },
]

export function HomeLandingFooter() {
  const { t } = useLang()
  const { setActiveModule } = useApp()

  return (
    <footer className="bg-card/40 border-t border-border px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6">
          {LINKS.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => link.module !== 'home' && setActiveModule(link.module)}
              className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              {t(link.key)}
            </button>
          ))}
        </nav>
        <p className="text-center text-xs text-muted-foreground/70">{t('home.landing.footer.copyright')}</p>
      </div>
    </footer>
  )
}

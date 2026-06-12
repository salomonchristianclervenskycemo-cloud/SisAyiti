'use client'

import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { useApp } from '@/lib/app-context'
import { loadComprendreProgress } from '@/lib/offline-education'
import {
  issueComprendreCertificate,
  loadComprendreCertificate,
  type ComprendreCertificate,
} from '@/lib/comprendre-certificate'
import { Award, ChevronRight, Printer } from 'lucide-react'

const TOTAL_SECTIONS = 7

export function LearnPathProgress() {
  const { t, lang } = useLang()
  const { setActiveModule } = useApp()
  const [opened, setOpened] = useState<number[]>([])
  const [cert, setCert] = useState<ComprendreCertificate | null>(null)

  useEffect(() => {
    const refresh = () => {
      const progress = loadComprendreProgress()
      setOpened(progress)
      let c = loadComprendreCertificate()
      if (progress.length >= TOTAL_SECTIONS && !c) {
        c = issueComprendreCertificate(progress.length)
      }
      setCert(c)
    }
    refresh()
    window.addEventListener('sisayiti-comprendre-progress', refresh)
    return () => window.removeEventListener('sisayiti-comprendre-progress', refresh)
  }, [])

  const done = opened.length
  const pct = Math.round((done / TOTAL_SECTIONS) * 100)
  const ready = done >= 4
  const completed = done >= TOTAL_SECTIONS

  const printCertificate = () => {
    if (!cert) return
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${t('comp.cert.title')}</title>
<style>body{font-family:system-ui,sans-serif;padding:2.5rem;text-align:center;color:#111}
h1{font-size:1.75rem} .badge{font-size:4rem;margin:1rem 0}
p{max-width:28rem;margin:0 auto;line-height:1.5;color:#444}
footer{margin-top:2rem;font-size:0.8rem;color:#666}</style></head><body>
<h1>SisAyiti</h1><div class="badge">🏅</div>
<h2>${t('comp.cert.title')}</h2>
<p>${t('comp.cert.desc')}</p>
<p><strong>${new Date(cert.issuedAt).toLocaleDateString(lang === 'kr' ? 'ht-HT' : lang)}</strong></p>
<footer>SisAyiti — Haiti seismic education</footer></body></html>`
    const w = window.open('', '_blank', 'noopener,noreferrer')
    if (!w) return
    w.document.write(html)
    w.document.close()
    w.focus()
    w.print()
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-sm">{t('comp.path.title')}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {t('comp.path.progress').replace('{done}', String(done)).replace('{total}', String(TOTAL_SECTIONS))}
          </p>
          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden max-w-xs">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
        {ready && !completed && (
          <button
            type="button"
            onClick={() => setActiveModule('prevention')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shrink-0 hover:bg-primary/90"
          >
            {t('comp.path.cta')} <ChevronRight size={16} />
          </button>
        )}
      </div>

      {completed && cert && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Award className="text-amber-500 shrink-0" size={28} />
            <div>
              <h3 className="font-bold text-foreground text-sm">{t('comp.cert.title')}</h3>
              <p className="text-xs text-muted-foreground mt-1">{t('comp.cert.desc')}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={printCertificate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-bold shrink-0 hover:bg-amber-500/10"
          >
            <Printer size={16} /> {t('comp.cert.print')}
          </button>
        </div>
      )}
    </div>
  )
}

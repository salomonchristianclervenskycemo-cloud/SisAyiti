'use client'

import { Printer } from 'lucide-react'
import { useLang } from '@/lib/lang-context'

type Props = {
  grade: string
  levelLabel: string
  score: number
  recommendations: string[]
}

export function DiagnosticExportButton({ grade, levelLabel, score, recommendations }: Props) {
  const { t } = useLang()

  const handlePrint = () => {
    const html = `
<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${t('multi.diag.exportTitle')}</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 2rem; color: #111; }
  h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
  .meta { color: #555; font-size: 0.9rem; margin-bottom: 1.5rem; }
  .grade { font-size: 2.5rem; font-weight: 800; }
  ul { padding-left: 1.25rem; }
  li { margin: 0.5rem 0; }
  footer { margin-top: 2rem; font-size: 0.75rem; color: #666; }
</style></head><body>
  <h1>SisAyiti — ${t('multi.diag.exportTitle')}</h1>
  <p class="meta">${new Date().toLocaleString()}</p>
  <p class="grade">${grade}</p>
  <p><strong>${levelLabel}</strong> — ${t('multi.diag.exportScore')}: ${score}/100</p>
  <h2>${t('multi.recommendations')}</h2>
  <ul>${recommendations.map((r) => `<li>${r.replace(/</g, '&lt;')}</li>`).join('')}</ul>
  <footer>SisAyiti — ${t('multi.diag.exportFooter')}</footer>
</body></html>`
    const w = window.open('', '_blank', 'noopener,noreferrer')
    if (!w) return
    w.document.write(html)
    w.document.close()
    w.focus()
    w.print()
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="w-full px-6 py-3 rounded-xl border border-border bg-card hover:bg-secondary/50 text-foreground font-bold text-sm flex items-center justify-center gap-2 transition-colors"
    >
      <Printer size={18} />
      {t('multi.diag.export')}
    </button>
  )
}

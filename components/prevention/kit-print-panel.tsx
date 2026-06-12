'use client'

import { useLang } from '@/lib/lang-context'
import { l } from '@/lib/i18n'
import { preventionItems } from '@/lib/translations/prevention'
import { Printer } from 'lucide-react'

type Props = {
  checkedIds: Set<number>
}

export function KitPrintPanel({ checkedIds }: Props) {
  const { lang, t } = useLang()
  const items = preventionItems.kit.map((item) => ({
    title: l(item.title, lang),
    description: l(item.description, lang),
    checked: checkedIds.has(item.id),
  }))

  const printChecklist = () => {
    const rows = items
      .map(
        (item) =>
          `<li style="margin:0.5rem 0"><strong>${item.checked ? '☑' : '☐'}</strong> ${item.title}<br/><span style="color:#555;font-size:0.9em">${item.description}</span></li>`
      )
      .join('')
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${t('prev.kit.printTitle')}</title>
<style>body{font-family:system-ui,sans-serif;padding:2rem;max-width:40rem;margin:0 auto;color:#111}
h1{font-size:1.5rem} ul{padding-left:1.2rem} footer{margin-top:2rem;font-size:0.8rem;color:#666}</style></head><body>
<h1>${t('prev.kit.printTitle')}</h1>
<p>${t('prev.kit.hint')}</p>
<ul>${rows}</ul>
<footer>SisAyiti — ${new Date().toLocaleDateString()}</footer></body></html>`
    const w = window.open('', '_blank', 'noopener,noreferrer')
    if (!w) return
    w.document.write(html)
    w.document.close()
    w.focus()
    w.print()
  }

  return (
    <div className="rounded-xl border border-violet-500/25 bg-violet-500/5 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <p className="text-sm text-muted-foreground flex-1">{t('prev.kit.hint')}</p>
      <button
        type="button"
        onClick={printChecklist}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-violet-500/40 text-violet-700 dark:text-violet-300 text-xs font-bold shrink-0 hover:bg-violet-500/10"
      >
        <Printer size={16} /> {t('prev.kit.print')}
      </button>
    </div>
  )
}

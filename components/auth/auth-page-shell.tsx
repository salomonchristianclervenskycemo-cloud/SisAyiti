"use client"

import type { ReactNode } from "react"
import { LangProvider, useLang } from "@/lib/lang-context"
import type { Lang } from "@/shared/i18n"

function LangSwitcher() {
  const { lang, setLang } = useLang()
  const langs: Lang[] = ["fr", "kr", "en", "es"]
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-1 rounded-lg border border-border bg-card/90 backdrop-blur p-1 text-xs font-bold">
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`px-2 py-1 rounded ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export function AuthPageShell({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <LangSwitcher />
      {children}
    </LangProvider>
  )
}

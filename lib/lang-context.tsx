"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Lang, Localized } from "@/shared/i18n"
import { readStoredLang, readLangCookie, writeStoredLang } from "@/shared/i18n"
import { translations, type TranslationKey } from "@/lib/translations"

export type { Lang }

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey | string) => string
  tMap: <T extends Localized>(dict: T) => string
}

const LangContext = createContext<LangContextType>({
  lang: "fr",
  setLang: () => {},
  t: (k) => k,
  tMap: (dict) => dict.fr,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr")
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = readStoredLang() ?? readLangCookie()
    if (stored) setLangState(stored)
    setHydrated(true)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    writeStoredLang(l)
    if (typeof document !== "undefined") {
      document.documentElement.lang = l === "kr" ? "ht" : l
    }
  }

  useEffect(() => {
    if (hydrated && typeof document !== "undefined") {
      document.documentElement.lang = lang === "kr" ? "ht" : lang
    }
  }, [lang, hydrated])

  const t = (key: TranslationKey | string) =>
    (translations as Record<string, Record<Lang, string>>)[key]?.[lang] ?? key

  const tMap = <T extends Localized>(dict: T) => dict[lang] ?? dict.fr

  return <LangContext.Provider value={{ lang, setLang, t, tMap }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

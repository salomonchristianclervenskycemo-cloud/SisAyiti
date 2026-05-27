/**
 * Platform-agnostic i18n helpers.
 * UI language code for Haitian Creole is `kr` (not `ht`).
 * Map components use `ht` via toMapLang().
 */

export type Lang = "fr" | "kr" | "en" | "es"

export type MapLang = "fr" | "ht" | "en" | "es"

export type Localized = Partial<Record<Lang, string>> & { fr: string }

export const LANG_STORAGE_KEY = "sisayiti-lang"
export const LANG_COOKIE_KEY = "sisayiti-lang"

export const VALID_LANGS: Lang[] = ["fr", "kr", "en", "es"]

export function isValidLang(value: string): value is Lang {
  return VALID_LANGS.includes(value as Lang)
}

export function l(dict: Localized, lang: Lang): string {
  return dict[lang] ?? dict.fr
}

export function pickLabel(
  item: {
    labelFr: string
    labelKr: string
    labelEn?: string
    labelEs?: string
  },
  lang: Lang
): string {
  if (lang === "kr") return item.labelKr
  if (lang === "en") return item.labelEn ?? item.labelFr
  if (lang === "es") return item.labelEs ?? item.labelFr
  return item.labelFr
}

export function pickDesc(
  item: {
    descFr: string
    descKr: string
    descEn?: string
    descEs?: string
  },
  lang: Lang
): string {
  if (lang === "kr") return item.descKr
  if (lang === "en") return item.descEn ?? item.descFr
  if (lang === "es") return item.descEs ?? item.descFr
  return item.descFr
}

/** UI `kr` → map locale `ht`. */
export function toMapLang(lang: Lang): MapLang {
  if (lang === "kr") return "ht"
  return lang
}

export function readStoredLang(): Lang | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(LANG_STORAGE_KEY)
    return raw && isValidLang(raw) ? raw : null
  } catch {
    return null
  }
}

export function writeStoredLang(lang: Lang): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang)
    document.cookie = `${LANG_COOKIE_KEY}=${lang};path=/;max-age=31536000;sameSite=lax`
  } catch {
    /* private mode / quota */
  }
}

export function readLangCookie(): Lang | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${LANG_COOKIE_KEY}=([^;]*)`))
  const raw = match?.[1]
  return raw && isValidLang(raw) ? raw : null
}

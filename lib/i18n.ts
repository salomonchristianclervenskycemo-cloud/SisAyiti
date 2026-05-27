export type {
  Lang,
  MapLang,
  Localized,
} from "@/shared/i18n"

export {
  LANG_STORAGE_KEY,
  VALID_LANGS,
  isValidLang,
  l,
  pickLabel,
  pickDesc,
  toMapLang,
  readStoredLang,
  writeStoredLang,
} from "@/shared/i18n"

import type { Lang } from "@/lib/i18n"
import { translations as core } from "./core"
import { preventionStrings } from "./prevention"
import { actualiteStrings } from "./actualite"
import { laboStrings } from "./labo"
import { villeStrings } from "./ville"
import { multirisquesStrings } from "./multirisques"
import { authStrings } from "./auth"

export const translations = {
  ...core,
  ...preventionStrings,
  ...actualiteStrings,
  ...laboStrings,
  ...villeStrings,
  ...multirisquesStrings,
  ...authStrings,
} as const satisfies Record<string, Record<Lang, string>>

export type TranslationKey = keyof typeof translations

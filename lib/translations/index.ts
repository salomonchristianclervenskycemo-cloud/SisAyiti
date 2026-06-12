import type { Lang } from "@/lib/i18n"
import { translations as core } from "./core"
import { preventionStrings } from "./prevention"
import { actualiteStrings } from "./actualite"
import { laboStrings } from "./labo"
import { villeStrings } from "./ville"
import { multirisquesStrings } from "./multirisques"
import { authStrings } from "./auth"
import { surveillanceStrings } from "./surveillance"
import { commonStrings } from "./common"
import { crisisStrings } from "./crisis"
import { comprendreScienceStrings } from "./comprendre-science"
import { preventionScienceStrings } from "./prevention-science"
import { diagnosticScienceStrings } from "./diagnostic-science"
import { laboScienceStrings } from "./labo-science"
import { villeScienceStrings } from "./ville-science"
import { carteScienceStrings } from "./carte-science"
import { actualiteScienceStrings } from "./actualite-science"
import { homeScienceStrings } from "./home-science"
import { homeLandingStrings } from "./home-landing"

export const translations = {
  ...core,
  ...commonStrings,
  ...crisisStrings,
  ...comprendreScienceStrings,
  ...preventionStrings,
  ...preventionScienceStrings,
  ...diagnosticScienceStrings,
  ...laboScienceStrings,
  ...villeScienceStrings,
  ...carteScienceStrings,
  ...actualiteScienceStrings,
  ...homeScienceStrings,
  ...homeLandingStrings,
  ...actualiteStrings,
  ...surveillanceStrings,
  ...laboStrings,
  ...villeStrings,
  ...multirisquesStrings,
  ...authStrings,
} as const satisfies Record<string, Record<Lang, string>>

export type TranslationKey = keyof typeof translations

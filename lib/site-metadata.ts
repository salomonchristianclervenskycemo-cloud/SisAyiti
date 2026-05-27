import type { Lang } from "@/shared/i18n"

export const siteMetadataByLang: Record<
  Lang,
  { title: string; description: string; keywords: string[] }
> = {
  fr: {
    title: "SisAyiti — Comprendre · Simuler · Se préparer",
    description:
      "Plateforme scientifique interactive pour comprendre les séismes en Haïti, simuler leur impact et se préparer aux risques sismiques.",
    keywords: ["séisme", "Haïti", "prévention", "simulation", "éducation sismique"],
  },
  kr: {
    title: "SisAyiti — Konprann · Simile · Prepare",
    description:
      "Platfòm syantifik entèaktif pou konprann tranblemanntè nan Ayiti, simile enpak yo epi prepare pou risk sismik yo.",
    keywords: ["tranblemanntè", "Ayiti", "prevansyon", "similasyon", "edikasyon sismik"],
  },
  en: {
    title: "SisAyiti — Understand · Simulate · Prepare",
    description:
      "Interactive scientific platform to understand earthquakes in Haiti, simulate their impact, and prepare for seismic risk.",
    keywords: ["earthquake", "Haiti", "prevention", "simulation", "seismic education"],
  },
  es: {
    title: "SisAyiti — Comprender · Simular · Prepararse",
    description:
      "Plataforma científica interactiva para comprender los sismos en Haití, simular su impacto y prepararse ante el riesgo sísmico.",
    keywords: ["sismo", "Haití", "prevención", "simulación", "educación sísmica"],
  },
}
